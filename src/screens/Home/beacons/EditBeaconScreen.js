import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Text } from 'react-native';
import React, { useEffect, useState, useMemo, } from 'react';

import { useForm } from 'react-hook-form';

import MainLayout from '../../../container/MainLayout';

import ActivityIndicatorComponent from '../../../components/ActivityIndicatorComponent';
import InsertImageButton from '../../../components/InsertImageButton';
import ApiResultModal from '../../../components/ApiResultModal';
import { InlineButton } from '../../../components/Buttons';
import DataInput from '../../../components/ControlledDataInput';
import PickerInput from '../../../components/ControlledPickerInput';

import CheckBox from '@react-native-community/checkbox';

import { useEditBeaconMutation } from '../../../api/beaconQueries';

import { useOpenGallery } from '../../../hooks/useOpenGallery';
import { ACTIONS, useApiResultReducer } from '../../../hooks/useApiResultReducer';


import { useSelector } from 'react-redux';
import { selectBuildingTotalFloors } from '../../../redux/buildingSlice';

import globalStyles from '../../../globals/styles'
import beaconFormStyle from './beaconFormStyle';


const URL_PREFIX = "www."

const EditBeaconScreen = ({ route, navigation }) => {
    const { beaconEditData } = route.params;

    const totalFloors = useSelector(selectBuildingTotalFloors);

    const [store, dispatch] = useApiResultReducer()

    const [imageUri, imageName, OpenGallery] = useOpenGallery();
    const [editBeaconQuery, editBeaconResult] = useEditBeaconMutation();

    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        clearErrors,
        setValue
    } = useForm(({
        defaultValues: {
            beaconName: beaconEditData.name,
            floor: beaconEditData.atFloor,
        },
    }));

    const beaconName = watch('beaconName');
    const floor = watch('floor');
    const dataType = watch('dataType')
    const data = watch('data');

    useEffect(() => {
        if (dataType !== 'image' && !imageName) {
            return
        }
        clearErrors('data')
        setValue('data', imageName)
    }, [imageName])


    const editBeacon = async () => {
        const formData = new FormData();

        formData.append("name", beaconName);
        formData.append("atFloor", floor)
        formData.append("dataType", toggleCheckBox ? dataType : beaconEditData.dataType)
        if (toggleCheckBox && dataType === "image") {
            const convertedImage = imageUri?.uri
                .match(/(\w+)-(\w+)-(\w+)-(\w+)-(\w+)(\.\w+)/)[0];
            formData.append('data', {
                uri: imageUri.uri,
                name: 'beacon-' + convertedImage,
                type: 'image/' + imageUri.uri.split('.').pop(),
            });
        } else if (toggleCheckBox && dataType === 'web-address') {
            formData.append("data", URL_PREFIX + data)
        } else {
            formData.append("data", toggleCheckBox ? data : beaconEditData.data)
        }
        console.log(formData)
        try {
            const beacon = await editBeaconQuery({ beaconID: beaconEditData._id, beaconData: formData }).unwrap();
            dispatch({ type: ACTIONS.SUCCESS, status: beacon.status, message: beacon.message })
        } catch (err) {
            console.log(err)
            dispatch({
                type: ACTIONS.ERROR,
                status: err.data.status,
                message: err.data.message.map(message => message.msg).join('\r\n')
            })
        }
    };

    const renderBuildingFloors = useMemo(() => {
        let ammountofPicks = {};
        for (let i = 0; i < totalFloors; i++) {
            ammountofPicks[i + 1] = i + 1
        }

        return ammountofPicks
    }, []);

    const renderDataTypeOptions = () => {
        return {
            'Select type of transmitted data': 'none',
            'Image': 'image',
            'Plain text': 'plain-text',
            'Web address': 'web-address'

        }
    };

    return (
        <MainLayout>
            {editBeaconResult.isLoading && (
                <ApiResultModal
                    isVisible={true}
                    message={<ActivityIndicatorComponent text="Please wait..." />}
                />
            )}
            <ApiResultModal
                isVisible={store.showResultModal}
                title={store.title}
                message={store.message}
                onConfirm={() => {
                    dispatch({ type: ACTIONS.HIDE_MODAL });
                    if (!editBeaconResult.isError) navigation.goBack();
                }}
            />

            <KeyboardAvoidingView behavior="height" style={{ flex: 1 }} enabled keyboardVerticalOffset={0}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <DataInput
                        title={'Beacon name'}
                        control={control}
                        name={'beaconName'}
                        rules={{ required: 'This field is required' }}
                        placeholder={'Beacon Name'}
                        description={'Choose a name which will be associated with the beacon'}
                    />
                    <PickerInput
                        title={"Floor"}
                        control={control}
                        name={'floor'}
                        renderPicker={renderBuildingFloors}
                        description={'Select the floor at which the beacon will be located'}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 20 }}>
                        <CheckBox
                            tintColors={{ true: globalStyles.colorSet.PRIMARY }}
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                        <Text style={{ fontSize: globalStyles.fontSizeSet.fontRegular }}>Add new data to be transmitted</Text>
                    </View>

                    {toggleCheckBox &&
                        <PickerInput
                            title={'Transmitted data'}
                            control={control}
                            name={'dataType'}
                            rules={{ validate: (value) => (value !== 'none') || "Please select valid data type" }}
                            renderPicker={renderDataTypeOptions()}
                            description={'Select the type of data which will be transmitted through the beacon'}
                        />
                    }
                    {toggleCheckBox && dataType === 'image' &&
                        <View style={{ marginVertical: 10, marginLeft: 20 }}>
                            <InsertImageButton
                                onPress={() => {
                                    OpenGallery();
                                }}
                                description="Select an image which will be transmitted through the beacon"
                                control={control}
                                name={'data'}
                                rules={{ validate: (value) => (value !== undefined) || "Field is required" }}
                            />
                        </View>
                    }
                    {toggleCheckBox && dataType === 'plain-text' &&
                        <DataInput
                            multiline={true}
                            name={'data'}
                            control={control}
                            placeholder={'Write a text message'}
                            rules={{ required: 'This field is required' }}
                            customTextAreaStyle={styles.messageTextArea} />
                    }
                    {toggleCheckBox && dataType === 'web-address' &&
                        <View>
                            <DataInput
                                hasPrefix={true}
                                prefix={'www.'}
                                name={'data'}
                                control={control}
                                rules={{ required: 'This field is required' }} />
                        </View>
                    }
                    <View style={{ marginVertical: 30, alignItems: 'center' }}>
                        <InlineButton
                            title={'Edit Beacon'}
                            onPress={handleSubmit(editBeacon)}
                            borderRadius={10}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </MainLayout>
    );
};


const styles = new StyleSheet.create({
    ...beaconFormStyle
});

export default EditBeaconScreen

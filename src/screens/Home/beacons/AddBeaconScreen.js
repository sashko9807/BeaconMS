import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Text } from 'react-native';
import React, { useEffect, useState, useMemo, } from 'react';

import { useForm } from 'react-hook-form';

import MainLayout from '../../../container/MainLayout';

import ActivityIndicatorComponent from '../../../components/ActivityIndicatorComponent';
import BeaconCard from '../../../components/BeaconCard';
import InsertImageButton from '../../../components/InsertImageButton';
import ApiResultModal from '../../../components/ApiResultModal';
import { InlineButton } from '../../../components/Buttons';
import DataInput from '../../../components/ControlledDataInput';
import PickerInput from '../../../components/ControlledPickerInput';

import { useAddBeaconMutation } from '../../../api/beaconQueries';

import { useOpenGallery } from '../../../hooks/useOpenGallery';
import { ACTIONS, useApiResultReducer } from '../../../hooks/useApiResultReducer';


import { useSelector } from 'react-redux';
import {
  selectBuildingID,
  selectBuildingTotalFloors,
} from '../../../redux/buildingSlice';

import beaconFormStyle from './beaconFormStyle';

const URL_PREFIX = "www."

const AddBeaconScreen = ({ route, navigation }) => {
  const { beacons } = route.params;

  const buildingID = useSelector(selectBuildingID);
  const totalFloors = useSelector(selectBuildingTotalFloors);

  const [store, dispatch] = useApiResultReducer()

  const [imageUri, imageName, OpenGallery] = useOpenGallery();
  const [addBeacon, addBeaconResult] = useAddBeaconMutation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    setValue
  } = useForm();

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



  const addNewBeacon = async () => {

    const formData = new FormData();

    const beaconData = {
      beacon_type: beacons.beacon_type,
      UUID: beacons.uuid,
      major: beacons.major,
      minor: beacons.minor,
    };

    const buildingData = {
      buildingID: buildingID,
      totalFloors: totalFloors,
    };

    formData.append("beaconData", beaconData);
    formData.append("name", beaconName);
    formData.append("atFloor", floor)
    formData.append("buildingData", buildingData)
    formData.append("dataType", dataType)
    if (dataType === "image") {
      const imageName = imageUri?.uri.match(
        /(\w+)-(\w+)-(\w+)-(\w+)-(\w+)(\.\w+)/
      )[0];
      formData.append('data', {
        uri: imageUri.uri,
        name: 'beacon-' + imageName,
        type: 'image/' + imageUri.uri.split('.').pop(),
      });
    } else if (dataType === "web-address") {
      formData.append("data", URL_PREFIX + data)
    } else {
      formData.append("data", data)
    }

    try {
      const beacon = await addBeacon({ formData }).unwrap();
      dispatch({ type: ACTIONS.SUCCESS, status: beacon.status, message: beacon.message })
    } catch (err) {
      dispatch({ type: ACTIONS.ERROR, status: err.data.status, message: err.data.message })
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
      {addBeaconResult.isLoading && (
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
          if (!addBeaconResult.isError) navigation.goBack();
        }}
      />

      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }} enabled keyboardVerticalOffset={0}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View>
            <BeaconCard
              beaconData={{
                beaconType: beacons?.beacon_type,
                distance: beacons?.distance,
                uuid: beacons?.uuid,
                major: beacons?.major,
                minor: beacons?.minor,
                rssi: beacons?.rssi,
              }}
            />
          </View>
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
          <PickerInput
            title={'Transmitted data'}
            control={control}
            name={'dataType'}
            rules={{ validate: (value) => (value !== 'none') || "Please select valid data type" }}
            renderPicker={renderDataTypeOptions()}
            description={'Select the type of data which will be transmitted through the beacon'}
          />

          {dataType === 'image' &&
            <View style={{ marginVertical: 10, marginLeft: 20 }}>
              <InsertImageButton
                onPress={() => {
                  OpenGallery();
                }}
                description="Select an image which will be transmitted through the beacon"
                control={control}
                name={'data'}
                rules={!isEditing && { validate: (value) => (value !== undefined) || "Field is required" }}
              />
            </View>
          }
          {dataType === 'plain-text' &&
            <DataInput
              multiline={true}
              name={'data'}
              control={control}
              placeholder={'Write a text message'}
              rules={!isEditing && { required: 'This field is required' }}
              customTextAreaStyle={styles.messageTextArea} />
          }
          {dataType === 'web-address' &&
            <View>
              <DataInput
                hasPicker={true}
                prefix={['www.']}
                pickedValue={link}
                changePickerValue={(itemValue) => setLink(itemValue)}
                name={'data'}
                control={control}
                placeholder={'Write a text message'}
                rules={!isEditing && { required: 'This field is required' }} />
            </View>
          }
          <View style={{ marginVertical: 30 }}>
            <InlineButton
              title={'Add beacon'}
              onPress={handleSubmit(addNewBeacon)}
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

export default AddBeaconScreen;

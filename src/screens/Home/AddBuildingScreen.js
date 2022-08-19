import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { useState } from 'react';

import MainLayout from '../../container/MainLayout';

import ApiResultModal from '../../components/ApiResultModal';
import DataInput from '../../components/DataInput';
import GenericButton from '../../components/GenericButton';
import InsertImageButton from '../../components/InsertImageButton';

import { useAddBuildingMutation } from '../../redux/buildingQueries';
import { useOpenGallery } from '../../hooks/useOpenGallery';
import { useForm } from 'react-hook-form';

const AddBuildingScreen = () => {
  const [addBuilding, { isLoading, isSuccess, isError }] =
    useAddBuildingMutation();

  const [imageUri, imageName, OpenGallery] = useOpenGallery();

  const [showApiResultModal, setShowApiResultModal] = useState(false);
  const [apiStatus, setApiStatus] = useState('');
  const [apiMessage, setApiMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const buildingName = watch('buildingName');
  const floors = watch('floors');

  const addBuildingSubmit = async () => {
    try {
      const formData = new FormData();
      if (imageUri) {
        const convertedImage = imageUri?.uri.match(
          /(\w+)-(\w+)-(\w+)-(\w+)-(\w+)(\.\w+)/
        )[0];
        formData.append('image', {
          uri: imageUri.uri,
          name: convertedImage,
          type: 'image/' + imageUri.uri.split('.').pop(),
        });
      }
      formData.append('buildingName', buildingName);
      formData.append('floors', floors);
      const buildingdata = await addBuilding({ formData }).unwrap();
      setApiStatus(buildingdata.status);
      setApiMessage(buildingdata.message);
      setShowApiResultModal(true);
    } catch (err) {
      console.log(err.data);
      setApiStatus(err.data.status);
      setApiMessage(err.data.message.map((currError) => currError.msg));
      setShowApiResultModal(true);
    }
  };

  return (
    <MainLayout>
      {isLoading && (
        <ApiResultModal
          isVisible={true}
          title={''}
          message={
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
          }
        />
      )}
      {(isSuccess || isError) && (
        <ApiResultModal
          isVisible={showApiResultModal}
          title={apiStatus}
          message={apiMessage}
          onConfirm={() => {
            setShowApiResultModal(!showApiResultModal);
            navigation.navigate('Dashboard');
          }}
        />
      )}
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1 }}>
          <Text style={informationString.text}>Select an Image:</Text>
          <InsertImageButton onPress={OpenGallery} image={imageName} />
          <DataInput
            title={'Building name'}
            control={control}
            name={'buildingName'}
            rules={{ required: 'This field is required' }}
            placeholder={'Building Name'}
          />
          <DataInput
            title={'Amout of floors'}
            control={control}
            name={'floors'}
            rules={{
              required: 'This field is required',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Only valid numbers are allowed',
              },
            }}
            placeholder={'Amount of floors'}
            keyboardType={'number-pad'}
          />
          <View
            style={{
              flex: 1,
              marginTop: 100,
            }}
          >
            <GenericButton
              name="Add new building"
              borderStyle="inline"
              disabled={isLoading ? true : false}
              onPress={handleSubmit(addBuildingSubmit)}
            />
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const informationString = new StyleSheet.create({
  text: {
    marginLeft: 10,
    marginTop: 30,
    color: '#6A539D',
    fontSize: 17,
    fontWeight: 'bold',
  },
  inputs: {
    marginLeft: 40,
    borderWidth: 1,
    width: '80%',
    minHeight: 60,
    borderRadius: 10,
    alignContent: 'center',
    color: '#6A539D',
    borderColor: '#6A539D',
    fontSize: 15,
  },
});

export default AddBuildingScreen;

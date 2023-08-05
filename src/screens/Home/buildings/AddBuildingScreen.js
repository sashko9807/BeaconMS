import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';

import { useEffect } from 'react';

import MainLayout from '../../../container/MainLayout';

import ActivityIndicatorComponent from '../../../components/ActivityIndicatorComponent';
import ApiResultModal from '../../../components/ApiResultModal';
import DataInput from '../../../components/ControlledDataInput';
import { InlineButton } from '../../../components/Buttons';
import InsertImageButton from '../../../components/InsertImageButton';

import { useAddBuildingMutation } from '../../../api/buildingQueries';
import { useOpenGallery } from '../../../hooks/useOpenGallery';
import { useForm } from 'react-hook-form';

import globalStyles from '../../../globals/styles'

import { ACTIONS, useApiResultReducer } from '../../../hooks/useApiResultReducer';
import KeyboardAwareScrollViewWrapper from '../../../components/KeyboardAwareScrollViewWrapper';

const AddBuildingScreen = ({ navigation }) => {
  const [addBuilding, { isLoading, isSuccess, isError }] =
    useAddBuildingMutation();

  const [imageUri, imageName, OpenGallery] = useOpenGallery();

  const [store, dispatch] = useApiResultReducer()

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm();



  useEffect(() => {
    if (!imageName) return;
    setValue("image", imageName)
  }, [imageName])

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
          name: 'building-' + convertedImage,
          type: 'image/' + imageUri.uri.split('.').pop(),
        });
      }
      formData.append('buildingName', buildingName);
      formData.append('floors', floors);
      const buildingdata = await addBuilding({ formData }).unwrap();
      dispatch({ type: ACTIONS.SUCCESS, status: buildingdata.status, message: buildingdata.message })
    } catch (err) {
      dispatch({
        type: ACTIONS.ERROR,
        status: err.data.status,
        message: err.data.message.map((currError) => currError.msg).join('\r\n')
      })
    }
  };

  return (
    <MainLayout>
      {isLoading && (
        <ApiResultModal
          isVisible={true}
          title={''}
          message={
            <ActivityIndicatorComponent />
          }
        />
      )}
      <ApiResultModal
        isVisible={store.showResultModal}
        title={store.title}
        message={store.message}
        onConfirm={() => {
          dispatch({ type: ACTIONS.HIDE_MODAL })
          if (!isError) navigation.goBack();
        }}
      />
      {/* <KeyboardAvoidingView behavior="padding" style={{ flexGrow: 1, flexDirection: 'column', justifyContent: 'center' }} enabled keyboardVerticalOffset={-StatusBar.currentHeight}>
        <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}> */}
      <KeyboardAwareScrollViewWrapper>

        <Text style={informationString.text}>Select an Image:</Text>
        <InsertImageButton
          onPress={OpenGallery}
          image={imageName}
          name={'image'}
          control={control}
          description="Select an image to be associated with the building"
        />
        <DataInput
          title={'Building name'}
          control={control}
          name={'buildingName'}
          rules={{ required: 'This field is required' }}
          placeholder={'Building Name'}
          description={'A name which will be associated with the building'}
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
          description={'Total amount of floors of the building'}
        />
        <View
          style={{
            flex: 1,
            marginTop: 50,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <InlineButton
            title="Add new building"
            borderRadius={10}
            disabled={isLoading ? true : false}
            onPress={handleSubmit(addBuildingSubmit)}
          />
        </View>
      </KeyboardAwareScrollViewWrapper>
      {/* </ScrollView>
      </KeyboardAvoidingView> */}
    </MainLayout>
  );
};

const informationString = new StyleSheet.create({
  text: {
    marginLeft: 10,
    marginTop: 10,
    color: globalStyles.colorSet.PRIMARY,
    fontSize: globalStyles.fontSizeSet.fontRegular,
    fontWeight: 'bold',
  }
})

export default AddBuildingScreen;

import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';

import MainLayout from '../../container/MainLayout';

import ActivityIndicatorComponent from '../../components/ActivityIndicatorComponent';
import ApiResultModal from '../../components/ApiResultModal';
import { InlineButton } from '../../components/Buttons';
import ControlledUserInput from '../../components/ControlledUserInput';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useForm } from 'react-hook-form';

import { useUpdatePasswordMutation } from '../../api/userQueries';


const ChangePasswordScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [updatePassword, { isLoading, isSuccess, isError }] =
    useUpdatePasswordMutation();

  const [apiStatus, setApiStatus] = useState('');
  const [apiMessage, setApiMessage] = useState('');
  const [showApiResultModal, setShowApiResultModal] = useState(false);

  const currPassword = watch('currPassword');
  const newPassword = watch('newPassword');
  const confirmNewPassword = watch('confirmNewPassword');

  const updateUserPassword = async () => {
    try {
      const user = await updatePassword({
        currPassword,
        newPassword,
      }).unwrap();
      setApiStatus(user.status);
      setApiMessage(user.message);
      setShowApiResultModal(true);
    } catch (err) {
      console.log(err.data);
      setApiStatus(err.data.status);
      setApiMessage(err.data.message);
      setShowApiResultModal(true);
    }
  };

  return (
    <>
      {isLoading && (
        <ApiResultModal
          isVisible={true}
          message={
            <ActivityIndicatorComponent />
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
            navigation.goBack();
          }}
        />
      )}
      <MainLayout>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} enabled keyboardVerticalOffset={80}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.wrapper}>
              <ControlledUserInput
                title={'Current Password'}
                name={'currPassword'}
                control={control}
                placeholder={'Current Password'}
                rules={{
                  required: 'Current Password field is required',
                }}
                secureTextEntry
              />
              <View style={styles.verticalSpacing}>
                <ControlledUserInput
                  title={'New Password'}
                  name={'newPassword'}
                  control={control}
                  placeholder={'New Password'}
                  rules={{
                    required: 'New Password field is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long',
                    },
                    validate: (value) =>
                      value === confirmNewPassword || "Passwords don't match",
                  }}
                  secureTextEntry
                />
              </View>
              <View style={styles.verticalSpacing}>
                <ControlledUserInput
                  title={'Confirm New Password'}
                  name={'confirmNewPassword'}
                  control={control}
                  placeholder={'Confirm New Password'}
                  rules={{
                    required: 'Confirm New Password field is required',
                    validate: (value) =>
                      value === newPassword || "Passwords don't match",
                  }}
                  secureTextEntry
                />
              </View>
              <View style={styles.btnChangePassword}>
                <InlineButton
                  title="Change Password"
                  onPress={handleSubmit(updateUserPassword)}
                  borderRadius={10}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </MainLayout>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  verticalSpacing: {
    marginTop: 40
  },
  btnChangePassword: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  }
});

export default ChangePasswordScreen;

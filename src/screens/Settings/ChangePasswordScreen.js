import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import MainLayout from '../../container/MainLayout';

import ApiResultModal from '../../components/ApiResultModal';
import GenericButton from '../../components/GenericButton';
import UserInput from '../../components/UserInput';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useForm } from 'react-hook-form';
import { useUpdatePasswordMutation } from '../../redux/userQueries';

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
            navigation.goBack();
          }}
        />
      )}
      <MainLayout>
        <View style={{ borderTopRightRadius: 25, borderTopLeftRadius: 25 }}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableResetScrollToCoords={true}
            scrollEnabled={true}
            resetScrollToCoords={{ x: 0, y: 0 }}
            extraScrollHeight={20}
            contentContainerStyle={{}}
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={{
                margin: 22,
                flexGrow: 1,
                backgroundColor: '#FFF',
                borderTopRightRadius: 25,
                borderTopLeftRadius: 25,
                width: '89%',
              }}
            >
              <UserInput
                title={'Current Password'}
                name={'currPassword'}
                control={control}
                placeholder={'Current Password'}
                rules={{
                  required: 'Current Password field is required',
                }}
                secureTextEntry
              />
              <View
                style={{
                  marginTop: 40,
                  borderTopRightRadius: 25,
                  borderTopLeftRadius: 25,
                }}
              >
                <UserInput
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
              <View
                style={{
                  marginTop: 40,
                  borderTopRightRadius: 25,
                  borderTopLeftRadius: 25,
                }}
              >
                <UserInput
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
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 60,
                  marginBottom: 20,
                }}
              >
                <GenericButton
                  onPress={handleSubmit(updateUserPassword)}
                  name="Change Password"
                  borderStyle={'inline'}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </MainLayout>
    </>
  );
};

const styles = StyleSheet.create({
  textProp: {
    color: '#6A539D',
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;

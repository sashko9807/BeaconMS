import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useEffect, useState } from 'react';

import GenericButton from '../../components/GenericButton';
import UserInput from '../../components/UserInput';

import GoBack from '../../assets/GoBack.svg';

import ActivityIndicatorComponent from '../../components/ActivityIndicatorComponent';
import ApiResultModal from '../../components/ApiResultModal';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm } from 'react-hook-form';

import { useRegisterMutation } from '../../redux/userQueries';

const EMAIL_REGEXP =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const RegisterModal = ({ navigation }) => {
  const [showApiResultModal, setShowApiResultModal] = useState(false);
  const [apiStatus, setApiStatus] = useState('');
  const [apiMessage, setApiMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const email = watch('email');
  const pwd = watch('password');

  const [regUser, { isLoading, isSuccess, isError }] = useRegisterMutation();

  const registerUser = async () => {
    console.log(errors);
    try {
      const newUser = await regUser({
        email: email.toLowerCase(),
        password: pwd,
      }).unwrap();
      setApiStatus(newUser.status);
      setApiMessage(newUser.message);
      setShowApiResultModal(true);
    } catch (err) {
      setApiStatus(err.data.status);
      setApiMessage(err.data.message.map((currError) => currError.msg));
      setShowApiResultModal(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.containerModal}>
        <View style={styles.innerContainer}>
          {isLoading && (
            <ApiResultModal
              isVisible={true}
              title={''}
              message={
                <ActivityIndicatorComponent text="Registering new User" />
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
              }}
            />
          )}
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableResetScrollToCoords={true}
            scrollEnabled={true}
            resetScrollToCoords={{ x: 0, y: 0 }}
            extraScrollHeight={20}
            contentContainerStyle={{
              flexGrow: 1,
              borderTopRightRadius: 25,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={{
                marginLeft: 10,
                flex: 1,
                flexDirection: 'row',
              }}
            >
              <Pressable onPress={() => navigation.goBack()}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <GoBack width="30" height="30" />
                  <Text style={{ fontSize: 20, marginLeft: 5 }}>Sign up</Text>
                </View>
              </Pressable>
            </View>
            <View
              style={{
                marginTop: 10,
                marginRight: 10,
                marginLeft: 15,
                flexGrow: 1,
                backgroundColor: '#FFF',
                borderTopRightRadius: 25,
                borderTopLeftRadius: 25,
                justifyContent: 'center',
                width: '90%',
              }}
            >
              <View>
                <UserInput
                  title={'Email'}
                  name={'email'}
                  control={control}
                  placeholder={'Email'}
                  rules={{
                    required: 'Email field is required',
                    pattern: { value: EMAIL_REGEXP, message: 'Invalid email' },
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: 40,
                }}
              >
                <UserInput
                  title={'Password'}
                  name={'password'}
                  control={control}
                  placeholder={'Password'}
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long',
                    },
                  }}
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
                  title={'Confirm Password'}
                  name={'confirmPassword'}
                  control={control}
                  placeholder={'Confirm Password'}
                  rules={{
                    required: 'Confirm Password field is required',
                    validate: (value) =>
                      value === pwd || "Passwords don't match",
                  }}
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
                  onPress={handleSubmit(registerUser)}
                  name="Sign up"
                  borderStyle={'inline'}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </View>
  );
};

export default RegisterModal;

const styles = StyleSheet.create({
  containerModal: {
    flexGrow: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  innerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 185,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#FFF',
  },
});

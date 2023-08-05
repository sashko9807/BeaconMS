import { StyleSheet, Text, View, } from 'react-native';
import { useState } from 'react';

import { InlineButton, OutlineButton } from '../../components/Buttons';
import ControlledUserInput from '../../components/ControlledUserInput';

import ActivityIndicatorComponent from '../../components/ActivityIndicatorComponent';
import ApiResultModal from '../../components/ApiResultModal';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm } from 'react-hook-form';
import { moderateScale } from '../../utils/scaling';

import { useRegisterMutation } from '../../api/userQueries';
import globalStyles from '../../globals/styles'
import KeyboardAwareScrollViewWrapper from '../../components/KeyboardAwareScrollViewWrapper';

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
    console.log(`reached`);
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
    <>
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
      <View style={mainStyle.container}>
        <View style={mainStyle.header}>
          <Text style={mainStyle.headerText}>Register</Text>
        </View>
        <View style={mainStyle.authContainer}>
          <KeyboardAwareScrollViewWrapper>
            <View style={mainStyle.authFields}>
              <ControlledUserInput
                title={'Email'}
                name={'email'}
                control={control}
                placeholder={'Email'}
                rules={{
                  required: 'Email field is required',
                  pattern: { value: EMAIL_REGEXP, message: 'Invalid email' },
                }}
              />
              <View style={mainStyle.spacing}>
                <ControlledUserInput
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
              <View style={mainStyle.spacing}>
                <ControlledUserInput
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
            </View>
            <View style={mainStyle.btnContainer}>
              <View style={mainStyle.buttons}>
                <InlineButton title="Register" onPress={handleSubmit(registerUser)} borderRadius={10} />
                <OutlineButton
                  onPress={() => navigation.goBack()}
                  title="Sign in"
                  borderRadius={10}
                  additionStyle={{ marginTop: moderateScale(10) }}
                />
              </View>
            </View>
          </KeyboardAwareScrollViewWrapper>
        </View>
      </View>
    </>
  );
};

const mainStyle = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.colorSet.PRIMARY,
    flex: 1
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: globalStyles.fontSizeSet.fontLarge,
    color: globalStyles.colorSet.SECONDARY,
    fontFamily: globalStyles.fontFamilySet.fontFamilySecondary,
  },
  authContainer: {
    flexGrow: 1,
    marginTop: 20,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: globalStyles.colorSet.SECONDARY,
    //borderWidth: 2,
    // borderColor: 'red',
  },
  authFields: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
  },
  authTitle: {
    color: globalStyles.colorSet.PRIMARY,
    fontSize: globalStyles.fontSizeSet.fontMedium,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    fontWeight: 'bold',
  },
  authInput: {
    flexDirection: 'row',
    borderBottomColor: globalStyles.colorSet.PRIMARY,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    flexGrow: 0.32
  },
  btnForgottenPassword: {
    marginTop: 5,
    fontSize: globalStyles.fontSizeSet.fontRegular,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    color: globalStyles.colorSet.PRIMARY,
    fontWeight: 'bold',
  },
  btnContainer: {
    marginTop: moderateScale(160),
    borderColor: 'red',
    justifyContent: 'flex-end',
  },
  buttons: {
    flexGrow: 0.2,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  spacing: {
    marginTop: 20
  }

});

export default RegisterModal
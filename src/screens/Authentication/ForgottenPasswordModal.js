import { StyleSheet, Text, View } from 'react-native';


import ActivityIndicatorComponent from '../../components/ActivityIndicatorComponent';
import ApiResultModal from '../../components/ApiResultModal';
import { InlineButton } from '../../components/Buttons';
import ControlledUserInput from '../../components/ControlledUserInput';

import { useForm } from 'react-hook-form';
import { useForgotPasswordMutation } from '../../api/userQueries';

import globalStyles from '../../globals/styles'
import { useApiResultReducer, ACTIONS } from '../../hooks/useApiResultReducer';

const EMAIL_REGEXP =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const ForgottenPasswordModal = ({ navigation }) => {

  const [store, dispatch] = useApiResultReducer()
  const [forgotPassword, { isLoading, isError, isSuccess }] =
    useForgotPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const email = watch('email');

  const passwordSubmit = async () => {
    try {
      const user = await forgotPassword({ email }).unwrap();
      dispatch({ type: ACTIONS.SUCCESS, status: user.status, message: user.message })
    } catch (err) {
      dispatch({ type: ACTIONS.ERROR, status: err.data.status, message: err.data.message })
    }
  };

  return (
    <>
      {isLoading && (
        <ApiResultModal
          isVisible={true}
          title={''}
          message={
            <ActivityIndicatorComponent text="Sending new password" />
          }
        />
      )}
      <ApiResultModal
        isVisible={store.showResultModal}
        title={store.title}
        message={store.message}
        onConfirm={() => {
          dispatch({ type: ACTIONS.HIDE_MODAL })
        }}
      />
      <View style={mainStyle.container}>
        <View style={mainStyle.header}>
          <Text style={mainStyle.headerText}>Forgot password</Text>
        </View>
        <View style={mainStyle.authContainer}>
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
          </View>
          <View style={mainStyle.btnSend}>
            <InlineButton
              onPress={handleSubmit(passwordSubmit)}
              title="Send"
              borderRadius={10}
            />
          </View>
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
    paddingHorizontal: 10
  },
  headerText: {
    fontSize: globalStyles.fontSizeSet.fontLarge,
    color: globalStyles.colorSet.SECONDARY,
    fontFamily: globalStyles.fontFamilySet.fontFamilySecondary,
  },
  authContainer: {
    flex: 4,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: globalStyles.colorSet.SECONDARY,
    flexGrow: 1
    //borderWidth: 2,
    // borderColor: 'red',
  },
  authFields: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
  },
  authTitle: {
    color: globalStyles.colorSet.PRIMARY,
    fontSize: globalStyles.fontSizeSet.fontMedium,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    fontWeight: 'bold',
  },
  inputs: {
    paddingLeft: 5,
    fontSize: globalStyles.fontSizeSet.fontSmall,
  },
  btnSend: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ForgottenPasswordModal;



import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';

import { useState } from 'react';

import GoBack from '../../assets/GoBack.svg';

import ActivityIndicatorComponent from '../../components/ActivityIndicatorComponent';
import ApiResultModal from '../../components/ApiResultModal';
import GenericButton from '../../components/GenericButton';
import UserInput from '../../components/UserInput';

import { useForm } from 'react-hook-form';
import { useForgotPasswordMutation } from '../../redux/userQueries';

const EMAIL_REGEXP =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const ForgottenPasswordModal = ({ navigation }) => {
  const [showApiResultModal, setShowApiResultModal] = useState(false);
  const [apiStatus, setApiStatus] = useState('');
  const [apiMessage, setApiMessage] = useState('');

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
      setApiStatus(user.status);
      setApiMessage(user.message);
      setShowApiResultModal(true);
    } catch (err) {
      console.log(err);
      setApiStatus(err.data.status);
      setApiMessage(err.data.message);
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
                <ActivityIndicatorComponent text="Attempting to send new password to email" />
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
          <ScrollView
            contentContainerStyle={{
              flexGrow: 0,
              backgroundColor: 'transperent',
            }}
          >
            <View
              style={{
                marginLeft: 10,
                flex: 0.1,
                flexDirection: 'row',
              }}
            >
              <Pressable onPress={() => navigation.goBack()}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <GoBack width="30" height="30" />
                  <Text style={{ fontSize: 20, marginLeft: 5 }}>
                    Forgotten Password
                  </Text>
                </View>
              </Pressable>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 20,
                marginTop: 20,
                flexGrow: 1,
                backgroundColor: '#FFF',
              }}
            >
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
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 80,
                  marginTop: 60,
                }}
              >
                <GenericButton
                  onPress={handleSubmit(passwordSubmit)}
                  name="Send"
                  borderStyle={'inline'}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default ForgottenPasswordModal;

const styles = StyleSheet.create({
  containerModal: {
    flexGrow: 1,
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
  textProp: {
    color: '#6A539D',
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
});

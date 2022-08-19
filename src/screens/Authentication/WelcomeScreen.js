import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

import { useState } from 'react';

import UserIcon from '../../assets/user.svg';
import PasswordIcon from '../../assets/PasswordIcon.svg';

import ActivityIndicatorComponent from '../../components/ActivityIndicatorComponent';
import ApiResultModal from '../../components/ApiResultModal';
import GenericButton from '../../components/GenericButton';

import { useLoginMutation } from '../../redux/userQueries';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const WelcomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState('sashko506@gmail.com');
  const [password, setPassword] = useState('py9ui');
  const [login, { isLoading, isSuccess, isError }] = useLoginMutation();

  const [showApiResultModal, setShowApiResultModal] = useState(false);
  const [apiStatus, setApiStatus] = useState('');
  const [apiMessage, setApiMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const userData = await login({
        email: email.toLowerCase(),
        password,
      }).unwrap();
    } catch (err) {
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
          message={<ActivityIndicatorComponent text="Logging in" />}
        />
      )}
      {isError && (
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
        bounces={false}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        scrollEnabled={true}
        extraScrollHeight={100}
        keyboardShouldPersistTaps="handled"
        scrollToOverflowEnabled={true}
        enableAutomaticScroll={true}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={mainStyle.wrapper}>
          <View
            style={{
              flex: 2,
              alignItems: 'center',
              justifyContent: 'center',
              flexGrow: 1,
              marginHorizontal: 10,
            }}
          >
            <Text style={mainStyle.header}>Welcome!</Text>
            <Text
              style={{
                color: '#FFF',
                fontFamily: 'Abel',
                fontSize: 32,
                textAlign: 'center',
                marginTop: 20,
              }}
            >
              Please sign in to access your devices
            </Text>
          </View>
          <View style={mainStyle.container}>
            <View
              style={{
                flex: 1,
                marginLeft: 20,
                marginTop: 50,
                flexGrow: 1,
                backgroundColor: '#FFF',
              }}
            >
              <View>
                <Text style={mainStyle.textProp}>Email</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomColor: '#6A539D',
                    borderBottomWidth: 0.5,
                    marginTop: 5,
                  }}
                >
                  <UserIcon />
                  <TextInput
                    style={{
                      flexGrow: 1,
                    }}
                    placeholder="Your Email"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>
              <View style={{ marginTop: 40 }}>
                <Text style={mainStyle.textProp}>Password</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomColor: '#6A539D',
                    borderBottomWidth: 0.5,
                    marginTop: 5,
                  }}
                >
                  <PasswordIcon />
                  <TextInput
                    style={{
                      flexGrow: 1,
                    }}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                  />
                </View>
              </View>
              <Pressable
                onPress={() => navigation.navigate('ForgottenPasswordModal')}
              >
                <Text
                  style={{
                    marginTop: 5,
                    fontSize: 20,
                    fontFamily: 'Roboto',
                    color: '#6A539D',
                    fontWeight: 'bold',
                  }}
                >
                  Forgot password?
                </Text>
              </Pressable>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <GenericButton name="Sign in" onPress={() => handleSubmit()} />
            </View>
            <View
              style={{
                justifyContent: 'center',
                marginTop: 20,
                paddingBottom: 30,
              }}
            >
              <GenericButton
                onPress={() => navigation.navigate('RegisterModal')}
                name="Sign up"
                borderStyle={'inline'}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const mainStyle = StyleSheet.create({
  wrapper: {
    backgroundColor: '#6A539D',
    flex: 1,
    minHeight: '100%',
  },
  container: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#FFF',
    flexGrow: 2,
  },
  header: {
    fontSize: 36,
    color: '#FFF',
    fontFamily: 'Abel',
  },
  textProp: {
    color: '#6A539D',
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;

const styles = StyleSheet.create({});

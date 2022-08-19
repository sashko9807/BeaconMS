import { View, Text, StyleSheet, Switch, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import MainLayout from '../../container/MainLayout';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

import RightArrow from '../../assets/RightArrow';
import FingerPrint from '../../assets/Fingerprint';
import PinIcon from '../../assets/PinIcon';
import PasswordIcon from '../../assets/PasswordIcon';

const ChangePasswordSection = () => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: '#6A539D',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '95%',
      }}
    >
      <View
        style={{
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <PasswordIcon />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text
            style={{ fontSize: 20, fontFamily: 'Roboto', fontWeight: '500' }}
          >
            Change password
          </Text>
        </View>
        <View>
          <RightArrow />
        </View>
      </View>
    </View>
  );
};

const AuthenticationSection = () => {
  const [isFingerPrintEnabled, setIsFingerPrintEnabled] = useState(false);
  const [isPinEnabled, setIsPinEnabled] = useState(false);
  const [fingerPrintExists, setFingerPrintExists] = useState(false);

  const rnBiometrics = new ReactNativeBiometrics();

  const toggleFingerPrintSwitch = () =>
    setIsFingerPrintEnabled((previousState) => !previousState);

  useEffect(() => {
    rnBiometrics.biometricKeysExist().then((resultObject) => {
      const { keysExist } = resultObject;

      if (keysExist) {
        setFingerPrintExists(true);
        setIsFingerPrintEnabled(true);
      } else {
        console.log('Keys do not exist or were deleted');
      }
    });
  }, []);

  useEffect(() => {
    const fingerprint = async () => {
      if (isFingerPrintEnabled && fingerPrintExists !== true) {
        rnBiometrics.createKeys().then((resultObject) => {
          const { publicKey } = resultObject;
          console.log(publicKey);
          //sendPublicKeyToServer(publicKey);
        });
      }

      if (!isFingerPrintEnabled && fingerPrintExists === true) {
        rnBiometrics.deleteKeys().then((resultObject) => {
          const { keysDeleted } = resultObject;

          if (keysDeleted) {
            console.log('Successful deletion');
            setFingerPrintExists(false);
          } else {
            console.log(
              'Unsuccessful deletion because there were no keys to delete'
            );
          }
        });
      }
    };
    fingerprint();
  }, [isFingerPrintEnabled]);

  const togglePINSwitch = () =>
    setIsPinEnabled((previousState) => !previousState);

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: '#6A539D',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '95%',
      }}
    >
      <View style={{ marginVertical: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <View>
            <FingerPrint />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text
              style={{ fontSize: 20, fontFamily: 'Roboto', fontWeight: '500' }}
            >
              Login with Fingerprint ID
            </Text>
          </View>
          <View>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isFingerPrintEnabled ? '#f4f3f4' : '#f4f3f4'}
              onValueChange={toggleFingerPrintSwitch}
              value={isFingerPrintEnabled}
            />
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <PinIcon />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Roboto',
                  fontWeight: '500',
                }}
              >
                Login with PIN
              </Text>
            </View>
            <View>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isPinEnabled ? '#f4f3f4' : '#f4f3f4'}
                onValueChange={togglePINSwitch}
                value={isPinEnabled}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const SettingsScreen = ({ navigation }) => {
  const [isFingerPrintSupported, setIsFingerPrintSupported] = useState(false);

  useEffect(() => {
    const checkFingerPrintSupport = async () => {
      const rnBiometrics = new ReactNativeBiometrics();

      const { biometryType } = await rnBiometrics.isSensorAvailable();

      if (biometryType === BiometryTypes.Biometrics) {
        setIsFingerPrintSupported(true);
      }
    };
    checkFingerPrintSupport();
  }, []);

  return (
    <MainLayout>
      <View
        style={{
          marginTop: 20,
          marginLeft: 30,
          flex: 1,
        }}
      >
        <Pressable onPress={() => navigation.navigate('ChangePasswordScreen')}>
          <ChangePasswordSection />
        </Pressable>
        {isFingerPrintSupported ? (
          <View style={{ marginTop: 20 }}>
            <AuthenticationSection />
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
    </MainLayout>
  );
};

export default SettingsScreen;

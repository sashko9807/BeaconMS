import { View, Text, StyleSheet, Pressable } from 'react-native';

import MainLayout from '../../container/MainLayout';

import RightArrow from '../../assets/RightArrow';
import PasswordIcon from '../../assets/PasswordIcon';

import { CHANGE_PASSWORD } from '../../globals/NavigationNames';

import globalStyles from '../../globals/styles'

const ChangePasswordSection = () => {
  return (
    <View style={changePasswordSectionStyle.wrapper}>
      <View style={changePasswordSectionStyle.container}>
        <View>
          <PasswordIcon />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={changePasswordSectionStyle.changePasswordButtonText}>
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


const SettingsScreen = ({ navigation }) => {
  return (
    <MainLayout>
      <View style={SettingStyle.wrapper} >
        <Pressable onPress={() => navigation.navigate(CHANGE_PASSWORD)}>
          <ChangePasswordSection />
        </Pressable>
      </View>
    </MainLayout>
  );
};

const SettingStyle = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    marginLeft: 30,
    flex: 1,
  }
})

const changePasswordSectionStyle = StyleSheet.create({
  wrapper: {
    borderBottomColor: globalStyles.colorSet.PRIMARY,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '95%',
  },
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  changePasswordButton: {
    flex: 1,
    marginLeft: 10
  },
  changePasswordButtonText: {
    fontSize: globalStyles.fontSizeSet.fontMedium,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    fontWeight: '500'
  }
})
export default SettingsScreen;

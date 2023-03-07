import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import WelcomeScreen from '../screens/Authentication/WelcomeScreen';
import RegisterModal from '../screens/Authentication/RegisterModal';
import ForgottenPasswordModal from '../screens/Authentication/ForgottenPasswordModal';

import HomeScreen from '../screens/Home/HomeScreen'
import AddBuildingScreen from '../screens/Home/buildings/AddBuildingScreen';
import BuildingDetailsScreen from '../screens/Home/buildings/BuildingDetailsScreen';
import RangeForBeaconsScreen from '../screens/Home/beacons/RangeForBeaconsScreen';
import AddBeaconScreen from '../screens/Home/beacons/AddBeaconScreen';
import EditBeaconScreen from '../screens/Home/beacons/EditBeaconScreen';
import ShowBeaconDataScreen from '../screens/Home/beacons/ShowBeaconDataScreen';

import SettingsScreen from '../screens/Settings/SettingsScreen'
import ChangePasswordScreen from '../screens/Settings/ChangePasswordScreen';

import { useSelector } from 'react-redux';
import { selectAccessToken } from '../redux/authSlice';

import * as path from '../globals/NavigationNames';
import globalStyles from '../globals/styles'
import { moderateScale } from '../utils/scaling';

const AppNavigator = () => {
  const Stack = createStackNavigator();
  const accessToken = useSelector(selectAccessToken);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: globalStyles.colorSet.PRIMARY,
        },
        headerTitleStyle: {
          fontSize: moderateScale(18)
        },
        headerBackTitleStyle: {
          //fontSize: moderateScale(18)
        },
        headerShadowVisible: false,
        headerTintColor: '#FFF',
      }}
    >
      {accessToken === null ? (
        <>
          <Stack.Screen
            name={path.WELCOME_SCREEN}
            options={{ headerShown: false }}
            component={WelcomeScreen}
          />
          <Stack.Group
            screenOptions={{
              presentation: 'modal',
            }}
          >
            <Stack.Screen
              name={path.REGISTER_MODAL}
              options={{ headerShown: false }}
              component={RegisterModal}
            />
            <Stack.Screen
              name={path.FORGOTTEN_PASSWORD_MODAL}
              component={ForgottenPasswordModal}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen
            name="_home"
            component={DrawerNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={path.ADD_BUILDING}
            options={{
              headerTintColor: '#FFFFFF',
              title: 'Add new building',
            }}
            component={AddBuildingScreen}
          />
          <Stack.Screen
            name={path.BUILDING_DETAILS}
            component={BuildingDetailsScreen}
            options={({ route }) => ({
              title: route.params.buildingName,
            })}
          />
          <Stack.Screen
            name={path.RANGE_FOR_BEACONS}
            component={RangeForBeaconsScreen}
            options={() => ({
              title: 'Scan for beacons',
            })}
          />
          <Stack.Screen
            name={path.ADD_BEACON}
            component={AddBeaconScreen}
            options={({ route }) => ({
              title: route.params.title,
            })}
          />
          <Stack.Screen
            name={path.EDIT_BEACON}
            component={EditBeaconScreen}
            options={({ route }) => ({
              title: route.params.title,
            })}
          />
          <Stack.Screen
            name={path.CHANGE_PASSWORD}
            component={ChangePasswordScreen}
            options={() => ({
              title: 'Change Password',
            })}
          />
          <Stack.Screen
            screenOptions={{
              presentation: 'modal',
              transparentCard: 'false',
            }}
            options={{ headerShown: false }}
            name={path.SHOW_BEACON_DATA}
            component={ShowBeaconDataScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6A539D',
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontSize: moderateScale(18)
        },
        drawerLabelStyle: {
          fontSize: moderateScale(14),
          fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
        },
        drawerActiveTintColor: globalStyles.colorSet.PRIMARY,
        headerTintColor: '#FFFFFF',
        headerShadowVisible: false,
      }}
    >
      <Drawer.Screen name={path.HOME} component={HomeScreen} />
      <Drawer.Screen name={path.SETTINGS} component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default AppNavigator;

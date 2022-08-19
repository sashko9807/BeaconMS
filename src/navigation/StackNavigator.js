import { createStackNavigator } from '@react-navigation/stack';

import DrawerNavigation from './DrawerNavigation';

import WelcomeScreen from '../screens/Authentication/WelcomeScreen';
import RegisterModal from '../screens/Authentication/RegisterModal';
import ForgottenPasswordModal from '../screens/Authentication/ForgottenPasswordModal';

import AddBuildingScreen from '../screens/Home/AddBuildingScreen';
import BuildingDetailsScreen from '../screens/Home/BuildingDetailsScreen';
import ScanForBeaconsScreen from '../screens/Home/ScanForBeaconsScreen';
import AddBeaconScreen from '../screens/Home/AddBeaconScreen';

import ChangePasswordScreen from '../screens/Settings/ChangePasswordScreen';

import React from 'react';

import { useSelector } from 'react-redux';
import { selectAccessToken } from '../redux/authSlice';
import ShowBeaconData from '../components/ShowBeaconData';

const StackNavigator = () => {
  const Stack = createStackNavigator();
  const accessToken = useSelector(selectAccessToken);
  console.log(`StackNavigator: access token is ${accessToken}`);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6A539D',
        },
        headerShadowVisible: false,
        headerTintColor: '#FFF',
      }}
    >
      {accessToken === null ? (
        <>
          <Stack.Screen
            name="WelcomeScreen"
            options={{ headerShown: false }}
            component={WelcomeScreen}
          />
          <Stack.Group
            screenOptions={{
              presentation: 'transparentModal',
              transparentCard: true,
            }}
          >
            <Stack.Screen
              name="RegisterModal"
              options={{ headerShown: false }}
              component={RegisterModal}
            />
            <Stack.Screen
              name="ForgottenPasswordModal"
              component={ForgottenPasswordModal}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={DrawerNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddBuilding"
            options={{
              headerTintColor: '#FFFFFF',
              title: 'Add new building',
            }}
            component={AddBuildingScreen}
          />
          <Stack.Screen
            name="BuildingDetails"
            component={BuildingDetailsScreen}
            options={({ route }) => ({
              title: route.params.buildingName,
            })}
          />
          <Stack.Screen
            name="ScanForBeacons"
            component={ScanForBeaconsScreen}
            options={() => ({
              title: 'Scan for beacons',
            })}
          />
          <Stack.Screen
            name="AddBeaconScreen"
            component={AddBeaconScreen}
            options={({ route }) => ({
              title: route.params.title,
            })}
          />
          <Stack.Screen
            name="ChangePasswordScreen"
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
            name="ShowBeaconData"
            component={ShowBeaconData}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;

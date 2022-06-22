import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigation from "./navigation/DrawerNavigation";
import { NavigationConstants } from "./constants/NavigationNames";

import AddBuildingScreen from "./screens/AddBuildingScreen";
import BuildingDetailsScreen from "./screens/BuildingDetailsScreen";
import ScanForBeaconsScreen from "./screens/ScanForBeaconsScreen";
import AddBeaconScreen from "./screens/AddBeaconScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import RegisterModal from "./screens/RegisterModal";
import ForgottenPasswordModal from "./screens/ForgottenPasswordModal";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"WelcomeScreen"}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#6A539D",
          },
          headerShadowVisible: false,
          headerTintColor: "#FFF",
        }}
      >
        <Stack.Screen
          name={NavigationConstants.HOME}
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddBuilding"
          options={{
            headerTintColor: "#FFFFFF",
            title: "Add new building",
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
        <Stack.Screen name="ScanForBeacons" component={ScanForBeaconsScreen} />
        <Stack.Screen name="AddBeaconScreen" component={AddBeaconScreen} />
        <Stack.Screen
          name="WelcomeScreen"
          options={{ headerShown: false }}
          component={WelcomeScreen}
        />
        <Stack.Group
          screenOptions={{
            presentation: "transparentModal",
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

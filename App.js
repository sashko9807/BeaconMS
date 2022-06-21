import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigation from "./navigation/DrawerNavigation";
import { NavigationConstants } from "./constants/NavigationNames";

import AddBuildingScreen from "./screens/AddBuildingScreen";
import BuildingDetailsScreen from "./screens/BuildingDetailsScreen";
import ScanForBeaconsScreen from "./screens/ScanForBeaconsScreen";
import AddBeaconScreen from "./screens/AddBeaconScreen";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#6A539D",
            borderBottomWidth: 0,
          },
          headerTintColor: "#FFFFFF",
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

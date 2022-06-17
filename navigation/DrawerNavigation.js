import { createDrawerNavigator } from "@react-navigation/drawer";
import DashboardScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6A539D",
          borderBottomWidth: 0,
        },
        headerTintColor: "#FFFFFF",
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

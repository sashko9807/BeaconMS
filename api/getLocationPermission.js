import { View, Text, PermissionsAndroid } from "react-native";
import { useState, useEffect } from "react";

const getLocationPermission = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Beacon scanning location permission",
          message:
            "Beacon Managment System needs access to your location " +
            "so it can scan for beacons.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      ).catch((err) => {
        console.warn(err);
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsPermissionGranted(true);
      }

      return isPermissionGranted;
    };
    requestLocationPermission();
  }, []);
};

export default getLocationPermission;

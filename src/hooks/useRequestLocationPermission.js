import { useState, useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';

export const useRequestLocationPermission = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  const getLocationPermission = async () => {
    const isGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (isGranted) {
      return setIsPermissionGranted(true);
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Beacon scanning location permission',
        message:
          'Beacon Managment System needs access to your location ' +
          'so it can scan for beacons.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    ).catch((err) => {
      console.warn(err);
    });
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setIsPermissionGranted(true);
    }
  };

  useEffect(() => {
    getLocationPermission();
  }, []);

  return isPermissionGranted;
};

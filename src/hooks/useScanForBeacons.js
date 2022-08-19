import Beacons from 'react-native-beacons-manager';
import { DeviceEventEmitter } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';

export const useScanForBeacons = () => {
  const [scan, setScan] = useState(false);
  const [beaconsInRange, setBeaconsInRange] = useState([]);

  const isFocused = useIsFocused();

  const isScanning = () => {
    setScan(!scan);
  };

  useEffect(() => {
    if (!scan) {
      DeviceEventEmitter.removeAllListeners('beaconsDidRange');
      return;
    }
    scanForBeacons();
  }, [scan]);

  useEffect(() => {
    if (!isFocused) {
      DeviceEventEmitter.removeAllListeners('beaconsDidRange');
      setScan(false);
      return;
    }
    setScan(true);
  }, [isFocused]);

  const scanForBeacons = async () => {
    Beacons.detectIBeacons();

    try {
      await Beacons.startRangingBeaconsInRegion('REGION1');
      console.log(`Beacons ranging started succesfully!`);
    } catch (err) {
      console.log(`Beacons ranging not started, error: ${error}`);
    }

    DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
      data.beacons.forEach((elem) => {
        console.log(data.beacons);
        setBeaconsInRange(data.beacons);
      });
    });
  };

  return [beaconsInRange, scan, { isScanning }];
};

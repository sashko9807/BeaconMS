import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";

import { DeviceEventEmitter } from "react-native";
import Beacons from "react-native-beacons-manager";

import { useIsFocused } from "@react-navigation/native";

import BluetoothStateManager from "react-native-bluetooth-state-manager";

import LocationEnabler from "react-native-location-enabler";

import IBeaconCard from "../components/iBeaconCard";
import ScanButton from "../components/ScanButton";

import MainLayout from "../container/MainLayout";

//import getLocationPermission from "../api/getLocationPermission";

const BeaconsInRangeScreen = ({ navigation }) => {
  const [bluetoothEnabled, setBluetothEnabled] = useState(false);
  const [beaconsInRange, setBeaconsInRange] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  const isFocused = useIsFocused();

  const {
    PRIORITIES: { HIGH_ACCURACY },
    useLocationSettings,
  } = LocationEnabler;

  const [enabled, requestResolution] = useLocationSettings({
    priority: HIGH_ACCURACY,
  });

  const checkBluetooth = async () => {
    const bluetoothState = await BluetoothStateManager.getState();
    if (!bluetoothState) throw new Error("Couldn't get bluetooth state");
    if (bluetoothState === "PoweredOff") {
      const request = await BluetoothStateManager.requestToEnable();
      if (request) setBluetothEnabled(true);
    }
    if (bluetoothState === "PoweredOn") setBluetothEnabled(true);
  };

  const getLocationPermission = async () => {
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
  };
  const scanForBeacons = async () => {
    const isGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (!isGranted) {
      getLocationPermission();
    }

    if (!enabled) {
      requestResolution();
    }

    console.log("isGranted: " + isGranted);

    Beacons.detectIBeacons();

    // Start detecting all iBeacons in the nearby
    try {
      await Beacons.startRangingBeaconsInRegion("REGION1");
      console.log(`Beacons ranging started succesfully!`);
    } catch (err) {
      console.log(`Beacons ranging not started, error: ${error}`);
    }

    // Print a log of the detected iBeacons (1 per second)
    DeviceEventEmitter.addListener("beaconsDidRange", (data) => {
      data.beacons.forEach((elem) => {
        if (elem.beacon_type !== null) {
          console.log(elem.beacon_type);
          setBeaconsInRange(data.beacons);
        }
      });
    });
  };

  useEffect(() => {
    if (!isScanning) {
      DeviceEventEmitter.removeAllListeners("beaconsDidRange");
      return;
    }
    scanForBeacons();
  }, [isScanning]);

  useEffect(() => {
    if (!isFocused) {
      DeviceEventEmitter.removeAllListeners("beaconsDidRange");
    }
    setIsScanning(false);
  }, [isFocused]);

  useEffect(() => {
    console.log(beaconsInRange);
  }, [beaconsInRange]);

  useEffect(() => {
    (async () => {
      await checkBluetooth().catch((err) => {
        console.log(err);
      });
    })();

    return () => {
      DeviceEventEmitter.removeAllListeners("beaconsDidRange");
    };
  }, []);

  return (
    <MainLayout>
      <ScrollView style={{ flex: 1 }}>
        {bluetoothEnabled ? (
          <Text></Text>
        ) : (
          <Text>Bluetooth needs to be enabled</Text>
        )}
        {beaconsInRange.map((currBeacon) => {
          return (
            <View
              key={`${currBeacon.uuid}-${currBeacon.major}-${currBeacon.minor}`}
            >
              <IBeaconCard
                onPress={() => {
                  navigation.navigate("AddBeaconScreen", {
                    beacon_type: currBeacon.beacon_type,
                    uuid: currBeacon.uuid,
                    major: currBeacon.major,
                    minor: currBeacon.minor,
                  });
                }}
                beacon_type={currBeacon.beacon_type}
                distance={currBeacon.distance.toFixed(2)}
                uuid={currBeacon.uuid}
                major={currBeacon.major}
                minor={currBeacon.minor}
                rssi={currBeacon.rssi}
              />
            </View>
          );
        })}
      </ScrollView>
      <ScanButton
        onPress={() => setIsScanning(!isScanning)}
        isScanning={isScanning}
      />
    </MainLayout>
  );
};

export default BeaconsInRangeScreen;

const styles = StyleSheet.create({});

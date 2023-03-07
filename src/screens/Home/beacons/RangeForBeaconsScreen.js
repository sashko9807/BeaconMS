import { StyleSheet, Text, View, ScrollView } from 'react-native';

import BeaconCard from '../../../components/BeaconCard';
import ScanButton from '../../../components/ScanButton';
import { InlineButton } from '../../../components/Buttons';
import MainLayout from '../../../container/MainLayout';

import { useLocationTurnOn } from '../../../hooks/useLocationTurnOn';
import { useRequestLocationPermission } from '../../../hooks/useRequestLocationPermission';
import { useScanForBeacons } from '../../../hooks/useScanForBeacons';
import { useGetBluetoothState } from '../../../hooks/useGetBluetoothState';

import { ADD_BEACON } from '../../../globals/NavigationNames';
import { moderateScale } from '../../../utils/scaling';

const RangeForBeaconsScreen = ({ navigation }) => {

  const [enabled, requestResolution] = useLocationTurnOn()
  const [isLocationPermissionGranted, requestPermission] = useRequestLocationPermission();
  const [isBluetoothEnabled, requestToEnable] = useGetBluetoothState();


  const [beaconsInRange, scan, setIsScanning] = useScanForBeacons();


  const LocationDisabled = () => {
    return (
      <MainLayout>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: moderateScale(17) }}>Location needs to be enabled in order to scan for beacons</Text>
          <InlineButton title="Turn on" onPress={() => requestResolution()} />
        </View>
      </MainLayout>
    )
  }
  const PermissionNotGranted = () => {
    return (
      <MainLayout>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: moderateScale(17) }}>Location permission must be granted in order to scan for beacons</Text>
          <InlineButton title="Prompt for permission" onPress={() => requestPermission()} />
        </View>
      </MainLayout>
    )
  }

  const BluetoothDisabled = () => {
    return (
      <MainLayout>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: moderateScale(17) }} >Bluetooth needs to be enabled in order to scan for beacons</Text>
          <InlineButton title="Turn on" onPress={() => requestToEnable()} />
        </View>
      </MainLayout>
    )
  }

  if (!isLocationPermissionGranted()) return <PermissionNotGranted />
  if (!enabled) return <LocationDisabled />
  if (!isBluetoothEnabled()) return <BluetoothDisabled />

  return (
    <MainLayout>
      <ScrollView style={{ flex: 1 }}>
        {beaconsInRange.map((currBeacon) => {
          <View key={`${currBeacon.uuid}-${currBeacon.major}-${currBeacon.minor}`} style={{ paddingHorizontal: 15 }}>
            <BeaconCard
              onPress={() => {
                navigation.navigate(ADD_BEACON, {
                  beacons: { ...currBeacon },
                });
              }}
              beaconData={{
                beaconType: currBeacon.beacon_type,
                distance: currBeacon.distance.toFixed(2),
                uuid: currBeacon.uuid,
                major: currBeacon.major,
                minor: currBeacon.minor,
                rssi: currBeacon.rssi,
              }}
            />
          </View>

        })}
      </ScrollView>
      <ScanButton onPress={() => setIsScanning()} isScanning={scan} />
    </MainLayout>
  );
};

export default RangeForBeaconsScreen;

const styles = StyleSheet.create({});

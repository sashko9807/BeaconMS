import { StyleSheet, Text, View, ScrollView } from 'react-native';

import BeaconCard from '../../components/BeaconCard';
import ScanButton from '../../components/ScanButton';

import MainLayout from '../../container/MainLayout';

import { useLocationTurnOn } from '../../hooks/useLocationTurnOn';
import { useRequestLocationPermission } from '../../hooks/useRequestLocationPermission';
import { useScanForBeacons } from '../../hooks/useScanForBeacons';
import { useGetBluetoothState } from '../../hooks/useGetBluetoothState';

const BeaconsInRangeScreen = ({ route, navigation }) => {
  const location = useLocationTurnOn();
  const permission = useRequestLocationPermission();

  const bluetoothEnabled = useGetBluetoothState();

  const [beaconsInRange, scan, { isScanning }] = useScanForBeacons();

  return (
    <MainLayout>
      <ScrollView style={{ flex: 1 }}>
        {bluetoothEnabled ? (
          beaconsInRange.map((currBeacon) => {
            return (
              <View
                key={`${currBeacon.uuid}-${currBeacon.major}-${currBeacon.minor}`}
              >
                <BeaconCard
                  onPress={() => {
                    navigation.navigate('AddBeaconScreen', {
                      beacons: { ...currBeacon },
                    });
                  }}
                  beacon_type={currBeacon.beacon_type}
                  distance={currBeacon.distance.toFixed(2)}
                  beacon_data={{
                    uuid: currBeacon.uuid,
                    major: currBeacon.major,
                    minor: currBeacon.minor,
                    rssi: currBeacon.rssi,
                  }}
                />
              </View>
            );
          })
        ) : (
          <Text>Bluetooth needs to be enabled</Text>
        )}
      </ScrollView>
      <ScanButton onPress={isScanning} isScanning={scan} />
    </MainLayout>
  );
};

export default BeaconsInRangeScreen;

const styles = StyleSheet.create({});

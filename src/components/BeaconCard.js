import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';

const BeaconCard = ({
  onPress,
  beacon_type = '',
  distance = undefined,
  beacon_data = {},
}) => {
  const [beaconType, setBeaconType] = useState('');

  useEffect(() => {
    if (beacon_type) {
      setBeaconType(beacon_type);
    }
  }, [beacon_type]);

  return (
    <View>
      <Pressable onPress={onPress}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              {beaconType ? (
                <View style={{ alignSelf: 'flex-start' }}>
                  <Text style={styles.beaconType}>{beaconType}</Text>
                </View>
              ) : (
                <View style={[styles.inputs]}>
                  <Picker
                    selectedValue={beaconType}
                    onValueChange={(selectedDataType) => {
                      setBeaconType(selectedDataType);
                    }}
                  >
                    <Picker.Item label="Select data type" value={'none'} />
                    <Picker.Item label="iBeacon" value={'ibeacon'} />
                    <Picker.Item label="Altbeacon" value={'altbeacon'} />
                  </Picker>
                </View>
              )}
              {distance && (
                <View style={styles.beaconDistance}>
                  <Text style={{ fontSize: 22 }}>{distance}</Text>
                </View>
              )}
            </View>
            {(beaconType === 'ibeacon' || beaconType === 'altbeacon') && (
              <IBeaconCard beaconData={beacon_data} />
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const IBeaconCard = ({ beaconData = {} }) => {
  console.log(beaconData.uuid);
  return (
    <>
      {beaconData.uuid ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 18 }}>UUID</Text>
          <Text style={{ fontSize: 16 }}>{beaconData.uuid}</Text>
        </View>
      ) : (
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 18 }}>UUID</Text>
          <TextInput placeholder="Beacon UUID" />
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}
      >
        {beaconData.major && beaconData.minor ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ marginRight: 10 }}>
              <Text style={{ fontSize: 18 }}>Major</Text>
              <Text style={{ fontSize: 16 }}>{beaconData.major}</Text>
            </View>
            <View style={{ marginRight: 10 }}>
              <Text style={{ fontSize: 18 }}>Minor</Text>
              <Text style={{ fontSize: 16 }}>{beaconData.minor}</Text>
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ marginRight: 10 }}>
              <Text style={{ fontSize: 18 }}>Major</Text>
              <TextInput placeholder="Major" />
            </View>
            <View style={{ marginRight: 10 }}>
              <Text style={{ fontSize: 18 }}>Minor</Text>
              <TextInput placeholder="Minor" />
            </View>
          </View>
        )}
        {beaconData.rssi && (
          <View>
            <Text style={{ fontSize: 18 }}>RSSI</Text>
            <Text style={{ fontSize: 16 }}>{beaconData.rssi}</Text>
          </View>
        )}
        {beaconData.tx && (
          <View>
            <Text style={{ fontSize: 18 }}>TX</Text>
            <Text style={{ fontSize: 16 }}>{beaconData.tx}</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default BeaconCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: ' #FFF',
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    marginHorizontal: 10,
    marginTop: 20,
  },
  cardContent: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  beaconType: {
    fontSize: 22,
  },
  beaconDistance: {
    alignSelf: 'flex-end',
  },
  inputs: {
    width: '90%',
    borderWidth: 1,
    minHeight: 60,
    borderRadius: 10,
    alignContent: 'center',
    color: '#6A539D',
    borderColor: '#6A539D',
    fontSize: 15,
  },
});

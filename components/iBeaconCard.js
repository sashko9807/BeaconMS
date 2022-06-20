import { StyleSheet, Text, View } from "react-native";
import React from "react";

const IBeaconCard = ({
  beacon_type,
  distance,
  uuid,
  major,
  minor,
  rssi,
  tx,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            paddingBottom: 5,
          }}
        >
          <View style={{ alignSelf: "flex-start" }}>
            <Text style={styles.beaconType}>{beacon_type}</Text>
          </View>
          <View style={styles.beaconDistance}>
            <Text style={{ fontSize: 22 }}>{distance}</Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 18 }}>UUID</Text>
          <Text style={{ fontSize: 16 }}>{uuid}</Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View style={{ marginRight: 10 }}>
              <Text style={{ fontSize: 18 }}>Major</Text>
              <Text style={{ fontSize: 16 }}>{major}</Text>
            </View>
            <View style={{ marginRight: 10 }}>
              <Text style={{ fontSize: 18 }}>Minor</Text>
              <Text style={{ fontSize: 16 }}>{minor}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18 }}>RSSI</Text>
              <Text style={{ fontSize: 16 }}>{rssi}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18 }}>TX</Text>
              <Text style={{ fontSize: 16 }}>{tx}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default IBeaconCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: " #FFF",
    shadowColor: "#333",
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
    alignSelf: "flex-end",
  },
});

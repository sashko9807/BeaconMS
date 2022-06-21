import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const IBeaconCard = ({
  onPress,
  beacon_type = undefined,
  distance = undefined,
  uuid = undefined,
  major = undefined,
  minor = undefined,
  rssi = undefined,
  tx = undefined,
}) => {
  return (
    <View>
      <Pressable onPress={onPress}>
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
              {beacon_type ? (
                <View style={{ alignSelf: "flex-start" }}>
                  <Text style={styles.beaconType}>{beacon_type}</Text>
                </View>
              ) : (
                <Text></Text>
              )}
              {distance ? (
                <View style={styles.beaconDistance}>
                  <Text style={{ fontSize: 22 }}>{distance}</Text>
                </View>
              ) : (
                <Text></Text>
              )}
            </View>
            {uuid ? (
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 18 }}>UUID</Text>
                <Text style={{ fontSize: 16 }}>{uuid}</Text>
              </View>
            ) : (
              <Text></Text>
            )}
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                {major && minor ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
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
                  </View>
                ) : (
                  <Text></Text>
                )}
                {rssi ? (
                  <View>
                    <Text style={{ fontSize: 18 }}>RSSI</Text>
                    <Text style={{ fontSize: 16 }}>{rssi}</Text>
                  </View>
                ) : (
                  <Text></Text>
                )}
                {tx ? (
                  <View>
                    <Text style={{ fontSize: 18 }}>TX</Text>
                    <Text style={{ fontSize: 16 }}>{tx}</Text>
                  </View>
                ) : (
                  <Text></Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </Pressable>
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

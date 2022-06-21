import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

const BeaconsPerFloor = ({ floorNumber, children, isEmpty = false }) => {
  const [showBeacons, setShowBeacons] = useState(!isEmpty);

  return (
    <View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text style={floorStyles.text}>Floor {floorNumber}</Text>
        {showBeacons ? (
          <View style={floorStyles.button}>
            <Pressable onPress={() => setShowBeacons(!showBeacons)}>
              <Text style={floorStyles.showButton}>Hide</Text>
            </Pressable>
          </View>
        ) : (
          <View style={floorStyles.button}>
            <Pressable onPress={() => setShowBeacons(!showBeacons)}>
              <Text style={floorStyles.showButton}>Show</Text>
            </Pressable>
          </View>
        )}
      </View>
      {showBeacons ? <View>{children}</View> : <Text></Text>}
    </View>
  );
};

const floorStyles = StyleSheet.create({
  text: {
    marginLeft: 10,
    marginTop: 30,
    color: "#6A539D",
    fontSize: 17,
    fontWeight: "bold",
    justifyContent: "space-between",
    borderColor: "red",
  },
  button: {
    position: "absolute",
    left: "85%",
    bottom: "10%",
  },
  showButton: {
    color: "#6A539D",
    fontSize: 17,
  },
});

export default BeaconsPerFloor;

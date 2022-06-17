import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

import Bluetooth from "../assets/Bluetooth.svg";
import EditBeacon from "../assets/EditBeacon.svg";
import DeleteBeacon from "../assets/DeleteBeacon.svg";

const BeaconList = ({ name }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        marginLeft: 50,
        height: "70%",
        width: "80%",
        marginBottom: 20,
      }}
    >
      <Bluetooth width={25} height={25} />
      <Pressable
        onPress={() => {
          console.log("beacon data");
        }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={listStyle.text}>{name}</Text>
        </View>
      </Pressable>
      <View style={listStyle.listButtons}>
        <View style={{ marginRight: 10 }}>
          <Pressable
            onPress={() => {
              console.log("edit");
            }}
          >
            <EditBeacon width={25} height={25} />
          </Pressable>
        </View>
        <View style={{ marginLeft: 5 }}>
          <Pressable onPress={() => console.log("remove")}>
            <DeleteBeacon width={25} height={25} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const listStyle = StyleSheet.create({
  text: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 40,
    alignContent: "center",
  },
  listButtons: {
    flex: 1,
    paddingRight: 7,
    marginLeft: 6,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

export default BeaconList;

import {
  View,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";

const AddBuilding = ({ onPress }) => {
  return (
    <View style={buttonStyling.fixedView}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Image
          source={require("../assets/add.png")}
          style={{ width: 75, height: 75 }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const buttonStyling = StyleSheet.create({
  fixedView: {
    position: "absolute",
    right: 50,
    bottom: 50,
  },
});

export default AddBuilding;

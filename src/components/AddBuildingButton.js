import { View, Pressable, Image, StyleSheet } from 'react-native';
import React from 'react';

const AddBuildingButton = ({ onPress }) => {
  return (
    <View style={buttonStyling.fixedView}>
      <Pressable onPress={onPress}>
        <Image
          source={require('../assets/add.png')}
          style={{ width: 75, height: 75 }}
        />
      </Pressable>
    </View>
  );
};

const buttonStyling = StyleSheet.create({
  fixedView: {
    position: 'absolute',
    right: 50,
    bottom: 50,
  },
});

export default AddBuildingButton;

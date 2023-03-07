import { View, Pressable, Image, StyleSheet } from 'react-native';
import React from 'react';
import { moderateScale } from '../utils/scaling';

const AddBuildingButton = ({ onPress }) => {
  return (
    <View style={buttonStyling.buttonPos}>
      <Pressable onPress={onPress}>
        <Image
          source={require('../assets/add.png')}
          style={{ width: moderateScale(75, 0.3), height: moderateScale(75, 0.3) }}
        />
      </Pressable>
    </View>
  );
};

const buttonStyling = StyleSheet.create({
  buttonPos: {
    position: 'absolute',
    right: '5%',
    bottom: '5%',
  },
});

export default AddBuildingButton;

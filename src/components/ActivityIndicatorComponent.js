import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';

const ActivityIndicatorComponent = ({ text = '', size = "small", color = "#0000ff" }) => {
  return (
    <View style={styles.container} >
      <ActivityIndicator size={size} color={color} />
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
export default ActivityIndicatorComponent;

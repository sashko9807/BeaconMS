import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';

const ActivityIndicatorComponent = ({ text = '' }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size="small" color="#0000ff" />
      <Text>{text}</Text>
    </View>
  );
};

export default ActivityIndicatorComponent;

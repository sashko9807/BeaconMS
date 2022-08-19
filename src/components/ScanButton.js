import { View, Text, Pressable } from 'react-native';
import React from 'react';

const ScanButton = ({ onPress, isScanning }) => {
  return (
    <View
      style={{
        height: '10%',
        width: '20%',
        borderWidth: 1,
        position: 'absolute',
        bottom: '10%',
        left: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: '#6A539D',
        borderColor: '#FFF',
      }}
    >
      <Pressable onPress={onPress}>
        {isScanning ? (
          <Text style={{ color: '#FFF', fontSize: 17 }}>Stop</Text>
        ) : (
          <Text style={{ color: '#FFF', fontSize: 17 }}>Scan</Text>
        )}
      </Pressable>
    </View>
  );
};

export default ScanButton;

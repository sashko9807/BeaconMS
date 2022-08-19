import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <View style={mainStyle.wrapper}>
      <View style={mainStyle.container}>{children}</View>
    </View>
  );
};

const mainStyle = StyleSheet.create({
  wrapper: {
    backgroundColor: '#6A539D',
    //width: "100%",
  },
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#FFF',
    height: '100%',
  },
});

export default MainLayout;

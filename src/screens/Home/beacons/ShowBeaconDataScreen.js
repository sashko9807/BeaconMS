import { Image, StyleSheet, Text, View, StatusBar } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import ActivityIndicatorComponent from '../../../components/ActivityIndicatorComponent';

import { WebView } from 'react-native-webview';

import {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';

import globalStyles from '../../../globals/styles'
import { CDN_URL } from '../../../api/baseQuery';

const ShowBeaconDataScreen = ({ route }) => {
  const { dataType, data } = route.params;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      showNavigationBar();
      StatusBar.setHidden(false);
      return;
    }

    hideNavigationBar();
    StatusBar.setHidden(true);
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
      {dataType === 'image' && <ImageData imageUri={data} />}
      {dataType === 'plain-text' && <TextData message={data} />}
      {dataType === 'web-address' && <WebData link={data} />}
    </View>
  );
};

const ImageData = ({ imageUri }) => {
  console.log(`${CDN_URL}/beacons/${imageUri}`)
  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: `${CDN_URL}/beacons/${imageUri}` }} style={styles.bgImage} />
    </View>
  );
};

const WebData = ({ link }) => {
  return (
    <WebView
      source={{ uri: link }}
      startInLoadingState={true}
      renderLoading={() => {
        return (
          <View style={StyleSheet.absoluteFill}>
            <ActivityIndicatorComponent text="Loading" />
          </View>
        );
      }}
    />
  );
};

const TextData = ({ message }) => {
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

export default ShowBeaconDataScreen

const styles = StyleSheet.create({
  bgImage: {
    height: '100%',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: globalStyles.fontSizeSet.fontMedium,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary
  }
});

import { Image, StyleSheet, Text, View, StatusBar } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import ActivityIndicatorComponent from './ActivityIndicatorComponent';

import { WebView } from 'react-native-webview';

import {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';

const ShowBeaconData = ({ route }) => {
  const { messageType, message } = route.params;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      hideNavigationBar();
      StatusBar.setHidden(true);
    }
    return () => {
      showNavigationBar();
      StatusBar.setHidden(false);
    };
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
      {messageType === 'image' && <ImageData imageUri={message} />}
      {messageType === 'plain-text' && <TextData message={message} />}
      {messageType === 'web-address' && <WebData link={message} />}
    </View>
  );
};

const ImageData = ({ imageUri }) => {
  return (
    <View>
      <Image source={{ uri: imageUri }} style={styles.bgImage} />
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
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <ActivityIndicatorComponent text="Loading" />
          </View>
        );
      }}
    />
  );
};

const TextData = ({ message }) => {
  console.log(`textdata caled`);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 20 }}>{message}</Text>
    </View>
  );
};

export default ShowBeaconData;

const styles = StyleSheet.create({
  bgImage: {
    width: '100%',
    height: '100%',
    //flex: 1,
    //resizeMode: 'stretch',
  },
});

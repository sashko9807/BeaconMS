import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

import Bluetooth from '../assets/Bluetooth.svg';
import EditBeacon from '../assets/EditBeacon.svg';
import DeleteBeacon from '../assets/DeleteBeacon.svg';

import AlertWindow from '../components/AlertWindow';

const BeaconList = ({
  beacon,
  navigation,
  showAlertPopUp,
  isAlertPopUpVisible,
  onClose,
  onConfirm,
}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        marginLeft: 50,
        height: '70%',
        width: '80%',
        marginBottom: 20,
      }}
    >
      <AlertWindow
        isVisible={isAlertPopUpVisible}
        title={`Delete Beacon?`}
        message={`Are you sure you want to delete this beacon?`}
        onClose={onClose}
        onConfirm={onConfirm}
      />

      <Bluetooth width={25} height={25} />
      <Pressable
        onPress={() => {
          navigation.navigate('ShowBeaconData', {
            messageType: beacon.messageType,
            message: beacon.message,
          });
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={listStyle.text}>{beacon.name}</Text>
        </View>
      </Pressable>
      <View style={listStyle.listButtons}>
        <View style={{ marginRight: 10 }}>
          <Pressable
            onPress={() => {
              console.log('clicked');
              navigation.navigate('AddBeaconScreen', {
                title: beacon.name,

                isEditing: true,
                beaconEditData: { ...beacon },
              });
            }}
          >
            <EditBeacon width={25} height={25} />
          </Pressable>
        </View>
        <View style={{ marginLeft: 5 }}>
          <Pressable onPress={showAlertPopUp}>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
    alignContent: 'center',
  },
  listButtons: {
    flex: 1,
    paddingRight: 7,
    marginLeft: 6,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default BeaconList;

import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';

import React, { useState, useEffect, useCallback } from 'react';
import { Picker } from '@react-native-picker/picker';

import MainLayout from '../../container/MainLayout';
import BeaconCard from '../../components/BeaconCard';
import InsertImageButton from '../../components/InsertImageButton';
import ApiResultModal from '../../components/ApiResultModal';

import GenericButton from '../../components/GenericButton';
import {
  useAddWithTextMutation,
  useEditBeaconMutation,
} from '../../redux/beaconQueries';

import { useOpenGallery } from '../../hooks/useOpenGallery';
import ActivityIndicatorComponent from '../../components/ActivityIndicatorComponent';

import { useSelector } from 'react-redux';
import {
  selectBuildingID,
  selectBuildingName,
  selectBuildingTotalFloors,
} from '../../redux/buildingSlice';

const AddBeaconScreen = ({ route, navigation }) => {
  const { beacons, isEditing, beaconEditData } = route.params;

  const buildingID = useSelector(selectBuildingID);
  const buildingName = useSelector(selectBuildingName);
  const totalFloors = useSelector(selectBuildingTotalFloors);
  useEffect(() => console.log(buildingID, buildingName, totalFloors), []);

  const [apiStatus, setApiStatus] = useState('');
  const [apiMessage, setApiMessage] = useState('');
  const [showApiResultModal, setShowApiResultModal] = useState(false);

  const [floor, setFloor] = useState(isEditing ? beaconEditData.atFloor : 1);
  const [dataType, setDataType] = useState(
    isEditing ? beaconEditData.messageType : null
  );
  const [beaconName, setBeaconName] = useState(
    isEditing ? beaconEditData.name : ''
  );
  const [message, setMessage] = useState('');

  const [imageUri, imageName, OpenGallery] = useOpenGallery(true);

  useEffect(() => {
    if (imageUri) {
      const imageExt = imageUri.uri.split('.').pop();
      setMessage(`data:image/${imageExt};base64,${imageUri.base64} `);
    }
  }, [imageUri]);

  const [addBeacon, addBeaconResult] = useAddWithTextMutation();
  const [editBeacon, editBeaconResult] = useEditBeaconMutation();

  const HandleEditBeacon = async () => {
    try {
      console.log(buildingName);
      const beacon = await editBeacon({
        id: beaconEditData._id,
        name: beaconName,
        atFloor: floor,
        messageType: dataType,
        message: message,
      }).unwrap();
      setApiStatus(beacon.status);
      setApiMessage(beacon.message);
      setShowApiResultModal(true);
    } catch (err) {
      setApiStatus(err.data.status);
      setApiMessage(err.data.message);
      setShowApiResultModal(true);
    }
  };

  const addNewBeacon = async () => {
    const buildingData = {
      buildingID: buildingID,
      totalFloors: totalFloors,
    };

    const beaconData = {
      beacon_type: beacons.beacon_type,
      UUID: beacons.uuid,
      major: beacons.major,
      minor: beacons.minor,
    };
    try {
      const beacon = await addBeacon({
        beaconData,
        name: beaconName,
        atFloor: floor,
        buildingData: buildingData,
        messageType: dataType,
        message: message,
      }).unwrap();
      setApiStatus(beacon.status);
      setApiMessage(beacon.message);
      setShowApiResultModal(true);
    } catch (err) {
      setApiStatus(err.data.status);
      setApiMessage(err.data.message);
      setShowApiResultModal(true);
    }
  };

  const renderPicker = useCallback(() => {
    let ammountofPicks = [];
    if (isEditing) {
      for (let i = 0; i < beaconEditData.buildingData.totalFloors; i++) {
        ammountofPicks.push(i + 1);
      }
    } else {
      for (let i = 0; i < totalFloors; i++) {
        ammountofPicks.push(i + 1);
      }
    }

    return ammountofPicks.map((currItem) => {
      return (
        <Picker.Item
          key={currItem}
          label={currItem.toString()}
          value={currItem}
        />
      );
    });
  }, []);

  return (
    <MainLayout>
      {(editBeaconResult.isLoading || addBeaconResult.isLoading) && (
        <ApiResultModal
          isVisible={true}
          message={<ActivityIndicatorComponent text="Please wait..." />}
        />
      )}
      {(editBeaconResult.isSuccess || addBeaconResult.isSuccess) && (
        <ApiResultModal
          isVisible={showApiResultModal}
          title={apiStatus}
          message={apiMessage}
          onConfirm={() => {
            setShowApiResultModal(!showApiResultModal);
            navigation.navigate('BuildingDetails', {
              forceRerender: true,
              buildingName: buildingName,
              buildingID: buildingID,
            });
          }}
        />
      )}
      <ScrollView keyboardShouldPersistTaps="handled">
        {!isEditing && (
          <BeaconCard
            beacon_type={beacons ? beacons.beacon_type : ''}
            beacon_data={{
              uuid: beacons?.uuid,
              major: beacons?.major,
              minor: beacons?.minor,
              rssi: beacons?.rssi,
            }}
          />
        )}
        {!beacons && !isEditing && (
          <GenericButton
            name="Scan for beacons"
            onPress={() => navigation.navigate('ScanForBeacons')}
            borderStyle="inline"
          />
        )}
        <View style={{ marginTop: 30 }}>
          <Text style={styles.heading}>Beacon name</Text>
          <View style={{ marginLeft: 40 }}>
            <TextInput
              style={styles.inputs}
              placeholder="Beacon name"
              placeholderTextColor={'#6A539D'}
              value={beaconName}
              onChangeText={setBeaconName}
            />
            <Text style={styles.informationString}>
              Choose a name which will be associated with the beacon
            </Text>
          </View>
          <Text style={styles.heading}>Floor</Text>
          <View style={{ marginLeft: 40 }}>
            <View style={styles.inputs}>
              <Picker
                selectedValue={floor}
                onValueChange={(selectedFloor) => {
                  setFloor(selectedFloor);
                }}
              >
                {renderPicker()}
              </Picker>
            </View>
            <Text style={styles.informationString}>
              Select the floor at which the beacon will be located
            </Text>
          </View>
          <Text style={styles.heading}>Transmitted data</Text>
          <View style={{ marginLeft: 40 }}>
            <View style={styles.inputs}>
              <Picker
                selectedValue={dataType}
                onValueChange={(selectedDataType) => {
                  setDataType(selectedDataType);
                }}
              >
                <Picker.Item label="Select data type" value={'none'} />
                <Picker.Item label="Image" value={'image'} />
                <Picker.Item label="Plain text" value={'plain-text'} />
                <Picker.Item label="Web address" value={'web-address'} />
              </Picker>
            </View>
            <Text style={styles.informationString}>
              Select the the type of data which will be transmitted through the
              beacon
            </Text>
          </View>
        </View>
        {dataType === 'image' ? (
          <View style={{ marginVertical: 10, marginLeft: 20 }}>
            <InsertImageButton
              onPress={OpenGallery}
              image={imageName}
              isBeacon={true}
            />
          </View>
        ) : dataType === 'plain-text' ? (
          <View style={{ marginLeft: 40, marginVertical: 20 }}>
            <TextInput
              multiline={true}
              style={{
                borderWidth: 1,
                minHeight: 200,
                textAlignVertical: 'top',
                width: '90%',
                borderRadius: 10,
                color: '#6A539D',
                borderColor: '#6A539D',
                fontSize: 15,
                flexWrap: 'wrap',
                paddingHorizontal: 10,
              }}
              placeholder="Write a message"
              placeholderTextColor={'#6A539D'}
              value={message}
              onChangeText={setMessage}
            />
          </View>
        ) : (
          <Text></Text>
        )}

        <View style={{ marginVertical: 30 }}>
          <GenericButton
            name={isEditing ? 'Edit Beacon' : 'Add beacon'}
            onPress={() => (isEditing ? HandleEditBeacon() : addNewBeacon())}
            borderStyle="inline"
          />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const styles = new StyleSheet.create({
  heading: {
    marginLeft: 10,
    marginTop: 30,
    color: '#6A539D',
    fontSize: 17,
    fontWeight: 'bold',
  },
  inputs: {
    width: '90%',
    borderWidth: 1,
    minHeight: 60,
    borderRadius: 10,
    alignContent: 'center',
    color: '#6A539D',
    borderColor: '#6A539D',
    fontSize: 15,
  },

  informationString: {
    color: 'gray',
    fontSize: 15,
    fontWeight: '400',
  },
});

export default AddBeaconScreen;

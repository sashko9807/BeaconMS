import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setBuildingData } from '../../redux/buildingSlice';

import BeaconsPerFloor from '../../container/BeaconsPerFloor';
import MainLayout from '../../container/MainLayout';

import BeaconList from '../../components/BeaconList';
import ApiResultModal from '../../components/ApiResultModal';

import {
  useGetBeaconsForBuildingQuery,
  useDeleteBeaconMutation,
} from '../../redux/beaconQueries';

const BuildingDetailsScreen = ({ route, navigation }) => {
  const {
    buildingName,
    buildingID,
    totalFloors,
    forceRerender = false,
  } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBuildingData(buildingID, buildingName, totalFloors));
  }, []);

  const {
    data = [],
    error,
    isLoading,
  } = useGetBeaconsForBuildingQuery(buildingID);

  const [updatedData, setUpdatedData] = useState(false);

  useEffect(() => {
    if (forceRerender) {
      setUpdatedData(true);
    }
  }, [forceRerender]);

  const [deleteBeacon, deleteBeaconResult] = useDeleteBeaconMutation();
  console.log(buildingName);
  console.log(forceRerender);

  const [apiStatus, setApiStatus] = useState('');
  const [apiMessage, setApiMessage] = useState('');
  const [showApiResultModal, setShowApiResultModal] = useState(false);

  const [isAlertPopUpVisible, setIsAlertPopUpVisible] = useState(false);

  const deleteBeaconById = async (id) => {
    try {
      const beacon = await deleteBeacon({ id }).unwrap();
      setApiStatus(beacon.status);
      setApiMessage(beacon.message);
      setShowApiResultModal(true);
    } catch (err) {
      setApiStatus(err.data.status);
      setApiMessage(err.data.message);
      setShowApiResultModal(true);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        {item.beacons.length === 0 ? (
          <BeaconsPerFloor floorNumber={item._id.floor} isEmpty={true}>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 17,
                  fontStyle: 'italic',
                }}
              >
                No beacons have been added to this floor
              </Text>
            </View>
          </BeaconsPerFloor>
        ) : (
          <BeaconsPerFloor floorNumber={item._id.floor}>
            {item.beacons.map((currBeacon) => {
              return (
                <View key={currBeacon._id} style={{ marginTop: 10 }}>
                  <BeaconList
                    beacon={{ ...currBeacon }}
                    navigation={navigation}
                    showAlertPopUp={() => setIsAlertPopUpVisible(true)}
                    isAlertPopUpVisible={isAlertPopUpVisible}
                    onClose={() => setIsAlertPopUpVisible(!isAlertPopUpVisible)}
                    onConfirm={() => {
                      setIsAlertPopUpVisible(!isAlertPopUpVisible);
                      deleteBeaconById(currBeacon._id);
                    }}
                  />
                </View>
              );
            })}
          </BeaconsPerFloor>
        )}
        {(deleteBeaconResult.isSuccess || deleteBeaconResult.isError) && (
          <ApiResultModal
            isVisible={showApiResultModal}
            title={apiStatus}
            message={apiMessage}
            onConfirm={() => setShowApiResultModal(!showApiResultModal)}
          />
        )}
        {deleteBeaconResult.isLoading && (
          <ApiResultModal
            isVisible={true}
            message={
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            }
            onConfirm={() => setIsApiResultVisible(!showApiResultModal)}
          />
        )}
      </View>
    );
  };

  return (
    <MainLayout>
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      ) : (
        <View
          style={{
            borderBottomColor: '#6A539D',
            marginTop: 20,
            borderBottomWidth: 2,
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate('AddBeaconScreen', {
                title: 'Add new beacon',
              });
            }}
          >
            <Text
              style={{
                marginLeft: 20,
                fontSize: 20,
                fontFamily: 'Roboto',
                marginBottom: 10,
              }}
            >
              + Add new device
            </Text>
          </Pressable>
        </View>
      )}
      <FlatList
        data={data}
        extraData={updatedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item._id.floor}
        initialNumToRender={5}
      />
    </MainLayout>
  );
};

export default BuildingDetailsScreen;

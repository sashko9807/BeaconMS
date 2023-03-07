import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet
} from 'react-native';

import React, { useEffect, useState, useCallback } from 'react';

import { useDispatch } from 'react-redux';
import { setBuildingData } from '../../../redux/buildingSlice';

import MainLayout from '../../../container/MainLayout';

import ApiResultModal from '../../../components/ApiResultModal';
import AlertDialog from '../../../components/AlertDialog';
import ActivityIndicatorComponent from '../../../components/ActivityIndicatorComponent';

import Bluetooth from '../../../assets/Bluetooth.svg';
import EditBeacon from '../../../assets/EditBeacon.svg';
import DeleteBeacon from '../../../assets/DeleteBeacon.svg';

import {
  useGetBeaconsForBuildingQuery,
  useDeleteBeaconMutation,
} from '../../../api/beaconQueries';

import { ADD_BEACON, EDIT_BEACON, RANGE_FOR_BEACONS, SHOW_BEACON_DATA } from '../../../globals/NavigationNames';
import globalStyles from '../../../globals/styles'
import { ACTIONS, useApiResultReducer } from '../../../hooks/useApiResultReducer';

import { moderateScale } from '../../../utils/scaling';


const BuildingDetailsScreen = ({ route, navigation }) => {
  const {
    buildingName,
    buildingID,
    totalFloors,
  } = route.params;

  const reduxDispatch = useDispatch();
  const [deleteBeacon, deleteBeaconResult] = useDeleteBeaconMutation();

  const [store, dispatch] = useApiResultReducer()

  const [showBeacons, setShowBeacons] = useState(() => {
    let obj = {}
    for (let i = 0; i < totalFloors; i++) {
      obj[i + 1] = false
    }
    return obj
  })

  const [isAlertDialogVisible, setIsAlertDialogVisible] = useState(false);

  useEffect(() => {
    reduxDispatch(setBuildingData(buildingID, buildingName, totalFloors));
  }, []);

  const {
    data = [],
    error,
    isLoading,
  } = useGetBeaconsForBuildingQuery(buildingID);

  useEffect(() => {
    if (data.length === 0) return
    data.map((item) => {
      setShowBeacons((prevState) => {
        return {
          ...prevState,
          [item.floor]: item.beacons.length === 0 ? false : true
        }
      })
    })
  }, [data])

  const deleteBeaconById = async (id) => {
    try {
      const beacon = await deleteBeacon({ id }).unwrap();
      dispatch({ type: ACTIONS.SUCCESS, status: beacon.status, message: beacon.message });
    } catch (err) {
      dispatch({ type: ACTIONS.ERROR, status: err.data.status, message: err.data.message })
    }
  };

  const RenderEmptyFloor = useCallback(() => {
    return (
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: globalStyles.fontSizeSet.fontRegular,
            fontStyle: 'italic',
          }}
        >
          No beacons have been added to this floor
        </Text>
      </View>
    )
  }, [])


  const AddNewDevice = useCallback(() => {
    return (
      <View style={listStyle.addNewDeviceButton}>
        <Pressable
          onPress={() => {
            navigation.navigate(RANGE_FOR_BEACONS, {
              title: 'Add new beacon',
            });
          }}
        >
          <Text style={listStyle.addNewDeviceButtonText}>
            + Add new device
          </Text>
        </Pressable>
      </View>
    )
  }, [])

  const renderItem = useCallback(({ item }) => {

    const isFloorEmpty = item.beacons.length === 0;
    const currentFloor = showBeacons[item.floor]

    return (
      <View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={listStyle.floorTitle}>Floor {item.floor}</Text>
          <View style={listStyle.floorActionButton}>
            <Pressable onPress={() => setShowBeacons((prevState) => { return { ...prevState, [item.floor]: !showBeacons[item.floor] } })}>
              <Text style={listStyle.floorActionButtonText}>{currentFloor ? "Hide" : "Show"}</Text>
            </Pressable>
          </View>
        </View>
        {currentFloor && (isFloorEmpty && <RenderEmptyFloor />)}
        {currentFloor && item.beacons.map((currBeacon) => {
          return (
            <View key={currBeacon._id} style={{ marginTop: 10 }}>
              <View style={listStyle.wrapper}>
                <Bluetooth width={moderateScale(25)} height={moderateScale(25)} />
                <Pressable
                  onPress={() => {
                    navigation.navigate(SHOW_BEACON_DATA, {
                      dataType: currBeacon.dataType,
                      data: currBeacon.data,
                    });
                  }}
                >
                  <View>
                    <Text style={listStyle.beaconName}>{currBeacon.name}</Text>
                  </View>
                </Pressable>
                <View style={listStyle.beaconActionButtons}>
                  <View style={listStyle.beaconEditButton}>
                    <Pressable
                      onPress={() => {
                        navigation.navigate(EDIT_BEACON, {
                          title: currBeacon.name,
                          beaconEditData: {
                            _id: currBeacon._id,
                            name: currBeacon.name,
                            atFloor: currBeacon.atFloor,
                            dataType: currBeacon.dataType,
                            data: currBeacon.data
                          },
                        });
                      }}
                    >
                      <EditBeacon width={moderateScale(25)} height={moderateScale(25)} />
                    </Pressable>
                  </View>
                  <View style={listStyle.beaconDeleteButton}>
                    <Pressable onPress={() => setIsAlertDialogVisible(true)}>
                      <DeleteBeacon width={moderateScale(25)} height={moderateScale(25)} />
                    </Pressable>
                  </View>
                </View>
              </View>
              <AlertDialog
                isVisible={isAlertDialogVisible}
                title={`Delete Beacon?`}
                message={`Are you sure you want to delete this beacon?`}
                onClose={() => setIsAlertDialogVisible(false)}
                onConfirm={() => {
                  deleteBeaconById(currBeacon._id);
                  setIsAlertDialogVisible(false)
                }
                }
              />
            </View>

          );

        })}
      </View>
    );
  }, [showBeacons, isAlertDialogVisible]);

  return (
    <MainLayout>
      {isLoading ? (
        <ActivityIndicatorComponent />
      ) : (
        <FlatList
          data={data}
          extraData={data}
          renderItem={renderItem}
          ListEmptyComponent={RenderEmptyFloor}
          keyExtractor={(item) => item.floor}
          initialNumToRender={5}
          ListHeaderComponent={AddNewDevice}
        />
      )}
      {deleteBeaconResult.isLoading && (
        <ApiResultModal
          isVisible={true}
          message={
            <ActivityIndicatorComponent />
          }
        />
      )}
      <ApiResultModal
        isVisible={store.showResultModal}
        title={store.title}
        message={store.message}
        onConfirm={() => dispatch({ type: ACTIONS.HIDE_MODAL })}
      />
    </MainLayout>
  );
};

const listStyle = StyleSheet.create({

  addNewDeviceButton: {
    borderBottomColor: globalStyles.colorSet.PRIMARY,
    marginTop: 20,
    borderBottomWidth: 2,
    alignContent: 'center',
    justifyContent: 'center',
  },
  addNewDeviceButtonText: {
    marginLeft: 20,
    fontSize: globalStyles.fontSizeSet.fontMedium,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    marginBottom: 10,
  },
  wrapper: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 50,
    height: '70%',
    width: '80%',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  floorTitle: {
    marginLeft: 10,
    marginTop: 30,
    color: globalStyles.colorSet.PRIMARY,
    fontSize: globalStyles.fontSizeSet.fontRegular,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  floorActionButton: {
    position: 'absolute',
    left: '85%',
    bottom: '10%',
  },
  floorActionButtonText: {
    color: globalStyles.colorSet.PRIMARY,
    fontSize: globalStyles.fontSizeSet.fontRegular,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary
  },
  beaconName: {
    fontSize: globalStyles.fontSizeSet.fontRegular,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary
  },
  beaconActionButtons: {
    paddingHorizontal: 7,
    flexDirection: 'row',
  },

  beaconEditButton: {
    marginRight: 5
  },
  beaconDeleteButton: {
    marginLeft: 5
  }
});

export default BuildingDetailsScreen;

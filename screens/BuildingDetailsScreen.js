import { View, Text, ScrollView, FlatList, Pressable } from "react-native";
import { useMemo } from "react";
import Beacons from "../models/Beacons";
import BeaconsPerFloor from "../container/BeaconsPerFloor";
import MainLayout from "../container/MainLayout";
import BeaconList from "../components/BeaconList";

const BuildingDetailsScreen = ({ navigation }) => {
  const beaconsPerFloor = () => {
    const beaconsData = Beacons();

    let floorCount = [];

    //Get initial floor count
    for (let i = 0; i < beaconsData[0]?.totalFloors; i++) {
      floorCount.push({
        floor: i + 1,
        beacons: [],
      });
    }

    /*Group  beacons by floor
    ex:  {
          floor: 1,
          beacons : [
            {
              "UUID" : '2807aad5-a76b-432f-b02a-0dc092f2d350'
              name: '"beaconName1"'
             },
              {
              "UUID" : '2807aad5-a76b-432f-b02a-0dc092f2d319'
              name: '"beaconName2"'
             },           
        ]
    }*/

    let groupBeacons = beaconsData[0]?.["beaconsInBuilding"].reduce(
      (accum, curr, index) => {
        let dateGroup = accum.find((x) => x.floor === curr.atFloor);
        if (!dateGroup) {
          dateGroup = { floor: curr.atFloor, beacons: [] };
          accum.push(dateGroup);
        }
        dateGroup.beacons.push(curr);
        return accum;
      },
      []
    );

    console.log(groupBeacons);

    let unique = {};

    //Merge the two arrays, remove duplicates and sort by asc floor value
    return [...groupBeacons, ...floorCount]
      .filter((currItem) => {
        if (currItem.floor in unique) {
          return false;
        } else {
          unique[currItem.floor] = true;
          return true;
        }
      })
      .sort((a, b) => a.floor - b.floor);
  };

  const renderItem = ({ item }) => {
    return (
      <BeaconsPerFloor floorNumber={item.floor}>
        {item.beacons.length === 0 ? (
          <View>
            <Text>No beacons have been added to this floor</Text>
          </View>
        ) : (
          item.beacons.map((currBeacon) => {
            return (
              <View key={currBeacon.UUID}>
                <BeaconList name={currBeacon.name} />
              </View>
            );
          })
        )}
      </BeaconsPerFloor>
    );
  };

  return (
    <MainLayout>
      <View
        style={{
          borderBottomColor: "#6A539D",
          marginTop: 20,
          borderBottomWidth: 2,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("ScanForBeacons");
          }}
        >
          <Text
            style={{
              marginLeft: 20,
              fontSize: 20,
              fontFamily: "Roboto",
              marginBottom: 10,
            }}
          >
            + Add new device
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={beaconsPerFloor()}
        renderItem={renderItem}
        keyExtractor={(item) => item.floor}
        initialNumToRender={5}
      />
    </MainLayout>
  );
};

export default BuildingDetailsScreen;

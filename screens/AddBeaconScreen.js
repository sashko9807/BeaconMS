import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";

import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

import MainLayout from "../container/MainLayout";
import IBeaconCard from "../components/iBeaconCard";
import InsertImageButton from "../components/InsertImageButton";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";

const AddBeaconScreen = ({ route, navigation }) => {
  const { beacon_type, uuid, major, minor } = route.params;

  const [floor, setFloor] = useState();
  const [dataType, setDataType] = useState();

  const [image, setImage] = useState(null);

  const OpenGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    }).catch((err) => {
      throw new Error("Image upload has been cancelled");
    });

    if (!result.cancelled) {
      let uriName = result.uri.match(/(\w+)-(\w+)-(\w+)-(\w+)-(\w+)(\.\w+)/)[0];
      console.log(uriName);

      console.log(result);
      setImage(uriName);
    }
  };

  return (
    <MainLayout>
      <ScrollView>
        <IBeaconCard
          beacon_type={beacon_type}
          uuid={uuid}
          major={major}
          minor={minor}
        />
        <View style={{ marginTop: 30 }}>
          <Text style={styles.heading}>Beacon name</Text>
          <View style={{ marginLeft: 40 }}>
            <TextInput
              style={styles.inputs}
              placeholder="Beacon name"
              placeholderTextColor={"#6A539D"}
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
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
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
                <Picker.Item label="Select data type" value={"none"} />
                <Picker.Item label="Image" value={"image"} />
                <Picker.Item label="Plain text" value={"plain-text"} />
              </Picker>
            </View>
            <Text style={styles.informationString}>
              Select the the type of data which will be transmitted through the
              beacon
            </Text>
          </View>
        </View>
        {dataType === "image" ? (
          <View style={{ marginVertical: 10, marginLeft: 20 }}>
            <InsertImageButton
              onPress={OpenGallery}
              image={image}
              isBeacon={true}
            />
          </View>
        ) : dataType === "plain-text" ? (
          <View style={{ marginLeft: 40, marginVertical: 20 }}>
            <TextInput
              multiline={true}
              style={{
                borderWidth: 1,
                minHeight: 200,
                textAlignVertical: "top",
                width: "90%",
                borderRadius: 10,
                color: "#6A539D",
                borderColor: "#6A539D",
                fontSize: 15,
                flexWrap: "wrap",
                paddingHorizontal: 10,
              }}
              placeholder="Write a message"
              placeholderTextColor={"#6A539D"}
            />
          </View>
        ) : (
          <Text></Text>
        )}

        <View style={{ marginVertical: 30 }}>
          <Button name="Add beacon" borderStyle="inline" />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const styles = new StyleSheet.create({
  heading: {
    marginLeft: 10,
    marginTop: 30,
    color: "#6A539D",
    fontSize: 17,
    fontWeight: "bold",
  },
  inputs: {
    width: "90%",
    borderWidth: 1,
    minHeight: 60,
    borderRadius: 10,
    alignContent: "center",
    color: "#6A539D",
    borderColor: "#6A539D",
    fontSize: 15,
  },

  informationString: {
    color: "gray",
    fontSize: 15,
    fontWeight: "400",
  },
});

export default AddBeaconScreen;

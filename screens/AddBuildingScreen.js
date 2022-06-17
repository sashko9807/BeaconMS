import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { useState } from "react";
import MainLayout from "../container/MainLayout";
import * as ImagePicker from "expo-image-picker";
import InsertImageButton from "../components/InsertImageButton";
import Button from "../components/Button";

const AddBuildingScreen = () => {
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
        <View style={{ flex: 1 }}>
          <Text style={informationString.text}>Select an Image:</Text>
          <InsertImageButton onPress={OpenGallery} image={image} />
          <Text style={informationString.text}>Choose building name</Text>
          <TextInput
            style={informationString.inputs}
            placeholder="Building name"
            placeholderTextColor={"#6A539D"}
          />
          <Text style={informationString.text}>Amount of floors</Text>
          <TextInput
            style={informationString.inputs}
            keyboardType="numeric"
            placeholder="Amount of floors"
            placeholderTextColor={"#6A539D"}
          />
          <View
            style={{
              flex: 1,
              marginTop: 100,
            }}
          >
            <Button name="Add new building" borderStyle="inline" />
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const informationString = new StyleSheet.create({
  text: {
    marginLeft: 10,
    marginTop: 30,
    color: "#6A539D",
    fontSize: 17,
    fontWeight: "bold",
  },
  inputs: {
    marginLeft: 40,
    borderWidth: 1,
    width: "80%",
    minHeight: 60,
    borderRadius: 10,
    alignContent: "center",
    color: "#6A539D",
    borderColor: "#6A539D",
    fontSize: 15,
  },
});

export default AddBuildingScreen;

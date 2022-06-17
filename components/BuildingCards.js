import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const BuildingCards = ({ onPress, image, buildingName }) => {
  const [screenSize, setScreenSize] = useState(styleSmall);

  useEffect(() => {
    if (0 <= width && width < 768) {
      // Small Screen
      setScreenSize(styleSmall);
    } else if (768 <= width && width < 992) {
      //medium
      setScreenSize(stylesMedium);
    } else {
      setScreenSize(stylesLarge);
    }
  }, [width]);

  return (
    <Pressable onPress={onPress}>
      <View style={screenSize.card}>
        <Image source={image} style={screenSize.card_image} />
        <View style={screenSize.card_text}>
          <Text>{buildingName}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styleSmall = StyleSheet.create({
  card: {
    marginVertical: height * 0.02,
    marginHorizontal: width * 0.034,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: width * 0.39,
    aspectRatio: 9 / 14,
    backgroundColor: "#F8F7F7",
  },
  card_image: {
    paddingTop: 100,
    width: "100%",
    height: "50%",

    // backgroundColor: "red",
  },
  card_text: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const stylesMedium = StyleSheet.create({
  card: {
    marginVertical: height * 0.02,
    marginHorizontal: width * 0.025,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: width * 0.27,
    aspectRatio: 9 / 15,
    backgroundColor: "#F8F7F7",
  },
  card_image: {
    paddingTop: 100,
    height: "50%",
    width: width * 0.27,
    justifyContent: "center",
    alignContent: "center",
  },
  card_text: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const stylesLarge = StyleSheet.create({
  card: {
    marginVertical: height * 0.02,
    marginHorizontal: width * 0.007,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: width * 0.18,
    aspectRatio: 9 / 15,
    backgroundColor: "#F8F7F7",
  },
  card_image: {
    paddingTop: 100,
    height: "50%",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  card_text: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BuildingCards;

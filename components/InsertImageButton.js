import { View, Text, Pressable } from "react-native";

const InsertImageButton = ({ onPress, image = undefined }) => {
  return (
    <View>
      <View style={imgButtonStyle.imgButton}>
        <Pressable onPress={onPress} style={imgButtonStyle.button}>
          <Text style={imgButtonStyle.buttonText}>Choose file</Text>
        </Pressable>
      </View>
      {image ? (
        <Text style={imgButtonStyle.imageName}>
          Selected Image:{"\n" + image}
        </Text>
      ) : (
        <Text>Select an image to be associated with the building</Text>
      )}
    </View>
  );
};

const imgButtonStyle = {
  imgButton: {
    flex: 1,
    marginLeft: 20,
    marginTop: 5,
    minHeight: 80,
  },

  button: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: "#FFF",
    borderColor: "#6A539D",
    color: "#6A539D",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    maxWidth: "40%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A539D",
    textAlign: "center",
    textAlignVertical: "center",
  },
  imageName: {
    color: "#6A539D",
    width: 500,
    flexGrow: 0,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
};
export default InsertImageButton;

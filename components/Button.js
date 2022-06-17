import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

const Button = ({ onPress, name, borderStyle }) => {
  const [isInline, setIsInline] = useState(false);

  useEffect(() => {
    console.log(borderStyle);
    if (borderStyle === "inline") {
      setIsInline(true);
    }
  }, []);

  return (
    <View style={buttonStyle.imgButton}>
      <Pressable
        onPress={onPress}
        style={isInline ? buttonStyle.buttonInline : buttonStyle.buttonOutline}
      >
        <Text
          style={
            isInline
              ? buttonStyle.buttonInlineText
              : buttonStyle.buttonOutlineText
          }
        >
          {name}
        </Text>
      </Pressable>
    </View>
  );
};

const buttonStyle = StyleSheet.create({
  imgButton: {
    minHeight: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  buttonInline: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: "#6A539D",
    borderColor: "#6A539D",
    borderWidth: 2,
    flexGrow: 1,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonInlineText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonOutline: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: "#6A539D",
    borderColor: "#6A539D",
    borderWidth: 2,
    flexGrow: 1,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOutlineText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A539D",
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default Button;

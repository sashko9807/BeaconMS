import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import Button from "../components/Button";
import GoBack from "../assets/GoBack.svg";

const RegisterModal = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.containerModal}>
        <View style={styles.innerContainer}>
          <ScrollView contentContainerStyle={{ flexGrow: 0 }}>
            <View
              style={{
                marginLeft: 10,
                flex: 1,
                flexDirection: "row",
              }}
            >
              <Pressable onPress={() => navigation.goBack()}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <GoBack width="30" height="30" />
                  <Text style={{ fontSize: 20, marginLeft: 5 }}>Sign up</Text>
                </View>
              </Pressable>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 20,
                marginTop: 20,
                flexGrow: 1,
                backgroundColor: "#FFF",
              }}
            >
              <View>
                <Text style={styles.textProp}>Email</Text>
                <View
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "#6A539D",
                    borderBottomWidth: 0.5,
                    marginTop: 5,
                  }}
                >
                  <TextInput
                    style={{
                      flexGrow: 1,
                    }}
                    placeholder="Email"
                  />
                </View>
              </View>
              <View style={{ marginTop: 40 }}>
                <Text style={styles.textProp}>Password</Text>
                <View
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "#6A539D",
                    borderBottomWidth: 0.5,
                    marginTop: 5,
                  }}
                >
                  <TextInput
                    style={{
                      flexGrow: 1,
                    }}
                    placeholder="Password"
                  />
                </View>
              </View>
              <View style={{ marginTop: 40 }}>
                <Text style={styles.textProp}>Confirm Password</Text>
                <View
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "#6A539D",
                    borderBottomWidth: 0.5,
                    marginTop: 5,
                  }}
                >
                  <TextInput
                    style={{
                      flexGrow: 1,
                    }}
                    placeholder="Confirm Password"
                  />
                </View>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 80,
                  marginTop: 60,
                }}
              >
                <Button
                  onPress={() => console.log("clicked")}
                  name="Sign up"
                  borderStyle={"inline"}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default RegisterModal;

const styles = StyleSheet.create({
  containerModal: {
    flexGrow: 1,
  },
  innerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 185,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFF",
  },
  textProp: {
    color: "#6A539D",
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
});

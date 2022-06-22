import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";

import UserIcon from "../assets/user.svg";
import PasswordIcon from "../assets/passwordIcon.svg";

import Button from "../components/Button";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={mainStyle.wrapper}>
          <View
            style={{
              flex: 2,
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              marginHorizontal: 10,
            }}
          >
            <Text style={mainStyle.header}>Welcome!</Text>
            <Text
              style={{
                color: "#FFF",
                fontFamily: "Abel",
                fontSize: 32,
                textAlign: "center",
                marginTop: 20,
              }}
            >
              Please sign in to access your devices
            </Text>
          </View>
          <View style={mainStyle.container}>
            <View
              style={{
                flex: 1,
                marginLeft: 20,
                marginTop: 50,
                flexGrow: 1,
                backgroundColor: "#FFF",
              }}
            >
              <View>
                <Text style={mainStyle.textProp}>Email</Text>
                <View
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "#6A539D",
                    borderBottomWidth: 0.5,
                    marginTop: 5,
                  }}
                >
                  <UserIcon />
                  <TextInput
                    style={{
                      flexGrow: 1,
                    }}
                    placeholder="Your Email"
                  />
                </View>
              </View>
              <View style={{ marginTop: 40 }}>
                <Text style={mainStyle.textProp}>Password</Text>
                <View
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "#6A539D",
                    borderBottomWidth: 0.5,
                    marginTop: 5,
                  }}
                >
                  <PasswordIcon />
                  <TextInput
                    style={{
                      flexGrow: 1,
                    }}
                    placeholder="Password"
                  />
                </View>
              </View>
              <Pressable
                onPress={() => navigation.navigate("ForgottenPasswordModal")}
              >
                <Text
                  style={{
                    marginTop: 5,
                    fontSize: 20,
                    fontFamily: "Roboto",
                    color: "#6A539D",
                    fontWeight: "bold",
                  }}
                >
                  Forgot password?
                </Text>
              </Pressable>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Button name="Sign in" />
            </View>
            <View
              style={{
                justifyContent: "center",
                marginTop: 20,
                paddingBottom: 30,
              }}
            >
              <Button
                onPress={() => navigation.navigate("RegisterModal")}
                name="Sign up"
                borderStyle={"inline"}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mainStyle = StyleSheet.create({
  wrapper: {
    backgroundColor: "#6A539D",
    flex: 2,
  },
  container: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFF",
    flexGrow: 2,
  },
  header: {
    fontSize: 36,
    color: "#FFF",
    fontFamily: "Abel",
  },
  textProp: {
    color: "#6A539D",
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
});

export default WelcomeScreen;

const styles = StyleSheet.create({});

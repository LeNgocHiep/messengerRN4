import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import TextInputComponent from "../components/text_input_component";

const LoginScreen = () => {
  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#1B202D" }}>
      <View style={{ width: "100%", height: "50%", justifyContent: "center" }}>
        <Text
          style={{
            color: "#fff",
            fontSize: 32,
            fontWeight: "bold",
            paddingLeft: 20,
          }}
        >
          {"Welcome\nBack"}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: "50%",
          backgroundColor: "#fff",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <TextInputComponent
          iconName="mail-outline"
          placeholder={"Email"}
          updateFields={(text) => {}}
        ></TextInputComponent>
        <TextInputComponent
          iconName="lock-closed-outline"
          placeholder={"Password"}
          updateFields={(text) => {}}
        ></TextInputComponent>
      </View>
    </View>
  );
};
export default LoginScreen;

import React from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import TextInputComponent from "../components/text_input_component";
import EmailInputComponent from "../components/email_input_component";
import PasswordInputComponent from "../components/password_input_component";
import SvgWaveComponent from "../components/shape_wave_component";
import ButtonComponent from "../components/button_component";

const LoginScreen = () => {
  var height = Dimensions.get("window").height;
  var width = Dimensions.get("window").width;
  return (
    <View style={{ width: width, height: height }}>
      <SvgWaveComponent
        width={width}
        height={height * 0.5}
        backgroundColor="#1B202D"
      ></SvgWaveComponent>
      <View
        style={{
          width: "100%",
          height: "50%",
          // backgroundColor: "#fff",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <EmailInputComponent updateFields={(text) => {}} />
        <PasswordInputComponent updateFields={(text) => {}} />
        <ButtonComponent
          style={{
            marginTop: 20,
            width: width * 0.85,
            height: 50,
            backgroundColor: "#1974D2",
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff'
          }}
          text="Log in"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};
export default LoginScreen;

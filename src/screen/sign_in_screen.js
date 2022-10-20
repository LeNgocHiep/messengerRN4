import React from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import EmailInputComponent from "../components/email_input_component";
import PasswordInputComponent from "../components/password_input_component";
import ButtonComponent from "../components/button_component";
import LineTextComponent from "../components/line_text_component";
import { Colors } from "../utils/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import NameInputComponent from "../components/name_input_component";
import SvgWaveComponentReg from "../components/shape_wave_component_reg";

const SignInScreen = ({navigation}) => {
  var height = Dimensions.get("window").height;
  var width = Dimensions.get("window").width;
  return (
    <KeyboardAwareScrollView>
      <View
        style={{
          width: width,
          height: height,
          backgroundColor: Colors.backgroundLight,
        }}
      >
        <SvgWaveComponentReg
          title={"Create\nAccount"}
          width={width}
          height={height * 0.5}
          backgroundColor={Colors.backgroundDark}
        ></SvgWaveComponentReg>
        <View
          style={{
            width: "100%",
            height: "50%",
            alignItems: "center",
            paddingTop: 20,
          }}
        >
          <NameInputComponent updateFields={(text) => {}} />
          <EmailInputComponent updateFields={(text) => {}} />
          <PasswordInputComponent updateFields={(text) => {}} />
          {/* <Text style={{left:true}}>{"Forgot password?"}</Text> */}
          <ButtonComponent
            style={{
              marginTop: 30,
              width: width * 0.85,
              height: 50,
              backgroundColor: Colors.backgroundDark,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              color: Colors.backgroundLight,
            }}
            text="Sign up"
            onPress={() => {}}
          />
          <LineTextComponent
            text="or"
            style={{ width: width * 0.85, marginTop: 15 }}
          />
          <ButtonComponent
            style={{
              marginTop: 20,
              width: width * 0.85,
              height: 50,
              backgroundColor: Colors.backgroundLight,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              color: Colors.backgroundDark,
              borderWidth: 1,
              borderColor: Colors.backgroundDark,
            }}
            text="Log in"
            onPress={() => {
                navigation.pop();
            }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default SignInScreen;

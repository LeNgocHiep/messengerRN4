import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import EmailInputComponent from "../components/email_input_component";
import PasswordInputComponent from "../components/password_input_component";
import SvgWaveComponent from "../components/shape_wave_component";
import ButtonComponent from "../components/button_component";
import LineTextComponent from "../components/line_text_component";
import { Colors } from "../utils/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { login } from "../actions/login_action";
import { connect } from "react-redux";

const LoginScreen = ({ navigation }) => {
  var height = Dimensions.get("window").height;
  var width = Dimensions.get("window").width;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAwareScrollView>
      <View
        style={{
          width: width,
          height: height,
          backgroundColor: Colors.backgroundLight,
        }}
      >
        <SvgWaveComponent
          title={"Welcome\nBack"}
          width={width}
          height={height * 0.5}
          backgroundColor={Colors.backgroundDark}
        ></SvgWaveComponent>
        <View
          style={{
            width: "100%",
            height: "50%",
            alignItems: "center",
            paddingTop: 40,
          }}
        >
          <EmailInputComponent
            updateFields={(text) => {
              setEmail(text);
            }}
          />
          <PasswordInputComponent
            updateFields={(text) => {
              setPassword(text);
            }}
          />
          {/* <Text style={{left:true}}>{"Forgot password?"}</Text> */}
          <View style={{ width: width * 0.85 }}>
            <Text style={{ textAlign: "right", color: Colors.backgroundDark }}>
              {"Forgot password?"}
            </Text>
          </View>
          <ButtonComponent
            style={{
              marginTop: 50,
              width: width * 0.85,
              height: 50,
              backgroundColor: Colors.backgroundDark,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              color: Colors.backgroundLight,
            }}
            text="Log in"
            onPress={() => {
              // console.log("LOgin");
              // login.login(email, password);
            f
            }}
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
            text="Sign in"
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     isLogged: state.isLogged,
//     hasError: state.hasError,
//     isLoading: state.isLoading,
//   };
// };

const mapStateToProps = (state) => ({
  isLogged: state.isLogged,
  hasError: state.hasError,
  isLoading: state.isLoading,
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     login: (username, password) =>
//       dispatch(login(username, password)),
//   };
// };
// const mapDispatchToProps = {
//   login,
// };

export default connect(mapStateToProps)(LoginScreen);
// export default LoginScreen;

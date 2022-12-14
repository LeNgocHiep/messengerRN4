import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/dist/Ionicons";
import { Colors } from "../utils/colors";

const PasswordInputComponent = ({ initPassword, updateFields }) => {
  const [isFocus, setFocus] = useState(false);
  const [pass, setPass] = useState("");
  const [isShow, setShow] = useState(false);

  const getColor = (isFocus) => {
    return isFocus ? Colors.backgroundDark : Colors.hintText;
  };

  useEffect(() => {
    setPass(initPassword);
  }, [initPassword]);

  return (
    <View
      style={[
        styles.mainContainer,
        {
          borderBottomColor: getColor(isFocus),
        },
      ]}
    >
      <Icon
        style={{ flexDirection: "row" }}
        name="lock-closed-outline"
        size={20}
        color={getColor(isFocus)}
      />
      <TextInput
        value={pass}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        style={[
          // styles.textInputFocus,
          styles.textInput,
          { fontSize: 17, color: getColor(isFocus) },
        ]}
        placeholder={"Password"}
        placeholderTextColor={Colors.hintText}
        onChangeText={(text) => {
          if (text != pass) setPass(text);
          updateFields(text);
        }}
        spellCheck={false}
        autoCorrect={false}
        secureTextEntry={!isShow}
      />
      <TouchableOpacity
        onPress={() => {
          setShow(!isShow);
        }}
      >
        <Icon
          // style={{ flexDirection: "row" }}
          name={isShow ? "eye-outline" : "eye-off-outline"}
          size={20}
          color={getColor(isFocus)}
        />
      </TouchableOpacity>
    </View>
  );
};
export default PasswordInputComponent;
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    // justifyContent: "center",
    borderRadius: 5,
    height: 50,
    marginBottom: 10,
    width: "85%",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  mainContainerFocus: {
    flexDirection: "row",
    // justifyContent: "center",
    borderRadius: 5,
    height: 50,
    marginBottom: 10,
    width: "85%",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  textInput: {
    paddingHorizontal: 10,
    width: "85%",
    paddingVertical: 0,
    color: Colors.hintText,
  },
  textInputFocus: {
    paddingHorizontal: 10,
    width: "85%",
    paddingVertical: 0,
    color: Colors.backgroundDark,
  },
  textInputError: {
    paddingHorizontal: 10,
    width: "85%",
    paddingVertical: 0,
    color: Colors.red,
  },
});

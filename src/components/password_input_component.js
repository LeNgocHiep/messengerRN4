import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/dist/Ionicons";

const PasswordInputComponent = ({ updateFields }) => {
  const [isFocus, setFocus] = useState(false);
  const [pass, setPass] = useState("");
  const [isShow, setShow] = useState(false);

  const getColor = (isFocus) => {
    return isFocus ? "#4666ff" : "#888888";
  };

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
        placeholderTextColor={"#888888"}
        onChangeText={(text) => {
          setPass(text);
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
    color: "#585858",
  },
  textInputFocus: {
    paddingHorizontal: 10,
    width: "85%",
    paddingVertical: 0,
    color: "#4666ff",
  },
  textInputError: {
    paddingHorizontal: 10,
    width: "85%",
    paddingVertical: 0,
    color: "#FD6B6B",
  },
});

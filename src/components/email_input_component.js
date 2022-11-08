import React, { useEffect, useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/dist/Ionicons";
import { Colors } from "../utils/colors";

const EmailInputComponent = ({ initEmail, updateFields }) => {
  const [isFocus, setFocus] = useState(0);
  const [email, setEmail] = useState("");
  const validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      setEmail(text);
      setFocus(-1);
      return false;
    } else {
      setEmail(text);
      console.log("Email is Correct");
      setFocus(1);
      updateFields(text);
    }
  };

  const getColor = (isFocus) => {
    return isFocus == 1
      ? Colors.backgroundDark
      : isFocus == -1
      ? Colors.red
      : Colors.hintText;
  };
  useEffect(() => {
    setEmail(initEmail);
  }, [initEmail]);

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
        name="mail-outline"
        size={20}
        color={getColor(isFocus)}
      />
      <TextInput
        value={email}
        onFocus={() => {
          validate(email);
        }}
        onBlur={() => {
          setFocus(0);
        }}
        style={[
          // styles.textInputFocus,
          styles.textInput,
          { fontSize: 17, color: getColor(isFocus) },
        ]}
        placeholder={"example@email.com"}
        placeholderTextColor={Colors.hintText}
        onChangeText={(text) => {
          if (text != email) validate(text);
        }}
        spellCheck={false}
        autoCorrect={false}
      />
      {isFocus == 1 ? (
        <Icon
          // style={{ flexDirection: "row" }}
          name={isFocus == 1 && email.length > 0 ? "checkmark-outline" : "none"}
          size={20}
          color={Colors.backgroundColor}
        />
      ) : null}
    </View>
  );
};
export default EmailInputComponent;
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
    color: Colors.backgroundColor,
  },
  textInputError: {
    paddingHorizontal: 10,
    width: "85%",
    paddingVertical: 0,
    color: Colors.red,
  },
});

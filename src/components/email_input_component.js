import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/dist/Ionicons";

const EmailInputComponent = ({ updateFields }) => {
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
    return isFocus == 1 ? "#4666ff" : isFocus == -1 ? "#FD6B6B" : "#888888";
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
        name="mail-outline"
        size={20}
        color={getColor(isFocus)}
      />
      <TextInput
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
        placeholderTextColor={"#888888"}
        onChangeText={(text) => {
          validate(text);
        }}
        spellCheck={false}
        autoCorrect={false}
      />
      {isFocus == 1 ? (
        <Icon
          // style={{ flexDirection: "row" }}
          name={isFocus == 1 && email.length > 0 ? "checkmark-outline" : "none"}
          size={20}
          color="#4666ff"
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

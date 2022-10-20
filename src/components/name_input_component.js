import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/dist/Ionicons";
import { Colors } from "../utils/colors";

const NameInputComponent = ({ updateFields }) => {
  const [isFocus, setFocus] = useState(false);
  const [name, setName] = useState("");

  const getColor = (isFocus) => {
    return isFocus ? Colors.backgroundDark : Colors.hintText;
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
        name="person-outline"
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
        placeholder={"Name"}
        placeholderTextColor={Colors.hintText}
        onChangeText={(text) => {
          setName(text);
          updateFields(text);
        }}
        spellCheck={false}
        autoCorrect={false}
      />
    </View>
  );
};
export default NameInputComponent;
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

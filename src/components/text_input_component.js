import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/dist/Ionicons";

const TextInputComponent = ({iconName,placeholder, updateFields }) => {
  const [state, setState] = useState({ isLoading: false });
  return (
    <View
      style={[
        styles.mainContainer,
        {
          // backgroundColor: "#292F3F",
          justifyContent: "center",
          alignItems: "center",
          borderBottomColor: "#A9A9A9",
          borderBottomWidth: 1
        },
      ]}
    >
      <Icon
        style={{ flexDirection: "row" }}
        name={iconName}
        size={20}
        color="#888888"
      />
      <TextInput
        style={[styles.textInput, { fontSize: 17 }]}
        placeholder={placeholder}
        placeholderTextColor="#888888"
        onChangeText={(text) => updateFields(text)}
        secureTextEntry={placeholder == "Enter Password" ? true : false}
      />
    </View>
  );
};
export default TextInputComponent;
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    // justifyContent: "center",
    borderRadius: 5,
    height: 50,
    marginBottom: 10,
    width: "85%",
  },
  textInput: {
    paddingHorizontal: 10,
    width: "90%",
    paddingVertical: 0,
    color: "#585858",
  },
});

import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const ButtonComponent = ({ text, onPress, style }) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={style}>
        <Text style={{ color: style.color }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default ButtonComponent;
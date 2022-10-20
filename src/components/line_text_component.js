import Svg, { Path } from "react-native-svg";
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import {Colors} from "../utils/colors";

const LineTextComponent = ({ text, style }) => {
  return (
    <View style={[style, { flexDirection: "row" }]}>
      <View
        style={{
          backgroundColor: Colors.hintText,
          height: 1,
          flex: 1,
          alignSelf: "center",
        }}
      />
      <Text
        style={{ alignSelf: "center", paddingHorizontal: 5, color: Colors.hintText }}
      >
        {text}
      </Text>
      <View
        style={{
          backgroundColor:  Colors.hintText,
          height: 1,
          flex: 1,
          alignSelf: "center",
        }}
      />
    </View>
  );
};
export default LineTextComponent;

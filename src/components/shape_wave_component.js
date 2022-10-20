import Svg, { Path } from "react-native-svg";
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";

const SvgWaveComponent = ({ width, height, backgroundColor }) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 100 100">
      <Text
        style={{
          color: "#fff",
          fontSize: 32,
          fontWeight: "bold",
          paddingLeft: 20,
          paddingTop: height * 0.3,
        }}
      >
        {"Welcome\nBack"}
      </Text>
      <Path
        d="M0,-5 L0,95 Q25,80 50,95 T100,95 L100,-5"
        fill={backgroundColor}
        stroke={backgroundColor}
      ></Path>
    </Svg>
  );
};
export default SvgWaveComponent;

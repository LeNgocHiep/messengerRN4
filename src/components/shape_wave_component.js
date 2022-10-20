import Svg, { Path } from "react-native-svg";
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import {Colors} from "../utils/colors";

const SvgWaveComponent = ({ width, height, backgroundColor }) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 100 100">
      <Text
        style={{
          color: Colors.backgroundLight,
          fontSize: 32,
          fontWeight: "bold",
          paddingLeft: 20,
          paddingTop: height * 0.38,
        }}
      >
        {"Welcome\nBack"}
      </Text>
      <Path d="M0,-5 L0,95 Q25,80 50,95 T100,95 L100,-5" fill={backgroundColor} />
      <Path
        d="M0,-5 L0,15 Q10,30 50,15 T100,25 L100,-5"
        fill={Colors.backgroundDark80}
      />
      <Path d="M80,30 Q86,34 90,29 T84,20 T78,30 T80,30" fill={Colors.backgroundDark80} />
    </Svg>
  );
};
export default SvgWaveComponent;

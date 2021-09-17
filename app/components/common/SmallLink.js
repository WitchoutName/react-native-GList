import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Color from "../../classes/Color";

const SmallLink = ({ children, textStyle, ...rest }) => {
  return (
    <TouchableOpacity {...rest}>
      <Text style={{ ...styles.text, ...textStyle }}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Color.link,
    fontFamily: "nats",
    fontSize: 18,
  },
});

export default SmallLink;

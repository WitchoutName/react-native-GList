import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Color from "../../classes/Color";

const SmallLink = (props) => {
  return <Text style={styles.text}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: Color.link,
    fontFamily: "nats",
    fontSize: 18,
  },
});

export default SmallLink;

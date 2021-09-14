import React from "react";
import { View, StyleSheet, Text } from "react-native";

const AppText = (props) => {
  return (
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "varela",
    fontSize: 20,
  },
});

export default AppText;

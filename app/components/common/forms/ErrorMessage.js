import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "../AppText";

const ErrorMessage = ({ error, visible }) => {
  if (!error || !visible) return null;
  return <AppText style={styles.error}>{error}</AppText>;
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontWeight: "700",
    fontSize: 18,
  },
});

export default ErrorMessage;

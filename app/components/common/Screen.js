import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const Screen = (props) => {
  return (
    <View style={{ ...styles.container, width: screenWidth }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 0,
    margin: 0,
    paddingBottom: 0,
    height: 0,
    flexGrow: 1,
  },
});

export default Screen;

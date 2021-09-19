import React from "react";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Color from "../../classes/Color";

const AppButton = ({ title, fontSize, ...rest }) => {
  return (
    <View style={styles.outer}>
      <TouchableHighlight style={styles.touch} {...rest}>
        <View style={styles.container}>
          <LinearGradient
            colors={[Color.darkPurple, Color.blue]}
            style={styles.background}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <Text style={{ ...styles.text, fontSize }}>{title}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  touch: {
    margin: 5,
    backgroundColor: Color.blue,
    borderRadius: 50,
    width: "100%",
    elevation: 7,
    padding: 5,
    flex: 1,
  },
  container: {
    borderRadius: 50,
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  outer: {
    flexDirection: "row",
    width: "75%",
  },
  text: {
    fontSize: 30,
    fontFamily: "varela",
    color: Color.white,
  },
  background: {
    position: "absolute",
    left: -5.5,
    right: 0,
    top: -5,
    borderRadius: 50,
    height: 50,
    width: "103.75%",
  },
});

export default AppButton;

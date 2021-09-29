import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "../../assets/Icons/Icon";

const IconButton = (props) => {
  // console.log(props.icon);
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={props.onPress}
      style={{ ...styles.button, ...props.style }}
    >
      <Icon
        name={props.icon.name}
        width={props.icon.width}
        height={props.icon.height}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderWidth: 0,
    borderRadius: 2,
    backgroundColor: "transparent",
    width: 50,
    height: 50,
    fontSize: 20,
  },
});

export default IconButton;

import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Color from "../../classes/Color";

const AppTextInput = ({ icon, hasError, ...otherProps }) => {
  return (
    <View style={{ ...styles.container, marginBottom: hasError ? 3 : 10 }}>
      {icon ? <MaterialCommunityIcons icon={icon} /> : null}
      <TextInput
        style={styles.textInput}
        placeholderTextColor="#BBBBBB"
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    borderRadius: 8,
    flexDirection: "row",
    width: "75%",
    padding: 10,
    marginVertical: 10,
    elevation: 10,
  },
  textInput: {
    fontSize: 18,
    padding: 1,
    fontWeight: "600",
    fontFamily: "varela",
    width: "70%",
    flex: 1,
  },
});

export default AppTextInput;

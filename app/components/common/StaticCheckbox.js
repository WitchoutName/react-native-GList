import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "../../assets/Icons/Icon";

import Color from "../../classes/Color";

const StaticCheckbox = ({ checked }) => {
  return (
    <View>
      <View
        style={[
          styles.checkbox,
          { backgroundColor: checked ? Color.listBorderOut : "white" },
        ]}
      >
        {checked && (
          <View style={styles.tick}>
            <Icon name="tick" height={60} width={60} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 30,
    height: 30,
    marginLeft: 5,
    marginRight: 10,
    elevation: 10,
    borderRadius: 10,
  },
  tick: {
    position: "absolute",
    left: -12,
    top: -17,
  },
});

export default StaticCheckbox;

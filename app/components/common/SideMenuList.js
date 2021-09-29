import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import Color from "../../classes/Color";
import AppText from "./AppText";

const SideMenuList = ({ data, render, scrollBoxStyle, title }) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.heading}>{title}</AppText>
      <View style={[styles.scrollBox, scrollBoxStyle]}>
        <ScrollView style={styles.lists}>
          {data.map((item, index) => render(item, index))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollBox: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: Color.listBorderOut,
    width: "100%",
    height: "100%",
    maxHeight: "70%",
  },
  lists: {
    overflow: "hidden",
    width: "100%",
  },
  heading: {
    fontSize: 24,
    color: Color.blueText,
  },
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});

export default SideMenuList;

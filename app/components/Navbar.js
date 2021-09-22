import React from "react";
import { View, StyleSheet, Button, Dimensions } from "react-native";

import Color from "../classes/Color";
import AppText from "./common/AppText";
import AppButton from "./common/AppButton";
import IconButton from "./common/IconButton";
import CircleButton from "../components/CircleButton";

const Navbar = ({ onLogout, listTitle, onOpenDrawer }) => {
  return (
    <View style={styles.navbar}>
      <>
        <IconButton
          icon={{ name: "hamburger", height: 75, width: 75 }}
          style={styles.tab}
          onPress={onOpenDrawer}
        />
        <AppText style={styles.titleb}>{listTitle}</AppText>
        <IconButton
          icon={{ name: "heart", height: 50, width: 50 }}
          style={styles.fav}
        />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: Color.white,
    width: "100%",
    height: 70,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Color.separator,
  },
  tab: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  title: {
    // position: "absolute",
    // left: "50%",
  },
  fav: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});

export default Navbar;

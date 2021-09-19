import React from "react";
import { View, StyleSheet, Button, Dimensions } from "react-native";
import Color from "../classes/Color";
import AppText from "./common/AppText";
import AppButton from "./common/AppButton";
import CircleButton from "../components/CircleButton";

const Navbar = ({ onLogout, listTitle }) => {
  return (
    <View style={styles.navbar}>
      <>
        <CircleButton
          icon={{ name: "plus", height: 50, width: 50 }}
          style={styles.tab}
        />
        {/* <AppButton style={styles.tabb} title="Tab" />
        <AppButton style={styles.logout} onPress={onLogout} title="Logout" /> */}
        <AppText style={styles.titleb}>{listTitle}</AppText>
        <CircleButton
          icon={{ name: "heart", height: 36, width: 36 }}
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
  },
  tab: {
    position: "absolute",
    left: 0,
    top: 0,
    elevation: 0,
    borderWidth: 0,
    borderRadius: 2,
    backgroundColor: "transparent",
    width: 50,
    height: 50,
    fontSize: 20,
  },
  title: {
    // position: "absolute",
    // left: "50%",
  },
  fav: {
    position: "absolute",
    right: 0,
    top: 0,
    elevation: 0,
    borderWidth: 0,
    borderRadius: 2,
    backgroundColor: "transparent",
    width: 50,
    height: 50,
    fontSize: 20,
  },
});

export default Navbar;

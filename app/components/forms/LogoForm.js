import React from "react";
import { View, StyleSheet, Image } from "react-native";

const LogoForm = ({ children, scrollStyle, ...rest }) => {
  return (
    <View style={styles.login}>
      <View style={styles.logoBox}>
        <Image
          source={require("../../assets/images/logo-white.png")}
          style={styles.logo}
        />
      </View>
      <View style={{ ...styles.scrollStyle, ...scrollStyle }}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    margin: 0,
  },
  logoBox: {
    height: "40%",
    flexShrink: 1,
  },
  logo: {
    height: 115,
    width: 115,
    top: "25%",
  },
  scrollStyle: {
    height: "60%",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default LogoForm;

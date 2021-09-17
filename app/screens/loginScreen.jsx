import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, Button, Dimensions } from "react-native";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ForgottenPasswordForm from "../components/ForgottenPasswordForm";
import LinearPanel from "../components/LinearPanel";
import Color from "../classes/Color";
import LogoForm from "../components/LogoForm";
import ScreenScroll from "../components/common/ScreenScroll";

const LoginScreen = (props) => {
  const screenWidth = Dimensions.get("window").width;
  const scrollView = useRef(null);
  return (
    <View style={styles.container}>
      <LinearPanel colors={[Color.purple, Color.blue]} />
      <LogoForm>
        <ScreenScroll
          pages={[RegisterForm, LoginForm, ForgottenPasswordForm]}
          initIndex={1}
        />
      </LogoForm>
      <Button
        title="right"
        onPress={(e) => {
          setScroll(scroll - screenWidth);
          scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
        }}
      />
      <Button
        title="left"
        onPress={(e) => {
          setScroll(scroll + screenWidth);
          scrollView.current.scrollTo({ x: screenWidth, y: 0, animated: true });
        }}
      />
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

export default LoginScreen;

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Keyboard } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import * as Yup from "yup";

import SmallLink from "../components/common/SmallLink";
import {
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/common/forms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const LoginScreen = (props) => {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor: "red",
        padding: 0,
        margin: 0,
        width: "100%",
        paddingBottom: 0,
        height: 0,
        flexGrow: 1,
      }}
    >
      <LinearGradient
        colors={["#9990CF", "#38C7C7"]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.login}>
        <Image
          source={require("../assets/images/logo-white.png")}
          style={styles.logo}
        />
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          <AppFormField
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            icon=""
            textContentType="emailAddress"
            name="email"
          />
          <AppFormField
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            icon="user"
            textContentType="password"
            secureTextEntry
            name="password"
          />
          <SubmitButton title="Login" />
        </AppForm>
        <View style={styles.links}>
          <SmallLink text="New account" />
          <SmallLink text="Forgot your password?" />
        </View>
        <View style={styles.google}></View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 2000,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
    margin: 0,
  },
  links: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "75%",
    marginHorizontal: 5,
    marginBottom: 30,
    top: -5,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  logo: {
    height: 115,
    width: 115,
    marginBottom: "35%",
  },
  google: {
    height: 35,
    backgroundColor: "blue",
    width: "60%",
    marginVertical: 30,
  },
});

export default LoginScreen;

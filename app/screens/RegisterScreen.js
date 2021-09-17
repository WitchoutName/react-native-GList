import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Keyboard } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Yup from "yup";

import SmallLink from "../components/common/SmallLink";
import {
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/common/forms";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const RegisterScreen = (props) => {
  return (
    <View
      style={{
        alignItems: "center",
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
          initialValues={{ email: "", password: "", username: "" }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
          style={styles.form}
        >
          <AppFormField
            placeholder="Username"
            autoCapitalize="none"
            autoCorrect={false}
            name="username"
          />

          <AppFormField
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            name="email"
          />
          <AppFormField
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            secureTextEntry
            name="password"
          />
          <SubmitButton title="Register" />
        </AppForm>
        <SmallLink>Already have an account?</SmallLink>
      </View>
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
    marginTop: "85%",
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
    position: "absolute",
    // top: "20%",
    // marginBottom: "20%",
    top: -180,
  },
  google: {
    height: 35,
    backgroundColor: "blue",
    width: "60%",

    bottom: 0,
  },
});

export default RegisterScreen;

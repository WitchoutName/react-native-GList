import React from "react";
import { View, StyleSheet, Button } from "react-native";
import * as Yup from "yup";

import SmallLink from "./common/SmallLink";
import { AppForm, AppFormField, SubmitButton } from "./common/forms";
import auth from "../services/authService";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const LoginForm = ({ scrollToIndex, onAuth }) => {
  const handleOnSubmit = async (values) => {
    // await auth.login(values.email, values.password);
    // user = await auth.getUser();
    onAuth();
  };

  return (
    <View style={styles.form}>
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleOnSubmit}
        validationSchema={validationSchema}
        style={styles.form}
      >
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
        <SubmitButton title="Login" />
      </AppForm>
      <View style={styles.links}>
        <SmallLink onPress={() => scrollToIndex(0)}>New account</SmallLink>
        <SmallLink onPress={() => scrollToIndex(2)}>
          Forgot your password?
        </SmallLink>
      </View>
      <View style={styles.google}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    alignItems: "center",
    padding: 0,
    margin: 0,
    width: "100%",
    flex: 1,
  },
  links: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
    marginHorizontal: 5,
    marginBottom: 30,
    top: -5,
  },
  google: {
    height: 35,
    backgroundColor: "blue",
    width: "60%",

    bottom: 0,
  },
});

export default LoginForm;

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as Yup from "yup";

import SmallLink from "../common/SmallLink";
import { ErrorMessage } from "../common/forms";
import { AppForm, AppFormField, SubmitButton } from "../common/forms";
import auth from "../../services/authService";
import GoogleLogin from "./GoogleLogin";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const LoginForm = ({ scrollToIndex, onAuth, setLoading }) => {
  const [error, setError] = useState("");

  const handleOnSubmit = async (values) => {
    setLoading(true);
    const { data, status } = await auth.login(values.email, values.password);
    setLoading(false);
    if (status === 404) setError("No account with this email.");
    else if (status === 400) setError(data);
    else if (status >= 500) setError("Server error.");
    else onAuth();
  };

  const handleGoogleAuth = (googleAuth) => {
    if (googleAuth && googleAuth.accessToken)
      auth.loginWithGoogle(googleAuth.accessToken).then((r) => {
        setLoading(false);
        onAuth();
      });
    setLoading(false);
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

        <ErrorMessage error={error} visible={error} />
      </AppForm>
      <View style={styles.links}>
        <SmallLink onPress={() => scrollToIndex(0)}>New account</SmallLink>
        <SmallLink onPress={() => scrollToIndex(2)}>
          Forgot your password?
        </SmallLink>
      </View>
      <GoogleLogin
        setError={setError}
        setLoading={setLoading}
        onGoogleAuth={handleGoogleAuth}
      />
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
});

export default LoginForm;

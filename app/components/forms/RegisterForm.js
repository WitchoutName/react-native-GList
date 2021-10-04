import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import * as Yup from "yup";

import SmallLink from "../common/SmallLink";
import { ErrorMessage } from "../common/forms";
import { AppForm, AppFormField, SubmitButton } from "../common/forms";
import auth from "../../services/authService";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password1: Yup.string().required().min(4).label("Password"),
  password2: Yup.string().required().min(4).label("Password"),
});

const RegisterForm = ({ scrollToIndex, onAuth, setLoading }) => {
  const [error, setError] = useState("");

  const handleOnSubmit = async (values) => {
    const user = {
      email: values.email,
      username: values.username,
      password: values.password1,
    };
    setLoading(true);
    const { data, status } = await auth.register(user);
    setLoading(false);
    if (data.token) onAuth();
    else setError(data[Object.keys(data)[0]][0]);
  };

  return (
    <View style={styles.form}>
      <AppForm
        initialValues={{
          email: "",
          password1: "",
          password2: "",
          username: "",
        }}
        onSubmit={handleOnSubmit}
        validationSchema={validationSchema}
        style={styles.form}
      >
        <Pressable>
          <AppFormField
            placeholder="Name"
            autoCapitalize="none"
            autoCorrect={false}
            name="username"
          />
        </Pressable>
        <Pressable>
          <AppFormField
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            name="email"
          />
        </Pressable>
        <Pressable>
          <AppFormField
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            secureTextEntry
            name="password1"
          />
          <AppFormField
            placeholder="Password (again)"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            secureTextEntry
            name="password2"
          />
        </Pressable>
        <Pressable>
          <SubmitButton title="Register" />
          <ErrorMessage error={error} visible={error} />
        </Pressable>
      </AppForm>

      <SmallLink onPress={() => scrollToIndex(1)}>
        Already have an account?
      </SmallLink>
      <View style={styles.google}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    alignItems: "center",
    padding: 0,
    paddingBottom: 30,
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

export default RegisterForm;

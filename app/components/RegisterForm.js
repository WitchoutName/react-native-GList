import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import * as Yup from "yup";

import SmallLink from "./common/SmallLink";
import { AppForm, AppFormField, SubmitButton } from "./common/forms";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password1: Yup.string().required().min(4).label("Password"),
  password2: Yup.string().required().min(4).label("Password"),
});

const RegisterForm = ({ scrollToIndex }) => {
  return (
    <View style={styles.form}>
      <AppForm
        initialValues={{
          email: "",
          password1: "",
          password2: "",
          username: "",
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
        style={styles.form}
      >
        <Pressable>
          <AppFormField
            placeholder="Username"
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

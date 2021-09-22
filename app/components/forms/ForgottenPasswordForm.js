import React from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import SmallLink from "../common/SmallLink";
import { AppForm, AppFormField, SubmitButton } from "../common/forms";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  code: Yup.string().label("Code"),
});

const LoginForm = ({ scrollToIndex }) => {
  return (
    <View style={styles.form}>
      <AppForm
        initialValues={{ email: "", code: "" }}
        onSubmit={(values) => console.log(values)}
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
        <SubmitButton title="Send me code" />
        <SmallLink onPress={() => scrollToIndex(1)}>
          I know my password
        </SmallLink>
        <AppFormField
          placeholder="Code"
          autoCapitalize="none"
          autoCorrect={false}
          name="code"
        />
      </AppForm>
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

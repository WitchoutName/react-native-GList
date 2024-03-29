import React from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import api from "../../services/api";
import SmallLink from "../common/SmallLink";
import { AppForm, AppFormField, SubmitButton } from "../common/forms";

const emailValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

const ForgottenPasswordFrom = ({ scrollToIndex, setLoading }) => {
  const handleOnSubmit = async (values, { setFieldError }) => {
    setLoading(true);
    const { data, status } = await api.auth.requestCodeToEmail(values.email);
    setLoading(false);
    if (status >= 500) setFieldError("email", "Server error.");
    else if (status == 404) setFieldError("email", "Invalid email.");
    else scrollToIndex(3);
  };

  return (
    <View style={styles.form}>
      <AppForm
        initialValues={{ email: "" }}
        onSubmit={handleOnSubmit}
        validationSchema={emailValidationSchema}
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
});

export default ForgottenPasswordFrom;

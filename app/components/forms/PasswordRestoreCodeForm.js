import React from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import api from "../../services/api";
import SmallLink from "../common/SmallLink";
import { AppForm, AppFormField, SubmitButton } from "../common/forms";
import AppText from "../common/AppText";
import Color from "../../classes/Color";

const codeValidationSchema = Yup.object().shape({
  code: Yup.string().label("Code"),
});

const PasswordRestoreCodeForm = ({
  scrollToIndex,
  setPasswordCode,
  setLoading,
}) => {
  const handleOnSubmit = async (values, { setFieldError }) => {
    setLoading(true);
    const { data, status } = await api.auth.codeValidation(values.code);
    setLoading(false);
    if (status >= 500) setFieldError("code", "Server error.");
    else if (status >= 404) setFieldError("code", "Invalid code.");
    else {
      setPasswordCode(values.code);
      scrollToIndex(4);
    }
  };

  return (
    <View style={styles.form}>
      <AppForm
        initialValues={{ code: "" }}
        onSubmit={handleOnSubmit}
        validationSchema={codeValidationSchema}
        style={styles.form}
      >
        <AppFormField
          placeholder="Code"
          autoCapitalize="none"
          autoCorrect={false}
          name="code"
        />
        <SubmitButton title="Submit" />
        <SmallLink
          onPress={() => scrollToIndex(1)}
          style={{ marginBottom: "10%" }}
        >
          I know my password
        </SmallLink>
        <AppText style={styles.text}>No code arived?</AppText>
        <AppText style={styles.text}>Check your spam folder.</AppText>
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
  text: {
    color: Color.white,
  },
});

export default PasswordRestoreCodeForm;

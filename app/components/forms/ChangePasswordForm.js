import React from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import api from "../../services/api";
import SmallLink from "../common/SmallLink";
import { AppForm, AppFormField, SubmitButton } from "../common/forms";

const validationSchema = Yup.object().shape({
  password: Yup.string().label("Password"),
  password2: Yup.string().label("Password"),
});

const Changepasswordform = ({ scrollToIndex, code, setLoading }) => {
  const handleOnSubmit = async (values, { setFieldError }) => {
    setLoading(true);
    const { data, status } = await api.auth.changePassword(
      values.password,
      code
    );
    setLoading(false);
    if (status >= 500) setFieldError("password", "Server error.");
    else if (status == 404) setFieldError("password", "Invalid password.");
    else if (status == 400) setFieldError("password", data["error"]);
    else scrollToIndex(1);
  };

  return (
    <View style={styles.form}>
      <AppForm
        initialValues={{ password: "" }}
        onSubmit={handleOnSubmit}
        validationSchema={validationSchema}
        style={styles.form}
      >
        <AppFormField
          placeholder="New password"
          autoCapitalize="none"
          autoCorrect={false}
          name="password"
          secureTextEntry
        />
        <AppFormField
          placeholder="New password (again)"
          autoCapitalize="none"
          autoCorrect={false}
          name="password2"
          secureTextEntry
        />
        <SubmitButton title="Change password" />
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

export default Changepasswordform;

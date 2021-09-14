import React from "react";
import Joi from "react-native-joi";
import Form from "./common/form";
import { View, Text, StyleSheet } from "react-native";
import Color from "../classes/Color";
import AppTextInput from "./common/AppTextInput";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <AppTextInput placeholder="sssssss" />
        {this.renderInput("Username")}
        {this.renderInput("Password")}
        {this.renderButton("Login")}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 0,
  },
});

export default LoginForm;

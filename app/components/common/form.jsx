import React, { Component } from "react";
import { TextInput, Button, View, StyleSheet } from "react-native";
import Joi from "react-native-joi";

import Color from "../../classes/Color";
import AppText from "./AppText";
import AppTextInput from "./AppTextInput";
import AppButton from "./AppButton";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    console.log(e);

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = (i) => {
    console.log(i);
    const errors = { ...this.state.errors };
    const error = this.validateProperty(input);
    if (error) errors[input.name] = error;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(title) {
    return (
      <AppButton
        disabled={!!this.validate()}
        onPress={() => this.handleSubmit()}
        title={title}
      />
    );
  }

  renderInput(name) {
    const { data, errors } = this.state;
    error = errors[name];
    return (
      <View style={styles.container}>
        <AppTextInput
          placeholder={name}
          value={data[name]}
          onChangeText={this.handleChange}
        />
        {error && <View>{error}</View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
});

export default Form;

import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Button, Image } from "react-native";
import * as Yup from "yup";

import { ErrorMessage } from "../common/forms";
import { AppForm, AppFormField, SubmitButton } from "../common/forms";
import api from "../../services/api";
import IconButton from "../common/IconButton";
import AppText from "../common/AppText";
import Color from "../../classes/Color";

const validationSchema = Yup.object().shape({
  code: Yup.string().required().label("Code"),
});

const JoinListForm = ({ onClose, onJoinList }) => {
  const [error, setError] = useState("");

  const handleOnSubmit = async (values) => {
    const { data, status } = await api.list.joinList(values.code.toUpperCase());
    if (status === 400) setError(data.token);
    else if (status >= 404) setError("Invalid code.");
    else if (status >= 500) setError("Server error.");
    else onJoinList(data);
  };

  return (
    <View style={styles.form}>
      <View style={styles.closeWrap}>
        <IconButton
          icon={{ name: "backArrow", height: 75, width: 75 }}
          style={styles.close}
          onPress={onClose}
        />
      </View>
      <AppText style={styles.heading}>Join new GList</AppText>
      <AppForm
        initialValues={{ code: "" }}
        onSubmit={handleOnSubmit}
        enableReinitialize
        validationSchema={validationSchema}
        style={styles.form}
      >
        <AppFormField
          placeholder="Glists Code"
          autoCapitalize="none"
          autoCorrect={false}
          name="code"
        />
        <SubmitButton title="Join" />
        <ErrorMessage error={error} visible={error} />
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
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  close: {
    // position: "absolute",
    left: 0,
    margin: 5,
  },
  closeWrap: {
    width: "100%",
  },
  heading: {
    fontSize: 24,
    color: Color.blueText,
    paddingBottom: 10,
  },
});

export default JoinListForm;

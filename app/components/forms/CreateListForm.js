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
  title: Yup.string().required().label("Title"),
});

const CreateListForm = ({ onClose, onCreateList, setLoading }) => {
  const [error, setError] = useState("");

  const handleOnSubmit = async (values) => {
    setLoading(true);
    const { data, status } = await api.list.postList(values);
    if (status === 400) setError(data.title);
    else if (status >= 500) setError("Server error.");
    else onCreateList(data);
    setLoading(false);
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
      <AppText style={styles.heading}>Create new GList</AppText>
      <AppForm
        initialValues={{ title: "" }}
        onSubmit={handleOnSubmit}
        enableReinitialize
        validationSchema={validationSchema}
        style={styles.form}
      >
        <AppFormField
          placeholder="Title"
          autoCapitalize="none"
          autoCorrect={false}
          name="title"
        />
        <SubmitButton title="Create" />
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

export default CreateListForm;

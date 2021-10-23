import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Button, Image } from "react-native";
import * as Yup from "yup";

import { ErrorMessage } from "../common/forms";
import { AppForm, AppFormField, SubmitButton } from "../common/forms";
import auth from "../../services/authService";
import IconButton from "../common/IconButton";
import { getUserImage } from "../../services/userService";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Name"),
});

const EditUserForm = ({ user, onClose, onPutUser, setLoading }) => {
  const [error, setError] = useState("");
  const [name, setName] = useState(user.username);

  const handleOnSubmit = async (values) => {
    setLoading(true);
    const { data, status } = await auth.putUser({ ...values });
    if (status === 400) setError(data.username);
    else if (status >= 500) setError("Server error.");
    else onPutUser(data);
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
      <Image
        style={styles.profile}
        source={{
          uri: getUserImage({
            username: name || "",
            image_url: user.image_url,
          }),
        }}
      />
      <AppForm
        initialValues={{ username: user.username }}
        onSubmit={handleOnSubmit}
        enableReinitialize
        validationSchema={validationSchema}
        style={styles.form}
      >
        <AppFormField
          placeholder="Name"
          autoCapitalize="none"
          autoCorrect={false}
          name="username"
          onChangeBonus={(n) => setName(n)}
        />
        <SubmitButton title="Update" />
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
  profile: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 15,
  },
});

export default EditUserForm;

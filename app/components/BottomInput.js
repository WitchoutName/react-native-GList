import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, TextInput, Keyboard } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import IconButton from "./common/IconButton";
import Color from "../classes/Color";
import SideMenu from "./common/SideMenu";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
});

function BottomInput({ visible, onClose, content, onSubmit, children }) {
  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", () => {
      onClose();
    });
    return () => {
      Keyboard.removeListener("keyboardDidHide");
    };
  });

  return (
    <SideMenu
      isOpen={visible}
      onClose={onClose}
      vertical={true}
      endOpacity={0}
      height="10%"
      component={
        <View style={styles.container}>
          <Formik
            initialValues={{ title: content.initialTitle }}
            onSubmit={(values) => onSubmit(values, content.id)}
            enableReinitialize
            validationSchema={validationSchema}
          >
            {({ handleSubmit, errors, values, setFieldValue }) => (
              <View style={styles.form}>
                <TextInput
                  style={styles.title}
                  placeholder="Item title..."
                  value={values["title"]}
                  onChangeText={(text) => setFieldValue("title", text)}
                />
                <IconButton
                  icon={content.icon}
                  style={[styles.icon, { opacity: errors.title ? 0.5 : 1 }]}
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
        </View>
      }
    >
      {children}
    </SideMenu>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Color.white,
    bottom: 0,
    position: "absolute",
    elevation: 5,
    width: "100%",
    height: "100%",
  },
  title: {
    margin: 0,
    padding: 0,
    flex: 7,
    fontFamily: "varela",
    fontSize: 22,
  },
  form: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  icon: {
    margin: 0,
    flex: 3,
    backgroundColor: "red",
  },
});

export default BottomInput;

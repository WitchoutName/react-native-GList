import React from "react";
import { View, StyleSheet, Modal as DefaultModal } from "react-native";
import IconButton from "./common/IconButton";

import AppText from "./common/AppText";
import Color from "../classes/Color";

const Modal = ({ visible, title, description, onClose }) => {
  return (
    <DefaultModal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <AppText style={styles.heading}>{title}</AppText>
          <AppText style={styles.text}>{description}</AppText>
          <View style={styles.buttonGroup}>
            <IconButton
              icon={{ name: "hamburger", height: 70, width: 70 }}
              onPress={() => onClose(0)}
            />
            <IconButton
              icon={{ name: "hamburger", height: 70, width: 70 }}
              onPress={() => onClose(1)}
            />
          </View>
        </View>
      </View>
    </DefaultModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    height: "30%",
    paddingTop: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  button: {
    width: "80%",
  },
  heading: {
    fontSize: 24,
    color: Color.blueText,
    borderColor: Color.listBorderOut,
    borderBottomWidth: 1,
  },
  text: {
    marginHorizontal: 10,
    textAlign: "center",
  },
});

export default Modal;

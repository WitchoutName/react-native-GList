import React from "react";
import { View, StyleSheet, Modal as DefaultModal } from "react-native";
import IconButton from "./common/IconButton";

import AppText from "./common/AppText";
import Color from "../classes/Color";

const Modal = ({ visible, onClose, content }) => {
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
          <AppText style={styles.heading}>{content.title}</AppText>
          <AppText style={styles.text}>{content.description}</AppText>
          <View style={styles.buttonGroup}>
            {content.buttons &&
              content.buttons.map((b, i) => (
                <IconButton key={i} icon={{ ...b.icon }} onPress={b.onPress} />
              ))}
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "79%",
    height: "35%",
    paddingTop: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 20,
    borderColor: Color.listBorderIn,
    borderWidth: 1,
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
    marginHorizontal: 10,
    textAlign: "center",
    overflow: "visible",
  },
  text: {
    marginHorizontal: 10,
    textAlign: "center",
  },
});

export default Modal;

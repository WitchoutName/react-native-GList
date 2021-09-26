import React, { useState, useEffect, useRef } from "react";
import AppText from "./AppText";
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import Color from "../../classes/Color";

const SnackBar = ({ isOpen, onClose, duration, title }) => {
  const [active, setActive] = useState(false);
  const posAnim = useRef(new Animated.Value(100)).current;

  const fadeIn = () => {
    Animated.timing(posAnim, {
      toValue: -24,
      duration: duration === undefined ? 250 : duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(posAnim, {
      toValue: 100,
      duration: duration === undefined ? 250 : duration,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isOpen) {
      setActive(true);
      fadeIn();
    } else fadeOut();
  }, [isOpen]);

  return (
    <>
      {active && (
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View
            style={[styles.touch, { transform: [{ translateY: posAnim }] }]}
          >
            <AppText style={styles.text}>{title}</AppText>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

let brrr = { backgroundColor: "red" };

const styles = StyleSheet.create({
  touch: {
    flex: 1,
    backgroundColor: "green",
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 50,
    padding: 10,
  },
  text: {
    color: Color.white,
  },
});

export default SnackBar;

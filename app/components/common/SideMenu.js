import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

const SideMenu = ({
  isOpen,
  onClose,
  children,
  component,
  reverse,
  width,
  duration,
}) => {
  const [active, setActive] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const posAnim = useRef(new Animated.Value(reverse ? 400 : -400)).current;

  const fadeIn = () => {
    Animated.timing(posAnim, {
      toValue: reverse ? 0 : 0,
      duration: duration === undefined ? 250 : duration,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: duration === undefined ? 250 : duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: duration === undefined ? 250 : duration,
      useNativeDriver: true,
    }).start(() => {
      setActive(false);
    });

    Animated.timing(posAnim, {
      toValue: reverse ? 400 : -400,
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

  let posStyle = {};
  posStyle[reverse ? "right" : "left"] = 0;

  return (
    <View View style={styles.container}>
      <>
        {children}
        {active && (
          <View style={styles.touchBox}>
            <Animated.View
              style={{ backgroundColor: "black", flex: 1, opacity: fadeAnim }}
            >
              <TouchableWithoutFeedback style={styles.touch} onPress={onClose}>
                <View style={styles.touchInner}></View>
              </TouchableWithoutFeedback>
            </Animated.View>
            <Animated.View
              style={[
                styles.menu,
                { transform: [{ translateX: posAnim }], width: width || "80%" },
                posStyle,
              ]}
            >
              {component}
            </Animated.View>
          </View>
        )}
      </>
    </View>
  );
};

let brrr = { backgroundColor: "red" };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  touchBox: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  touch: {
    flex: 1,
    backgroundColor: "blue",
    width: "100%",
    height: "100%",
  },
  touchInner: {
    flex: 1,
  },
  menu: {
    flex: 1,
    position: "absolute",
    top: 0,
    backgroundColor: "white",
    opacity: 1,
    height: "100%",
  },
});

export default SideMenu;

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const { width: sw, height: sh } = Dimensions.get("window");

const SideMenu = ({
  isOpen,
  onClose,
  children,
  component,
  vertical,
  endOpacity,
  reverse,
  width, // percentage only
  height, // percentage only
  duration,
}) => {
  const menuSize = {
    width: sw * (width ? parseInt(width.slice(0, -1)) / 100 : 0.8),
    height: sh * (height ? parseInt(height.slice(0, -1)) / 100 : 0.8),
  };
  const [active, setActive] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const posAnim = useRef(
    new Animated.Value(
      vertical ? menuSize.height : reverse ? menuSize.width : -menuSize.width
    )
  ).current;

  const fadeIn = () => {
    Animated.timing(posAnim, {
      toValue: vertical ? -23 : 0,
      duration: duration === undefined ? 250 : duration,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: endOpacity === undefined ? 0.5 : endOpacity,
      duration: duration === undefined ? 250 : duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(posAnim, {
      toValue: vertical
        ? menuSize.height
        : reverse
        ? menuSize.width
        : -menuSize.width,
      duration: duration === undefined ? 250 : duration,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: duration === undefined ? 250 : duration,
      useNativeDriver: true,
    }).start(() => {
      setActive(false);
    });
  };

  useEffect(() => {
    if (isOpen) {
      setActive(true);
      fadeIn();
    } else fadeOut();
  }, [isOpen]);

  const dimensions = [
    ["height", "Y", "bottom"],
    ["width", "X", reverse ? "right" : "left"],
  ];
  const index = vertical ? 0 : 1;
  const notIndex = !vertical ? 0 : 1;

  let posStyle = {};
  posStyle[dimensions[index][0]] = menuSize[dimensions[index][0]];
  posStyle[dimensions[notIndex][0]] = "100%";
  posStyle[dimensions[index][2]] = 0;
  posStyle["transform"] = [{}];
  posStyle["transform"][0][`translate${dimensions[index][1]}`] = posAnim;

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
            <Animated.View style={[styles.menu, posStyle]}>
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
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
});

export default SideMenu;

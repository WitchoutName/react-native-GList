import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

const ScreenScrollItem = ({
  Page,
  scrollToIndex,
  scroll,
  display,
  horizontal,
  style,
}) => {
  const dimensions = Dimensions.get("window");
  const dimension = horizontal ? "width" : "height";
  const dimensionValue = Dimensions.get("window")[dimension];
  const screenSize = { [dimension]: dimensionValue };

  const page = () => {
    const [Element, props] = Page;
    if (!Element || !display) return;
    return <Element scrollToIndex={scrollToIndex} {...props} />;
  };

  const compose = () => {
    const Wrapper = scroll ? ScrollView : View;
    return (
      <Wrapper
        style={{
          height: "100%",
          ...screenSize,
          ...style,
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        horizontal={!horizontal}
      >
        {page()}
      </Wrapper>
    );
  };

  return <>{compose()}</>;
};

const styles = StyleSheet.create({});

export default ScreenScrollItem;

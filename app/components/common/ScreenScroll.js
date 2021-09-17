import React, { useRef, useEffect } from "react";
import { View, ScrollView, Dimensions, StyleSheet } from "react-native";

const ScreenScroll = ({ pages, initIndex }) => {
  const screenWidth = Dimensions.get("window").width;
  const scrollView = useRef(null);

  const handleScrollToIndex = (index, animate) => {
    scrollView.current.scrollTo({
      x: screenWidth * index,
      y: 0,
      animated: animate === undefined ? animate : false,
    });
  };

  useEffect(() => {
    handleScrollToIndex(initIndex, false);
  }, []);

  return (
    <ScrollView ref={scrollView} horizontal={true} scrollEnabled={false}>
      <View
        style={{
          flexDirection: "row",
          width: screenWidth * pages.length,
          height: "100%",
        }}
      >
        {pages.map((Element, i) => (
          <ScrollView
            key={i}
            style={{ width: screenWidth }}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <Element scrollToIndex={handleScrollToIndex} />
          </ScrollView>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  innerScroll: {
    width: 100,
  },
});

export default ScreenScroll;

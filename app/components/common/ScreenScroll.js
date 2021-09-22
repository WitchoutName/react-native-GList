import React, { useRef, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  Keyboard,
} from "react-native";
import ScreenScrollItem from "./ScreenScrollItem";

const ScreenScroll = (props) => {
  const {
    pages,
    initIndex,
    hideInactivePages,
    horizontal,
    innerScroll,
    debug,
    goBackOnKeyboard,
  } = props;

  const dimension = horizontal ? "width" : "height";
  const dimensionValue = Dimensions.get("window")[dimension];
  const scrollView = useRef(null);
  const [index, setIndex] = useState(initIndex);
  const [oldIndex, setOldIndex] = useState(null);
  const [scrollTarget, setScrollTarget] = useState(0);
  const [itemDisplay, setItemDisplay] = useState([]);
  const [keyboeadOffsetting, setKeyboardOffsetting] = useState(false);

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      if (goBackOnKeyboard) {
        setKeyboardOffsetting(true);
        handleScrollToIndex(index, true);
      }
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);

  const onScrollEnd = () => {
    // unload old page
    if (keyboeadOffsetting) setKeyboardOffsetting(false);
    else {
      manageContent({ unloadIndex: oldIndex });
      setOldIndex(index);
    }
  };

  const handleScroll = ({ nativeEvent }) => {
    const { contentOffset } = nativeEvent;

    if (
      Math.floor(contentOffset[horizontal ? "x" : "y"] * 10) / 10 ===
      Math.floor(scrollTarget * 10) / 10
    ) {
      onScrollEnd();
    }
  };

  const handleScrollToIndex = (newIndex, animate) => {
    // load new page
    manageContent({ loadIndex: newIndex });
    setIndex(newIndex);

    const newScrollTarget = dimensionValue * newIndex;
    setScrollTarget(newScrollTarget);

    scrollView.current.scrollTo({
      x: horizontal ? newScrollTarget : 0,
      y: !horizontal ? newScrollTarget : 0,
      animated: animate === undefined ? animate : false,
    });
  };

  const manageContent = ({ loadIndex, unloadIndex }) => {
    if (!hideInactivePages) return;

    let newItemDisplay = [...itemDisplay];

    if (loadIndex !== undefined) {
      newItemDisplay[loadIndex] = true;
    }
    if (unloadIndex !== undefined) {
      newItemDisplay[unloadIndex] = false;
    }
    setItemDisplay(newItemDisplay);
  };

  useEffect(() => {
    let newItemDisplay = Array(pages.length).fill(!hideInactivePages);
    if (hideInactivePages) newItemDisplay[initIndex] = true;

    setItemDisplay(newItemDisplay);
    handleScrollToIndex(index, false);
  }, []);

  return (
    <ScrollView
      ref={scrollView}
      horizontal={horizontal}
      scrollEnabled={debug}
      style={styles.mainScroll}
      onScroll={handleScroll}
    >
      <View
        style={{
          flexDirection: horizontal ? "row" : "column",
          width: horizontal ? dimensionValue * pages.length : "100%",
          height: !horizontal ? dimensionValue * pages.length : "100%",
        }}
      >
        <>
          {pages.map((page, key) => (
            <ScreenScrollItem
              Page={page}
              key={key}
              scrollToIndex={handleScrollToIndex}
              scroll={innerScroll}
              display={itemDisplay[key]}
              horizontal={horizontal}
            />
          ))}
        </>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainScroll: {
    height: "100%",
  },
});

export default ScreenScroll;

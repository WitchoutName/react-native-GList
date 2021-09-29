import React, { useRef, useEffect, useState } from "react";
import { View, Animated, Dimensions, StyleSheet, Keyboard } from "react-native";
import { useKeyboard } from "@react-native-community/hooks";

import ScreenScrollItem from "./ScreenScrollItem";

const { width: sw, height: sh } = Dimensions.get("window");

const ScreenScroll = (props) => {
  const {
    pages,
    initIndex,
    hideInactivePages,
    horizontal,
    innerScroll,
    debug,
    goBackOnKeyboard,
    keyboardOffset,
  } = props;

  const [index, setIndex] = useState(initIndex);
  const [oldIndex, setOldIndex] = useState(initIndex);
  const [scrollTarget, setScrollTarget] = useState(0);
  const [itemDisplay, setItemDisplay] = useState([]);
  const [itemStyle, setItemStyle] = useState([]);
  const [keyboeadOffsetting, setKeyboardOffsetting] = useState(false);
  const [contentToManage, setContentToManage] = useState(null);

  const compSize = {
    width: sw * pages.length,
    height: sh * pages.length,
  };
  const posAnim = useRef(new Animated.Value(0)).current;

  const dimensions = [
    ["height", "Y", "top", sh],
    ["width", "X", "left", sw],
  ];
  const dim = dimensions[!horizontal ? 0 : 1];
  const notDim = dimensions[horizontal ? 0 : 1];

  const scrollToPosition = (position, duration, callback) => {
    Animated.timing(posAnim, {
      toValue: -position,
      duration: duration === undefined ? 250 : duration,
      useNativeDriver: true,
    }).start(callback);
  };

  useEffect(() => {
    // const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
    //   if (goBackOnKeyboard) {
    //     setKeyboardOffsetting(true);
    //     handleScrollToIndex(index, true);
    //   }
    // });
    // return () => {
    //   hideSubscription.remove();
    // };
  }, []);

  useEffect(() => {
    const move = pages[index][2];
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      if (!horizontal) {
        scrollToPosition(
          index * sh +
            e.endCoordinates.height *
              (move && move[0] ? parseInt(move[0].slice(0, -1)) / 100 : 0),
          move && move[1]
        );
      }
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", (e) => {
      if (!horizontal) {
        scrollToPosition(index * sh, move && move[1]);
      }
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (contentToManage) {
      manageContent(contentToManage);
    }
  }, [itemDisplay]);

  const handleScrollToIndex = (newIndex, duration) => {
    // load new page
    manageContent({ loadIndex: newIndex });
    setIndex(newIndex);

    const newScrollTarget = dim[3] * newIndex;
    setScrollTarget(newScrollTarget);

    scrollToPosition(newScrollTarget, duration, () => {
      if (keyboeadOffsetting) setKeyboardOffsetting(false);
      else {
        setOldIndex(index);
        setContentToManage({ unloadIndex: index });

        let newI = [...itemDisplay];
        newI[pages.length] = newI[pages.length] ? false : true;
        setItemDisplay(newI);
        // manageContent({ unloadIndex: oldIndex });
      }
    });
  };

  const manageContent = ({ loadIndex, unloadIndex }) => {
    setContentToManage(null);
    if (!hideInactivePages) return;

    if (loadIndex !== undefined) {
      itemDisplay[loadIndex] = true;
    }
    if (unloadIndex !== undefined) {
      itemDisplay[unloadIndex] = false;
    }
    setItemDisplay(itemDisplay);
  };

  let posStyle = {};
  posStyle[dim[0]] = compSize[dim[0]];
  posStyle[dim[2]] = compSize[dim[0]] / 2;
  posStyle["transform"] = [{}];
  posStyle["transform"][0][`translate${dim[1]}`] = posAnim;

  if (!horizontal) {
    posStyle["left"] = 0;
    posStyle["right"] = 0;
    posStyle["top"] = 0;
    // console.log(posStyle);
  }

  useEffect(() => {
    let newItemDisplay = Array(pages.length + 1).fill(!hideInactivePages);
    if (hideInactivePages) newItemDisplay[initIndex] = true;
    setItemDisplay(newItemDisplay);
    scrollToPosition(initIndex * dim[3], 1);
  }, []);

  return (
    <Animated.View style={(styles.mainScroll, posStyle)}>
      <View
        style={{
          flexDirection: horizontal ? "row" : "column",
          width: "100%",
          height: "100%",
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
              setyle={itemStyle[key]}
            />
          ))}
        </>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mainScroll: {
    flex: 1,
    position: "absolute",
    backgroundColor: "red",
    height: "100%",
    width: "100%",
  },
});

export default ScreenScroll;

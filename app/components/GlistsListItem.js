import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Color from "../classes/Color";

import AppText from "./common/AppText";
import IconButton from "./common/IconButton";

const GlistsListItem = ({
  item,
  onActivateList,
  active,
  itemHeight,
  sendItemHeight,
  callModal,
}) => {
  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => onActivateList(item.id)}
      style={[
        styles.item,
        { backgroundColor: active ? Color.listBorderIn : Color.white },
      ]}
      onLayout={({ nativeEvent }) => {
        itemHeight || sendItemHeight(nativeEvent.layout.height);
      }}
    >
      <AppText>{item.title}</AppText>
      <IconButton
        style={styles.leave}
        icon={{ name: "logout", height: 40, width: 40 }}
        onPress={() => callModal(item.id)}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 25,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: Color.listBorderIn,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "green",
  },
  leave: {
    margin: 0,
    height: 40,
    width: 40,
  },
});

export default GlistsListItem;

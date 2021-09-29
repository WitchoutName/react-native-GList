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
  onLeaveList,
  onDeleteList,
  onEditList,
  userId,
}) => {
  const getButtons = () => {
    return (
      <View style={styles.btnGroup}>
        {item.list_admin === userId ? (
          <>
            <IconButton
              style={styles.leave}
              icon={{ name: "edit", height: 40, width: 40 }}
              onPress={() => onEditList(item.id)}
            />
            <IconButton
              style={styles.leave}
              icon={{ name: "delete", height: 40, width: 40 }}
              onPress={() => onDeleteList(item.id)}
            />
          </>
        ) : (
          <IconButton
            style={styles.leave}
            icon={{ name: "logout", height: 40, width: 40 }}
            onPress={() => onLeaveList(item.id)}
          />
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => onActivateList(item.id)}
      style={[
        styles.item,
        { backgroundColor: active ? Color.listBorderIn : Color.white },
      ]}
      onLayout={({ nativeEvent }) => {
        itemHeight || sendItemHeight(nativeEvent.layout.height);
      }}
    >
      <AppText numberOfLines={1} style={styles.text}>
        {item.title}
      </AppText>
      {getButtons()}
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
  },
  text: {
    flex: 7,
  },
  leave: {
    margin: 0,
    height: 40,
    width: 40,
  },
  btnGroup: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default GlistsListItem;

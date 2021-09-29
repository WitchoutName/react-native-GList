import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./common/AppText";
import IconButton from "./common/IconButton";
import Color from "../classes/Color";

const UserFavItem = ({ item, onAdd, onDelete }) => {
  return (
    <View style={styles.item}>
      <IconButton
        style={styles.leave}
        icon={{ name: "plus", height: 42, width: 42 }}
        onPress={() => onAdd(item.title)}
      />
      <AppText>{item.title}</AppText>
      <IconButton
        style={styles.leave}
        icon={{ name: "delete", height: 42, width: 42 }}
        onPress={() => onDelete(item.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 28,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: Color.listBorderIn,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leave: {
    margin: 0,
    height: 42,
    width: 42,
  },
});

export default UserFavItem;

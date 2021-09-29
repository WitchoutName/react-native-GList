import React from "react";
import { View, StyleSheet } from "react-native";
import Color from "../classes/Color";

import AppText from "./common/AppText";
import IconButton from "./common/IconButton";

const GListsMemberItem = ({ item, isAdmin, onKick, onBan }) => {
  return (
    <View style={styles.item}>
      <View style={styles.text}>
        <AppText
          numberOfLines={1}
          style={{
            color: isAdmin ? Color.red : Color.black,
            fontWeight: isAdmin ? "700" : "400",
          }}
        >
          {item.username}
        </AppText>
        <AppText numberOfLines={1} style={styles.email}>
          {item.email}
        </AppText>
      </View>
      {!isAdmin && (
        <View style={styles.btnGroup}>
          <IconButton
            style={styles.leave}
            icon={{ name: "logout", height: 42, width: 42 }}
            onPress={() => onKick(item.id)}
          />
          <IconButton
            style={styles.leave}
            icon={{ name: "delete", height: 42, width: 42 }}
            onPress={() => onBan(item.id)}
          />
        </View>
      )}
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
  text: {
    flex: 7,
  },
  leave: {
    margin: 0,
    height: 42,
    width: 42,
  },
  btnGroup: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  email: {
    fontSize: 14,
    color: Color.grayText,
  },
});

export default GListsMemberItem;

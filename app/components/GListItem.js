import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from "react-native";
import Color from "../classes/Color";

import { getUserImage } from "../services/userService";
import AppText from "./common/AppText";
import IconButton from "./common/IconButton";
import StaticCheckbox from "./common/StaticCheckbox";

const GlistItem = ({
  item,
  index,
  checkedBy,
  userId,
  onCheck,
  onEdit,
  onLike,
}) => {
  const checkable = (checkedBy && checkedBy.id === userId) || !checkedBy;

  const getButtons = () => {
    return (
      <View style={styles.btnGroup}>
        {!checkedBy ? (
          <>
            <IconButton
              style={styles.leave}
              icon={{ name: "edit", height: 40, width: 40 }}
              onPress={() => onEdit(item.id, index)}
            />
            <IconButton
              style={styles.leave}
              icon={{ name: "heart", height: 35, width: 35 }}
              onPress={() => onLike(item.title)}
            />
          </>
        ) : (
          <IconButton
            style={styles.leave}
            icon={{ name: "heart", height: 35, width: 35 }}
            onPress={() => onLike(item.title)}
          />
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      delayPressIn={0.1}
      onPress={() => checkable && onCheck(item.id)}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: checkedBy ? Color.listBorderOut : "white" },
        ]}
      >
        <View style={styles.item}>
          <View style={styles.group}>
            <StaticCheckbox checked={checkedBy} />
            <AppText
              numberOfLines={1}
              style={{
                ...styles.text,
                ...{ textDecorationLine: checkedBy ? "line-through" : "none" },
              }}
            >
              {item.title}
            </AppText>
          </View>
          {getButtons()}
        </View>
        {!checkable && (
          <View style={styles.user}>
            <Image
              style={styles.profile}
              source={{ uri: getUserImage(checkedBy) }}
            />
            <AppText style={styles.username}>{checkedBy.username}</AppText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 7,
    marginBottom: 10,
    marginHorizontal: 10,
    justifyContent: "space-between",
    backgroundColor: Color.white,
    borderRadius: 5,
    elevation: 5,
  },
  item: {
    flexDirection: "row",
  },
  text: {
    flex: 7,
  },
  leave: {
    margin: 0,
    height: 40,
    width: 40,
  },
  group: {
    flex: 7,
    flexDirection: "row",
    alignItems: "center",
  },
  user: {
    paddingLeft: 5,
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  profile: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  username: {
    fontSize: 15,
  },
  btnGroup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default GlistItem;

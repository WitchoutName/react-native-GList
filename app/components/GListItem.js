import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import Color from "../classes/Color";

import { getUserImage } from "../services/userService";
import AppText from "./common/AppText";
import IconButton from "./common/IconButton";
import StaticCheckbox from "./common/StaticCheckbox";

const GlistItem = ({ item, checkedBy, userId, onCheck, onLike }) => {
  return (
    <View
      onPress={() => onCheck(item.id)}
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
        <IconButton
          style={styles.leave}
          icon={{ name: "heart", height: 35, width: 35 }}
          onPress={() => onLike(item.id)}
        />
      </View>
      {checkedBy && checkedBy.id !== userId && (
        <View style={styles.user}>
          <Image
            style={styles.profile}
            source={{ uri: getUserImage(checkedBy) }}
          />
          <AppText style={styles.username}>{checkedBy.username}</AppText>
        </View>
      )}
    </View>
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
});

export default GlistItem;

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Text,
} from "react-native";

import AppText from "./common/AppText";
import IconButton from "./common/IconButton";
import { getUserImage, getUserName } from "../services/userService";
import GlistsListItem from "./GlistsListItem";
import VirtualizedList from "./common/VirtualizedList";
import Color from "../classes/Color";

const DataManagament = ({
  user,
  lists,
  onLogout,
  onUserEdit,
  onActivateList,
  activeId,
  onCreateList,
  onJoinList,
  callModal,
}) => {
  const [itemHeight, setItemHeight] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.listsManage}>
        <AppText style={styles.heading}>Your GLists</AppText>
        <View
          style={[
            styles.scrollBox,
            { height: lists.length * itemHeight + 4, maxHeight: 350 },
          ]}
        >
          <ScrollView style={styles.lists}>
            {lists.map((l) => (
              <GlistsListItem
                key={l.id}
                item={l}
                active={l.id === activeId}
                onActivateList={onActivateList}
                sendItemHeight={setItemHeight}
                callModal={callModal}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.addList}>
          <IconButton
            style={styles.createList}
            icon={{ name: "logout", height: 60, width: 60 }}
            onPress={onCreateList}
          />
          <IconButton
            style={styles.createList}
            icon={{ name: "logout", height: 60, width: 60 }}
            onPress={onJoinList}
          />
        </View>
      </View>
      <View style={styles.user}>
        <View style={styles.info}>
          <Image style={styles.profile} source={{ uri: getUserImage(user) }} />
          <AppText>{getUserName(user)}</AppText>
        </View>
        <IconButton
          style={styles.logout}
          icon={{ name: "edit", height: 50, width: 50 }}
          onPress={onUserEdit}
        />
        <IconButton
          style={styles.logout}
          icon={{ name: "logout", height: 50, width: 50 }}
          onPress={onLogout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    padding: 5,
    // backgroundColor: "yellow",
    justifyContent: "space-between",
    alignItems: "center",
  },
  user: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 25,
    paddingHorizontal: 7,
  },
  info: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 7,
  },
  logout: {
    margin: 2,
    width: 40,
    height: 40,
  },
  listsManage: {
    flex: 7,
    width: "100%",
    justifyContent: "flex-start",
    padding: 5,
  },
  heading: {
    fontSize: 24,
    color: Color.blueText,
  },
  scrollBox: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: Color.listBorderOut,
  },
  lists: {
    flex: 1,
    overflow: "hidden",
    width: "100%",
  },
  addList: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderColor: Color.separator,
  },
  createList: {
    margin: 5,
  },
});

export default DataManagament;

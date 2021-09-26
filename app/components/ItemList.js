import { isLoaded } from "expo-font";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

import api from "../services/api";
import GlistItem from "./GListItem";
import VirtualizedList from "./common/VirtualizedList";
import SnackBar from "./common/SnackBar";
import OpacityCircleButton from "./OpacityCircleButton";
import BottomInput from "./BottomInput";
import Color from "../classes/Color";

const screenWidth = Dimensions.get("window").width;

const ItemList = ({ listState, userState }) => {
  const [list, setList] = listState;
  const [user, setUser] = userState;
  const [refreshing, setRefreshing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarTitle, setSnackbarTitle] = useState("");

  const [active, setActive] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputContent, setInputContent] = useState({});

  const handleCheck = (id) => {
    let item = null;
    let items = [...list.item_set].map((i) => {
      if (i.id === id) {
        item = i;
        item.checked_by = item.checked_by ? null : user.id;
        return item;
      } else return i;
    });
    setList({ ...list, item_set: items });

    api.item.putItem(item);
  };

  const handleLike = (title) => {
    setSnackbarTitle(`\'${title}\' added to your favourites!`);
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 2000);
    api.item.postItem({
      title,
      user: user.id,
    });
  };

  function handlePressPlus() {
    setInputContent({
      icon: { name: "plus", height: 55, width: 55 },
      initialTitle: "",
    });
    setInputVisible(true);
  }

  function handlePressEdit(itemId) {
    editedId.current = itemId;
    withdrawInput("edit");
  }

  function handlePressDelete() {
    setDeleteVisible(false);
  }

  return (
    <View style={[styles.scrollBox]}>
      <BottomInput
        visible={inputVisible}
        content={inputContent}
        onClose={() => setInputVisible(false)}
        onSubmit={() => {}}
      >
        <VirtualizedList>
          <FlatList
            style={{ width: screenWidth }}
            contentContainerStyle={{ paddingVertical: 10 }}
            key={"0"}
            data={list.item_set}
            renderItem={({ item: i }) => (
              <GlistItem
                item={i}
                checkedBy={list.members.filter((m) => m.id === i.checked_by)[0]}
                userId={user.id}
                onCheck={handleCheck}
                onLike={handleLike}
              />
            )}
            keyExtractor={(i) => i.id.toString()}
            refreshing={refreshing}
            onRefresh={() => {
              api.list.getList(list.id).then(({ data: l }) => {
                setList(l);
              });
            }}
          />
        </VirtualizedList>
        <SnackBar
          isOpen={snackbarVisible}
          onClose={() => setSnackbarVisible(false)}
          title={snackbarTitle}
        />
        <OpacityCircleButton
          isVisible={!inputVisible && deleteVisible}
          style={{ position: "absolute", bottom: 10, left: 10 }}
          icon={{ name: "delete", width: 30, height: 30 }}
          onPress={handlePressDelete}
        />
        <OpacityCircleButton
          isVisible={!inputVisible}
          style={{
            position: "absolute",
            bottom: 30,
            right: 10,
          }}
          icon={{ name: "plus", height: 50, width: 50 }}
          onPress={handlePressPlus}
        />
      </BottomInput>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollBox: {
    flex: 1,
  },
  lists: {
    flex: 1,
    overflow: "hidden",
  },
});

export default ItemList;

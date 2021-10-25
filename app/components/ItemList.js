import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";

import api from "../services/api";
import tools from "../tools";
import GlistItem from "./GListItem";
import VirtualizedList from "./common/VirtualizedList";
import SnackBar from "./common/SnackBar";
import OpacityCircleButton from "./OpacityCircleButton";
import BottomInput from "./BottomInput";

const screenWidth = Dimensions.get("window").width;

const ItemList = ({ listState, userState, ads, addStateToOnBack }) => {
  const [list, setList] = listState;
  const [user, setUser] = userState;
  const flatList = useRef();
  const [refreshing, setRefreshing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarTitle, setSnackbarTitle] = useState("");

  const [deleteVisible, setDeleteVisible] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputContent, setInputContent] = useState({});

  const handleCheck = (id) => {
    const item = list.item_set.filter((i) => i.id === id)[0];
    tools.item.editItem(
      { ...item, checked_by: item.checked_by ? null : user.id },
      listState
    );
  };

  function handleEdit(itemId, index) {
    flatList.current.scrollToIndex({ index, animated: true });
    const item = list.item_set.filter((i) => i.id === itemId)[0];
    setInputContent({
      icon: { name: "edit", height: 55, width: 55 },
      initialTitle: item.title,
      id: itemId,
    });
    setInputVisible(true);
  }

  const handleLike = (title) => {
    setSnackbarTitle(`\'${title}\' added to your favourites!`);
    setSnackbarVisible(true);
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 2000);

    tools.item.addItem(title, userState, "user");
  };

  function handlePressPlus() {
    setInputContent({
      icon: { name: "plus", height: 55, width: 55 },
      initialTitle: "",
    });
    setInputVisible(true);
  }

  function handlePressDelete() {
    tools.item.deleteItems(
      list.item_set.filter((i) => i.checked_by === user.id).map((i) => i.id),
      listState
    );

    setDeleteVisible(false);
  }

  function handleSubmit(title, id) {
    if (id) {
      const item = list.item_set.filter((i) => i.id === id)[0];
      tools.item.editItem({ ...item, title }, listState);
    } else {
      tools.item.addItem(title, listState, "list");
    }
  }

  useEffect(() => {
    const checkedByMe = list.item_set.filter((i) => i.checked_by === user.id);
    if (deleteVisible && checkedByMe.length === 0) setDeleteVisible(false);
    else if (!deleteVisible && checkedByMe.length > 0) setDeleteVisible(true);
  }, [list]);

  useEffect(() => {
    addStateToOnBack([inputVisible, setInputVisible]);
  }, []);

  const renderItem = ({ item, index }) => (
    <GlistItem
      item={item}
      index={index}
      checkedBy={list.members.filter((m) => m.id === item.checked_by)[0]}
      userId={user.id}
      onCheck={handleCheck}
      onEdit={handleEdit}
      onLike={handleLike}
    />
  );

  return (
    <View style={[styles.scrollBox]}>
      <BottomInput
        visible={inputVisible}
        content={inputContent}
        onClose={() => setInputVisible(false)}
        onSubmit={handleSubmit}
      >
        <VirtualizedList>
          <FlatList
            ref={flatList}
            style={{ width: screenWidth }}
            contentContainerStyle={{ paddingVertical: 10 }}
            key={"0"}
            data={list.item_set}
            renderItem={renderItem}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            removeClippedSubviews={true}
            windowSize={10}
            keyExtractor={(i) => i.id.toString()}
            refreshing={refreshing}
            onRefresh={() => {
              list.id &&
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
          style={{ position: "absolute", bottom: ads ? 10 : 30, left: 10 }}
          icon={{ name: "delete", width: 53, height: 53 }}
          onPress={handlePressDelete}
        />
        <OpacityCircleButton
          isVisible={!inputVisible && list.id}
          style={{
            position: "absolute",
            bottom: ads ? 10 : 30,
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

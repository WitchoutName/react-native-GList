import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import api from "../services/api";
import AppText from "./common/AppText";
import IconButton from "./common/IconButton";
import GlistsListItem from "./GlistsListItem";
import Color from "../classes/Color";
import CreateListForm from "./forms/CreateListForm";
import JoinListForm from "./forms/JoinListForm";
import EditListForm from "./forms/EditListForm";

const ListManagament = ({
  userId,
  listState,
  listsState,
  setModal,
  setInput,
  hidePanel,
}) => {
  const [itemHeight, setItemHeight] = useState(0);
  const [list, setList] = listState;
  const [lists, setLists] = listsState;
  const [setModalVisible, setModalContent] = setModal;
  const [setInputVisible, setInputContent] = setInput;

  const handleInputClose = () => {
    setInputVisible(false);
  };

  const handleActivateList = (id) => {
    if (id !== list.id) {
      api.list.getList(id).then(({ data: l }) => {
        console.log(l);
        setList(l);
        api.list.setActiveList(id);
        hidePanel();
      });
    }
  };

  const handleInitCreateList = () => {
    setInputContent(
      <CreateListForm onClose={handleInputClose} onCreateList={handleAddList} />
    );
    setInputVisible(true);
  };

  const handleInitJoinList = () => {
    setInputContent(
      <JoinListForm onClose={handleInputClose} onJoinList={handleAddList} />
    );
    setInputVisible(true);
  };

  const handleAddList = (newList) => {
    setLists([newList, ...lists]);
    setInputVisible(false);
  };

  const handleInitEditList = (listId) => {
    setInputContent(
      <EditListForm
        list={lists.filter((l) => l.id === listId)[0]}
        onClose={handleInputClose}
        onEditList={handleEditList}
      />
    );
    setInputVisible(true);
  };

  const handleEditList = (newList) => {
    setLists(lists.map((l) => (l.id === newList.id ? newList : l)));
    setInputVisible(false);
  };

  const handleLeaveList = (listId) => {
    setModalContent({
      title: "Leave",
      description: `Are you sure you want to leave \'${
        lists.filter((l) => l.id === listId)[0].title
      }\' GList?`,
      buttons: [
        {
          icon: {
            name: "tick",
            height: 70,
            width: 70,
          },
          onPress: () => leaveList(listId),
        },
        {
          icon: {
            name: "delete",
            height: 70,
            width: 70,
          },
          onPress: () => {
            setModalVisible(false);
          },
        },
      ],
    });
    setModalVisible(true);
  };

  const leaveList = (listId) => {
    setLists(lists.filter((l) => l.id !== listId));
    api.list.leaveList(listId).then((r) => console.log(r));
    setModalVisible(false);
  };

  const handleDeleteList = (listId) => {
    setModalContent({
      title: "Delete",
      description: `Are you sure you want to delete \'${
        lists.filter((l) => l.id === listId)[0].title
      }\' GList?`,
      buttons: [
        {
          icon: {
            name: "tick",
            height: 70,
            width: 70,
          },
          onPress: () => deleteList(listId),
        },
        {
          icon: {
            name: "delete",
            height: 70,
            width: 70,
          },
          onPress: () => {
            setModalVisible(false);
          },
        },
      ],
    });
    setModalVisible(true);
  };

  const deleteList = (listId) => {
    setLists(lists.filter((l) => l.id !== listId));
    api.list.deleteList(listId).then((r) => console.log(r));
    setModalVisible(false);
  };

  return (
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
              userId={userId}
              active={l.id === list.id}
              onActivateList={handleActivateList}
              sendItemHeight={setItemHeight}
              onEditList={handleInitEditList}
              onLeaveList={handleLeaveList}
              onDeleteList={handleDeleteList}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.addList}>
        <IconButton
          style={styles.createList}
          icon={{ name: "plus", height: 60, width: 60 }}
          onPress={handleInitCreateList}
        />
        <IconButton
          style={styles.createList}
          icon={{ name: "search", height: 60, width: 60 }}
          onPress={handleInitJoinList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ListManagament;

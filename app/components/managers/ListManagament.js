import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import api from "../../services/api";
import tools from "../../tools";
import AppText from "../common/AppText";
import IconButton from "../common/IconButton";
import GlistsListItem from "../GlistsListItem";
import Color from "../../classes/Color";
import SideMenuList from "../common/SideMenuList";
import CreateListForm from "../forms/CreateListForm";
import JoinListForm from "../forms/JoinListForm";
import EditListForm from "../forms/EditListForm";

const ListManagament = ({
  userId,
  listId,
  listsState,
  setModal,
  setInput,
  onAdminList,
  onActivateList,
  setLoading,
}) => {
  const [itemHeight, setItemHeight] = useState(0);
  const [lists, setLists] = listsState;
  const [setModalVisible, setModalContent] = setModal;
  const [setInputVisible, setInputContent] = setInput;

  const handleInputClose = () => {
    setInputVisible(false);
  };

  const handleInitCreateList = () => {
    setInputContent(
      <CreateListForm
        onClose={handleInputClose}
        onCreateList={handleAddList}
        setLoading={setLoading}
      />
    );
    setInputVisible(true);
  };

  const handleInitJoinList = () => {
    setInputContent(
      <JoinListForm
        onClose={handleInputClose}
        onJoinList={handleAddList}
        setLoading={setLoading}
      />
    );
    setInputVisible(true);
  };

  const handleAddList = (newList) => {
    setLists([newList, ...lists]);
    setInputVisible(false);
  };

  const handleLeaveList = (listId) => {
    tools.generic.confirmationModal(setModal, {
      action: "leave",
      query: {
        set: lists,
        searchAttr: ["id", listId],
        displayAttr: "title",
      },
      onApprove: () => leaveList(listId),
    });
  };

  const leaveList = (listId) => {
    setLists(lists.filter((l) => l.id !== listId));
    api.list.leaveList(listId).then((r) => console.log(r));
    setModalVisible(false);
  };

  const handleDeleteList = (listId) => {
    tools.generic.confirmationModal(setModal, {
      action: "delete",
      query: {
        set: lists,
        searchAttr: ["id", listId],
        displayAttr: "title",
      },
      onApprove: () => deleteList(listId),
    });
  };

  const deleteList = (listId) => {
    setLists(lists.filter((l) => l.id !== listId));
    api.list.deleteList(listId).then((r) => console.log(r));
    setModalVisible(false);
  };

  return (
    <View style={styles.listsManage}>
      <View
        style={[
          styles.list,
          { height: lists.length * itemHeight + 51, maxHeight: "90%" },
        ]}
      >
        <SideMenuList
          title="Your GLists"
          data={lists}
          scrollBoxStyle={{
            height: lists.length * itemHeight + 25,
            maxHeight: "90%",
          }}
          render={(item) => (
            <GlistsListItem
              key={item.id}
              item={item}
              userId={userId}
              active={item.id === listId}
              onActivateList={onActivateList}
              sendItemHeight={setItemHeight}
              onEditList={onAdminList}
              onLeaveList={handleLeaveList}
              onDeleteList={handleDeleteList}
            />
          )}
        />
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
  list: {},
  addList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  createList: {
    margin: 5,
  },
});

export default ListManagament;

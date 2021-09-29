import React from "react";
import { View, StyleSheet } from "react-native";

import Color from "../../classes/Color";
import AppText from "../common/AppText";
import MemberManagement from "./MemberManagement";
import IconButton from "../common/IconButton";
import EditListForm from "../forms/EditListForm";

const ListAdmin = ({ listState, listsState, setModal, setInput, userId }) => {
  const [list, setList] = listState;
  const [lists, setLists] = listsState;
  const [setInputVisible, setInputContent] = setInput;

  const handleInitEditList = (listId) => {
    setInputContent(
      <EditListForm
        list={list}
        onClose={setInputVisible(false)}
        onEditList={handleEditList}
      />
    );
    setInputVisible(true);
  };

  const handleEditList = (newList) => {
    setLists(lists.map((l) => (l.id === newList.id ? newList : l)));
    setList(newList);
    setInputVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <View style={styles.edit}>
          <AppText style={styles.heading}>Title</AppText>
          <IconButton
            icon={{ name: "edit", height: 45, width: 45 }}
            style={styles.icon}
            onPress={handleInitEditList}
          />
        </View>
        <AppText style={styles.title}>{list.title}</AppText>
      </View>
      <MemberManagement
        listState={listState}
        setModal={setModal}
        setInput={setInput}
        userId={userId}
      />
      <View style={styles.code}>
        <AppText style={styles.codeName}>
          Code to join: <AppText style={styles.codeText}>{list.token}</AppText>
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 5,
  },
  edit: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    borderBottomWidth: 2,
    borderColor: Color.listBorderOut,
    paddingVertical: 20,
  },
  titleBox: {
    flex: 2,
    alignItems: "center",
    marginBottom: "7%",
    width: "100%",
  },
  heading: {
    fontSize: 24,
    color: Color.blueText,
  },
  title: { fontSize: 24 },
  icon: { margin: 0 },
  code: {
    flex: 2,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 25,
    paddingHorizontal: 7,
  },
  codeName: {
    fontSize: 20,
    color: Color.grayText,
    paddingVertical: 20,
  },
  codeText: {
    fontSize: 25,
    fontWeight: "700",
    color: Color.black,
  },
});

export default ListAdmin;

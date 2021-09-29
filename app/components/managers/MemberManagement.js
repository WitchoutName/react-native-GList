import React from "react";
import { View, StyleSheet } from "react-native";

import api from "../../services/api";
import tools from "../../tools";
import Color from "../../classes/Color";
import SideMenuList from "../common/SideMenuList";
import GListsMemberItem from "../GListsMemberItem";

const MemberManagement = ({ listState, setModal, setInput, userId }) => {
  const [list, setList] = listState;
  const [setModalVisible, setModalContent] = setModal;
  const [setInputVisible, setInputContent] = setInput;

  const deleteMember = (id) => {
    let members = [...list.members];
    setList({ ...list, members: members.filter((m) => m.id !== id) });

    setModalVisible(false);
  };

  const handleKick = (memberId) => {
    tools.generic.confirmationModal(setModal, {
      action: "kick",
      query: {
        set: list.members,
        searchAttr: ["id", memberId],
        displayAttr: "username",
      },
      onApprove: () => kick(memberId),
    });
  };

  const kick = (id) => {
    deleteMember(id);
    api.member.kickMember(list.id, id);
  };

  const handleBan = (memberId) => {
    tools.generic.confirmationModal(setModal, {
      action: "ban",
      query: {
        set: list.members,
        searchAttr: ["id", memberId],
        displayAttr: "username",
      },
      onApprove: () => ban(memberId),
    });
  };

  const ban = (id) => {
    deleteMember(id);
    api.member.banMember(list.id, id);
  };

  return (
    <View style={styles.container}>
      <SideMenuList
        title="Members"
        data={list.members.sort((a, b) => a.username.localeCompare(b.username))}
        render={(item) => (
          <GListsMemberItem
            key={item.id}
            item={item}
            isAdmin={item.id === userId}
            onKick={handleKick}
            onBan={handleBan}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 15,
    width: "100%",
    height: "100%",
    borderBottomWidth: 1,
    borderColor: Color.separator,
    justifyContent: "flex-start",
  },
});

export default MemberManagement;

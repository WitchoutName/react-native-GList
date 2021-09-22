import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";

import api from "../services/api";
import AppText from "../components/common/AppText";
import Screen from "../components/common/Screen";
import Navbar from "../components/Navbar";
import SideMenu from "./../components/common/SideMenu";
import DataManagament from "../components/DataManagament";
import EditUserForm from "../components/forms/EditUserForm";
import CreateListForm from "./../components/forms/CreateListForm";
import JoinListForm from "../components/forms/JoinListForm";
import Modal from "../components/Modal";

const ListScreen = ({ scrollToIndex }) => {
  const [lists, setLists] = useState([]);
  const [list, setList] = useState({ title: "GLIst" });
  const [user, setUser] = useState({});
  const [inputOpen, setInputOpen] = useState(false);
  const [inputContent, setInputContent] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [madalDeleteId, setModalDeleteId] = useState(null);

  const handleModalClose = (state) => {
    // if (state) handleLeaveList()                                        FIX MODAL
    setModalVisible(false);
  };

  const handleInputClose = () => {
    setInputOpen(false);
  };

  const handleActivateList = (id) => {
    if (id !== list.id) {
      api.list.getList(id).then(({ data: l }) => {
        setList(l);
        api.list.setActiveList(id);
      });
    }
  };

  const handleInitCreateList = () => {
    setInputContent(
      <CreateListForm onClose={handleInputClose} onCreateList={handleAddList} />
    );
    setInputOpen(true);
  };

  const handleInitJoinList = () => {
    setInputContent(
      <JoinListForm onClose={handleInputClose} onJoinList={handleAddList} />
    );
    setInputOpen(true);
  };

  const handleAddList = (newList) => {
    setLists([newList, ...lists]);
    setInputOpen(false);
  };

  const handleLeaveList = (listId) => {
    setLists(lists.filter((l) => l.id === listId));
  };

  const handleUserEdit = () => {
    setInputContent(
      <EditUserForm
        user={user}
        onClose={handleInputClose}
        onPutUser={handlePutUser}
      />
    );
    setInputOpen(true);
  };

  const handlePutUser = (newUser) => {
    setUser(newUser);
    setInputOpen(false);
  };

  const handleLogout = () => {
    api.auth.logout();
    setUser({});
    scrollToIndex(0);
  };

  useEffect(() => {
    api.list.getLists().then(({ data: l }) => {
      setLists(l);

      api.list.getActiveList().then((newId) => {
        if (newId)
          api.list.getList(newId).then(({ data: l }) => {
            setList(l);
          });
        else setList(l[0]);
      });
    });

    api.auth.getUser().then((u) => {
      setUser(u);
    });
  }, []);

  return (
    <Screen>
      <Modal
        title="Leave"
        description="Are you sure you want to leave this GList?"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <SideMenu
        isOpen={inputOpen}
        onClose={() => setDrawerOpen(false)}
        width="100%"
        component={inputContent}
        duration={200}
      >
        <Navbar
          onLogout={handleLogout}
          listTitle={list.title}
          onOpenDrawer={() => setDrawerOpen(!drawerOpen)}
        />

        <SideMenu
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          component={
            <DataManagament
              user={user}
              lists={lists}
              onUserEdit={handleUserEdit}
              onLogout={handleLogout}
              onActivateList={handleActivateList}
              activeId={list.id}
              onCreateList={handleInitCreateList}
              onJoinList={handleInitJoinList}
              callModal={(id) => {
                setModalDeleteId(id);
                setModalVisible(true);
              }}
            />
          }
        >
          <View style={styles.list}>
            <AppText>list items</AppText>
          </View>
        </SideMenu>
      </SideMenu>
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
  },
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});

export default ListScreen;

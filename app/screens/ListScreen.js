import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";

import api from "../services/api";
import AppText from "../components/common/AppText";
import Screen from "../components/common/Screen";
import Navbar from "../components/Navbar";
import SideMenu from "./../components/common/SideMenu";
import ListManagament from "../components/ListManagament";
import Modal from "../components/Modal";
import UserManagement from "../components/UserManagement";
import ItemList from "../components/ItemList";

const ListScreen = ({ scrollToIndex }) => {
  const [list, setList] = useState({
    title: "GLIst",
    item_set: [],
    members: [],
  });
  const [lists, setLists] = useState([]);
  const [user, setUser] = useState({});
  const [inputVisible, setInputVisible] = useState(false);
  const [inputContent, setInputContent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    api.auth.logout();
    setUser({});
    scrollToIndex(0);
  };

  const handleHidePanel = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    api.list.getLists().then(({ data: l }) => {
      setLists(l);

      api.list.getActiveList().then((newId) => {
        if (newId)
          api.list.getList(newId).then(({ data: l }) => {
            // console.log(l);
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
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        content={modalContent}
      />
      <SideMenu
        isOpen={inputVisible}
        onClose={() => setDrawerOpen(false)}
        width="100%"
        component={inputContent}
        duration={200}
      >
        <Navbar
          listTitle={list.title}
          onOpenDrawer={() => setDrawerOpen(!drawerOpen)}
        />

        <SideMenu
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          component={
            <View style={styles.dataContainer}>
              <ListManagament
                userId={user.id}
                listState={[list, setList]}
                listsState={[lists, setLists]}
                setModal={[setModalVisible, setModalContent]}
                setInput={[setInputVisible, setInputContent]}
                hidePanel={handleHidePanel}
              />
              <UserManagement
                userState={[user, setUser]}
                onLogout={handleLogout}
                setInput={[setInputVisible, setInputContent]}
              />
            </View>
          }
        >
          <ItemList userId={user.id} listState={[list, setList]} />
        </SideMenu>
      </SideMenu>
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
  },

  dataContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ListScreen;

import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";

import api from "../services/api";
import AppText from "../components/common/AppText";
import Screen from "../components/common/Screen";
import Navbar from "../components/Navbar";
import SideMenu from "./../components/common/SideMenu";
import Modal from "../components/Modal";
import DataManagement from "../components/managers/DataManagement";
import ItemList from "../components/ItemList";
import FavouriteItems from "../components/FavouriteItems";

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
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerDeleteOnHide, setDrawerDeleteOnHide] = useState(true);
  const [drawerAnimationHidden, setDrawerAnimationHidden] = useState(true);
  const [drawerRightVisible, setDrawerRightVisible] = useState(false);
  const [drawerRightContent, setDrawerRightContent] = useState(false);

  const handleLogout = () => {
    api.auth.logout();
    setUser({});
    scrollToIndex(0);
  };

  useEffect(() => {
    api.list.getLists().then(({ data: rLists }) => {
      setLists(rLists.sort((a, b) => a.title.localeCompare(b.title)));

      let listToLoad = null;

      api.list.getActiveList().then((newId) => {
        if (newId) {
          if (rLists.map((rl) => rl.id).includes(parseInt(newId))) {
            api.list.getActiveList(null);
            listToLoad = rLists[0].id;
          } else listToLoad = newId;
        } else listToLoad = rLists[0].id;

        api.list.getList(listToLoad).then(({ data: l }) => setList(l));
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
        onClose={() => setDrawerVisible(false)}
        width="100%"
        component={inputContent}
        duration={200}
      >
        <Navbar
          list={list}
          onOpenDrawer={() => {
            setDrawerVisible(!drawerVisible);
            setDrawerRightVisible(false);
          }}
          onOpenDrawerRight={() => {
            setDrawerRightVisible(!drawerRightVisible);
            setDrawerVisible(false);
          }}
        />

        <SideMenu
          isOpen={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          setAnimationHidden={setDrawerAnimationHidden}
          deleteOnHide={drawerDeleteOnHide}
          component={
            <DataManagement
              userState={[user, setUser]}
              listState={[list, setList]}
              listsState={[lists, setLists]}
              drawerControls={[
                setDrawerVisible,
                setDrawerDeleteOnHide,
                drawerAnimationHidden,
              ]}
              setModal={[setModalVisible, setModalContent]}
              setInput={[setInputVisible, setInputContent]}
              onLogout={handleLogout}
            />
          }
        >
          <SideMenu
            isOpen={drawerRightVisible}
            onClose={() => setDrawerRightVisible(false)}
            reverse={true}
            component={
              <FavouriteItems
                userState={[user, setUser]}
                listState={[list, setList]}
              />
            }
          >
            <ItemList listState={[list, setList]} userState={[user, setUser]} />
          </SideMenu>
        </SideMenu>
      </SideMenu>
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
  },
});

export default ListScreen;

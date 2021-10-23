import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import api from "../../services/api";
import ListManagament from "./ListManagament";
import UserManagement from "./UserManagement";
import ListAdmin from "./ListAdmin";

const DataManagement = ({
  userState,
  listState,
  listsState,
  drawerControls,
  setModal,
  setInput,
  onLogout,
  setLoading,
}) => {
  const [list, setList] = listState;
  const [lists, setLists] = listsState;
  const [user, setUser] = userState;
  const [adminMenu, setAdminMenu] = useState(false);
  const [adminMenuRequest, setAdminMenuRequest] = useState(false);
  const [setDrawerVisible, setDrawerDeleteOnHide, drawerAnimationHidden] =
    drawerControls;

  const handleActivateList = (id, notHide) => {
    if (id !== list.id) {
      api.list.getList(id).then(({ data: l }) => {
        setList(l);
        api.list.setActiveList(id);
        if (!notHide) setDrawerVisible(false);
      });
    }
  };

  const handleAdminList = (id) => {
    const aList = lists.filter((l) => l.id === id)[0];
    setAdminMenuRequest(aList);
    setDrawerDeleteOnHide(false);
    setDrawerVisible(false);
    handleActivateList(id, true);
  };

  useEffect(() => {
    if (drawerAnimationHidden) {
      if (adminMenuRequest) {
        setAdminMenu(true);
        setAdminMenuRequest(false);
        setDrawerDeleteOnHide(true);
        setDrawerVisible(true);
      } else {
        setAdminMenu(false);
      }
    }
  }, [drawerAnimationHidden]);

  return (
    <View style={styles.container}>
      {!adminMenu ? (
        <>
          <ListManagament
            userId={user.id}
            listId={listState[0].id}
            listsState={listsState}
            setModal={setModal}
            setInput={setInput}
            hidePanel={() => setDrawerVisible(false)}
            onAdminList={handleAdminList}
            onActivateList={handleActivateList}
            setLoading={setLoading}
          />
          <UserManagement
            userState={userState}
            onLogout={onLogout}
            setInput={setInput}
            setLoading={setLoading}
          />
        </>
      ) : (
        <ListAdmin
          listState={listState}
          listsState={listsState}
          setModal={setModal}
          setInput={setInput}
          userId={user.id}
          setLoading={setLoading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default DataManagement;

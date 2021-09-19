import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";

import AppText from "../components/common/AppText";
import Screen from "../components/common/Screen";
import List from "../components/List";
import Navbar from "../components/Navbar";
import auth from "../services/authService";
import EmptyMainList from "./../components/EmptyMainList";
import SideMenu from "./../components/common/SideMenu";
import DataManagament from "../components/DataManagament";

const SideMenuContent = () => {
  return (
    <View style={styles.list}>
      <AppText>list items</AppText>
    </View>
  );
};

const ListScreen = ({ scrollToIndex }) => {
  const [list, setList] = useState({});
  const [user, setUser] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawer = useRef(null);

  const handleLogout = () => {
    auth.logout();
    scrollToIndex(0);
  };

  useEffect(() => {
    setList({
      title: "My Lisssssssssst 123",
    });

    auth.getUser().then((u) => {
      setUser(u);
    });
  }, []);

  return (
    <Screen>
      <Navbar
        onLogout={handleLogout}
        listTitle={list.title}
        onOpenDrawer={() => setDrawerOpen(!drawerOpen)}
      />
      <SideMenu
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        component={<DataManagament user={user} onLogout={handleLogout} />}
      >
        <View style={styles.list}>
          <AppText>list items</AppText>
        </View>
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
  },
});

export default ListScreen;

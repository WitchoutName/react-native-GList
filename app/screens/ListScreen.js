import React, { useState, useEffect. useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import Drawer from "react-native-drawer";
import AppText from "../components/common/AppText";

import Screen from "../components/common/Screen";
import Navbar from "../components/Navbar";
import auth from "../services/authService";
import EmptyMainList from "./../components/EmptyMainList";

const ListScreen = ({ scrollToIndex }) => {
  const [list, setList] = useState({});
  const 

  const handleLogout = () => {
    auth.logout();
    scrollToIndex(0);
  };

  useEffect(() => {
    setList({
      title: "My Lisssssssssst 123",
    });

    auth.getAuthToken().then((r) => console.log(r));
  }, []);

  return (
    <Screen>
      <Navbar onLogout={handleLogout} listTitle={list.title} />
      <Drawer
        type="static"
        content={<EmptyMainList />}
        openDrawerOffset={100}
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        <View>
          <AppText>list items</AppText>
        </View>
      </Drawer>
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
  },
});

export default ListScreen;

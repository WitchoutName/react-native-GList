import React from "react";
import { View, StyleSheet, Button, Image } from "react-native";

import AppText from "./common/AppText";

const DataManagament = ({ user, onLogout }) => {
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <AppText>list of lists</AppText>
      </View>
      <View style={styles.user}>
        <View>
          <AppText>{user.username}</AppText>
        </View>

        <Button title="Logout" onPress={onLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    padding: 5,
    backgroundColor: "yellow",
    justifyContent: "space-between",
    alignItems: "center",
  },
  list: {
    flex: 3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "tomato",
  },
  user: {
    flex: 1,
    width: "100%",
    backgroundColor: "cyan",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
});

export default DataManagament;

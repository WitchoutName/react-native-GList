import React from "react";
import { View, StyleSheet, Image } from "react-native";

import Color from "../../classes/Color";
import EditUserForm from "../forms/EditUserForm";
import { getUserImage, getUserName } from "../../services/userService";
import IconButton from "../common/IconButton";
import AppText from "../common/AppText";

const UserManagement = ({ userState, onLogout, setInput, setLoading }) => {
  const [user, setUser] = userState;
  const [setInputVisible, setInputContent] = setInput;

  const handleUserEdit = () => {
    setInputContent(
      <EditUserForm
        user={user}
        onClose={() => setInputVisible(false)}
        onPutUser={handlePutUser}
        setLoading={setLoading}
      />
    );
    setInputVisible(true);
  };

  const handlePutUser = (newUser) => {
    setUser(newUser);
    setInputVisible(false);
  };

  return (
    <View style={styles.user}>
      <View style={styles.info}>
        <Image style={styles.profile} source={{ uri: getUserImage(user) }} />
        <AppText>{getUserName(user)}</AppText>
      </View>
      {!user.google_login && (
        <IconButton
          style={styles.logout}
          icon={{ name: "edit", height: 50, width: 50 }}
          onPress={handleUserEdit}
        />
      )}
      <IconButton
        style={styles.logout}
        icon={{ name: "logout", height: 50, width: 50 }}
        onPress={onLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  user: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 25,
    paddingHorizontal: 7,
    borderTopWidth: 1,
    borderColor: Color.separator,
  },
  info: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 7,
  },
  logout: {
    margin: 2,
    width: 40,
    height: 40,
  },
});

export default UserManagement;

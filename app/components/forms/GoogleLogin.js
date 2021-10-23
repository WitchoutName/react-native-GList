import React, { useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import * as GoogleSignIn from "expo-google-sign-in";
import * as GoogleExpo from "expo-google-app-auth";
import Constants from "expo-constants";

import Icon from "../../assets/Icons/Icon";

export default function GoogleLogin({ setLoading, onGoogleAuth, setError }) {
  const config = {
    expo: {
      androidClientId:
        "1087978326575-7t99t91m6i65phqb5b6tpscm22vk29e2.apps.googleusercontent.com",
    },
    standalone: {
      androidClientId:
        "1087978326575-f1b1k56mbligup217eskv8f541gr5vsa.apps.googleusercontent.com",
    },
  };

  const signInExpo = async () => {
    const { accessToken } = await GoogleExpo.logInAsync(config.expo);
    if (accessToken) onGoogleAuth({ accessToken });
    else setLoading(false);
  };

  const signInStandalone = async () => {
    await GoogleSignIn.askForPlayServicesAsync();
    const { type, user } = await GoogleSignIn.signInAsync();
    if (type === "success") {
      onGoogleAuth(user.auth);
    }
  };

  const handleSignIn = () => {
    setLoading(true);
    try {
      if (Constants.appOwnership === "standalone") signInStandalone();
      else signInExpo();
    } catch ({ message }) {
      setError("login: Error:" + message);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function run() {
      await GoogleSignIn.initAsync(config.standalone);
    }
    if (Constants.appOwnership === "standalone") run();
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.google}
      onPress={handleSignIn}
    >
      <Icon name="google" height={46} width={46} />
      <Text style={styles.googleText}>Sign in with Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  google: {
    paddingRight: 8,
    backgroundColor: "white",
    fontFamily: "Roboto-Medium",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 3,
    elevation: 3,
  },
  googleText: {
    fontSize: 17,
    marginHorizontal: 10,
  },
});

import React from "react";
import { StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import LoginScreen from "./app/screens/loginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";

export default (props) => {
  let [fontsLoaded] = useFonts({
    nats: require("./app/assets/fonts/NATS-Regular.ttf"),
    varela: require("./app/assets/fonts/VarelaRound-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <LoginScreen />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

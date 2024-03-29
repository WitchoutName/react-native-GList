import React, { useEffect, useState } from "react";
import { StyleSheet, View, Platform, StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import Color from "./app/classes/Color";
import LinearPanel from "./app/components/LinearPanel";
import ScreenScroll from "./app/components/common/ScreenScroll";
import LoginScreen from "./app/screens/loginScreen";
import ListScreen from "./app/screens/ListScreen";
import auth from "./app/services/authService";

export default (props) => {
  let [fontsLoaded] = useFonts({
    nats: require("./app/assets/fonts/NATS-Regular.ttf"),
    varela: require("./app/assets/fonts/VarelaRound-Regular.ttf"),
  });

  const [authCheck, setAuthCheck] = useState(false);
  const [initIndex, setInitIndex] = useState(0);

  useEffect(() => {
    auth.getAuthToken().then((r) => {
      if (r) setInitIndex(1);
      setAuthCheck(true);
    });
  }, []);

  if (!fontsLoaded || !authCheck) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <LinearPanel colors={[Color.purple, Color.blue]} />
          <ScreenScroll
            pages={[
              [LoginScreen, {}, ["66%"]],
              [ListScreen, {}],
            ]}
            initIndex={initIndex}
            debug={false}
            goBackOnKeyboard={true}
            hideInactivePages={true}
            horizontal={false}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  wrap: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

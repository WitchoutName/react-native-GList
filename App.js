import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
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

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View>
          <LinearPanel colors={[Color.purple, Color.blue]} />
          <ScreenScroll
            pages={[
              [LoginScreen, {}],
              [ListScreen, {}],
            ]}
            initIndex={1}
            debug={false}
            goBackOnKeyboard={true}
            hideInactivePages
            handle
          />
          {/* <LoginScreen scrollToIndex={() => {}} /> */}
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

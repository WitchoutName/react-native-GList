import React, { useEffect, useState } from "react";
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
import List from "./app/components/List";

export default (props) => {
  let [fontsLoaded] = useFonts({
    nats: require("./app/assets/fonts/NATS-Regular.ttf"),
    varela: require("./app/assets/fonts/VarelaRound-Regular.ttf"),
  });

  const [authCheck, setAuthCheck] = useState(false);
  const [initIndex, setInitIndex] = useState(0);

  useEffect(() => {
    auth.getAuthToken().then((r) => {
      console.log(!!r);
      if (r) setInitIndex(1);
      setAuthCheck(true);
    });
  }, []);

  // useEffect(()=>{

  // }, [initIndex])

  if (!fontsLoaded || !authCheck) {
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
            initIndex={initIndex}
            debug={false}
            goBackOnKeyboard={true}
            hideInactivePages={false}
          />
          <List />
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

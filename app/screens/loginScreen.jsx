import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, Button, Dimensions } from "react-native";

import Screen from "../components/common/Screen";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import ForgottenPasswordForm from "../components/forms/ForgottenPasswordForm";
import LogoForm from "../components/forms/LogoForm";
import ScreenScroll from "../components/common/ScreenScroll";

const LoginScreen = ({ scrollToIndex }) => {
  const handleAuth = () => {
    scrollToIndex(1);
  };

  return (
    <Screen>
      {/* <Button
        style={{ position: "absolute", top: 0 }}
        title="to list"
        onPress={() => scrollToIndex(1)}
      /> */}
      <LogoForm>
        <ScreenScroll
          pages={[
            [RegisterForm, { onAuth: handleAuth }],
            [LoginForm, { onAuth: handleAuth }],
            [ForgottenPasswordForm, {}],
          ]}
          initIndex={1}
          horizontal={true}
          innerScroll={true}
          hideInactivePages={false}
          debug={false}
        />
      </LogoForm>
    </Screen>
  );
};

export default LoginScreen;

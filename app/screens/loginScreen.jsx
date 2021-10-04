import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, Button, Dimensions } from "react-native";

import api from "../services/api";
import Screen from "../components/common/Screen";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import ForgottenPasswordForm from "../components/forms/ForgottenPasswordForm";
import PasswordRestoreCodeForm from "../components/forms/PasswordRestoreCodeForm";
import LogoForm from "../components/forms/LogoForm";
import ScreenScroll from "../components/common/ScreenScroll";
import Loader from "../components/Loader";
import Changepasswordform from "./../components/forms/ChangePasswordForm";

const LoginScreen = ({ scrollToIndex }) => {
  const [loaging, setLoading] = useState(false);
  const [passwordCode, setPasswordCode] = useState(null);

  const handleAuth = () => {
    api.list.setActiveList("").then(() => scrollToIndex(1));
  };

  return (
    <Screen>
      <LogoForm>
        <ScreenScroll
          pages={[
            [RegisterForm, { onAuth: handleAuth, setLoading }],
            [LoginForm, { onAuth: handleAuth, setLoading }],
            [ForgottenPasswordForm, { setLoading }],
            [PasswordRestoreCodeForm, { setPasswordCode, setLoading }],
            [Changepasswordform, { code: passwordCode, setLoading }],
          ]}
          initIndex={1}
          horizontal={true}
          innerScroll={true}
          hideInactivePages={true}
          debug={false}
        />
      </LogoForm>
      <Loader visible={loaging} duration={250} />
    </Screen>
  );
};

export default LoginScreen;

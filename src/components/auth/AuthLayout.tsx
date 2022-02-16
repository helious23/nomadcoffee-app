import React from "react";
import styled from "styled-components/native";
import { KeyboardAvoidingView, useColorScheme, Platform } from "react-native";
import DismissKeyboard from "../DismissKeyboard";

const Container = styled.View`
  background-color: ${(props) => props.theme.mainBgColor};
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 5%;
`;

const Logo = styled.Image`
  max-width: 80%;
  width: 100%;
  height: 20%;
  margin: 50px auto;
`;

const AuthLayout: React.FC = ({ children }) => {
  const isDark = useColorScheme() === "dark";
  return (
    <DismissKeyboard>
      <Container>
        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === "ios" ? 200 : 0}
        >
          <Logo
            resizeMode="contain"
            source={
              isDark
                ? require("../../assets/logo_white.png")
                : require("../../assets/logo_black.png")
            }
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
};

export default AuthLayout;

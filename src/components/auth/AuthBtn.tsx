import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity<{ disabled: boolean }>`
  background-color: ${(props) => props.theme.accent};
  padding: 15px 10px;
  border-radius: 5px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.btnFontColor};
  font-weight: 600;
  font-size: 16px;
  text-align: center;
`;

interface IAuthBtnProps {
  disabled: boolean;
  text: string;
  loading: boolean;
  onPress: () => void;
}

const AuthBtn: React.FC<IAuthBtnProps> = ({
  disabled,
  text,
  onPress,
  loading,
}) => {
  return (
    <Button disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
};

export default AuthBtn;

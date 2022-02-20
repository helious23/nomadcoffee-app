import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import { LogInNavStackNavParamList } from "../navTypes";
import { TouchableOpacity } from "react-native";
import AuthLayout from "../components/auth/AuthLayout";
import AuthBtn from "../components/auth/AuthBtn";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

const LoginLink = styled.Text`
  color: ${(props) => props.theme.accent};
  font-weight: 600;
  margin-top: 32px;
  font-size: 16px;
  text-align: center;
`;

const Welcome: React.FC<
  NativeStackScreenProps<LogInNavStackNavParamList, "Welcome">
> = ({ navigation }) => {
  const theme = useTheme();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          onPress={() => navigation.goBack()}
          name="chevron-down-outline"
          color={theme.fontColor}
          size={30}
        />
      ),
    });
  }, []);
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogin = () => navigation.navigate("Login", {});
  return (
    <AuthLayout>
      <AuthBtn
        loading={false}
        disabled={false}
        text="새 계정 만들기"
        onPress={goToCreateAccount}
      />
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>로그인</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
};

export default Welcome;

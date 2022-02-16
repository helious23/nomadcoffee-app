import styled from "styled-components/native";
import { isLoggedInVar, logUserOut } from "../apollo";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ShareStackNavParamList } from "../navTypes";
import { useNavigation } from "@react-navigation/native";
import { useReactiveVar } from "@apollo/client";
import { useMe } from "../hooks/useMe";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

const Me = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const theme = useTheme();
  const navigation = useNavigation();
  const { data } = useMe();
  useEffect(() => {
    if (data?.me) {
      navigation.setOptions({
        headerTitle: data.me.username,
      });
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isLoggedIn ? (
          <Ionicons
            style={{ marginRight: 5 }}
            onPress={() => logUserOut()}
            name="log-out-outline"
            size={28}
            color={theme.fontColor}
          />
        ) : null,
    });
  }, [isLoggedIn]);

  return (
    <Container>
      <Title>Me</Title>
    </Container>
  );
};

export default Me;

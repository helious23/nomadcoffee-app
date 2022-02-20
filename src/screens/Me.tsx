import styled from "styled-components/native";
import { isLoggedInVar, logUserOut } from "../apollo";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { CoffeShopScreenNavigationProp } from "../navTypes";
import { useNavigation } from "@react-navigation/native";
import { useReactiveVar } from "@apollo/client";
import { useMe } from "../hooks/useMe";

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Section = styled.TouchableOpacity`
  padding: 16px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 16px;
`;

const Seperator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.formBgColor};
`;

const Me = () => {
  const navigation = useNavigation<CoffeShopScreenNavigationProp>();
  const { data: userData } = useMe();

  useEffect(() => {
    if (userData?.me) {
      navigation.setOptions({
        headerTitle: userData.me.username,
      });
    }
  }, []);

  const userLogOut = () => {
    logUserOut();
    navigation.navigate("Home");
  };

  const goToProfile = () => {
    if (userData?.me) {
      navigation.navigate("Profile", {
        username: userData?.me?.username,
        id: userData?.me?.id,
      });
    }
  };

  return (
    <Container>
      <Section onPress={goToProfile}>
        <Title>프로필 보기</Title>
      </Section>
      <Seperator />
      <Section onPress={userLogOut}>
        <Title>로그아웃</Title>
      </Section>
      <Seperator />
    </Container>
  );
};

export default Me;

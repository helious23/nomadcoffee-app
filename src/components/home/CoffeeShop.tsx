import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  Reference,
  useMutation,
} from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

import { Dimensions, Image, Text, View } from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import styled, { ThemeConsumer, useTheme } from "styled-components/native";

import {
  CoffeShopScreenNavigationProp,
  ShareStackNavParamList,
} from "../../navTypes";
import Avatar from "../Avatar";
import { useEffect, useState } from "react";
import { seeCoffeeShops_seeCoffeeShops } from "../../__generated__/seeCoffeeShops";
import {
  toggleLike,
  toggleLikeVariables,
} from "../../__generated__/toggleLike";
import { useMe } from "../../hooks/useMe";
import { isLoggedInVar } from "../../apollo";
import CagtegoryItem from "./CategoryItem";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Container = styled.View`
  width: 100%;
  padding-top: 10px;
`;
const Header = styled.View`
  padding: 20px 20px 0 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ShopInfo = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const ShopTitle = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 32px;
  font-weight: 500;
`;

const ShopRating = styled.Text`
  color: ${(props) => props.theme.accent};
  font-size: 20px;
  margin-left: 16px;
`;

const Profile = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Username = styled.Text`
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;

const PhotoContainer = styled.TouchableOpacity`
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

const File = styled.Image`
  border-radius: 10px;
  width: 95%;
  height: 95%;
`;

const IconContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Icon = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  top: 16px;
  justify-content: center;
  align-items: center;
`;

const IconText = styled.Text`
  color: ${(props) => props.theme.accent};
  margin-top: 5px;
`;

const PhotoData = styled.TouchableOpacity`
  padding: 0 20px 20px 20px;
`;

const Address = styled.Text`
  margin-top: 20px;
  color: ${(props) => props.theme.textGrey};
  font-size: 16px;
`;

const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Action = styled.View`
  margin-top: 8px;
  margin-right: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ActionText = styled.Text`
  margin-left: 4px;
  color: ${(props) => props.theme.accent};
`;

const DescriptionContainer = styled.View`
  width: 100%;
  height: 70px;
  margin-top: 10px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const Description = styled.Text`
  margin-top: 10px;
  color: ${(props) => props.theme.textGrey};
  font-size: 24px;
  font-weight: 600;
`;

const Seperator = styled.View`
  margin-top: 16px;
  height: 1.5px;
  background-color: ${(props) => props.theme.formBorderColor};
  border-radius: 5px;
`;

interface ICoffeeShopProps extends seeCoffeeShops_seeCoffeeShops {
  detail: boolean;
}

const CoffeeShop: React.FC<ICoffeeShopProps> = ({
  id,
  name,
  photos,
  categories,
  commentNumber,
  description,
  address,
  likes,
  averageRating,
  isLiked,
  user,
  detail,
}) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");
  const isLoggedIn = isLoggedInVar();
  const { data: userData } = useMe();

  const [imageHeight, setImageHeight] = useState(SCREEN_HEIGHT / 3);

  const navigation = useNavigation<CoffeShopScreenNavigationProp>();

  const goToProfile = () => {
    navigation.navigate("Profile", {
      username: user.username,
      id: user.id,
    });
  };

  const goToDetail = () => {
    navigation.navigate("ShopDetail", { id, name });
  };

  useEffect(() => {
    if (photos && photos[0]) {
      Image.getSize(photos[0]?.url, (width, height) => {
        if (height >= SCREEN_HEIGHT / 3) {
          setImageHeight(SCREEN_HEIGHT / 3);
        } else {
          setImageHeight(height);
        }
      });
    }
    return () => {};
  }, [photos]);

  const updateToggleLike: MutationUpdaterFunction<
    toggleLike,
    toggleLikeVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, result) => {
    if (result.data) {
      const {
        data: {
          toggleLike: { ok },
        },
      } = result;
      if (ok) {
        const cacheShopId = `CoffeeShop:${id}`;
        cache.modify({
          id: cacheShopId,
          fields: {
            isLiked(prev) {
              return !prev;
            },
            likes(prev, { readField }) {
              if (readField("isLiked")) {
                return prev - 1;
              } else {
                return prev + 1;
              }
            },
          },
        });
        if (userData?.me) {
          cache.modify({
            id: `User:${userData.me.id}`,
            fields: {
              likedShops: (prev: Reference[]) => {
                if (prev.some((shop) => shop.__ref === cacheShopId)) {
                  return prev.filter((shop) => shop.__ref !== cacheShopId);
                } else {
                  return [{ __ref: cacheShopId }, ...prev];
                }
              },
            },
          });
        }
      }
    }
  };

  const [toggleLikeMutation, { loading }] = useMutation<
    toggleLike,
    toggleLikeVariables
  >(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });

  return (
    <ThemeConsumer>
      {(theme) => (
        <Container>
          {detail ? null : (
            <Header>
              <ShopInfo onPress={goToDetail}>
                <ShopTitle>{name}</ShopTitle>
                <ShopRating>{averageRating}</ShopRating>
              </ShopInfo>
              <Profile onPress={goToProfile}>
                {user.avatarURL && <Avatar avatar={user.avatarURL} size={25} />}
                <Username>{user.username}</Username>
              </Profile>
            </Header>
          )}

          {photos && (
            <PhotoContainer
              onPress={goToDetail}
              style={{ width: SCREEN_WIDTH, height: imageHeight }}
            >
              <File resizeMode="cover" source={{ uri: photos[0]?.url }} />
              {detail ? null : (
                <Icon
                  onPress={
                    isLoggedIn
                      ? () => toggleLikeMutation()
                      : () => navigation.navigate("LogInNav")
                  }
                >
                  <AntDesign
                    name={isLiked ? "star" : "staro"}
                    color={isLiked ? theme.starColor : "white"}
                    size={40}
                  />
                </Icon>
              )}
            </PhotoContainer>
          )}
          {detail && (
            <Header>
              <ShopInfo as={View}>
                <ShopTitle>{name}</ShopTitle>
                <ShopRating>{averageRating}</ShopRating>
              </ShopInfo>
              <Profile onPress={goToProfile}>
                {user.avatarURL && <Avatar avatar={user.avatarURL} size={25} />}
                <Username>{user.username}</Username>
              </Profile>
            </Header>
          )}

          {detail ? (
            <PhotoData as={View}>
              <Actions>
                <Action>
                  <FontAwesome5
                    name="pencil-alt"
                    size={16}
                    color={theme.accent}
                  />
                  <ActionText>{commentNumber}</ActionText>
                </Action>
                <Action>
                  <AntDesign name="star" size={16} color={theme.accent} />
                  <ActionText>{likes}</ActionText>
                </Action>
              </Actions>
              <DescriptionContainer removeClippedSubviews>
                <Description>{description}</Description>
              </DescriptionContainer>
              <Seperator />
              <IconContainer>
                <Icon
                  style={{ position: "relative" }}
                  onPress={
                    isLoggedIn
                      ? () => toggleLikeMutation()
                      : () => navigation.navigate("LogInNav")
                  }
                >
                  <AntDesign
                    name={isLiked ? "star" : "staro"}
                    color={isLiked ? "#F9D71c" : theme.accent}
                    size={40}
                  />
                  <IconText>가고싶다</IconText>
                </Icon>
                <Icon
                  style={{ position: "relative" }}
                  onPress={
                    isLoggedIn
                      ? () => navigation.navigate("CreatReview", { shopId: id })
                      : () => navigation.navigate("LogInNav")
                  }
                >
                  <FontAwesome5
                    name="pencil-alt"
                    color={theme.accent}
                    size={40}
                  />
                  <IconText>리뷰 쓰기</IconText>
                </Icon>
              </IconContainer>
            </PhotoData>
          ) : (
            <>
              <PhotoData onPress={goToDetail}>
                <Address>{address}</Address>
                <Actions>
                  <Action>
                    <FontAwesome5
                      name="pencil-alt"
                      size={16}
                      color={theme.accent}
                    />
                    <ActionText>{commentNumber}</ActionText>
                  </Action>
                  <Action>
                    <AntDesign name="star" size={16} color={theme.accent} />
                    <ActionText>{likes}</ActionText>
                  </Action>
                </Actions>
                <DescriptionContainer removeClippedSubviews>
                  <Description>{description}</Description>
                </DescriptionContainer>
              </PhotoData>
              <CagtegoryItem categories={categories} />
            </>
          )}
        </Container>
      )}
    </ThemeConsumer>
  );
};

export default CoffeeShop;

import {
  gql,
  useQuery,
  useMutation,
  MutationUpdaterFunction,
  DefaultContext,
  ApolloCache,
} from "@apollo/client";
import * as WebBrowser from "expo-web-browser";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled, { ThemeConsumer } from "styled-components/native";
import { SHOP_FRAGMENT } from "../fragment";
import { ShareStackNavParamList } from "../navTypes";
import { useEffect, useState } from "react";
import { seeProfile, seeProfileVariables } from "../__generated__/seeProfile";
import ScreenLayout from "../components/ScreenLayout";
import Avatar from "../components/Avatar";
import DefaultAvatar from "../components/DefaultAvatar";
import {
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMe } from "../hooks/useMe";
import {
  toggleFollow,
  toggleFollowVariables,
} from "../__generated__/toggleFollow";

const TOGGLE_FOLLOW_USER = gql`
  mutation toggleFollow($id: Int!) {
    toggleFollow(id: $id) {
      ok
    }
  }
`;

const SEE_PROFILE_QUERY = gql`
  query seeProfile($id: Int!, $offset: Int!) {
    seeProfile(id: $id) {
      id
      name
      username
      location
      avatarURL
      githubUsername
      totalShops
      totalFollowing
      totalFollowers
      isFollowing
      isMe
      shops(offset: $offset) {
        ...ShopFragment
      }
    }
  }
  ${SHOP_FRAGMENT}
`;

const Container = styled.View`
  background-color: ${(props) => props.theme.mainBgColor};
  flex: 1;
`;
const Header = styled.View`
  padding: 10px;
`;

const UserSection = styled.View`
  flex-direction: row;
`;

const UserData = styled.View<{ width: number }>`
  width: ${(props) => props.width * 0.7}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Posts = styled.View`
  width: 33%;
  justify-content: center;
  align-items: center;
`;
const TotalPosts = styled.Text`
  color: ${(props) => props.theme.fontColor};
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
`;

const Followers = styled.View`
  width: 33%;
  justify-content: center;
  align-items: center;
`;
const TotalFollowers = styled.Text`
  color: ${(props) => props.theme.fontColor};
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
`;

const Followings = styled.View`
  width: 33%;
  justify-content: center;
  align-items: center;
`;
const TotalFollowing = styled.Text`
  color: ${(props) => props.theme.fontColor};
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
`;

const UserText = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

const ActionContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0;
`;

const BtnContainer = styled.View`
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.accent};
  background-color: ${(props) => props.theme.accent};
  padding: 8px 16px;
`;

const BtnText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 16px;
  font-weight: 500;
`;

const GithubContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const GithubUsername = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 16px;
  margin-left: 8px;
`;

const PhotoSection = styled.View``;

const Profile: React.FC<
  NativeStackScreenProps<ShareStackNavParamList, "Profile">
> = ({ route: { params }, navigation }) => {
  const numColums = 4;
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);
  const { data: userData } = useMe();

  const updateToggleFollow: MutationUpdaterFunction<
    toggleFollow,
    toggleFollowVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, result) => {
    if (result.data) {
      const {
        data: {
          toggleFollow: { ok },
        },
      } = result;
      if (!ok) {
        return;
      } else {
        cache.modify({
          id: `User:${params.id}`,
          fields: {
            isFollowing(prev) {
              return !prev;
            },
            totalFollowers(prev, { readField }) {
              if (readField("isFollowing")) {
                if (userData?.me) {
                  const { me } = userData;
                  cache.modify({
                    id: `User:${me.id}`,
                    fields: {
                      totalFollowing(prev) {
                        return prev - 1;
                      },
                    },
                  });
                }
                return prev - 1;
              } else {
                if (userData?.me) {
                  const { me } = userData;
                  cache.modify({
                    id: `User:${me.id}`,
                    fields: {
                      totalFollowing(prev) {
                        return prev + 1;
                      },
                    },
                  });
                }
                return prev + 1;
              }
            },
          },
        });
      }
    }
  };

  const [toggleFollowMutation] = useMutation<
    toggleFollow,
    toggleFollowVariables
  >(TOGGLE_FOLLOW_USER, {
    variables: {
      id: params.id,
    },
    update: updateToggleFollow,
  });

  const { data, loading, refetch, fetchMore } = useQuery<
    seeProfile,
    seeProfileVariables
  >(SEE_PROFILE_QUERY, {
    variables: {
      id: params.id,
      offset: 0,
    },
    skip: !params.id,
  });

  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.username) {
      navigation.setOptions({
        headerTitle: params.username,
      });
    }
  }, [params.username]);

  const openGithubLink = async (githubUsername: string | null | undefined) => {
    const baseUrl = `https://github.com/${githubUsername}`;
    // await Linking.openURL(baseUrl);
    await WebBrowser.openBrowserAsync(baseUrl);
  };

  return (
    <ThemeConsumer>
      {(theme) => (
        <ScreenLayout loading={loading}>
          <Container>
            <PhotoSection>
              <FlatList
                ListHeaderComponent={
                  <Header>
                    <UserSection>
                      {data?.seeProfile?.avatarURL ? (
                        <Avatar avatar={data?.seeProfile.avatarURL} size={80} />
                      ) : (
                        <DefaultAvatar size={70} />
                      )}
                      <UserData width={SCREEN_WIDTH}>
                        <Posts>
                          <TotalPosts>
                            {data?.seeProfile?.totalShops}
                          </TotalPosts>
                          <UserText>등록 카페</UserText>
                        </Posts>
                        <Followers>
                          <TotalFollowers>
                            {data?.seeProfile?.totalFollowers}
                          </TotalFollowers>
                          <UserText>팔로워</UserText>
                        </Followers>
                        <Followings>
                          <TotalFollowing>
                            {data?.seeProfile?.totalFollowing}
                          </TotalFollowing>
                          <UserText>팔로잉</UserText>
                        </Followings>
                      </UserData>
                    </UserSection>
                    <ActionContainer>
                      {data?.seeProfile?.isMe ? (
                        <BtnContainer>
                          <Button
                            onPress={() => navigation.navigate("EditProfile")}
                          >
                            <BtnText>프로필 수정</BtnText>
                          </Button>
                        </BtnContainer>
                      ) : (
                        <BtnContainer>
                          <Button onPress={() => toggleFollowMutation()}>
                            {data?.seeProfile?.isFollowing ? (
                              <BtnText>언팔로우</BtnText>
                            ) : (
                              <BtnText>팔로우</BtnText>
                            )}
                          </Button>
                        </BtnContainer>
                      )}
                      {data?.seeProfile?.githubUsername ? (
                        <GithubContainer
                          onPress={() =>
                            openGithubLink(data.seeProfile?.githubUsername)
                          }
                        >
                          <Ionicons
                            name="logo-github"
                            size={24}
                            color={theme.fontColor}
                          />
                          <GithubUsername>
                            {data.seeProfile.githubUsername}
                          </GithubUsername>
                        </GithubContainer>
                      ) : null}
                    </ActionContainer>
                  </Header>
                }
                style={{ marginTop: 20 }}
                refreshing={refreshing}
                onRefresh={refresh}
                numColumns={numColums}
                data={data?.seeProfile?.shops}
                keyExtractor={(shop) => shop?.slug + ""}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.02}
                onEndReached={async () =>
                  await fetchMore({
                    variables: {
                      offset: data?.seeProfile?.shops?.length,
                    },
                  })
                }
                renderItem={({ item: shop }) =>
                  shop && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ShopDetail", {
                          id: shop.id,
                          name: shop.name,
                        })
                      }
                    >
                      {shop.photos && (
                        <Image
                          source={{ uri: shop.photos[0]?.url }}
                          style={{
                            width: SCREEN_WIDTH / numColums,
                            height: SCREEN_HEIGHT / 8,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  )
                }
              />
            </PhotoSection>
          </Container>
        </ScreenLayout>
      )}
    </ThemeConsumer>
  );
};

export default Profile;

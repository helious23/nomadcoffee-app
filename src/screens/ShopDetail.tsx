import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled, { useTheme } from "styled-components/native";
import { ShareStackNavParamList, ShopDetailScreenProp } from "../navTypes";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { SHOP_DETAIL_FRAGMENT } from "../fragment";
import ScreenLayout from "../components/ScreenLayout";
import {
  seeCoffeeShop,
  seeCoffeeShopVariables,
} from "../__generated__/seeCoffeeShop";
import { RefreshControl, ScrollView } from "react-native";
import CoffeeShop from "../components/home/CoffeeShop";
import CagtegoryItem from "../components/home/CategoryItem";
import Comment from "../components/home/Comments";
import { isLoggedInVar } from "../apollo";

export const SEE_COFFEE_SHOP_QUERY = gql`
  query seeCoffeeShop($id: Int!, $lastId: Int) {
    seeCoffeeShop(id: $id) {
      ...ShopDetailFragment
      comments(lastId: $lastId) {
        id
        user {
          id
          username
          avatarURL
        }
        payload
        rating
        isMine
        createdAt
      }
    }
  }
  ${SHOP_DETAIL_FRAGMENT}
`;

const Seperator = styled.View`
  width: 100%;
  height: 12px;
  margin: 20px 0;
  background-color: ${(props) => props.theme.detailBgColor};
`;

const Address = styled.Text`
  padding: 0 20px;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.fontColor};
`;

const Map = styled.View`
  margin-top: 16px;
  height: 300px;
  background-color: skyblue;
`;

const CategoryContainer = styled.View``;

const CategoryTitle = styled.Text`
  padding: 0 20px;
  color: ${(props) => props.theme.fontColor};
  margin-bottom: 16px;
`;

const CommentContainer = styled.View`
  margin-top: 20px;
  background-color: ${(props) => props.theme.detailBgColor};
  padding: 16px 8px;
`;

const CommentTitle = styled.Text`
  width: 100%;
  text-align: center;
  padding: 10px 0 20px 0;
  font-size: 20px;
  color: ${(props) => props.theme.accent};
  font-weight: 400;
`;

const NoReview = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.mainBgColor};
  border-radius: 10px;
  padding: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ReviewPlz = styled.Text`
  color: ${(props) => props.theme.accent};
  margin-left: 8px;
`;

const ShopDetail: React.FC<ShopDetailScreenProp> = ({
  route: { params },
  navigation,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme();
  const isLoggedIn = isLoggedInVar();
  useEffect(() => {
    if (params?.name) {
      navigation.setOptions({
        headerTitle: params.name,
      });
    }
  }, [params]);

  const { data, loading, refetch } = useQuery<
    seeCoffeeShop,
    seeCoffeeShopVariables
  >(SEE_COFFEE_SHOP_QUERY, {
    variables: {
      id: params?.id,
    },
    skip: !params?.id,
  });

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        {data?.seeCoffeeShop && (
          <>
            <CoffeeShop
              {...data.seeCoffeeShop}
              detail={true}
              key={data.seeCoffeeShop.slug}
            />
            <Seperator style={{ marginTop: 30 }} />
            <Address>{data.seeCoffeeShop.address}</Address>
            <Map></Map>
            <Seperator />
            <CategoryContainer>
              <CategoryTitle>카테고리</CategoryTitle>
              <CagtegoryItem categories={data.seeCoffeeShop.categories} />
            </CategoryContainer>
            <CommentContainer>
              <CommentTitle>
                주요 리뷰 ({data.seeCoffeeShop.commentNumber})
              </CommentTitle>
              {data.seeCoffeeShop.commentNumber > 0 ? (
                data.seeCoffeeShop.comments?.map(
                  (comment) =>
                    comment && <Comment comment={comment} key={comment.id} />
                )
              ) : (
                <NoReview
                  onPress={
                    isLoggedIn
                      ? () =>
                          navigation.navigate("CreatReview", {
                            shopId: data.seeCoffeeShop?.id!,
                          })
                      : () => navigation.navigate("LogInNav")
                  }
                >
                  <Ionicons
                    name="chatbubbles-outline"
                    size={24}
                    color={theme.accent}
                  />
                  <ReviewPlz>첫번째 리뷰의 주인공이 되어주세요!</ReviewPlz>
                </NoReview>
              )}
            </CommentContainer>
          </>
        )}
      </ScrollView>
    </ScreenLayout>
  );
};

export default ShopDetail;

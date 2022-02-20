import { gql, useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import CoffeeShop from "../components/home/CoffeeShop";
import ScreenLayout from "../components/ScreenLayout";
import { SHOP_DETAIL_FRAGMENT } from "../fragment";
import { ShareStackNavParamList } from "../navTypes";
import { isLoggedInVar } from "../apollo";
import {
  seeCoffeeShops,
  seeCoffeeShopsVariables,
} from "../__generated__/seeCoffeeShops";

export const SEE_COFFEE_SHOPS_QUERY = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
      ...ShopDetailFragment
    }
  }
  ${SHOP_DETAIL_FRAGMENT}
`;

const HorizontalSeparator = styled.View`
  /* height: 16px; */
`;

const Home: React.FC<NativeStackScreenProps<ShareStackNavParamList, "Home">> =
  () => {
    const isLoggedIn = isLoggedInVar();
    const [refreshing, setRefreshing] = useState(false);
    const { data, loading, fetchMore, refetch } = useQuery<
      seeCoffeeShops,
      seeCoffeeShopsVariables
    >(SEE_COFFEE_SHOPS_QUERY, {
      variables: {
        offset: 0,
      },
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
      if (isLoggedIn) refetch();
    }, [isLoggedIn]);

    return (
      <ScreenLayout loading={loading}>
        <FlatList
          refreshing={refreshing}
          onRefresh={refresh}
          onEndReachedThreshold={1}
          onEndReached={async () =>
            await fetchMore({
              variables: {
                offset: data?.seeCoffeeShops?.length,
              },
            })
          }
          ItemSeparatorComponent={HorizontalSeparator}
          data={data?.seeCoffeeShops}
          showsVerticalScrollIndicator={false}
          keyExtractor={(shop) => shop?.slug + ""}
          renderItem={({ item: shop }) =>
            shop && <CoffeeShop {...shop} detail={false} />
          }
        />
      </ScreenLayout>
    );
  };

export default Home;

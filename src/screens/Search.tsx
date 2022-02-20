import {
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import styled, { useTheme } from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ShareStackNavParamList } from "../navTypes";
import { useEffect, useState } from "react";
import DismissKeyboard from "../components/DismissKeyboard";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { gql, useLazyQuery } from "@apollo/client";
import {
  searchShops,
  searchShopsVariables,
} from "../__generated__/searchShops";

const SEARCH_SHOPS_QUERY = gql`
  query searchShops($keyword: String!, $lastId: Int) {
    searchShops(keyword: $keyword, lastId: $lastId) {
      id
      name
      photos {
        id
        url
      }
    }
  }
`;

const SearchInput = styled.TextInput<{ width: number }>`
  background-color: ${(props) => props.theme.formBgColor};
  border: 1px solid ${(props) => props.theme.formBorderColor};
  color: ${(props) => props.theme.fontColor};
  width: ${(props) => props.width / 1.1}px;
  padding: 10px 10px;
  border-radius: 5px;
  z-index: 10;
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-weight: 600;
  margin-top: 15px;
`;

interface ISearhFormProps {
  keyword: string;
  page: number;
}

const Search: React.FC<
  NativeStackScreenProps<ShareStackNavParamList, "Search">
> = ({ navigation }) => {
  const numColums = 4;
  const [refreshing, setRefreshing] = useState(false);

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("screen");

  const { control, handleSubmit } = useForm<ISearhFormProps>();

  const [searchPhotos, { data, loading, called, refetch, fetchMore }] =
    useLazyQuery<searchShops, searchShopsVariables>(SEARCH_SHOPS_QUERY);

  const onValid: SubmitHandler<ISearhFormProps> = ({ keyword }) => {
    searchPhotos({
      variables: {
        keyword,
      },
    });
  };

  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const theme = useTheme();

  const SearchBox = () => (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onBlur, onChange, value } }) => (
        <SearchInput
          width={SCREEN_WIDTH}
          onBlur={onBlur}
          blurOnSubmit={false}
          onChangeText={onChange}
          value={value}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="카페 이름, 지역, 카테고리를 검색하세요"
          placeholderTextColor={theme.fontColor}
          returnKeyLabel="Search"
          returnKeyType="search"
          onSubmitEditing={handleSubmit(onValid)}
        />
      )}
      name="keyword"
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
  }, []);

  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: theme.mainBgColor }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>검색 중...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>검색어를 입력하세요</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchShops?.length === 0 ? (
          <MessageContainer>
            <MessageText>결과를 찾을 수 없습니다.</MessageText>
          </MessageContainer>
        ) : (
          <FlatList
            style={{ marginTop: 20 }}
            refreshing={refreshing}
            onRefresh={refresh}
            numColumns={numColums}
            data={data?.searchShops}
            keyExtractor={(photo) => photo?.id + ""}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={1}
            onEndReached={() =>
              fetchMore({
                variables: {
                  lastId:
                    data?.searchShops &&
                    data.searchShops[data.searchShops.length - 1]?.id,
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
        )}
      </View>
    </DismissKeyboard>
  );
};

export default Search;

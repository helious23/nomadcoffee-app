import {
  CompositeNavigationProp,
  CompositeScreenProps,
} from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type RootNavParamList = {
  TabsNav: undefined;
  LogInNav: undefined;
  UploadNav: undefined;
  UploadForm: { file: string };
};

export type LoggedInNavParamList = {
  TabsNav: undefined;
  UploadNav: undefined;
  UploadForm: { file: string };
};

export type LoggedOutNavParamList = {
  TabsNav: undefined;
  LogInNav: undefined;
};

export type TabsNavParamList = {
  TabHome: undefined;
  TabSearch: undefined;
  Camera: undefined;
  TabWishLists: undefined;
  TabMe: undefined;
};

export type ShareStackNavParamList = {
  Home: undefined;
  Search: undefined;
  WishLists: undefined;
  Me: undefined;
  Profile: {
    username: string;
    id: number;
  };
  ShopDetail: {
    id: number;
    name: string;
  };
  Likes: { shopId: number };
  Comments: undefined;
  Category: { categorySlug: string };
  CreatReview: { shopId: number };
  EditProfile: undefined;
};

export type LogInNavStackNavParamList = {
  Welcome: undefined;
  Login: {
    username?: string;
    password?: string;
    message?: string;
  };
  CreateAccount: undefined;
};

export type CoffeShopScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNavParamList, "LogInNav">,
  NativeStackNavigationProp<ShareStackNavParamList>
>;

export type LoginScreenNavigationProp = CompositeScreenProps<
  NativeStackScreenProps<LogInNavStackNavParamList, "Login">,
  NativeStackScreenProps<ShareStackNavParamList>
>;

export type ShopDetailScreenProp = CompositeScreenProps<
  NativeStackScreenProps<ShareStackNavParamList, "ShopDetail">,
  NativeStackScreenProps<RootNavParamList>
>;

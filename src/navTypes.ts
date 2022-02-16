export type LoggedOutNavParamList = {
  TabsNav: undefined;
};
export type RootNavParamList = {
  TabsNav: undefined;
  LogInNav: undefined;
};

export type LoggedInNavParamList = {
  TabsNav: undefined;
  UploadNav: undefined;
  UploadForm: { file: string };
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
  PhotoDetail: {
    id: number;
  };
  Likes: { photoId: number };
  Comments: undefined;
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

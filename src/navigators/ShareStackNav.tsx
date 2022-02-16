import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, useColorScheme } from "react-native";
import { ThemeConsumer } from "styled-components/native";
import { ShareStackNavParamList } from "../navTypes";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import WishLists from "../screens/WishLists";
import ShopDetail from "../screens/ShopDetail";
import { isLoggedInVar } from "../apollo";
import LogInNav from "./LogInNav";
import Me from "../screens/Me";

const Stack = createNativeStackNavigator<ShareStackNavParamList>();

interface IShareStackNavProps {
  screenName: string;
}

const ShareStackNav: React.FC<IShareStackNavProps> = ({ screenName }) => {
  const isDark = useColorScheme() === "dark";
  const isLoggedIn = isLoggedInVar();

  return (
    <ThemeConsumer>
      {(theme) => (
        <Stack.Navigator
          screenOptions={{
            headerTintColor: theme.fontColor,
            headerStyle: {
              backgroundColor: theme.mainBgColor,
            },
            headerBackTitleVisible: false,
          }}
        >
          {screenName === "Home" ? (
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: () => (
                  <Image
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      maxHeight: 30,
                    }}
                    resizeMode="contain"
                    source={
                      isDark
                        ? require("../assets/logo_white.png")
                        : require("../assets/logo_black.png")
                    }
                  />
                ),
              }}
            />
          ) : null}
          {screenName === "Search" ? (
            <Stack.Screen name="Search" component={Search} />
          ) : null}
          {screenName === "WishLists" ? (
            <Stack.Screen name="WishLists" component={WishLists} />
          ) : null}
          {screenName === "Me" ? (
            <Stack.Screen
              name="Me"
              options={{
                headerShown: isLoggedIn ? true : false,
              }}
            >
              {isLoggedIn ? () => <Me /> : () => <LogInNav />}
            </Stack.Screen>
          ) : null}
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="PhotoDetail" component={ShopDetail} />
        </Stack.Navigator>
      )}
    </ThemeConsumer>
  );
};

export default ShareStackNav;

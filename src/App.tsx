import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { useState } from "react";
import AppLoading from "expo-app-loading";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { client, isLoggedInVar, TOKEN, tokenVar } from "./apollo";
import { NavigationContainer } from "@react-navigation/native";
import { darkTheme, lightTheme } from "./theme";
import { ThemeProvider } from "styled-components/native";
import LoggedOutNav from "./navigators/LoggedOutNav";
import LoggedInNav from "./navigators/LoggedInNav";
import { Provider as PaperProvider } from "react-native-paper";
import RootNav from "./navigators/RootNav";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => {
    setLoading(false);
  };
  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [
      require("./assets/logo_black.png"),
      require("./assets/logo_white.png"),
    ];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };

  const preload = async () => {
    const token = await AsyncStorage.getItem(TOKEN);
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    preloadAssets();
  };

  const isDark = useColorScheme() === "dark";

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <PaperProvider>
          <NavigationContainer>
            <RootNav />
            <StatusBar style="auto" />
          </NavigationContainer>
        </PaperProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

registerRootComponent(App);

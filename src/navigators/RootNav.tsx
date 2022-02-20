import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeConsumer } from "styled-components/native";
import { RootNavParamList } from "../navTypes";
import LogInNav from "./LogInNav";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";

const Stack = createNativeStackNavigator<RootNavParamList>();

const RootNav = () => {
  return (
    <ThemeConsumer>
      {(theme) => (
        <Stack.Navigator
          screenOptions={{
            headerTitle: () => false,
            headerStyle: { backgroundColor: theme.mainBgColor },
            headerShadowVisible: false,
            headerTintColor: theme.fontColor,
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen
            name="TabsNav"
            component={TabsNav}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            options={{
              presentation: "fullScreenModal",
              headerShown: false,
            }}
            name="LogInNav"
            component={LogInNav}
          />

          <Stack.Screen
            name="UploadNav"
            component={UploadNav}
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
      )}
    </ThemeConsumer>
  );
};

export default RootNav;

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ThemeConsumer } from "styled-components/native";
import { LoggedOutNavParamList } from "../navTypes";
import CreateAccount from "../screens/CreateAccount";
import Login from "../screens/Login";
import Welcome from "../screens/Welcome";
import LogInNav from "./LogInNav";
import TabsNav from "./TabsNav";

const Stack = createNativeStackNavigator<LoggedOutNavParamList>();

const LoggedOutNav = () => {
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
          <Stack.Screen name="LogInNav" component={LogInNav} />
        </Stack.Navigator>
      )}
    </ThemeConsumer>
  );
};

export default LoggedOutNav;

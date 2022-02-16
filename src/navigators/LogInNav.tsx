import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/Welcome";
import CreateAccount from "../screens/CreateAccount";
import Login from "../screens/Login";
import { ThemeConsumer } from "styled-components/native";
import { LogInNavStackNavParamList } from "../navTypes";

const Stack = createNativeStackNavigator<LogInNavStackNavParamList>();

const LogInNav: React.FC = () => {
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
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </ThemeConsumer>
  );
};

export default LogInNav;

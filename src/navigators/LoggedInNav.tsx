import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoggedInNavParamList } from "../navTypes";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";

const Stack = createNativeStackNavigator<LoggedInNavParamList>();
const LoggedInNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "fullScreenModal",
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
        name="UploadNav"
        component={UploadNav}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default LoggedInNav;

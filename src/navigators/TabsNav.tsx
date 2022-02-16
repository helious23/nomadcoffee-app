import { View } from "react-native";
import { TabsNavParamList } from "../navTypes";
import { useMe } from "../hooks/useMe";
import { ThemeConsumer } from "styled-components/native";
import TabIcon from "../components/nav/TabIcons";
import ShareStackNav from "./ShareStackNav";
import Avatar from "../components/Avatar";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tabs = createMaterialBottomTabNavigator<TabsNavParamList>();

const TabsNav = () => {
  const { data } = useMe();

  const size = 26;
  return (
    <ThemeConsumer>
      {(theme) => (
        <Tabs.Navigator
          activeColor={theme.tabBarBtnColor}
          labeled={false}
          inactiveColor={theme.tabBarBorderColor}
          barStyle={{
            backgroundColor: theme.mainBgColor,
            borderTopWidth: 1,
            borderTopColor: theme.formBgColor,
          }}
        >
          <Tabs.Screen
            name="TabHome"
            options={{
              tabBarColor: theme.tabBarFeedBgColor,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  color={color}
                  focused={focused}
                  size={size}
                  iconName="home"
                  focusedIconName="home-outline"
                />
              ),
            }}
          >
            {() => <ShareStackNav screenName="Home" />}
          </Tabs.Screen>
          <Tabs.Screen
            name="TabSearch"
            options={{
              tabBarColor: theme.tabBarSearchBgColor,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  color={color}
                  focused={focused}
                  size={size}
                  iconName="search"
                  focusedIconName="search-outline"
                />
              ),
            }}
          >
            {() => <ShareStackNav screenName="Search" />}
          </Tabs.Screen>
          <Tabs.Screen
            name="Camera"
            component={View}
            listeners={({ navigation }) => {
              return {
                tabPress: (event) => {
                  event.preventDefault();
                  navigation.navigate("UploadNav");
                },
              };
            }}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  color={color}
                  focused={focused}
                  size={size}
                  iconName="camera"
                  focusedIconName="camera-outline"
                />
              ),
            }}
          />
          <Tabs.Screen
            name="TabWishLists"
            options={{
              tabBarColor: theme.tabBarWishListsBgColor,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  color={color}
                  focused={focused}
                  size={size}
                  iconName="star"
                  focusedIconName="star-outline"
                />
              ),
            }}
          >
            {() => <ShareStackNav screenName="WishLists" />}
          </Tabs.Screen>
          <Tabs.Screen
            name="TabMe"
            options={{
              tabBarColor: theme.tabBarProfileBgColor,
              tabBarIcon: ({ color, focused }) =>
                data?.me?.avatarURL ? (
                  <Avatar
                    avatar={data.me.avatarURL}
                    size={30}
                    focused={focused}
                  />
                ) : (
                  <TabIcon
                    color={color}
                    focused={focused}
                    size={size}
                    iconName="person"
                    focusedIconName="person-outline"
                  />
                ),
            }}
          >
            {() => <ShareStackNav screenName="Me" />}
          </Tabs.Screen>
        </Tabs.Navigator>
      )}
    </ThemeConsumer>
  );
};

export default TabsNav;

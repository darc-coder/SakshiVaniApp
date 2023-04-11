import React, { useContext, useState } from "react";
import { CommonActions, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import SongScreen from "../screens/SongScreen";
import SettingScreen from "../screens/SettingScreen";

import { HomeStackScreen } from "./HomeStackScreen";
import { IndexContext } from "../context";

const Tab = createBottomTabNavigator();

const renderScene = {
  Home: HomeStackScreen,
  Song: SongScreen,
  Settings: SettingScreen,
};

const tabBarIconGen = (
  focusedIcon = "",
  unfocusedIcon = "",
  focused = false,
  color = "",
  size = 0
) => {
  if (focused && focusedIcon)
    return <Icon name={focusedIcon} size={size} color={color} />;
  else if (!focused && unfocusedIcon)
    return <Icon name={unfocusedIcon} size={size} color={color} />;
  else return <Icon name="unknown" size={size} color={color} />;
};

const BottomNavigationComponent = () => {
  const { index, setIndex } = useContext(IndexContext);
  const Theme = useTheme();

  const [routes] = React.useState([
    {
      key: "Home",
      name: "Home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "Song",
      name: "Song",
      title: "Song",
      focusedIcon: "music-note",
      unfocusedIcon: "music-note-outline",
    },
    {
      key: "Settings",
      name: "Settings",
      title: "Settings",
      focusedIcon: "cog",
      unfocusedIcon: "cog-outline",
    },
  ]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        sceneContainerStyle={{ backgroundColor: Theme.colors.background }}
        screenOptions={{
          headerShown: false,
          lazy: false,
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const index = routes.findIndex((r) => r.name === route.name);
              if (index !== 1) setIndex(index);

              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }

              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                    ? options.title
                    : route.name;

              return label;
            }}
            shifting={true}
          />
        )}
      >
        {routes.map((route, index) => (
          <Tab.Screen
            key={route.key}
            name={route.name}
            component={renderScene[route.name]}
            options={{
              tabBarLabel: route.title,
              tabBarIcon: ({ focused, color, size }) =>
                tabBarIconGen(
                  route.focusedIcon,
                  route.unfocusedIcon,
                  focused,
                  color,
                  size
                ),
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigationComponent;

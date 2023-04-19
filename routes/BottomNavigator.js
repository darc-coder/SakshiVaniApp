import React, { useContext, useState, useEffect } from "react";
import { BackHandler } from "react-native";
import { CommonActions, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import SongScreen from "../screens/SongScreen";
import SettingScreen from "../screens/SettingScreen";

import { HomeStackScreen } from "./HomeStackScreen";
import { IndexContext, RouteContext } from "../context";

const Tab = createBottomTabNavigator();

const renderScene = BottomNavigation.SceneMap({
    Home: HomeStackScreen,
    Song: SongScreen,
    Settings: SettingScreen,
});

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
    const [stack, setStack] = useState(new Set());

    React.useEffect(() => {
        const backAction = () => {
            const arrStack = Array.from(stack);

            if (index === 0 && arrStack.length === 0)
                BackHandler.exitApp();
            else if (arrStack.length !== 0 && arrStack.pop() !== undefined)
                setIndex(arrStack.pop() || 0), setStack(new Set(arrStack));
            else setIndex(0)

            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return backHandler.remove;
    }, [index, stack]);

    const [routes, setRoutes] = useState([
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
          <RouteContext.Provider value={{routes, setRoutes}}>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={(_i) => {
                    setIndex(_i);
                    setStack(stack => stack.add(_i));
                }}
                renderScene={renderScene}
                shifting={true}
                sceneAnimationEnabled={true}
                sceneAnimationType={'shifting'}
            />
          </RouteContext.Provider>
        </NavigationContainer >
    );
};

export default BottomNavigationComponent;

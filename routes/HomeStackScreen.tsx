import React, { useState, useContext } from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import Home from "../screens/Home";
import SongScreen from "../screens/SongScreen";
import SongSearch from "../screens/SongSearch";
import SongCategory from "../screens/SongCategory";
import { HintColorContext } from "../context";
import * as Animatable from "react-native-animatable";
import { useTheme } from "react-native-paper";

const Stack = createStackNavigator();

export function HomeStackScreen({ navigation }) {
  const statusBarColor = useContext(HintColorContext);
  const animateRef = React.useRef(Animatable.View);
  const Theme = useTheme();
  const [animate, setAnimate] = useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
       animateRef.current && !animate && animateRef.current.fadeIn!();
      animateRef.current && animate && animateRef.current.slideInLeft!();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, animate]);

  React.useEffect(() => {
    setAnimate(true);
  }, [])

  return (
    <Animatable.View
      ref={animateRef}
      style={{ flex: 1 }}
      transition={"opacity"}
      easing="ease-out-quint"
      duration={350}
    >
      <Stack.Navigator
        initialRouteName="HomePage"
        screenOptions={{
          gestureDirection: "horizontal",
          headerStyle: {
            backgroundColor: Theme.colors.tertiary,
          },
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "400",
          },
          transitionSpec: {
            open: {
              animation: "spring",
              config: {
                stiffness: 1000,
                damping: 350,
              },
            },
            close: {
              animation: "spring",
              config: {},
            },
          },
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen
          name="HomePage"
          component={Home}
          options={{ title: "Sakshi Vani" }}
        />
        <Stack.Screen
          name="SongSearch"
          options={{ title: "Search Song" }}
          component={SongSearch}
        />
        <Stack.Screen name="Songs" component={SongScreen} />
        <Stack.Screen
          name="SongCategory"
          options={{ title: "Song Categories" }}
          component={SongCategory}
        />
      </Stack.Navigator>
    </Animatable.View>
  );
}

/**
 * Nitz React Native Sakshi Vani App
 *
 * @format
 */

import "react-native-gesture-handler";
import React, { ReactNode, useContext } from "react";
import { StatusBar, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider, configureFonts } from "react-native-paper";
import Theme from "./theme";
import HomeStack from "./routes/HomeStack";
import Context, { HintColorContext, ThemeContext } from "./context";
import { useFonts } from "expo-font";

const App = () => {
  return (
    <SafeAreaProvider>
      <Context>
        <StatusBarComponent />
        <PaperThemeProvider />
      </Context>
    </SafeAreaProvider>
  );
};

const StatusBarComponent = () => {
  const statusBarColor = useContext(HintColorContext);
  return (
    <StatusBar
      backgroundColor={statusBarColor}
      barStyle="default"
      animated={true}
    />
  );
};

const PaperThemeProvider = () => {
  const { darkTheme: darkMode } = useContext(ThemeContext);

  let [fontsLoaded] = useFonts({
    Poppins: require("./assets/Poppins.ttf"),
  });

  const fontConfig = {
    web: {
      regular: {
        fontFamily: "sans-serif",
        fontWeight: "normal",
      },
    },
    ios: {
      regular: {
        fontFamily: "Poppins",
        fontWeight: "normal",
      },
      light: {
        fontFamily: "sans-serif-light",
        fontWeight: "normal",
      },
    },
    android: {
      regular: {
        fontFamily: "Poppins",
        fontWeight: "normal",
      },
      light: {
        fontFamily: "sans-serif-light",
        fontWeight: "normal",
      },
    },
  };

  const defaultTheme = {
    roundness: 20,
    fonts: configureFonts(fontConfig),
  };

  if (!fontsLoaded) return null;
  else
    return (
      <PaperProvider
        theme={
          darkMode
            ? { ...Theme.dark, ...defaultTheme, dark: darkMode }
            : { ...Theme.light, ...defaultTheme, dark: darkMode }
        }
      >
        <HomeStack />
      </PaperProvider>
    );
};

export default App;

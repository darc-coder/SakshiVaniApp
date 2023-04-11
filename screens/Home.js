import React, { useState, useContext, useCallback } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import * as ScreenOrientation from "expo-screen-orientation";
import { useTheme, Button } from "react-native-paper";
import HindiKeyBoard from "../components/HindiKeyBoard";
import SearchBarComponent from "../components/searchBar";

const windowHeight = Dimensions.get("window").height;

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default Home = ({ navigation }) => {
  const [searchKey, setSearchKey] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [listenerExist, setListenerExist] = useState(false);
  const Theme = useTheme();

  if (!listenerExist) {
    ScreenOrientation.addOrientationChangeListener(({ orientationInfo }) => {
      console.log(orientationInfo.orientation);
    });
    setListenerExist(true);
  }

  // ScreenOrientation.removeOrientationChangeListeners()

  let [fontsLoaded] = useFonts({
    Walkman: require("../assets/WalkmanChanakya.ttf"),
    Poppins: require("../assets/Poppins.ttf"),
  });

  (async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  })();

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View
        style={{ height: "100%", backgroundColor: Theme.colors.background }}
      >
        <View
          style={[
            styles.container,
            windowHeight > 800 ? { paddingTop: 30 } : { paddingTop: 0 },
            { backgroundColor: Theme.colors.background },
            { flex: 0.4 },
          ]}
        >
          <SearchBarComponent
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />

          <Button
            style={styles.searchBtn}
            icon="music-note-outline"
            mode="contained-tonal"
            onPress={() =>
              navigation.navigate("SongSearch", { searchKey: searchKey })
            }
          >
            SEARCH SONG
          </Button>

          <Button
            style={styles.searchBtn}
            icon="book-music"
            mode="contained"
            onPress={() => navigation.navigate("SongCategory")}
          >
            SEARCH BY CATEGORY
          </Button>

          <TouchableOpacity
            style={[
              styles.keyBoardBtn,
              windowHeight > 900 ? { marginTop: 40 } : { marginTop: 0 },
            ]}
            onPress={() => setShowKeyboard(!showKeyboard)}
          >
            <MaterialIcons name="keyboard" size={40} color="white" />
          </TouchableOpacity>
        </View>
        <View
          style={[
            showKeyboard ? styles.keyBoardContainer : styles.keyBoardHide,
            { backgroundColor: Theme.colors.outlineVariant },
          ]}
        >
          <Text style={showKeyboard ? { marginLeft: 10 } : { height: 0 }}>
            {" "}
          </Text>
          {/* Keyboard goes here */}
          <HindiKeyBoard setSearchKey={setSearchKey} searchKey={searchKey} />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  searchBtn: {
    marginTop: 6,
    alignSelf: "center",
    borderRadius: 48,
    width: 200,
    paddingVertical: 2,
    elevation: 2,
  },
  keyBoardBtn: {
    alignSelf: "flex-end",
    marginTop: 50,
    marginBottom: 10,
    width: 50,
    height: 50,
    padding: 4,
    backgroundColor: "#777",
    borderRadius: 50,
    elevation: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  keyBoardContainer: {
    position: "relative",
    bottom: 0,
    left: 0,
    flex: 0.6,
    justifyContent: "space-evenly",
    marginHorizontal: -27,
    padding: -50,
    backgroundColor: "#eee",
  },
  keyBoardHide: {
    flex: 0,
    height: 0,
    overflow: "hidden",
  },
});

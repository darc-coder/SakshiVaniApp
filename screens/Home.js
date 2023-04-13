import React, { useState, useCallback } from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useTheme, Button } from 'react-native-paper';
import HindiKeyBoard from '../components/HindiKeyBoard';
import SearchBarComponent from '../components/searchBar';

const windowHeight = Dimensions.get('window').height;

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default Home = ({ navigation }) => {
  const [searchKey, setSearchKey] = useState('');
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
    Walkman: require('../assets/WalkmanChanakya.ttf'),
    Poppins: require('../assets/Poppins.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  onLayoutRootView();

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={[styles.container, { height: '100%', backgroundColor: Theme.colors.background }]}>
        <View
          style={[
            { paddingHorizontal: 30 },
            windowHeight > 800 ? { paddingTop: 30 } : { paddingTop: 0 },
            { backgroundColor: Theme.colors.background },
          ]}
        >
          <SearchBarComponent searchKey={searchKey} setSearchKey={setSearchKey} />

          <Button
            style={styles.searchBtn}
            icon="music-note-outline"
            mode="contained-tonal"
            onPress={() => navigation.navigate('SongSearch', { searchKey: searchKey })}
          >
            SEARCH SONG
          </Button>

          <Button
            style={styles.searchBtn}
            icon="book-music"
            mode="contained"
            onPress={() => navigation.navigate('SongCategory')}
          >
            SEARCH BY CATEGORY
          </Button>

          <TouchableOpacity
            style={[styles.keyBoardBtn, windowHeight > 780 ? { marginTop: 30 } : { marginTop: 0 }]}
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
          <View style={showKeyboard ? { height: 7 } : { height: 0 }}></View>
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    // paddingTop: 10,
  },
  searchBtn: {
    marginTop: 6,
    alignSelf: 'center',
    borderRadius: 48,
    width: 210,
    paddingVertical: 2,
    elevation: 2,
  },
  keyBoardBtn: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 5,
    width: 50,
    height: 50,
    padding: 4,
    backgroundColor: '#777',
    borderRadius: 50,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyBoardContainer: {
    position: 'relative',
    bottom: 0,
    left: 0,
    justifySelf: 'flex-end',
    flexDirection: 'column',
    // flex: 0.65,
    justifyContent: 'space-evenly',
    marginHorizontal: -27,
    padding: -50,
    backgroundColor: '#eee',
    borderRadius: 40,
  },
  keyBoardHide: {
    flex: 0,
    height: 0,
    overflow: 'hidden',
  },
});

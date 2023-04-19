import React, { useState, useCallback, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import * as Animatable from 'react-native-animatable';
import { IndexContext } from '../context';
import GestureView from './SongScreenGesture';
import { useTheme } from 'react-native-paper';
import TopBar from '../components/SongTopBar';

// SplashScreen.preventAutoHideAsync();

const SongScreen = ({ navigation, route, style }) => {
  const { index } = useContext(IndexContext);
  const Theme = useTheme();
  const inversePrimary = Theme.colors.inversePrimary;
  const [songKey, setSongKey] = useState('1');
  const [songName, setSongName] = useState('');

  const songInfo = {
    songName: 'gYysyw;kg /u Lrqfr t;',
    key: '1',
  };

  const [fontSize, setFontSize] = useState(16);

  const animateRef = React.useRef(Animatable.View);

  React.useEffect(() => {
    try {
      if (route.params.song) {
        var { songName, key } = route.params.song;
        setSongKey(old => key);
        setSongName(old => songName);
      }
    } catch (error) {
      var { songName, key } = songInfo;
      setSongKey(old => key);
      setSongName(old => songName);
    }
  }, [route.params]);

  let [fontsLoaded] = useFonts({
    Walkman: require('../assets/WalkmanChanakya.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  onLayoutRootView();

  React.useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
    //   animateRef.current && index < 1 && animateRef.current.slideInRight();
    //   animateRef.current && index > 1 && animateRef.current.slideInLeft();
    });

    return unsubscribe;
  }, [navigation, index]);

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          ref={animateRef}
          needsOffscreenAlphaCompositing={true}
          useNativeDriver={true}
          style={[styles.container]}
          transition={'backgroundColor'}
          easing="ease-out-quint"
          duration={350}
        >
          <TopBar
            songKey={songKey}
            songName={songName}
            setSongKey={setSongKey}
            setSongName={setSongName}
            Theme={Theme}
          />

          <GestureView songKey={songKey} fontSize={fontSize} setFontSize={setFontSize} />

          <View>
            <TouchableOpacity
              style={[styles.zoomBtn, { bottom: 120, backgroundColor: inversePrimary }]}
              onPress={() => setFontSize(fontSize + 2)}
            >
              <Text style={{ color: 'white', fontSize: 25 }}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.zoomBtn, { backgroundColor: inversePrimary }]}
              onPress={() => setFontSize(fontSize - 2)}
            >
              <Text style={{ color: 'white', fontSize: 30 }}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

export default SongScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  zoomBtn: {
    position: 'absolute',
    bottom: 40,
    right: 10,
    height: 50,
    width: 50,
    elevation: 10,
    shadowColor: '#111',
    borderRadius: 100,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React, { useState, useEffect, useCallback, useContext } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Vibration
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import * as Animatable from "react-native-animatable";
import { IndexContext } from "../context";
import GestureView from "./SongScreenGesture";
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from "react-native-paper";

SplashScreen.preventAutoHideAsync();

const SongScreen = ({ navigation, route, style }) => {
    const { index } = useContext(IndexContext);
    const Theme = useTheme();
    const inversePrimary = Theme.colors.inversePrimary;

    const [songInfo, setSongInfo] = useState({
        songName: "gYysyw;kg /u Lrqfr t;",
        key: "1",
    });

    const [fontSize, setFontSize] = useState(16);

    const animateRef = React.useRef(Animatable.View);

    try {
        if (route.params.song) {
            var { songName, key } = route.params.song;
        }
    } catch (error) {
        if (songInfo) var { songName, key } = songInfo;
        else
            var { songName, key } = { songName: "gYysyw;kg /u Lrqfr t;", key: "1" };
    }

    let [fontsLoaded] = useFonts({
        Walkman: require("../assets/WalkmanChanakya.ttf"),
    });

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {

            animateRef.current && index < 1 && animateRef.current.slideInLeft();
            animateRef.current && index > 1 && animateRef.current.slideInRight();
        });

        return unsubscribe;
    }, [navigation, index]);


    if (!fontsLoaded) {
        return null;
    } else {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Animatable.View
                    ref={animateRef}
                    needsOffscreenAlphaCompositing={true}
                    useNativeDriver={true}
                    style={[styles.container, { backgroundColor: '#222' }]}
                    animation="slideInRight"
                    transition={"backgroundColor"}
                    easing="ease-out"
                    duration={250}
                >

                    <View style={[styles.header, { backgroundColor: Theme.colors.tertiary }]}>
                        <TouchableOpacity onPress={() => Vibration.vibrate(100)}>
                            <FontAwesome name="angle-left" size={24} color={'#fff'} />
                        </TouchableOpacity>
                        <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit={true}>
                            {key}  {songName}
                        </Text>
                        <TouchableOpacity onPress={() => Vibration.vibrate(100)}>
                            <FontAwesome name="angle-right" size={24} color={'#fff'} />
                        </TouchableOpacity>
                    </View>

                    <GestureView songKey={key} fontSize={fontSize} setFontSize={setFontSize} />

                    <View>
                        <TouchableOpacity
                            style={[styles.zoomBtn, { bottom: 120, backgroundColor: inversePrimary }]}
                            onPress={() => setFontSize(fontSize + 2)}
                        >
                            <Text style={{ color: "white", fontSize: 25 }}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.zoomBtn, { backgroundColor: inversePrimary }]}
                            onPress={() => setFontSize(fontSize - 2)}
                        >
                            <Text style={{ color: "white", fontSize: 30 }}>-</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </SafeAreaView>
        );
    }
};


export default SongScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: 'row',
        backgroundColor: "#5569ff",
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: "space-evenly",
        alignContent: "center",
        alignItems: "center",
        gap: 5
    },
    title: {
        textAlign: 'center',
        color: "#fff",
        fontFamily: "Walkman",
        fontSize: 24,
        width: '80%',
    },
    zoomBtn: {
        position: "absolute",
        bottom: 40,
        right: 10,
        height: 50,
        width: 50,
        elevation: 10,
        shadowColor: "#111",
        borderRadius: 100,
        backgroundColor: "#999",
        justifyContent: "center",
        alignItems: "center",
    },
});

import React, { useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View, Text, Vibration } from 'react-native';
import { useFonts } from 'expo-font';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

let SmallerHeight = windowHeight * (1 / 20);
let BiggerHeight = windowHeight * (1 / 18);

export default function KeyBoardBtn({ btnKey, setSearchKey, searchKey }) {

    const Theme = useTheme();

    let [fontsLoaded] = useFonts({
        'Walkman': require('../assets/WalkmanChanakya.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    } else {
        return (
            <TouchableOpacity onPress={() => { setSearchKey(searchKey + btnKey); Vibration.vibrate(100) }}>
                <View style={[styles.item,
                { backgroundColor: Theme.colors.background },
                windowHeight > 700 ? { height: BiggerHeight } : { height: SmallerHeight }]}>
                    <Text style={[styles.singleKey, { color: Theme.colors.onBackground }]}>{btnKey}</Text>
                </View>
            </TouchableOpacity >
        )
    }
}

export function SpaceBar({ setSearchKey, searchKey }) {
    const Theme = useTheme();

    return (
        <TouchableOpacity onPress={() => { setSearchKey(searchKey + " "); Vibration.vibrate(100) }}>
            <View style={[styles.item, {
                zIndex: 100, width: 200,
                backgroundColor: Theme.colors.inverseOnSurface
            }]}>
                <Text style={styles.singleKey}> </Text>
            </View>
        </TouchableOpacity >
    )
}

export function BackSpace({ setSearchKey, searchKey }) {
    const [x, setx] = useState(null);
    const Theme = useTheme();

    return (
        <TouchableOpacity onPress={() => { setSearchKey(searchKey.slice(0, -1)); Vibration.vibrate(100) }}
            onLongPress={() => { setSearchKey(''); Vibration.vibrate(50) }}>

            <View style={[styles.item, {
                zIndex: 100, width: 50, justifyContent: 'center', alignItems: 'center',
                backgroundColor: Theme.colors.onError

            }]}>
                <FontAwesome5 name="backspace" size={24} color={Theme.colors.error} style={{
                    position: 'relative', right: 1,
                }} />
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    item: {
        width: windowWidth * (1 / 11),
        height: SmallerHeight,
        margin: 1,
        padding: 2,
        backgroundColor: '#f7f7fc',
        borderWidth: 0.2,
        shadowColor: '#cbcbdd',
        elevation: 15,
        borderStyle: "solid",
        borderColor: "transparent",
        borderRadius: 10,
    },
    singleKey: {
        fontSize: 25,
        zIndex: 20,
        fontFamily: 'Walkman',
        fontWeight: '600',
        textAlign: 'center',
    }
});
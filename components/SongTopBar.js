import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Vibration } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

function readSongNameKey() {
    let everyData = require("../assets/tbSakshivani.json");
    let results = [];

    everyData.forEach(element => {
        let singleSong = {
            songKey: element.Song_Id.toString(),
            songName: element.Title
        };
        results.push(singleSong);
    });

    results = results.sort((a, b) => a.songKey > b.songKey)

    return results;
}

const TopBar = ({ songKey, songName, setSongKey, setSongName, Theme }) => {
    const [result, setResult] = useState([]);

    useEffect(() => {
        const results = readSongNameKey();
        setResult(results);
    }, []);

    const IncDecSong = (type = '') => {
        const incremented = (parseInt(songKey) + 1).toString();
        const decremented = (parseInt(songKey) - 1).toString();

        if (type === 'INC') {
            let found = result.find((song) => song.songKey === incremented);
            if (found){
                setSongKey(found.songKey);
                setSongName(found.songName);
            }
        }
        else if (type === 'DEC') {
            let found = result.find((song) => song.songKey === decremented);
            if (found){
                setSongKey(found.songKey);
                setSongName(found.songName);
            }
        }
    }

    return (
        <View style={[styles.header, { backgroundColor: Theme.colors.tertiary }]}>
            <TouchableOpacity onPress={() => { Vibration.vibrate(100); IncDecSong('DEC') }}>
                <FontAwesome name="angle-left" size={24} color={'#fff'} />
            </TouchableOpacity>
            <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit={true}>
                {songKey}  {songName}
            </Text>
            <TouchableOpacity onPress={() => { Vibration.vibrate(100); IncDecSong('INC') }}>
                <FontAwesome name="angle-right" size={24} color={'#fff'} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
})

export default TopBar;

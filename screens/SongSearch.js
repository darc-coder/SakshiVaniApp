import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
} from 'react-native';
import { useFonts } from 'expo-font';
import { useTheme } from 'react-native-paper';

import SongItem from "../components/SongItem";
import Convert_to_Walkman, { array_one } from "../components/fontConvertor";
import SearchBarComponent from '../components/searchBar';


function filterIt(arr, searchKey) {
    let singleWords = searchKey.split(' ');
    let result = [];

    singleWords.forEach(element => {
        result.push(...arr.filter(obj => Object.keys(obj).some(key => obj[key].includes(element))));
    });
    let newArrSet = new Set(result);
    return Array.from(newArrSet);
}

function readSongNameKey() {
    let everyData = require("../assets/tbSakshivani.json");
    let results = [];

    everyData.forEach(element => {
        let singleSong = {
            key: element.Song_Id.toString(),
            songName: element.Title
        };
        results.push(singleSong);
    });

    return results;
}

export default SongSearch = ({ route, navigation }) => {

    const Theme = useTheme();

    const [songs] = useState(readSongNameKey());

    const [searchKey, setSearch] = useState(Convert_to_Walkman(route.params.searchKey.trim()));

    const checkUnicodeHindi = (unicodeParams) => {
        let unicodeHindiText = unicodeParams.nativeEvent.text;
        let textArr = Array.from(unicodeHindiText);
        let isUniHindi = false;
        textArr.forEach(element => {
            if (array_one.includes(element)) {
                isUniHindi = true;
            }
        });
        if (isUniHindi) {
            let WalkmanHindiText = Convert_to_Walkman(unicodeHindiText);
            setSearch(WalkmanHindiText);
        }
        return null;
    }

    const setSearchKey = (unicodeHindiText) => {
        setSearch(unicodeHindiText);
    }

    const songKeyword = searchKey;

    const results = filterIt(songs, songKeyword);

    let [fontsLoaded] = useFonts({
        'Walkman': require('../assets/WalkmanChanakya.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    } else {

        return (
            <SafeAreaView style={[styles.container, { backgroundColor: Theme.colors.background, }]}>

                <SearchBarComponent searchKey={songKeyword} setSearchKey={setSearchKey} submitEditFunc={checkUnicodeHindi} />

                <FlatList
                    data={results}
                    renderItem={({ item }) => (
                        <SongItem item={item} navigation={navigation} />
                    )}
                />
            </SafeAreaView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 30
    },
})

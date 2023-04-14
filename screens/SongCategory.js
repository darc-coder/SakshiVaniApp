import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useFonts } from 'expo-font';

import SingleSongCategory from '../components/SingleSongCategory';

function readSongNameKey() {
  let everyData = require('../assets/tbSakshivani.json');
  let categoryWise = {};

  everyData.forEach(element => {
    let singleSong = {
      key: element.Song_Id.toString(),
      songName: element.Title,
    };

    if (categoryWise.hasOwnProperty(element.Category.trim())) {
      categoryWise[element.Category.trim()].push(singleSong);
    } else {
      categoryWise[element.Category.trim()] = [];
      categoryWise[element.Category.trim()].push(singleSong);
    }
  });

  return categoryWise;
}

export default function SongCategory({ navigation }) {
  let [fontsLoaded] = useFonts({
    Walkman: require('../assets/WalkmanChanakya.ttf'),
  });
  const allCategories = readSongNameKey();

  if (!fontsLoaded) {
    return null;
  } else {
    if (allCategories) {
      return (
        <FlatList
          data={Object.keys(allCategories)}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <SingleSongCategory
              key={item}
              categoryName={item}
              categoryItemsArr={allCategories[item]}
              navigation={navigation}
            />
          )}
        />
      );
    }
  }
}

const styles = StyleSheet.create({});

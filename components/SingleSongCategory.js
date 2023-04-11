import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native';
import { useFonts } from 'expo-font';
import { ListItem } from "react-native-elements";
import { useTheme, List } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SongItem from "./SongItem";

export default function SingleSongCategory({ navigation, categoryName, categoryItemsArr }) {

    let [fontsLoaded] = useFonts({
        'Walkman': require('../assets/WalkmanChanakya.ttf'),
    });

    const Theme = useTheme();

    const [expanded, setExpanded] = React.useState(false);

    const IconContent = () => {
        return (
            <Icon name="book-music" size={30} color={Theme.colors.onBackground} />
        )
    }

    if (!fontsLoaded) {
        return null;
    } else {
        return (
            <View style={[styles.container], {
                backgroundColor: Theme.colors.background,
            }}>

                <List.Accordion
                    style={{
                        backgroundColor: Theme.colors.inverseOnSurface,
                    }}

                    left={IconContent}
                    title={
                        <ListItem.Title
                            style={[styles.title, { color: Theme.colors.inverseSurface }]}>
                            {categoryName}
                        </ListItem.Title>
                    }
                    isExpanded={expanded}
                    onPress={() => setExpanded(!expanded)}>

                    <FlatList
                        data={categoryItemsArr}
                        style={{ paddingLeft: 0 }}
                        renderItem={({ item }) => (
                            <SongItem key={item} item={item} navigation={navigation} />
                        )}
                    />
                </List.Accordion>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
    },
    title: {
        fontFamily: "Walkman",
        fontSize: 20,
    },
});
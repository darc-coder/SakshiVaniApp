import React, { useState, useContext } from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { useTheme } from 'react-native-paper';
import { ListItem } from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export default function SongItem({ navigation, item }) {

    const Theme = useTheme();

    let [fontsLoaded] = useFonts({
        'Walkman': require('../assets/WalkmanChanakya.ttf'),
    });

    // const rightSide = () => {
    //     return (
    //         <View style={[{ flexDirection: 'row', borderBottomColor: Theme.colors.outlineVariant }]}>

    //             <Text numberOfLines={1} style={[styles.songName, {
    //                 color: Theme.colors.onBackground
    //             }]}>
    //                 {item.songName.length > maxCharLimit ?
    //                     item.songName.substring(maxCharLimit, - 3) :
    //                     item.songName}
    //             </Text>
    //             {item.songName.length > maxCharLimit ? <Text style={{ color: Theme.colors.onBackground }}> ...</Text> : ''}
    //         </View>
    //     )
    // }

    // const icon = () => {
    //     return (<Text style={{ marginRight: 5, color: Theme.colors.onBackground }}>
    //         <List.Icon icon="music-note" />
    //         {item.key}</Text>)
    // }

    const maxCharLimit = 30;
    if (!fontsLoaded) {
        return null;
    } else {
        return (
            <ListItem
                containerStyle={{ backgroundColor: Theme.colors.background, }}
                style={{ borderBottomColor: Theme.colors.elevation.level5, borderBottomWidth: 0.6 }}
                onPress={() => navigation.navigate('Song', { song: item })}
            >
                <Text style={{ color: Theme.colors.onBackground }}>
                    <Icon name="music-note" size={20} />
                    {item.key}
                </Text>
                <ListItem.Content>
                    <ListItem.Subtitle>
                        <Text numberOfLines={1}
                            style={[styles.songName, {
                                color: Theme.colors.onBackground
                            }]}>
                            {item?.songName?.length > maxCharLimit ?
                                item.songName.substring(maxCharLimit, - 3) :
                                item.songName}
                        </Text>
                        {item.songName.length > maxCharLimit ? <Text style={{ color: Theme.colors.onBackground }}> ...</Text> : ''}
                    </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            // <List.Item
            //     title={rightSide}
            //     left={icon}
            //     onPress={() => navigation.navigate('Song', { song: item })}
            // />
            // <TouchableOpacity onPress={() => navigation.navigate('Song', { song: item })
            // }>
            //     <View style={[styles.item, { backgroundColor: Theme.colors.inverseOnSurface, borderBottomColor: Theme.colors.outlineVariant }]}>
            //         <Text style={[styles.songKey, {
            //             color: Theme.colors.onBackground
            //         }]}>{item.key}</Text>
            //         <Text numberOfLines={1} style={[styles.songName, {
            //             color: Theme.colors.onBackground
            //         }]}>
            //             {item.songName.length > maxCharLimit ?
            //                 item.songName.substring(maxCharLimit, - 3) :
            //                 item.songName}
            //         </Text>
            //         {item.songName.length > maxCharLimit ? <Text style={{ color: Theme.colors.onBackground }}> ...</Text> : ''}
            //     </View>
            // </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        backgroundColor: '#fefefe',
        padding: 12,
        marginTop: 4,
        shadowColor: '#fefefe',
        borderBottomWidth: 0.3,
        borderStyle: "solid",
        borderRadius: 12,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
        overflow: 'hidden',
    },
    songKey: {
        fontFamily: 'Roboto',
        marginRight: 10,
        fontSize: 16,
        textAlign: 'center',
        color: '#777',
        width: 40
    },
    songName: {
        fontFamily: 'Walkman',
        color: '#555',
        fontSize: 20,
    }
}); 
import React from 'react'
import { StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { useTheme } from 'react-native-paper';
import { ListItem } from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export default function SongItem({ navigation, item }) {

    const Theme = useTheme();

    let [fontsLoaded] = useFonts({
        'Walkman': require('../assets/WalkmanChanakya.ttf'),
    });

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
        )
    }
}

const styles = StyleSheet.create({
    songName: {
        fontFamily: 'Walkman',
        color: '#555',
        fontSize: 20,
    }
});

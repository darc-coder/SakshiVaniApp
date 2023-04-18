import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useTheme, List } from 'react-native-paper';
import { ListItem } from '@rneui/themed';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const SongItem = ({ navigation, item }) => {

    const Theme = useTheme();

    let [fontsLoaded] = useFonts({
        'Walkman': require('../assets/WalkmanChanakya.ttf'),
    });

    const leftIcon = () => {
        return (
            <Text style={{ color: Theme.colors.onBackground, paddingLeft: 12 }}>
                <Icon name="music-note" size={20} />
                {item.key}
            </Text>
        )
    }

    const titleNode = () => {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                <ListItem.Chevron />
            </View>
        )
    }

    const maxCharLimit = 30;
    if (!fontsLoaded) {
        return null;
    } else {
        return (
            <List.Item
                containerStyle={{ backgroundColor: Theme.colors.background, }}
                style={{ borderBottomColor: Theme.colors.elevation.level5, borderBottomWidth: 0.6 }}
                onPress={() => navigation.navigate('Song', { song: item })}
                left={leftIcon}
                title={titleNode}
            />
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

export default memo(SongItem);

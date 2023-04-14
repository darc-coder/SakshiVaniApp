import React from 'react'
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import { useTheme } from 'react-native-paper';
import KeyBoardBtn, { SpaceBar, BackSpace } from "./KeyBoardBtn";

function RenderRow({ rowData, setSearchKey, searchKey }) {
    return (

        <FlatList
            keyboardShouldPersistTaps={'handled'}
            style={styles.row}
            data={rowData}
            renderItem={({ item }) => (
                <KeyBoardBtn btnKey={item} setSearchKey={setSearchKey} searchKey={searchKey} />
            )}
            keyExtractor={item => 'k' + item}
        />
    );
};

function SpaceBackspace({ setSearchKey, searchKey }) {
    return (
        <View style={[styles.row, { gap: 5 }]}>
            <SpaceBar setSearchKey={setSearchKey} searchKey={searchKey} />
            <BackSpace setSearchKey={setSearchKey} searchKey={searchKey} />
        </View>
    )
}

export default function HindiKeyBoard({ setSearchKey, searchKey }) {

    const Theme = useTheme();

    const data = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['k', 'v', 'vk', 'b', 'bZ', 'm', 'Å', 'f', 'h', 'a'],
        ['q', 'w', '½', ',', ',s', 'vks', 'vkS', 's', 'S'],
        ['d', '[k', 'x', '?k', 'Ä', 'p', 'N', 't', '>', '×k'],
        ['V', 'B', 'M', '<', '.k', 'r', 'Fk', 'n', '/', 'u'],
        ['i', 'iQ', 'c', 'Hk', 'e', ';', 'j', 'y', 'o'],
        ["'k", '"k', 'l', 'g', '{k', '=k', 'K', 'J']]


    return (
        <SafeAreaView style={[styles.ViewContainer, { backgroundColor: Theme.colors.elevation.level3 }]} keyboardShouldPersistTaps={'handled'}>
            <FlatList
                keyboardShouldPersistTaps={'handled'}
                style={{ flexDirection: 'column', margin: 0, flexGrow: 0 }}
                data={data}
                ListFooterComponent={<SpaceBackspace setSearchKey={setSearchKey} searchKey={searchKey} />}
                keyExtractor={(item, index) => 'r' + index.toString()}
                renderItem={({ item }) => (
                    <RenderRow rowData={item} setSearchKey={setSearchKey} searchKey={searchKey} />
                )}
            />
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    ViewContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#e9eaee',
        margin: 0,
        paddingBottom: 5,
    },
    row: {
        padding: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

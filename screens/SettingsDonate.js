import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';


const DonateButton = () => {

    const Theme = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.DonateBtn,
                {
                    backgroundColor: Theme.colors.scrim,
                },
            ]}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>

                <MCIcon name='currency-inr' size={24} style={{ position: 'absolute' }}/>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                <Text style={[styles.DonateText, { color: Theme.colors.inversePrimary }]}>
                    Support Us
                </Text>
                    <Text style={[styles.DonateRibbon, {
                        backgroundColor: Theme.colors.tertiary, }]}>
                    Donate
                </Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    DonateBtn: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 12,
        position: 'relative',
        width: '100%',
        height: 55,
        // marginTop: 10,
        marginBottom: 10,
        borderRadius: 20,
        overflow: 'hidden',
    },
    DonateText: {
        fontWeight: "600",
        includeFontPadding: true,
        letterSpacing: 3,
        fontSize: 24,
        textAlign: "center"
    },
    DonateRibbon: {
        position: 'absolute',
        transform: [{ rotate: '55deg' }],
        top: 8,
        right: -5,
        height: 15,
        width: 85,
        fontSize: 10,
        textAlign: 'center',
        borderRadius: 5,
        color: 'white',
    },
})

export default DonateButton;

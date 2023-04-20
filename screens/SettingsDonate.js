import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { A } from '@expo/html-elements';

const DonateButton = () => {

    const Theme = useTheme();
    const [showPay, setShowPay] = useState(false);
    const { scrim, inversePrimary, tertiary, onBackground } = Theme.colors;

    return (
        <View style={{flexDirection: 'column'}}>

        <TouchableOpacity
            style={[
                styles.DonateBtn,
                {
                    backgroundColor: scrim,
                },
            ]}
                onPress={() => setShowPay(old => !old)}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>

                <MCIcon name='currency-inr' size={24} style={{ position: 'absolute' }}/>
                <View style={styles.Centered}>

                <Text style={[styles.DonateText, { color: inversePrimary }]}>
                    Support Us
                </Text>
                    <Text style={[styles.DonateRibbon, {
                        backgroundColor: tertiary, }]}>
                    Donate
                </Text>
                </View>

            </View>
        </TouchableOpacity>
            { showPay ?
                <Text style={{ textAlign: 'center', color: onBackground }}>Donate us:
                    <A style={styles.anchor} href="upi://pay?pa=gelcjsg@ybl"> gelcjsg@ybl</A>
                </Text> : null }
        </View>
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
    Centered: {
        lexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
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
    anchor: {
        color: '#006adc'
    }
})

export default DonateButton;

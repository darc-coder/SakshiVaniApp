import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import {
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from "react-native-paper";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const imgHeight = parseInt(windowHeight * 0.2);
const imgWidth = parseInt(windowWidth);

const SettingsTopImage = () => {

    const uri = `https://source.unsplash.com/random/${100}*${100}/?nature,mountain`;

    const [posXY, setPosXY] = useState({ X: 0, Y: 0 });
    const [dpImgSrc, setDpImgSrc] = useState({uri: uri});

    const Theme = useTheme();

    useEffect(() => {
        AsyncStorage.getItem('profileImage', (result) => result && setDpImgSrc(old => {uri: result}))
    }, []);

    const pickImage = async () => {
        let result = { canceled: true };
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted")
            alert("Sorry, we need camera roll permissions to make this work!");
        else {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
                base64: true,
            });
        }

        if (!result.canceled) {
                try {
                    await AsyncStorage.setItem('profileImage', "data:image/jpeg;base64," + result.base64)
                } catch (e) {
                    console.error(e);
                }
        }
    };

    const image = {
        uri: `https://source.unsplash.com/random/${imgHeight}*${imgWidth}/?nature,mountain`,
    };

    return (
        <>
            <ImageBackground source={image} style={styles.bgImg}>
                <Image
                    source={dpImgSrc}
                    style={[styles.profileImg, { borderColor: Theme.colors.backdrop }]}
                    onLayout={(event) => {
                        const layout = event.nativeEvent.layout;
                        const posXY = {
                            X: layout.x,
                            Y: layout.y,
                        };
                        setPosXY(posXY);
                    }}
                ></Image>
            </ImageBackground>

            <TouchableOpacity
                style={[styles.imgUpBtn, {
                     top: posXY.X + 80, left: posXY.Y + 70,
                     backgroundColor: Theme.colors.outline }]}
                onPress={() => pickImage()}
            >
                <Ionicons name="ios-camera" size={20} color={Theme.colors.background} />
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    bgImg: {
        height: 200,
        justifyContent: "flex-end",
    },
    profileImg: {
        position: "relative",
        alignSelf: "center",
        top: 50,
        height: 100,
        width: 100,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "white",
    },
    imgUpBtn: {
        position: "absolute",
        elevation: 20,
        height: 30,
        width: 30,
        alignSelf: "flex-start",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
        borderRadius: 100,
        backgroundColor: "#319",
    },
});

export default SettingsTopImage;

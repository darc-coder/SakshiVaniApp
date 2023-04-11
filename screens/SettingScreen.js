import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { Switch, TextInput, useTheme } from "react-native-paper";
import { ThemeContext } from "../context";
import SettingsTopImage from "./SettingTopImage";

const SettingScreen = ({ navigation, route }) => {
  const animateRef = React.useRef(null);
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const Theme = useTheme();
  const [name, setName] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      animateRef.current && animateRef.current.slideInRight();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Animatable.View
      ref={animateRef}
      style={{ flex: 1 }}
      animation="slideInRight"
      easing="ease"
      duration={250}
    >
      <SettingsTopImage />
      <View style={styles.settings}>
        <Text style={styles.borderTop} />
        <View style={styles.textToggleWrap}>
          <Text style={[styles.texts, { color: Theme.colors.onBackground }]}>
            Dark Mode:
          </Text>
          <Switch
            style={{}}
            onValueChange={() => setDarkTheme((oldVal) => !oldVal)}
            value={darkTheme}
          />
        </View>

        <TextInput
          mode="flat"
          label={name.length > 2 ? "Hi," : "My Name is"}
          value={name}
          onChangeText={(text) => setName(text)}
          style={{ borderRadius: 20 }}
          contentStyle={{ borderRadius: 20 }}
          underlineStyle={{ backgroundColor: "transparent" }}
          underlineColor="transparent"
        />
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  settings: {
    position: "relative",
    top: 50,
    flex: 1,
    marginTop: 20,
    padding: 20,
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  textToggleWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    paddingBottom: 20,
  },
  texts: {
    display: "flex",
    verticalAlign: "middle",
    textAlign: "center",
  },
  toggles: {
    position: "relative",
    bottom: 25,
    right: 10,
    alignSelf: "flex-end",
  },
});

export default SettingScreen;

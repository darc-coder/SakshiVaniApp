import React from "react";
import { Animated, ScrollView, Text, StyleSheet } from "react-native";
import {
  PinchGestureHandler,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";

function readSongNameKey(key = "") {
  let everyData = require("../assets/tbSakshivani.json");
  let result = everyData.filter((song) => song.Song_Id.toString() === key);

  return result[0].Lyric;
}

function readSongReference(key = "") {
  let everyData = require("../assets/tbSakshivani.json");
  let result = everyData.filter((song) => song.Song_Id.toString() === key);

  return "\n" + result[0].Reference;
}

const GestureView = ({ songKey = "", fontSize, setFontSize }) => {
  const Theme = useTheme();

  let _baseScale = new Animated.Value(1);
  let _pinchScale = new Animated.Value(1);
  let _scale = Animated.multiply(_baseScale, _pinchScale);
  let _lastScale = 1;
  const _onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: _pinchScale } }],
    { useNativeDriver: true }
  );

  const _onPinchHandlerStateChange = (event) => {
    const lastScale = event.nativeEvent.scale;

    if (event.nativeEvent.oldState) {
      _lastScale *= event.nativeEvent.scale;
      _baseScale.setValue(_lastScale);
      _pinchScale.setValue(1);
    }

    if (lastScale > 1) setFontSize((size) => size + 0.2);
    else if (lastScale < 1) setFontSize((size) => size - 0.2);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView
        style={[styles.container, { backgroundColor: Theme.colors.background }]}
        pinchGestureEnabled={true}
      >
        <PinchGestureHandler
          onGestureEvent={_onPinchHandlerStateChange}
          onHandlerStateChange={_onPinchHandlerStateChange}
        >
          <Animated.View
            style={[
              styles.zoomView,
              { backgroundColor: Theme.colors.background },
            ]}
          >
            <Text
              style={[
                styles.caption,
                { fontSize: fontSize, color: Theme.colors.onBackground },
              ]}
            >
              {readSongNameKey(songKey)}
              {readSongReference(songKey)}
            </Text>
          </Animated.View>
        </PinchGestureHandler>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  zoomView: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  caption: {
    flex: 1,
    fontFamily: "Walkman",
    width: "100%",
    padding: 1,
    fontSize: 10,
    color: "#444",
    textAlign: "center",
  },
});
export default GestureView;

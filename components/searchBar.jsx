import React, { useRef } from "react";
import { StyleSheet, Platform, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { useTheme } from "react-native-paper";
import { ThemeContext } from "../context";

const SearchBarComponent = ({
  searchKey,
  setSearchKey,
  submitEditFunc = null,
}) => {
  const ref = useRef(null);
  const Theme = useTheme();
  const { darkTheme } = React.useContext(ThemeContext);

  return (
    <SearchBar
      platform={
        Platform.OS === "ios" || Platform.OS === "android"
          ? "android"
          : "default"
      }
      ref={ref}
      style={{
        fontFamily: searchKey ? "Walkman" : "",
        color: Theme.colors.onSecondaryContainer,
        fontSize: searchKey ? 20 : 15,
      }}
      inputStyle={{
        backgroundColor: "transparent",
        marginLeft: 8,
      }}
      placeholderTextColor={Theme.colors.onSurface}
      containerStyle={[
        styles.containerStyle,
        {
          backgroundColor: Theme.colors.secondaryContainer,
          borderBottomColor: darkTheme ? "transparent" : "#cdf",
        },
      ]}
      placeholder="Search song by Number or Name"
      onChangeText={setSearchKey}
      showCancel={false}
      value={searchKey}
      round={true}
      onBlur={() => ""}
      blurOnSubmit={false}
      onTextInput={submitEditFunc}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    marginVertical: 15,
    elevation: 1,
    borderRadius: 30,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: "#cdf",
  },
  textInput: {
    fontFamily: "Walkman",
    elevation: 4,
  },
});

export default SearchBarComponent;

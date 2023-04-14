import React, { useRef } from 'react';
import { StyleSheet, Platform, TouchableOpacity, Vibration, Keyboard } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { useTheme } from 'react-native-paper';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../context';

const Icon = ({ name, onPress }) => {
  const Theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} onPressOut={() => Vibration.vibrate(100)}>
      <MCIcon name={name} size={25} color={Theme.colors.onSecondaryContainer} />
    </TouchableOpacity>
  );
};

const SearchBarComponent = ({ searchKey, setSearchKey, submitEditFunc = null }) => {
  const ref = useRef(null);
  const Theme = useTheme();
  const { darkTheme } = React.useContext(ThemeContext);
  const [inpStart, setInpStart] = React.useState(false);
  const [focusCount, setFocusCount] = React.useState(0);

  React.useEffect(() => {
    ref && focusCount < 2 && ref.current.focus();
    !inpStart && Keyboard.dismiss();
  }, [searchKey, inpStart, ref]);

  const clearInput = () => ref.current.clear();
  const cancelInput = () => {
    ref.current.cancel();
    setInpStart(false);
    setFocusCount(0);
  };
  const search = () => ref.current.focus();

  return (
      <SearchBar
            platform={
                Platform.OS === "ios" || Platform.OS === "android"
                    ? Platform.OS
                    : "default"
            }
        ref={ref}
        style={{
          fontFamily: searchKey ? 'Walkman' : '',
          color: Theme.colors.onSecondaryContainer,
          fontSize: searchKey ? 20 : 15,
        }}
        inputStyle={{
          backgroundColor: 'transparent',
          marginLeft: 8,
        }}
        placeholderTextColor={Theme.colors.onSurface}
        containerStyle={[
          styles.containerStyle,
          {
            backgroundColor: Theme.colors.secondaryContainer,
            borderBottomColor: darkTheme ? 'transparent' : '#cdf',
          },
        ]}
        clearIcon={<Icon name="close" onPress={clearInput} />}
        cancelIcon={<Icon name="arrow-left" onPress={cancelInput} />}
        searchIcon={<Icon name="magnify" onPress={search} />}
        placeholder="Search song by Number or Name"
        onChangeText={setSearchKey}
        showCancel={false}
        value={searchKey}
        round={true}
        onFocus={() => setFocusCount(old => old + 1)}
        blurOnSubmit={false}
        onTextInput={e => {
          setInpStart(true);
          submitEditFunc && submitEditFunc(e);
        }}
      />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    marginVertical: 10,
    elevation: 1,
    borderRadius: 30,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cdf',
  },
});

export default SearchBarComponent;

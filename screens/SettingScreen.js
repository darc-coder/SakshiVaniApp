import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Switch, TextInput, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../context';
import SettingsTopImage from './SettingTopImage';
import DonateButton from './SettingsDonate';
import BannerAd from '../components/BannerAd';

const SettingScreen = ({ navigation, route }) => {
  const animateRef = React.useRef(null);
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const Theme = useTheme();
  const [name, setName] = useState('');

  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
    //   animateRef.current && animateRef.current.fadeInRight();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    (async () => {
      const result = await AsyncStorage.getItem('profileName');
      result && setName(result);
    })();
  }, []);

  return (
    <View
      ref={animateRef}
      style={{ flex: 1 }}
      animation="slideInRight"
      easing="ease-out-quint"
      duration={350}
    >
      <SettingsTopImage />
      <View style={styles.settings}>
        <Text style={[styles.borderTop, { borderColor: Theme.colors.outlineVariant }]} />
        <View style={styles.textToggleWrap}>
          <Text style={[styles.texts, { color: Theme.colors.onBackground }]}>
            Dark Mode:
          </Text>
          <Switch onValueChange={() => setDarkTheme(oldVal => !oldVal)} value={darkTheme} />
        </View>

        <TextInput
          mode="flat"
          label={name.length > 2 ? 'Hi,' : 'My Name is:'}
          value={name}
          onChangeText={text => setName(text)}
          onBlur={async () => await AsyncStorage.setItem('profileName', name)}
          style={{ borderRadius: 20 }}
          contentStyle={{ borderRadius: 20 }}
          underlineStyle={{ backgroundColor: 'transparent' }}
          underlineColor="transparent"
        />
        <TouchableOpacity
          style={[
            styles.ThemeEngineBtn,
            {
              backgroundColor: Theme.colors.surfaceVariant,
            },
          ]}
        >
          <Text
            style={[
              styles.comingSoon,
              { backgroundColor: Theme.colors.tertiary },
            ]}
          >
            Coming Soon
          </Text>
          <Text style={{
            color: Theme.colors.surfaceDisabled,
            fontSize: 16,
          }}>Theme Engine ...</Text>
        </TouchableOpacity>
        <DonateButton />
        <BannerAd />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settings: {
    position: 'relative',
    top: 50,
    flex: 1,
    marginTop: 20,
    padding: 20,
    gap: 10,
  },
  borderTop: {
    borderTopWidth: 0.5,
    borderColor: '#ddd',
    height: 2,
  },
  textToggleWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingBottom: 20,
    marginBottom: 20,
  },
  texts: {
    display: 'flex',
    verticalAlign: 'middle',
    textAlign: 'center',
    paddingLeft: 4,
    fontSize: 15,
  },
  ThemeEngineBtn: {
    flexDirection: 'column',
    justifyContent:'center',
    paddingHorizontal: 12,
    position: 'relative',
    width: '100%',
    height: 55,
    marginVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',

  },
  comingSoon: {
    position: 'absolute',
    transform: [{ rotate: '55deg' }],
    top: 20,
    right: 10,
    height: 15,
    width: 85,
    fontSize: 10,
    textAlign: 'center',
    borderRadius: 5,
    color: 'white',
  },
});

export default SettingScreen;

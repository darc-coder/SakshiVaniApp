import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-6000544536655422/7162720209';

export default function BannerAdComponent() {
  return (
    <View style={styles.adBox}>
      <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
              requestNonPersonalizedAdsOnly: true,
          }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  adBox: {
    height: 60,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  }
})
import React from 'react';
import { View, Text } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-6000544536655422/7162720209';

export default function BannerAdComponent() {
  return (
    // <View style={{height: 60}}>
      <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
              requestNonPersonalizedAdsOnly: true,
          }}
      />
    // </View>
  )
}

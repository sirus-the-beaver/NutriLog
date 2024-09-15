import 'react-native-gesture-handler';
import React, { useEffect, useState, useRef } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { REVENUECAT_API_KEY, REVENUECAT_DEBUG } from './src/utils/config';
import usePurchase from './src/hooks/usePurchase';
import Purchases from 'react-native-purchases';
import { Platform, View } from 'react-native';
import mobileAds, { BannerAd, TestIds, BannerAdSize, useForeground } from 'react-native-google-mobile-ads';

mobileAds()
    .initialize()
    .then(() => {
        console.log('Google Mobile Ads SDK initialized');
    });

const ANDROID_BANNER_AD_UNIT_ID = 'ca-app-pub-3405415006338202/5867715094';
const IOS_BANNER_AD_UNIT_ID = 'ca-app-pub-3405415006338202/8651523045';

const bannerAdUnitId = Platform.select({
    ios: IOS_BANNER_AD_UNIT_ID,
    android: ANDROID_BANNER_AD_UNIT_ID,
});

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : bannerAdUnitId;

const App = () => {
    useEffect(() => {
        Purchases.configure({
            apiKey: REVENUECAT_API_KEY,
            observerMode: REVENUECAT_DEBUG,
        })
    }, []);
    
    const [showAds, setShowAds] = useState(true);
    const { isAdFree } = usePurchase();

    useEffect(() => {
        setShowAds(!isAdFree);
    }, [isAdFree]);

    const bannerRef = useRef<BannerAd>(null);

    useForeground(() => {
        Platform.OS === 'ios' && bannerRef.current?.load();
    });

    return (
        <View style={{ flex: 1 }}>
            {showAds && (
                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
            )}
            <AppNavigator />
        </View>
    )
};

export default App;

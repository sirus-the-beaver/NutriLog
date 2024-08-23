import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { REVENUECAT_API_KEY, REVENUECAT_DEBUG } from './src/utils/config';
import Purchases from 'react-native-purchases';

const App = () => {
    useEffect(() => {
        Purchases.configure({
            apiKey: REVENUECAT_API_KEY,
            observerMode: REVENUECAT_DEBUG,
        })
    }, []);

    return (
        <AppNavigator />
    )
};

export default App;

import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => (
    <>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
    </>
);

export default App;

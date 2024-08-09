/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Purchases from 'react-native-purchases';

Purchases.configure({apiKey: "goog_ZVgoTQjElgRxXLhcNGtcLkzqCBR"});

AppRegistry.registerComponent(appName, () => App);

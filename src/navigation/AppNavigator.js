import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import SignOut from '../components/SignOut';
import FoodLogForm from '../components/FoodLogForm';
import FoodLogList from '../components/FoodLogList';
import Macros from '../components/Macros';
import BarcodeScanner from '../components/BarcodeScanner';
import ExerciseLogForm from '../components/ExerciseLogForm';
import ExerciseLogList from '../components/ExerciseLogList';
import ProgressForm from '../components/ProgressForm';
import ProgressList from '../components/ProgressList';
import UserSettings from '../components/UserSettings';
import Dashboard from '../components/Dashboard';
import PurchaseScreen from '../components/PurchaseScreen';
import SubscriptionInformation from '../components/SubscriptionInformation';
import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DashboardNavigator" component={Dashboard} />
        </Stack.Navigator>
    );
};

const FoodLogNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="FoodLogList" component={FoodLogList} />
            <Stack.Screen name="FoodLogForm" component={FoodLogForm} />
            <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
            <Stack.Screen name="Macros" component={Macros} />
        </Stack.Navigator>
    );
};

const ExerciseLogNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ExerciseLogList" component={ExerciseLogList} />
            <Stack.Screen name="ExerciseLogForm" component={ExerciseLogForm} />
        </Stack.Navigator>
    );
};

const ProgressNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProgressList" component={ProgressList} />
            <Stack.Screen name="ProgressForm" component={ProgressForm} />
        </Stack.Navigator>
    );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Food Log') {
                        iconName = 'cutlery';
                    } else if (route.name === 'Exercise Log') {
                        iconName = 'bicycle';
                    } else if (route.name === 'Progress Log') {
                        iconName = 'line-chart';
                    } else if (route.name === 'Dashboard') {
                        iconName = 'home';
                    }

                    return <Icon name={iconName} size={size} type='font-awesome' color={color} />;
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardNavigator} />
            <Tab.Screen name="Food Log" component={FoodLogNavigator} />
            <Tab.Screen name="Exercise Log" component={ExerciseLogNavigator} />
            <Tab.Screen name="Progress Log" component={ProgressNavigator} />
        </Tab.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SignUp'>
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignOut" component={SignOut} />
                <Stack.Screen name="Settings" component={UserSettings} />
                <Stack.Screen name="Subscription Information" component={SubscriptionInformation} />
                <Stack.Screen name="Purchases" component={PurchaseScreen} />
                <Stack.Screen
                    name="TabNavigator"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
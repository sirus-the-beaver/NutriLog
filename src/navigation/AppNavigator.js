import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import SignOut from '../components/SignOut';
import FoodLogForm from '../components/FoodLogForm';
import FoodLogList from '../components/FoodLogList';
import BarcodeScanner from '../components/BarcodeScanner';
import ExerciseLogForm from '../components/ExerciseLogForm';
import ExerciseLogList from '../components/ExerciseLogList';
import ProgressForm from '../components/ProgressForm';
import ProgressList from '../components/ProgressList';
import UserSettings from '../components/UserSettings';
import Dashboard from '../components/Dashboard';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
    );
};

const FoodLogNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="FoodLogList" component={FoodLogList} />
            <Stack.Screen name="FoodLogForm" component={FoodLogForm} />
            <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
        </Stack.Navigator>
    );
};

const ExerciseLogNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ExerciseLogList" component={ExerciseLogList} />
            <Stack.Screen name="ExerciseLogForm" component={ExerciseLogForm} />
        </Stack.Navigator>
    );
};

const ProgressNavigator = () => {
    return (
        <Stack.Navigator>
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

                    if (route.name === 'FoodLog') {
                        iconName = 'cutlery';
                    } else if (route.name === 'ExerciseLog') {
                        iconName = 'bicycle';
                    } else if (route.name === 'ProgressLog') {
                        iconName = 'line-chart';
                    } else if (route.name === 'Dashboard') {
                        iconName = 'home';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardNavigator} />
            <Tab.Screen name="FoodLog" component={FoodLogNavigator} />
            <Tab.Screen name="ExerciseLog" component={ExerciseLogNavigator} />
            <Tab.Screen name="ProgressLog" component={ProgressNavigator} />
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
                <Stack.Screen name="UserSettings" component={UserSettings} />
                <Stack.Screen name="TabNavigator" component={TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SignUp'>
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignOut" component={SignOut} />
                <Stack.Screen name="FoodLogForm" component={FoodLogForm} />
                <Stack.Screen name="FoodLogList" component={FoodLogList} />
                <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
                <Stack.Screen name="ExerciseLogForm" component={ExerciseLogForm} />
                <Stack.Screen name="ExerciseLogList" component={ExerciseLogList} />
                <Stack.Screen name="ProgressForm" component={ProgressForm} />
                <Stack.Screen name="ProgressList" component={ProgressList} />
            </Stack.Navigator>

            <Tab.Navigator>
                <Tab.Screen name="FoodLogList" component={FoodLogList} />
                <Tab.Screen name="ExerciseLogList" component={ExerciseLogList} />
                <Tab.Screen name="ProgressList" component={ProgressList} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
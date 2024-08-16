import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import SignOut from '../components/SignOut';
import FoodLogForm from '../components/FoodLogForm';
import FoodLogList from '../components/FoodLogList';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SignUp'>
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignOut" component={SignOut} />
                <Stack.Screen name="FoodLogForm" component={FoodLogForm} />
                <Stack.Screen name="FoodLogList" component={FoodLogList} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
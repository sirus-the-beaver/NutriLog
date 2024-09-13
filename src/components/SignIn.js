import React, { useState } from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases from 'react-native-purchases';
import { styled } from 'nativewind';

const StyledView = styled(View);

const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            const response = await axios.post('https://nutrilog-app-ed72f4c84fc2.herokuapp.com/api/login', { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            await AsyncStorage.setItem('user', response.data.userId);
            await AsyncStorage.setItem('token', response.data.token);

            if (response.data.appUserId) {
                await Purchases.setCustomerUserId(response.data.appUserId);
            }

            navigation.navigate('TabNavigator');
        } catch (error) {
            console.error(error);
        }
    };

    

    return (
        <StyledView className='flex-1 p-4'>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign In" onPress={handleSignIn} />
        </StyledView>
    );
};

export default SignIn;
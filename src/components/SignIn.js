import React, { useState } from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({ onSignIn }) => {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (user) => {
        try {
            const response = await axios.post('http://172.20.10.4:5003/api/login', { email, password });
            onSignIn(response.data.token);
            await AsyncStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <Text>Sign In</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign In" onPress={handleSignIn} />
        </View>
    );
};
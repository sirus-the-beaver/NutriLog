import React, { useState } from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            navigation.navigate('TabNavigator');
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
                onChangeText={setEmail}
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

export default SignIn;
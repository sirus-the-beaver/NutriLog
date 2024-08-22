import React, { useState } from 'react';
import { View, Button, Text, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SignUp = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://172.20.10.4:5011/api/register', { name: name, email: email, password: password },
                { headers: { 'Content-Type': 'application/json' } }
        );

            const { token, userId } = response.data;
            await AsyncStorage.setItem('user', userId);
            await AsyncStorage.setItem('token', token);
            Alert.alert('Success', 'Sign up successful');

            navigation.navigate('SignIn');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Sign up failed');
        }
    }

    return (
        <View>
            <Text>Sign Up</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
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
            <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <Button title="Sign Up" onPress={handleSignUp} />
            <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
        </View>
    );
};

export default SignUp;

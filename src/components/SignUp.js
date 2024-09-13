import React, { useState } from 'react';
import { View, Button, Text, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { styled } from 'nativewind';

const StyledView = styled(View);

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
            const response = await axios.post('https://nutrilog-app-ed72f4c84fc2.herokuapp.com/api/register', { name: name, email: email, password: password },
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
        <StyledView className='flex-1 p-4'>
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
        </StyledView>
    );
};

export default SignUp;

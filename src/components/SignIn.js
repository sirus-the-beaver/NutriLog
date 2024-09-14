import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases from 'react-native-purchases';
import { styled } from 'nativewind';

const StyledView = styled(View);

const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleEmailChange = (email) => {
        setEmail(email);
        setError(null);
    }

    const handlePasswordChange = (password) => {
        setPassword(password);
        setError(null);
    }

    const signInUser = async () => {
        if (!email || !password) {
            Alert.alert('Please enter email and password');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('https://nutrilog-app-ed72f4c84fc2.herokuapp.com/api/login', { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            await AsyncStorage.setItem('user', response.data.userId);
            await AsyncStorage.setItem('token', response.data.token);

            if (response.data.appUserId) {
                await Purchases.setCustomerUserId(response.data.appUserId);
            }
            setLoading(false);
            navigation.navigate('TabNavigator');
        } catch (error) {
            setError('Failed to sign in');
            setLoading(false);
        }
    }

    return (
        <StyledView className='flex-1 p-4'>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email.toLocaleLowerCase()}
                onChangeText={handleEmailChange}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
            />
            <Button title="Sign In" onPress={signInUser} />
            {error && Alert.alert('Error', error)}
        </StyledView>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default SignIn;
import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
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
                style={styles.input}
                placeholder="Email"
                value={email.toLocaleLowerCase()}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign In" onPress={handleSignIn} />
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
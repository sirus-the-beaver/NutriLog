import React from 'react';
import { View, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Delete = () => {
    const navigation = useNavigation();
    const handleDelete = async () => {
        try {
            Alert.alert(
                'Delete Account',
                'Are you sure you want to delete your account? This action cannot be undone.',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Delete', onPress: async () => {
                            const token = await AsyncStorage.getItem('token');
                            const user = await AsyncStorage.getItem('user');
                            if (token) {
                                const response = await axios.delete('http://172.20.10.4:5011/api/deleteAccount', {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`,
                                    },
                                    data: { userId: user }
                                });
                                console.log(response.data);
                                await AsyncStorage.removeItem('user');
                                await AsyncStorage.removeItem('token');
                                navigation.navigate('SignUp');
                            }
                        },
                        style: 'destructive'
                    }
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
            <Button title="Delete Account" onPress={handleDelete} />
        </View>
    );
};

export default Delete;
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUser = async () => {
            const userId = await AsyncStorage.getItem('user');
            if (userId) {
                const response = await axios.get(`http://172.20.10.4:5009/api/user/${userId}`);
                setUser(response.data);
            }
        }
        fetchUser();
    }, []);

    return (
        <View>
            <Text>Dashboard</Text>
            <Text>Welcome {user?.name}!</Text>
            <Button title="Settings" onPress={() => navigation.navigate('UserSettings')} />
        </View>
    );
}

export default Dashboard;
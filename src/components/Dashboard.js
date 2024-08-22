import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Text>Dashboard</Text>
            <Text>Welcome</Text>
            <Button title="Settings" onPress={() => navigation.navigate('UserSettings')} />
        </View>
    );
}

export default Dashboard;
import React from 'react';
import { View, Button } from 'react-native';
import Delete from './Delete';
import SignOut from './SignOut';
import { useNavigation } from '@react-navigation/native';

const UserSettings = () => {
    const navigation = useNavigation();

    return (
        <View>
            <SignOut />
            <Button title="Manage Subscriptions" onPress={() => navigation.navigate('PurchaseScreen')} />
            <Delete />
        </View>
    );
}

export default UserSettings;
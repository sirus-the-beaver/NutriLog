import React from 'react';
import { View } from 'react-native';
import Delete from './Delete';
import SignOut from './SignOut';

const UserSettings = () => {
    return (
        <View>
            <SignOut />
            <Delete />
        </View>
    );
}

export default UserSettings;
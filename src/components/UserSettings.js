import React from 'react';
import { View, Button } from 'react-native';
import Delete from './Delete';
import SignOut from './SignOut';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledButton = styled(Button);

const UserSettings = () => {
    const navigation = useNavigation();

    return (
        <StyledView className='flex-1 justify-center items-center bg-white'>
            <SignOut />
            <StyledButton title="Manage Subscriptions" onPress={() => navigation.navigate('Purchases')} />
            <Delete />
        </StyledView>
    );
}

export default UserSettings;
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const Dashboard = () => {
    const navigation = useNavigation();

    return (        
        <StyledView className='flex-1 justify-center items-center bg-white'>
            <StyledText className='text-xl font-bold text-blue-500'>Dashboard</StyledText>
            <StyledText className='text-lg text-gray-700'>Welcome</StyledText>
            <View style={styles.settingsButton}>
                <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
            </View>
        </StyledView>
    );
}

const styles = StyleSheet.create({
    settingsButton: {
        position: 'absolute',
        right: 10,
        top: 10
    }
})

export default Dashboard;
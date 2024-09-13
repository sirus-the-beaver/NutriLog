import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const SubscriptionInformation = ({ route }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [subscriptionData, setSubscriptionData] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        setSubscriptionData(route.params.customerInfo.activeSubscriptions);
    }, [route.params]);

    const handleManageSubscription = async () => {
        navigation.navigate('Purchases');
    }

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <StyledView className='flex-1 justify-center items-center bg-white'>
            <StyledText className='text-xl font-bold text-blue-500'>Subscription Information</StyledText>
            {subscriptionData && (
                <StyledText>{subscriptionData}</StyledText>
            )}
            <Button title="Manage Subscription" onPress={handleManageSubscription} />
        </StyledView>
    );
};

export default SubscriptionInformation;
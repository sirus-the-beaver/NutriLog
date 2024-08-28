import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SubscriptionInformation = ({ route }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [subscriptionData, setSubscriptionData] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        setSubscriptionData(route.params.customerInfo.activeSubscriptions);
    }, [route.params]);

    const handleManageSubscription = async () => {
        navigation.navigate('PurchaseScreen');
    }

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <View>
            <Text>Subscription Information</Text>
            {subscriptionData && (
                <Text>{subscriptionData}</Text>
            )}
            <Button title="Manage Subscription" onPress={handleManageSubscription} />
        </View>
    );
};

export default SubscriptionInformation;
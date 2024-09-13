import React from 'react';
import { Button, Text, View, ActivityIndicator, Linking, Platform } from 'react-native';
import usePurchase from '../hooks/usePurchase';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const PurchaseScreen = () => {
  const { customerInfo, offerings, isLoading, purchaseProduct, restorePurchases, checkSubscription } = usePurchase();
  const navigation = useNavigation();

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  const handlePurchase = async (pkg) => {
    try {
      const result = await purchaseProduct(pkg);
      console.log('Purchase result:', result);
    } catch (error) {
      alert('Purchase failed. Please try again.');
    }
  };

  const handleRestore = async () => {
    try {
      const result = await restorePurchases();
      console.log('Restore result:', result);
    } catch (error) {
      alert('Restore failed. Please try again.');
    }
  };

  const handleCheckSubscription = async () => {
    try {
      const result = await checkSubscription();
      navigation.navigate('Subscription Information', { customerInfo: result });
    } catch (error) {
      alert('Subscription check failed. Please try again.');
    }
  };

  const openSubscriptionSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('https://apps.apple.com/account/subscriptions');
    } else {
      Linking.openURL('https://play.google.com/store/account/subscriptions');
    }
  }

  return (
    <StyledView className='flex-1 justify-center items-center bg-white p-4'>
      <StyledText className='text-xl font-bold text-blue-500 mb-4'>Welcome to the Purchase Screen</StyledText>
      {offerings && offerings.current && !customerInfo.activeSubscriptions.includes('ad_free:no-ads') && offerings.current.availablePackages.map((pkg) => (
        <Button
          key={pkg.identifier}
          title={`Buy ${pkg.product.title} for ${pkg.product.priceString}`}
          onPress={() => handlePurchase(pkg)}
        />
      ))}
      {customerInfo.activeSubscriptions.includes('ad_free:no-ads') && (          
        <Button title="Cancel Subscription" onPress={openSubscriptionSettings} />
      )}
      <Button title="Check Active Subscription" onPress={handleCheckSubscription} />
      <Button title="Restore Purchases" onPress={handleRestore} />
    </StyledView>
  );
};

export default PurchaseScreen;

import React from 'react';
import { Button, Text, View, ActivityIndicator } from 'react-native';
import usePurchase from '../hooks/usePurchase';

const PurchaseScreen = () => {
  const { customerInfo, offerings, isLoading, purchaseProduct, restorePurchases, checkSubscription } = usePurchase();

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  const handlePurchase = async (productIdentifier) => {
    try {
      const result = await purchaseProduct(productIdentifier);
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
      console.log('Subscription result:', result);
    } catch (error) {
      alert('Subscription check failed. Please try again.');
    }
  };

  return (
    <View>
      <Text>Welcome to the Purchase Screen</Text>
      {offerings && offerings.current && offerings.current.availablePackages.map((pkg) => (
        <Button
          key={pkg.identifier}
          title={`Buy ${pkg.product.title} for ${pkg.product.priceString}`}
          onPress={() => handlePurchase(pkg.identifier)}
        />
      ))}
      <Button title="Check Subscription" onPress={handleCheckSubscription} />
      <Button title="Restore Purchases" onPress={handleRestore} />
    </View>
  );
};

export default PurchaseScreen;

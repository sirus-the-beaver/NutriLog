import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { fetchOfferings, purchasePackage, checkSubscriptionStatus } from './PurchaseService';

const PurchaseScreen = () => {
  const [offerings, setOfferings] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        const fetchedOfferings = await fetchOfferings();
        setOfferings(fetchedOfferings);
        const subscriptionStatus = await checkSubscriptionStatus();
        setIsSubscribed(subscriptionStatus);
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };

    initialize();
  }, []);

  const handlePurchase = async (packageIdentifier) => {
    try {
      await purchasePackage(packageIdentifier);
      alert('Purchase successful!');
    } catch (error) {
      alert('Purchase failed. Please try again.');
    }
  };

  return (
    <View>
      <Text>Offerings:</Text>
      {offerings && offerings.current && offerings.current.availablePackages.map(pkg => (
        <Button key={pkg.identifier} title={`Buy ${pkg.product.title}`} onPress={() => handlePurchase(pkg.identifier)} />
      ))}
      <Text>Subscription Status: {isSubscribed ? "Active" : "Inactive"}</Text>
    </View>
  );
};

export default PurchaseScreen;

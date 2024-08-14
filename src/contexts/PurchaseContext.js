import React, { createContext, useState, useEffect } from 'react';
import { fetchOfferings, purchasePackage, handlePurchases, checkSubscriptionStatus } from '../backend/services/PurchaseService';

const PurchaseContext = createContext();

export const PurchaseProvider = ({ children }) => {
  const [offerings, setOfferings] = useState(null);
  const [purchaserInfo, setPurchaserInfo] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        const fetchedOfferings = await fetchOfferings();
        setOfferings(fetchedOfferings);
        const info = await handlePurchases();
        setPurchaserInfo(info);
        const subscriptionStatus = await checkSubscriptionStatus();
        setIsSubscribed(subscriptionStatus);
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };

    initialize();
  }, []);

  return (
    <PurchaseContext.Provider value={{ offerings, purchaserInfo, isSubscribed, purchasePackage }}>
      {children}
    </PurchaseContext.Provider>
  );
};

export default PurchaseContext;

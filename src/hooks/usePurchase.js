import React, { useState, useEffect } from 'react';
import Purchases from 'react-native-purchases';

const usePurchase = () => {
    const [customerInfo, setCustomerInfo] = useState(null);
    const [offerings, setOfferings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const info = await Purchases.getCustomerInfo();
                const offerings = await Purchases.getOfferings();
                setCustomerInfo(info);
                setOfferings(offerings);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const purchaseProduct = async (productIdentifier) => {
        try {
            const purchase = await Purchases.purchasePackage(productIdentifier);
            return purchase;
        } catch (error) {
            console.error('Error purchasing product:', error);
            throw error;
        }
    };

    const restorePurchases = async () => {
        try {
            const restored = await Purchases.restorePurchases();
            return restored;
        } catch (error) {
            console.error('Error restoring purchases:', error);
            throw error;
        }
    };

    const checkSubscription = async () => {
        try {
            const purchaserInfo = await Purchases.getCustomerInfo();
            return purchaserInfo;
        } catch (error) {
            console.error('Error checking subscription:', error);
            throw error;
        }
    }

    return {
        customerInfo,
        offerings,
        isLoading,
        purchaseProduct,
        restorePurchases,
        checkSubscription,
    };
};

export default usePurchase;

import React, { useState, useEffect } from 'react';
import Purchases from 'react-native-purchases';

const usePurchase = () => {
    const [customerInfo, setCustomerInfo] = useState(null);
    const [offerings, setOfferings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdFree, setIsAdFree] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const info = await Purchases.getCustomerInfo();
                console.log('Customer Info:', info);
                const offerings = await Purchases.getOfferings();
                setCustomerInfo(info);
                setOfferings(offerings);
                if (info.activeSubscriptions.includes('ad_free:no-ads')) {
                    setIsAdFree(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        const purchaserListener = (info) => {
            setCustomerInfo(info);
            if (info.activeSubscriptions.includes('ad_free:no-ads')) {
                setIsAdFree(true);
            } else {
                setIsAdFree(false);
            }
        }

        Purchases.addCustomerInfoUpdateListener(purchaserListener);

        const intervalId = setInterval(fetchData, 5 * 60 * 1000);

        return () => {
            Purchases.removeCustomerInfoUpdateListener(purchaserListener);
            clearInterval(intervalId);
        }
    }, []);

    const purchaseProduct = async (pkg) => {
        try {
            const { customerInfo } = await Purchases.purchasePackage(pkg);
            if (customerInfo.entitlements.active.length > 0) {
                console.log('Entitlements:', purchaserInfo.entitlements.active);
            }
            const appUserId = customerInfo.originalAppUserId;
            
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
        isAdFree,
        purchaseProduct,
        restorePurchases,
        checkSubscription,
    };
};

export default usePurchase;

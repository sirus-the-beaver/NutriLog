import React, { useStae, useEffect } from 'react';
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
            const purchase = await Purchases.purchaseProduct(productIdentifier);
            return purchase;
        } catch (error) {
            console.error('Error purchasing product:', error);
            throw error;
        }
    };

    const restorePurchases = async () => {
        try {
            const restored = await Purchases.restoreTransactions();
            return restored;
        } catch (error) {
            console.error('Error restoring purchases:', error);
            throw error;
        }
    };

    return {
        customerInfo,
        offerings,
        isLoading,
        purchaseProduct,
        restorePurchases,
    };
};

export default usePurchase;

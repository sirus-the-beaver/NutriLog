import Purchases from 'react-native-purchases';

const API_KEY = 'goog_ZVgoTQjElgRxXLhcNGtcLkzqCBR';
Purchases.configure({apiKey: API_KEY});

export const fetchOfferings = async () => {
    try {
        const offerings = await Purchases.getOfferings();
        return offerings;
    } catch (e) {
        console.error(e);
        throw error;
    }
};

export const purchasePackage = async (packageId) => {
    try {
        const { purchaseInfo, product } = await Purchases.purchasePackage(packageId);
        return { purchaseInfo, product };
    } catch (e) {
        console.error(e);
        throw error;
    }
};

export const handlePurchases = async () => {
    try {
        const purchaserUserInfo = await Purchases.getPurchaserInfo();
        return purchaserUserInfo;
    } catch (e) {
        console.error(e);
        throw error;
    }
};

export const checkSubscriptionStatus = async () => {
    try {
        const purchaserInfo = await Purchases.getPurchaserInfo();
        const isActive = purchaserInfo.activeSubscriptions.length > 0;
        return isActive;
    } catch (e) {
        console.error(e);
        throw error;
    }
};
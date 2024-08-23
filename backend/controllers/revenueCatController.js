const User = require('../models/User');

// Handle initial purchase event
async function handleInitialPurchase(event) {
    const { app_user_id, product_id, purchased_at_ms, expiration_at_ms, id, store, presented_offering_id } = event.event;
    const userId = app_user_id;

    try {
        const user = await User.findOne({ appUserId: userId });

        if (user) {
            user.subscription = {
                productId: product_id,
                purchaseDate: new Date(purchased_at_ms),
                expiryDate: new Date(expiration_at_ms),
                originalTransactionID: id,
                store: store,
                presentedOfferingId: presented_offering_id,
                status: 'active',
            };
            await user.save();
            console.log('User subscription updated:', user);
        } else {
            console.log('User not found:', userId);
        }
    } catch (error) {
        console.error('Error updating user subscription:', error);
    }
}

// Handle renewal event
async function handleRenewal(event) {
    const { app_user_id, product_id, purchased_at_ms, expiration_at_ms, id, store, presented_offering_id } = event.event;
    const userId = app_user_id;

    try {
        const user = await User.findOne({ appUserId: userId });

        if (user && user.subscription.productId === product_id) {
            user.subscription.expiryDate = new Date(expiration_at_ms);
            user.subscription.originalTransactionID = id;
            user.subscription.store = store;
            user.subscription.presentedOfferingId = presented_offering_id;
            user.purchaseDate = new Date(purchased_at_ms);
            await user.save();
            console.log('User subscription renewed:', user);
        } else {
            console.log('User not found or subscription does not match:', userId);
        }
    } catch (error) {
        console.error('Error renewing user subscription:', error);
    }
};

// Handle cancellation event
async function handleCancellation(event) {
    const { app_user_id, product_id, purchased_at_ms, expiration_at_ms, id, store, presented_offering_id } = event.event;
    const userId = app_user_id;

    try {
        const user = await User.findOne({ appUserId: userId });

        if (user && user.subscription.productId === product_id) {
            user.subscription.status = 'cancelled';
            user.subscription.expiryDate = new Date(expiration_at_ms);
            user.subscription.originalTransactionID = id;
            user.subscription.store = store;
            user.subscription.presentedOfferingId = presented_offering_id;
            user.purchaseDate = new Date(purchased_at_ms);
            await user.save();
            console.log('User subscription cancelled:', user);
        } else {
            console.log('User not found or subscription does not match:', userId);
        }
    } catch (error) {
        console.error('Error cancelling user subscription:', error);
    }
};

exports.handleRevenueCatWebhook = async (req, res) => {
    try {
        const event = req.body.event;

        console.log('Received RevenueCat event:', event);

        switch (event.event) {
            case 'INITIAL_PURCHASE':
                await handleInitialPurchase(event);
                break;

            case 'RENEWAL':
                await handleRenewal(event);
                break;

            case 'CANCELLATION':
                await handleCancellation(event);
                break;

            default:
                console.log('Unknown event type:', event.event);
        }

        res.status(200).send('Event processed successfully');
    } catch (error) {
        console.error('Error processing event:', error);
        res.status(500).send('Error processing event');
    }
};
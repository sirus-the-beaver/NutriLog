const User = require('../models/User');

// Handle initial purchase event
async function handleInitialPurchase(event) {
    const { subscriber, product_id } = event;
    const userId = subscriber.original_app_user_id;

    try {
        const user = await User.findById(userId);

        if (user) {
            user.subscription = {
                productId: product_id,
                purchaseDate: new Date(subscriber.original_purchase_date),
                expiryDate: new Date(subscriber.expiration_at),
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
    const { subscriber, product_id } = event;
    const userId = subscriber.original_app_user_id;

    try {
        const user = await User.findById(userId);

        if (user && user.subscription.productId === product_id) {
            user.subscription.expiryDate = new Date(subscriber.expiration_at);
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
    const { subscriber, product_id } = event;
    const userId = subscriber.original_app_user_id;

    try {
        const user = await User.findById(userId);

        if (user && user.subscription.productId === product_id) {
            user.subscription.status = 'cancelled';
            user.subscription.expiryDate = new Date(subscriber.expiration_at);
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
        const event = req.body;

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
import React, { useEffect, useState} from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const clearSession = async () => {
    try {
        await AsyncStorage.removeItem('user');
    } catch (error) {
        console.error(error);
    }
}

const SignOut = ({ navigation }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                setIsSignedIn(true);
            }
        }
        checkSession();
    }, []);

    const handleSignOut = async () => {
        try {
            await clearSession();
            setIsSignedIn(false);
            navigation.navigate('SignIn');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
            {isSignedIn && <Button title="Sign Out" onPress={handleSignOut} />}
        </View>
    );
}

export default SignOut;
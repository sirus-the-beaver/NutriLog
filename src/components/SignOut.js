import React, { useEffect, useState} from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const clearSession = async () => {
    try {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
    } catch (error) {
        console.error(error);
    }
}

const SignOut = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const navigation = useNavigation();

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
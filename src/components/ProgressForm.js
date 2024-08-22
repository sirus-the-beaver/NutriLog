import React, { useEffect, useState} from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignOut from './SignOut';
import { useNavigation } from '@react-navigation/native';

const ProgressForm = () => {
    const [weight, setWeight] = useState('');
    const [bodyFat, setBodyFat] = useState('');
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await AsyncStorage.getItem('user');
            const userToken = await AsyncStorage.getItem('token');
            if (user) {
                setUserId(user);
                setToken(userToken);
            }
        };
        fetchUser();
    }, []);

    const handleProgress = async () => {
        try {
            const fullData = {
                user: userId,
                weight: weight,
                body_fat: bodyFat,
                date: new Date(),
            }
            await axios.post('https://nutrilog-app-ed72f4c84fc2.herokuapp.com/api/progress', fullData,
                { headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            navigation.navigate('ProgressList');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <SignOut />
            <Text>Progress</Text>
            <TextInput
                placeholder="Weight"
                value={weight}
                onChangeText={setWeight}
            />
            <TextInput
                placeholder="Body Fat"
                value={bodyFat}
                onChangeText={setBodyFat}
            />
            <Button title="Submit" onPress={handleProgress} />
        </View>
    );
};

export default ProgressForm;
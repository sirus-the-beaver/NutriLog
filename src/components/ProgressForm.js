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
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                setUserId(user);
            }
        };
        fetchUser();
    }, []);

    const handleProgress = async () => {
        try {
            const fullData = {
                user: userId,
                weight: weight,
                bodyFat: bodyFat,
                date: new Date(),
            }
            await axios.post('http://172.20.10.4:5008/api/progress', fullData);
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
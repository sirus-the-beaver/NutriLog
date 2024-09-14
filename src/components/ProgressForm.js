import React, { useEffect, useState} from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';

const StyledView = styled(View);

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
        <StyledView className='flex-1 p-4'>
            <TextInput
                style={styles.input}
                placeholder="Weight"
                value={weight}
                onChangeText={setWeight}
            />
            <TextInput
                style={styles.input}
                placeholder="Body Fat"
                value={bodyFat}
                onChangeText={setBodyFat}
            />
            <Button title="Submit" onPress={handleProgress} />
        </StyledView>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
});

export default ProgressForm;
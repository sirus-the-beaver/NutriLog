import React, { useState, useEffect } from 'react';
import { View, Button, Text, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const ExerciseLogForm = () => {
    const [exercise, setExercise] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [calories, setCalories] = useState('');
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

    const handleExerciseLog = async () => {
        try {
            const fullData = {
                user: userId,
                exercise: exercise,
                hours: hours,
                minutes: minutes,
                calories_burned: calories,
                date: new Date(),
            }
            await axios.post('https://nutrilog-app-ed72f4c84fc2.herokuapp.com/api/exerciseLog', 
                fullData,
                { headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
                }
            );
            navigation.navigate('ExerciseLogList');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <StyledView className='flex-1 p-4'>
            <TextInput
                style={styles.input}
                placeholder="Exercise"
                value={exercise}
                onChangeText={setExercise}
            />
            <TextInput
                style={styles.input}
                placeholder="Hours"
                value={hours}
                onChangeText={setHours}
            />
            <TextInput
                style={styles.input}
                placeholder="Minutes"
                value={minutes}
                onChangeText={setMinutes}
            />
            <TextInput
                style={styles.input}
                placeholder="Calories"
                value={calories}
                onChangeText={setCalories}
            />
            <Button title="Log Exercise" onPress={handleExerciseLog} />
        </StyledView>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        paddingLeft: 10,
        marginBottom: 10,
        height: 40,
        borderRadius: 5
    }
});

export default ExerciseLogForm;
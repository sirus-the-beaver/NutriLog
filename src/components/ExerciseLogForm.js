import React, { useState, useEffect } from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignOut from './SignOut';
import { useNavigation } from '@react-navigation/native';

const ExerciseLogForm = () => {
    const [exercise, setExercise] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [calories, setCalories] = useState('');
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
            await axios.post('http://172.20.10.4:5009/api/exerciseLog', fullData);
            navigation.navigate('ExerciseLogList');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <SignOut />
            <Text>Exercise Log</Text>
            <TextInput
                placeholder="Exercise"
                value={exercise}
                onChangeText={setExercise}
            />
            <TextInput
                placeholder="Hours"
                value={hours}
                onChangeText={setHours}
            />
            <TextInput
                placeholder="Minutes"
                value={minutes}
                onChangeText={setMinutes}
            />
            <TextInput
                placeholder="Calories"
                value={calories}
                onChangeText={setCalories}
            />
            <Button title="Log Exercise" onPress={handleExerciseLog} />
        </View>
    );
};

export default ExerciseLogForm;
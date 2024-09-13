import React, { useCallback, useState} from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const ExerciseLogList = () => {
    const [exerciseLogs, setExerciseLogs] = useState([]);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            const fetchExerciseLogs = async () => {
                try {
                    const user = await AsyncStorage.getItem('user');
                    const token = await AsyncStorage.getItem('token');
                    if (user) {
                        const response = await axios.get(`https://nutrilog-app-ed72f4c84fc2.herokuapp.com/api/exerciseLog/${user}`,
                            { headers: { 'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                    }
                            }
                        )
                        setExerciseLogs(response.data);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            fetchExerciseLogs();
        }, [])
    );

    const renderItem = ({ item }) => (
        <View>
            <Text>Exercise: {item.exercise}</Text>
            <Text>Duration: {item.hours} hours {item.minutes} minutes</Text>
            <Text>Calories: {item.calories}</Text>
            <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
            <Button title="Delete" onPress={() => handleDelete(item._id)} />
        </View>
    );

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://nutrilog-app-ed72f4c84fc2.herokuapp.com/api/exerciseLog/${id}`);
            setExerciseLogs(exerciseLogs.filter(log => log._id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <StyledView className='flex-1 p-4'>
            <FlatList
                data={exerciseLogs}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
            <Button title="Add Exercise" onPress={() => navigation.navigate('ExerciseLogForm')} />
        </StyledView>
    );
};

export default ExerciseLogList;
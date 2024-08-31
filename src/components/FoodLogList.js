import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SignOut from './SignOut';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { set } from 'mongoose';

const FoodLogList = () => {
    const [foodLogs, setFoodLogs] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [totalCalories, setTotalCalories] = useState(0);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            const fetchFoodLogs = async () => {
                try {
                    const user = await AsyncStorage.getItem('user');
                    const token = await AsyncStorage.getItem('token');
                    if (user) {
                        const response = await axios.get(`https://nutrilog-app-ed72f4c84fc2.herokuapp.com/api/foodLog/${user}`,
                            { headers: { 'Content-Type': 'application/json',
                                        Authorization: `Bearer ${token}`
                                        }
                        })
                        const logs = response.data.filter(log => 
                            new Date(log.date).toLocaleDateString() === selectedDate.toLocaleDateString()
                        );
                        setFoodLogs(logs);
                        const total = logs.reduce((acc, log) => acc + log.calories, 0);
                        setTotalCalories(total);
                    };
                } catch (error) {
                    console.error(error);
                }
            }
            fetchFoodLogs();
        }, [selectedDate])
    );

    const renderItem = ({ item }) => (
        <View>
            <Text>Food: {item.food}</Text>
            <Text>Calories: {item.calories}</Text>
            <Text>Total Fat: {item.total_fat} g</Text>
            <Text>Saturated Fat: {item.saturated_fat} g</Text>
            <Text>Cholesterol: {item.cholesterol} mg</Text>
            <Text>Sodium: {item.sodium} mg</Text>
            <Text>Total Carbohydrates: {item.total_carbohydrates} g</Text>
            <Text>Fiber: {item.dietary_fiber} g</Text>
            <Text>Sugar: {item.sugars} g</Text>
            <Text>Protein: {item.protein} g</Text>
            <Text>Iron: {item.iron}%</Text>
            <Button title="Delete" onPress={() => handleDelete(item._id)} />
        </View>
    );

    const handleDelete = async (id) => {
        try {
            console.log(id);
            await axios.delete(`https://nutrilog-app-ed72f4c84fc2.herokuapp.com/api/foodLog/${id}`);
            setFoodLogs(foodLogs.filter(log => log._id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
            <SignOut />
            <Text>Food Log</Text>
            <Text>Total Calories: {totalCalories}</Text>
            <Text>Date: {selectedDate.toLocaleDateString()}</Text>
            <Button title="Select Date" onPress={() => setDatePickerOpen(true)} />
            {datePickerOpen && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                        const currentDate = date || selectedDate;
                        setDatePickerOpen(false);
                        setSelectedDate(currentDate);
                    }}
                />
            )}
            <FlatList
                data={foodLogs}
                renderItem={renderItem}
                keyExtractor={item => item._id.toString()}
            />
            <Button title="Add Food" onPress={() => navigation.navigate('FoodLogForm')} />
        </View>
    );
};

export default FoodLogList;

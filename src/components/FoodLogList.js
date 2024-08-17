import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SignOut from './SignOut';
import { useNavigation } from '@react-navigation/native';

const FoodLogList = () => {
    const [foodLogs, setFoodLogs] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchFoodLogs = async () => {
            try {
                const user = await AsyncStorage.getItem('user');
                if (user) {
                    const response = await axios.get(`http://172.20.10.4:5009/api/foodLog/${user}`,
                        { headers: { 'Content-Type': 'application/json' } }
                    )
                    setFoodLogs(response.data);
                };
            } catch (error) {
                console.error(error);
            }
        }
        fetchFoodLogs();
    }, []);

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
            <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
            <Button title="Delete" onPress={() => handleDelete(item._id)} />
        </View>
    );

    const handleDelete = async (id) => {
        try {
            console.log(id);
            await axios.delete(`http://172.20.10.4:5009/api/foodLog/${id}`);
            setFoodLogs(foodLogs.filter(log => log._id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
            <SignOut />
            <Text>Food Log</Text>
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

import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, SectionList, Button, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const FoodLogList = () => {
    const [foodLogs, setFoodLogs] = useState([]);
    const [macros, setMacros] = useState({ carbs: 0, protein: 0, fat: 0 });
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
            const token = await AsyncStorage.getItem('token');
            await axios.delete(`https://nutrilog-app-ed72f4c84fc2.herokuapp.com/api/foodLog/${id}`,
                { headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            setFoodLogs(foodLogs.filter(log => log._id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    const mealLogs = [
        {title: 'Breakfast', data: foodLogs.filter(log => log.mealType === 'Breakfast')},
        {title: 'Lunch', data: foodLogs.filter(log => log.mealType === 'Lunch')},
        {title: 'Dinner', data: foodLogs.filter(log => log.mealType === 'Dinner')},
        {title: 'Snack', data: foodLogs.filter(log => log.mealType === 'Snack')}
    ];

    useEffect(() => {
        const calculateMacros = () => {
            if (foodLogs.length === 0) return;
            const macros = foodLogs.reduce((acc, log) => {
                acc.carbs += log.total_carbohydrates;
                acc.protein += log.protein;
                acc.fat += log.total_fat;
                return acc;
            }, { carbs: 0, protein: 0, fat: 0 });
            setMacros(macros);
        }
        calculateMacros();
    }, [foodLogs]);

    return (
        <StyledView className='flex-1 p-4'>
            <StyledText className='text-lg text-gray-700 mb-2'>Total Calories: {totalCalories}</StyledText>
            <StyledText className='text-lg text-gray-700 mb-2'>Date: {selectedDate.toLocaleDateString()}</StyledText>
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
            <SafeAreaView style={styles.safeArea}>
                <SectionList
                    style={styles.list}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    sections={mealLogs}
                    renderItem={renderItem}
                    keyExtractor={item => item._id.toString()}
                    renderSectionHeader={({ section: { title } }) => (
                        <View>
                            <Text>{title}</Text>
                        </View>
                    )}
                    renderSectionFooter={({ section: { title } }) => (
                        <View>
                            <Button title={`Add ${title}`} onPress={() => navigation.navigate('FoodLogForm', { meal: title })} />
                        </View>
                    )}
                />
            </SafeAreaView>
            <View>
                <Button title="Nutrition" onPress={() => navigation.navigate('Macros', { macros: macros})} />
            </View>
        </StyledView>
    );
};

const styles = StyleSheet.create({
    list: {
        marginBottom: 10
    },
    safeArea: {
        flex: 1
    }
});

export default FoodLogList;

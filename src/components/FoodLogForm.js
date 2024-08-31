import React, { useState, useEffect } from 'react';
import { View, Button, Text, Modal } from 'react-native';
import BarcodeScanner from './BarcodeScanner';
import FoodDataService from '../../backend/services/FoodDataService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignOut from './SignOut';
import { useNavigation } from '@react-navigation/native';
import { use } from '../../backend/routes/foodLogRoutes';

const FoodLogForm = ({ route }) => {
    const [isScannerVisible, setScannerVisible] = useState(false);
    const [scannedData, setScannedData] = useState(null);
    const [nutritionalInfo, setNutritionalInfo] = useState(null);
    const [mealType, setMealType] = useState('');
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        setMealType(route.params.meal);
    }, [route.params]);

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


    const handleScan = async (data) => {
        setScannerVisible(false);
        setScannedData(data);

        try {
            const foodData = await FoodDataService.getFoodData(scannedData);
            setNutritionalInfo(foodData);
            const fullData = {
                user: userId,
                foodId: 'test',
                food: foodData.name,
                calories: foodData.calories,
                total_fat: foodData.total_fat,
                saturated_fat: foodData.saturated_fat,
                cholesterol: foodData.cholesterol,
                sodium: foodData.sodium,
                total_carbohydrates: foodData.total_carbohydrates,
                dietary_fiber: foodData.dietary_fiber,
                sugars: foodData.sugars,
                protein: foodData.protein,
                iron: foodData.iron,
                meal: mealType,
                date: new Date(),
            }
            await axios.post('https://nutrilog-app-ed72f4c84fc2.herokuapp.com/api/foodLog', 
                fullData,
                { headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                    }
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <SignOut />
            <Button title="Scan Barcode" onPress={() => setScannerVisible(true)} />

            {nutritionalInfo && (
                <View>
                    <Text>Food: {nutritionalInfo.name}</Text>
                    <Text>Calories: {nutritionalInfo.calories}</Text>
                    <Text>Total Fat: {nutritionalInfo.total_fat} g</Text>
                    <Text>Saturated Fat: {nutritionalInfo.saturated_fat} g</Text>
                    <Text>Cholesterol: {nutritionalInfo.cholesterol} mg</Text>
                    <Text>Sodium: {nutritionalInfo.sodium} mg</Text>
                    <Text>Total Carbohydrates: {nutritionalInfo.total_carbohydrates} g</Text>
                    <Text>Dietary Fiber: {nutritionalInfo.dietary_fiber} g</Text>
                    <Text>Sugars: {nutritionalInfo.sugars} g</Text>
                    <Text>Protein: {nutritionalInfo.protein} g</Text>
                    <Text>Iron: {nutritionalInfo.iron}%</Text>
                </View>
            )}

            <Modal
                visible={isScannerVisible}
                transparent={true}
                onRequestClose={() => setScannerVisible(false)}
            >
                <BarcodeScanner onScan={handleScan} />
            </Modal>
            <Button title="Food Log List" onPress={() => navigation.navigate('FoodLogList')} />
        </View>
    );
};

export default FoodLogForm;
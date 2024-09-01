import React, { useState, useEffect } from 'react';
import { View, Button, Text, Modal, Alert } from 'react-native';
import BarcodeScanner from './BarcodeScanner';
import FoodDataService from '../../backend/services/FoodDataService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignOut from './SignOut';
import { useNavigation } from '@react-navigation/native';

const FoodLogForm = ({ route }) => {
    const [isScannerVisible, setScannerVisible] = useState(false);
    const [scanError, setScanError] = useState(false);
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
        if (!data) {
            setScanError(true);
            Alert.alert(
                "Scan Error",
                "Failed to scan barcode. Please try again.",
                [{ text: "OK", onPress: () => setScannerVisible(true) }]
            )
            return;
        }
        setScannerVisible(false);
        setScannedData(data);
    };

    useEffect(() => {
        const fetchFoodData = async () => {
            if (scannedData) {
                try {
                    const foodData = await FoodDataService.getFoodData(scannedData);
                    setNutritionalInfo(foodData);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchFoodData();
    }, [scannedData]);

    const addToFoodLog = async () => {
        if (nutritionalInfo) {
            const fullData = {
                user: userId,
                foodId: 'test',
                food: nutritionalInfo.name,
                calories: nutritionalInfo.calories,
                total_fat: nutritionalInfo.total_fat,
                saturated_fat: nutritionalInfo.saturated_fat,
                cholesterol: nutritionalInfo.cholesterol,
                sodium: nutritionalInfo.sodium,
                total_carbohydrates: nutritionalInfo.total_carbohydrates,
                dietary_fiber: nutritionalInfo.dietary_fiber,
                sugars: nutritionalInfo.sugars,
                protein: nutritionalInfo.protein,
                iron: nutritionalInfo.iron,
                mealType: mealType,
                date: new Date(),
            }

            try {
                await axios.post('https://nutrilog-app-ed72f4c84fc2.herokuapp.com/api/foodLog',
                    fullData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                navigation.navigate('FoodLogList');
            } catch (error) {
                console.error(error);
            }
        }
    }

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
                    <Button title="Add to Food Log" onPress={addToFoodLog} />
                </View>
            )}

            <Modal
                visible={isScannerVisible}
                transparent={true}
                onRequestClose={() => setScannerVisible(false)}
            >
                <BarcodeScanner onScan={handleScan} />
            </Modal>
            {scanError && <Text>Failed to scan barcode. Please try again.</Text>}
            <Button title="Food Log List" onPress={() => navigation.navigate('FoodLogList')} />
        </View>
    );
};

export default FoodLogForm;
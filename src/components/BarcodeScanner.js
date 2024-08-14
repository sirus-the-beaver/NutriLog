import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { CameraScreen } from 'react-native-camera-kit';
import FoodDataService from '../../backend/services/FoodDataService';

const BarcodeScanner = ({ onScan }) => {
    const [scanned, setScanned] = useState(false);
    const [nutritionalInfo, setNutritionalInfo] = useState(null);
    
    const handleBarcodeScan = async (data) => {
        setScanned(true);
        
        try {
            const foodData = await FoodDataService.getFoodData(data);
            setNutritionalInfo(foodData);
        } catch(error) {
            console.error(error);
        }
    };
    
    return (
        <View className="flex-1 items-center justify-center bg-gray-100">
            {!scanned && (
                <CameraScreen
                    actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
                    onBottomButtonPressed={() => setScanned(false)}
                    showFrame={true}
                    scanBarcode={true}
                    onReadCode={(event) => handleBarcodeScan(event.nativeEvent.codeStringValue)}
                    style={StyleSheet.absoluteFillObject}
                />
            )}
            {scanned && (
                <View className="p-4 bg-white rounded shadow-md">
                    {nutritionalInfo && (
                        <View>
                            <Text className="font-bold">Nutritional Information</Text>
                            <Text>Calories: {nutritionalInfo.calories} calories</Text>
                            <Text>Total Fat: {nutritionalInfo.total_fat} g</Text>
                            <Text>Saturated Fat: {nutritionalInfo.saturated_fat} g</Text>
                            <Text>Cholesterol: {nutritionalInfo.cholesterol} mg</Text>
                            <Text>Sodium: {nutritionalInfo.sodium} mg</Text>
                            <Text>Total Carbohydrates: {nutritionalInfo.total_carbohydrates} g</Text>
                            <Text>Dietary Fiber: {nutritionalInfo.dietary_fiber} g</Text>
                            <Text>Sugars: {nutritionalInfo.sugars} g</Text>
                            <Text>Protein: {nutritionalInfo.protein} g</Text>
                            <Text>Iron: {nutritionalInfo.iron} mg</Text>
                        </View>
                    )}
                    <Button title="Scan Another Item" onPress={() => setScanned(false)} />
                </View>
            )}
        </View>
    );
};

export default BarcodeScanner;

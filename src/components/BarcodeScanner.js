import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarcodeScan } from 'react-native-camera-kit';
import FoodDataService from '../services/FoodDataService';

const BarcodeScanner = ({ onScan }) => {
    const [scanned, setScanned] = useState(false);
    const [data, setData ] = useState('');
    const [nutritionalInfo, setNutritionalInfo] = useState(null);
    
    const handleBarcodeScan = async ({ type, data }) => {
        setScanned(true);
        setData(data)
        
        try {
            const foodData = await FoodDataService.getFoodData(data);
            setNutritionalInfo(foodData);
        } catch(error) {
            console.error(error);
        }
    };
    
    return (
        <View className="flex-1 items-center justify-center bg-gray-100">
            <BarcodeScan
                onBarcodeScan={handleBarcodeScan}
                style={StyleSheet.absoluteFillObject}
            />
            <Text className="p-4 bg-white rounded shadow-md">Scan a barcode</Text>
            {scanned && (
                <View className="p-4 bg-white rounded shadow-md">
                    <Text className="font-bold">Barcode Data</Text>
                    <Text>{data}</Text>
                    {nutritionalInfo && (
                        <View>
                            <Text className="font-bold">Nutritional Information</Text>
                            <Text>Calories: {nutritionalInfo.calories}</Text>
                            <Text>Protein: {nutritionalInfo.protein}</Text>
                            <Text>Fat: {nutritionalInfo.fat}</Text>
                            <Text>Carbohydrates: {nutritionalInfo.carbohydrates}</Text>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

export default BarcodeScanner;

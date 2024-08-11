import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarcodeScan } from 'react-native-camera-kit';

const BarcodeScanner = ({ onScan }) => {
    const [scanned, setScanned] = useState(false);
    
    const handleBarcodeScan = (event) => {
        if (!scanned) {
        setScanned(true);
        onScan(event.nativeEvent.codeStringValue);
        }
    };
    
    return (
        <View className="flex-1 items-center justify-center bg-gray-100">
            <BarcodeScan
                onBarcodeScan={handleBarcodeScan}
                style={StyleSheet.absoluteFillObject}
            />
            <Text className="p-4 bg-white rounded shadow-md">Scan a barcode</Text>
        </View>
    );
};

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
        <View style={styles.container}>
        <BarcodeScan
            onBarcodeScan={handleBarcodeScan}
            style={styles.scanner}
        />
        <Text style={styles.instructions}>Scan a barcode</Text>
        </View>
    );
};

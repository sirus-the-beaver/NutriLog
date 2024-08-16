import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CameraScreen } from 'react-native-camera-kit';

const BarcodeScanner = ({ onScan }) => {
    const handleBarcodeScan = (event) => {
        onScan(event.nativeEvent.codeStringValue);
    }

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <CameraScreen
                onReadCode={handleBarcodeScan}
                style={StyleSheet.absoluteFillObject}
                showFrame={true}
                scanBarcode={true}
            />
        </View>
    );
};

export default BarcodeScanner;
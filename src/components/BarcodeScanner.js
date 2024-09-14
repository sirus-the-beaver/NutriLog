import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { CameraScreen } from 'react-native-camera-kit';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const BarcodeScanner = ({ onScan }) => {
    const [error, setError] = useState(null);
    const [scanning, setScanning] = useState(false);

    const handleBarcodeScan = async (event) => {
        setScanning(true);
        try {
            await onScan(event.nativeEvent.codeStringValue);
            setScanning(false);
        } catch (error) {
            setError('Failed to scan barcode. Please try again.');
            setScanning(false);
        }
    }

    const checkCameraPermission = async () => {
        const result = await check(PERMISSIONS.IOS.CAMERA);
        if (result === RESULTS.DENIED) {
            request(PERMISSIONS.IOS.CAMERA);
        }
    }

    useEffect(() => {
        checkCameraPermission();
    }, []);

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <CameraScreen
                onReadCode={handleBarcodeScan}
                style={StyleSheet.absoluteFillObject}
                showFrame={true}
                scanBarcode={true}
            />
            {scanning && <Text>Scanning...</Text>}
            {error && <Text>{error}</Text>}
        </View>
    );
};

export default BarcodeScanner;
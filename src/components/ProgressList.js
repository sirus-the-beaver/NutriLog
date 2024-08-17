import React, { useEffect, useState} from 'react';
import { View, Button, FlatList, Button } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import SignOut from './SignOut';
import { useNavigation } from '@react-navigation/native';

const ProgressList = () => {
    const [progress, setProgress] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const user = await AsyncStorage.getItem('user');
                const response = await axios.get(`http://172.20.10.4:5008/api/progress/${user}`,
                    { headers: { 'Content-Type': 'application/json' } }
                )
                setProgress(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProgress();
    }, []);

    const renderItem = ({ item }) => (
        <View>
            <Text>Weight: {item.weight}</Text>
            <Text>Body Fat: {item.bodyFat}</Text>
            <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
            <Button title="Delete" onPress={() => handleDelete(item._id)} />
        </View>
    );

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://172.20.10.4:5008/api/progress/${id}`);
            setProgress(progress.filter(log => log._id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
            <SignOut />
            <Text>Progress</Text>
            <FlatList
                data={progress}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </View>
    );
};

export default ProgressList;
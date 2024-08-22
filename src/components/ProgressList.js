import React, { useCallback, useState} from 'react';
import { View, Button, FlatList, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import SignOut from './SignOut';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const ProgressList = () => {
    const [progress, setProgress] = useState([]);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            const fetchProgress = async () => {
                try {
                    const user = await AsyncStorage.getItem('user');
                    const token = await AsyncStorage.getItem('token');
                    if (user) {
                        const response = await axios.get(`https://nutrilog-app-ed72f4c84fc2.herokuapp.com/api/progress/${user}`,
                            { headers: { 'Content-Type': 'application/json',
                                        Authorization: `Bearer ${token}`
                                        }
                        }
                        )
                        setProgress(response.data);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            fetchProgress();
        }, [])
    );

    const renderItem = ({ item }) => (
        <View>
            <Text>Weight: {item.weight}</Text>
            <Text>Body Fat: {item.body_fat}</Text>
            <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
            <Button title="Delete" onPress={() => handleDelete(item._id)} />
        </View>
    );

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://nutrilog-app-ed72f4c84fc2.herokuapp.com/api/progress/${id}`);
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
            <Button title="Add Progress" onPress={() => navigation.navigate('ProgressForm')} />
        </View>
    );
};

export default ProgressList;
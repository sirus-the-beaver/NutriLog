import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const FoodLogForm = () => {
    const [foodItem, setFoodItem] = useState('');
    const [calories, setCalories] = useState(0);
    const [totalFat, setTotalFat] = useState(0);
    const [saturatedFat, setSaturatedFat] = useState(0);
    const [cholesterol, setCholesterol] = useState(0);
    const [sodium, setSodium] = useState(0);
    const [totalCarbohydrates, setTotalCarbohydrates] = useState(0);
    const [dietaryFiber, setDietaryFiber] = useState(0);
    const [sugars, setSugars] = useState(0);
    const [protein, setProtein] = useState(0);
    const [iron, setIron] = useState(0);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/foodLog', {
                user: '60b9f4b3b3b3b30015f1b3b3',
                foodId: '123456789',
                food: foodItem,
                calories,
                total_fat: totalFat,
                saturated_fat: saturatedFat,
                cholesterol,
                sodium,
                total_carbohydrates: totalCarbohydrates,
                dietary_fiber: dietaryFiber,
                sugars,
                protein,
                iron,
                date: new Date(),
            });

            setSuccess('Food log created successfully');
            setFoodItem('');
            setCalories(0);
            setTotalFat(0);
            setSaturatedFat(0);
            setCholesterol(0);
            setSodium(0);
            setTotalCarbohydrates(0);
            setDietaryFiber(0);
            setSugars(0);
            setProtein(0);
            setIron(0);
        } catch (error) {
            setError('An error occurred while creating the food log');
            console.error(error);
        }
    }

    return (
        <View>
            <Text>Food Item:</Text>
            <TextInput value={foodItem} onChangeText={setFoodItem} />
            <Text>Calories:</Text>
            <TextInput value={calories} onChangeText={setCalories} />
            <Text>Total Fat:</Text>
            <TextInput value={totalFat} onChangeText={setTotalFat} />
            <Text>Saturated Fat:</Text>
            <TextInput value={saturatedFat} onChangeText={setSaturatedFat} />
            <Text>Cholesterol:</Text>
            <TextInput value={cholesterol} onChangeText={setCholesterol} />
            <Text>Sodium:</Text>
            <TextInput value={sodium} onChangeText={setSodium} />
            <Text>Total Carbohydrates:</Text>
            <TextInput value={totalCarbohydrates} onChangeText={setTotalCarbohydrates} />
            <Text>Dietary Fiber:</Text>
            <TextInput value={dietaryFiber} onChangeText={setDietaryFiber} />
            <Text>Sugars:</Text>
            <TextInput value={sugars} onChangeText={setSugars} />
            <Text>Protein:</Text>
            <TextInput value={protein} onChangeText={setProtein} />
            <Text>Iron:</Text>
            <TextInput value={iron} onChangeText={setIron} />
            <Button title="Submit" onPress={handleSubmit} />
            {error && <Text>{error}</Text>}
            {success && <Text>{success}</Text>}
        </View>
    );
}

export default FoodLogForm;
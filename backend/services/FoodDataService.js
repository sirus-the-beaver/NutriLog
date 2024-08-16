import axios from 'axios';

OPEN_FOOD_FACTS_API_BASE_URL = 'https://world.openfoodfacts.org/api/v0/product';

const getFoodData = async (barcode) => {
    try {
        const response = await axios.get(`${OPEN_FOOD_FACTS_API_BASE_URL}/${barcode}.json`, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'NutriLog - Android - Version 1.0',
            },
        });

        const nutrients = {
            name: response.data.product["product_name"] || 'Unknown',
            calories: response.data.product.nutriments["energy-kcal_value"] || 0,
            total_fat: response.data.product.nutriments["fat"] || 0,
            saturated_fat: response.data.product.nutriments["saturated-fat"] || 0,
            cholesterol: response.data.product.nutriments["cholesterol"] || 0,
            sodium: response.data.product.nutriments["sodium_value"] || 0,
            total_carbohydrates: response.data.product.nutriments["carbohydrates"] || 0,
            dietary_fiber: response.data.product.nutriments["fiber"] || 0,
            sugars: response.data.product.nutriments["sugars"] || 0,
            protein: response.data.product.nutriments["proteins"] || 0,
            iron: response.data.product.nutriments["iron_value"] || 0,
        }
        return nutrients;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default {
    getFoodData,
};
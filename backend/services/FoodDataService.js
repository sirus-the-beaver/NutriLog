import axios from 'axios';

OPEN_FOOD_FACTS_API_BASE_URL = 'https://world.openfoodfacts.org/api/v0/product';

const getFoodData = async (barcode) => {
    try {
        const response = await axios.get(`${OPEN_FOOD_FACTS_API_BASE_URL}/${barcode}.json`, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'NutriLog',
            },
        });

        const nutrients = {
            calories: response.data.product.nutriments["energy-kcal_value"],
            total_fat: response.data.product.nutriments["fat"],
            saturated_fat: response.data.product.nutriments["saturated-fat"],
            cholesterol: response.data.product.nutriments["cholesterol"],
            sodium: response.data.product.nutriments["sodium_value"],
            total_carbohydrates: response.data.product.nutriments["carbohydrates"],
            dietary_fiber: response.data.product.nutriments["fiber"],
            sugars: response.data.product.nutriments["sugars"],
            protein: response.data.product.nutriments["proteins"],
            iron: response.data.product.nutriments["iron_value"],
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
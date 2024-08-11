import axios from 'axios';
require('dotenv').config();

const USDA_API_KEY = `${process.env.USDA_API_KEY}`;
const USDA_API_BASE_URL = 'https://api.nal.usda.gov/fdc/v1/food';

const getFoodData = async (barcode) => {
    try {
        const response = await axios.get(`${USDA_API_BASE_URL}/${barcode}?api_key=${USDA_API_KEY}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default {
    getFoodData,
};
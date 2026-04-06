import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function fetchCurrentWeather(city) {
    try {
        const response = await axios.get(`${BASE_URL}/current.json`, {
            params: {
                key: API_KEY,
                q: city,
                aqi: 'no'
            }
        });
        return response.data;
    } catch (e) {
        console.error(`api error: ${e.message}`);
        return null;
    }
}

export async function fetchForecast(city, days = 3) {
    try {
        const response = await axios.get(`${BASE_URL}/forecast.json`, {
            params: {
                key: API_KEY,
                q: city,
                days: days,
                aqi: 'no',
                alerts: 'no'
            }
        });
        return response.data;
    } catch (e) {
        console.error(`api error: ${e.message}`);
        return null;
    }
}
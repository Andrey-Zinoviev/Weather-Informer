import React, { useEffect, useState } from 'react'
import {
    View, Text, FlatList, TouchableOpacity, StyleSheet,
    ActivityIndicator, Image
} from 'react-native'
import { fetchCurrentWeather } from '../../services/weatherApi'
import { useRouter } from "expo-router";

const CITIES = ['Kyiv', 'London', 'New York', 'Tokyo', 'Paris', 'Berlin'];

// Іконки міст (заглушки, можна замінити на реальні фото)
const CITY_IMAGES = CITIES.map(() => 'https://img.icons8.com/color/96/city.png');

export default function WeatherScreen() {
    const [selectedCity, setSelectedCity] = useState('Kyiv');
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const loadWeather = async () => {
        setLoading(true);
        const data = await fetchCurrentWeather(selectedCity);
        setWeather(data);
        setLoading(false);
    }

    useEffect(() => {
        loadWeather();
    }, [selectedCity]);

    const styles = StyleSheet.create({
        container: {
            flex: 1, backgroundColor: '#fff',
            paddingTop: 50,
        },
        innerContainer: {
            paddingHorizontal: 20,
            flex: 1,
        },
        header: {
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 20,
            color: '#1a1a1a'
        },
        categoriesList: {
            flexGrow: 0,
            marginBottom: 20
        },
        categoryBtn: {
            flexDirection: 'row',
            marginRight: 10,
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            borderRadius: 20,
            paddingHorizontal: 15,
            height: 45,
        },
        categoryBtnActive: {
            backgroundColor: '#007aff'
        },
        categoryText: {
            color: '#444',
            fontWeight: '600',
        },
        selectedCategoryText: {
            color: '#fff'
        },
        weatherCard: {
            backgroundColor: '#f9f9f9',
            borderRadius: 20,
            padding: 20,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            elevation: 3,
        },
        cityName: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 5
        },
        temp: {
            fontSize: 64,
            fontWeight: '300',
            color: '#007aff'
        },
        condition: {
            fontSize: 18,
            color: '#666',
            textTransform: 'capitalize'
        },
        weatherIcon: {
            width: 100,
            height: 100
        },
        detailsBtn: {
            marginTop: 20,
            backgroundColor: '#007aff',
            paddingVertical: 12,
            paddingHorizontal: 30,
            borderRadius: 10
        },
        detailsBtnText: {
            color: '#fff',
            fontWeight: 'bold'
        },
        loaderContainer: {
            flex: 1, justifyContent: 'center', alignItems: 'center'
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.header}>WeatherInformer</Text>

                <View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={CITIES}
                        keyExtractor={(item) => item}
                        style={styles.categoriesList}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[styles.categoryBtn, selectedCity === item && styles.categoryBtnActive]}
                                onPress={() => setSelectedCity(item)}
                            >
                                <Text style={[styles.categoryText, selectedCity === item && styles.selectedCategoryText]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {loading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size='large' color='#007aff' />
                    </View>
                ) : weather ? (
                    <View style={styles.weatherCard}>
                        <Text style={styles.cityName}>{weather.location.name}</Text>
                        <Text style={styles.condition}>{weather.current.condition.text}</Text>
                        <Image 
                            source={{ uri: `https:${weather.current.condition.icon}` }} 
                            style={styles.weatherIcon} 
                        />
                        <Text style={styles.temp}>{Math.round(weather.current.temp_c)}°C</Text>
                        
                        <TouchableOpacity 
                            style={styles.detailsBtn}
                            onPress={() => {
                                router.push({
                                    pathname: '/details/[id]',
                                    params: { id: weather.location.name }
                                })
                            }}
                        >
                            <Text style={styles.detailsBtnText}>Детальніше</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Text>Дані не знайдено</Text>
                )}
            </View>
        </View>
    )
}
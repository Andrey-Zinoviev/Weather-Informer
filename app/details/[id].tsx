import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { auth, db } from '@/constants/FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { addDoc, collection } from "@firebase/firestore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { fetchCurrentWeather } from '../../services/weatherApi';

export default function WeatherDetails() {
    const { id } = useLocalSearchParams(); // id тут це назва міста
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getDetails = async () => {
            const data = await fetchCurrentWeather(id as string);
            setWeather(data);
            setLoading(false);
        };
        getDetails();
    }, [id]);

    const saveToHistory = async () => {
        try {
            await addDoc(collection(db, 'weather_history'), {
                userId: auth.currentUser?.uid,
                city: id,
                temp: weather?.current.temp_c,
                condition: weather?.current.condition.text,
                date: new Date().toISOString()
            });

            alert(`Дані про місто ${id} збережено в історію`);
            router.replace('/(tabs)/forecast'); // Перенаправляємо на вкладку з історією/прогнозом
        } catch (e: any) {
            alert(e.message);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 60
        },
        backBtn: { marginBottom: 20 },
        title: { fontSize: 32, fontWeight: 'bold', color: '#1a1a1a' },
        subtitle: { fontSize: 18, color: '#666', marginBottom: 20 },
        statsRow: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            marginVertical: 20,
            backgroundColor: '#f5f5f5',
            padding: 20,
            borderRadius: 20
        },
        statBox: { alignItems: 'center' },
        statValue: { fontSize: 20, fontWeight: 'bold', color: '#007aff' },
        statLabel: { fontSize: 14, color: '#888' },
        saveBtn: {
            backgroundColor: '#007aff',
            padding: 18,
            borderRadius: 15,
            alignItems: 'center',
            marginTop: 'auto',
            marginBottom: 20
        },
        saveBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
    });

    if (loading) return <ActivityIndicator style={{flex: 1}} size="large" />;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <Ionicons name='arrow-back' size={30} color="#007aff" />
            </TouchableOpacity>

            <Text style={styles.title}>{id}</Text>
            <Text style={styles.subtitle}>{weather?.current.condition.text}</Text>

            <View style={styles.statsRow}>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>{weather?.current.feelslike_c}°C</Text>
                    <Text style={styles.statLabel}>Відчувається</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>{weather?.current.humidity}%</Text>
                    <Text style={styles.statLabel}>Вологість</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>{weather?.current.wind_kph} км/г</Text>
                    <Text style={styles.statLabel}>Вітер</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={saveToHistory}>
                <Text style={styles.saveBtnText}>Зберегти в історію пошуку</Text>
            </TouchableOpacity>
        </View>
    );
}
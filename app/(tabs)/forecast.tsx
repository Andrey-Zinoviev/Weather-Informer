import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db, auth } from '@/constants/FirebaseConfig';
import { collection, query, where, orderBy, onSnapshot } from '@firebase/firestore';

export default function ForecastHistory() {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth.currentUser) return;

        // Запит до Firestore для отримання історії конкретного користувача
        const q = query(
            collection(db, 'weather_history'),
            where('userId', '==', auth.currentUser.uid),
            orderBy('date', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setHistory(data);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const styles = StyleSheet.create({
        container: {
            flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 50
        },
        header: {
            fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#1a1a1a'
        },
        item: {
            backgroundColor: '#f9f9f9',
            padding: 15,
            borderRadius: 12,
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        city: { fontSize: 18, fontWeight: 'bold' },
        temp: { fontSize: 20, color: '#007aff', fontWeight: 'bold' },
        date: { fontSize: 12, color: '#888' },
        emptyText: { textAlign: 'center', marginTop: 50, color: '#666' }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Історія пошуку</Text>
            
            {loading ? (
                <ActivityIndicator size="large" color="#007aff" />
            ) : (
                <FlatList
                    data={history}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <View>
                                <Text style={styles.city}>{item.city}</Text>
                                <Text style={styles.date}>
                                    {new Date(item.date).toLocaleDateString()}
                                </Text>
                            </View>
                            <Text style={styles.temp}>{Math.round(item.temp)}°C</Text>
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Ви ще не зберегли жодного прогнозу.</Text>
                    }
                />
            )}
        </View>
    );
}
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from "@/constants/FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { useRouter } from 'expo-router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const router = useRouter();

    const handleAuth = async () => {
        if (!email || !password) {
            alert('Будь ласка, заповніть усі поля');
            return;
        }

        try {
            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password);
                alert('Аккаунт створено успішно!');
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (e: any) {
            alert(`Помилка авторизації: ${e.message}`);
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        innerContainer: {
            flex: 1,
            padding: 25,
            justifyContent: 'center',
        },
        emoji: {
            fontSize: 60,
            textAlign: 'center',
            marginBottom: 10
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#1a1a1a',
            textAlign: 'center'
        },
        subtitle: {
            fontSize: 16,
            color: '#666',
            textAlign: 'center',
            marginBottom: 30
        },
        input: {
            backgroundColor: '#f5f5f5',
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
        },
        mainButton: {
            backgroundColor: '#007aff',
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
            shadowColor: '#007aff',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
        },
        buttonText: {
            color: '#fff',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 16
        },
        switchText: {
            color: '#007aff',
            textAlign: 'center'
        }
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.emoji}>☀️</Text>
                <Text style={styles.title}>{isRegistering ? "Реєстрація" : "З поверненням"}</Text>
                <Text style={styles.subtitle}>
                    {isRegistering ? "Створіть профіль WeatherInformer" : "Увійдіть, щоб дізнатися прогноз"}
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Пароль'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.mainButton} onPress={handleAuth}>
                    <Text style={styles.buttonText}>
                        {isRegistering ? "Зареєструватися" : "Увійти"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
                    <Text style={styles.switchText}>
                        {isRegistering ? "Вже є аккаунт? Увійти" : "Немає аккаунту? Створити"}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
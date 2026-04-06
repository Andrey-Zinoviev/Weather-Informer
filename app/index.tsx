import { Redirect } from 'expo-router'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { auth } from '../constants/FirebaseConfig'

export default function Index() {
    const title = 'WeatherInformer'

    // Якщо користувач вже авторизований, перекидаємо на головний екран з вкладками
    if (auth.currentUser) {
        return <Redirect href='/(tabs)' />
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1, 
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'
        },
        titleText: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#007aff',
            marginBottom: 20
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>
            <ActivityIndicator size='large' color={'#007aff'} />
        </View>
    )
}
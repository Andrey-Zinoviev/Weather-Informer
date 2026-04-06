import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { auth } from '@/constants/FirebaseConfig';
import { signOut } from "@firebase/auth";
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
    const user = auth.currentUser;

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (e: any) {
            alert(e.message);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
        },
        profileCard: {
            width: '100%',
            backgroundColor: '#f9f9f9',
            borderRadius: 20,
            padding: 30,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            elevation: 3
        },
        avatar: {
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#007aff',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20
        },
        emailText: {
            fontSize: 18,
            fontWeight: '600',
            color: '#333',
            marginBottom: 30
        },
        logoutBtn: {
            flexDirection: 'row',
            backgroundColor: '#ff3b30',
            paddingVertical: 12,
            paddingHorizontal: 25,
            borderRadius: 10,
            alignItems: 'center'
        },
        logoutText: {
            color: '#fff',
            fontWeight: 'bold',
            marginLeft: 10
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.profileCard}>
                <View style={styles.avatar}>
                    <Ionicons name="person" size={50} color="#fff" />
                </View>
                
                <Text style={styles.emailText}>{user?.email || 'Користувач'}</Text>

                <TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut}>
                    <Ionicons name="log-out-outline" size={20} color="#fff" />
                    <Text style={styles.logoutText}>Вийти з акаунту</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
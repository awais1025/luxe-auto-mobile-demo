import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { useContext } from 'react'; 
import { useRouter } from 'expo-router';
import { AuthContext } from '../contexts/AuthContext'; 

export default function HeaderUsager() {
    const { usager, logout } = useContext(AuthContext); 
    const router = useRouter();

    if (!usager) return null;

    const deconnecter = () => {
        logout(); 
        setTimeout(() => {
        router.replace('/');
        }, 100); 
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.nom}>{usager.nom}</Text>
                    <Text style={styles.langue}>Langue: {usager.langue}</Text>
                </View>
                
                <Pressable onPress={deconnecter} style={styles.btn}>
                    <Text style={styles.btnText}>Déconnecter</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { backgroundColor: '#1A1A1A' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#1A1A1A',
        alignItems: 'center'
    },
    nom: { color: 'white', fontWeight: 'bold', fontSize: 18 },
    langue: { color: 'gray', fontSize: 12 },
    btn: { backgroundColor: '#8B6F47', padding: 8, borderRadius: 5 },
    btnText: { color: 'white', fontWeight: 'bold' }
});
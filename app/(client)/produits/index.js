import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { useRouter } from 'expo-router';
import Voiture from '../../../components/Voiture';

export default function ListeProduitsClient() {
    const db = useSQLiteContext();
    const router = useRouter();
    const [produits, setProduits] = useState([]);

    const chargerProduits = async () => {
        try {
            const result = await db.getAllAsync('SELECT * FROM Produit');
            setProduits(result);
        } catch (error) {
            console.error("Erreur chargement produits :", error);
        }
    };

    useEffect(() => {
        chargerProduits();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 15 }}>Liste des Voitures</Text>
            <FlatList
                data={produits}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Voiture 
                        produit={item} 
                        onPressCard={() => router.push(`/(client)/produits/${item.id}`)}
                    />
                )}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f2f5' },
    list: { paddingVertical: 15 }
});
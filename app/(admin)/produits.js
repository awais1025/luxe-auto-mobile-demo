import { View, FlatList, StyleSheet, Alert, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { useRouter } from 'expo-router';
import Voiture from '../../components/Voiture';
import FormulaireAdmin from '../../components/formulaireAdmin';

export default function GestionAdmin() {
    const db = useSQLiteContext();
    const router = useRouter();
    const [produits, setProduits] = useState([]);

    const [formVisible, setFormVisible] = useState(false);
    const [produitSelectionne, setProduitSelectionne] = useState(null);

    const chargerProduits = async () => {
        const result = await db.getAllAsync('SELECT * FROM Produit');
        setProduits(result);
    };

    useEffect(() => {
        chargerProduits();
    }, []);

    const ouvrirAjout = () => {
        setProduitSelectionne(null);
        setFormVisible(true);
    };

    const ouvrirModification = (produit) => {
        setProduitSelectionne(produit);
        setFormVisible(true);
    };

    const supprimerProduit = async (id) => {
        Alert.alert(
            "Suppression",
            "Voulez-vous vraiment supprimer cette voiture ?",
            [
                { text: "Annuler", style: "cancel" },
                { 
                    text: "Supprimer", 
                    onPress: async () => {
                        await db.runAsync('DELETE FROM Produit WHERE id = ?', [id]);
                        chargerProduits(); 
                    }
                }
            ]
        );
    };

    const soumettreFormulaire = async (donnees) => {
        try {
            if (produitSelectionne) {
                // Modification
                await db.runAsync(
                    'UPDATE Produit SET nom = ?, description = ?, prix = ?, image = ? WHERE id = ?',
                    [donnees.nom, donnees.description, donnees.prix, donnees.image, produitSelectionne.id]
                );
            } else {
                // Ajout
                await db.runAsync(
                    'INSERT INTO Produit (nom, description, prix, image) VALUES (?, ?, ?, ?)',
                    [donnees.nom, donnees.description, donnees.prix, donnees.image]
                );
            }
            chargerProduits();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 15 }}>Gestion des Voitures</Text>
            <Pressable style={styles.btnAjouter} onPress={ouvrirAjout}>
                <Text style={styles.btnText}>Ajouter un produit</Text>
            </Pressable>
            <FlatList
                data={produits}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Voiture 
                        produit={item} 
                        onModifier={() => ouvrirModification(item)}
                        onSupprimer={() => supprimerProduit(item.id)}
                    />
                )}
            />
            <FormulaireAdmin 
                visible={formVisible} 
                onClose={() => setFormVisible(false)}
                onSubmit={soumettreFormulaire}
                produitInitial={produitSelectionne}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f2f5' },
    btnAjouter: { backgroundColor: 'green', padding: 15, margin: 15, borderRadius: 10 },
    btnText: { color: 'white', fontWeight: 'bold' },
    list: { paddingVertical: 15 }
});
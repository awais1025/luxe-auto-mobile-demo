import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext'; 
import { useSQLiteContext } from 'expo-sqlite';
import { useRouter } from 'expo-router';
import RadioButton from '../../../components/RadioButton';

export default function PageCompte() {
    const { usager, login } = useContext(AuthContext);
    const db = useSQLiteContext();
    const router = useRouter();

    const [mdp, setMdp] = useState(usager?.mdp || '');
    const [adresse, setAdresse] = useState(usager?.adresse || '');
    const [langue, setLangue] = useState(usager?.langue || 'fr');

    const enregistrerModifications = async () => {
        try {
            await db.runAsync(
                'UPDATE Client SET mdp = ?, adresse = ?, langue = ? WHERE nom = ?',
                [mdp, adresse, langue, usager.nom]
            );

            login({ ...usager, mdp, adresse, langue });
            
            Alert.alert("Succès", "Vos informations ont été mises à jour.");
        } catch (error) {
            console.error(error);
            Alert.alert("Erreur", "Impossible de sauvegarder les modifications.");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Mon Profil</Text>

                <Text style={styles.label}>Nom (non modifiable)</Text>
                <TextInput style={[styles.input, styles.disabledInput]} value={usager?.nom} editable={false} />

                <Text style={styles.label}>Mot de passe</Text>
                <TextInput style={styles.input} value={mdp} onChangeText={setMdp} secureTextEntry />

                <Text style={styles.label}>Adresse</Text>
                <TextInput style={styles.input} value={adresse} onChangeText={setAdresse} multiline />

                <Text style={styles.label}>Langue préférée</Text>
                <View style={styles.radioGroup}>
                    <RadioButton label="Fr" selected={langue === 'fr'} onSelect={() => setLangue('fr')} />
                    <RadioButton label="En" selected={langue === 'en'} onSelect={() => setLangue('en')} />
                    <RadioButton label="Auto" selected={langue === 'auto'} onSelect={() => setLangue('auto')} />
                </View>

                <Pressable style={styles.btnSave} onPress={enregistrerModifications}>
                    <Text style={styles.btnText}>Sauvegarder</Text>
                </Pressable>
            </View>

            <Pressable style={styles.btnMap} onPress={() => router.push('/(client)/compte/entrepots')}>
                <Text style={styles.btnText}> Voir nos entrepôts</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f2f5', padding: 15 },
    card: { backgroundColor: 'white', padding: 20, borderRadius: 15, elevation: 3 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#1A1A1A' },
    label: { fontSize: 14, fontWeight: 'bold', color: '#666', marginBottom: 5 },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 15, fontSize: 16 },
    disabledInput: { backgroundColor: '#f9f9f9', color: '#999' },
    radioGroup: { flexDirection: 'row', marginBottom: 20, marginTop: 5 },
    btnSave: { backgroundColor: '#8B6F47', padding: 15, borderRadius: 10, alignItems: 'center' },
    btnMap: { backgroundColor: '#1A1A1A', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 15, marginBottom: 30 },
    btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
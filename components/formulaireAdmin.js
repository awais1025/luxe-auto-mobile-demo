import { View, Text, TextInput, Pressable, StyleSheet, Modal, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';

export default function ProduitForm({ visible, onClose, onSubmit, produitInitial }) {
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState('');
    const [image, setImage] = useState(''); 

    useEffect(() => {
        if (produitInitial) {
            setNom(produitInitial.nom);
            setDescription(produitInitial.description);
            setPrix(produitInitial.prix.toString());
            setImage(produitInitial.image); 
        } else {
            setNom('');
            setDescription('');
            setPrix('');
            setImage('../images/defaultVoiture.png');
        }
    }, [produitInitial, visible]);

    const gererSoumission = () => {
        if (!nom || !prix) return;
        
        const donnees = {
            nom,
            description,
            prix: parseInt(prix),
            image
        };

        onSubmit(donnees);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <ScrollView>
                        <Text style={styles.title}>
                            {produitInitial ? "Modifier le véhicule" : "Nouveau véhicule"}
                        </Text>

                        <Text style={styles.label}>Nom du modèle</Text>
                        <TextInput 
                            style={styles.input} 
                            value={nom} 
                            onChangeText={setNom} 
                            placeholder="Ex: Porsche 911"
                        />

                        <Text style={styles.label}>Prix ($)</Text>
                        <TextInput 
                            style={styles.input} 
                            value={prix} 
                            onChangeText={setPrix} 
                            keyboardType="numeric" 
                            placeholder="Ex: 150000"
                        />

                        <Text style={styles.label}>Description</Text>
                        <TextInput 
                            style={[styles.input, styles.textArea]} 
                            value={description} 
                            onChangeText={setDescription} 
                            multiline
                            placeholder="Détails du véhicule..."
                        />


                        <View style={styles.buttonRow}>
                            <Pressable style={[styles.btn, styles.btnCancel]} onPress={onClose}>
                                <Text style={styles.btnText}>Annuler</Text>
                            </Pressable>

                            <Pressable style={[styles.btn, styles.btnSave]} onPress={gererSoumission}>
                                <Text style={styles.btnText}>Enregistrer</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '80%',
    },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: '#666' },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 15 },
    textArea: { height: 100, textAlignVertical: 'top' },
    buttonRow: { flexDirection: 'row', gap: 10, marginTop: 10, marginBottom: 20 },
    btn: { flex: 1, padding: 15, borderRadius: 10, alignItems: 'center' },
    btnSave: { backgroundColor: '#1A1A1A' },
    btnCancel: { backgroundColor: '#999' },
    btnText: { color: 'white', fontWeight: 'bold' }
});
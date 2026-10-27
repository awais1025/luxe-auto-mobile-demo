import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


const images = {
    '../images/defaultVoiture.jpg': require('../images/defaultVoiture.jpg')

}


export default function Voiture({ produit, onPressCard, onModifier, onSupprimer }) {
    const { usager } = useContext(AuthContext);
    const isAdmin = usager?.admin === 1 || usager?.admin === true;

    const imageSource = images[produit.image] || require('../images/defaultVoiture.jpg');

    return (
        <Pressable 
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={onPressCard}
        >
            <Image source={imageSource} style={styles.image} resizeMode="cover" />
            
            <View style={styles.infoContainer}>
                <Text style={styles.nom} numberOfLines={1}>{produit.nom}</Text>
                <Text style={styles.prix}>{produit.prix.toLocaleString('fr-CA')} $</Text>


                {isAdmin && (
                    <View style={styles.adminActionRow}>
                        <Pressable style={styles.btnModifier} onPress={onModifier}>
                            <Text style={styles.btnText}>Modifier</Text>
                        </Pressable>
                        
                        <Pressable style={styles.btnSupprimer} onPress={onSupprimer}>
                            <Text style={styles.btnText}>Supprimer</Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginHorizontal: 10,
    },
    cardPressed: { opacity: 0.9 },
    image: { width: '100%', height: 150, backgroundColor: '#f0f0f0' },
    infoContainer: { padding: 12, alignItems: 'center' },
    nom: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 4 },
    prix: { fontSize: 14, color: '#8B6F47', fontWeight: '600', marginBottom: 10 },
    
    adminActionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 10,
    },
    btnModifier: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
    },
    btnSupprimer: {
        flex: 1,
        backgroundColor: '#A33333',
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
    },
    btnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 14 }
});
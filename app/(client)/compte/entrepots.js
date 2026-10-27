import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import MapView, { Marker, Circle, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

import trajetData from '../../../assets/trajet.json';

export default function PageEntrepot() {
    const [entrepoteSelectionne, setEntrepoteSelectionne] = useState(null);

    const entrepots = [
        { id: 1, nom: 'Entrepôt Saint-Eustache', lat: 45.5580, lon: -73.8905 },
        { id: 2, nom: 'Entrepôt Laval', lat: 45.5750, lon: -73.7500 },
        { id: 3, nom: 'Entrepôt Montréal', lat: 45.5017, lon: -73.5673 },
        { id: 4, nom: 'Entrepôt Terrebonne', lat: 45.7000, lon: -73.6500 },
        { id: 5, nom: 'Entrepôt Blainville', lat: 45.6700, lon: -73.8800 },
    ];

    // MODIFICATION : Coordonnées précises du Cégep Lionel-Groulx
    const maMaison = { lat: 45.6405, lon: -73.8415 };

    return (
        <View style={styles.container}>
            {/* SECTION 25% (Haut) : Liste des entrepôts */}
            <View style={styles.listeContainer}>
                <Text style={styles.titreSection}>Nos Entrepôts</Text>
                
                {/* MODIFICATION : ScrollView vertical (horizontal a été retiré) */}
                <ScrollView showsVerticalScrollIndicator={true}>
                    <View style={styles.boutonsCol}>
                        {entrepots.map((e) => (
                            <Pressable 
                                key={e.id} 
                                style={[
                                    styles.btnEntrepot, 
                                    entrepoteSelectionne === e.id && styles.btnActif 
                                ]}
                                onPress={() => setEntrepoteSelectionne(e.id)}
                            >
                                <Text style={[
                                    styles.txtEntrepot,
                                    // Change la couleur du texte si sélectionné pour qu'on le lise bien sur le fond foncé
                                    entrepoteSelectionne === e.id && styles.txtActif
                                ]}>{e.nom}</Text>
                            </Pressable>
                        ))}
                    </View>
                </ScrollView>
            </View>

            {/* SECTION 75% (Bas) : La Carte */}
            <View style={styles.mapContainer}>
                <MapView 
                    provider={PROVIDER_GOOGLE} 
                    style={styles.map}
                    initialRegion={{
                        // Centré un peu plus près du Cégep pour bien voir le trajet vers Blainville
                        latitude: 45.6500,
                        longitude: -73.8600,
                        latitudeDelta: 0.08,
                        longitudeDelta: 0.08,
                    }}
                >
                    {entrepots.map((e) => (
                        <React.Fragment key={e.id}>
                            <Marker 
                                coordinate={{ latitude: e.lat, longitude: e.lon }}
                                title={e.nom}
                                onPress={() => setEntrepoteSelectionne(e.id)}
                            >
                                {/* Image conservée selon tes modifications */}
                                <Image 
                                    source={require('../../../images/logo.jpg')} 
                                    style={styles.mapIcon} 
                                />
                            </Marker>
                            
                            <Circle 
                                center={{ latitude: e.lat, longitude: e.lon }}
                                radius={5000}
                                fillColor="rgba(139, 111, 71, 0.2)"
                                strokeColor="#8B6F47"
                            />
                        </React.Fragment>
                    ))}

                    <Marker coordinate={{ latitude: maMaison.lat, longitude: maMaison.lon }} title="Cégep Lionel-Groulx">
                        {/* Image conservée selon tes modifications */}
                        <Image 
                            source={require('../../../images/maison.png')} 
                            style={styles.mapIconHome} 
                        />
                    </Marker>

                    {/* Tracé de Lionel-Groulx vers l'entrepôt de Blainville */}
                    <Polyline 
                        coordinates={trajetData}
                        strokeColor="#1A1A1A"
                        strokeWidth={4}
                    />
                </MapView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'column' },
    listeContainer: { 
        flex: 0.25, 
        backgroundColor: '#fff', 
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    mapContainer: { flex: 0.75 },
    map: { width: '100%', height: '100%' },
    titreSection: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#1A1A1A' },
    
    // MODIFICATION : Style pour empiler les boutons à la verticale
    boutonsCol: { flexDirection: 'column', gap: 10, paddingBottom: 20 },
    btnEntrepot: { 
        paddingVertical: 12, 
        paddingHorizontal: 15, 
        borderRadius: 8, 
        backgroundColor: '#f0f0f0',
        width: '100%' // S'assure que le bouton prend toute la largeur
    },
    btnActif: { backgroundColor: '#8B6F47' },
    txtEntrepot: { fontSize: 14, fontWeight: '500', color: '#333' },
    txtActif: { color: '#fff' }, // Texte blanc pour le bouton actif
    
    mapIcon: { width: 35, height: 35, resizeMode: 'contain' },
    mapIconHome: { width: 40, height: 40, resizeMode: 'contain' }
});
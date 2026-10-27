import { useSearchParams } from 'expo-router/build/hooks';
import { useSQLiteContext } from 'expo-sqlite';
import { StyleSheet, View, Text, Image, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import RadioButton from '../components/RadioButton';

const HomePage = () => {
    let db = useSQLiteContext();

    const { login } = useContext(AuthContext);

    const router = useRouter();

    if (!db) return null;
    async function ajouter() {
        try {
            const result = await db.runAsync('INSERT INTO Client (nom, mdp, admin, adresse, langue) VALUES (?, ?, ?, ?, ?)', [nom, mdp, 0, adresse, langue]);
            console.log("Client ajouté avec succès !");

            setNom("");
            setMdp("");
            setAdresse("");
            setLangue("");
            setInscription(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout du client :", error);
        }
    }
    async function connecter() {
        try {
            const result = await db.getFirstAsync('SELECT * FROM Client WHERE nom = ? AND mdp = ?', [nom, mdp]);
            if (result) {
                Alert.alert("Succès", "Connexion réussie !");
                login(result);
                setNom("");
                setMdp("");
                if (result.admin === 1) {
                    router.replace("/(admin)/produits");
                } else {
                    router.replace("/(client)/produits");
                }
            }
            else {
                console.log("Nom d'utilisateur ou mot de passe incorrect.");
                Alert.alert("Erreur", "Nom d'utilisateur ou mot de passe incorrect.");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
        }
    }
    const [inscription, setInscription] = useState(false);
    const [nom, setNom] = useState("");
    const [mdp, setMdp] = useState("");
    const [adresse, setAdresse] = useState("");
    const [langue, setLangue] = useState("auto");
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.bannerContainer}>
                    <Image
                        source={require("../images/logo.jpg")}
                        style={styles.bannerImage}
                    />
                </View>

                <View style={styles.contentWrapper}>
                    <Text style={styles.title}>Automobiles de luxe</Text>

                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nom d'utilisateur"
                            placeholderTextColor="#999"
                            value={nom}
                            onChangeText={setNom}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe"
                            secureTextEntry={true}
                            placeholderTextColor="#999"
                            value={mdp}
                            onChangeText={setMdp}
                        />

                        {inscription && (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Adresse"
                                    placeholderTextColor="#999"
                                    value={adresse}
                                    onChangeText={setAdresse}
                                />
                                <Text style={styles.label}>Langue de l'application</Text>
                                <View style={styles.radioGroup}>
                                    <RadioButton label="Fr" selected={langue === 'fr'} onSelect={() => setLangue('fr')} />
                                    <RadioButton label="En" selected={langue === 'en'} onSelect={() => setLangue('en')} />
                                    <RadioButton label="Auto" selected={langue === 'auto'} onSelect={() => setLangue('auto')} />
                                </View>
                            </>
                        )}

                        <View style={styles.buttonRow}>

                            <Pressable
                                style={({ pressed }) => [
                                    styles.customButton,
                                    pressed && styles.buttonPressed
                                ]}
                                onPress={() => {
                                    if (!inscription) {
                                        setInscription(true);
                                    } else {
                                        ajouter();

                                    }
                                }}
                            >
                                <Text style={styles.buttonText}>S'inscrire</Text>
                            </Pressable>

                            <Pressable
                                style={({ pressed }) => [
                                    styles.customButton,
                                    pressed && styles.buttonPressed
                                ]}
                                onPress={() => connecter()}
                            >
                                <Text style={styles.buttonText}>Se connecter</Text>
                            </Pressable>

                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f2f5",
    },
    bannerContainer: {
        width: '100%',
        height: 180,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,

        elevation: 3,
        marginTop: 20,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: "contain",
    },
    contentWrapper: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 40,
        color: "#8B6F47",
        textAlign: "center",
        letterSpacing: 1,
    },
    formContainer: {
        width: "100%",
        maxWidth: 360,
        alignItems: 'center',
    },
    input: {
        width: "100%",
        height: 55,
        backgroundColor: "#ffffff",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 18,
        marginBottom: 18,
        fontSize: 16,
        color: "#333",
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    customButton: {
        width: '48%',
        backgroundColor: '#1A1A1A',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    buttonPressed: {
        opacity: 0.7,
    },
    radioGroup: { flexDirection: 'row', marginBottom: 25, marginTop: 5, justifyContent: 'flex-start' }
});

export default HomePage;
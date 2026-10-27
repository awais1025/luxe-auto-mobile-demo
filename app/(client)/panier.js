import { View, Text, StyleSheet } from 'react-native';

export default function PagePanier() {
    return (
        <View style={styles.container}>
            <Text>Bienvenue au panier</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#f0f2f5'
    },

});
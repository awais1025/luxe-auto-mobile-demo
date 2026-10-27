import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function RadioButton({ label, selected, onSelect }) {
    return (
        <Pressable style={styles.container} onPress={onSelect}>
            <View style={styles.circle}>
                {selected && <View style={styles.selectedDot} />}
            </View>
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginRight: 15 },
    circle: { height: 20, width: 20, borderRadius: 10, borderWidth: 2, borderColor: '#8B6F47', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
    selectedDot: { height: 10, width: 10, borderRadius: 5, backgroundColor: '#8B6F47' },
    label: { fontSize: 16 }
});
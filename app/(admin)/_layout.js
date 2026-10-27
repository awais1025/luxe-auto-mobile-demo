import { Stack } from 'expo-router';
import HeaderUsager from '../../components/HeaderUsager'; 


export default function AdminLayout() {
    return (
        <Stack screenOptions={{ header: () => <HeaderUsager /> }}>
            <Stack.Screen name="produits" />
        </Stack>
    );
}
import { Stack } from 'expo-router';
import HeaderUsager from '../../../components/HeaderUsager';

export default function ProduitsLayout() {
  return (
    <Stack screenOptions={{ headerShown:false}}>
      <Stack.Screen name="index" />
      
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
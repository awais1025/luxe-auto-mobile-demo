import { Stack } from 'expo-router';

export default function CompteLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen 
        name="index" 
        options={{ 
            title: 'Mon Profil' 
        }}
      />
      <Stack.Screen 
        name="entrepot" 
        options={{ 
            title: 'Nos Entrepôts' 
        }} 
      />
    </Stack>
  );
}
import { Tabs } from 'expo-router';
import HeaderUsager from '../../components/HeaderUsager';
import { Ionicons } from '@expo/vector-icons'; // Importation de la bibliothèque d'icônes

export default function ClientLayout() {
  return (
    <Tabs
      screenOptions={{header: () => <HeaderUsager />,headerShown: true,}}>
      <Tabs.Screen name="produits" options={{ tabBarLabel: 'Produits',
          tabBarIcon: ({ color, size }) => (<Ionicons name="car" size={size} color={color} />),
          }}/>
      <Tabs.Screen name="panier" options={{tabBarLabel: 'Panier',
          tabBarIcon: ({ color, size }) => (<Ionicons name="cart" size={size} color={color} />),
        }}/>
      <Tabs.Screen name="compte" options={{tabBarLabel: 'Compte',
          tabBarIcon: ({ color, size }) => (<Ionicons name="person" size={size} color={color} />),
        }}/>
    </Tabs>
  );
}
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { HomeScreen } from '../features/home/HomeScreen';
import { ScannerScreen } from '../features/scanner/ScannerScreen';
import { DetailsScreen } from '../features/pokedex/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#f44336' }, // Rojo Pokémon
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'PokéDex' }} />
        {/* <Stack.Screen name="Scanner" component={ScannerScreen} options={{ title: 'Escáner de Campo' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Datos de la Pokédex' }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
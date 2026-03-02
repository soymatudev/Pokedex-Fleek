import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { IntroScreen } from '../features/intro/IntroScreen';
import { HomeScreen } from '../features/home/HomeScreen';
import { ScannerScreen } from '../features/scanner/ScannerScreen';
import { DetailsScreen } from '../features/pokedex/DetailsScreen';
import { PokedexListScreen } from '../features/pokedex/PokedexListScreen';

const Stack = createNativeStackNavigator();

export default function AppRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{
          headerStyle: { backgroundColor: '#f44336' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'PokéDex' }} />
        <Stack.Screen name="Scanner" component={ScannerScreen} options={{ title: 'Escáner de Campo' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Datos de la Pokédex' }} />
        <Stack.Screen name="PokedexList" component={PokedexListScreen} options={{ title: 'Lista de Pokémon' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
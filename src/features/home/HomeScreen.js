import React, { use, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme/theme';
import { useSound } from '../../hooks/useSound';

export const HomeScreen = ({ navigation }) => {
    const { setupRouteOne } = useSound();
    const [backgroundMusic, setBackgroundMusic] = useState(null);

    useEffect(() => {
        setupRouteOne(setBackgroundMusic);
        return () => {
            if (backgroundMusic) {
                backgroundMusic.unloadAsync();
            }
        };
    }, []);

    return (
        <ImageBackground
            source={require('../../../assets/img/home_background.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <View style={styles.contentOverlay}>
                <View style={styles.header}>
                    <Text style={styles.title}>DEXTER v1.0</Text>
                    <Text style={styles.subtitle}>SISTEMA DE IDENTIFICACIÓN POKÉMON</Text>
                </View>

                <View style={styles.menuContainer}>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => navigation.navigate('Scanner')}
                    >
                        <Text style={styles.buttonIcon}></Text>
                        <Text style={styles.buttonText}>📷 ESCANEAR OBJETIVO</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.menuButton, styles.buttonSecondary]}
                        onPress={() => navigation.navigate('PokedexList')}
                    >
                        <Text style={styles.buttonIcon}>📕</Text>
                        <Text style={styles.buttonText}>VER REGISTROS</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.statusBadge}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>SISTEMA ONLINE</Text>
                </View>

            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    // Contenedor sobre la imagen (Oscurece un poco el fondo)
    contentOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)', // Negro al 50% de opacidad
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight + 20, // Espacio para la barra de estado
        paddingBottom: 40,
    },
    // ... Tus estilos actuales para header, title, menuButton, etc ...
    header: {
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: 2,
        textShadowColor: 'black', // Sombra de texto para legibilidad extra
        textShadowRadius: 10,
    },
    subtitle: {
        color: theme.colors.border, // Usamos el rojo de tu tema
        fontSize: 12,
        marginTop: 5,
        fontWeight: 'bold',
    },
    menuContainer: {
        width: '80%',
        gap: 20,
    },
    menuButton: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        elevation: 10,
    },
    buttonSecondary: {
        backgroundColor: 'rgba(255,255,255,0.2)', // Botón más sutil
        borderWidth: 1,
        borderColor: '#fff',
    },
    buttonText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 15,
    },
    buttonIcon: {
        fontSize: 24,
    }
});

//export default HomeScreen;
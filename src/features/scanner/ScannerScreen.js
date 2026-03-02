import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar, Linking } from 'react-native';
import { Camera, useCameraDevice, useFrameProcessor, useCodeScanner } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import { theme } from '../../theme/theme';
import { runAtJS } from 'react-native-worklets-core';
import { Worklets } from 'react-native-worklets-core';
import ImageColors from 'react-native-image-colors';
import { POKEMON_DB } from './pokedexData';
import { Vibration } from 'react-native';

const hexToHue = (hex) => {
    if (!hex || hex.length < 6) return 0;
    const cleanHex = hex.startsWith('#') ? hex : `#${hex}`;

    let r = parseInt(cleanHex.slice(1, 3), 16) / 255;
    let g = parseInt(cleanHex.slice(3, 5), 16) / 255;
    let b = parseInt(cleanHex.slice(5, 7), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, d = max - min;

    if (d === 0) h = 0;
    else if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else if (max === b) h = (r - g) / d + 4;

    return Math.round(h * 60);
};

export const ScannerScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [detectedPokemon, setDetectedPokemon] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const isFocused = useIsFocused();
    const device = useCameraDevice('back');
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: async (codes) => {
            e
            if (isProcessing || detectedPokemon || codes.length === 0) return;

            setIsProcessing(true);

            try {
                const id = codes[0].value;
                console.log("Analizando objetivo...");

                const photo = await cameraRef.current.takePhoto({
                    flash: 'off',
                    skipMetadata: true
                });

                const result = await ImageColors.getColors(photo.path, { fallback: '#000000' });
                const detectedHex = result.platform === 'android' ? result.dominant : result.background;
                const hue = hexToHue(detectedHex);

                const match = Object.values(POKEMON_DB).find(p =>
                    hue >= p.colorRange.hueMin && hue <= p.colorRange.hueMax
                );

                if (match) {
                    setDetectedPokemon(match);
                    console.log("Match encontrado:", match.name);

                    setTimeout(() => {
                        console.log("Navegando a detalles de:", match.name, "con ID:", match.id);
                        navigation.navigate('Details', { pokemonId: match.id });
                    }, 1000);
                } else {
                    console.log("Color no reconocido.");
                    setTimeout(() => setIsProcessing(false), 2000);
                }

            } catch (error) {
                console.error("Error:", error);
                setIsProcessing(false);
            }
        }
    });

    const handleManualScan = async () => {
        if (isProcessing) return;
        Vibration.vibrate(70);
        setIsProcessing(true);

        try {
            const photo = await cameraRef.current.takePhoto({ flash: 'off', skipMetadata: true });
            const result = await ImageColors.getColors(photo.path, { fallback: '#000000' });
            const detectedHex = result.platform === 'android' ? result.dominant : result.background;
            const hue = hexToHue(detectedHex);

            const potentialMatches = Object.values(POKEMON_DB).filter(p =>
                hue >= p.colorRange.hueMin && hue <= p.colorRange.hueMax
            );

            if (potentialMatches.length > 0) {
                const randomIndex = Math.floor(Math.random() * potentialMatches.length);
                const match = potentialMatches[randomIndex];

                setDetectedPokemon(match);

                if (match) {
                    Vibration.vibrate([0, 100, 50, 100]);
                } else {
                    Vibration.vibrate(400);
                }

                setTimeout(() => {
                    navigation.navigate('Details', { pokemonId: match.id, themeColor: match.uiTheme });
                    setIsProcessing(false);
                    setDetectedPokemon(null);
                }, 500);
            } else {
                alert("No se detectó ADN Pokémon conocido en este objeto.");
                setIsProcessing(false);
            }
        } catch (error) {
            console.error(error);
            Vibration.vibrate(400);
            setIsProcessing(false);
        }
    };

    if (!hasPermission) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Dexter necesita permisos de cámara</Text>
                <TouchableOpacity onPress={() => Linking.openSettings()} style={styles.backButton}>
                    <Text style={{ color: 'white' }}>ABRIR AJUSTES</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (device == null) return <ActivityIndicator size="large" style={styles.center} />;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {isFocused && (
                <Camera
                    ref={cameraRef}
                    codeScanner={codeScanner}
                    device={device}
                    isActive={true}
                    style={StyleSheet.absoluteFill}
                    photo={true}
                />
            )}

            <View style={styles.overlay}>

                {/* 1. VISOR CENTRAL (Retícula) */}
                <View style={styles.reticleContainer}>
                    <View style={styles.reticle}>
                        <View style={styles.reticleDot} />
                    </View>
                    <Text style={styles.reticleText}>CENTRAR OBJETIVO</Text>
                </View>

                {/* 2. BOTÓN DE ESCANEO (Pokéball Style) */}
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={[
                            styles.pokeballButton,
                            isProcessing && { borderColor: theme.colors.primary, elevation: 20 }
                        ]}
                        onPress={handleManualScan}
                        disabled={isProcessing}
                    >
                        <View style={[
                            styles.pokeballInnerRing,
                            isProcessing && { borderColor: '#fff' }
                        ]}>
                            {isProcessing ? (
                                <ActivityIndicator color="#333" />
                            ) : (
                                <View style={styles.pokeballCenterBtn} />
                            )}
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.scanBtnLabel}>
                        {isProcessing ? "ANALIZANDO..." : "ESCANEAR ADN"}
                    </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
    errorText: { color: 'white', marginBottom: 20, fontSize: 16 },
    loadingText: { color: 'white', marginTop: 10 },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    scanArea: {
        width: 280,
        height: 280,
        justifyContent: 'center',
        alignItems: 'center',
    },
    corner: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderColor: theme.colors.primary,
    },
    topLeft: { top: 0, left: 0, borderTopWidth: 5, borderLeftWidth: 5 },
    topRight: { top: 0, right: 0, borderTopWidth: 5, borderRightWidth: 5 },
    bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 5, borderLeftWidth: 5 },
    bottomRight: { bottom: 0, right: 0, borderBottomWidth: 5, borderRightWidth: 5 },
    scanLine: {
        width: '90%',
        height: 2,
        backgroundColor: theme.colors.primary,
        shadowColor: theme.colors.primary,
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 15,
    },
    instructionsContainer: {
        position: 'absolute',
        bottom: 100,
        alignItems: 'center',
    },
    instructionText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 2,
        textShadowColor: 'black',
        textShadowRadius: 10,
    },
    subInstructionText: {
        color: theme.colors.primary,
        fontSize: 12,
        marginTop: 5,
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    closeIcon: { color: 'white', fontSize: 20, fontWeight: 'bold' },
    backButton: { backgroundColor: theme.colors.primary, padding: 12, borderRadius: 8 },
    resultBadge: {
        backgroundColor: theme.colors.primary,
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    resultText: {
        color: 'white',
        fontWeight: 'bold',
    },
    loadingOverlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
    },
    loadingText: {
        color: theme.colors.primary,
        fontWeight: 'bold',
        marginTop: 10,
        letterSpacing: 1,
    },
    reticle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 4,
        height: 4,
        backgroundColor: theme.colors.primary,
        borderRadius: 2,
    },
    reticleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    reticle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
    },
    reticleDot: {
        width: 6,
        height: 6,
        backgroundColor: theme.colors.primary,
        borderRadius: 3,
    },
    reticleText: {
        color: '#fff',
        fontSize: 10,
        marginTop: 10,
        letterSpacing: 2,
        fontWeight: 'bold',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 40,
        alignItems: 'center',
    },
    pokeballButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
        borderWidth: 4,
        borderColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    pokeballInnerRing: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        borderWidth: 15,
        borderColor: '#ff1c1c', // Rojo Pokéball
        justifyContent: 'center',
        alignItems: 'center',
    },
    pokeballCenterBtn: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: '#333',
    },
    buttonDisabled: {
        opacity: 0.5,
        backgroundColor: '#ccc',
    },
    scanBtnLabel: {
        color: '#fff',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 12,
        letterSpacing: 1,
    }
});
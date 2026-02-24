import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgUri } from 'react-native-svg'; // Recuerda: npx expo install react-native-svg
import { theme } from '../../theme/theme';
import { useDexterVoice } from '../../hooks/useDexterVoice';
import { useSound } from '../../hooks/useSound';

export const DetailsScreen = ({ route }) => {
    const { pokemonId } = route.params;
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const { hablarEntrada } = useDexterVoice();
    const { playSound } = useSound();

    useEffect(() => {
        const fetchFullData = async () => {
            try {
                const [resData, resSpecies] = await Promise.all([
                    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`),
                    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
                ]);

                const data = await resData.json();
                const species = await resSpecies.json();

                const entry = species.flavor_text_entries.find(e => e.language.name === 'es');
                const description = entry ? entry.flavor_text.replace(/\f/g, ' ') : "Datos no encontrados.";

                const processedData = {
                    name: data.name.toUpperCase(),
                    //\image: data.sprites.other.dream_world.front_default,
                    cries: data.cries.legacy, //latest legacy
                    image: data.sprites.front_default,
                    type: data.types[0].type.name,
                    weight: data.weight / 10,
                    height: data.height / 10,
                    description: description
                }

                setPokemon(processedData);
                setLoading(false);
                await playSound(processedData.cries);
                setTimeout(() => {
                    hablarEntrada(description, data.name);
                }, 800);


            } catch (error) {
                console.error("Error en la conexión con la PokéAPI", error);
            }
        };
        fetchFullData();
    }, [pokemonId]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={{ marginTop: 10, color: theme.colors.textSecondary }}>Accediendo a la base de datos...</Text>
            </View>
        );
    }

    const typeColor = theme.colors.types[pokemon.type] || theme.colors.primary;

    return (
        <ScrollView style={[styles.container, { backgroundColor: typeColor }]}>
            <SafeAreaView>
                <View style={styles.imageContainer}>
                    {/* <SvgUri width="250" height="250" uri={pokemon.image} /> */}
                    <Image
                        source={{ uri: pokemon.image }}
                        style={styles.pixelArt}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.nameText}>{pokemon.name}</Text>

                    <View style={[styles.typeBadge, { backgroundColor: typeColor }]}>
                        <Text style={styles.typeText}>{pokemon.type.toUpperCase()}</Text>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <TouchableOpacity
                                style={styles.soundButton}
                                onPress={() => playSound(pokemon.cries)} // Tu función de sonido
                                activeOpacity={0.7}
                            >
                                <Text style={styles.soundIcon}>🔊</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{pokemon.weight} kg</Text>
                            <Text style={styles.statLabel}>PESO</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{pokemon.height} m</Text>
                            <Text style={styles.statLabel}>ALTURA</Text>
                        </View>
                    </View>

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionText}>"{pokemon.description}"</Text>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    infoCard: {
        backgroundColor: theme.colors.surface,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30,
        minHeight: 500,
        alignItems: 'center'
    },
    nameText: {
        fontSize: 32,
        fontWeight: '900',
        color: theme.colors.text,
        marginBottom: 10
    },
    typeBadge: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 25
    },
    typeText: { color: '#fff', fontWeight: 'bold' },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 20
    },
    statBox: { alignItems: 'center' },
    statValue: { fontSize: 18, fontWeight: 'bold' },
    statLabel: { color: theme.colors.textSecondary, fontSize: 12 },
    descriptionContainer: { paddingHorizontal: 10 },
    descriptionText: {
        fontSize: 18,
        lineHeight: 26,
        textAlign: 'center',
        fontStyle: 'italic',
        color: theme.colors.text
    },
    pixelArt: {
        width: 288,
        height: 288,
        // Este estilo ayuda a que los pixeles no se vean borrosos en algunas plataformas
        imageScaling: 'pixelated',
        imageRendering: 'pixelated',
        //imageRendering: 'crisp-edges',
        resizeMode: 'cover',
        resizeMode: "stretch"
        //resizeMethod: "scale"
    },
    buttonSound: {
        position: 'absolute',
        right: 20,
        top: -25, // Lo hacemos "flotar" en el borde entre la imagen y la tarjeta
        backgroundColor: theme.colors.accent, // Amarillo Pikachu para que resalte
        width: 55,
        height: 55,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        borderWidth: 3,
        borderColor: '#fff',
        soundIcon: {
            fontSize: 24,
        }
    }
});

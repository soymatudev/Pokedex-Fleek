import React, { useEffect, useState, useRef } from 'react';
import {
    View, Text, Animated, TouchableOpacity, StyleSheet,
    ActivityIndicator, Image, Dimensions
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme/theme';

const { height } = Dimensions.get('window');
const ITEM_SIZE = 120;

export const PokedexListScreen = ({ navigation }) => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);

    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(res => res.json())
            .then(data => {
                const formattedList = data.results.map((item, index) => ({
                    name: item.name,
                    id: index + 1,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
                }));
                setPokemonList(formattedList);
                setLoading(false);
            });
    }, []);

    const renderItem = ({ item, index }) => {
        const itemPosition = index * ITEM_SIZE;

        const inputRange = [
            itemPosition - height,
            itemPosition - height / 2,
            itemPosition + height / 3,
        ];

        const translateX = scrollY.interpolate({
            inputRange,
            outputRange: [100, 0, 100],
            extrapolate: 'clamp',
        });

        const scale = scrollY.interpolate({
            inputRange,
            outputRange: [0.8, 1.1, 0.8],
            extrapolate: 'clamp',
        });

        const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View
                style={[
                    styles.cardContainer,
                    {
                        transform: [{ translateX }, { scale }],
                        opacity
                    }
                ]}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.card}
                    onPress={() => navigation.navigate('Details', { pokemonId: item.id })}
                >
                    <View style={styles.idContainer}>
                        <Text style={styles.idText}>#{String(item.id).padStart(3, '0')}</Text>
                    </View>
                    <Text style={styles.pokeName}>{item.name.toUpperCase()}</Text>
                    <Image source={{ uri: item.image }} style={styles.pokeImage} />
                </TouchableOpacity>
            </Animated.View>
        );
    };

    if (loading) return (
        <View style={styles.loader}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Círculo decorativo (Pokéball central) */}
            <View style={styles.pokeballDecorator} />

            <Animated.FlatList
                data={pokemonList}
                keyExtractor={(item) => item.id.toString()}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                renderItem={renderItem}
                contentContainerStyle={styles.listPadding}
                snapToInterval={ITEM_SIZE}
                decelerationRate="fast"
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#aaa'
    },
    listPadding: {
        paddingVertical: 50,
        paddingRight: 10,
    },
    pokeballDecorator: {
        position: 'absolute',
        left: 250,
        top: height / 2 - 160,
        width: 320,
        height: 320,
        borderRadius: 160,
        borderWidth: 12,
        borderColor: 'rgba(244, 67, 54, 0.15)',
        zIndex: -1
    },
    card: {
        backgroundColor: theme.colors.surface,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 45,
        borderLeftWidth: 12,
        borderLeftColor: theme.colors.primary,
        width: '75%',
        elevation: 4,
        justifyContent: 'space-between',
    },
    info: { flex: 1, marginLeft: 10 },
    idText: { fontSize: 12, color: theme.colors.primary, fontWeight: 'bold' },
    pokeName: { fontSize: 18, fontWeight: '900', color: theme.colors.text },
    pokeImage: { width: 70, height: 70 }
});

export default PokedexListScreen;
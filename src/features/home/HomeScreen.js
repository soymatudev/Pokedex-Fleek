import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme/theme';

export const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                {/* Logo / Header */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoEmoji}>🔴</Text>
                    </View>
                    <Text style={styles.title}>
                        POKÉDEX <Text style={{ color: theme.colors.primary }}>Fleek</Text>
                    </Text>
                    <Text style={styles.subtitle}>
                        Sistema de reconocimiento de especies v1.0.2
                    </Text>
                </View>

                {/* Botones de Acción */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Scanner')}
                        style={styles.primaryButton}
                    >
                        <Text style={styles.primaryButtonText}>📷 ESCANEAR CAMPO</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('PokedexList')}
                        style={styles.secondaryButton}
                    >
                        <Text style={styles.secondaryButtonText}>📑 VER REGISTROS</Text>
                    </TouchableOpacity>
                </View>

                {/* Status Bar Inferior */}
                <View style={styles.statusBadge}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>SISTEMA ONLINE</Text>
                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    container: {
        flex: 1,
        paddingHorizontal: theme.spacing.lg,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
    },
    logoContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: theme.colors.surface,
        borderWidth: 4,
        borderColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
    },
    logoEmoji: {
        fontSize: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        marginTop: theme.spacing.md,
        color: theme.colors.text,
    },
    subtitle: {
        textAlign: 'center',
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.sm,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        width: '100%',
        gap: theme.spacing.md,
    },
    primaryButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: theme.colors.surface,
        paddingVertical: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: theme.colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.border,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: 6,
        borderRadius: theme.borderRadius.full,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4caf50',
        marginRight: 8,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '600',
        color: theme.colors.textSecondary,
    }
});

//export default HomeScreen;
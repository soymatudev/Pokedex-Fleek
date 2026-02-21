import React, { useState, useEffect, useCallback } from 'react';

import { View, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from "@react-navigation/native";

export const HomeScreen = ({ navigation }) => {

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Text style={styles.title}>HomeScreen</Text>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        letterSpacing: -0.5,
    },
})
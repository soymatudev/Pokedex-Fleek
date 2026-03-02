import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useSound } from '../../hooks/useSound';
import { Audio } from 'expo-av';

export const IntroScreen = ({ navigation }) => {

    useEffect(() => {
        let soundObject = new Audio.Sound();
        async function playIntro() {
            await soundObject.loadAsync(require('../../../assets/sounds/intro_theme.mp3'));
            await soundObject.playAsync();

            setTimeout(() => {
                soundObject.stopAsync();
                navigation.replace('Home');
            }, 15500);
        }

        playIntro();
        return () => soundObject.unloadAsync();
    }, []);

    return (
        <View style={styles.introContainer}>
            <Image source={require('../../../assets/img/pokedex_logo.png')} style={styles.logo} />
            <ActivityIndicator color="red" size="large" />
            <Text style={styles.introText}>INICIALIZANDO SISTEMA DEXTER...</Text>
        </View>
    );
};

const styles = {
    introContainer: {
        flex: 1,
        backgroundColor: '#f44336',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 100,
        marginBottom: 30,
    },
    introText: {
        marginTop: 20,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
}

import { Audio } from 'expo-av';

export const useSound = () => {
    const playSound = async (uri) => {
        try {
            const { sound } = await Audio.Sound.createAsync({ uri });
            await sound.playAsync();
        } catch (error) {
            console.error("Error al reproducir el audio:", error);
        }
    };

    async function setupRouteOne(setBackgroundMusic) {
        try {
            // Configuración para que el audio suene incluso en modo silencio (opcional)
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                staysActiveInBackground: false,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
            });

            const { sound } = await Audio.Sound.createAsync(
                require('./../../assets/sounds/route1_loop.mp3'),
                {
                    shouldPlay: true,
                    isLooping: true,
                    volume: 0.2
                }
            );
            setBackgroundMusic(sound);
        } catch (error) {
            console.log("Error cargando música de fondo", error);
        }
    }

    function playIntro() {
        let soundObject = new Audio.Sound();
        soundObject.loadAsync(require('./../../assets/sounds/intro_theme.mp3'));
        soundObject.playAsync();

        // Esperamos 4 segundos y vamos al Home


        return soundObject;
    }

    return { playSound, setupRouteOne, playIntro };
}
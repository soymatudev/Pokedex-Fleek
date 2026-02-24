
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
    return { playSound };
}
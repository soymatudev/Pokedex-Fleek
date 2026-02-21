import * as Speech from 'expo-speech';

export const useDexterVoice = () => {
  const hablarEntrada = (texto, nombrePokemon) => {
    
    const textoLimpio = texto.replace(/\f/g, ' ');
    const mensajeCompleto = `${nombrePokemon}. ${textoLimpio}`;

    const options = {
      language: 'es-MX', // Español Latino
      pitch: 1.15,      // Un poco más agudo para ese toque robótico/juvenil
      rate: 1.1,       // Un poco más lento para claridad analítica
    };

    Speech.speak(mensajeCompleto, options);
  };

  const detenerVoz = () => {
    Speech.stop();
  };

  return { hablarEntrada, detenerVoz };
};
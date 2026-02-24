// src/theme/theme.js

export const theme = {
    colors: {
      // Colores de Marca (Estética Pokédex Clásica)
      primary: '#f44336',       // Rojo principal
      primaryDark: '#b71c1c',   // Rojo oscuro para bordes
      secondary: '#3b4cca',     // Azul para botones/acentos
      accent: '#ffde00',        // Amarillo para resaltar (Pikachu)
      
      // Interfaz de Usuario Limpia
      background: '#f5f5f5',    // Gris muy claro para el fondo
      surface: '#ffffff',       // Blanco para tarjetas y modales
      text: '#212121',          // Gris casi negro para lectura
      textSecondary: '#757575', // Gris medio para subtítulos
      border: '#e0e0e0',        // Gris claro para líneas divisorias
  
      // Colores Funcionales (Feedback de Sistema)
      success: '#4caf50',
      error: '#d32f2f',
      warning: '#ff9800',
      info: '#2196f3',
  
      // Modo Escáner (Retro-Tech / Visión Artificial)
      scanner: {
        grid: 'rgba(0, 255, 0, 0.3)',    // Rejilla verde tipo radar
        overlay: 'rgba(0, 0, 0, 0.6)',   // Oscurecer bordes de cámara
        target: '#00e5ff',              // Cyan eléctrico para el visor central
        scanLine: '#ff0000',            // Línea roja de escaneo láser
      },
  
      // Colores por Tipo (Basados en los juegos oficiales)
      // Útiles para: theme.colors.types[pokemon.type]
      types: {
        grass: '#78c850',
        fire: '#f08030',
        water: '#6890f0',
        bug: '#a8b820',
        normal: '#a8a878',
        poison: '#a040a0',
        electric: '#f8d030',
        ground: '#e0c068',
        fairy: '#ee99ac',
        fighting: '#c03028',
        psychic: '#f85888',
        rock: '#b8a038',
        ghost: '#705898',
        ice: '#98d8d8',
        dragon: '#7038f8',
        steel: '#b8b8d0',
        dark: '#705848',
        flying: '#a890f0',
      }
    },
  
    // Sistema de espaciado (Basado en múltiplos de 8 para diseño móvil)
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },
  
    // Radios de borde para consistencia visual
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 16,
      xl: 24,
      full: 9999,
    }
  };
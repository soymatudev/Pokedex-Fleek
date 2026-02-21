# 📱 PokéDex Fleek: AI & Color Detection Project

Proyecto de Pokédex avanzada desarrollada con React Native y TensorFlow.js. El objetivo es identificar objetos o seres vivos a través de la cámara, extraer sus colores predominantes y mapearlos a un Pokémon del universo original (Gen 1) mediante lógica de proximidad cromática.


## 🚀 Vision del Proyecto

A diferencia de una Pokédex tradicional de búsqueda manual, este sistema actúa como una herramienta de investigación de campo (Pokémon Go):

- Detección: Usa modelos de visión artificial para clasificar el objetivo (Persona, Animal, Planta, Objeto).

- Análisis: Calcula el color predominante del objetivo en el espacio de color CIELAB.

- Matching: Utiliza la Distancia Euclidiana para encontrar el Pokémon con el color más cercano.

- Feedback: La voz de "Dexter" (Héctor Emmanuel Gómez) narra la entrada de la Pokédex mediante TTS (Text-to-Speech).

## 🛠 Stack Tecnológico

| Capa        | Tecnología                                   |
|-------------|----------------------------------------------|
| Framework   | Expo (Development Builds)                    |
| Navegación  | React Navigation 7                           |
| AI / Vision | TensorFlow.js + vision-camera-tflite       |
| Cámara      | react-native-vision-camera (V4)             |
| API         | PokéAPI (v2)                                |
| Voz         | expo-speech (Configurado para Español Latino) |
| UI          | NativeWind (Tailwind CSS) + react-native-svg |

## 🏗 Arquitectura de Software (Feature-Based)
El proyecto sigue una estructura desacoplada para separar la lógica de negocio de la renderización nativa:

```text
src/
├── api/             # Clientes de red (Axios/Fetch) y definiciones de la PokeAPI.
├── assets/          # Recursos estáticos (Audios, Sprites locales, Fuentes).
├── components/      # UI atómica (PokeCard, CameraOverlay, CustomButton).
├── features/        # Módulos de dominio.
│   ├── pokedex/     # Lógica de listado y filtrado.
│   └── scanner/     # Implementación de TensorFlow, Frame Processors y Lógica de Color.
├── hooks/           # "Service Layer" (usePokedex, useColorMatcher, useDexterVoice).
├── navigation/      # Stack & Tab Navigators (AppRouter.js).
├── services/        # Lógica pura / Helpers (EuclideanDistance.js, ColorConverter.js).
└── store/           # Gestión de estado global (Zustand).
```

## 📐 Algoritmo de Matching (Euclidean Distance)

Para encontrar el Pokémon más parecido cromáticamente, implementamos el cálculo de distancia en un espacio tridimensional:$$d = \sqrt{(L_2 - L_1)^2 + (A_2 - A_1)^2 + (B_2 - B_1)^2}$$

- Nota: Se utiliza el espacio LAB en lugar de RGB para una mayor precisión perceptual humana.

## 🗺 Roadmap de Desarrollo
- [ ] Fase 1: Setup de Arquitectura y Navegación Base.

- [ ] Fase 2: Integración de expo-speech y consumo de pokemon-species de PokéAPI.

- [ ] Fase 3: Implementación de Cámara y visualización de SVGs.

- [ ] Fase 4: Integración de modelo TensorFlow Lite y lógica de colores.

- [ ] Fase 5: Pulido de UI (Animaciones con moti o reanimated).

## 📝 Comandos Útiles

npx expo prebuild: Para generar los archivos nativos de iOS/Android.

npx expo run:android: Para ejecutar la Development Build en dispositivo real (necesario para la cámara).

## Developer
```
soymatudev

*De fan para fans ❤️*
```
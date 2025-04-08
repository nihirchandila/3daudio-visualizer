# Audio-Reactive Blob Visualizer (Three.js + GLSL)

This project is an interactive audio-reactive blob animation built using **Three.js** and **GLSL shaders**. It visualizes audio tracks in real-time using vertex displacement powered by Perlin noise and frequency data from an audio analyser. Users can switch tracks, and the blob responds to beats and changes color dynamically.

## Features

- Real-time audio visualization using Web Audio API.
- Fully responsive and adjusts camera zoom based on screen size.
- Vertex deformation and color shift via custom GLSL shaders.
- Track switcher with multiple audio inputs.
- Bloom effect using `UnrealBloomPass` for a glowing aesthetic.
- Interactive orbit controls.

## Technologies Used

- [Three.js]
- GLSL (Custom vertex & fragment shaders)
- Web Audio API
- OrbitControls
- UnrealBloomPass (for glow effect)

## how to setup
- npm i vite-plugin-glsl three 
- npm run dev
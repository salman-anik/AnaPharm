# 3D Human Anatomy Explorer (React Native / Expo)

A cross-platform mobile application built with **React Native** and **Expo** that brings interactive 3D human anatomy exploration, physiological simulation, clinical pathologies, solutions, fitness advice, and medications to iOS and Android.

## 🚀 Features

- **Interactive 3D Viewport**: High-performance WebGL / Three.js 3D anatomy rendering with touch orbit, zoom, pan, and raycast tap selection.
- **Bilingual Experience**:
  - **All UI buttons, tabs, headers, and controls** are in **English**.
  - **All medical details** (overview, functions, clinical facts, diseases, medical solutions, fitness tips, and medications) are provided in comprehensive **Bangla (বাংলা)**.
- **Full Clinical Dossier**:
  - ⚠️ **Diseases & Conditions** (specific pathologies for each organ)
  - 🩺 **Solutions & Medical Treatments** (clinical procedures, tests, interventions)
  - 🌿 **How to Keep Fit & Healthy** (dietary guidelines, preventative habits)
  - 💊 **Common Medications & Clinical Care** (first-line drug classes and disclaimer)
- **5 Native Tab Screens**:
  1. **3D Model**: Interactive viewport with vitals HUD (BPM/RPM) and focus region chips.
  2. **Systems**: Hierarchical breakdown of all anatomical systems and their organs.
  3. **Search**: Real-time multi-field search across English names, Bangla names, and Latin terms.
  4. **Quiz**: Interactive clinical anatomy challenge with score tracking and explanations.
  5. **Settings**: Apple Health-style cards for Themes, Auto-rotate, X-Ray, Physiology sliders, and Exploded view.

## 📦 How to Run

1. Open terminal inside the project folder:
   ```bash
   cd react-native-anatomy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npx expo start
   ```

4. Press:
   - `a` to open on an Android emulator or scan QR code in Expo Go app.
   - `i` to open on an iOS simulator.
   - `w` to open web preview in browser.

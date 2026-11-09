# AnaPharm – 3D Human Anatomy & Medicine Database

<p align="center">
  <img src="assets/icon.png" alt="AnaPharm Logo" width="120" />
</p>

<h3 align="center">Explore Anatomy. Understand Physiology. Discover Medicine.</h3>

<p align="center">
  An interactive 3D human anatomy and pharmaceutical reference application featuring anatomical exploration, physiological simulations, disease information, and a comprehensive Bangladesh medicine database.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Android-brightgreen?style=for-the-badge&logo=android" />
  <img src="https://img.shields.io/badge/React_Native-0.88.1-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Expo-58-black?style=for-the-badge&logo=expo" />
  <img src="https://img.shields.io/badge/Version-1.0.0-blueviolet?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Release-v3.5-teal?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Typography-Hind_Siliguri-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Language-Bangla%20%7C%20English-orange?style=for-the-badge" />
</p>

<p align="center">
  <a href="https://github.com/salman-anik/AnaPharm">GitHub Repository</a> •
  <a href="https://github.com/salman-anik/AnaPharm/issues">Report an Issue</a> •
  <a href="https://github.com/salman-anik/AnaPharm/releases">Releases</a>
</p>

---

## Overview

**AnaPharm** is a mobile educational application that combines interactive 3D human anatomy with pharmaceutical information in one platform.

It is designed for students, medical learners, healthcare enthusiasts, and anyone interested in understanding the human body and discovering medicine information.

Instead of using separate applications for anatomy exploration and medicine references, AnaPharm brings these learning resources together.

### Key Highlights

- Interactive 3D human anatomy exploration.
- Anatomical dissection and layered visualization.
- Animated heart and lung simulations.
- Blood circulation visualization.
- Human body systems and disease information.
- Extensive pharmaceutical database.
- Bangladesh commercial medicine brand database.
- Bangla and English language support with Hind Siliguri typography.
- Endemic and common clinical diseases of Bangladesh with brand treatments.
- Opening screen with instant Medicine & Brand search and English Pharma suggestions.
- Light mode default with persistent settings across app restarts.
- Standalone offline Android Release APK.

---

## Features

### 1. Interactive 3D Human Anatomy

Explore the human body through an interactive 3D visualization experience.

- Full-body anatomical model.
- Detailed exploration of major body regions.
- 360-degree rotation.
- Pinch-to-zoom and camera navigation.
- Interactive camera controls.
- X-ray visualization mode.
- Automatic model rotation.

### 2. Physiological Simulations

Understand basic human physiological processes through animated simulations.

| Simulation | Description |
|---|---|
| Heart Simulation | Animated heartbeat with adjustable BPM |
| Lung Simulation | Respiratory expansion and contraction |
| Blood Circulation | Animated blood particles representing circulation |

### 3. 3D Anatomical Dissection

Explore anatomical structures through layered 3D visualization.

- Anatomical layer separation.
- Exploded disassembly visualization.
- Normal-vector-based separation.
- Interactive 3D navigation.

### 4. Human Body Systems

Explore different human body systems and their anatomical structures through organized educational information.

### 5. Diseases Information

Discover disease-related educational information and explore connections between diseases and relevant medicines.

### 6. Bangladesh Medicine Database

AnaPharm includes a structured pharmaceutical reference database covering generic medicines and commercial medicine brands available in Bangladesh.

| Database | Records |
|---|---:|
| Generic Medicines | 2,594 |
| Commercial Medicine Brands | 33,200+ |

Medicine information includes:

- Generic medicine names.
- Medical indications in Bangla.
- Mechanisms of action in Bangla.
- Dosage guidelines.
- Precautions and warnings.
- Potential side effects.
- Commercial medicine brand names in Bangladesh.

### 7. Modern User Interface

- Premium mobile interface.
- OLED-friendly dark mode.
- Light mode.
- Bangla and English support.
- Adjustable font sizes.
- Smooth navigation.
- Responsive layouts.

---

## Screenshots

Add application screenshots here as the project develops.

```text
assets/
├── screenshots/
│   ├── anatomy.png
│   ├── systems.png
│   ├── diseases.png
│   ├── medicine.png
│   └── settings.png
```

---

## Technology Stack

| Technology | Purpose |
|---|---|
| React Native | Mobile application development |
| Expo SDK 58 | Development and build environment |
| JavaScript | Application logic |
| React 19 | Component-based UI |
| WebView | Embedded web content |
| Three.js / WebGL | 3D visualization technology |
| Android SDK | Android application builds |

---

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js
- npm
- Git
- Android Studio (optional, for local Android builds)

### 1. Clone the Repository

```bash
git clone https://github.com/salman-anik/AnaPharm.git
```

### 2. Navigate to the Project

```bash
cd AnaPharm
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Application

```bash
npx expo start
```

### 5. Run on Android

```bash
npx expo run:android
```

---

## Project Structure

```text
AnaPharm/
│
├── assets/                 # Images, icons and application assets
│
├── src/
│   ├── components/         # Reusable UI components
│   ├── screens/            # Application screens
│   └── theme/              # Theme configuration
│
├── scripts/                # Utility and build scripts
├── apk/                    # APK-related files
├── .github/
│   └── workflows/          # GitHub Actions workflows
│
├── App.js                  # Main application component
├── app.json                # Expo configuration
├── index.js                # Application entry point
├── package.json            # Dependencies and scripts
└── README.md
```

---

## Android APK

Official standalone offline Android Release APK is available directly in the repository:

- **APK File:** [`apk/AnaPharm-v1.0.0.apk`](apk/AnaPharm-v1.0.0.apk) (~85.4 MB)
- **Version:** 1.0.0 (Release 3.5)
- **Engine:** Hermes Bytecode + React Native 0.88 + Expo 58

**Download:** [AnaPharm Releases](https://github.com/salman-anik/AnaPharm/releases)

For automated builds, check:

[GitHub Actions – Build Android APK](https://github.com/salman-anik/AnaPharm/actions)

---

## Project Goals

AnaPharm aims to make anatomy education and pharmaceutical information more accessible through interactive technology.

The long-term vision is to create an integrated educational platform where users can explore human anatomy, understand physiological processes, learn about diseases, and discover pharmaceutical information.

---

## Developer

**Salman Anik**

Computer Science & Engineering Student | Data Science | AI & Software Development

- GitHub: [@salman-anik](https://github.com/salman-anik)
- LinkedIn: [Salman Anik](https://www.linkedin.com/in/salmananik/)
- Project: [AnaPharm](https://github.com/salman-anik/AnaPharm)

---

## Medical Disclaimer

AnaPharm is developed for educational and informational purposes only.

The information provided in this application, including medicine indications, dosage guidelines, precautions, and side effects, should not be considered professional medical advice.

Always consult a qualified healthcare professional before making medical decisions or using any medication.

---

## License

No open-source license has currently been specified. All rights are reserved by the project owner unless otherwise stated.

---

<p align="center">
  <b>AnaPharm</b>
  <br />
  Explore Anatomy. Understand Physiology. Discover Medicine.
  <br /><br />
  Developed with ❤️ by <a href="https://github.com/salman-anik">Salman Anik</a>
</p>

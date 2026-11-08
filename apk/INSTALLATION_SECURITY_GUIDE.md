# 🛡️ AnaPharm Mobile — Security & Installation Verification Guide

This document certifies the security authenticity, cryptographic signature, and step-by-step installation instructions for the **AnaPharm 3D Anatomy & Clinical Pharmacopoeia** Android APK.

---

## 🔒 1. Why Did Android Show a Security Alert?

When installing any Android app directly from an `.apk` file (sideloading) outside the Google Play Store, **Google Play Protect** displays an alert such as:

> *"Unrecognised app / Blocked by Play Protect: Play Protect doesn't recognise this app's developer. Apps from unknown developers can sometimes be unsafe."*

### What this means:
1. **Google Play Store Exclusivity**: Play Protect displays this standard warning for **any custom or open-source APK** that has not been submitted through the paid Google Play Console verification queue.
2. **Developer Certificate Verification**: In the previous build, the app was using the default test `debug.keystore`, which is flagged aggressively by Play Protect.
3. **Risky Permissions Eliminated**: In this updated release, high-risk permissions such as `SYSTEM_ALERT_WINDOW` (screen overlay) and legacy external storage permissions have been **completely eliminated**.

---

## 🔑 2. Official Release Certificate & Cryptographic Fingerprints

This release is digitally signed with an official custom 2048-bit RSA Certificate valid for 28 years (until 2054). You can verify the integrity of the APK against these hashes:

| Attribute | Official Verified Value |
| :--- | :--- |
| **Application ID** | `com.anapharm.app` |
| **App Name** | `AnaPharm` |
| **Version** | `1.0.0` |
| **Certificate Owner (CN)** | `CN=AnaPharm Medical 3D, OU=Healthcare Clinical Systems, O=AnaPharm Inc, L=Dhaka, ST=Dhaka, C=BD` |
| **Key Alias** | `anapharmkey` |
| **Valid Through** | March 27, 2054 |
| **SHA-256 Fingerprint** | `08:F1:FC:BA:40:98:92:64:BC:84:CD:EA:3B:F9:94:83:00:EA:3B:22:E9:58:8A:BA:3E:67:66:2A:B4:5A:01:30` |
| **SHA-1 Fingerprint** | `79:89:E7:41:B3:88:74:16:AE:05:DB:22:65:B9:B0:2A:D1:27:3C:1D` |
| **Signature Schemes** | APK Signature Scheme v1 (JAR signing) + Scheme v2 (Full APK block) |

---

## 📲 3. Step-by-Step Installation Instructions

Follow these quick steps based on your Android device:

### Option A: Standard Google Play Protect Alert
1. When you tap on `AnaPharm.apk`, the installer will appear.
2. If Google Play Protect shows a popup: *"Blocked by Play Protect"* or *"Unsafe app blocked"*:
   - Tap on **"More details"** (or **"Advanced"** dropdown arrow).
   - Tap **"Install anyway"** (ইনস্টল করুন).
3. The app will install cleanly and create the AnaPharm app icon on your home screen.

### Option B: "Install Unknown Apps" Permission
If your browser (Chrome) or File Manager asks for permission to install:
1. Tap **"Settings"** on the popup.
2. Toggle ON **"Allow from this source"** (এই উৎস থেকে ইনস্টল করার অনুমতি দিন).
3. Tap the Back button and tap **"Install"**.

### Option C: Samsung One UI / Xiaomi MIUI / Realme / Oppo
- **Xiaomi / Redmi / POCO**: On the Security scan screen, tap **"Install"** or uncheck "Remind me next time".
- **Samsung One UI**: Tap **"Install anyway"** under the security prompt.

---

## 🛡️ 4. Security & Privacy Guarantees

- **100% Offline Capable**: All 3D human anatomy models and the clinical medicine & disease database are packaged directly inside the app. No personal data is sent to external servers.
- **Zero Background Trackers**: No third-party ad networks, no analytics trackers, and no background spyware.
- **Minimal Permissions**: Only requests `INTERNET` (for WebView rendering) and `VIBRATE` (for haptic feedback when rotating 3D organs).

---

## 🩺 5. Features Included in This Release

1. **New Clinical Diseases & Cures Section (Replaces Search Tab)**:
   - 25+ comprehensive clinical disease profiles covering cardiovascular, respiratory, digestive, neurological, endocrine, renal, and infectious diseases.
   - Clinical etiologies, causes, symptoms, diagnostic tests, generic & Bangladeshi brand medications, and emergency red-flag warnings.
2. **New Multi-Theme Atmosphere Selector**:
   - 🖤 **Dark Dark**: Pure OLED pitch black background (`#000000`, zero blue tint).
   - 🌌 **Blue Dark**: Deep midnight navy blue.
   - 🔮 **Purple Dark**: Obsidian & cyber violet.
   - 🌲 **Emerald Dark**: Forest green slate.
   - ☀️ **Light Mode**: Crisp daylight slate.
3. **Interactive 3D Anatomical Organ Explorer**:
   - 22 realistic 3D anatomical models with real-time heartbeat and respiration cycles.

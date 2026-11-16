# AnaPharm Android installation and verification

## Current release

| Detail | Value |
|---|---|
| App | AnaPharm |
| Application ID | `com.anapharm.app` |
| App version | `1.2.0` |
| Android version code | `3` |
| APK | [`AnaPharm.apk`](AnaPharm.apk) |
| Supported phone processors | ARM64 and ARM32 |
| APK SHA-256 | `89CB0DA46E67FA691E0F7FB69F77153659FE2640672B52064E515AB37020A067` |
| Signature scheme | APK Signature Scheme v2 |
| Signing certificate SHA-256 | `FAC61745DC0903786FB9EDE62A962B399F7348F0BB6F899B8332667591033B9C` |

The APK is signed with the Android debug certificate used by this project build. Android may show a Play Protect warning because this APK is installed outside Google Play.

## Install or update

1. Download `apk/AnaPharm.apk` to an Android phone and open it.
2. If Android asks, allow your browser or file manager to install apps from this source.
3. Confirm **Install**.

This release can update the immediately previous `AnaPharm.apk` (version code 2), which has the same signing certificate. The older archived build `AnaPharm-1.0.0.apk` (version code 1) has a different signing certificate. Android will not accept this release as an in-place update from that older build; uninstall it first, then install this APK. Uninstalling clears the app's local data.

## Verify the downloaded APK

Compare the file's SHA-256 with the value above. You can also verify the Android package version and signing certificate with Android SDK Build Tools:

```powershell
aapt dump badging AnaPharm.apk
apksigner verify --print-certs AnaPharm.apk
```

This APK is a standalone build and does not require Expo Go or a Metro development server.

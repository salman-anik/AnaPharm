import React from 'react';
import { StyleSheet, View } from 'react-native';

// Quiet anatomical motifs add depth without competing with reference content.
export default function MedicalBackdrop({ theme }) {
  const ink = theme?.accent || '#2477D4';
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={[styles.orbit, styles.orbitTop, { borderColor: theme?.accentBg || 'rgba(8,126,120,0.08)' }]} />
      <View style={[styles.orbit, styles.orbitBottom, { borderColor: theme?.accentBg || 'rgba(8,126,120,0.08)' }]} />
      <View style={[styles.cross, styles.crossTop, { opacity: theme?.isDark ? 0.12 : 0.10 }]}>
        <View style={[styles.crossBarHorizontal, { backgroundColor: ink }]} />
        <View style={[styles.crossBarVertical, { backgroundColor: ink }]} />
      </View>
      <View style={[styles.cross, styles.crossBottom, { opacity: theme?.isDark ? 0.09 : 0.07 }]}>
        <View style={[styles.crossBarHorizontal, styles.smallBarHorizontal, { backgroundColor: ink }]} />
        <View style={[styles.crossBarVertical, styles.smallBarVertical, { backgroundColor: ink }]} />
      </View>
      <View style={[styles.ecg, { opacity: theme?.isDark ? 0.09 : 0.06 }]}>
        <View style={[styles.ecgLine, { width: 30, backgroundColor: ink }]} />
        <View style={[styles.ecgLine, styles.ecgRise, { width: 18, backgroundColor: ink }]} />
        <View style={[styles.ecgLine, styles.ecgPeak, { width: 30, backgroundColor: ink }]} />
        <View style={[styles.ecgLine, styles.ecgFall, { width: 22, backgroundColor: ink }]} />
        <View style={[styles.ecgLine, { width: 46, backgroundColor: ink }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orbit: { position: 'absolute', width: 290, height: 290, borderWidth: 30, borderRadius: 145 },
  orbitTop: { top: 80, right: -190 },
  orbitBottom: { bottom: 50, left: -225, width: 330, height: 330, borderRadius: 165, borderWidth: 38 },
  cross: { position: 'absolute', width: 46, height: 46, alignItems: 'center', justifyContent: 'center' },
  crossTop: { top: 215, right: 28 },
  crossBottom: { bottom: 190, left: 28 },
  crossBarHorizontal: { position: 'absolute', width: 42, height: 12, borderRadius: 6 },
  crossBarVertical: { position: 'absolute', width: 12, height: 42, borderRadius: 6 },
  smallBarHorizontal: { width: 26, height: 8 },
  smallBarVertical: { width: 8, height: 26 },
  ecg: { position: 'absolute', right: 16, bottom: 115, height: 38, flexDirection: 'row', alignItems: 'center' },
  ecgLine: { height: 2, borderRadius: 1 },
  ecgRise: { height: 15, width: 2 },
  ecgPeak: { height: 28, width: 2 },
  ecgFall: { height: 11, width: 2 },
});

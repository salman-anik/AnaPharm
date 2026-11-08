import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Model3DView from '../components/Model3DView';
import OrganDetailsSheet from '../components/OrganDetailsSheet';
import { ANATOMY_DATA, SYSTEMS } from '../data/anatomyData';

export default function ModelScreen({
  bpm,
  respRate,
  autoRotate,
  xrayMode,
  explodeVal,
  theme,
}) {
  const [selectedOrganKey, setSelectedOrganKey] = useState(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [focusRegion, setFocusRegion] = useState('all');

  const selectedData = selectedOrganKey ? ANATOMY_DATA[selectedOrganKey] : null;

  const handleSelectOrgan = (organName) => {
    if (ANATOMY_DATA[organName]) {
      setSelectedOrganKey(organName);
      setSheetVisible(true);
    }
  };

  const regions = [
    { id: 'all', label: 'All Body' },
    { id: 'head', label: 'Head & Brain' },
    { id: 'thorax', label: 'Thorax' },
    { id: 'abdomen', label: 'Abdomen' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <Text style={styles.brandLogo}>🧬</Text>
          <Text style={styles.brandText}>Human Anatomy 3D</Text>
        </View>

        {/* Focus Region Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.regionScroll}
        >
          {regions.map((r) => (
            <TouchableOpacity
              key={r.id}
              style={[
                styles.regionChip,
                focusRegion === r.id && styles.regionChipActive,
              ]}
              onPress={() => setFocusRegion(r.id)}
            >
              <Text
                style={[
                  styles.regionText,
                  focusRegion === r.id && styles.regionTextActive,
                ]}
              >
                {r.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 3D Viewport */}
      <View style={styles.viewport}>
        <Model3DView
          onSelectOrgan={handleSelectOrgan}
          bpm={bpm}
          respRate={respRate}
          autoRotate={autoRotate}
          xrayMode={xrayMode}
          explodeVal={explodeVal}
          focusRegion={focusRegion}
          theme={theme}
        />

        {/* Live Vitals HUD */}
        <View style={styles.vitalsHud}>
          <View style={styles.vitalItem}>
            <Text style={styles.vitalIcon}>💓</Text>
            <Text style={styles.vitalValue}>{bpm}</Text>
            <Text style={styles.vitalUnit}>BPM</Text>
          </View>
          <View style={styles.vitalDivider} />
          <View style={styles.vitalItem}>
            <Text style={styles.vitalIcon}>🫁</Text>
            <Text style={styles.vitalValue}>{respRate}</Text>
            <Text style={styles.vitalUnit}>RPM</Text>
          </View>
        </View>

        {/* Quick Hint Pill */}
        <View style={styles.hintPill}>
          <Text style={styles.hintText}>👆 Tap any organ to view medical details in বাংলা</Text>
        </View>
      </View>

      {/* Detail Bottom Sheet */}
      <OrganDetailsSheet
        visible={sheetVisible}
        organData={selectedData}
        onClose={() => setSheetVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: '#0b132b',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  brandLogo: {
    fontSize: 18,
  },
  brandText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  regionScroll: {
    flexDirection: 'row',
    gap: 8,
  },
  regionChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  regionChipActive: {
    backgroundColor: '#0284c7',
    borderColor: '#38bdf8',
  },
  regionText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
  },
  regionTextActive: {
    color: '#ffffff',
  },
  viewport: {
    flex: 1,
    position: 'relative',
  },
  vitalsHud: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  vitalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  vitalIcon: {
    fontSize: 13,
  },
  vitalValue: {
    color: '#38bdf8',
    fontWeight: '700',
    fontSize: 13,
  },
  vitalUnit: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '600',
  },
  vitalDivider: {
    width: 1,
    height: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginHorizontal: 8,
  },
  hintPill: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  hintText: {
    color: '#cbd5e1',
    fontSize: 12,
    fontWeight: '500',
  },
});

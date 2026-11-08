import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Model3DView from '../components/Model3DView';
import OrganDetailsSheet from '../components/OrganDetailsSheet';
import { ANATOMY_DATA, SYSTEMS } from '../data/anatomyData';

export default function ModelScreen({
  bpm,
  respRate,
  autoRotate,
  setAutoRotate,
  xrayMode,
  setXrayMode,
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
      if (ANATOMY_DATA[organName].region) {
        setFocusRegion(ANATOMY_DATA[organName].region);
      }
    }
  };

  const regions = [
    { id: 'all', label: '🧍 All Body' },
    { id: 'head', label: '🧠 Head & Brain' },
    { id: 'thorax', label: '🫀 Thorax' },
    { id: 'abdomen', label: '🍽️ Abdomen' },
    { id: 'pelvis', label: '🦵 Pelvis & Legs' },
  ];

  // List of major organs for quick jump
  const organKeys = Object.keys(ANATOMY_DATA).filter(k => k !== 'Body Surface (Skin)');

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.brandLogo}>🧬</Text>
          </View>
          <View>
            <Text style={styles.brandText}>Human Anatomy 3D</Text>
            <Text style={styles.subBrandText}>মানব শরীরস্থান ও শারীরতত্ত্ব</Text>
          </View>
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
              activeOpacity={0.7}
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

      {/* 3D Viewport Area */}
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
            <View>
              <Text style={styles.vitalValue}>{bpm}</Text>
              <Text style={styles.vitalUnit}>BPM</Text>
            </View>
          </View>
          <View style={styles.vitalDivider} />
          <View style={styles.vitalItem}>
            <Text style={styles.vitalIcon}>🫁</Text>
            <View>
              <Text style={styles.vitalValue}>{respRate}</Text>
              <Text style={styles.vitalUnit}>RPM</Text>
            </View>
          </View>
        </View>

        {/* Quick Viewport Action FABs */}
        <View style={styles.fabColumn}>
          <TouchableOpacity
            style={[styles.actionFab, autoRotate && styles.actionFabActive]}
            onPress={() => setAutoRotate && setAutoRotate(!autoRotate)}
            activeOpacity={0.8}
          >
            <Text style={styles.fabIcon}>🔄</Text>
            <Text style={styles.fabLabel}>{autoRotate ? 'Orbit On' : 'Rotate'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionFab, xrayMode && styles.actionFabActive]}
            onPress={() => setXrayMode && setXrayMode(!xrayMode)}
            activeOpacity={0.8}
          >
            <Text style={styles.fabIcon}>⚡</Text>
            <Text style={styles.fabLabel}>{xrayMode ? 'X-Ray On' : 'X-Ray'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionFab}
            onPress={() => setFocusRegion('all')}
            activeOpacity={0.8}
          >
            <Text style={styles.fabIcon}>🎯</Text>
            <Text style={styles.fabLabel}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Quick Organ Picker Bar */}
        <View style={styles.organPickerContainer}>
          <Text style={styles.pickerTitle}>SELECT ORGAN (অঙ্গ নির্বাচন করুন):</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pickerScroll}
          >
            {organKeys.map((key) => {
              const organ = ANATOMY_DATA[key];
              const sys = SYSTEMS[organ.system] || { icon: '🫀', color: '#38bdf8' };
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.organPill, { borderColor: sys.color + '60' }]}
                  onPress={() => handleSelectOrgan(key)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.organPillIcon}>{sys.icon}</Text>
                  <View>
                    <Text style={styles.organPillName}>{organ.name}</Text>
                    <Text style={styles.organPillBn}>{organ.name_bn}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
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
    paddingTop: 6,
    paddingBottom: 10,
    backgroundColor: '#0b132b',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandLogo: {
    fontSize: 18,
  },
  brandText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  subBrandText: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '500',
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
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  vitalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  vitalIcon: {
    fontSize: 14,
  },
  vitalValue: {
    color: '#38bdf8',
    fontWeight: '800',
    fontSize: 13,
    lineHeight: 14,
  },
  vitalUnit: {
    color: '#64748b',
    fontSize: 9,
    fontWeight: '700',
  },
  vitalDivider: {
    width: 1,
    height: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  fabColumn: {
    position: 'absolute',
    top: 12,
    left: 12,
    gap: 8,
  },
  actionFab: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    minWidth: 54,
  },
  actionFabActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.25)',
    borderColor: '#38bdf8',
  },
  fabIcon: {
    fontSize: 13,
    marginBottom: 2,
  },
  fabLabel: {
    color: '#94a3b8',
    fontSize: 9,
    fontWeight: '700',
  },
  organPickerContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
  },
  pickerTitle: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 6,
    marginLeft: 4,
  },
  pickerScroll: {
    gap: 8,
    paddingRight: 16,
  },
  organPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  organPillIcon: {
    fontSize: 16,
  },
  organPillName: {
    color: '#f8fafc',
    fontSize: 12,
    fontWeight: '700',
  },
  organPillBn: {
    color: '#38bdf8',
    fontSize: 10,
    fontWeight: '600',
  },
});

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
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
  theme = 'dark',
}) {
  const [selectedOrganKey, setSelectedOrganKey] = useState(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [focusRegion, setFocusRegion] = useState('all');

  const isLight = theme === 'light';
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

  const organKeys = Object.keys(ANATOMY_DATA).filter(k => k !== 'Body Surface (Skin)');

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.container,
        { backgroundColor: isLight ? '#ffffff' : '#0b132b' },
      ]}
    >
      {/* Top Bar */}
      <View style={[styles.topBar, isLight && styles.topBarLight]}>
        <View style={styles.brandRow}>
          <View style={[styles.logoBadge, isLight && styles.logoBadgeLight]}>
            <Image
              source={require('../../assets/icon.png')}
              style={{ width: 34, height: 34, borderRadius: 17 }}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text style={[styles.brandText, isLight && styles.brandTextLight]}>AnaPharm</Text>
            <Text style={[styles.subBrandText, isLight && styles.subBrandTextLight]}>
              3D Anatomy & Clinical Pharmacopoeia
            </Text>
          </View>
        </View>

        {/* Focus Region Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.regionScroll}
        >
          {regions.map((r) => {
            const active = focusRegion === r.id;
            return (
              <TouchableOpacity
                key={r.id}
                style={[
                  styles.regionChip,
                  isLight && styles.regionChipLight,
                  active && styles.regionChipActive,
                ]}
                onPress={() => setFocusRegion(r.id)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.regionText,
                    isLight && styles.regionTextLight,
                    active && styles.regionTextActive,
                  ]}
                >
                  {r.label}
                </Text>
              </TouchableOpacity>
            );
          })}
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
        <View style={[styles.vitalsHud, isLight && styles.vitalsHudLight]}>
          <View style={styles.vitalItem}>
            <Text style={styles.vitalIcon}>💓</Text>
            <View>
              <Text style={[styles.vitalValue, isLight && styles.vitalValueLight]}>{bpm}</Text>
              <Text style={styles.vitalUnit}>BPM</Text>
            </View>
          </View>
          <View style={[styles.vitalDivider, isLight && styles.vitalDividerLight]} />
          <View style={styles.vitalItem}>
            <Text style={styles.vitalIcon}>🫁</Text>
            <View>
              <Text style={[styles.vitalValue, isLight && styles.vitalValueLight]}>{respRate}</Text>
              <Text style={styles.vitalUnit}>RPM</Text>
            </View>
          </View>
        </View>

        {/* Quick Viewport Action FABs */}
        <View style={styles.fabColumn}>
          <TouchableOpacity
            style={[
              styles.actionFab,
              isLight && styles.actionFabLight,
              autoRotate && styles.actionFabActive,
            ]}
            onPress={() => setAutoRotate && setAutoRotate(!autoRotate)}
            activeOpacity={0.8}
          >
            <Text style={styles.fabIcon}>🔄</Text>
            <Text style={[styles.fabLabel, isLight && styles.fabLabelLight]}>
              {autoRotate ? 'Orbit On' : 'Rotate'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionFab,
              isLight && styles.actionFabLight,
              xrayMode && styles.actionFabActive,
            ]}
            onPress={() => setXrayMode && setXrayMode(!xrayMode)}
            activeOpacity={0.8}
          >
            <Text style={styles.fabIcon}>⚡</Text>
            <Text style={[styles.fabLabel, isLight && styles.fabLabelLight]}>
              {xrayMode ? 'X-Ray On' : 'X-Ray'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionFab, isLight && styles.actionFabLight]}
            onPress={() => setFocusRegion('all')}
            activeOpacity={0.8}
          >
            <Text style={styles.fabIcon}>🎯</Text>
            <Text style={[styles.fabLabel, isLight && styles.fabLabelLight]}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Quick Organ Picker Bar */}
        <View style={[styles.organPickerContainer, isLight && styles.organPickerContainerLight]}>
          <Text style={[styles.pickerTitle, isLight && styles.pickerTitleLight]}>
            SELECT ORGAN:
          </Text>
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
                  style={[
                    styles.organPill,
                    isLight && styles.organPillLight,
                    { borderColor: sys.color + '70' },
                  ]}
                  onPress={() => handleSelectOrgan(key)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.organPillIcon}>{sys.icon}</Text>
                  <Text style={[styles.organPillName, isLight && styles.organPillNameLight]}>
                    {organ.name}
                  </Text>
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
        theme={theme}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  containerLight: {
    backgroundColor: '#f8fafc',
  },
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: '#0b132b',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  topBarLight: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#e2e8f0',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadgeLight: {
    backgroundColor: 'rgba(2, 132, 199, 0.12)',
    borderColor: 'rgba(2, 132, 199, 0.25)',
  },
  brandLogo: {
    fontSize: 18,
  },
  brandText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  brandTextLight: {
    color: '#0f172a',
  },
  subBrandText: {
    fontSize: 11,
    color: '#38bdf8',
  },
  subBrandTextLight: {
    color: '#0284c7',
  },
  regionScroll: {
    gap: 8,
    paddingVertical: 2,
  },
  regionChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  regionChipLight: {
    backgroundColor: '#f1f5f9',
    borderColor: '#e2e8f0',
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
  regionTextLight: {
    color: '#64748b',
  },
  regionTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  viewport: {
    flex: 1,
    position: 'relative',
  },
  vitalsHud: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  vitalsHudLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#cbd5e1',
    shadowOpacity: 0.1,
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
    color: '#f8fafc',
    fontSize: 13,
    fontWeight: '800',
  },
  vitalValueLight: {
    color: '#0f172a',
  },
  vitalUnit: {
    color: '#38bdf8',
    fontSize: 9,
    fontWeight: '700',
  },
  vitalDivider: {
    width: 1,
    height: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginHorizontal: 10,
  },
  vitalDividerLight: {
    backgroundColor: '#e2e8f0',
  },
  fabColumn: {
    position: 'absolute',
    top: 14,
    right: 14,
    gap: 8,
  },
  actionFab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  actionFabLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#cbd5e1',
    shadowOpacity: 0.1,
  },
  actionFabActive: {
    backgroundColor: '#0284c7',
    borderColor: '#38bdf8',
  },
  fabIcon: {
    fontSize: 17,
  },
  fabLabel: {
    color: '#94a3b8',
    fontSize: 9,
    fontWeight: '600',
    marginTop: 2,
  },
  fabLabelLight: {
    color: '#475569',
  },
  organPickerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(11, 19, 43, 0.95)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  organPickerContainerLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopColor: '#e2e8f0',
  },
  pickerTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#38bdf8',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  pickerTitleLight: {
    color: '#0284c7',
  },
  pickerScroll: {
    gap: 8,
  },
  organPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#1e293b',
    borderWidth: 1,
  },
  organPillLight: {
    backgroundColor: '#f1f5f9',
  },
  organPillIcon: {
    fontSize: 16,
  },
  organPillName: {
    color: '#f8fafc',
    fontSize: 12,
    fontWeight: '700',
  },
  organPillNameLight: {
    color: '#0f172a',
  },
  organPillBn: {
    color: '#94a3b8',
    fontSize: 10,
  },
});

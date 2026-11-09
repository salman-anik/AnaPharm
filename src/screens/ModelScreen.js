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
import { getTheme } from '../theme/theme';
import HealthIcon, { getOrganIcon } from '../components/HealthIcon';

export default function ModelScreen({
  bpm,
  respRate,
  autoRotate,
  setAutoRotate,
  xrayMode,
  setXrayMode,
  theme = 'dark',
  fontSize = 'medium',
}) {
  const [selectedOrganKey, setSelectedOrganKey] = useState(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [focusRegion, setFocusRegion] = useState('all');
  const [resetKey, setResetKey] = useState(0);

  const t = getTheme(theme, fontSize);
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

  const handleReset = () => {
    setFocusRegion('all');
    setSelectedOrganKey(null);
    setSheetVisible(false);
    setAutoRotate && setAutoRotate(false);
    setResetKey((prev) => prev + 1);
  };

  const organKeys = Object.keys(ANATOMY_DATA).filter(
    (k) => k !== 'Body Surface (Skin)'
  );

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: t.bg }]}
    >
      {/* 3D Viewport Area - Fullscreen immersion, no top bar */}
      <View style={styles.viewport}>
        <Model3DView
          onSelectOrgan={handleSelectOrgan}
          bpm={bpm}
          respRate={respRate}
          autoRotate={autoRotate}
          xrayMode={xrayMode}
          focusRegion={focusRegion}
          theme={theme}
          resetKey={resetKey}
        />

        {/* Frosted Glass Live Vitals HUD */}
        <View
          style={[
            styles.vitalsHud,
            {
              backgroundColor: t.glassBg,
              borderColor: t.glassBorder,
              shadowColor: t.shadowColor,
            },
          ]}
        >
          <View style={styles.vitalItem}>
            <HealthIcon name="heartbeat" size={16} color={t.text} style={{ marginRight: 6 }} />
            <View>
              <Text style={[styles.vitalValue, { color: t.text }]}>{bpm}</Text>
              <Text style={[styles.vitalUnit, { color: t.textMuted }]}>BPM</Text>
            </View>
          </View>
          <View
            style={[styles.vitalDivider, { backgroundColor: t.glassBorder }]}
          />
          <View style={styles.vitalItem}>
            <HealthIcon name="lungs" size={16} color={t.text} style={{ marginRight: 6 }} />
            <View>
              <Text style={[styles.vitalValue, { color: t.text }]}>
                {respRate}
              </Text>
              <Text style={[styles.vitalUnit, { color: t.textMuted }]}>RPM</Text>
            </View>
          </View>
        </View>

        {/* Floating Viewport Action FABs */}
        <View style={styles.fabColumn}>
          <TouchableOpacity
            style={[
              styles.actionFab,
              {
                backgroundColor: autoRotate ? (t.isDark ? '#3f3f46' : '#d4d4d8') : t.glassBg,
                borderColor: t.glassBorder,
                shadowColor: t.shadowColor,
              },
            ]}
            onPress={() => setAutoRotate && setAutoRotate(!autoRotate)}
            activeOpacity={0.8}
          >
            <HealthIcon name="bodyOutline" size={20} color={t.text} />
            <Text style={[styles.fabLabel, { color: t.text }]}>
              {autoRotate ? 'Orbit On' : 'Rotate'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionFab,
              {
                backgroundColor: xrayMode ? (t.isDark ? '#3f3f46' : '#d4d4d8') : t.glassBg,
                borderColor: t.glassBorder,
                shadowColor: t.shadowColor,
              },
            ]}
            onPress={() => setXrayMode && setXrayMode(!xrayMode)}
            activeOpacity={0.8}
          >
            <HealthIcon name="xray" size={20} color={t.text} />
            <Text style={[styles.fabLabel, { color: t.text }]}>
              {xrayMode ? 'X-Ray On' : 'X-Ray'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionFab,
              {
                backgroundColor: t.glassBg,
                borderColor: t.glassBorder,
                shadowColor: t.shadowColor,
              },
            ]}
            onPress={handleReset}
            activeOpacity={0.8}
          >
            <HealthIcon name="uiZoom" size={20} color={t.text} />
            <Text style={[styles.fabLabel, { color: t.text }]}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Organ Selector Dock */}
        <View
          style={[
            styles.organPickerContainer,
            {
              backgroundColor: t.glassBg,
              borderTopColor: t.glassBorder,
            },
          ]}
        >
          <View style={styles.dockHeaderRow}>
            <Text style={[styles.pickerTitle, { color: t.text }]}>
              ORGANS
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pickerScroll}
          >
            {organKeys.map((key) => {
              const organ = ANATOMY_DATA[key];
              const isSelected = selectedOrganKey === key;
              const pillIconColor = isSelected
                ? (t.isDark ? '#000000' : '#ffffff')
                : t.text;

              return (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.organPill,
                    {
                      backgroundColor: isSelected
                        ? t.isDark
                          ? '#ffffff'
                          : '#000000'
                        : t.chipBg,
                      borderColor: isSelected ? t.text : t.chipBorder,
                    },
                  ]}
                  onPress={() => handleSelectOrgan(key)}
                  activeOpacity={0.7}
                >
                  <HealthIcon
                    source={getOrganIcon(key)}
                    size={16}
                    color={pillIconColor}
                    style={{ marginRight: 6 }}
                  />
                  <Text
                    style={[
                      styles.organPillName,
                      {
                        color: isSelected
                          ? t.isDark
                            ? '#000000'
                            : '#ffffff'
                          : t.text,
                        fontWeight: isSelected ? '800' : '600',
                      },
                    ]}
                  >
                    {organ.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* Detail Bottom Sheet with full Theme support */}
      <OrganDetailsSheet
        visible={sheetVisible}
        organData={selectedData}
        onClose={() => setSheetVisible(false)}
        theme={theme}
        fontSize={fontSize}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  vitalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  vitalIcon: {
    fontSize: 16,
  },
  vitalValue: {
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 18,
  },
  vitalUnit: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  vitalDivider: {
    width: 1,
    height: 22,
  },
  fabColumn: {
    position: 'absolute',
    top: 14,
    right: 14,
    gap: 10,
  },
  actionFab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 18,
  },
  fabLabel: {
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
  },
  organPickerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderTopWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dockHeaderRow: {
    marginBottom: 6,
  },
  pickerTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  pickerScroll: {
    gap: 8,
  },
  organPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: 1,
  },
  organPillIcon: {
    fontSize: 16,
  },
  organPillName: {
    fontSize: 12,
  },
});

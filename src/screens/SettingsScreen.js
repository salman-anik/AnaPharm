import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen({
  theme,
  setTheme,
  autoRotate,
  setAutoRotate,
  xrayMode,
  setXrayMode,
  bpm,
  setBpm,
  respRate,
  setRespRate,
  explodeVal,
  setExplodeVal,
}) {
  const isLight = theme === 'light';

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.container,
        { backgroundColor: isLight ? '#ffffff' : '#0b132b' },
      ]}
    >
      <View style={[styles.header, isLight && styles.headerLight]}>
        <Text style={[styles.title, isLight && styles.titleLight]}>Settings & Preferences</Text>
        <Text style={[styles.subtitle, isLight && styles.subtitleLight]}>Configure 3D graphics, physiology, and display</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollList}>
        {/* CARD 1: THEME & APPEARANCE */}
        <View style={[styles.card, isLight && styles.cardLight]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🎨</Text>
            <View>
              <Text style={[styles.cardHeading, isLight && styles.cardHeadingLight]}>Theme & Appearance</Text>
              <Text style={[styles.cardSub, isLight && styles.cardSubLight]}>Viewport atmosphere and background</Text>
            </View>
          </View>

          <View style={styles.themeOptionsRow}>
            {['dark', 'light'].map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.themeChip,
                  isLight && styles.themeChipLight,
                  theme === mode && (isLight ? styles.themeChipActiveLight : styles.themeChipActive),
                ]}
                onPress={() => setTheme(mode)}
              >
                <Text
                  style={[
                    styles.themeChipText,
                    isLight && styles.themeChipTextLight,
                    theme === mode && (isLight ? styles.themeChipTextActiveLight : styles.themeChipTextActive),
                  ]}
                >
                  {mode === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* CARD 2: 3D VIEW MODES */}
        <View style={[styles.card, isLight && styles.cardLight]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>👁️</Text>
            <View>
              <Text style={[styles.cardHeading, isLight && styles.cardHeadingLight]}>3D View Controls</Text>
              <Text style={[styles.cardSub, isLight && styles.cardSubLight]}>Camera dynamics and visual effects</Text>
            </View>
          </View>

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowLabel, isLight && styles.rowLabelLight]}>Auto-Rotate Model</Text>
              <Text style={[styles.rowDesc, isLight && styles.rowDescLight]}>Smooth 360° continuous turntable rotation</Text>
            </View>
            <Switch
              value={autoRotate}
              onValueChange={setAutoRotate}
              trackColor={{ false: isLight ? '#cbd5e1' : '#334155', true: '#0284c7' }}
              thumbColor={autoRotate ? '#38bdf8' : (isLight ? '#f8fafc' : '#cbd5e1')}
            />
          </View>
        </View>

        {/* CARD 3: PHYSIOLOGY SIMULATION */}
        <View style={[styles.card, isLight && styles.cardLight]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>💓</Text>
            <View>
              <Text style={[styles.cardHeading, isLight && styles.cardHeadingLight]}>Physiology Simulation</Text>
              <Text style={[styles.cardSub, isLight && styles.cardSubLight]}>Dynamic cardiac and respiratory rates</Text>
            </View>
          </View>

          {/* BPM Stepper */}
          <View style={styles.stepperRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowLabel, isLight && styles.rowLabelLight]}>Heart Rate</Text>
              <Text style={[styles.rowDesc, isLight && styles.rowDescLight]}>Cardiac cycle speed in real time</Text>
            </View>
            <View style={[styles.stepperControls, isLight && styles.stepperControlsLight]}>
              <TouchableOpacity
                style={[styles.stepBtn, isLight && styles.stepBtnLight]}
                onPress={() => setBpm((prev) => Math.max(40, prev - 5))}
              >
                <Text style={[styles.stepBtnText, isLight && styles.stepBtnTextLight]}>−</Text>
              </TouchableOpacity>
              <Text style={[styles.stepValue, isLight && styles.stepValueLight]}>
                {bpm} <Text style={[styles.stepUnit, isLight && styles.stepUnitLight]}>BPM</Text>
              </Text>
              <TouchableOpacity
                style={[styles.stepBtn, isLight && styles.stepBtnLight]}
                onPress={() => setBpm((prev) => Math.min(180, prev + 5))}
              >
                <Text style={[styles.stepBtnText, isLight && styles.stepBtnTextLight]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Respiration Stepper */}
          <View style={[styles.stepperRow, styles.rowBorderTop, isLight && styles.rowBorderTopLight]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowLabel, isLight && styles.rowLabelLight]}>Respiration Rate</Text>
              <Text style={[styles.rowDesc, isLight && styles.rowDescLight]}>Pulmonary ventilation cycle speed</Text>
            </View>
            <View style={[styles.stepperControls, isLight && styles.stepperControlsLight]}>
              <TouchableOpacity
                style={[styles.stepBtn, isLight && styles.stepBtnLight]}
                onPress={() => setRespRate((prev) => Math.max(8, prev - 2))}
              >
                <Text style={[styles.stepBtnText, isLight && styles.stepBtnTextLight]}>−</Text>
              </TouchableOpacity>
              <Text style={[styles.stepValue, isLight && styles.stepValueLight]}>
                {respRate} <Text style={[styles.stepUnit, isLight && styles.stepUnitLight]}>RPM</Text>
              </Text>
              <TouchableOpacity
                style={[styles.stepBtn, isLight && styles.stepBtnLight]}
                onPress={() => setRespRate((prev) => Math.min(40, prev + 2))}
              >
                <Text style={[styles.stepBtnText, isLight && styles.stepBtnTextLight]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* CARD 4: DISSECTION & EXPLODED VIEW */}
        <View style={[styles.card, isLight && styles.cardLight]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🔬</Text>
            <View>
              <Text style={[styles.cardHeading, isLight && styles.cardHeadingLight]}>Dissection & Exploded View</Text>
              <Text style={[styles.cardSub, isLight && styles.cardSubLight]}>Separate anatomical layers along normal vectors</Text>
            </View>
          </View>

          <View style={styles.stepperRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowLabel, isLight && styles.rowLabelLight]}>Explosion Level</Text>
              <Text style={[styles.rowDesc, isLight && styles.rowDescLight]}>Distance separating organ groups</Text>
            </View>
            <View style={[styles.stepperControls, isLight && styles.stepperControlsLight]}>
              <TouchableOpacity
                style={[styles.stepBtn, isLight && styles.stepBtnLight]}
                onPress={() => setExplodeVal((prev) => Math.max(0, +(prev - 0.2).toFixed(1)))}
              >
                <Text style={[styles.stepBtnText, isLight && styles.stepBtnTextLight]}>−</Text>
              </TouchableOpacity>
              <Text style={[styles.stepValue, isLight && styles.stepValueLight]}>{Math.round(explodeVal * 100)}%</Text>
              <TouchableOpacity
                style={[styles.stepBtn, isLight && styles.stepBtnLight]}
                onPress={() => setExplodeVal((prev) => Math.min(1, +(prev + 0.2).toFixed(1)))}
              >
                <Text style={[styles.stepBtnText, isLight && styles.stepBtnTextLight]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* CARD 5: DEVELOPER & SYSTEM CREDITS */}
        <View style={[styles.card, styles.developerCard, isLight && styles.developerCardLight]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>👨‍💻</Text>
            <View>
              <Text style={[styles.cardHeading, isLight && styles.cardHeadingLight]}>Developer Details</Text>
              <Text style={[styles.cardSub, isLight && styles.cardSubLight]}>Created & Developed by Salman Anik</Text>
            </View>
          </View>

          <View style={[styles.devBadgeRow, isLight && styles.devBadgeRowLight]}>
            <View style={styles.devAvatar}>
              <Text style={styles.devAvatarText}>SA</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.devName, isLight && styles.devNameLight]}>Salman Anik</Text>
              <Text style={styles.devHandle}>@salmananik</Text>
              <Text style={[styles.devRole, isLight && styles.devRoleLight]}>
                Lead Developer & Medical Systems Informatics
              </Text>
            </View>
          </View>

          <View style={[styles.devInfoList, isLight && styles.devInfoListLight]}>
            <View style={styles.devInfoRow}>
              <Text style={styles.devInfoLabel}>Application</Text>
              <Text style={[styles.devInfoValue, isLight && styles.devInfoValueLight]}>AnaPharm Mobile</Text>
            </View>
            <View style={styles.devInfoRow}>
              <Text style={styles.devInfoLabel}>Author / Lead</Text>
              <Text style={[styles.devInfoValue, { color: '#0284c7', fontWeight: '700' }]}>salmananik</Text>
            </View>
            <View style={styles.devInfoRow}>
              <Text style={styles.devInfoLabel}>GitHub Repository</Text>
              <Text style={[styles.devInfoValue, { color: '#0284c7' }]}>salman-anik/AnaPharm</Text>
            </View>
            <View style={styles.devInfoRow}>
              <Text style={styles.devInfoLabel}>3D Viewport</Text>
              <Text style={[styles.devInfoValue, isLight && styles.devInfoValueLight]}>Three.js WebGL Interactive Anatomy</Text>
            </View>
            <View style={[styles.devInfoRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.devInfoLabel}>Clinical Database</Text>
              <Text style={[styles.devInfoValue, isLight && styles.devInfoValueLight]}>2,594 Generics (Bangladesh Pharmacopoeia)</Text>
            </View>
          </View>
        </View>

        {/* CARD 6: MEDICAL ADVISORY DISCLAIMER */}
        <View style={[styles.card, styles.disclaimerCard, isLight && styles.disclaimerCardLight]}>
          <Text style={[styles.disclaimerTitle, isLight && styles.disclaimerTitleLight]}>
            ⚠️ Educational & Clinical Reference Notice
          </Text>
          <Text style={[styles.disclaimerBody, isLight && styles.disclaimerBodyLight]}>
            The anatomical illustrations, diseases, solutions, and pharmaceutical classes provided are strictly for educational and scientific reference. Always consult a board-certified medical specialist for personal diagnoses and prescriptions.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 2,
  },
  scrollList: {
    padding: 16,
    gap: 14,
  },
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  cardIcon: {
    fontSize: 22,
  },
  cardHeading: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  cardSub: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 1,
  },
  themeOptionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  themeChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
  },
  themeChipActive: {
    backgroundColor: 'rgba(14, 165, 233, 0.2)',
    borderColor: '#38bdf8',
  },
  themeChipText: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '600',
  },
  themeChipTextActive: {
    color: '#38bdf8',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  rowBorderTop: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: 12,
    marginTop: 4,
  },
  rowLabel: {
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: '600',
  },
  rowDesc: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 2,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  stepperControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 4,
    gap: 8,
  },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
  },
  stepValue: {
    color: '#38bdf8',
    fontWeight: '700',
    fontSize: 14,
    minWidth: 54,
    textAlign: 'center',
  },
  stepUnit: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '600',
  },
  disclaimerCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderColor: 'rgba(245, 158, 11, 0.25)',
  },
  disclaimerTitle: {
    color: '#fbbf24',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  disclaimerBody: {
    color: '#cbd5e1',
    fontSize: 12,
    lineHeight: 18,
  },
  // Light Theme Styles
  containerLight: {
    backgroundColor: '#f8fafc',
  },
  headerLight: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#e2e8f0',
  },
  titleLight: {
    color: '#0f172a',
  },
  subtitleLight: {
    color: '#64748b',
  },
  cardLight: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeadingLight: {
    color: '#0f172a',
  },
  cardSubLight: {
    color: '#64748b',
  },
  themeChipLight: {
    backgroundColor: '#f1f5f9',
    borderColor: '#e2e8f0',
  },
  themeChipActiveLight: {
    backgroundColor: 'rgba(2, 132, 199, 0.12)',
    borderColor: '#0284c7',
  },
  themeChipTextLight: {
    color: '#64748b',
  },
  themeChipTextActiveLight: {
    color: '#0284c7',
  },
  rowLabelLight: {
    color: '#0f172a',
  },
  rowDescLight: {
    color: '#64748b',
  },
  rowBorderTopLight: {
    borderTopColor: '#f1f5f9',
  },
  stepperControlsLight: {
    backgroundColor: '#f1f5f9',
  },
  stepBtnLight: {
    backgroundColor: '#e2e8f0',
  },
  stepBtnTextLight: {
    color: '#0f172a',
  },
  stepValueLight: {
    color: '#0284c7',
  },
  stepUnitLight: {
    color: '#64748b',
  },
  disclaimerCardLight: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  disclaimerTitleLight: {
    color: '#b45309',
  },
  disclaimerBodyLight: {
    color: '#475569',
  },
  // Developer Section Styles
  developerCard: {
    backgroundColor: 'rgba(14, 165, 233, 0.08)',
    borderColor: 'rgba(14, 165, 233, 0.28)',
  },
  developerCardLight: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
  },
  devBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  devBadgeRowLight: {
    backgroundColor: '#f1f5f9',
  },
  devAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0284c7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#38bdf8',
  },
  devAvatarText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  devName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  devNameLight: {
    color: '#0f172a',
  },
  devHandle: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 1,
  },
  devRole: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 3,
  },
  devRoleLight: {
    color: '#64748b',
  },
  devInfoList: {
    backgroundColor: '#0b132b',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  devInfoListLight: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  devInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  devInfoLabel: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
  },
  devInfoValue: {
    color: '#f8fafc',
    fontSize: 12,
    fontWeight: '600',
  },
  devInfoValueLight: {
    color: '#0f172a',
  },
});

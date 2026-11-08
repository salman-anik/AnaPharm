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
import { THEMES, getTheme } from '../theme/theme';

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
  const t = getTheme(theme);
  const isLight = !t.isDark;

  const themeList = Object.values(THEMES);

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.container,
        { backgroundColor: t.bg },
      ]}
    >
      <View style={[styles.header, { backgroundColor: t.headerBg, borderBottomColor: t.border }]}>
        <Text style={[styles.title, { color: t.text }]}>Settings & Preferences</Text>
        <Text style={[styles.subtitle, { color: t.textMuted }]}>
          Configure theme, 3D graphics, physiology, and system
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollList}>
        {/* CARD 1: MULTI-THEME & APPEARANCE */}
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🎨</Text>
            <View>
              <Text style={[styles.cardHeading, { color: t.text }]}>Theme & Appearance</Text>
              <Text style={[styles.cardSub, { color: t.textMuted }]}>
                Choose your preferred atmosphere (Dark Dark, Blue Dark, etc.)
              </Text>
            </View>
          </View>

          <View style={styles.themeGrid}>
            {themeList.map((item) => {
              const isSelected = theme === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.themeOptionCard,
                    {
                      backgroundColor: item.card,
                      borderColor: isSelected ? item.accent : item.cardBorder,
                      borderWidth: isSelected ? 2 : 1,
                    },
                  ]}
                  onPress={() => setTheme(item.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.themeOptionTop}>
                    <Text style={styles.themeOptionIcon}>{item.icon}</Text>
                    {isSelected && (
                      <View style={[styles.activeCheckBadge, { backgroundColor: item.accent }]}>
                        <Text style={styles.activeCheckText}>✓</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.themeOptionLabel, { color: item.text }]}>
                    {item.label}
                  </Text>
                  <Text style={[styles.themeOptionSub, { color: item.textMuted }]}>
                    {item.subLabel}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* CARD 2: 3D VIEW MODES */}
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>👁️</Text>
            <View>
              <Text style={[styles.cardHeading, { color: t.text }]}>3D View Controls</Text>
              <Text style={[styles.cardSub, { color: t.textMuted }]}>Camera dynamics and visual effects</Text>
            </View>
          </View>

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowLabel, { color: t.text }]}>Auto-Rotate Model</Text>
              <Text style={[styles.rowDesc, { color: t.textMuted }]}>Smooth 360° continuous turntable rotation</Text>
            </View>
            <Switch
              value={autoRotate}
              onValueChange={setAutoRotate}
              trackColor={{ false: t.isDark ? '#334155' : '#cbd5e1', true: t.accent }}
              thumbColor={autoRotate ? '#ffffff' : (t.isDark ? '#94a3b8' : '#f8fafc')}
            />
          </View>

          <View style={[styles.settingRow, styles.rowBorderTop, { borderTopColor: t.border }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowLabel, { color: t.text }]}>X-Ray Transparency Mode</Text>
              <Text style={[styles.rowDesc, { color: t.textMuted }]}>Semi-transparent body surface for internal view</Text>
            </View>
            <Switch
              value={xrayMode}
              onValueChange={setXrayMode}
              trackColor={{ false: t.isDark ? '#334155' : '#cbd5e1', true: t.accent }}
              thumbColor={xrayMode ? '#ffffff' : (t.isDark ? '#94a3b8' : '#f8fafc')}
            />
          </View>
        </View>

        {/* CARD 3: PHYSIOLOGY SIMULATION */}
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>💓</Text>
            <View>
              <Text style={[styles.cardHeading, { color: t.text }]}>Physiology Simulation</Text>
              <Text style={[styles.cardSub, { color: t.textMuted }]}>Dynamic cardiac and respiratory rates</Text>
            </View>
          </View>

          {/* BPM Stepper */}
          <View style={styles.stepperRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowLabel, { color: t.text }]}>Heart Rate</Text>
              <Text style={[styles.rowDesc, { color: t.textMuted }]}>Cardiac cycle speed in real time</Text>
            </View>
            <View style={[styles.stepperControls, { backgroundColor: t.surfaceSecondary }]}>
              <TouchableOpacity
                style={[styles.stepBtn, { backgroundColor: t.cardBorder }]}
                onPress={() => setBpm((prev) => Math.max(40, prev - 5))}
              >
                <Text style={[styles.stepBtnText, { color: t.text }]}>−</Text>
              </TouchableOpacity>
              <Text style={[styles.stepValue, { color: t.accent }]}>
                {bpm} <Text style={[styles.stepUnit, { color: t.textMuted }]}>BPM</Text>
              </Text>
              <TouchableOpacity
                style={[styles.stepBtn, { backgroundColor: t.cardBorder }]}
                onPress={() => setBpm((prev) => Math.min(180, prev + 5))}
              >
                <Text style={[styles.stepBtnText, { color: t.text }]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Respiration Stepper */}
          <View style={[styles.stepperRow, styles.rowBorderTop, { borderTopColor: t.border }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowLabel, { color: t.text }]}>Respiration Rate</Text>
              <Text style={[styles.rowDesc, { color: t.textMuted }]}>Pulmonary ventilation cycle speed</Text>
            </View>
            <View style={[styles.stepperControls, { backgroundColor: t.surfaceSecondary }]}>
              <TouchableOpacity
                style={[styles.stepBtn, { backgroundColor: t.cardBorder }]}
                onPress={() => setRespRate((prev) => Math.max(8, prev - 2))}
              >
                <Text style={[styles.stepBtnText, { color: t.text }]}>−</Text>
              </TouchableOpacity>
              <Text style={[styles.stepValue, { color: t.accent }]}>
                {respRate} <Text style={[styles.stepUnit, { color: t.textMuted }]}>RPM</Text>
              </Text>
              <TouchableOpacity
                style={[styles.stepBtn, { backgroundColor: t.cardBorder }]}
                onPress={() => setRespRate((prev) => Math.min(40, prev + 2))}
              >
                <Text style={[styles.stepBtnText, { color: t.text }]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* CARD 4: DISSECTION & EXPLODED VIEW */}
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🔬</Text>
            <View>
              <Text style={[styles.cardHeading, { color: t.text }]}>Dissection & Exploded View</Text>
              <Text style={[styles.cardSub, { color: t.textMuted }]}>Separate anatomical layers along normal vectors</Text>
            </View>
          </View>

          <View style={styles.stepperRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowLabel, { color: t.text }]}>Explosion Level</Text>
              <Text style={[styles.rowDesc, { color: t.textMuted }]}>Distance separating organ groups</Text>
            </View>
            <View style={[styles.stepperControls, { backgroundColor: t.surfaceSecondary }]}>
              <TouchableOpacity
                style={[styles.stepBtn, { backgroundColor: t.cardBorder }]}
                onPress={() => setExplodeVal((prev) => Math.max(0, +(prev - 0.2).toFixed(1)))}
              >
                <Text style={[styles.stepBtnText, { color: t.text }]}>−</Text>
              </TouchableOpacity>
              <Text style={[styles.stepValue, { color: t.accent }]}>{Math.round(explodeVal * 100)}%</Text>
              <TouchableOpacity
                style={[styles.stepBtn, { backgroundColor: t.cardBorder }]}
                onPress={() => setExplodeVal((prev) => Math.min(1, +(prev + 0.2).toFixed(1)))}
              >
                <Text style={[styles.stepBtnText, { color: t.text }]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* CARD 5: DEVELOPER & SYSTEM CREDITS */}
        <View style={[styles.card, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>👨‍💻</Text>
            <View>
              <Text style={[styles.cardHeading, { color: t.text }]}>Developer Details</Text>
              <Text style={[styles.cardSub, { color: t.textMuted }]}>Created & Developed by Salman Anik</Text>
            </View>
          </View>

          <View style={[styles.devBadgeRow, { backgroundColor: t.surfaceSecondary }]}>
            <View style={[styles.devAvatar, { backgroundColor: t.accent, borderColor: t.accentLight }]}>
              <Text style={styles.devAvatarText}>SA</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.devName, { color: t.text }]}>Salman Anik</Text>
              <Text style={[styles.devHandle, { color: t.accent }]}>@salmananik</Text>
              <Text style={[styles.devRole, { color: t.textMuted }]}>
                Lead Developer & Medical Informatics
              </Text>
            </View>
          </View>

          <View style={[styles.devInfoList, { backgroundColor: t.surface, borderColor: t.border }]}>
            <View style={[styles.devInfoRow, { borderBottomColor: t.border }]}>
              <Text style={[styles.devInfoLabel, { color: t.textMuted }]}>Author</Text>
              <Text style={[styles.devInfoValue, { color: t.accent, fontWeight: '700' }]}>
                salmananik
              </Text>
            </View>
            <View style={[styles.devInfoRow, { borderBottomColor: t.border }]}>
              <Text style={[styles.devInfoLabel, { color: t.textMuted }]}>GitHub</Text>
              <Text style={[styles.devInfoValue, { color: t.accent }]} numberOfLines={1}>
                github.com/salman-anik/AnaPharm
              </Text>
            </View>
            <View style={[styles.devInfoRow, { borderBottomColor: t.border }]}>
              <Text style={[styles.devInfoLabel, { color: t.textMuted }]}>Clinical DB</Text>
              <Text style={[styles.devInfoValue, { color: t.text }]} numberOfLines={1}>
                25 Diseases + 2,594 Generics (33k+ Brands)
              </Text>
            </View>
            <View style={[styles.devInfoRow, { borderBottomWidth: 0 }]}>
              <Text style={[styles.devInfoLabel, { color: t.textMuted }]}>App Version</Text>
              <Text style={[styles.devInfoValue, { color: t.text }]}>
                1.0.0 (Release Verified)
              </Text>
            </View>
          </View>
        </View>

        {/* CARD 6: MEDICAL ADVISORY DISCLAIMER */}
        <View style={[styles.card, styles.disclaimerCard, { backgroundColor: t.isDark ? '#261a06' : '#fffbeb', borderColor: '#f59e0b' }]}>
          <Text style={[styles.disclaimerTitle, { color: '#f59e0b' }]}>
            ⚠️ Educational & Clinical Reference Notice
          </Text>
          <Text style={[styles.disclaimerBody, { color: t.isDark ? '#fed7aa' : '#78350f' }]}>
            AnaPharm provides interactive 3D human anatomy, disease etiologies, symptoms, and pharmacological references for educational and clinical guidance only. It does not substitute professional medical consultation, diagnosis, or prescription. Always consult a registered physician for acute symptoms.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
    fontWeight: '500',
  },
  scrollList: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  cardHeading: {
    fontSize: 16,
    fontWeight: '800',
  },
  cardSub: {
    fontSize: 12,
    marginTop: 2,
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  themeOptionCard: {
    width: '48%',
    borderRadius: 12,
    padding: 12,
  },
  themeOptionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  themeOptionIcon: {
    fontSize: 22,
  },
  activeCheckBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCheckText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
  themeOptionLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  themeOptionSub: {
    fontSize: 10,
    lineHeight: 14,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  rowDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  rowBorderTop: {
    borderTopWidth: 1,
    marginTop: 6,
    paddingTop: 12,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  stepperControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 4,
  },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 20,
  },
  stepValue: {
    fontSize: 14,
    fontWeight: '800',
    paddingHorizontal: 12,
    textAlign: 'center',
    minWidth: 70,
  },
  stepUnit: {
    fontSize: 10,
    fontWeight: '600',
  },
  devBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  devAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    marginRight: 12,
  },
  devAvatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  devName: {
    fontSize: 15,
    fontWeight: '700',
  },
  devHandle: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 1,
  },
  devRole: {
    fontSize: 11,
    marginTop: 2,
  },
  devInfoList: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  devInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  devInfoLabel: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 80,
  },
  devInfoValue: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  disclaimerCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  disclaimerTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },
  disclaimerBody: {
    fontSize: 12,
    lineHeight: 18,
  },
});

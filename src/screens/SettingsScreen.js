import React, { useRef, useCallback, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
  Linking,
  Animated,
  Easing,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { THEMES, FONT_SIZES, getTheme } from '../theme/theme';
import HealthIcon from '../components/HealthIcon';

export default function SettingsScreen({
  theme,
  setTheme,
  fontSize = 'medium',
  setFontSize,
  language = 'bn',
  setLanguage,
  autoRotate,
  setAutoRotate,
  xrayMode,
  setXrayMode,
  bpm,
  setBpm,
  respRate,
  setRespRate,
}) {
  const insets = useSafeAreaInsets();
  const t = getTheme(theme, fontSize);
  const themeList = Object.values(THEMES);

  // Auto-hiding Collapsible Header Animation
  const [headerHeight, setHeaderHeight] = useState(60);
  const headerY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const isHeaderHidden = useRef(false);

  const showHeader = useCallback(() => {
    if (isHeaderHidden.current) {
      isHeaderHidden.current = false;
      Animated.timing(headerY, {
        toValue: 0,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  }, [headerY]);

  const hideHeader = useCallback(() => {
    if (!isHeaderHidden.current) {
      isHeaderHidden.current = true;
      Animated.timing(headerY, {
        toValue: -headerHeight,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  }, [headerHeight, headerY]);

  const handleScroll = useCallback(
    (event) => {
      const currentY = event.nativeEvent.contentOffset.y;
      const diff = currentY - lastScrollY.current;

      if (currentY <= 30) {
        showHeader();
      } else if (diff > 25 && currentY > 120) {
        hideHeader();
      } else if (diff < -20) {
        showHeader();
      }

      lastScrollY.current = currentY;
    },
    [hideHeader, showHeader]
  );

  return (
    <View style={[styles.container, { backgroundColor: t.bg }]}>
      {/* Collapsible Header */}
      <Animated.View
        style={[
          styles.header,
          {
            paddingTop: insets.top > 0 ? insets.top + 6 : 14,
            backgroundColor: t.isDark ? '#09090b' : '#ffffff',
            borderBottomColor: t.isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.12)',
            borderTopColor: t.isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
            transform: [{ translateY: headerY }],
          },
        ]}
        onLayout={(e) => {
          const h = e.nativeEvent.layout.height;
          if (h > 0) setHeaderHeight(h);
        }}
      >
        <Text style={[styles.title, { color: t.text, fontSize: t.fs(26) }]}>
          Settings
        </Text>
      </Animated.View>

      <ScrollView
        contentContainerStyle={[styles.scrollList, { paddingTop: headerHeight + 8 }]}
        scrollIndicatorInsets={{ top: headerHeight }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* CARD 1: THEME SELECTION - Clean, No subtitles, No emoji before title */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: t.card,
              borderColor: t.cardBorder,
              shadowColor: t.shadowColor,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardHeading, { color: t.text }]}>Theme</Text>
          </View>

          <View style={styles.themeGrid}>
            {themeList.map((item) => {
              const isSelected = theme === item.id;
              const cardTextColor = item.isDark ? '#ffffff' : '#000000';

              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.themeOptionCard,
                    {
                      backgroundColor: item.card,
                      borderColor: isSelected
                        ? '#D8BDF8'
                        : item.cardBorder,
                      borderWidth: isSelected ? 2.5 : 1,
                    },
                  ]}
                  onPress={() => setTheme(item.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.themeOptionTop}>
                    <HealthIcon
                      name={item.isDark ? 'bodyFilled' : 'bodyOutline'}
                      size={22}
                      color={cardTextColor}
                    />
                    {isSelected && (
                      <View
                        style={[
                          styles.activeCheckBadge,
                          { backgroundColor: '#D8BDF8' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.activeCheckText,
                            { color: '#1e1b4b' },
                          ]}
                        >
                          ✓
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.themeOptionLabel, { color: cardTextColor }]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* CARD 2: FONT SIZE CHANGER - Clean, No subtitles, No emoji */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: t.card,
              borderColor: t.cardBorder,
              shadowColor: t.shadowColor,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardHeading, { color: t.text }]}>Font Size</Text>
          </View>

          {/* Segmented Font Size Options */}
          <View
            style={[
              styles.fontSizeRow,
              {
                backgroundColor: t.surfaceSecondary,
                borderColor: t.border,
              },
            ]}
          >
            {Object.values(FONT_SIZES).map((opt) => {
              const active = (fontSize || 'medium') === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  style={[
                    styles.fontSizeBtn,
                    active && {
                      backgroundColor: '#D8BDF8',
                    },
                  ]}
                  onPress={() => setFontSize && setFontSize(opt.id)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.fontSizeBtnIcon,
                      {
                        color: active ? '#1e1b4b' : t.text,
                      },
                    ]}
                  >
                    {opt.icon}
                  </Text>
                  <Text
                    style={[
                      styles.fontSizeBtnLabel,
                      {
                        color: active ? '#1e1b4b' : t.textMuted,
                        fontWeight: active ? '800' : '600',
                        fontFamily: active ? 'HindSiliguri-Bold' : 'HindSiliguri-Medium',
                      },
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Live Preview Box */}
          <View
            style={[
              styles.fontPreviewBox,
              {
                backgroundColor: t.surfaceSecondary,
                borderColor: t.border,
              },
            ]}
          >
            <Text
              style={[
                styles.fontPreviewSample,
                {
                  color: t.text,
                  fontSize: t.fs(14),
                  lineHeight: Math.round(t.fs(14) * 1.45),
                },
              ]}
            >
              Paracetamol 500mg • প্যারাসিটামল ৫০০ মি.গ্রা.
            </Text>
          </View>
        </View>

        {/* CARD 5: DEVELOPER & SYSTEM - Clean, No subtitles, No emoji */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: t.card,
              borderColor: t.cardBorder,
              shadowColor: t.shadowColor,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Text style={[styles.cardHeading, { color: t.text }]}>About</Text>
              <View
                style={[
                  styles.openSourcePill,
                  {
                    backgroundColor: t.isDark ? '#27272a' : '#e4e4e7',
                    borderColor: t.cardBorder,
                  },
                ]}
              >
                <Text style={[styles.openSourcePillText, { color: t.text }]}>
                  Open Source Project
                </Text>
              </View>
            </View>
          </View>

          {/* Open Source Banner */}
          <View
            style={[
              styles.openSourceBanner,
              {
                backgroundColor: t.surfaceSecondary,
                borderColor: t.border,
              },
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <HealthIcon name="pharmacy" size={14} color={t.text} style={{ marginRight: 6 }} />
              <Text style={[styles.openSourceTitle, { color: t.text }]}>
                Free & Open Source Project
              </Text>
            </View>
            <Text style={[styles.openSourceDesc, { color: t.textMuted }]}>
              AnaPharm is an open source medical and pharmacological reference application built for doctors, healthcare workers, medical students, and developers. Contributions, feedback, and issue reports are openly welcomed on GitHub.
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.devBadgeRow,
              {
                backgroundColor: t.surfaceSecondary,
                borderColor: t.border,
              },
            ]}
            onPress={() => Linking.openURL('https://salmananik.vercel.app/')}
            activeOpacity={0.7}
          >
            <TouchableOpacity
              style={[
                styles.devAvatar,
                {
                  backgroundColor: t.isDark ? '#27272a' : '#e4e4e7',
                  borderColor: t.cardBorder,
                },
              ]}
              onPress={() => Linking.openURL('https://salmananik.vercel.app/')}
              activeOpacity={0.8}
            >
              <Image
                source={require('../../assets/salman-anik.jpg')}
                style={styles.devAvatarImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={[styles.devName, { color: t.text }]}>Salman Anik</Text>
              <Text style={[styles.devHandle, { color: t.textMuted }]}>
                salmananik.vercel.app
              </Text>
            </View>
          </TouchableOpacity>

          {/* Action Buttons: GitHub & Email/Bug Report */}
          <View style={styles.devButtonsRow}>
            <TouchableOpacity
              style={[
                styles.devActionBtn,
                {
                  backgroundColor: t.isDark ? '#ffffff' : '#000000',
                },
              ]}
              onPress={() => Linking.openURL('https://github.com/salman-anik/AnaPharm')}
              activeOpacity={0.8}
            >
              <Image
                source={require('../../assets/github.png')}
                style={[
                  styles.devActionIcon,
                  { tintColor: t.isDark ? '#000000' : '#ffffff' },
                ]}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.devActionBtnText,
                  { color: t.isDark ? '#000000' : '#ffffff' },
                ]}
              >
                GitHub Repo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.devActionBtn,
                {
                  backgroundColor: t.isDark ? '#27272a' : '#f4f4f5',
                  borderColor: t.border,
                  borderWidth: 1,
                },
              ]}
              onPress={() =>
                Linking.openURL(
                  'mailto:slamananik.bd@gmail.com?subject=AnaPharm%20Update%20or%20Bug%20Report'
                )
              }
              activeOpacity={0.8}
            >
              <Image
                source={require('../../assets/mail.png')}
                style={[
                  styles.devActionIcon,
                  { tintColor: t.text },
                ]}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.devActionBtnText,
                  { color: t.text },
                ]}
              >
                Email / Bug
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.devInfoList,
              { backgroundColor: t.surfaceSecondary, borderColor: t.border },
            ]}
          >
            <View style={[styles.devInfoRow, { borderBottomColor: t.border }]}>
              <Text style={[styles.devInfoLabel, { color: t.textMuted }]}>
                Project
              </Text>
              <Text style={[styles.devInfoValue, { color: t.text }]}>
                Open Source (Public Repo)
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.devInfoRow, { borderBottomColor: t.border }]}
              onPress={() => Linking.openURL('https://github.com/salman-anik/AnaPharm')}
              activeOpacity={0.7}
            >
              <Text style={[styles.devInfoLabel, { color: t.textMuted }]}>
                GitHub
              </Text>
              <Text
                style={[styles.devInfoValue, { color: t.text, textDecorationLine: 'underline' }]}
                numberOfLines={1}
              >
                salman-anik/AnaPharm
              </Text>
            </TouchableOpacity>
            <View style={[styles.devInfoRow, { borderBottomColor: t.border }]}>
              <Text style={[styles.devInfoLabel, { color: t.textMuted }]}>
                Author
              </Text>
              <Text style={[styles.devInfoValue, { color: t.text }]}>
                Salman Anik
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.devInfoRow, { borderBottomColor: t.border }]}
              onPress={() =>
                Linking.openURL(
                  'mailto:slamananik.bd@gmail.com?subject=AnaPharm%20Update%20or%20Bug%20Report'
                )
              }
              activeOpacity={0.7}
            >
              <Text style={[styles.devInfoLabel, { color: t.textMuted }]}>
                Email / Bug
              </Text>
              <Text
                style={[styles.devInfoValue, { color: t.text }]}
                numberOfLines={1}
              >
                slamananik.bd@gmail.com
              </Text>
            </TouchableOpacity>
            <View style={[styles.devInfoRow, { borderBottomColor: t.border }]}>
              <Text style={[styles.devInfoLabel, { color: t.textMuted }]}>
                Pharma Dataset
              </Text>
              <Text
                style={[styles.devInfoValue, { color: t.text }]}
                numberOfLines={1}
              >
                2,594 Generics • 225 Companies
              </Text>
            </View>
            <View style={[styles.devInfoRow, { borderBottomWidth: 0 }]}>
              <Text style={[styles.devInfoLabel, { color: t.textMuted }]}>
                Version
              </Text>
              <Text style={[styles.devInfoValue, { color: t.text }]}>
                1.0.0 (Release)
              </Text>
            </View>
          </View>
        </View>

        {/* CARD 6: NOTICE - Clean */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: t.surfaceSecondary,
              borderColor: t.cardBorder,
            },
          ]}
        >
          <Text style={[styles.disclaimerTitle, { color: t.text }]}>
            Open Source Notice
          </Text>
          <Text style={[styles.disclaimerBody, { color: t.textMuted }]}>
            AnaPharm is an open source community initiative designed for anatomical education and pharmacology reference. It does not replace professional medical advice, diagnosis, or treatment. Consult a licensed physician for medical conditions.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1.5,
    borderTopWidth: 1,
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  scrollList: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  cardHeading: {
    fontSize: 16,
    fontWeight: '800',
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  themeOptionCard: {
    width: '48%',
    borderRadius: 14,
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
    fontSize: 12,
    fontWeight: '800',
  },
  themeOptionLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  themeOptionSub: {
    fontSize: 10,
    marginTop: 2,
  },
  fontSizeRow: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    gap: 4,
  },
  fontSizeBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  fontSizeBtnIcon: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 2,
  },
  fontSizeBtnLabel: {
    fontSize: 11,
  },
  fontPreviewBox: {
    marginTop: 12,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontPreviewSample: {
    fontWeight: '600',
    textAlign: 'center',
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
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
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
  openSourcePill: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  openSourcePillText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  openSourceBanner: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  openSourceTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  openSourceDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  devBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  devAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    marginRight: 12,
    overflow: 'hidden',
  },
  devAvatarImage: {
    width: '100%',
    height: '100%',
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
  devButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  devActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  devActionIcon: {
    width: 16,
    height: 16,
  },
  devActionBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  devInfoList: {
    borderRadius: 14,
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

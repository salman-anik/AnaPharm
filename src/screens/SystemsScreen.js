import React, { useState, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SYSTEMS, ANATOMY_DATA } from '../data/anatomyData';
import OrganDetailModal from './OrganDetailModal';
import { getTheme } from '../theme/theme';
import HealthIcon, { getSystemIcon, getOrganIcon } from '../components/HealthIcon';

export default function SystemsScreen({
  theme = 'light',
  fontSize = 'medium',
  language = 'bn',
}) {
  const insets = useSafeAreaInsets();
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedOrganData, setSelectedOrganData] = useState(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  const t = getTheme(theme, fontSize);
  const systemKeys = Object.keys(SYSTEMS);

  // Auto-hiding Collapsible Header Animation
  const [headerHeight, setHeaderHeight] = useState(72);
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

  const getOrgansForSystem = (sysKey) => {
    return Object.values(ANATOMY_DATA).filter((item) => item.system === sysKey);
  };

  const handleOpenOrgan = (organ) => {
    setSelectedOrganData(organ);
    setSheetVisible(true);
  };

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
        <View style={styles.headerTitleColumn}>
          <Text style={[styles.title, { color: t.text, fontSize: t.fs(26) }]}>
            Anatomical Systems
          </Text>
          <Text style={[styles.subTitle, { color: t.textMuted, fontSize: t.fs(12) }]}>
            {systemKeys.length} Networks
          </Text>
        </View>
      </Animated.View>

      <ScrollView
        contentContainerStyle={[styles.scrollList, { paddingTop: headerHeight + 8 }]}
        scrollIndicatorInsets={{ top: headerHeight }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {systemKeys.map((sysKey) => {
          const sys = SYSTEMS[sysKey];
          const organs = getOrgansForSystem(sysKey);
          const isExpanded = selectedSystem === sysKey;

          return (
            <View
              key={sysKey}
              style={[
                styles.systemCard,
                {
                  backgroundColor: t.card,
                  borderColor: isExpanded ? '#D8BDF8' : t.cardBorder,
                  borderWidth: isExpanded ? 1.5 : 1,
                  shadowColor: t.shadowColor,
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.cardHeader,
                  {
                    backgroundColor: isExpanded
                      ? t.accentBg
                      : 'transparent',
                    borderBottomColor: isExpanded ? t.border : 'transparent',
                  },
                ]}
                activeOpacity={0.75}
                onPress={() => setSelectedSystem(isExpanded ? null : sysKey)}
              >
                <View
                  style={[
                    styles.iconCircle,
                    {
                      backgroundColor: t.accentBg,
                      borderColor: t.cardBorder,
                      flexShrink: 0,
                    },
                  ]}
                >
                  <HealthIcon source={getSystemIcon(sysKey)} size={Math.max(20, Math.round(t.fs(22)))} color={t.text} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.sysName, { color: t.text, fontSize: t.fs(15) }]}>
                    {language === 'bn' ? (sys.name_bn || sys.name) : sys.name}
                  </Text>
                  <Text style={[styles.organCount, { color: t.textMuted, fontSize: t.fs(11) }]}>
                    {organs.length} {organs.length === 1 ? 'organ mapped' : 'organs mapped'}
                  </Text>
                </View>
                <View
                  style={[
                    styles.chevronBox,
                    {
                      backgroundColor: isExpanded ? '#D8BDF8' : t.chipBg,
                      borderColor: isExpanded ? '#D8BDF8' : t.chipBorder,
                      flexShrink: 0,
                    },
                  ]}
                >
                  <Text style={[styles.chevron, { color: isExpanded ? '#1e1b4b' : t.text, fontSize: t.fs(10) }]}>
                    {isExpanded ? '▲' : '▼'}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Expanded Organ List */}
              {isExpanded && (
                <View
                  style={[
                    styles.organsContainer,
                    {
                      backgroundColor: t.surfaceSecondary,
                      borderTopColor: t.border,
                    },
                  ]}
                >
                  {organs.map((organ) => (
                    <TouchableOpacity
                      key={organ.name}
                      style={[
                        styles.organRow,
                        {
                          backgroundColor: t.card,
                          borderColor: t.cardBorder,
                          paddingVertical: Math.max(8, Math.round(t.fs(10))),
                          paddingHorizontal: Math.max(10, Math.round(t.fs(12))),
                        },
                      ]}
                      onPress={() => handleOpenOrgan(organ)}
                      activeOpacity={0.7}
                    >
                      <View style={{ flex: 1, marginRight: 8 }}>
                        <View style={styles.organTitleRow}>
                          <HealthIcon
                            source={getOrganIcon(organ.name)}
                            size={Math.max(15, Math.round(t.fs(16)))}
                            color={t.text}
                            style={{ marginRight: 8, flexShrink: 0 }}
                          />
                          <Text style={[styles.organName, { color: t.text, fontSize: t.fs(13) }]}>
                            {language === 'bn' ? (organ.name_bn || organ.name) : organ.name}
                          </Text>
                        </View>
                        {organ.latin ? (
                          <Text style={[styles.organLatin, { color: t.textMuted, fontSize: t.fs(11) }]}>
                            {organ.latin}
                          </Text>
                        ) : null}
                      </View>
                      <View
                        style={[
                          styles.viewBadge,
                          {
                            backgroundColor: t.accentBg,
                            borderColor: t.cardBorder,
                            paddingVertical: Math.max(4, Math.round(t.fs(5))),
                            paddingHorizontal: Math.max(8, Math.round(t.fs(10))),
                            flexShrink: 0,
                          },
                        ]}
                      >
                        <Text style={[styles.viewBadgeText, { color: t.text, fontSize: t.fs(11) }]}>
                          {language === 'bn' ? 'বিস্তারিত ➔' : 'Details ➔'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* Dedicated Separate Page for Organ Details */}
      <OrganDetailModal
        visible={sheetVisible}
        organData={selectedOrganData}
        onClose={() => setSheetVisible(false)}
        theme={theme}
        fontSize={fontSize}
        initialLanguage={language}
      />
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
  },
  headerTitleColumn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
    marginTop: 2,
    textAlign: 'center',
  },
  scrollList: {
    padding: 16,
    gap: 12,
  },
  systemCard: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
    borderBottomWidth: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  sysIcon: {
    fontSize: 22,
  },
  sysName: {
    fontFamily: 'HindSiliguri-Bold',
    fontWeight: '700',
    marginBottom: 2,
  },
  organCount: {
    fontFamily: 'HindSiliguri-Regular',
  },
  chevronBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  chevron: {
    fontWeight: '800',
  },
  organsContainer: {
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
  },
  organRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  organTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  organName: {
    fontFamily: 'HindSiliguri-Medium',
    fontWeight: '700',
  },
  organLatin: {
    fontStyle: 'italic',
    marginTop: 2,
  },
  viewBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  viewBadgeText: {
    fontWeight: '700',
  },
});

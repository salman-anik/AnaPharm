import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SYSTEMS, ANATOMY_DATA } from '../data/anatomyData';
import OrganDetailsSheet from '../components/OrganDetailsSheet';
import { getTheme } from '../theme/theme';
import HealthIcon, { getSystemIcon, getOrganIcon } from '../components/HealthIcon';

export default function SystemsScreen({ theme = 'dark', fontSize = 'medium' }) {
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedOrganData, setSelectedOrganData] = useState(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  const t = getTheme(theme, fontSize);
  const systemKeys = Object.keys(SYSTEMS);

  const getOrgansForSystem = (sysKey) => {
    return Object.values(ANATOMY_DATA).filter((item) => item.system === sysKey);
  };

  const handleOpenOrgan = (organ) => {
    setSelectedOrganData(organ);
    setSheetVisible(true);
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: t.bg }]}
    >
      {/* Clean Frosted Header - No annoying subtitles */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: t.headerBg,
            borderBottomColor: t.glassBorder,
          },
        ]}
      >
        <View style={styles.headerTitleColumn}>
          <Text style={[styles.title, { color: t.text, fontSize: t.fs(26) }]}>
            Anatomical Systems
          </Text>
          <Text style={[styles.subTitle, { color: t.textMuted, fontSize: t.fs(12) }]}>
            {systemKeys.length} Networks
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollList}>
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
                  borderColor: isExpanded ? t.text : t.cardBorder,
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
                    },
                  ]}
                >
                  <HealthIcon source={getSystemIcon(sysKey)} size={22} color={t.text} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.sysName, { color: t.text }]}>
                    {sys.name}
                  </Text>
                  <Text style={[styles.organCount, { color: t.textMuted }]}>
                    {organs.length} {organs.length === 1 ? 'organ mapped' : 'organs mapped'}
                  </Text>
                </View>
                <View
                  style={[
                    styles.chevronBox,
                    {
                      backgroundColor: isExpanded ? (t.isDark ? '#3f3f46' : '#d4d4d8') : t.chipBg,
                      borderColor: t.chipBorder,
                    },
                  ]}
                >
                  <Text style={[styles.chevron, { color: t.text }]}>
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
                        },
                      ]}
                      onPress={() => handleOpenOrgan(organ)}
                      activeOpacity={0.7}
                    >
                      <View style={{ flex: 1 }}>
                        <View style={styles.organTitleRow}>
                          <HealthIcon
                            source={getOrganIcon(organ.name)}
                            size={16}
                            color={t.text}
                            style={{ marginRight: 8 }}
                          />
                          <Text style={[styles.organName, { color: t.text }]}>
                            {organ.name}
                          </Text>
                        </View>
                        {organ.latin ? (
                          <Text style={[styles.organLatin, { color: t.textMuted }]}>
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
                          },
                        ]}
                      >
                        <Text style={[styles.viewBadgeText, { color: t.text }]}>
                          Details ➔
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

      {/* Details Sheet with live theme support */}
      <OrganDetailsSheet
        visible={sheetVisible}
        organData={selectedOrganData}
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    elevation: 4,
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
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  organCount: {
    fontSize: 11,
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
    fontSize: 10,
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
    fontSize: 13,
    fontWeight: '700',
  },
  organLatin: {
    fontStyle: 'italic',
    fontSize: 11,
    marginTop: 2,
  },
  viewBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  viewBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
});

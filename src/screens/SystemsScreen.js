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

export default function SystemsScreen({ theme = 'dark' }) {
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedOrganData, setSelectedOrganData] = useState(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  const t = getTheme(theme);
  const isLight = !t.isDark;

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
      style={[
        styles.container,
        { backgroundColor: t.bg },
      ]}
    >
      {/* Screen Header */}
      <View style={[styles.header, { backgroundColor: t.headerBg, borderBottomColor: t.border }]}>
        <Text style={[styles.title, isLight && styles.titleLight]}>Anatomical Systems</Text>
        <Text style={[styles.subtitle, isLight && styles.subtitleLight]}>Explore organ networks and physiological pathways</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollList}>
        {systemKeys.map((sysKey) => {
          const sys = SYSTEMS[sysKey];
          const organs = getOrgansForSystem(sysKey);
          const isExpanded = selectedSystem === sysKey;

          return (
            <View key={sysKey} style={[styles.systemCard, isLight && styles.systemCardLight]}>
              <TouchableOpacity
                style={[styles.cardHeader, isLight && styles.cardHeaderLight]}
                activeOpacity={0.7}
                onPress={() => setSelectedSystem(isExpanded ? null : sysKey)}
              >
                <View style={[styles.iconCircle, isLight && styles.iconCircleLight]}>
                  <Text style={styles.sysIcon}>{sys.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.sysName, isLight && styles.sysNameLight]}>
                    {sys.name}
                  </Text>
                  <Text style={[styles.organCount, isLight && styles.organCountLight]}>
                    {organs.length} {organs.length === 1 ? 'organ mapped' : 'organs mapped'}
                  </Text>
                </View>
                <Text style={[styles.chevron, isLight && styles.chevronLight]}>{isExpanded ? '▲' : '▼'}</Text>
              </TouchableOpacity>

              {/* Expanded Organ List */}
              {isExpanded && (
                <View style={[styles.organsContainer, isLight && styles.organsContainerLight]}>
                  {organs.map((organ) => (
                    <TouchableOpacity
                      key={organ.name}
                      style={[styles.organRow, isLight && styles.organRowLight]}
                      onPress={() => handleOpenOrgan(organ)}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.organName, isLight && styles.organNameLight]}>
                          {organ.name}
                        </Text>
                        {organ.latin ? (
                          <Text style={[styles.organLatin, isLight && styles.organLatinLight]}>{organ.latin}</Text>
                        ) : null}
                      </View>
                      <View style={[styles.viewBadge, isLight && styles.viewBadgeLight]}>
                        <Text style={[styles.viewBadgeText, isLight && styles.viewBadgeTextLight]}>Details ➔</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* Details Sheet */}
      <OrganDetailsSheet
        visible={sheetVisible}
        organData={selectedOrganData}
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
    gap: 12,
  },
  systemCard: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sysIcon: {
    fontSize: 22,
  },
  sysName: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '600',
  },
  sysNameBn: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '500',
  },
  organNameBn: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '500',
  },
  organCount: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 2,
  },
  chevron: {
    color: '#94a3b8',
    fontSize: 12,
  },
  organsContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    backgroundColor: '#1e293b22',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  organRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  organName: {
    color: '#e2e8f0',
    fontSize: 15,
    fontWeight: '600',
  },
  organLatin: {
    color: '#38bdf8',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 2,
  },
  viewBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  viewBadgeText: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '600',
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
  systemCardLight: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeaderLight: {
    backgroundColor: '#ffffff',
  },
  iconCircleLight: {
    backgroundColor: '#f1f5f9',
  },
  sysNameLight: {
    color: '#0f172a',
  },
  sysNameBnLight: {
    color: '#0284c7',
  },
  organCountLight: {
    color: '#64748b',
  },
  chevronLight: {
    color: '#64748b',
  },
  organsContainerLight: {
    backgroundColor: '#f8fafc',
    borderTopColor: '#e2e8f0',
  },
  organRowLight: {
    borderBottomColor: '#f1f5f9',
  },
  organNameLight: {
    color: '#1e293b',
  },
  organNameBnLight: {
    color: '#0284c7',
  },
  organLatinLight: {
    color: '#0284c7',
  },
  viewBadgeLight: {
    backgroundColor: 'rgba(2, 132, 199, 0.1)',
  },
  viewBadgeTextLight: {
    color: '#0284c7',
  },
});

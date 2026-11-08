import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { SYSTEMS, ANATOMY_DATA } from '../data/anatomyData';
import OrganDetailsSheet from '../components/OrganDetailsSheet';

export default function SystemsScreen() {
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedOrganData, setSelectedOrganData] = useState(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  const systemKeys = Object.keys(SYSTEMS);

  const getOrgansForSystem = (sysKey) => {
    return Object.values(ANATOMY_DATA).filter((item) => item.system === sysKey);
  };

  const handleOpenOrgan = (organ) => {
    setSelectedOrganData(organ);
    setSheetVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Screen Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Anatomical Systems</Text>
        <Text style={styles.subtitle}>Explore organ networks and physiological pathways</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollList}>
        {systemKeys.map((sysKey) => {
          const sys = SYSTEMS[sysKey];
          const organs = getOrgansForSystem(sysKey);
          const isExpanded = selectedSystem === sysKey;

          return (
            <View key={sysKey} style={styles.systemCard}>
              <TouchableOpacity
                style={styles.cardHeader}
                activeOpacity={0.7}
                onPress={() => setSelectedSystem(isExpanded ? null : sysKey)}
              >
                <View style={styles.iconCircle}>
                  <Text style={styles.sysIcon}>{sys.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sysName}>{sys.name}</Text>
                  <Text style={styles.organCount}>
                    {organs.length} {organs.length === 1 ? 'organ mapped' : 'organs mapped'}
                  </Text>
                </View>
                <Text style={styles.chevron}>{isExpanded ? '▲' : '▼'}</Text>
              </TouchableOpacity>

              {/* Expanded Organ List */}
              {isExpanded && (
                <View style={styles.organsContainer}>
                  {organs.map((organ) => (
                    <TouchableOpacity
                      key={organ.name}
                      style={styles.organRow}
                      onPress={() => handleOpenOrgan(organ)}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.organName}>{organ.name}</Text>
                        {organ.latin ? (
                          <Text style={styles.organLatin}>{organ.latin}</Text>
                        ) : null}
                      </View>
                      <View style={styles.viewBadge}>
                        <Text style={styles.viewBadgeText}>Details ➔</Text>
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
});

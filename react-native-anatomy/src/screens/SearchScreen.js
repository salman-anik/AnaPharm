import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { ANATOMY_DATA, SYSTEMS } from '../data/anatomyData';
import OrganDetailsSheet from '../components/OrganDetailsSheet';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [selectedSystemFilter, setSelectedSystemFilter] = useState('all');
  const [selectedOrganData, setSelectedOrganData] = useState(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  const organList = useMemo(() => Object.values(ANATOMY_DATA), []);

  const filteredOrgans = useMemo(() => {
    return organList.filter((item) => {
      const matchesFilter =
        selectedSystemFilter === 'all' || item.system === selectedSystemFilter;
      const q = query.toLowerCase().trim();
      if (!q) return matchesFilter;

      const matchesQuery =
        item.name.toLowerCase().includes(q) ||
        (item.name_bn && item.name_bn.toLowerCase().includes(q)) ||
        (item.latin && item.latin.toLowerCase().includes(q)) ||
        (item.desc_bn && item.desc_bn.toLowerCase().includes(q)) ||
        (item.desc_en && item.desc_en.toLowerCase().includes(q));

      return matchesFilter && matchesQuery;
    });
  }, [organList, query, selectedSystemFilter]);

  const handleOpenOrgan = (organ) => {
    setSelectedOrganData(organ);
    setSheetVisible(true);
  };

  const filterOptions = [
    { id: 'all', label: 'All Parts' },
    { id: 'cardio', label: 'Cardio' },
    { id: 'nervous', label: 'Nervous' },
    { id: 'skeletal', label: 'Skeletal' },
    { id: 'digestive', label: 'Digestive' },
    { id: 'respiratory', label: 'Respiratory' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header & Search Input */}
      <View style={styles.header}>
        <Text style={styles.title}>Search Anatomy</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.input}
            placeholder="Search organs, diseases, Latin terms..."
            placeholderTextColor="#64748b"
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Chips */}
        <View style={styles.filterRow}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filterOptions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  selectedSystemFilter === item.id && styles.filterChipActive,
                ]}
                onPress={() => setSelectedSystemFilter(item.id)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedSystemFilter === item.id && styles.filterTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ gap: 8 }}
          />
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.countBar}>
        <Text style={styles.countText}>
          Showing {filteredOrgans.length} anatomical structures
        </Text>
      </View>

      {/* Results List */}
      <FlatList
        data={filteredOrgans}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const sys = SYSTEMS[item.system] || { name: 'System', icon: '🧬', color: '#38bdf8' };
          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => handleOpenOrgan(item)}
            >
              <View style={styles.cardTop}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  {item.latin ? (
                    <Text style={styles.cardLatin}>{item.latin}</Text>
                  ) : null}
                </View>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: sys.color + '22', borderColor: sys.color },
                  ]}
                >
                  <Text style={[styles.badgeText, { color: sys.color }]}>
                    {sys.icon} {sys.name}
                  </Text>
                </View>
              </View>

              {/* Bangla overview preview */}
              <Text style={styles.cardSnippet} numberOfLines={2}>
                {item.desc_bn || item.desc_en}
              </Text>

              {/* Diseases Tag */}
              {item.diseases_bn && (
                <View style={styles.diseaseSnippet}>
                  <Text style={styles.diseaseTag} numberOfLines={1}>
                    ⚠️ {item.diseases_bn[0]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />

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
    paddingBottom: 10,
    backgroundColor: '#0b132b',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 10,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
    height: 42,
  },
  clearBtn: {
    color: '#94a3b8',
    fontSize: 14,
    padding: 4,
  },
  filterRow: {
    marginTop: 2,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  filterChipActive: {
    backgroundColor: '#0284c7',
    borderColor: '#38bdf8',
  },
  filterText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  countBar: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
  },
  countText: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  cardLatin: {
    color: '#38bdf8',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardSnippet: {
    color: '#cbd5e1',
    fontSize: 13,
    lineHeight: 18,
  },
  diseaseSnippet: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  diseaseTag: {
    color: '#f87171',
    fontSize: 12,
    lineHeight: 16,
  },
});

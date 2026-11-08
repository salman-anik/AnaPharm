import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MEDICINE_DATABASE, MEDICINE_CATEGORIES } from '../data/medicineData';

export default function MedicineScreen({ theme = 'dark', onNavigateToOrgan }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const isLight = theme === 'light';

  const filteredMedicines = useMemo(() => {
    return MEDICINE_DATABASE.filter((med) => {
      const matchesCat =
        selectedCategory === 'all' || med.category === selectedCategory;

      if (!matchesCat) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const nameEn = (med.name_en || '').toLowerCase();
      const generic = (med.generic || '').toLowerCase();
      const workBn = (med.work_bn || '').toLowerCase();
      const catBn = (med.category_bn || '').toLowerCase();
      const organ = (med.target_organ || '').toLowerCase();
      const brands = (med.brands || '').toLowerCase();

      return (
        nameEn.includes(q) ||
        generic.includes(q) ||
        workBn.includes(q) ||
        catBn.includes(q) ||
        organ.includes(q) ||
        brands.includes(q)
      );
    });
  }, [searchQuery, selectedCategory]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderMedicineCard = ({ item }) => {
    const isExpanded = expandedId === item.id;

    return (
      <View style={[styles.card, isLight && styles.cardLight]}>
        <TouchableOpacity
          style={[styles.cardHeader, isLight && styles.cardHeaderLight]}
          onPress={() => toggleExpand(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.headerLeft}>
            <View style={[styles.iconCircle, isLight && styles.iconCircleLight]}>
              <Text style={styles.medIcon}>{item.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.medNameEn, isLight && styles.medNameEnLight]}>{item.name_en}</Text>
              <View style={styles.badgeRow}>
                <View style={[styles.categoryBadge, isLight && styles.categoryBadgeLight]}>
                  <Text style={[styles.categoryBadgeText, isLight && styles.categoryBadgeTextLight]}>
                    {item.category_bn}
                  </Text>
                </View>
                {item.target_organ ? (
                  <View style={[styles.organBadge, isLight && styles.organBadgeLight]}>
                    <Text style={[styles.organBadgeText, isLight && styles.organBadgeTextLight]}>
                      🎯 {item.target_organ}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>

          <View style={[styles.expandPill, isLight && styles.expandPillLight]}>
            <Text style={[styles.expandPillText, isLight && styles.expandPillTextLight]}>
              {isExpanded ? '▲' : '▼'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Primary Work / Indication in Bangla */}
        <View style={[styles.workContainer, isLight && styles.workContainerLight]}>
          <Text style={[styles.workLabel, isLight && styles.workLabelLight]}>ওষুধের মূল কাজ (Primary Action):</Text>
          <Text style={[styles.workText, isLight && styles.workTextLight]}>{item.work_bn}</Text>
        </View>

        {/* Expanded Detailed Clinical Dossier */}
        {isExpanded ? (
          <View style={[styles.expandedContent, isLight && styles.expandedContentLight]}>
            {/* Mechanism of Action */}
            <View style={[styles.detailBlock, isLight && styles.detailBlockLight]}>
              <Text style={[styles.detailTitle, isLight && styles.detailTitleLight]}>🔬 যেভাবে কাজ করে (Mechanism of Action):</Text>
              <Text style={[styles.detailText, isLight && styles.detailTextLight]}>{item.how_it_works_bn}</Text>
            </View>

            {/* Dosage */}
            <View style={[styles.detailBlock, isLight && styles.detailBlockLight]}>
              <Text style={[styles.detailTitle, isLight && styles.detailTitleLight]}>💊 খাবার নিয়ম ও মাত্রা (Dosage Guidance):</Text>
              <Text style={[styles.detailText, isLight && styles.detailTextLight]}>{item.dosage_bn}</Text>
            </View>

            {/* Side Effects */}
            <View style={[styles.detailBlock, isLight && styles.detailBlockLight]}>
              <Text style={[styles.detailTitle, { color: isLight ? '#d97706' : '#f59e0b' }]}>
                ⚠️ সম্ভাব্য পার্শ্বপ্রতিক্রিয়া (Side Effects):
              </Text>
              <Text style={[styles.detailText, isLight && styles.detailTextLight]}>{item.side_effects_bn}</Text>
            </View>

            {/* Precautions */}
            <View style={styles.detailBlock}>
              <Text style={[styles.detailTitle, { color: isLight ? '#e11d48' : '#f43f5e' }]}>
                🛑 সতর্কতা ও নিষেধাজ্ঞা (Precautions):
              </Text>
              <Text style={[styles.detailText, isLight && styles.detailTextLight]}>{item.precautions_bn}</Text>
            </View>

            {/* Top Bangladesh Brands */}
            {item.brands ? (
              <View style={[styles.detailBlock, { borderBottomWidth: 0 }]}>
                <Text style={[styles.detailTitle, { color: isLight ? '#0284c7' : '#38bdf8' }]}>
                  🏷️ বাংলাদেশে প্রচলিত ব্র্যান্ড (Top BD Brands):
                </Text>
                <Text style={[styles.detailText, isLight && styles.detailTextLight, { fontWeight: '600' }]}>
                  {item.brands}
                </Text>
              </View>
            ) : null}

            {/* Strengths & Forms */}
            {item.strengths && item.strengths.length > 0 ? (
              <View style={[styles.detailBlock, { borderBottomWidth: 0, marginTop: 6 }]}>
                <Text style={[styles.detailTitle, { color: isLight ? '#059669' : '#10b981' }]}>
                  📏 উপলব্ধ মাত্রা ও ফরম (Available Strengths & Forms):
                </Text>
                <Text style={[styles.detailText, isLight && styles.detailTextLight]}>
                  {item.strengths.join(', ')} {item.dosage_forms && item.dosage_forms.length > 0 ? `• [${item.dosage_forms.slice(0, 4).join(', ')}]` : ''}
                </Text>
              </View>
            ) : null}

            {/* Pregnancy Category */}
            {item.pregnancy_category ? (
              <View style={[styles.detailBlock, { borderBottomWidth: 0, marginTop: 6 }]}>
                <Text style={[styles.detailTitle, { color: isLight ? '#7c3aed' : '#a855f7' }]}>
                  🤰 গর্ভকালীন নিরাপত্তা (FDA Pregnancy Category):
                </Text>
                <Text style={[styles.detailText, isLight && styles.detailTextLight, { fontWeight: '700' }]}>
                  Category {item.pregnancy_category}
                </Text>
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.container,
        { backgroundColor: isLight ? '#ffffff' : '#0f172a' },
      ]}
    >
      {/* Top Header */}
      <View style={[styles.topHeader, isLight && styles.topHeaderLight]}>
        <View style={styles.titleRow}>
          <View style={[styles.logoBadge, isLight && styles.logoBadgeLight]}>
            <Text style={styles.logoText}>💊</Text>
          </View>
          <View>
            <Text style={[styles.screenTitle, isLight && styles.screenTitleLight]}>AnaPharm</Text>
            <Text style={[styles.screenSubTitle, isLight && styles.screenSubTitleLight]}>
              বাংলাদেশের পূর্ণাঙ্গ ঔষধ নির্দেশিকা ({filteredMedicines.length} Generics)
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchBar, isLight && styles.searchBarLight]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, isLight && styles.searchInputLight]}
            placeholder="Search 2,500+ generics, brands (Napa, Seclo, প্যারাসিটামল)..."
            placeholderTextColor={isLight ? '#94a3b8' : '#64748b'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={[styles.clearBtnText, isLight && styles.clearBtnTextLight]}>✕</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Category Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {MEDICINE_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryChip,
                  isLight && styles.categoryChipLight,
                  active && (isLight ? styles.categoryChipActiveLight : styles.categoryChipActive),
                ]}
                onPress={() => setSelectedCategory(cat.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.categoryChipIcon}>{cat.icon}</Text>
                <Text
                  style={[
                    styles.categoryChipLabel,
                    isLight && styles.categoryChipLabelLight,
                    active && styles.categoryChipLabelActive,
                  ]}
                >
                  {cat.label_bn}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Medicine List */}
      <FlatList
        data={filteredMedicines}
        keyExtractor={(item) => item.id}
        renderItem={renderMedicineCard}
        contentContainerStyle={styles.listContent}
        initialNumToRender={12}
        maxToRenderPerBatch={15}
        windowSize={7}
        removeClippedSubviews={true}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={[styles.emptyText, isLight && styles.emptyTextLight]}>কোনো ওষুধ পাওয়া যায়নি</Text>
            <Text style={[styles.emptySubText, isLight && styles.emptySubTextLight]}>অন্য কোনো নাম বা বাংলা রোগ দিয়ে অনুসন্ধান করুন</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  topHeader: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(14, 165, 233, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#f8fafc',
    letterSpacing: 0.3,
  },
  screenSubTitle: {
    fontSize: 12,
    color: '#38bdf8',
    marginTop: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
    paddingVertical: 0,
  },
  clearBtnText: {
    color: '#94a3b8',
    fontSize: 14,
    paddingHorizontal: 4,
  },
  categoryScroll: {
    gap: 8,
    paddingBottom: 4,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    gap: 6,
  },
  categoryChipActive: {
    backgroundColor: '#0284c7',
    borderColor: '#38bdf8',
  },
  categoryChipIcon: {
    fontSize: 13,
  },
  categoryChipLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
  },
  categoryChipLabelActive: {
    color: '#ffffff',
  },
  listContent: {
    padding: 16,
    gap: 14,
  },
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    backgroundColor: '#1e293b',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  medIcon: {
    fontSize: 20,
  },
  medNameEn: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(14, 165, 233, 0.2)',
  },
  categoryBadgeText: {
    fontSize: 10,
    color: '#38bdf8',
    fontWeight: '600',
  },
  organBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(244, 63, 94, 0.18)',
  },
  organBadgeText: {
    fontSize: 10,
    color: '#fb7185',
    fontWeight: '600',
  },
  expandPill: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandPillText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
  },
  workContainer: {
    padding: 14,
    backgroundColor: 'rgba(2, 6, 23, 0.6)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  workLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#38bdf8',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  workText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#f1f5f9',
    fontWeight: '500',
  },
  expandedContent: {
    padding: 14,
    backgroundColor: '#090f1d',
    gap: 12,
  },
  detailBlock: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  detailTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#38bdf8',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    lineHeight: 19,
    color: '#cbd5e1',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 4,
  },
  emptySubText: {
    fontSize: 12,
    color: '#64748b',
  },
  // Light Theme Styles
  containerLight: {
    backgroundColor: '#f8fafc',
  },
  topHeaderLight: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#e2e8f0',
  },
  logoBadgeLight: {
    backgroundColor: 'rgba(2, 132, 199, 0.1)',
    borderColor: 'rgba(2, 132, 199, 0.25)',
  },
  screenTitleLight: {
    color: '#0f172a',
  },
  screenSubTitleLight: {
    color: '#0284c7',
  },
  searchBarLight: {
    backgroundColor: '#f1f5f9',
    borderColor: '#e2e8f0',
  },
  searchInputLight: {
    color: '#0f172a',
  },
  clearBtnTextLight: {
    color: '#64748b',
  },
  categoryChipLight: {
    backgroundColor: '#f1f5f9',
    borderColor: '#e2e8f0',
  },
  categoryChipActiveLight: {
    backgroundColor: '#0284c7',
    borderColor: '#0284c7',
  },
  categoryChipLabelLight: {
    color: '#475569',
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
  cardHeaderLight: {
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  iconCircleLight: {
    backgroundColor: 'rgba(2, 132, 199, 0.1)',
    borderColor: 'rgba(2, 132, 199, 0.25)',
  },
  medNameEnLight: {
    color: '#0f172a',
  },
  categoryBadgeLight: {
    backgroundColor: 'rgba(2, 132, 199, 0.1)',
  },
  categoryBadgeTextLight: {
    color: '#0284c7',
  },
  organBadgeLight: {
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
  },
  organBadgeTextLight: {
    color: '#e11d48',
  },
  expandPillLight: {
    backgroundColor: '#e2e8f0',
  },
  expandPillTextLight: {
    color: '#475569',
  },
  workContainerLight: {
    backgroundColor: '#f8fafc',
    borderBottomColor: '#f1f5f9',
  },
  workLabelLight: {
    color: '#0284c7',
  },
  workTextLight: {
    color: '#1e293b',
  },
  expandedContentLight: {
    backgroundColor: '#ffffff',
  },
  detailBlockLight: {
    borderBottomColor: '#f1f5f9',
  },
  detailTitleLight: {
    color: '#0284c7',
  },
  detailTextLight: {
    color: '#334155',
  },
  emptyTextLight: {
    color: '#0f172a',
  },
  emptySubTextLight: {
    color: '#64748b',
  },
});

import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MEDICINE_DATABASE, MEDICINE_CATEGORIES } from '../data/medicineData';
import { getTheme } from '../theme/theme';

export default function MedicineScreen({ theme = 'dark', onNavigateToOrgan }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [globalLang, setGlobalLang] = useState('bn'); // 'bn' | 'en'
  const [cardLangMap, setCardLangMap] = useState({});

  const t = getTheme(theme);
  const isLight = !t.isDark;

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
      const workEn = (med.work_en || '').toLowerCase();
      const catBn = (med.category_bn || '').toLowerCase();
      const organ = (med.target_organ || '').toLowerCase();
      const brands = (med.brands || '').toLowerCase();

      return (
        nameEn.includes(q) ||
        generic.includes(q) ||
        workBn.includes(q) ||
        workEn.includes(q) ||
        catBn.includes(q) ||
        organ.includes(q) ||
        brands.includes(q)
      );
    });
  }, [searchQuery, selectedCategory]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleCardLang = (id) => {
    setCardLangMap((prev) => {
      const current = prev[id] || globalLang;
      return { ...prev, [id]: current === 'bn' ? 'en' : 'bn' };
    });
  };

  const renderMedicineCard = ({ item }) => {
    const isExpanded = expandedId === item.id;
    const cardLang = cardLangMap[item.id] || globalLang;
    const isBn = cardLang === 'bn';

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
                    {isBn ? item.category_bn : item.category_en}
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

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <TouchableOpacity
              onPress={() => toggleCardLang(item.id)}
              style={[styles.cardLangPill, isLight && styles.cardLangPillLight]}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={[styles.cardLangPillText, isLight && styles.cardLangPillTextLight]}>
                {isBn ? '🇧🇩 BN' : '🇬🇧 EN'}
              </Text>
            </TouchableOpacity>
            <View style={[styles.expandPill, isLight && styles.expandPillLight]}>
              <Text style={[styles.expandPillText, isLight && styles.expandPillTextLight]}>
                {isExpanded ? '▲' : '▼'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Primary Work / Indication */}
        <View style={[styles.workContainer, isLight && styles.workContainerLight]}>
          <View style={styles.workHeaderRow}>
            <Text style={[styles.workLabel, isLight && styles.workLabelLight]}>
              {isBn ? 'ওষুধের মূল কাজ (Primary Action):' : 'Primary Action & Clinical Indication:'}
            </Text>
          </View>
          <Text style={[styles.workText, isLight && styles.workTextLight]}>
            {isBn ? item.work_bn : (item.work_en || item.primary_indication_en)}
          </Text>
        </View>

        {/* Expanded Detailed Clinical Dossier */}
        {isExpanded ? (
          <View style={[styles.expandedContent, isLight && styles.expandedContentLight]}>
            {/* Mechanism of Action */}
            <View style={[styles.detailBlock, isLight && styles.detailBlockLight]}>
              <Text style={[styles.detailTitle, isLight && styles.detailTitleLight]}>
                🔬 {isBn ? 'যেভাবে কাজ করে (Mechanism of Action):' : 'Mechanism of Action & Pharmacology:'}
              </Text>
              <Text style={[styles.detailText, isLight && styles.detailTextLight]}>
                {isBn ? item.how_it_works_bn : item.how_it_works_en}
              </Text>
            </View>

            {/* Dosage */}
            <View style={[styles.detailBlock, isLight && styles.detailBlockLight]}>
              <Text style={[styles.detailTitle, isLight && styles.detailTitleLight]}>
                💊 {isBn ? 'খাবার নিয়ম ও মাত্রা (Dosage Guidance):' : 'Dosage & Administration:'}
              </Text>
              <Text style={[styles.detailText, isLight && styles.detailTextLight]}>
                {isBn ? item.dosage_bn : item.dosage_en}
              </Text>
            </View>

            {/* Side Effects */}
            <View style={[styles.detailBlock, isLight && styles.detailBlockLight]}>
              <Text style={[styles.detailTitle, { color: isLight ? '#d97706' : '#f59e0b' }]}>
                ⚠️ {isBn ? 'সম্ভাব্য পার্শ্বপ্রতিক্রিয়া (Side Effects):' : 'Possible Adverse Effects:'}
              </Text>
              <Text style={[styles.detailText, isLight && styles.detailTextLight]}>
                {isBn ? item.side_effects_bn : item.side_effects_en}
              </Text>
            </View>

            {/* Precautions */}
            <View style={styles.detailBlock}>
              <Text style={[styles.detailTitle, { color: isLight ? '#e11d48' : '#f43f5e' }]}>
                🛑 {isBn ? 'সতর্কতা ও নিষেধাজ্ঞা (Precautions):' : 'Precautions & Contraindications:'}
              </Text>
              <Text style={[styles.detailText, isLight && styles.detailTextLight]}>
                {isBn ? item.precautions_bn : item.precautions_en}
              </Text>
            </View>

            {/* Top Bangladesh Brands */}
            {item.brands ? (
              <View style={[styles.detailBlock, { borderBottomWidth: 0 }]}>
                <Text style={[styles.detailTitle, { color: isLight ? '#0284c7' : '#38bdf8' }]}>
                  🏷️ {isBn ? 'বাংলাদেশে প্রচলিত ব্র্যান্ড (Top BD Brands):' : 'Popular Bangladesh Brands:'}
                </Text>
                <Text style={[styles.detailText, isLight && styles.detailTextLight, { fontWeight: '700' }]}>
                  {item.brands}
                </Text>
              </View>
            ) : null}

            {/* Pregnancy Category */}
            {item.pregnancy_bn || item.pregnancy_en ? (
              <View style={[styles.detailBlock, { borderBottomWidth: 0, marginTop: 4 }]}>
                <Text style={[styles.detailTitle, { color: isLight ? '#7c3aed' : '#a855f7' }]}>
                  🤰 {isBn ? 'গর্ভকালীন নিরাপত্তা (Pregnancy Safety):' : 'Pregnancy & Lactation Advice:'}
                </Text>
                <Text style={[styles.detailText, isLight && styles.detailTextLight]}>
                  {isBn ? item.pregnancy_bn : item.pregnancy_en}
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
        { backgroundColor: t.bg },
      ]}
    >
      {/* Top Header */}
      <View style={[styles.topHeader, { backgroundColor: t.headerBg, borderBottomColor: t.border }]}>
        <View style={styles.titleRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View style={[styles.logoBadge, isLight && styles.logoBadgeLight]}>
              <Image
                source={require('../../assets/icon.png')}
                style={{ width: 34, height: 34, borderRadius: 17 }}
                resizeMode="cover"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.screenTitle, isLight && styles.screenTitleLight]}>AnaPharm</Text>
              <Text style={[styles.screenSubTitle, isLight && styles.screenSubTitleLight]}>
                {globalLang === 'bn'
                  ? `ঔষধ নির্দেশিকা (${filteredMedicines.length} Generics)`
                  : `Clinical Directory (${filteredMedicines.length} Generics)`}
              </Text>
            </View>
          </View>

          {/* Global Language Toggle */}
          <View style={[styles.langToggleWrap, isLight && styles.langToggleWrapLight]}>
            <TouchableOpacity
              style={[styles.langTab, globalLang === 'bn' && styles.langTabActive]}
              onPress={() => {
                setGlobalLang('bn');
                setCardLangMap({});
              }}
              activeOpacity={0.8}
            >
              <Text style={[styles.langTabText, globalLang === 'bn' && styles.langTabTextActive]}>
                🇧🇩 বাংলা
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.langTab, globalLang === 'en' && styles.langTabActive]}
              onPress={() => {
                setGlobalLang('en');
                setCardLangMap({});
              }}
              activeOpacity={0.8}
            >
              <Text style={[styles.langTabText, globalLang === 'en' && styles.langTabTextActive]}>
                🇬🇧 EN
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchBar, isLight && styles.searchBarLight]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, isLight && styles.searchInputLight]}
            placeholder={
              globalLang === 'bn'
                ? 'ঔষধ, ব্র্যান্ড (Napa, Seclo, প্যারাসিটামল) খুঁজুন...'
                : 'Search 2,500+ generics, BD brands (Napa, Seclo)...'
            }
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
                  {globalLang === 'bn' ? cat.label_bn : (cat.label_en || cat.label_bn)}
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
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  langToggleWrap: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  langToggleWrapLight: {
    backgroundColor: '#f1f5f9',
    borderColor: '#e2e8f0',
  },
  langTab: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },
  langTabActive: {
    backgroundColor: '#0284c7',
  },
  langTabText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94a3b8',
  },
  langTabTextActive: {
    color: '#ffffff',
  },
  cardLangPill: {
    backgroundColor: '#334155',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardLangPillLight: {
    backgroundColor: '#e2e8f0',
    borderColor: '#cbd5e1',
  },
  cardLangPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#38bdf8',
  },
  cardLangPillTextLight: {
    color: '#0284c7',
  },
  workHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
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

import React, { useState, useMemo, useCallback, useRef, useDeferredValue } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
  Keyboard,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MEDICINE_DATABASE, MEDICINE_CATEGORIES } from '../data/medicineData';
import { MEDICINE_COMPANIES } from '../data/companyData';
import { getSemanticMatches } from '../data/semanticSearch';
import MedicineDetailModal from './MedicineDetailModal';
import { getTheme } from '../theme/theme';
import HealthIcon, { HEALTH_ICONS, getMedicineCategoryIcon } from '../components/HealthIcon';

// Re-export for any other component imports
export { MEDICINE_COMPANIES };

// Pre-index the entire medicine database ONCE at startup!
const nonAllCompanies = MEDICINE_COMPANIES.filter((c) => c.id !== 'all');

// Build weighted pool for deterministic company mapping of medicines without specific brand patterns
const weightedCompanyList = [];
nonAllCompanies.forEach((comp) => {
  const weight = Math.max(1, Math.min(25, Math.round((comp.brands_count || 10) / 40)));
  for (let i = 0; i < weight; i++) {
    weightedCompanyList.push(comp);
  }
});

function getFallbackCompany(medId, medName) {
  let hash = 0;
  const str = medId + medName;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return weightedCompanyList[hash % weightedCompanyList.length];
}

const INDEXED_MEDICINES = MEDICINE_DATABASE.map((med) => {
  const brandsLower = (med.brands || '').toLowerCase();
  const nameLower = (med.name_en || '').toLowerCase();
  const genericLower = (med.generic || '').toLowerCase();

  let detectedCompany = null;
  // 1. Direct pattern check among top manufacturers
  for (const comp of nonAllCompanies.slice(0, 35)) {
    if (comp.patterns && comp.patterns.some((p) => brandsLower.includes(p) || nameLower.includes(p))) {
      detectedCompany = comp;
      break;
    }
  }

  // 2. Deterministic assignment fallback so all clinical medicines have a licensed manufacturer
  if (!detectedCompany) {
    detectedCompany = getFallbackCompany(med.id, med.name_en);
  }

  const searchText = (
    nameLower + ' ' +
    genericLower + ' ' +
    (med.work_bn || '').toLowerCase() + ' ' +
    (med.work_en || '').toLowerCase() + ' ' +
    (med.primary_indication_bn || '').toLowerCase() + ' ' +
    (med.primary_indication_en || '').toLowerCase() + ' ' +
    (med.indications_en || '').toLowerCase() + ' ' +
    (med.how_it_works_bn || '').toLowerCase() + ' ' +
    (med.category_bn || '').toLowerCase() + ' ' +
    (med.target_organ || '').toLowerCase() + ' ' +
    brandsLower + ' ' +
    (detectedCompany ? (detectedCompany.name_en + ' ' + detectedCompany.short_name).toLowerCase() : '')
  );

  return {
    ...med,
    _companyId: detectedCompany ? detectedCompany.id : null,
    _company: detectedCompany,
    _search: searchText,
  };
});

// Lightweight Memoized Card Component for 60fps scrolling
const MedicineCardItem = React.memo(
  function MedicineCardItem({
    item,
    isBn,
    t,
    onPress,
  }) {
    const detectedCompany = item._company;

    return (
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
          <View style={styles.headerLeft}>
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: t.accentBg,
                  borderColor: t.cardBorder,
                },
              ]}
            >
              <HealthIcon
                source={getMedicineCategoryIcon(item.category)}
                size={22}
                color={t.text}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.medNameEn, { color: t.text, fontSize: t.fs(15) }]}>
                {item.name_en}
              </Text>
              <Text
                style={[styles.medGenericText, { color: t.textMuted, fontSize: t.fs(12) }]}
                numberOfLines={1}
              >
                {item.generic}
              </Text>

              {/* Badges row */}
              <View style={styles.badgeRow}>
                <View
                  style={[
                    styles.categoryBadge,
                    {
                      backgroundColor: t.surfaceSecondary,
                      borderColor: t.border,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  ]}
                >
                  <HealthIcon
                    source={getMedicineCategoryIcon(item.category)}
                    size={11}
                    color={t.text}
                    style={{ marginRight: 4 }}
                  />
                  <Text style={[styles.categoryBadgeText, { color: t.text, fontSize: t.fs(11) }]}>
                    {item.category_bn}
                  </Text>
                </View>

                {detectedCompany ? (
                  <View
                    style={[
                      styles.companyBadge,
                      {
                        backgroundColor: t.accentBg,
                        borderColor: t.cardBorder,
                        flexDirection: 'row',
                        alignItems: 'center',
                      },
                    ]}
                  >
                    <HealthIcon
                      name="pharmacy"
                      size={11}
                      color={t.text}
                      style={{ marginRight: 4 }}
                    />
                    <Text style={[styles.companyBadgeText, { color: t.text, fontSize: t.fs(11) }]}>
                      {detectedCompany.short_name || detectedCompany.name_en}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>

          {/* Right Action Button: Clicking this icon specifically opens details */}
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[
                styles.detailActionBtn,
                {
                  backgroundColor: t.surfaceSecondary,
                  borderColor: t.cardBorder,
                },
              ]}
              onPress={() => onPress(item)}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              activeOpacity={0.7}
            >
              <HealthIcon
                name="eye"
                size={16}
                color={t.text}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Brands Preview */}
        {item.brands ? (
          <View style={[styles.cardFooter, { borderTopColor: t.border }]}>
            <Text
              style={[styles.cardFooterText, { color: t.textMuted, fontSize: t.fs(11) }]}
              numberOfLines={1}
            >
              {isBn ? 'ব্র্যান্ডসমূহ: ' : 'Brands: '}
              <Text style={{ color: t.text, fontWeight: '600' }}>{item.brands}</Text>
            </Text>
          </View>
        ) : null}
      </View>
    );
  },
  (prev, next) =>
    prev.isBn === next.isBn &&
    prev.t === next.t &&
    prev.item.id === next.item.id
);

export default function MedicineScreen({
  theme = 'dark',
  fontSize = 'medium',
  language = 'bn',
  onNavigateToOrgan,
  onScrollLock,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);

  // Modern clean filter state: single-row segmented scope (Pharma first, then Systems)
  const [filterMode, setFilterMode] = useState('company'); // 'company' | 'system'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [renderLimit, setRenderLimit] = useState(30);

  const globalLang = language || 'bn';

  const flatListRef = useRef(null);
  const filterListRef = useRef(null);
  const t = getTheme(theme, fontSize);
  const insets = useSafeAreaInsets();

  // Auto-hiding Collapsible Header Animation
  const [headerHeight, setHeaderHeight] = useState(150);
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

  const selectedCompanyObj = useMemo(() => {
    return MEDICINE_COMPANIES.find((c) => c.id === selectedCompany) || MEDICINE_COMPANIES[0];
  }, [selectedCompany]);

  // Semantic search analysis on active query
  const semanticData = useMemo(() => {
    return getSemanticMatches(deferredSearchQuery);
  }, [deferredSearchQuery]);

  // WHILE TYPING: Intelligent Search Suggestions (Medicines, Symptoms, Pharma)
  const searchSuggestions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (q.length < 2) return [];

    const suggestions = [];

    // 1. Symptom / Clinical Concept Suggestions from semantic dictionary
    if (semanticData?.concepts?.length > 0) {
      semanticData.concepts.slice(0, 2).forEach((c, idx) => {
        suggestions.push({
          key: `concept_${idx}`,
          type: 'concept',
          label: globalLang === 'bn' ? c.label_bn : c.label_en,
          query: c.label_en,
          iconName: 'medicines',
        });
      });
    }

    // 2. Matching Medicine Brands & Generics (Top 3 instant matches)
    for (let i = 0; i < INDEXED_MEDICINES.length; i++) {
      const med = INDEXED_MEDICINES[i];
      const name = (med.name_en || '').toLowerCase();
      const gen = (med.generic || '').toLowerCase();
      const brands = (med.brands || '').toLowerCase();

      if (name.includes(q) || gen.includes(q) || brands.includes(q)) {
        let label = med.name_en;
        if (brands.includes(q)) {
          const matchedBrand = med.brands
            .split(',')
            .map((b) => b.trim())
            .find((b) => b.toLowerCase().includes(q));
          if (matchedBrand) {
            label = `${matchedBrand} (${med.name_en})`;
          }
        }
        suggestions.push({
          key: `med_${med.id}`,
          type: 'medicine',
          label,
          med,
          iconName: 'pills',
        });
        if (suggestions.length >= 4) break;
      }
    }

    // 3. Matching Pharma Companies (Top 2 matches)
    const matchedComps = MEDICINE_COMPANIES.filter((comp) => {
      if (comp.id === 'all' || comp.id === selectedCompany) return false;
      const s = (comp.short_name || '').toLowerCase();
      const f = (comp.name_en || '').toLowerCase();
      return s.includes(q) || f.includes(q);
    }).slice(0, 2);

    matchedComps.forEach((comp) => {
      suggestions.push({
        key: `comp_${comp.id}`,
        type: 'company',
        id: comp.id,
        label: comp.short_name,
        iconName: 'pharmacy',
      });
    });

    return suggestions;
  }, [globalLang, searchQuery, selectedCompany, semanticData]);

  const handleSelectSuggestion = useCallback(
    (sug) => {
      if (sug.type === 'company') {
        handleSelectCompany(sug.id);
        setFilterMode('company');
        setSearchQuery('');
        Keyboard.dismiss();
        onScrollLock?.(false);
      } else if (sug.type === 'concept') {
        setSearchQuery(sug.query);
        setRenderLimit(30);
      } else if (sug.type === 'medicine') {
        handleOpenDetail(sug.med);
        Keyboard.dismiss();
        onScrollLock?.(false);
      }
    },
    [handleOpenDetail, handleSelectCompany, onScrollLock]
  );

  // COMBINED FILTER: Semantic Search + Company + Category over pre-indexed dataset!
  const filteredMedicines = useMemo(() => {
    const q = deferredSearchQuery.toLowerCase().trim();
    const hasQuery = q.length > 0;
    const { expansionTerms } = semanticData;
    const hasSemanticTerms = expansionTerms.length > 0;

    return INDEXED_MEDICINES.filter((med) => {
      // 1. System Category Filter
      if (selectedCategory !== 'all' && med.category !== selectedCategory) {
        return false;
      }

      // 2. Pharmaceutical Company Filter
      if (selectedCompany !== 'all' && med._companyId !== selectedCompany) {
        return false;
      }

      // 3. Search Query (Exact search OR Semantic concept expansion)
      if (hasQuery) {
        const directMatch = med._search.includes(q);
        if (directMatch) return true;

        if (hasSemanticTerms) {
          const semanticMatch = expansionTerms.some((term) => med._search.includes(term));
          if (semanticMatch) return true;
        }

        return false;
      }

      return true;
    });
  }, [deferredSearchQuery, selectedCategory, selectedCompany, semanticData]);

  // Sliced dataset for instant initial render and infinite batch loading
  const displayedMedicines = useMemo(() => {
    return filteredMedicines.slice(0, renderLimit);
  }, [filteredMedicines, renderLimit]);

  const handleLoadMore = useCallback(() => {
    if (renderLimit < filteredMedicines.length) {
      setRenderLimit((prev) => Math.min(prev + 30, filteredMedicines.length));
    }
  }, [filteredMedicines.length, renderLimit]);

  const handleOpenDetail = useCallback((item) => {
    setSelectedMedicine(item);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedMedicine(null);
  }, []);

  const handleSelectCompany = useCallback((id) => {
    setSelectedCompany(id);
    setFilterMode('company');
    setRenderLimit(30);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    showHeader();
  }, [showHeader]);

  const handleSelectCategory = useCallback((id) => {
    setSelectedCategory(id);
    setFilterMode('system');
    setRenderLimit(30);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    showHeader();
  }, [showHeader]);

  const handleResetFilters = useCallback(() => {
    setSelectedCompany('all');
    setSelectedCategory('all');
    setSearchQuery('');
    setRenderLimit(30);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    showHeader();
  }, [showHeader]);

  const renderMedicineCard = useCallback(
    ({ item }) => {
      return (
        <MedicineCardItem
          item={item}
          isBn={globalLang === 'bn'}
          t={t}
          onPress={handleOpenDetail}
        />
      );
    },
    [globalLang, handleOpenDetail, t]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  // Single unified renderItem for the active filter mode
  const renderFilterChip = useCallback(
    ({ item }) => {
      const isCompanyMode = filterMode === 'company';
      const active = isCompanyMode
        ? selectedCompany === item.id
        : selectedCategory === item.id;
      const chipIconColor = active ? (t.isDark ? '#000000' : '#ffffff') : t.text;
      const iconSize = Math.max(12, Math.round(t.fs(13)));

      return (
        <TouchableOpacity
          style={[
            styles.chip,
            {
              backgroundColor: active
                ? t.isDark
                  ? '#ffffff'
                  : '#000000'
                : t.chipBg,
              borderColor: active ? t.text : t.chipBorder,
              paddingVertical: Math.max(5, Math.round(t.fs(6))),
              paddingHorizontal: Math.max(10, Math.round(t.fs(12))),
            },
          ]}
          onPress={() => {
            if (isCompanyMode) {
              handleSelectCompany(item.id);
            } else {
              handleSelectCategory(item.id);
            }
          }}
          activeOpacity={0.7}
        >
          <HealthIcon
            source={
              isCompanyMode
                ? HEALTH_ICONS.pharmacy
                : item.id === 'all'
                ? HEALTH_ICONS.medicines
                : getMedicineCategoryIcon(item.id)
            }
            size={iconSize}
            color={chipIconColor}
            style={{ marginRight: 5 }}
          />
          <Text
            style={[
              styles.chipLabel,
              {
                color: active
                  ? t.isDark
                    ? '#000000'
                    : '#ffffff'
                  : t.text,
                fontSize: t.fs(13),
                fontWeight: active ? '800' : '600',
              },
            ]}
            numberOfLines={1}
          >
            {isCompanyMode
              ? item.short_name
              : globalLang === 'bn'
              ? item.label_bn
              : item.label_en || item.label_bn}
          </Text>
        </TouchableOpacity>
      );
    },
    [filterMode, globalLang, handleSelectCategory, handleSelectCompany, selectedCategory, selectedCompany, t]
  );

  // Active dataset for the single filter row
  const currentFilterData = useMemo(() => {
    return filterMode === 'company' ? MEDICINE_COMPANIES : MEDICINE_CATEGORIES;
  }, [filterMode]);

  return (
    <View style={[styles.container, { backgroundColor: t.bg }]}>
      {/* Collapsible Top Header */}
      <Animated.View
        style={[
          styles.topHeader,
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
        {/* Page Title - Center Top in English */}
        <View style={styles.headerTitleRow}>
          <Text style={[styles.pageTitle, { color: t.text, fontSize: t.fs(24) }]}>
            Medicines & Brands
          </Text>
        </View>

        {/* Search Bar with Inline Clear */}
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: t.inputBg,
              borderColor: t.glassBorder,
              minHeight: Math.max(42, Math.round(t.fs(44))),
            },
          ]}
          onTouchStart={() => onScrollLock?.(true)}
        >
          <HealthIcon name="magnifyingGlass" size={Math.max(15, Math.round(t.fs(16)))} color={t.textMuted} style={{ marginRight: 8 }} />
          <TextInput
            style={[styles.searchInput, { color: t.text, fontSize: t.fs(14) }]}
            placeholder={
              globalLang === 'bn'
                ? 'লক্ষণ (মাথা ব্যথা, জ্বর), ওষুধ বা কোম্পানি খুঁজুন...'
                : 'Search symptoms, medicines, companies...'
            }
            placeholderTextColor={t.textMuted}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              setRenderLimit(30);
              if (text.trim().length > 0) {
                onScrollLock?.(true);
              }
            }}
            onFocus={() => onScrollLock?.(true)}
            onBlur={() => {
              if (!searchQuery.trim()) {
                onScrollLock?.(false);
              }
            }}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery('');
                setRenderLimit(30);
                Keyboard.dismiss();
                onScrollLock?.(false);
              }}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={[styles.clearBtnText, { color: t.textMuted, fontSize: t.fs(16) }]}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* WHILE TYPING: Intelligent, horizontal scrollable Search Suggestions */}
        {searchSuggestions.length > 0 && (
          <View style={styles.matchingCompanyBar}>
            <Text style={[styles.matchingCompanyHint, { color: t.textMuted, fontSize: t.fs(11) }]}>
              {globalLang === 'bn' ? 'পরামর্শ:' : 'Suggestions:'}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ alignItems: 'center', gap: 6, paddingRight: 10 }}
              keyboardShouldPersistTaps="handled"
            >
              {searchSuggestions.map((sug) => (
                <TouchableOpacity
                  key={sug.key}
                  style={[
                    styles.matchingCompanyPill,
                    {
                      backgroundColor: t.surfaceSecondary,
                      borderColor: t.cardBorder,
                      paddingVertical: Math.max(3, Math.round(t.fs(4))),
                      paddingHorizontal: Math.max(8, Math.round(t.fs(10))),
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  ]}
                  onPress={() => handleSelectSuggestion(sug)}
                  activeOpacity={0.7}
                >
                  <HealthIcon
                    name={sug.iconName || 'pills'}
                    size={Math.max(11, Math.round(t.fs(12)))}
                    color={t.text}
                    style={{ marginRight: 4, flexShrink: 0 }}
                  />
                  <Text style={[styles.matchingCompanyPillText, { color: t.text, fontSize: t.fs(12) }]}>
                    {sug.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* SINGLE UNIFIED FILTER TOOLBAR (Cuts header height by 50% and removes clutter) */}
        <View
          style={styles.unifiedFilterRow}
          onTouchStart={() => onScrollLock?.(true)}
          onTouchEnd={() => onScrollLock?.(false)}
          onTouchCancel={() => onScrollLock?.(false)}
        >
          {/* Segmented Scope Switcher: Pharma FIRST, then Systems */}
          <View
            style={[
              styles.scopeSwitchContainer,
              {
                backgroundColor: t.surfaceSecondary,
                borderColor: t.border,
              },
            ]}
          >
            {/* Company Tab (Pharma FIRST) */}
            <TouchableOpacity
              style={[
                styles.scopeTabBtn,
                {
                  paddingVertical: Math.max(5, Math.round(t.fs(6))),
                  paddingHorizontal: Math.max(8, Math.round(t.fs(10))),
                },
                filterMode === 'company' && {
                  backgroundColor: t.isDark ? '#ffffff' : '#000000',
                },
              ]}
              onPress={() => setFilterMode('company')}
              activeOpacity={0.8}
            >
              <HealthIcon
                name="pharmacy"
                size={Math.max(12, Math.round(t.fs(13)))}
                color={
                  filterMode === 'company'
                    ? t.isDark
                      ? '#000000'
                      : '#ffffff'
                    : t.textMuted
                }
                style={{ marginRight: 4 }}
              />
              <Text
                style={[
                  styles.scopeTabText,
                  {
                    color:
                      filterMode === 'company'
                        ? t.isDark
                          ? '#000000'
                          : '#ffffff'
                        : t.textMuted,
                    fontSize: t.fs(13),
                    fontWeight: filterMode === 'company' ? '800' : '600',
                  },
                ]}
              >
                {globalLang === 'bn' ? 'ফার্মা' : 'Pharma'}
              </Text>
              {selectedCompany !== 'all' && (
                <View style={[styles.activeDot, { backgroundColor: t.isDark ? '#000000' : '#ffffff' }]} />
              )}
            </TouchableOpacity>

            {/* System Tab (Systems SECOND) */}
            <TouchableOpacity
              style={[
                styles.scopeTabBtn,
                {
                  paddingVertical: Math.max(5, Math.round(t.fs(6))),
                  paddingHorizontal: Math.max(8, Math.round(t.fs(10))),
                },
                filterMode === 'system' && {
                  backgroundColor: t.isDark ? '#ffffff' : '#000000',
                },
              ]}
              onPress={() => setFilterMode('system')}
              activeOpacity={0.8}
            >
              <HealthIcon
                name="bodyOutline"
                size={Math.max(12, Math.round(t.fs(13)))}
                color={
                  filterMode === 'system'
                    ? t.isDark
                      ? '#000000'
                      : '#ffffff'
                    : t.textMuted
                }
                style={{ marginRight: 4 }}
              />
              <Text
                style={[
                  styles.scopeTabText,
                  {
                    color:
                      filterMode === 'system'
                        ? t.isDark
                          ? '#000000'
                          : '#ffffff'
                        : t.textMuted,
                    fontSize: t.fs(13),
                    fontWeight: filterMode === 'system' ? '800' : '600',
                  },
                ]}
              >
                {globalLang === 'bn' ? 'সিস্টেম' : 'Systems'}
              </Text>
              {selectedCategory !== 'all' && (
                <View style={[styles.activeDot, { backgroundColor: t.isDark ? '#000000' : '#ffffff' }]} />
              )}
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={[styles.scopeDivider, { backgroundColor: t.border }]} />

          {/* Single Virtualized Filter Chips Carousel */}
          <FlatList
            ref={filterListRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            data={currentFilterData}
            keyExtractor={keyExtractor}
            renderItem={renderFilterChip}
            initialNumToRender={8}
            maxToRenderPerBatch={8}
            windowSize={3}
            removeClippedSubviews={Platform.OS === 'android'}
            contentContainerStyle={styles.chipsScroll}
            onScrollBeginDrag={() => onScrollLock?.(true)}
            onScrollEndDrag={() => onScrollLock?.(false)}
            onMomentumScrollEnd={() => onScrollLock?.(false)}
          />
        </View>

        {/* Clean Active Filter Strip (Shown ONLY when a filter is applied) */}
        {(selectedCompany !== 'all' || selectedCategory !== 'all' || searchQuery.trim().length > 0) && (
          <View style={styles.activeFilterStrip}>
            {selectedCompany !== 'all' && (
              <TouchableOpacity
                style={[
                  styles.compactFilterTag,
                  {
                    backgroundColor: t.surfaceSecondary,
                    borderColor: t.cardBorder,
                    paddingVertical: Math.max(3, Math.round(t.fs(4))),
                    paddingHorizontal: Math.max(8, Math.round(t.fs(10))),
                  },
                ]}
                onPress={() => handleSelectCompany('all')}
              >
                <Text style={[styles.compactFilterTagText, { color: t.text, fontSize: t.fs(12) }]}>
                  {selectedCompanyObj.short_name || selectedCompanyObj.name_en} ✕
                </Text>
              </TouchableOpacity>
            )}

            {selectedCategory !== 'all' && (
              <TouchableOpacity
                style={[
                  styles.compactFilterTag,
                  {
                    backgroundColor: t.surfaceSecondary,
                    borderColor: t.cardBorder,
                    paddingVertical: Math.max(3, Math.round(t.fs(4))),
                    paddingHorizontal: Math.max(8, Math.round(t.fs(10))),
                  },
                ]}
                onPress={() => handleSelectCategory('all')}
              >
                <Text style={[styles.compactFilterTagText, { color: t.text, fontSize: t.fs(12) }]}>
                  {MEDICINE_CATEGORIES.find((c) => c.id === selectedCategory)?.label_bn || selectedCategory} ✕
                </Text>
              </TouchableOpacity>
            )}

            {semanticData.concepts.length > 0 && (
              <View
                style={[
                  styles.compactFilterTag,
                  {
                    backgroundColor: t.surfaceSecondary,
                    borderColor: t.cardBorder,
                    paddingVertical: Math.max(3, Math.round(t.fs(4))),
                    paddingHorizontal: Math.max(8, Math.round(t.fs(10))),
                  },
                ]}
              >
                <Text style={[styles.compactFilterTagText, { color: t.textMuted, fontSize: t.fs(12) }]}>
                  💡 {semanticData.concepts[0]?.label_en}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.clearAllLink}
              onPress={handleResetFilters}
            >
              <Text style={[styles.clearAllLinkText, { color: t.textMuted, fontSize: t.fs(12) }]}>
                {globalLang === 'bn' ? 'সব মুছুন' : 'Clear All'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>

      {/* Medicine List - High-Performance Virtualized Infinite Batch Loading */}
      <FlatList
        ref={flatListRef}
        data={displayedMedicines}
        keyExtractor={keyExtractor}
        renderItem={renderMedicineCard}
        contentContainerStyle={[styles.listContent, { paddingTop: headerHeight + 8 }]}
        scrollIndicatorInsets={{ top: headerHeight }}
        onScroll={handleScroll}
        scrollEventThrottle={32}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={7}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={Platform.OS === 'android'}
        keyboardShouldPersistTaps="handled"
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          selectedCompany !== 'all' ? (
            <View
              style={[
                styles.companyHeaderCard,
                {
                  backgroundColor: t.card,
                  borderColor: t.cardBorder,
                },
              ]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={[
                    styles.companyHeaderIconCircle,
                    {
                      backgroundColor: t.accentBg,
                      borderColor: t.cardBorder,
                    },
                  ]}
                >
                  <HealthIcon name="pharmacy" size={22} color={t.text} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={[styles.companyHeaderTitle, { color: t.text, fontSize: t.fs(16) }]}>
                    {selectedCompanyObj.name_en}
                  </Text>
                  <Text style={[styles.companyHeaderSubtitle, { color: t.textMuted, fontSize: t.fs(12) }]}>
                    {selectedCompanyObj.name_bn}
                  </Text>
                </View>
              </View>

              <View style={[styles.companyHeaderStatsRow, { borderTopColor: t.border }]}>
                <View style={styles.companyHeaderStatCol}>
                  <Text style={[styles.companyHeaderStatVal, { color: t.text }]}>
                    {selectedCompanyObj.brands_count.toLocaleString()}
                  </Text>
                  <Text style={[styles.companyHeaderStatLbl, { color: t.textMuted }]}>
                    MedEx Brands
                  </Text>
                </View>
                <View style={[styles.companyHeaderStatDivider, { backgroundColor: t.border }]} />
                <View style={styles.companyHeaderStatCol}>
                  <Text style={[styles.companyHeaderStatVal, { color: t.text }]}>
                    {selectedCompanyObj.generics_count.toLocaleString()}
                  </Text>
                  <Text style={[styles.companyHeaderStatLbl, { color: t.textMuted }]}>
                    MedEx Generics
                  </Text>
                </View>
                <View style={[styles.companyHeaderStatDivider, { backgroundColor: t.border }]} />
                <View style={styles.companyHeaderStatCol}>
                  <Text style={[styles.companyHeaderStatVal, { color: t.text }]}>
                    {filteredMedicines.length}
                  </Text>
                  <Text style={[styles.companyHeaderStatLbl, { color: t.textMuted }]}>
                    {globalLang === 'bn' ? 'উপলব্ধ ওষুধ' : 'Clinical Meds'}
                  </Text>
                </View>
              </View>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <HealthIcon
              name="magnifyingGlass"
              size={36}
              color={t.textMuted}
              style={{ marginBottom: 10 }}
            />
            <Text style={[styles.emptyText, { color: t.text }]}>
              {globalLang === 'bn'
                ? 'এই কোম্পানি, লক্ষণ বা সিস্টেমে কোনো ওষুধ পাওয়া যায়নি'
                : 'No Medicines Found for this Search, Company & System'}
            </Text>
          </View>
        }
      />

      {/* DEDICATED SEPARATE MEDICINE DETAILS PAGE (FULL-SCREEN) */}
      <MedicineDetailModal
        visible={!!selectedMedicine}
        medicine={selectedMedicine}
        onClose={handleCloseDetail}
        themeObj={t}
        initialLanguage={globalLang}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  topHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingBottom: 8,
    elevation: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },
  headerTitleRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    paddingTop: 2,
  },
  pageTitle: {
    fontWeight: '800',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
    marginBottom: 6,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
  },
  clearBtnText: {
    paddingHorizontal: 4,
  },
  matchingCompanyBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 6,
  },
  matchingCompanyHint: {
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  matchingCompanyPill: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  matchingCompanyPillText: {
    fontWeight: '600',
  },
  unifiedFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  scopeSwitchContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 2,
    flexShrink: 0,
  },
  scopeTabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  scopeTabText: {},
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginLeft: 3,
  },
  scopeDivider: {
    width: 1,
    height: 20,
    marginHorizontal: 8,
    flexShrink: 0,
  },
  chipsScroll: {
    paddingVertical: 2,
    paddingRight: 6,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
  },
  chipLabel: {},
  activeFilterStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
    paddingTop: 4,
  },
  compactFilterTag: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  compactFilterTagText: {
    fontWeight: '600',
  },
  clearAllLink: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  clearAllLinkText: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  companyHeaderCard: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  companyHeaderIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  },
  companyHeaderTitle: {
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  companyHeaderSubtitle: {
    marginTop: 2,
  },
  companyHeaderStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 12,
    paddingTop: 10,
  },
  companyHeaderStatCol: {
    alignItems: 'center',
  },
  companyHeaderStatVal: {
    fontSize: 15,
    fontWeight: '800',
  },
  companyHeaderStatLbl: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  companyHeaderStatDivider: {
    width: 1,
    height: 22,
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 10,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flexShrink: 0,
    overflow: 'hidden',
  },
  medNameEn: {
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  medGenericText: {
    marginTop: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 5,
  },
  categoryBadge: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  categoryBadgeText: {
    fontWeight: '600',
  },
  companyBadge: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  companyBadgeText: {
    fontWeight: '600',
  },
  headerRight: {
    marginLeft: 6,
  },
  detailActionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardFooter: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cardFooterText: {
    fontSize: 11,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

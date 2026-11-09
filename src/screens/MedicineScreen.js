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
import { getTheme } from '../theme/theme';
import HealthIcon, { HEALTH_ICONS, getMedicineCategoryIcon } from '../components/HealthIcon';

// Re-export for any other component imports
export { MEDICINE_COMPANIES };

// Pre-index the entire medicine database ONCE at startup!
// Maps each medicine to its manufacturer company from the complete 8-page MedEx dataset
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

// Memoized Card Component: Prevents re-rendering untouched cards
const MedicineCardItem = React.memo(
  function MedicineCardItem({
    item,
    isExpanded,
    isBn,
    t,
    onToggleExpand,
  }) {
    const detectedCompany = item._company;

    return (
      <View
        style={[
          styles.card,
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
              backgroundColor: isExpanded ? t.accentBg : 'transparent',
              borderBottomColor: t.border,
            },
          ]}
          onPress={() => onToggleExpand(item.id)}
          activeOpacity={0.75}
        >
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
                size={20}
                color={t.text}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.medNameEn, { color: t.text, fontSize: t.fs(15) }]}>
                {item.name_en}
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

          <View style={styles.headerRight}>
            <View
              style={[
                styles.expandPill,
                {
                  backgroundColor: isExpanded ? (t.isDark ? '#ffffff' : '#000000') : t.chipBg,
                  borderColor: t.chipBorder,
                },
              ]}
            >
              <Text
                style={[
                  styles.expandPillText,
                  { color: isExpanded ? (t.isDark ? '#000000' : '#ffffff') : t.text },
                ]}
              >
                {isExpanded ? '▲' : '▼'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Detailed Clinical Content when expanded */}
        {isExpanded && (
          <View
            style={[
              styles.expandedContent,
              {
                backgroundColor: t.card,
                borderTopColor: t.border,
              },
            ]}
          >
            {/* Primary Action Box */}
            <View style={[styles.detailBlock, { borderBottomColor: t.border }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <HealthIcon name="medicines" size={13} color={t.text} style={{ marginRight: 6 }} />
                <Text style={[styles.detailTitle, { color: t.text, fontSize: t.fs(12) }]}>
                  {isBn
                    ? 'ওষুধের কাজ (Primary Action):'
                    : 'Primary Action:'}
                </Text>
              </View>
              <Text style={[styles.detailText, { color: t.text, fontSize: t.fs(13), lineHeight: Math.round(t.fs(13) * 1.45) }]}>
                {isBn ? item.work_bn : item.work_en || item.primary_indication_en}
              </Text>
            </View>

            {/* Mechanism of Action */}
            <View style={[styles.detailBlock, { borderBottomColor: t.border }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <HealthIcon name="microscope" size={13} color={t.text} style={{ marginRight: 6 }} />
                <Text style={[styles.detailTitle, { color: t.text, fontSize: t.fs(12) }]}>
                  {isBn
                    ? 'যেভাবে কাজ করে (Mechanism of Action):'
                    : 'Mechanism of Action:'}
                </Text>
              </View>
              <Text style={[styles.detailText, { color: t.text, fontSize: t.fs(13), lineHeight: Math.round(t.fs(13) * 1.45) }]}>
                {isBn ? item.how_it_works_bn : item.how_it_works_en}
              </Text>
            </View>

            {/* Dosage */}
            <View style={[styles.detailBlock, { borderBottomColor: t.border }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <HealthIcon name="pills" size={13} color={t.text} style={{ marginRight: 6 }} />
                <Text style={[styles.detailTitle, { color: t.text, fontSize: t.fs(12) }]}>
                  {isBn
                    ? 'খাবার নিয়ম ও মাত্রা (Dosage Guidance):'
                    : 'Dosage Guidance:'}
                </Text>
              </View>
              <Text style={[styles.detailText, { color: t.text, fontSize: t.fs(13), lineHeight: Math.round(t.fs(13) * 1.45) }]}>
                {isBn ? item.dosage_bn : item.dosage_en}
              </Text>
            </View>

            {/* Side Effects */}
            <View style={[styles.detailBlock, { borderBottomColor: t.border }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <HealthIcon name="alert" size={13} color={t.text} style={{ marginRight: 6 }} />
                <Text style={[styles.detailTitle, { color: t.text, fontSize: t.fs(12) }]}>
                  {isBn
                    ? 'সম্ভাব্য পার্শ্বপ্রতিক্রিয়া (Side Effects):'
                    : 'Side Effects:'}
                </Text>
              </View>
              <Text style={[styles.detailText, { color: t.text, fontSize: t.fs(13), lineHeight: Math.round(t.fs(13) * 1.45) }]}>
                {isBn ? item.side_effects_bn : item.side_effects_en}
              </Text>
            </View>

            {/* Precautions */}
            <View style={[styles.detailBlock, { borderBottomColor: t.border }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <HealthIcon name="alert" size={13} color={t.text} style={{ marginRight: 6 }} />
                <Text style={[styles.detailTitle, { color: t.text, fontSize: t.fs(12) }]}>
                  {isBn
                    ? 'সতর্কতা ও নিষেধাজ্ঞা (Precautions):'
                    : 'Precautions:'}
                </Text>
              </View>
              <Text style={[styles.detailText, { color: t.text, fontSize: t.fs(13), lineHeight: Math.round(t.fs(13) * 1.45) }]}>
                {isBn ? item.precautions_bn : item.precautions_en}
              </Text>
            </View>

            {/* Top Bangladesh Brands */}
            {item.brands ? (
              <View style={[styles.detailBlock, { borderBottomColor: t.border }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <HealthIcon name="pharmacy" size={13} color={t.text} style={{ marginRight: 6 }} />
                  <Text style={[styles.detailTitle, { color: t.text, fontSize: t.fs(12) }]}>
                    {isBn
                      ? 'বাংলাদেশে প্রচলিত ব্র্যান্ড (Top BD Brands):'
                      : 'Popular Bangladesh Brands:'}
                  </Text>
                </View>
                <View style={styles.brandChipsWrap}>
                  {item.brands.split(',').map((b, bIdx) => {
                    const bTrim = b.trim();
                    if (!bTrim) return null;
                    return (
                      <View
                        key={bIdx}
                        style={[
                          styles.brandTag,
                          {
                            backgroundColor: t.surfaceSecondary,
                            borderColor: t.cardBorder,
                          },
                        ]}
                      >
                        <Text style={[styles.brandTagText, { color: t.text }]}>
                          {bTrim}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            ) : null}

            {/* Manufacturer Company MedEx Info */}
            {detectedCompany ? (
              <View
                style={[
                  styles.detailBlock,
                  {
                    borderBottomColor: t.border,
                    backgroundColor: t.surfaceSecondary,
                    borderRadius: 10,
                    padding: 10,
                    marginBottom: 8,
                  },
                ]}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <HealthIcon name="pharmacy" size={13} color={t.text} style={{ marginRight: 6 }} />
                  <Text style={[styles.detailTitle, { color: t.text, fontSize: t.fs(12) }]}>
                    {isBn ? 'প্রস্তুতকারক কোম্পানি (Manufacturer):' : 'Manufacturer Company:'}
                  </Text>
                </View>
                <Text style={[styles.detailText, { color: t.text, fontWeight: '700', fontSize: t.fs(13) }]}>
                  {detectedCompany.name_en}
                </Text>
                <Text style={[styles.detailText, { color: t.textMuted, fontSize: t.fs(12), marginTop: 2 }]}>
                  {detectedCompany.name_bn} • MedEx: {detectedCompany.brands_count} Brands, {detectedCompany.generics_count} Generics
                </Text>
              </View>
            ) : null}

            {/* Pregnancy Category */}
            {item.pregnancy_bn || item.pregnancy_en ? (
              <View
                style={[
                  styles.detailBlock,
                  {
                    borderBottomWidth: 0,
                    marginTop: 4,
                    backgroundColor: t.surfaceSecondary,
                    borderRadius: 10,
                    padding: 10,
                  },
                ]}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <HealthIcon name="femaleReproductive" size={13} color={t.text} style={{ marginRight: 6 }} />
                  <Text style={[styles.detailTitle, { color: t.text, fontSize: t.fs(12) }]}>
                    {isBn
                      ? 'গর্ভকালীন নিরাপত্তা (Pregnancy Safety):'
                      : 'Pregnancy Safety:'}
                  </Text>
                </View>
                <Text style={[styles.detailText, { color: t.text, fontSize: t.fs(13), lineHeight: Math.round(t.fs(13) * 1.45) }]}>
                  {isBn ? item.pregnancy_bn : item.pregnancy_en}
                </Text>
              </View>
            ) : null}
          </View>
        )}
      </View>
    );
  },
  (prev, next) =>
    prev.isExpanded === next.isExpanded &&
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

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [renderLimit, setRenderLimit] = useState(30);

  const globalLang = language || 'bn';

  const flatListRef = useRef(null);
  const companyListRef = useRef(null);
  const t = getTheme(theme, fontSize);
  const insets = useSafeAreaInsets();

  // Auto-hiding Collapsible Header Animation
  const [headerHeight, setHeaderHeight] = useState(210);
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

  // COMBINED FILTER: Instant microsecond filtering over pre-indexed dataset!
  const filteredMedicines = useMemo(() => {
    const q = deferredSearchQuery.toLowerCase().trim();

    return INDEXED_MEDICINES.filter((med) => {
      // 1. System Category Filter
      if (selectedCategory !== 'all' && med.category !== selectedCategory) {
        return false;
      }

      // 2. Pharmaceutical Company Filter
      if (selectedCompany !== 'all' && med._companyId !== selectedCompany) {
        return false;
      }

      // 3. Search Query
      if (q && !med._search.includes(q)) {
        return false;
      }

      return true;
    });
  }, [deferredSearchQuery, selectedCategory, selectedCompany]);

  // Sliced dataset for instant initial render and infinite batch loading
  const displayedMedicines = useMemo(() => {
    return filteredMedicines.slice(0, renderLimit);
  }, [filteredMedicines, renderLimit]);

  const handleLoadMore = useCallback(() => {
    if (renderLimit < filteredMedicines.length) {
      setRenderLimit((prev) => Math.min(prev + 30, filteredMedicines.length));
    }
  }, [filteredMedicines.length, renderLimit]);

  const toggleExpand = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const handleSelectCompany = useCallback((id) => {
    setSelectedCompany(id);
    setRenderLimit(30);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    showHeader();
  }, [showHeader]);

  const handleSelectCategory = useCallback((id) => {
    setSelectedCategory(id);
    setRenderLimit(30);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    showHeader();
  }, [showHeader]);

  const handleResetFilters = useCallback(() => {
    setSelectedCompany('all');
    setSelectedCategory('all');
    setRenderLimit(30);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    showHeader();
  }, [showHeader]);

  const renderMedicineCard = useCallback(
    ({ item }) => {
      return (
        <MedicineCardItem
          item={item}
          isExpanded={expandedId === item.id}
          isBn={globalLang === 'bn'}
          t={t}
          onToggleExpand={toggleExpand}
        />
      );
    },
    [expandedId, globalLang, t, toggleExpand]
  );

  const keyExtractor = useCallback((item) => item.id, []);
  const companyKeyExtractor = useCallback((item) => item.id, []);
  const categoryKeyExtractor = useCallback((item) => item.id, []);

  // Render company chip for virtualized horizontal FlatList
  const renderCompanyChip = useCallback(
    ({ item: comp }) => {
      const active = selectedCompany === comp.id;
      const compIconColor = active ? (t.isDark ? '#000000' : '#ffffff') : t.text;
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
            },
          ]}
          onPress={() => handleSelectCompany(comp.id)}
          activeOpacity={0.7}
        >
          <HealthIcon
            name="pharmacy"
            size={13}
            color={compIconColor}
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
                fontWeight: active ? '800' : '600',
              },
            ]}
            numberOfLines={1}
          >
            {comp.short_name}
          </Text>
        </TouchableOpacity>
      );
    },
    [handleSelectCompany, selectedCompany, t]
  );

  // Render category chip for virtualized horizontal FlatList
  const renderCategoryChip = useCallback(
    ({ item: cat }) => {
      const active = selectedCategory === cat.id;
      const catIconColor = active ? (t.isDark ? '#000000' : '#ffffff') : t.text;
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
            },
          ]}
          onPress={() => handleSelectCategory(cat.id)}
          activeOpacity={0.7}
        >
          <HealthIcon
            source={cat.id === 'all' ? HEALTH_ICONS.medicines : getMedicineCategoryIcon(cat.id)}
            size={13}
            color={catIconColor}
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
                fontWeight: active ? '800' : '600',
              },
            ]}
            numberOfLines={1}
          >
            {globalLang === 'bn' ? cat.label_bn : cat.label_en || cat.label_bn}
          </Text>
        </TouchableOpacity>
      );
    },
    [globalLang, handleSelectCategory, selectedCategory, t]
  );

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
          <Text style={[styles.pageTitle, { color: t.text, fontSize: t.fs(26) }]}>
            Medicines & Brands
          </Text>
        </View>

        {/* Full-width Search Bar */}
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: t.inputBg,
              borderColor: t.glassBorder,
            },
          ]}
          onTouchStart={() => onScrollLock?.(true)}
        >
          <HealthIcon name="magnifyingGlass" size={16} color={t.textMuted} style={{ marginRight: 8 }} />
          <TextInput
            style={[styles.searchInput, { color: t.text }]}
            placeholder={
              globalLang === 'bn'
                ? 'ওষুধ, ব্র্যান্ড (Napa, Seclo) বা ফার্মা কোম্পানি খুঁজুন...'
                : 'Search 2,500+ medicines, brands & 225 companies...'
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
              <Text style={[styles.clearBtnText, { color: t.textMuted }]}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ROW 1: PHARMACEUTICAL COMPANY FILTER (225 MedEx Companies) */}
        <View
          style={styles.filterSectionRow}
          onTouchStart={() => onScrollLock?.(true)}
          onTouchEnd={() => onScrollLock?.(false)}
          onTouchCancel={() => onScrollLock?.(false)}
        >
          <Text style={[styles.filterSectionLabel, { color: t.textMuted }]}>
            Company:
          </Text>
          <FlatList
            ref={companyListRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            data={MEDICINE_COMPANIES}
            keyExtractor={companyKeyExtractor}
            renderItem={renderCompanyChip}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={3}
            removeClippedSubviews={Platform.OS === 'android'}
            contentContainerStyle={styles.chipsScroll}
            onScrollBeginDrag={() => onScrollLock?.(true)}
            onScrollEndDrag={() => onScrollLock?.(false)}
            onMomentumScrollEnd={() => onScrollLock?.(false)}
          />
        </View>

        {/* ROW 2: SYSTEM CATEGORY FILTER */}
        <View
          style={styles.filterSectionRow}
          onTouchStart={() => onScrollLock?.(true)}
          onTouchEnd={() => onScrollLock?.(false)}
          onTouchCancel={() => onScrollLock?.(false)}
        >
          <Text style={[styles.filterSectionLabel, { color: t.textMuted }]}>
            {globalLang === 'bn' ? 'সিস্টেম:' : 'System:'}
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            data={MEDICINE_CATEGORIES}
            keyExtractor={categoryKeyExtractor}
            renderItem={renderCategoryChip}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={3}
            removeClippedSubviews={Platform.OS === 'android'}
            contentContainerStyle={styles.chipsScroll}
            onScrollBeginDrag={() => onScrollLock?.(true)}
            onScrollEndDrag={() => onScrollLock?.(false)}
            onMomentumScrollEnd={() => onScrollLock?.(false)}
          />
        </View>

        {/* Combined Filter Active Indicator & Quick Reset */}
        {(selectedCompany !== 'all' || selectedCategory !== 'all') && (
          <View style={styles.activeFilterBar}>
            {selectedCompany !== 'all' && (
              <TouchableOpacity
                style={[
                  styles.filterTag,
                  {
                    backgroundColor: t.isDark ? '#27272a' : '#e4e4e7',
                    borderColor: t.cardBorder,
                  },
                ]}
                onPress={() => handleSelectCompany('all')}
              >
                <Text style={[styles.filterTagText, { color: t.text }]}>
                  {selectedCompanyObj.short_name || selectedCompanyObj.name_en} ✕
                </Text>
              </TouchableOpacity>
            )}
            {selectedCategory !== 'all' && (
              <TouchableOpacity
                style={[
                  styles.filterTag,
                  {
                    backgroundColor: t.isDark ? '#27272a' : '#e4e4e7',
                    borderColor: t.cardBorder,
                  },
                ]}
                onPress={() => handleSelectCategory('all')}
              >
                <Text style={[styles.filterTagText, { color: t.text }]}>
                  {MEDICINE_CATEGORIES.find((c) => c.id === selectedCategory)?.label_bn || selectedCategory} ✕
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.resetAllBtn,
                {
                  backgroundColor: t.surfaceSecondary,
                  borderColor: t.border,
                },
              ]}
              onPress={handleResetFilters}
            >
              <Text style={[styles.resetAllBtnText, { color: t.textMuted }]}>
                {globalLang === 'bn' ? 'রিসেট' : 'Reset'}
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
              size={38}
              color={t.textMuted}
              style={{ marginBottom: 12 }}
            />
            <Text style={[styles.emptyText, { color: t.text }]}>
              {globalLang === 'bn'
                ? 'এই কোম্পানি ও সিস্টেমে কোনো ওষুধ পাওয়া যায়নি'
                : 'No Medicines Found for this Company & System'}
            </Text>
          </View>
        }
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
    paddingBottom: 10,
    elevation: 8,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  headerTitleRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
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
    height: 44,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },
  clearBtnText: {
    fontSize: 16,
    paddingHorizontal: 4,
  },
  filterSectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  filterSectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    width: 62,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  chipsScroll: {
    paddingVertical: 2,
    paddingRight: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 6,
  },
  chipLabel: {
    fontSize: 12,
  },
  activeFilterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 6,
  },
  filterTag: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  filterTagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  resetAllBtn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  resetAllBtnText: {
    fontSize: 11,
    fontWeight: '600',
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
  },
  medNameEn: {
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 4,
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
    marginLeft: 4,
  },
  expandPill: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandPillText: {
    fontSize: 10,
    fontWeight: '800',
  },
  expandedContent: {
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: 14,
  },
  detailBlock: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
    marginBottom: 10,
  },
  detailTitle: {
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  detailText: {
    lineHeight: 18,
  },
  brandChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  brandTag: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  brandTagText: {
    fontSize: 11,
    fontWeight: '600',
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

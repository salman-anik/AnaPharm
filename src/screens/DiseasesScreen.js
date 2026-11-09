import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DISEASE_DATABASE, DISEASE_CATEGORIES } from '../data/diseaseData';
import { getTheme } from '../theme/theme';
import HealthIcon, { getSystemIcon, getOrganIcon } from '../components/HealthIcon';

export default function DiseasesScreen({
  theme = 'dark',
  fontSize = 'medium',
  language = 'bn',
  onSelectMedicine,
  onScrollLock,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [langMap, setLangMap] = useState({});

  const t = getTheme(theme, fontSize);

  const filteredDiseases = useMemo(() => {
    return DISEASE_DATABASE.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.system === selectedCategory;

      if (!matchesCategory) return false;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;

      const nameEn = (item.name_en || '').toLowerCase();
      const nameBn = (item.name_bn || '').toLowerCase();
      const icd = (item.icd10 || '').toLowerCase();
      const organ = (item.organ || '').toLowerCase();
      const overviewBn = (item.overview_bn || '').toLowerCase();
      const overviewEn = (item.overview_en || '').toLowerCase();

      const causesStr = (item.causes_bn || [])
        .concat(item.causes_en || [])
        .join(' ')
        .toLowerCase();
      const symptomsStr = (item.symptoms_bn || [])
        .concat(item.symptoms_en || [])
        .join(' ')
        .toLowerCase();
      const medsStr = (item.medicines || [])
        .map((m) => `${m.generic} ${m.class} ${(m.top_brands || []).join(' ')}`)
        .join(' ')
        .toLowerCase();

      return (
        nameEn.includes(q) ||
        nameBn.includes(q) ||
        icd.includes(q) ||
        organ.includes(q) ||
        overviewBn.includes(q) ||
        overviewEn.includes(q) ||
        causesStr.includes(q) ||
        symptomsStr.includes(q) ||
        medsStr.includes(q)
      );
    });
  }, [searchQuery, selectedCategory]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleLang = (id) => {
    setLangMap((prev) => ({
      ...prev,
      [id]: prev[id] === 'en' ? 'bn' : 'en',
    }));
  };

  const renderDiseaseCard = ({ item }) => {
    const isExpanded = expandedId === item.id;
    const cardLang = langMap[item.id] || language || 'bn';
    const isBn = cardLang === 'bn';

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
        {/* Card Header - Clean, No description text under title */}
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => toggleExpand(item.id)}
          style={[
            styles.cardHeader,
            {
              backgroundColor: isExpanded ? t.accentBg : 'transparent',
              borderBottomColor: t.border,
            },
          ]}
        >
          <View style={styles.headerTopRow}>
            <View
              style={[
                styles.organBadge,
                {
                  backgroundColor: t.surfaceSecondary,
                  borderColor: t.cardBorder,
                },
              ]}
            >
              <HealthIcon
                source={getOrganIcon(item.organ)}
                size={14}
                color={t.text}
                style={{ marginRight: 6 }}
              />
              <Text style={[styles.organText, { color: t.text }]}>
                {item.organ}
              </Text>
            </View>

            <View style={styles.rightBadges}>
              <View
                style={[
                  styles.severityBadge,
                  {
                    backgroundColor: t.surfaceSecondary,
                    borderColor: t.cardBorder,
                  },
                ]}
              >
                <Text style={[styles.severityText, { color: t.text }]}>
                  {item.severity}
                </Text>
              </View>

              <View
                style={[
                  styles.icdBadge,
                  {
                    backgroundColor: t.surfaceSecondary,
                    borderColor: t.border,
                  },
                ]}
              >
                <Text style={[styles.icdText, { color: t.textMuted }]}>
                  {item.icd10}
                </Text>
              </View>
            </View>
          </View>

          {/* Titles only */}
          <Text style={[styles.titleBn, { color: t.text }]}>
            {item.name_bn}
          </Text>
          <Text style={[styles.titleEn, { color: t.textMuted }]}>
            {item.name_en}
          </Text>

          {/* Expand Indicator */}
          <View style={styles.expandPromptRow}>
            <Text style={[styles.expandPromptText, { color: t.text }]}>
              {isExpanded ? '▲ Close Details' : '▼ View Details'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Expanded Detailed Section */}
        {isExpanded && (
          <View style={[styles.expandedContent, { borderTopColor: t.border }]}>
            {/* Overview */}
            <View style={styles.sectionBlock}>
              <Text style={[styles.sectionHeading, { color: t.text }]}>
                Overview
              </Text>
              <Text style={[styles.bodyText, { color: t.text }]}>
                {isBn ? item.overview_bn : item.overview_en}
              </Text>
            </View>

            {/* Language Switcher */}
            <View style={styles.langSwitchBar}>
              <Text style={[styles.langSwitchLabel, { color: t.textMuted }]}>
                Language:
              </Text>
              <TouchableOpacity
                onPress={() => toggleLang(item.id)}
                style={[
                  styles.langButton,
                  {
                    backgroundColor: t.chipBg,
                    borderColor: t.chipBorder,
                  },
                ]}
              >
                <Text style={[styles.langButtonText, { color: t.text }]}>
                  {isBn ? 'English' : 'বাংলা'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* 1. CAUSES & ETIOLOGY */}
            <View style={styles.sectionBlock}>
              <Text style={[styles.sectionHeading, { color: t.text }]}>
                {isBn ? 'কারণসমূহ (Causes):' : 'Causes:'}
              </Text>
              {(isBn ? item.causes_bn : item.causes_en).map((cause, index) => (
                <View key={index} style={styles.bulletRow}>
                  <Text style={[styles.bulletDot, { color: t.text }]}>•</Text>
                  <Text style={[styles.bulletText, { color: t.text }]}>
                    {cause}
                  </Text>
                </View>
              ))}
            </View>

            {/* 2. SYMPTOMS & SIGNS */}
            <View style={styles.sectionBlock}>
              <Text style={[styles.sectionHeading, { color: t.text }]}>
                {isBn ? 'লক্ষণ ও উপসর্গ (Symptoms):' : 'Symptoms:'}
              </Text>
              {(isBn ? item.symptoms_bn : item.symptoms_en).map((sym, index) => (
                <View key={index} style={styles.bulletRow}>
                  <Text style={[styles.bulletDot, { color: t.text }]}>•</Text>
                  <Text style={[styles.bulletText, { color: t.text }]}>
                    {sym}
                  </Text>
                </View>
              ))}
            </View>

            {/* 3. MEDICINES & TREATMENT */}
            <View style={styles.sectionBlock}>
              <Text style={[styles.sectionHeading, { color: t.text }]}>
                {isBn ? 'ওষুধ চিকিৎসা (Medicines):' : 'Medications:'}
              </Text>

              {item.medicines.map((med, index) => (
                <View
                  key={index}
                  style={[
                    styles.medicineItemBox,
                    {
                      backgroundColor: t.surfaceSecondary,
                      borderColor: t.border,
                    },
                  ]}
                >
                  <View style={styles.medHeaderRow}>
                    <Text style={[styles.medGeneric, { color: t.text }]}>
                      {med.generic}
                    </Text>
                    <View
                      style={[
                        styles.medClassBadge,
                        {
                          backgroundColor: t.chipBg,
                          borderColor: t.chipBorder,
                        },
                      ]}
                    >
                      <Text style={[styles.medClassText, { color: t.textMuted }]}>
                        {med.class}
                      </Text>
                    </View>
                  </View>

                  <Text style={[styles.medUsage, { color: t.text }]}>
                    {isBn ? med.usage_bn : med.usage_en}
                  </Text>

                  {/* Top BD Brands */}
                  {med.top_brands && med.top_brands.length > 0 && (
                    <View style={styles.brandsRow}>
                      <Text style={[styles.brandsLabel, { color: t.textMuted }]}>
                        Brands:
                      </Text>
                      <View style={styles.brandChipsWrap}>
                        {med.top_brands.map((brand, bIdx) => (
                          <View
                            key={bIdx}
                            style={[
                              styles.brandChip,
                              {
                                backgroundColor: t.chipBg,
                                borderColor: t.cardBorder,
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.brandChipText,
                                { color: t.text },
                              ]}
                            >
                              {brand}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>

            {/* 4. DIAGNOSTIC TESTS */}
            {item.diagnostic_tests && item.diagnostic_tests.length > 0 && (
              <View style={styles.sectionBlock}>
                <Text style={[styles.sectionHeading, { color: t.text }]}>
                  {isBn ? 'পরীক্ষাসমূহ (Tests):' : 'Diagnostic Tests:'}
                </Text>
                <View style={styles.testTagsWrap}>
                  {item.diagnostic_tests.map((test, index) => (
                    <View
                      key={index}
                      style={[
                        styles.testChip,
                        {
                          backgroundColor: t.chipBg,
                          borderColor: t.chipBorder,
                        },
                      ]}
                    >
                      <Text style={[styles.testChipText, { color: t.text }]}>
                        {test}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* 5. DIET & LIFESTYLE */}
            <View style={styles.sectionBlock}>
              <Text style={[styles.sectionHeading, { color: t.text }]}>
                {isBn ? 'জীবনযাপন ও যত্ন (Care):' : 'Care & Lifestyle:'}
              </Text>
              {(isBn ? item.lifestyle_diet_bn : item.lifestyle_diet_en).map(
                (tip, index) => (
                  <View key={index} style={styles.bulletRow}>
                    <Text style={[styles.bulletDot, { color: t.text }]}>•</Text>
                    <Text style={[styles.bulletText, { color: t.text }]}>
                      {tip}
                    </Text>
                  </View>
                )
              )}
            </View>

            {/* 6. WARNING */}
            {item.emergency_warning_bn && (
              <View
                style={[
                  styles.emergencyAlertBox,
                  {
                    backgroundColor: t.surfaceSecondary,
                    borderColor: t.border,
                  },
                ]}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <HealthIcon name="alert" size={14} color={t.text} style={{ marginRight: 6 }} />
                  <Text style={[styles.emergencyHeading, { color: t.text }]}>
                    Notice:
                  </Text>
                </View>
                <Text style={[styles.emergencyText, { color: t.textMuted }]}>
                  {isBn ? item.emergency_warning_bn : item.emergency_warning_en}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: t.bg }]}
    >
      {/* Header - Clean, No subtitle */}
      <View
        style={[
          styles.header,
          { backgroundColor: t.headerBg, borderBottomColor: t.glassBorder },
        ]}
      >
        <View style={styles.headerTitleRow}>
          <Text style={[styles.headerTitle, { color: t.text, fontSize: t.fs(26) }]}>
            Diseases
          </Text>
        </View>

        {/* Search Input */}
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: t.inputBg,
              borderColor: t.glassBorder,
            },
          ]}
        >
          <HealthIcon name="magnifyingGlass" size={16} color={t.textMuted} style={{ marginRight: 8 }} />
          <TextInput
            style={[styles.input, { color: t.text }]}
            placeholder="Search diseases, symptoms, cures..."
            placeholderTextColor={t.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={[styles.clearBtn, { color: t.text }]}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Categories - High contrast: selected font NEVER blends */}
        <View
          style={styles.categoriesWrap}
          onTouchStart={() => onScrollLock?.(true)}
          onTouchEnd={() => onScrollLock?.(false)}
          onTouchCancel={() => onScrollLock?.(false)}
        >
          <ScrollView
            horizontal
            nestedScrollEnabled={true}
            onScrollBeginDrag={() => onScrollLock?.(true)}
            onScrollEndDrag={() => onScrollLock?.(false)}
            onMomentumScrollEnd={() => onScrollLock?.(false)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {DISEASE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const catColor = isSelected ? (t.isDark ? '#000000' : '#ffffff') : t.text;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryChip,
                    {
                      backgroundColor: isSelected
                        ? t.isDark
                          ? '#ffffff'
                          : '#000000'
                        : t.chipBg,
                      borderColor: isSelected ? t.text : t.chipBorder,
                    },
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                  activeOpacity={0.7}
                >
                  <HealthIcon
                    source={cat.id === 'all' ? null : getSystemIcon(cat.id)}
                    size={14}
                    color={catColor}
                    style={{ marginRight: 6 }}
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      {
                        color: isSelected
                          ? t.isDark
                            ? '#000000'
                            : '#ffffff'
                          : t.text,
                        fontWeight: isSelected ? '800' : '500',
                      },
                    ]}
                  >
                    {cat.label_bn}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* Disease List */}
      <FlatList
        data={filteredDiseases}
        keyExtractor={(item) => item.id}
        renderItem={renderDiseaseCard}
        contentContainerStyle={styles.listContent}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews={true}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <HealthIcon
              name="magnifyingGlass"
              size={38}
              color={t.textMuted}
              style={{ marginBottom: 12 }}
            />
            <Text style={[styles.emptyTitle, { color: t.text }]}>
              No Diseases Found
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    elevation: 4,
  },
  headerTitleRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    marginBottom: 8,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 13,
    paddingVertical: 0,
  },
  clearBtn: {
    fontSize: 14,
    fontWeight: '700',
    paddingHorizontal: 4,
  },
  categoriesWrap: {
    marginTop: 2,
  },
  categoriesScroll: {
    gap: 8,
    paddingVertical: 2,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: 1,
  },
  catIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 11,
  },
  listContent: {
    padding: 14,
    gap: 12,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    padding: 14,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  organBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  organIcon: {
    fontSize: 13,
    marginRight: 4,
  },
  organText: {
    fontSize: 11,
    fontWeight: '700',
  },
  rightBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  icdBadge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  icdText: {
    fontSize: 10,
    fontWeight: '700',
  },
  titleBn: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 2,
  },
  titleEn: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  expandPromptRow: {
    marginTop: 4,
  },
  expandPromptText: {
    fontSize: 11,
    fontWeight: '700',
  },
  expandedContent: {
    borderTopWidth: 1,
    padding: 14,
    gap: 14,
  },
  bodyText: {
    fontSize: 13,
    lineHeight: 19,
  },
  langSwitchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 4,
  },
  langSwitchLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  langButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  langButtonText: {
    fontSize: 11,
    fontWeight: '700',
  },
  sectionBlock: {
    gap: 6,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  bulletDot: {
    fontSize: 13,
    lineHeight: 18,
  },
  bulletText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  medicineItemBox: {
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    marginTop: 4,
  },
  medHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  medGeneric: {
    fontSize: 13,
    fontWeight: '800',
  },
  medClassBadge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  medClassText: {
    fontSize: 10,
    fontWeight: '600',
  },
  medUsage: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 6,
  },
  brandsRow: {
    marginTop: 2,
  },
  brandsLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  brandChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  brandChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  brandChipText: {
    fontSize: 10,
    fontWeight: '700',
  },
  testTagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  testChip: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  testChipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  emergencyAlertBox: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginTop: 4,
  },
  emergencyHeading: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 4,
  },
  emergencyText: {
    fontSize: 12,
    lineHeight: 18,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
});

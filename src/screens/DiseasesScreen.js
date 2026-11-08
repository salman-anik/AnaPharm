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

export default function DiseasesScreen({ theme = 'dark', onSelectMedicine }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [langMap, setLangMap] = useState({}); // Per-card language toggle: 'bn' | 'en'

  const t = getTheme(theme);

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

      // Check causes
      const causesStr = (item.causes_bn || []).concat(item.causes_en || []).join(' ').toLowerCase();
      // Check symptoms
      const symptomsStr = (item.symptoms_bn || []).concat(item.symptoms_en || []).join(' ').toLowerCase();
      // Check medicines
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
    const cardLang = langMap[item.id] || 'bn';
    const isBn = cardLang === 'bn';

    const severityColor =
      item.severity === 'Critical'
        ? '#ef4444'
        : item.severity === 'High'
        ? '#f97316'
        : '#eab308';

    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: t.card,
            borderColor: isExpanded ? t.accent : t.cardBorder,
          },
        ]}
      >
        {/* Card Header */}
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => toggleExpand(item.id)}
          style={styles.cardHeader}
        >
          <View style={styles.headerTopRow}>
            <View style={styles.organBadge}>
              <Text style={styles.organIcon}>{item.organ_icon}</Text>
              <Text style={[styles.organText, { color: t.accentLight }]}>
                {item.organ}
              </Text>
            </View>

            <View style={styles.rightBadges}>
              <View
                style={[
                  styles.severityBadge,
                  { backgroundColor: `${severityColor}20` },
                ]}
              >
                <Text style={[styles.severityText, { color: severityColor }]}>
                  {item.severity}
                </Text>
              </View>

              <View
                style={[
                  styles.icdBadge,
                  { backgroundColor: t.isDark ? '#27272a' : '#e2e8f0' },
                ]}
              >
                <Text style={[styles.icdText, { color: t.textMuted }]}>
                  {item.icd10}
                </Text>
              </View>
            </View>
          </View>

          {/* Titles */}
          <Text style={[styles.titleBn, { color: t.text }]}>{item.name_bn}</Text>
          <Text style={[styles.titleEn, { color: t.textMuted }]}>
            {item.name_en}
          </Text>

          {/* Short Overview snippet */}
          <Text
            style={[styles.overviewSnippet, { color: t.textSecondary || t.textMuted }]}
            numberOfLines={isExpanded ? 10 : 2}
          >
            {isBn ? item.overview_bn : item.overview_en}
          </Text>

          {/* Expand Toggle Prompt */}
          <View style={styles.expandPromptRow}>
            <Text style={[styles.expandPromptText, { color: t.accent }]}>
              {isExpanded
                ? 'সংক্ষিপ্ত করুন ▲ Close Details'
                : 'কারণ, লক্ষণ ও সম্পূর্ণ ওষুধ চিকিৎসা দেখুন ▼ View Cures & Causes'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Expanded Detailed Clinical Section */}
        {isExpanded && (
          <View style={[styles.expandedContent, { borderTopColor: t.border }]}>
            {/* Language Switcher inside card */}
            <View style={styles.langSwitchBar}>
              <Text style={[styles.langSwitchLabel, { color: t.textDim }]}>
                Language / ভাষা:
              </Text>
              <TouchableOpacity
                onPress={() => toggleLang(item.id)}
                style={[
                  styles.langButton,
                  { backgroundColor: t.isDark ? '#27272a' : '#e2e8f0' },
                ]}
              >
                <Text style={[styles.langButtonText, { color: t.accent }]}>
                  {isBn ? '🌐 English' : '🌐 বাংলা'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* 1. CAUSES & ETIOLOGY */}
            <View style={styles.sectionBlock}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionIcon}>🔬</Text>
                <Text style={[styles.sectionHeading, { color: t.accent }]}>
                  {isBn ? 'রোগের মূল কারণসমূহ (Causes & Etiology)' : 'Causes & Etiology'}
                </Text>
              </View>
              {(isBn ? item.causes_bn : item.causes_en).map((cause, index) => (
                <View key={index} style={styles.bulletRow}>
                  <Text style={[styles.bulletDot, { color: t.accent }]}>•</Text>
                  <Text style={[styles.bulletText, { color: t.text }]}>{cause}</Text>
                </View>
              ))}
            </View>

            {/* 2. SYMPTOMS & SIGNS */}
            <View style={styles.sectionBlock}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionIcon}>⚠️</Text>
                <Text style={[styles.sectionHeading, { color: '#f59e0b' }]}>
                  {isBn ? 'প্রধান লক্ষণ ও উপসর্গ (Symptoms)' : 'Key Symptoms & Signs'}
                </Text>
              </View>
              {(isBn ? item.symptoms_bn : item.symptoms_en).map((sym, index) => (
                <View key={index} style={styles.bulletRow}>
                  <Text style={[styles.bulletDot, { color: '#f59e0b' }]}>•</Text>
                  <Text style={[styles.bulletText, { color: t.text }]}>{sym}</Text>
                </View>
              ))}
            </View>

            {/* 3. MEDICINES & TREATMENT */}
            <View style={styles.sectionBlock}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionIcon}>💊</Text>
                <Text style={[styles.sectionHeading, { color: '#10b981' }]}>
                  {isBn
                    ? 'ওষুধ ও চিকিৎসা নির্দেশিকা (Medicines & Cures)'
                    : 'Medications & Clinical Treatments'}
                </Text>
              </View>

              {item.medicines.map((med, index) => (
                <View
                  key={index}
                  style={[
                    styles.medicineItemBox,
                    {
                      backgroundColor: t.isDark ? '#1a1a1f' : '#f8fafc',
                      borderColor: t.isDark ? '#2e2e38' : '#e2e8f0',
                    },
                  ]}
                >
                  <View style={styles.medHeaderRow}>
                    <Text style={[styles.medGeneric, { color: t.accentLight }]}>
                      {med.generic}
                    </Text>
                    <View
                      style={[
                        styles.medClassBadge,
                        { backgroundColor: t.isDark ? '#27272a' : '#e2e8f0' },
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
                      <Text style={[styles.brandsLabel, { color: t.textDim }]}>
                        Top BD Brands:
                      </Text>
                      <View style={styles.brandChipsWrap}>
                        {med.top_brands.map((brand, bIdx) => (
                          <View
                            key={bIdx}
                            style={[
                              styles.brandChip,
                              { backgroundColor: t.accentBg },
                            ]}
                          >
                            <Text
                              style={[styles.brandChipText, { color: t.accent }]}
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
                <View style={styles.sectionTitleRow}>
                  <Text style={styles.sectionIcon}>🧪</Text>
                  <Text style={[styles.sectionHeading, { color: '#8b5cf6' }]}>
                    {isBn
                      ? 'প্রয়োজনীয় ডায়াগনস্টিক পরীক্ষা (Diagnostic Tests)'
                      : 'Diagnostic Tests & Workup'}
                  </Text>
                </View>
                <View style={styles.testTagsWrap}>
                  {item.diagnostic_tests.map((test, index) => (
                    <View
                      key={index}
                      style={[
                        styles.testChip,
                        {
                          backgroundColor: t.isDark ? '#261b40' : '#ede9fe',
                          borderColor: t.isDark ? '#4c2889' : '#ddd6fe',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.testChipText,
                          { color: t.isDark ? '#c4b5fd' : '#6d28d9' },
                        ]}
                      >
                        ✓ {test}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* 5. DIET & LIFESTYLE ADVICE */}
            <View style={styles.sectionBlock}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionIcon}>🥗</Text>
                <Text style={[styles.sectionHeading, { color: '#06b6d4' }]}>
                  {isBn
                    ? 'স্বাস্থ্যসম্মত জীবনযাপন ও খাদ্যবিধি (Diet & Lifestyle)'
                    : 'Diet & Lifestyle Care'}
                </Text>
              </View>
              {(isBn ? item.lifestyle_diet_bn : item.lifestyle_diet_en).map(
                (tip, index) => (
                  <View key={index} style={styles.bulletRow}>
                    <Text style={[styles.bulletDot, { color: '#06b6d4' }]}>✓</Text>
                    <Text style={[styles.bulletText, { color: t.text }]}>{tip}</Text>
                  </View>
                )
              )}
            </View>

            {/* 6. EMERGENCY RED FLAG WARNING */}
            {item.emergency_warning_bn && (
              <View
                style={[
                  styles.emergencyAlertBox,
                  {
                    backgroundColor: t.isDark ? '#380d0d' : '#fef2f2',
                    borderColor: '#ef4444',
                  },
                ]}
              >
                <View style={styles.emergencyTitleRow}>
                  <Text style={styles.emergencyIcon}>🚨</Text>
                  <Text style={styles.emergencyHeading}>
                    {isBn
                      ? 'জরুরি সতর্কতা (Emergency Warning)'
                      : 'Emergency Red-Flag Warning'}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.emergencyText,
                    { color: t.isDark ? '#fca5a5' : '#991b1b' },
                  ]}
                >
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
      {/* Header Bar */}
      <View
        style={[
          styles.header,
          { backgroundColor: t.headerBg, borderBottomColor: t.border },
        ]}
      >
        <View style={styles.headerTitleRow}>
          <Text style={styles.headerIcon}>🩺</Text>
          <View>
            <Text style={[styles.headerTitle, { color: t.text }]}>
              Clinical Diseases & Cures
            </Text>
            <Text style={[styles.headerSub, { color: t.textMuted }]}>
              রোগের কারণ, লক্ষণ ও ওষুধ নির্দেশিকা ({filteredDiseases.length} টি রোগ)
            </Text>
          </View>
        </View>

        {/* Search Input */}
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: t.inputBg, borderColor: t.border },
          ]}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.input, { color: t.text }]}
            placeholder="রোগের নাম, লক্ষণ, কারণ বা ওষুধ খুঁজুন..."
            placeholderTextColor={t.textDim}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={[styles.clearBtn, { color: t.textMuted }]}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Categories */}
        <View style={styles.categoriesWrap}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {DISEASE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryChip,
                    {
                      backgroundColor: isSelected ? t.accent : t.chipBg,
                      borderColor: isSelected ? t.accent : t.border,
                    },
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <Text style={styles.catIcon}>{cat.icon}</Text>
                  <Text
                    style={[
                      styles.categoryText,
                      {
                        color: isSelected
                          ? '#ffffff'
                          : t.textMuted,
                        fontWeight: isSelected ? '700' : '500',
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
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={[styles.emptyTitle, { color: t.text }]}>
              কোনো তথ্য পাওয়া যায়নি
            </Text>
            <Text style={[styles.emptySub, { color: t.textMuted }]}>
              অন্য কোনো রোগের নাম, লক্ষণ বা ওষুধের নাম লিখে সার্চ করুন
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
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerIcon: {
    fontSize: 26,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  headerSub: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: 44,
  },
  clearBtn: {
    fontSize: 14,
    padding: 6,
  },
  categoriesWrap: {
    marginTop: 10,
  },
  categoriesScroll: {
    paddingRight: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  catIcon: {
    fontSize: 13,
    marginRight: 5,
  },
  categoryText: {
    fontSize: 12,
  },
  listContent: {
    padding: 14,
    paddingBottom: 28,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 14,
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 16,
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
  },
  organIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  organText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  rightBadges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 6,
  },
  severityText: {
    fontSize: 11,
    fontWeight: '700',
  },
  icdBadge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  icdText: {
    fontSize: 11,
    fontWeight: '700',
  },
  titleBn: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 3,
  },
  titleEn: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  overviewSnippet: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 10,
  },
  expandPromptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
  },
  expandPromptText: {
    fontSize: 12,
    fontWeight: '700',
  },
  expandedContent: {
    borderTopWidth: 1,
    padding: 16,
    paddingTop: 14,
  },
  langSwitchBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 12,
  },
  langSwitchLabel: {
    fontSize: 11,
    marginRight: 6,
  },
  langButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  langButtonText: {
    fontSize: 11,
    fontWeight: '700',
  },
  sectionBlock: {
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    paddingLeft: 4,
  },
  bulletDot: {
    fontSize: 14,
    marginRight: 8,
    lineHeight: 18,
    fontWeight: '800',
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  medicineItemBox: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
  },
  medHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  medGeneric: {
    fontSize: 14,
    fontWeight: '800',
  },
  medClassBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  medClassText: {
    fontSize: 10,
    fontWeight: '600',
  },
  medUsage: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
    marginBottom: 8,
  },
  brandsRow: {
    marginTop: 4,
  },
  brandsLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  brandChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  brandChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 4,
  },
  brandChipText: {
    fontSize: 11,
    fontWeight: '700',
  },
  testTagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  testChip: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  testChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emergencyAlertBox: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 12,
    marginTop: 6,
  },
  emergencyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  emergencyIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  emergencyHeading: {
    color: '#ef4444',
    fontSize: 13,
    fontWeight: '800',
  },
  emergencyText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 13,
    textAlign: 'center',
  },
});

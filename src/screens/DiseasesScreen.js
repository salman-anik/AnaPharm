import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Animated,
  Easing,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DISEASE_DATABASE, DISEASE_CATEGORIES } from '../data/diseaseData';
import { getTheme } from '../theme/theme';
import HealthIcon, { getSystemIcon, getOrganIcon } from '../components/HealthIcon';
import DiseaseDetailModal from './DiseaseDetailModal';

export default function DiseasesScreen({
  theme = 'dark',
  fontSize = 'medium',
  language = 'bn',
  onSelectMedicine,
  onScrollLock,
}) {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDisease, setSelectedDisease] = useState(null);

  const t = getTheme(theme, fontSize);

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

  const renderDiseaseCard = ({ item }) => {
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
          <View style={styles.cardHeaderLeft}>
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
                source={getOrganIcon(item.organ)}
                size={22}
                color={t.text}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.titleBn, { color: t.text, fontSize: t.fs(15) }]}>
                {language === 'bn' ? item.name_bn : item.name_en}
              </Text>
              <Text style={[styles.titleEn, { color: t.textMuted, fontSize: t.fs(12) }]}>
                {language === 'bn' ? item.name_en : item.name_bn}
              </Text>

              {/* Badges row */}
              <View style={styles.badgeRow}>
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
                    size={11}
                    color={t.text}
                    style={{ marginRight: 4 }}
                  />
                  <Text style={[styles.organText, { color: t.text, fontSize: t.fs(11) }]}>
                    {item.organ}
                  </Text>
                </View>

                {item.severity ? (
                  <View
                    style={[
                      styles.severityBadge,
                      {
                        backgroundColor: t.accentBg,
                        borderColor: t.cardBorder,
                      },
                    ]}
                  >
                    <Text style={[styles.severityText, { color: t.text, fontSize: t.fs(10) }]}>
                      {item.severity}
                    </Text>
                  </View>
                ) : null}

                {item.icd10 ? (
                  <View
                    style={[
                      styles.icdBadge,
                      {
                        backgroundColor: t.surfaceSecondary,
                        borderColor: t.border,
                      },
                    ]}
                  >
                    <Text style={[styles.icdText, { color: t.textMuted, fontSize: t.fs(10) }]}>
                      ICD: {item.icd10}
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
              onPress={() => setSelectedDisease(item)}
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

        {/* Quick Overview Summary Preview */}
        {(item.overview_bn || item.overview_en) ? (
          <View style={[styles.cardFooter, { borderTopColor: t.border }]}>
            <Text
              style={[styles.cardFooterText, { color: t.textMuted, fontSize: t.fs(11) }]}
              numberOfLines={2}
            >
              {language === 'bn' ? item.overview_bn : item.overview_en}
            </Text>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: t.bg }]}>
      {/* Collapsible Header */}
      <Animated.View
        style={[
          styles.header,
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
          onTouchStart={() => onScrollLock?.(true)}
        >
          <HealthIcon name="magnifyingGlass" size={16} color={t.textMuted} style={{ marginRight: 8 }} />
          <TextInput
            style={[styles.input, { color: t.text }]}
            placeholder="Search diseases, symptoms, cures..."
            placeholderTextColor={t.textMuted}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
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
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery('');
                Keyboard.dismiss();
                onScrollLock?.(false);
              }}
            >
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
      </Animated.View>

      {/* Disease List */}
      <FlatList
        data={filteredDiseases}
        keyExtractor={(item) => item.id}
        renderItem={renderDiseaseCard}
        contentContainerStyle={[styles.listContent, { paddingTop: headerHeight + 8 }]}
        scrollIndicatorInsets={{ top: headerHeight }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
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

      {/* Dedicated Separate Page for Disease Details */}
      <DiseaseDetailModal
        visible={!!selectedDisease}
        disease={selectedDisease}
        onClose={() => setSelectedDisease(null)}
        theme={theme}
        fontSize={fontSize}
        initialLanguage={language}
        onSelectMedicine={onSelectMedicine}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1.5,
    borderTopWidth: 1,
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
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
  categoryText: {
    fontSize: 11,
  },
  listContent: {
    padding: 14,
    gap: 12,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  cardHeaderLeft: {
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
  titleBn: {
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  titleEn: {
    fontWeight: '500',
    marginTop: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 5,
  },
  organBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
  },
  organText: {
    fontWeight: '600',
  },
  severityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
  },
  severityText: {
    fontWeight: '700',
  },
  icdBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
  },
  icdText: {
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
    lineHeight: 16,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
});

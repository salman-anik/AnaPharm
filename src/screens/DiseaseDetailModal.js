import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTheme } from '../theme/theme';
import HealthIcon, { getSystemIcon, getOrganIcon } from '../components/HealthIcon';

export default function DiseaseDetailModal({
  visible,
  disease,
  onClose,
  theme = 'dark',
  fontSize = 'medium',
  themeObj,
  initialLanguage = 'bn',
  onSelectMedicine,
}) {
  const [lang, setLang] = useState(initialLanguage);
  const insets = useSafeAreaInsets();
  const t = themeObj || getTheme(theme, fontSize);

  if (!disease) return null;

  const isBn = lang === 'bn';
  const displayName = isBn ? (disease.name_bn || disease.name_en) : disease.name_en;
  const secondaryName = isBn ? disease.name_en : (disease.name_bn || '');

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: t.bg }]}>
        <StatusBar
          barStyle={t.isDark ? 'light-content' : 'dark-content'}
          backgroundColor={t.isDark ? '#09090b' : '#ffffff'}
        />

        {/* Top Navigation Bar */}
        <View
          style={[
            styles.navBar,
            {
              paddingTop: insets.top > 0 ? insets.top + 8 : 14,
              backgroundColor: t.isDark ? '#09090b' : '#ffffff',
              borderBottomColor: t.isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.12)',
            },
          ]}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={[
              styles.backButton,
              {
                backgroundColor: t.surfaceSecondary,
                borderColor: t.cardBorder,
                paddingVertical: Math.max(5, Math.round(t.fs(6))),
                paddingHorizontal: Math.max(8, Math.round(t.fs(10))),
              },
            ]}
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <Text style={[styles.backButtonText, { color: t.text, fontSize: t.fs(12) }]}>
              ← Back
            </Text>
          </TouchableOpacity>

          {/* Title in Center Top in English */}
          <View style={styles.navTitleWrap}>
            <Text
              style={[styles.navTitle, { color: t.text, fontSize: t.fs(16) }]}
              numberOfLines={1}
            >
              {disease.name_en}
            </Text>
            <Text
              style={[styles.navSubtitle, { color: t.textMuted, fontSize: t.fs(11) }]}
              numberOfLines={1}
            >
              {disease.organ} • ICD: {disease.icd10}
            </Text>
          </View>

          {/* Language Toggle Pill */}
          <View style={[styles.langPillContainer, { backgroundColor: t.surfaceSecondary, borderColor: t.border }]}>
            <TouchableOpacity
              style={[
                styles.langPill,
                {
                  paddingVertical: Math.max(3, Math.round(t.fs(4))),
                  paddingHorizontal: Math.max(6, Math.round(t.fs(8))),
                },
                isBn && { backgroundColor: t.isDark ? '#ffffff' : '#000000' },
              ]}
              onPress={() => setLang('bn')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.langPillText,
                  {
                    color: isBn ? (t.isDark ? '#000000' : '#ffffff') : t.textMuted,
                    fontSize: t.fs(11),
                  },
                ]}
              >
                বাং
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.langPill,
                {
                  paddingVertical: Math.max(3, Math.round(t.fs(4))),
                  paddingHorizontal: Math.max(6, Math.round(t.fs(8))),
                },
                !isBn && { backgroundColor: t.isDark ? '#ffffff' : '#000000' },
              ]}
              onPress={() => setLang('en')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.langPillText,
                  {
                    color: !isBn ? (t.isDark ? '#000000' : '#ffffff') : t.textMuted,
                    fontSize: t.fs(11),
                  },
                ]}
              >
                EN
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Scrollable Disease Clinical Sheet */}
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom > 0 ? insets.bottom + 36 : 40 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Disease Banner */}
          <View
            style={[
              styles.heroCard,
              {
                backgroundColor: t.card,
                borderColor: t.cardBorder,
              },
            ]}
          >
            <View style={styles.heroTopRow}>
              {/* Perfectly proportioned circular icon container */}
              <View
                style={[
                  styles.heroIconCircle,
                  {
                    backgroundColor: t.accentBg,
                    borderColor: t.cardBorder,
                  },
                ]}
              >
                <HealthIcon
                  source={getOrganIcon(disease.organ)}
                  size={28}
                  color={t.text}
                />
              </View>

              <View style={styles.heroTextCol}>
                <Text style={[styles.heroName, { color: t.text, fontSize: t.fs(20) }]}>
                  {displayName}
                </Text>
                {secondaryName ? (
                  <Text style={[styles.heroSubName, { color: t.textMuted, fontSize: t.fs(13) }]}>
                    {secondaryName}
                  </Text>
                ) : null}
              </View>
            </View>

            {/* Badges Row */}
            <View style={styles.badgeRow}>
              {/* Target Organ Badge */}
              <View style={[styles.metaBadge, { backgroundColor: t.surfaceSecondary, borderColor: t.border }]}>
                <HealthIcon
                  source={getOrganIcon(disease.organ)}
                  size={13}
                  color={t.text}
                  style={styles.metaBadgeIcon}
                />
                <Text style={[styles.metaBadgeText, { color: t.text, fontSize: t.fs(11) }]}>
                  {disease.organ}
                </Text>
              </View>

              {/* Anatomical System Badge */}
              {disease.system ? (
                <View style={[styles.metaBadge, { backgroundColor: t.surfaceSecondary, borderColor: t.border }]}>
                  <HealthIcon
                    source={getSystemIcon(disease.system)}
                    size={13}
                    color={t.text}
                    style={styles.metaBadgeIcon}
                  />
                  <Text style={[styles.metaBadgeText, { color: t.text, fontSize: t.fs(11) }]}>
                    {disease.system.toUpperCase()}
                  </Text>
                </View>
              ) : null}

              {/* Severity Level Badge */}
              {disease.severity ? (
                <View style={[styles.metaBadge, { backgroundColor: t.accentBg, borderColor: t.cardBorder }]}>
                  <HealthIcon
                    name="alert"
                    size={13}
                    color={t.text}
                    style={styles.metaBadgeIcon}
                  />
                  <Text style={[styles.metaBadgeText, { color: t.text, fontSize: t.fs(11) }]}>
                    {disease.severity}
                  </Text>
                </View>
              ) : null}

              {/* ICD-10 Code Badge */}
              {disease.icd10 ? (
                <View style={[styles.metaBadge, { backgroundColor: t.surfaceSecondary, borderColor: t.border }]}>
                  <HealthIcon
                    name="rx"
                    size={13}
                    color={t.text}
                    style={styles.metaBadgeIcon}
                  />
                  <Text style={[styles.metaBadgeText, { color: t.textMuted, fontSize: t.fs(11) }]}>
                    ICD-10: {disease.icd10}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          {/* Section 1: Overview & Clinical Presentation */}
          <View style={[styles.sectionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
            <View style={styles.sectionHeaderRow}>
              <View style={[styles.sectionIconWrap, { backgroundColor: t.accentBg, borderColor: t.cardBorder }]}>
                <HealthIcon name="stethoscope" size={15} color={t.text} />
              </View>
              <Text style={[styles.sectionHeading, { color: t.text, fontSize: t.fs(14) }]}>
                {isBn ? 'রোগের বিবরণ ও পরিচিতি (Overview)' : 'Overview & Clinical Summary'}
              </Text>
            </View>
            <Text style={[styles.sectionBody, { color: t.text, fontSize: t.fs(13) }]}>
              {isBn ? disease.overview_bn : disease.overview_en}
            </Text>
          </View>

          {/* Section 2: Causes & Etiology */}
          {((isBn ? disease.causes_bn : disease.causes_en) || disease.causes_bn)?.length > 0 ? (
            <View style={[styles.sectionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
              <View style={styles.sectionHeaderRow}>
                <View style={[styles.sectionIconWrap, { backgroundColor: t.accentBg, borderColor: t.cardBorder }]}>
                  <HealthIcon name="virus" size={15} color={t.text} />
                </View>
                <Text style={[styles.sectionHeading, { color: t.text, fontSize: t.fs(14) }]}>
                  {isBn ? 'কারণসমূহ (Etiology & Causes)' : 'Causes & Risk Factors'}
                </Text>
              </View>
              <View style={styles.itemsListWrap}>
                {((isBn ? disease.causes_bn : disease.causes_en) || disease.causes_bn).map((cause, idx) => (
                  <View key={idx} style={styles.bulletRow}>
                    <View style={[styles.bulletPointCircle, { backgroundColor: t.text }]} />
                    <Text style={[styles.bulletRowText, { color: t.text, fontSize: t.fs(13) }]}>
                      {cause}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {/* Section 3: Signs & Clinical Symptoms */}
          {((isBn ? disease.symptoms_bn : disease.symptoms_en) || disease.symptoms_bn)?.length > 0 ? (
            <View style={[styles.sectionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
              <View style={styles.sectionHeaderRow}>
                <View style={[styles.sectionIconWrap, { backgroundColor: t.accentBg, borderColor: t.cardBorder }]}>
                  <HealthIcon name="alert" size={15} color={t.text} />
                </View>
                <Text style={[styles.sectionHeading, { color: t.text, fontSize: t.fs(14) }]}>
                  {isBn ? 'লক্ষণ ও উপসর্গ (Signs & Symptoms)' : 'Clinical Signs & Symptoms'}
                </Text>
              </View>
              <View style={styles.itemsListWrap}>
                {((isBn ? disease.symptoms_bn : disease.symptoms_en) || disease.symptoms_bn).map((sym, idx) => (
                  <View key={idx} style={styles.bulletRow}>
                    <View style={[styles.bulletPointCircle, { backgroundColor: t.text }]} />
                    <Text style={[styles.bulletRowText, { color: t.text, fontSize: t.fs(13) }]}>
                      {sym}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {/* Section 4: Pharmacotherapy & Medications */}
          {disease.medicines && disease.medicines.length > 0 ? (
            <View style={[styles.sectionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
              <View style={styles.sectionHeaderRow}>
                <View style={[styles.sectionIconWrap, { backgroundColor: t.accentBg, borderColor: t.cardBorder }]}>
                  <HealthIcon name="medicines" size={15} color={t.text} />
                </View>
                <Text style={[styles.sectionHeading, { color: t.text, fontSize: t.fs(14) }]}>
                  {isBn ? 'চিকিৎসা ও ওষুধ (Pharmacotherapy)' : 'Pharmacotherapy & Medications'}
                </Text>
              </View>

              <View style={styles.medListWrap}>
                {disease.medicines.map((med, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.medItemCard,
                      {
                        backgroundColor: t.surfaceSecondary,
                        borderColor: t.cardBorder,
                      },
                    ]}
                  >
                    <View style={styles.medHeaderRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.medGenericText, { color: t.text, fontSize: t.fs(14) }]}>
                          {med.generic}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.medClassBadge,
                          {
                            backgroundColor: t.accentBg,
                            borderColor: t.cardBorder,
                          },
                        ]}
                      >
                        <Text style={[styles.medClassText, { color: t.text, fontSize: t.fs(10) }]}>
                          {med.class}
                        </Text>
                      </View>
                    </View>

                    <Text style={[styles.medUsageText, { color: t.text, fontSize: t.fs(12) }]}>
                      {isBn ? med.usage_bn : med.usage_en}
                    </Text>

                    {/* Top Bangladesh Brands */}
                    {med.top_brands && med.top_brands.length > 0 ? (
                      <View style={styles.brandRowContainer}>
                        <Text style={[styles.brandRowLabel, { color: t.textMuted, fontSize: t.fs(11) }]}>
                          {isBn ? 'প্রচলিত ব্র্যান্ড:' : 'Top BD Brands:'}
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
                              <HealthIcon
                                name="pills"
                                size={10}
                                color={t.text}
                                style={{ marginRight: 4 }}
                              />
                              <Text style={[styles.brandChipText, { color: t.text, fontSize: t.fs(11) }]}>
                                {brand}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    ) : null}
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {/* Section 5: Diagnostic Tests & Investigations */}
          {disease.diagnostic_tests && disease.diagnostic_tests.length > 0 ? (
            <View style={[styles.sectionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
              <View style={styles.sectionHeaderRow}>
                <View style={[styles.sectionIconWrap, { backgroundColor: t.accentBg, borderColor: t.cardBorder }]}>
                  <HealthIcon name="thermometer" size={15} color={t.text} />
                </View>
                <Text style={[styles.sectionHeading, { color: t.text, fontSize: t.fs(14) }]}>
                  {isBn ? 'প্রয়োজনীয় পরীক্ষা-নিরীক্ষা (Diagnostic Tests)' : 'Diagnostic Tests & Lab Work'}
                </Text>
              </View>
              <View style={styles.testChipsWrap}>
                {disease.diagnostic_tests.map((test, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.testChip,
                      {
                        backgroundColor: t.surfaceSecondary,
                        borderColor: t.cardBorder,
                      },
                    ]}
                  >
                    <HealthIcon
                      name="microscope"
                      size={11}
                      color={t.text}
                      style={{ marginRight: 4 }}
                    />
                    <Text style={[styles.testChipText, { color: t.text, fontSize: t.fs(11) }]}>
                      {test}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {/* Section 6: Care, Diet & Lifestyle Guidelines */}
          {((isBn ? disease.lifestyle_diet_bn : disease.lifestyle_diet_en) || disease.lifestyle_diet_bn)?.length > 0 ? (
            <View style={[styles.sectionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
              <View style={styles.sectionHeaderRow}>
                <View style={[styles.sectionIconWrap, { backgroundColor: t.accentBg, borderColor: t.cardBorder }]}>
                  <HealthIcon name="heartbeat" size={15} color={t.text} />
                </View>
                <Text style={[styles.sectionHeading, { color: t.text, fontSize: t.fs(14) }]}>
                  {isBn ? 'জীবনযাপন, খাদ্য ও যত্ন (Care & Lifestyle)' : 'Care, Diet & Lifestyle Guidance'}
                </Text>
              </View>
              <View style={styles.itemsListWrap}>
                {((isBn ? disease.lifestyle_diet_bn : disease.lifestyle_diet_en) || disease.lifestyle_diet_bn).map(
                  (tip, idx) => (
                    <View key={idx} style={styles.bulletRow}>
                      <View style={[styles.bulletPointCircle, { backgroundColor: t.text }]} />
                      <Text style={[styles.bulletRowText, { color: t.text, fontSize: t.fs(13) }]}>
                        {tip}
                      </Text>
                    </View>
                  )
                )}
              </View>
            </View>
          ) : null}

          {/* Section 7: Emergency Notice & Clinical Warning */}
          {disease.emergency_warning_bn || disease.emergency_warning_en ? (
            <View
              style={[
                styles.emergencyCard,
                {
                  backgroundColor: t.surfaceSecondary,
                  borderColor: t.cardBorder,
                  borderLeftColor: t.text,
                },
              ]}
            >
              <View style={styles.emergencyHeaderRow}>
                <HealthIcon name="alert" size={16} color={t.text} style={{ marginRight: 6 }} />
                <Text style={[styles.emergencyTitle, { color: t.text, fontSize: t.fs(13) }]}>
                  {isBn ? 'জরুরি সতর্কতা ও নোটিশ (Clinical Warning)' : 'Clinical Warning & Precautions'}
                </Text>
              </View>
              <Text style={[styles.emergencyBody, { color: t.textMuted, fontSize: t.fs(12) }]}>
                {isBn ? disease.emergency_warning_bn : disease.emergency_warning_en}
              </Text>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    borderRadius: 10,
    borderWidth: 1,
  },
  backButtonText: {
    fontWeight: '700',
  },
  navTitleWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  navTitle: {
    fontWeight: '800',
    textAlign: 'center',
  },
  navSubtitle: {
    marginTop: 1,
    textAlign: 'center',
  },
  langPillContainer: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    padding: 2,
  },
  langPill: {
    borderRadius: 12,
  },
  langPillText: {
    fontWeight: '700',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  heroCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  },
  heroTextCol: {
    flex: 1,
    marginLeft: 14,
  },
  heroName: {
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  heroSubName: {
    marginTop: 2,
    fontWeight: '500',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 14,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  metaBadgeIcon: {
    marginRight: 5,
    flexShrink: 0,
  },
  metaBadgeText: {
    fontWeight: '600',
  },
  sectionCard: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    flexShrink: 0,
    overflow: 'hidden',
  },
  sectionHeading: {
    fontWeight: '700',
    letterSpacing: -0.2,
    flex: 1,
  },
  sectionBody: {
    lineHeight: 20,
  },
  itemsListWrap: {
    gap: 8,
    marginTop: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletPointCircle: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginTop: 6,
    marginRight: 8,
    flexShrink: 0,
  },
  bulletRowText: {
    flex: 1,
    lineHeight: 19,
  },
  medListWrap: {
    gap: 10,
    marginTop: 4,
  },
  medItemCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  medHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  medGenericText: {
    fontWeight: '700',
  },
  medClassBadge: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  medClassText: {
    fontWeight: '700',
  },
  medUsageText: {
    lineHeight: 18,
    marginBottom: 8,
  },
  brandRowContainer: {
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(128, 128, 128, 0.2)',
  },
  brandRowLabel: {
    fontWeight: '600',
    marginBottom: 4,
  },
  brandChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  brandChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  brandChipText: {
    fontWeight: '600',
  },
  testChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  testChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  testChipText: {
    fontWeight: '600',
  },
  emergencyCard: {
    borderWidth: 1,
    borderLeftWidth: 3.5,
    borderRadius: 12,
    padding: 12,
  },
  emergencyHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  emergencyTitle: {
    fontWeight: '700',
  },
  emergencyBody: {
    lineHeight: 18,
  },
});

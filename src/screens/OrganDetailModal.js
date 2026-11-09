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
import { SYSTEMS } from '../data/anatomyData';
import { getTheme } from '../theme/theme';
import HealthIcon, { getOrganIcon, getSystemIcon, HEALTH_ICONS } from '../components/HealthIcon';

export default function OrganDetailModal({
  visible,
  organData,
  onClose,
  theme = 'light',
  fontSize = 'medium',
  themeObj,
  initialLanguage = 'bn',
}) {
  const [lang, setLang] = useState(initialLanguage);
  const insets = useSafeAreaInsets();
  const t = themeObj || getTheme(theme, fontSize);

  if (!organData) return null;

  const isBn = lang === 'bn';
  const systemInfo = SYSTEMS[organData.system] || {
    name: 'Human Anatomy',
    name_bn: 'মানব শারীরস্থান',
    icon: '🧬',
  };

  const displayName = isBn ? (organData.name_bn || organData.name) : organData.name;
  const secondaryName = isBn ? organData.name : (organData.name_bn || '');

  // Split medications into structured tokens if applicable
  const medicationTokens = organData.medications_bn
    ? organData.medications_bn.split(/[,;।]/).map((s) => s.trim()).filter((s) => s.length > 0)
    : [];

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
              {organData.name}
            </Text>
            <Text
              style={[styles.navSubtitle, { color: t.textMuted, fontSize: t.fs(11) }]}
              numberOfLines={1}
            >
              {organData.latin ? `Latin: ${organData.latin}` : systemInfo.name}
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
                isBn && { backgroundColor: '#D8BDF8' },
              ]}
              onPress={() => setLang('bn')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.langPillText,
                  {
                    color: isBn ? '#1e1b4b' : t.textMuted,
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
                !isBn && { backgroundColor: '#D8BDF8' },
              ]}
              onPress={() => setLang('en')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.langPillText,
                  {
                    color: !isBn ? '#1e1b4b' : t.textMuted,
                    fontSize: t.fs(11),
                  },
                ]}
              >
                EN
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Scrollable Anatomical Sheet */}
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom > 0 ? insets.bottom + 36 : 40 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Organ Banner */}
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
                  source={getOrganIcon(organData.name)}
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
              {/* Anatomical System Badge */}
              <View style={[styles.metaBadge, { backgroundColor: t.surfaceSecondary, borderColor: t.border }]}>
                <HealthIcon
                  source={getSystemIcon(organData.system)}
                  size={13}
                  color={t.text}
                  style={styles.metaBadgeIcon}
                />
                <Text style={[styles.metaBadgeText, { color: t.text, fontSize: t.fs(11) }]}>
                  {isBn ? (systemInfo.name_bn || systemInfo.name) : systemInfo.name}
                </Text>
              </View>

              {/* Anatomical Region Badge */}
              {organData.region ? (
                <View style={[styles.metaBadge, { backgroundColor: t.surfaceSecondary, borderColor: t.border }]}>
                  <HealthIcon
                    name="bodyOutline"
                    size={13}
                    color={t.text}
                    style={styles.metaBadgeIcon}
                  />
                  <Text style={[styles.metaBadgeText, { color: t.text, fontSize: t.fs(11) }]}>
                    {isBn
                      ? organData.region === 'thorax'
                        ? 'বক্ষগহ্বর (Thorax)'
                        : organData.region === 'head'
                        ? 'মস্তক (Head)'
                        : organData.region === 'abdomen'
                        ? 'উদরগহ্বর (Abdomen)'
                        : organData.region === 'pelvis'
                        ? 'শ্রোণিদেশ (Pelvis)'
                        : organData.region === 'limbs'
                        ? 'হাত ও পা (Limbs)'
                        : organData.region
                      : `Region: ${organData.region.toUpperCase()}`}
                  </Text>
                </View>
              ) : null}

              {/* Latin Anatomical Name */}
              {organData.latin ? (
                <View style={[styles.metaBadge, { backgroundColor: t.accentBg, borderColor: t.cardBorder }]}>
                  <HealthIcon
                    name="dna"
                    size={13}
                    color={t.text}
                    style={styles.metaBadgeIcon}
                  />
                  <Text style={[styles.metaBadgeText, { color: t.text, fontSize: t.fs(11) }]}>
                    Latin: {organData.latin}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          {/* Section 1: Overview & Anatomical Structure */}
          <View style={[styles.sectionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
            <View style={styles.sectionHeaderRow}>
              <View style={[styles.sectionIconWrap, { backgroundColor: t.accentBg, borderColor: t.cardBorder }]}>
                <HealthIcon name="bodyOutline" size={15} color={t.text} />
              </View>
              <Text style={[styles.sectionHeading, { color: t.text, fontSize: t.fs(14) }]}>
                {isBn ? 'শারীরবৃত্তীয় পরিচিতি ও গঠন (Overview & Structure)' : 'Overview & Anatomical Structure'}
              </Text>
            </View>

            <Text style={[styles.sectionBody, { color: t.text, fontSize: t.fs(13) }]}>
              {isBn ? organData.desc_bn : (organData.desc_en || organData.desc_bn)}
            </Text>

            {/* Physiological Functions List */}
            {((isBn ? organData.funcs_bn : organData.funcs_en) || organData.funcs_bn)?.length > 0 ? (
              <View style={styles.subSectionWrap}>
                <Text style={[styles.subSectionHeading, { color: t.text, fontSize: t.fs(12) }]}>
                  {isBn ? 'প্রধান শারীরবৃত্তীয় কাজসমূহ (Functions):' : 'Key Physiological Functions:'}
                </Text>
                {((isBn ? organData.funcs_bn : organData.funcs_en) || organData.funcs_bn).map((fn, idx) => (
                  <View key={idx} style={styles.bulletRow}>
                    <View style={[styles.bulletPointCircle, { backgroundColor: t.text }]} />
                    <Text style={[styles.bulletRowText, { color: t.text, fontSize: t.fs(12) }]}>
                      {fn}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}

            {/* Clinical Fact Callout */}
            {(isBn ? organData.fact_bn : (organData.fact_en || organData.fact_bn)) ? (
              <View
                style={[
                  styles.factCalloutBox,
                  {
                    backgroundColor: t.surfaceSecondary,
                    borderLeftColor: t.text,
                    borderColor: t.cardBorder,
                  },
                ]}
              >
                <View style={styles.factTitleRow}>
                  <HealthIcon name="microscope" size={14} color={t.text} style={{ marginRight: 6 }} />
                  <Text style={[styles.factTitleText, { color: t.text, fontSize: t.fs(12) }]}>
                    {isBn ? 'ক্লিনিক্যাল বা শারীরবৃত্তীয় তথ্য (Clinical Fact):' : 'Clinical & Physiological Fact:'}
                  </Text>
                </View>
                <Text style={[styles.factContentText, { color: t.text, fontSize: t.fs(12) }]}>
                  {isBn ? organData.fact_bn : (organData.fact_en || organData.fact_bn)}
                </Text>
              </View>
            ) : null}
          </View>

          {/* Section 2: Pathologies & Clinical Disorders */}
          <View style={[styles.sectionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
            <View style={styles.sectionHeaderRow}>
              <View style={[styles.sectionIconWrap, { backgroundColor: t.accentBg, borderColor: t.cardBorder }]}>
                <HealthIcon name="alert" size={15} color={t.text} />
              </View>
              <Text style={[styles.sectionHeading, { color: t.text, fontSize: t.fs(14) }]}>
                {isBn ? 'রোগ ও অস্বাভাবিকতা (Pathologies & Disorders)' : 'Pathologies & Clinical Disorders'}
              </Text>
            </View>

            {organData.diseases_bn && organData.diseases_bn.length > 0 ? (
              <View style={styles.itemsListWrap}>
                {organData.diseases_bn.map((dis, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.listItemCard,
                      {
                        backgroundColor: t.surfaceSecondary,
                        borderColor: t.cardBorder,
                      },
                    ]}
                  >
                    <HealthIcon
                      name="virus"
                      size={14}
                      color={t.text}
                      style={{ marginRight: 8, marginTop: 2 }}
                    />
                    <Text style={[styles.listItemText, { color: t.text, fontSize: t.fs(12) }]}>
                      {dis}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={[styles.sectionBody, { color: t.textMuted, fontSize: t.fs(13) }]}>
                {isBn ? organData.patho_bn : (organData.patho_en || organData.patho_bn)}
              </Text>
            )}
          </View>

          {/* Section 3: Diagnostic Tests & Clinical Interventions */}
          <View style={[styles.sectionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
            <View style={styles.sectionHeaderRow}>
              <View style={[styles.sectionIconWrap, { backgroundColor: t.accentBg, borderColor: t.cardBorder }]}>
                <HealthIcon name="thermometer" size={15} color={t.text} />
              </View>
              <Text style={[styles.sectionHeading, { color: t.text, fontSize: t.fs(14) }]}>
                {isBn ? 'চিকিৎসা ও পরীক্ষা-নিরীক্ষা (Treatments & Tests)' : 'Diagnostic Tests & Clinical Interventions'}
              </Text>
            </View>

            {organData.solutions_bn && organData.solutions_bn.length > 0 ? (
              <View style={styles.itemsListWrap}>
                {organData.solutions_bn.map((sol, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.listItemCard,
                      {
                        backgroundColor: t.surfaceSecondary,
                        borderColor: t.cardBorder,
                      },
                    ]}
                  >
                    <HealthIcon
                      name="stethoscope"
                      size={14}
                      color={t.text}
                      style={{ marginRight: 8, marginTop: 2 }}
                    />
                    <Text style={[styles.listItemText, { color: t.text, fontSize: t.fs(12) }]}>
                      {sol}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={[styles.sectionBody, { color: t.textMuted, fontSize: t.fs(13) }]}>
                {isBn
                  ? 'নিয়মিত স্বাস্থ্য পরীক্ষা ও বিশেষজ্ঞ চিকিৎসকের পরামর্শ গ্রহণ করুন।'
                  : 'Regular medical screenings and specialist consultation recommended.'}
              </Text>
            )}
          </View>

          {/* Section 4: Care, Nutrition & Lifestyle Guidance */}
          <View style={[styles.sectionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
            <View style={styles.sectionHeaderRow}>
              <View style={[styles.sectionIconWrap, { backgroundColor: t.accentBg, borderColor: t.cardBorder }]}>
                <HealthIcon name="heartbeat" size={15} color={t.text} />
              </View>
              <Text style={[styles.sectionHeading, { color: t.text, fontSize: t.fs(14) }]}>
                {isBn ? 'যত্ন ও জীবনধারা পরামর্শ (Care & Health Guidance)' : 'Care, Nutrition & Lifestyle Guidance'}
              </Text>
            </View>

            {organData.fitness_tips_bn && organData.fitness_tips_bn.length > 0 ? (
              <View style={styles.itemsListWrap}>
                {organData.fitness_tips_bn.map((tip, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.listItemCard,
                      {
                        backgroundColor: t.surfaceSecondary,
                        borderColor: t.cardBorder,
                      },
                    ]}
                  >
                    <HealthIcon
                      name="pulseOximeter"
                      size={14}
                      color={t.text}
                      style={{ marginRight: 8, marginTop: 2 }}
                    />
                    <Text style={[styles.listItemText, { color: t.text, fontSize: t.fs(12) }]}>
                      {tip}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={[styles.sectionBody, { color: t.textMuted, fontSize: t.fs(13) }]}>
                {isBn
                  ? 'সুষম খাদ্য গ্রহণ, পর্যাপ্ত ঘুম এবং নিয়মিত শারীরিক ব্যায়াম করুন।'
                  : 'Balanced diet, adequate hydration, sufficient sleep, and regular exercise.'}
              </Text>
            )}
          </View>

          {/* Section 5: Associated Pharmacological Classes & Medications */}
          {organData.medications_bn ? (
            <View style={[styles.sectionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
              <View style={styles.sectionHeaderRow}>
                <View style={[styles.sectionIconWrap, { backgroundColor: t.accentBg, borderColor: t.cardBorder }]}>
                  <HealthIcon name="medicines" size={15} color={t.text} />
                </View>
                <Text style={[styles.sectionHeading, { color: t.text, fontSize: t.fs(14) }]}>
                  {isBn ? 'সম্পর্কিত ওষুধ ও ফার্মাকোলজি (Related Medications)' : 'Associated Pharmacological Classes'}
                </Text>
              </View>

              <Text style={[styles.sectionBody, { color: t.text, fontSize: t.fs(13), marginBottom: 10 }]}>
                {organData.medications_bn}
              </Text>

              {medicationTokens.length > 0 ? (
                <View style={styles.medChipsWrap}>
                  {medicationTokens.map((tok, tokIdx) => (
                    <View
                      key={tokIdx}
                      style={[
                        styles.medTag,
                        {
                          backgroundColor: t.surfaceSecondary,
                          borderColor: t.cardBorder,
                        },
                      ]}
                    >
                      <HealthIcon
                        name="pills"
                        size={11}
                        color={t.text}
                        style={{ marginRight: 4 }}
                      />
                      <Text style={[styles.medTagText, { color: t.text, fontSize: t.fs(11) }]}>
                        {tok}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : null}
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
    fontFamily: 'HindSiliguri-Bold',
    fontWeight: '700',
    letterSpacing: -0.2,
    flex: 1,
  },
  sectionBody: {
    lineHeight: 20,
  },
  subSectionWrap: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(128, 128, 128, 0.2)',
  },
  subSectionHeading: {
    fontWeight: '700',
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
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
    lineHeight: 18,
  },
  factCalloutBox: {
    borderWidth: 1,
    borderLeftWidth: 3,
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
  },
  factTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  factTitleText: {
    fontWeight: '700',
  },
  factContentText: {
    lineHeight: 18,
  },
  itemsListWrap: {
    gap: 8,
    marginTop: 4,
  },
  listItemCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  listItemText: {
    flex: 1,
    lineHeight: 18,
  },
  medChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  medTag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  medTagText: {
    fontWeight: '600',
  },
});

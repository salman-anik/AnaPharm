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
import HealthIcon, { getMedicineCategoryIcon } from '../components/HealthIcon';

export default function MedicineDetailModal({
  visible,
  medicine,
  onClose,
  themeObj: t,
  initialLanguage = 'bn',
}) {
  const [lang, setLang] = useState(initialLanguage);
  const insets = useSafeAreaInsets();

  if (!medicine) return null;

  const isBn = lang === 'bn';
  const company = medicine._company;

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
              },
            ]}
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <Text style={[styles.backButtonText, { color: t.text }]}>← Back</Text>
          </TouchableOpacity>

          {/* Title in Center Top in English */}
          <View style={styles.navTitleWrap}>
            <Text
              style={[styles.navTitle, { color: t.text, fontSize: t.fs(16) }]}
              numberOfLines={1}
            >
              {medicine.name_en}
            </Text>
            <Text
              style={[styles.navSubtitle, { color: t.textMuted, fontSize: t.fs(11) }]}
              numberOfLines={1}
            >
              {medicine.generic}
            </Text>
          </View>

          {/* Language Toggle Pill */}
          <View style={[styles.langPillContainer, { backgroundColor: t.surfaceSecondary, borderColor: t.border }]}>
            <TouchableOpacity
              style={[
                styles.langPill,
                isBn && { backgroundColor: t.isDark ? '#ffffff' : '#000000' },
              ]}
              onPress={() => setLang('bn')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.langPillText,
                  { color: isBn ? (t.isDark ? '#000000' : '#ffffff') : t.textMuted },
                ]}
              >
                বাং
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.langPill,
                !isBn && { backgroundColor: t.isDark ? '#ffffff' : '#000000' },
              ]}
              onPress={() => setLang('en')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.langPillText,
                  { color: !isBn ? (t.isDark ? '#000000' : '#ffffff') : t.textMuted },
                ]}
              >
                EN
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Scrollable Clinical Sheet */}
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom > 0 ? insets.bottom + 36 : 40 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Medicine Banner */}
          <View
            style={[
              styles.heroCard,
              {
                backgroundColor: t.card,
                borderColor: t.cardBorder,
              },
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                  source={getMedicineCategoryIcon(medicine.category)}
                  size={28}
                  color={t.text}
                />
              </View>

              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={[styles.heroNameEn, { color: t.text, fontSize: t.fs(20) }]}>
                  {medicine.name_en}
                </Text>
                <Text style={[styles.heroGeneric, { color: t.textMuted, fontSize: t.fs(13) }]}>
                  {medicine.generic}
                </Text>
              </View>
            </View>

            {/* Badges row */}
            <View style={styles.badgeRow}>
              {/* Category */}
              <View style={[styles.metaBadge, { backgroundColor: t.surfaceSecondary, borderColor: t.border }]}>
                <HealthIcon
                  source={getMedicineCategoryIcon(medicine.category)}
                  size={12}
                  color={t.text}
                  style={{ marginRight: 5 }}
                />
                <Text style={[styles.metaBadgeText, { color: t.text, fontSize: t.fs(11) }]}>
                  {isBn ? medicine.category_bn : medicine.category_en}
                </Text>
              </View>

              {/* Target Organ */}
              {medicine.target_organ ? (
                <View style={[styles.metaBadge, { backgroundColor: t.surfaceSecondary, borderColor: t.border }]}>
                  <HealthIcon
                    name="anatomy"
                    size={12}
                    color={t.text}
                    style={{ marginRight: 5 }}
                  />
                  <Text style={[styles.metaBadgeText, { color: t.text, fontSize: t.fs(11) }]}>
                    {medicine.target_organ}
                  </Text>
                </View>
              ) : null}

              {/* Manufacturer */}
              {company ? (
                <View style={[styles.metaBadge, { backgroundColor: t.accentBg, borderColor: t.cardBorder }]}>
                  <HealthIcon
                    name="pharmacy"
                    size={12}
                    color={t.text}
                    style={{ marginRight: 5 }}
                  />
                  <Text style={[styles.metaBadgeText, { color: t.text, fontSize: t.fs(11) }]}>
                    {company.short_name || company.name_en}
                  </Text>
                </View>
              ) : null}

              {/* Pregnancy Category Badge */}
              {medicine.pregnancy_category ? (
                <View style={[styles.metaBadge, { backgroundColor: t.surfaceSecondary, borderColor: t.border }]}>
                  <HealthIcon
                    name="femaleReproductive"
                    size={12}
                    color={t.text}
                    style={{ marginRight: 5 }}
                  />
                  <Text style={[styles.metaBadgeText, { color: t.text, fontSize: t.fs(11) }]}>
                    FDA: Cat {medicine.pregnancy_category}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          {/* Section 1: Indications & Clinical Action */}
          <View style={[styles.sectionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
            <View style={styles.sectionHeaderRow}>
              <HealthIcon name="medicines" size={16} color={t.text} style={{ marginRight: 8 }} />
              <Text style={[styles.sectionHeading, { color: t.text, fontSize: t.fs(14) }]}>
                {isBn ? 'নির্দেশিত রোগ ও মূল কাজ (Indications & Action)' : 'Indications & Therapeutic Action'}
              </Text>
            </View>
            <Text style={[styles.sectionBody, { color: t.text, fontSize: t.fs(13) }]}>
              {isBn ? medicine.work_bn : medicine.work_en || medicine.primary_indication_en}
            </Text>
            {medicine.indications_en && !isBn ? (
              <Text style={[styles.sectionBodySecondary, { color: t.textMuted, fontSize: t.fs(12) }]}>
                {medicine.indications_en}
              </Text>
            ) : null}
          </View>

          {/* Section 2: Mechanism of Action (How it works) */}
          <View style={[styles.sectionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
            <View style={styles.sectionHeaderRow}>
              <HealthIcon name="microscope" size={16} color={t.text} style={{ marginRight: 8 }} />
              <Text style={[styles.sectionHeading, { color: t.text, fontSize: t.fs(14) }]}>
                {isBn ? 'যেভাবে কাজ করে (Mechanism of Action)' : 'Mechanism of Action'}
              </Text>
            </View>
            <Text style={[styles.sectionBody, { color: t.text, fontSize: t.fs(13) }]}>
              {isBn ? medicine.how_it_works_bn : medicine.how_it_works_en}
            </Text>
          </View>

          {/* Section 3: Dosage & Administration */}
          <View style={[styles.sectionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
            <View style={styles.sectionHeaderRow}>
              <HealthIcon name="pills" size={16} color={t.text} style={{ marginRight: 8 }} />
              <Text style={[styles.sectionHeading, { color: t.text, fontSize: t.fs(14) }]}>
                {isBn ? 'সেবনবিধি ও মাত্রা (Dosage Guidance)' : 'Dosage & Administration'}
              </Text>
            </View>
            <Text style={[styles.sectionBody, { color: t.text, fontSize: t.fs(13) }]}>
              {isBn ? medicine.dosage_bn : medicine.dosage_en}
            </Text>
          </View>

          {/* Section 4: Potential Side Effects */}
          <View style={[styles.sectionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
            <View style={styles.sectionHeaderRow}>
              <HealthIcon name="alert" size={16} color={t.text} style={{ marginRight: 8 }} />
              <Text style={[styles.sectionHeading, { color: t.text, fontSize: t.fs(14) }]}>
                {isBn ? 'সম্ভাব্য পার্শ্বপ্রতিক্রিয়া (Side Effects)' : 'Side Effects & Adverse Reactions'}
              </Text>
            </View>
            <Text style={[styles.sectionBody, { color: t.text, fontSize: t.fs(13) }]}>
              {isBn ? medicine.side_effects_bn : medicine.side_effects_en}
            </Text>
          </View>

          {/* Section 5: Precautions & Warnings */}
          <View style={[styles.sectionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
            <View style={styles.sectionHeaderRow}>
              <HealthIcon name="alert" size={16} color={t.text} style={{ marginRight: 8 }} />
              <Text style={[styles.sectionHeading, { color: t.text, fontSize: t.fs(14) }]}>
                {isBn ? 'সতর্কতা ও নিষেধাজ্ঞা (Precautions & Warnings)' : 'Precautions & Contraindications'}
              </Text>
            </View>
            <Text style={[styles.sectionBody, { color: t.text, fontSize: t.fs(13) }]}>
              {isBn ? medicine.precautions_bn : medicine.precautions_en}
            </Text>
          </View>

          {/* Section 6: Popular Bangladesh Brands */}
          {medicine.brands ? (
            <View style={[styles.sectionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
              <View style={styles.sectionHeaderRow}>
                <HealthIcon name="pharmacy" size={16} color={t.text} style={{ marginRight: 8 }} />
                <Text style={[styles.sectionHeading, { color: t.text, fontSize: t.fs(14) }]}>
                  {isBn ? 'বাংলাদেশে প্রচলিত ব্র্যান্ডসমূহ (Popular BD Brands)' : 'Popular Bangladesh Brands'}
                </Text>
              </View>
              <View style={styles.brandChipsWrap}>
                {medicine.brands.split(',').map((b, bIdx) => {
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
                      <Text style={[styles.brandTagText, { color: t.text, fontSize: t.fs(12) }]}>
                        {bTrim}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          ) : null}

          {/* Section 7: Manufacturer MedEx Profile */}
          {company ? (
            <View style={[styles.sectionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
              <View style={styles.sectionHeaderRow}>
                <HealthIcon name="pharmacy" size={16} color={t.text} style={{ marginRight: 8 }} />
                <Text style={[styles.sectionHeading, { color: t.text, fontSize: t.fs(14) }]}>
                  {isBn ? 'প্রস্তুতকারক কোম্পানি (Manufacturer)' : 'Manufacturer Details'}
                </Text>
              </View>
              <Text style={[styles.companyNameText, { color: t.text, fontSize: t.fs(15) }]}>
                {company.name_en}
              </Text>
              <Text style={[styles.companySubText, { color: t.textMuted, fontSize: t.fs(12) }]}>
                {company.name_bn}
              </Text>

              <View style={[styles.companyStatsBox, { backgroundColor: t.surfaceSecondary, borderColor: t.border }]}>
                <View style={styles.companyStatCol}>
                  <Text style={[styles.companyStatVal, { color: t.text }]}>
                    {company.brands_count.toLocaleString()}
                  </Text>
                  <Text style={[styles.companyStatLbl, { color: t.textMuted }]}>
                    MedEx Brands
                  </Text>
                </View>
                <View style={[styles.companyStatDivider, { backgroundColor: t.border }]} />
                <View style={styles.companyStatCol}>
                  <Text style={[styles.companyStatVal, { color: t.text }]}>
                    {company.generics_count.toLocaleString()}
                  </Text>
                  <Text style={[styles.companyStatLbl, { color: t.textMuted }]}>
                    MedEx Generics
                  </Text>
                </View>
              </View>
            </View>
          ) : null}

          {/* Section 8: Pregnancy & Lactation Safety */}
          {medicine.pregnancy_bn || medicine.pregnancy_en ? (
            <View style={[styles.sectionCard, { backgroundColor: t.card, borderColor: t.cardBorder }]}>
              <View style={styles.sectionHeaderRow}>
                <HealthIcon name="femaleReproductive" size={16} color={t.text} style={{ marginRight: 8 }} />
                <Text style={[styles.sectionHeading, { color: t.text, fontSize: t.fs(14) }]}>
                  {isBn ? 'গর্ভকালীন ও স্তন্যদানকালে নিরাপত্তা (Pregnancy Safety)' : 'Pregnancy & Lactation Safety'}
                </Text>
              </View>
              <Text style={[styles.sectionBody, { color: t.text, fontSize: t.fs(13) }]}>
                {isBn ? medicine.pregnancy_bn : medicine.pregnancy_en}
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
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  backButtonText: {
    fontSize: 12,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  langPillText: {
    fontSize: 11,
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
  heroIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroNameEn: {
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  heroGeneric: {
    marginTop: 2,
    fontWeight: '500',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 12,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
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
    marginBottom: 8,
  },
  sectionHeading: {
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  sectionBody: {
    lineHeight: 20,
  },
  sectionBodySecondary: {
    marginTop: 8,
    lineHeight: 18,
  },
  brandChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  brandTag: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  brandTagText: {
    fontWeight: '600',
  },
  companyNameText: {
    fontWeight: '700',
  },
  companySubText: {
    marginTop: 2,
  },
  companyStatsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  companyStatCol: {
    alignItems: 'center',
  },
  companyStatVal: {
    fontSize: 15,
    fontWeight: '800',
  },
  companyStatLbl: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  companyStatDivider: {
    width: 1,
    height: 22,
  },
});

import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SYSTEMS } from '../data/anatomyData';
import { getTheme } from '../theme/theme';
import HealthIcon, { getSystemIcon } from './HealthIcon';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function OrganDetailsSheet({
  visible,
  organData,
  onClose,
  theme = 'dark',
  fontSize = 'medium',
}) {
  if (!organData) return null;

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const t = getTheme(theme, fontSize);
  const systemInfo = SYSTEMS[organData.system] || {
    name: 'Human Anatomy',
    icon: '🧬',
  };

  const tabs = [
    { id: 'all', label: 'All Details' },
    { id: 'overview', label: 'Overview' },
    { id: 'diseases', label: 'Diseases' },
    { id: 'treatments', label: 'Treatments' },
    { id: 'fitness', label: 'Fitness' },
    { id: 'meds', label: 'Medications' },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View
          style={[
            styles.sheetContainer,
            {
              backgroundColor: t.surface,
              borderColor: t.glassBorder,
              height: isExpanded ? SCREEN_HEIGHT * 0.94 : SCREEN_HEIGHT * 0.50,
            },
          ]}
        >
          {/* Drag Handle - Clean, No hint text */}
          <TouchableOpacity
            style={styles.handleContainer}
            onPress={() => setIsExpanded(!isExpanded)}
            hitSlop={{ top: 14, bottom: 14, left: 40, right: 40 }}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.dragHandle,
                { backgroundColor: t.isDark ? '#52525b' : '#d4d4d8' },
              ]}
            />
          </TouchableOpacity>

          {/* Sticky Header */}
          <View
            style={[
              styles.header,
              {
                backgroundColor: t.headerBg,
                borderBottomColor: t.glassBorder,
              },
            ]}
          >
            <View style={styles.titleColumn}>
              <View style={styles.titleRow}>
                <Text style={[styles.organTitle, { color: t.text }]}>
                  {organData.name}
                </Text>
              </View>
              <View style={styles.metaRow}>
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: t.chipBg,
                      borderColor: t.cardBorder,
                    },
                  ]}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <HealthIcon
                      source={getSystemIcon(organData.system)}
                      size={14}
                      color={t.text}
                      style={{ marginRight: 6 }}
                    />
                    <Text
                      style={[
                        styles.badgeText,
                        { color: t.text },
                      ]}
                    >
                      {systemInfo.name}
                    </Text>
                  </View>
                </View>
                {organData.latin ? (
                  <Text style={[styles.latinText, { color: t.textMuted }]}>
                    {organData.latin}
                  </Text>
                ) : null}
              </View>
            </View>

            {/* Action Buttons: Expand Toggle & Close */}
            <View style={styles.headerActions}>
              <TouchableOpacity
                onPress={() => setIsExpanded(!isExpanded)}
                style={[
                  styles.expandToggleBtn,
                  {
                    backgroundColor: t.chipBg,
                    borderColor: t.cardBorder,
                  },
                ]}
                hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
                activeOpacity={0.75}
              >
                <Text style={[styles.expandToggleText, { color: t.text }]}>
                  {isExpanded ? 'Half' : 'Full'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onClose}
                style={[
                  styles.closeBtn,
                  {
                    backgroundColor: t.chipBg,
                    borderColor: t.cardBorder,
                  },
                ]}
                hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
                activeOpacity={0.75}
              >
                <Text style={[styles.closeBtnText, { color: t.text }]}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section Filter Chips - High Contrast: Selected font NEVER blends with background! */}
          <View
            style={[
              styles.tabBar,
              {
                backgroundColor: t.surfaceSecondary,
                borderBottomColor: t.border,
              },
            ]}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabScroll}
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <TouchableOpacity
                    key={tab.id}
                    style={[
                      styles.tabChip,
                      {
                        backgroundColor: isActive
                          ? t.isDark
                            ? '#ffffff'
                            : '#000000'
                          : t.chipBg,
                        borderColor: isActive ? t.text : t.chipBorder,
                      },
                    ]}
                    onPress={() => setActiveTab(tab.id)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.tabChipText,
                        {
                          color: isActive
                            ? t.isDark
                              ? '#000000'
                              : '#ffffff'
                            : t.text,
                          fontWeight: isActive ? '800' : '600',
                        },
                      ]}
                    >
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Scrollable Content Body */}
          <ScrollView
            style={styles.scrollBody}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
          >
            {/* Overview / Clinical Summary */}
            {activeTab === 'all' || activeTab === 'overview' ? (
              <View
                style={[
                  styles.sectionCard,
                  {
                    backgroundColor: t.card,
                    borderColor: t.cardBorder,
                  },
                ]}
              >
                <Text style={[styles.sectionHeading, { color: t.text }]}>
                  Overview
                </Text>
                {organData.desc_bn ? (
                  <Text style={[styles.descText, { color: t.text }]}>
                    {organData.desc_bn}
                  </Text>
                ) : null}
                {organData.desc_en ? (
                  <Text style={[styles.descEnText, { color: t.textMuted }]}>
                    {organData.desc_en}
                  </Text>
                ) : null}

                {/* Function Points */}
                {organData.funcs_bn && organData.funcs_bn.length > 0 ? (
                  <View style={styles.bulletList}>
                    <Text style={[styles.subHeading, { color: t.text }]}>
                      Functions:
                    </Text>
                    {organData.funcs_bn.map((fn, idx) => (
                      <View key={idx} style={styles.bulletItem}>
                        <Text style={[styles.bulletDot, { color: t.text }]}>
                          •
                        </Text>
                        <Text style={[styles.bulletText, { color: t.text }]}>
                          {fn}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : null}

                {/* Clinical Fact */}
                {organData.fact_bn ? (
                  <View
                    style={[
                      styles.factBox,
                      {
                        backgroundColor: t.surfaceSecondary,
                        borderLeftColor: t.text,
                      },
                    ]}
                  >
                    <Text style={[styles.factTitle, { color: t.text }]}>
                      Clinical Fact:
                    </Text>
                    <Text style={[styles.factText, { color: t.text }]}>
                      {organData.fact_bn}
                    </Text>
                  </View>
                ) : null}
              </View>
            ) : null}

            {/* Diseases & Pathologies */}
            {activeTab === 'all' || activeTab === 'diseases' ? (
              <View
                style={[
                  styles.sectionCard,
                  {
                    backgroundColor: t.card,
                    borderColor: t.cardBorder,
                  },
                ]}
              >
                <Text style={[styles.sectionHeading, { color: t.text }]}>
                  Pathologies & Disorders
                </Text>
                {organData.diseases_bn && organData.diseases_bn.length > 0 ? (
                  organData.diseases_bn.map((dis, idx) => (
                    <View key={idx} style={styles.diseaseItem}>
                      <Text style={[styles.diseaseDot, { color: t.text }]}>▪</Text>
                      <Text style={[styles.diseaseText, { color: t.text }]}>
                        {dis}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={[styles.descText, { color: t.textMuted }]}>
                    {organData.patho_bn || organData.patho_en}
                  </Text>
                )}
              </View>
            ) : null}

            {/* Solutions & Treatments */}
            {activeTab === 'all' || activeTab === 'treatments' ? (
              <View
                style={[
                  styles.sectionCard,
                  {
                    backgroundColor: t.card,
                    borderColor: t.cardBorder,
                  },
                ]}
              >
                <Text style={[styles.sectionHeading, { color: t.text }]}>
                  Treatments & Tests
                </Text>
                {organData.solutions_bn && organData.solutions_bn.length > 0 ? (
                  organData.solutions_bn.map((sol, idx) => (
                    <View key={idx} style={styles.solutionItem}>
                      <Text style={[styles.solutionDot, { color: t.text }]}>✔</Text>
                      <Text style={[styles.solutionText, { color: t.text }]}>
                        {sol}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={[styles.descText, { color: t.textMuted }]}>
                    নিয়মিত স্বাস্থ্য পরীক্ষা ও বিশেষজ্ঞ চিকিৎসকের পরামর্শ গ্রহণ করুন।
                  </Text>
                )}
              </View>
            ) : null}

            {/* Lifestyle & Fitness Tips */}
            {activeTab === 'all' || activeTab === 'fitness' ? (
              <View
                style={[
                  styles.sectionCard,
                  {
                    backgroundColor: t.card,
                    borderColor: t.cardBorder,
                  },
                ]}
              >
                <Text style={[styles.sectionHeading, { color: t.text }]}>
                  Care & Health Guidance
                </Text>
                {organData.fitness_tips_bn &&
                organData.fitness_tips_bn.length > 0 ? (
                  organData.fitness_tips_bn.map((tip, idx) => (
                    <View key={idx} style={styles.fitnessItem}>
                      <Text style={[styles.fitnessDot, { color: t.text }]}>☘</Text>
                      <Text style={[styles.fitnessText, { color: t.text }]}>
                        {tip}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={[styles.descText, { color: t.textMuted }]}>
                    সুষম খাদ্য গ্রহণ, পর্যাপ্ত ঘুম এবং নিয়মিত শারীরিক ব্যায়াম করুন।
                  </Text>
                )}
              </View>
            ) : null}

            {/* Related Medications */}
            {activeTab === 'all' || activeTab === 'meds' ? (
              <View
                style={[
                  styles.sectionCard,
                  {
                    backgroundColor: t.card,
                    borderColor: t.cardBorder,
                  },
                ]}
              >
                <Text style={[styles.sectionHeading, { color: t.text }]}>
                  Medications
                </Text>
                <Text style={[styles.medsText, { color: t.text }]}>
                  {organData.medications_bn ||
                    'প্রয়োজনে রেজিস্টার্ড চিকিৎসকের প্রেসক্রিপশন অনুযায়ী নির্দিষ্ট মাত্রায় সেবন করুন।'}
                </Text>
              </View>
            ) : null}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  backdrop: {
    flex: 1,
  },
  sheetContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1.5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  dragHandle: {
    width: 44,
    height: 5,
    borderRadius: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  titleColumn: {
    flex: 1,
    marginRight: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  organTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  latinText: {
    fontStyle: 'italic',
    fontSize: 11,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expandToggleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandToggleText: {
    fontSize: 11,
    fontWeight: '700',
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 13,
    fontWeight: '800',
  },
  tabBar: {
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  tabScroll: {
    paddingHorizontal: 14,
    gap: 8,
  },
  tabChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: 1,
  },
  tabChipText: {
    fontSize: 12,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  sectionCard: {
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    elevation: 2,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
  },
  descText: {
    fontSize: 13,
    lineHeight: 20,
  },
  descEnText: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  bulletList: {
    marginTop: 10,
    gap: 6,
  },
  subHeading: {
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 2,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  bulletDot: {
    fontSize: 14,
    lineHeight: 18,
  },
  bulletText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  factBox: {
    marginTop: 12,
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 3,
  },
  factTitle: {
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 2,
  },
  factText: {
    fontSize: 12,
    lineHeight: 17,
  },
  diseaseItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  diseaseDot: {
    fontSize: 12,
    marginTop: 2,
  },
  diseaseText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  solutionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  solutionDot: {
    fontSize: 12,
    marginTop: 2,
  },
  solutionText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  fitnessItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  fitnessDot: {
    fontSize: 12,
    marginTop: 2,
  },
  fitnessText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  medsText: {
    fontSize: 12,
    lineHeight: 19,
  },
});

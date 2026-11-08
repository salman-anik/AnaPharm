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

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function OrganDetailsSheet({ visible, organData, onClose, theme = 'dark' }) {
  if (!organData) return null;

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const t = getTheme(theme);
  const isLight = !t.isDark;
  const systemInfo = SYSTEMS[organData.system] || { name: 'Human Anatomy', icon: '🧬', color: '#38bdf8' };

  const tabs = [
    { id: 'all', label: 'All Details' },
    { id: 'overview', label: '📋 Overview' },
    { id: 'diseases', label: '⚠️ Diseases' },
    { id: 'treatments', label: '🩺 Treatments' },
    { id: 'fitness', label: '🌿 Fitness' },
    { id: 'meds', label: '💊 Medications' },
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
            { backgroundColor: t.surface, borderColor: t.cardBorder },
            { height: isExpanded ? SCREEN_HEIGHT * 0.93 : SCREEN_HEIGHT * 0.48 },
          ]}
        >
          {/* Interactive Drag / Tap Handle */}
          <TouchableOpacity
            style={styles.handleContainer}
            onPress={() => setIsExpanded(!isExpanded)}
            hitSlop={{ top: 12, bottom: 12, left: 30, right: 30 }}
            activeOpacity={0.7}
          >
            <View style={[styles.dragHandle, isLight && styles.dragHandleLight]} />
            <View style={[styles.handleBadge, isLight && styles.handleBadgeLight]}>
              <Text style={[styles.handleHint, isLight && styles.handleHintLight]}>
                {isExpanded ? '▼ Minimize to Half Screen' : '▲ Tap to Expand Full Screen'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Sticky Header */}
          <View style={[styles.header, isLight && styles.headerLight]}>
            <View style={styles.titleColumn}>
              <View style={styles.titleRow}>
                <Text style={[styles.organTitle, isLight && styles.organTitleLight]}>
                  {organData.name}
                </Text>
                {organData.name_bn ? (
                  <Text style={styles.organTitleBn}>({organData.name_bn})</Text>
                ) : null}
              </View>
              <View style={styles.metaRow}>
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: systemInfo.color + '25',
                      borderColor: systemInfo.color,
                    },
                  ]}
                >
                  <Text style={[styles.badgeText, { color: systemInfo.color }]}>
                    {systemInfo.icon} {systemInfo.name}
                  </Text>
                </View>
                {organData.latin ? (
                  <Text style={[styles.latinText, isLight && styles.latinTextLight]}>
                    {organData.latin}
                  </Text>
                ) : null}
              </View>
            </View>

            {/* Action Buttons: Expand Toggle & Close with accessible large touch targets */}
            <View style={styles.headerActions}>
              <TouchableOpacity
                onPress={() => setIsExpanded(!isExpanded)}
                style={[styles.expandToggleBtn, isLight && styles.expandToggleBtnLight]}
                hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
                activeOpacity={0.7}
              >
                <Text style={styles.expandToggleText}>
                  {isExpanded ? '⤡ Half View' : '⤢ Full View'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onClose}
                style={[styles.closeBtn, isLight && styles.closeBtnLight]}
                hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
                activeOpacity={0.7}
              >
                <Text style={[styles.closeBtnText, isLight && styles.closeBtnTextLight]}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section Filter Chips */}
          <View style={[styles.tabBar, isLight && styles.tabBarLight]}>
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
                      isLight && styles.tabChipLight,
                      isActive && styles.tabChipActive,
                    ]}
                    onPress={() => setActiveTab(tab.id)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.tabChipText,
                        isLight && styles.tabChipTextLight,
                        isActive && styles.tabChipTextActive,
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
              <View style={[styles.sectionCard, isLight && styles.sectionCardLight]}>
                <Text style={[styles.sectionHeading, isLight && styles.sectionHeadingLight]}>
                  📋 Overview & Functions (বিবরণ ও ভূমিকা)
                </Text>
                {organData.desc_bn ? (
                  <Text style={[styles.descText, isLight && styles.descTextLight]}>
                    {organData.desc_bn}
                  </Text>
                ) : null}
                {organData.desc_en ? (
                  <Text style={[styles.descEnText, isLight && styles.descEnTextLight]}>
                    {organData.desc_en}
                  </Text>
                ) : null}

                {/* Function Points */}
                {organData.funcs_bn && organData.funcs_bn.length > 0 ? (
                  <View style={styles.bulletList}>
                    <Text style={styles.subHeading}>প্রধান কাজসমূহ (Key Functions):</Text>
                    {organData.funcs_bn.map((fn, idx) => (
                      <View key={idx} style={styles.bulletItem}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={[styles.bulletText, isLight && styles.bulletTextLight]}>
                          {fn}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : null}

                {/* Did You Know Fact */}
                {organData.fact_bn ? (
                  <View style={[styles.factBox, isLight && styles.factBoxLight]}>
                    <Text style={styles.factTitle}>💡 আপনি কি জানেন? (Clinical Fact):</Text>
                    <Text style={[styles.factText, isLight && styles.factTextLight]}>
                      {organData.fact_bn}
                    </Text>
                  </View>
                ) : null}
              </View>
            ) : null}

            {/* Diseases & Pathologies */}
            {activeTab === 'all' || activeTab === 'diseases' ? (
              <View style={[styles.sectionCard, isLight && styles.sectionCardLight]}>
                <Text style={[styles.sectionHeading, { color: '#f59e0b' }]}>
                  ⚠️ Pathologies & Disorders (রোগ ও সমস্যা)
                </Text>
                {organData.diseases_bn && organData.diseases_bn.length > 0 ? (
                  organData.diseases_bn.map((dis, idx) => (
                    <View key={idx} style={styles.diseaseItem}>
                      <Text style={styles.diseaseDot}>▪</Text>
                      <Text style={[styles.diseaseText, isLight && styles.diseaseTextLight]}>
                        {dis}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={[styles.descText, isLight && styles.descTextLight]}>
                    {organData.patho_bn || organData.patho_en}
                  </Text>
                )}
              </View>
            ) : null}

            {/* Solutions & Treatments */}
            {activeTab === 'all' || activeTab === 'treatments' ? (
              <View style={[styles.sectionCard, isLight && styles.sectionCardLight]}>
                <Text style={[styles.sectionHeading, { color: '#06b6d4' }]}>
                  🩺 Clinical Solutions & Tests (চিকিৎসা ও পরীক্ষা)
                </Text>
                {organData.solutions_bn && organData.solutions_bn.length > 0 ? (
                  organData.solutions_bn.map((sol, idx) => (
                    <View key={idx} style={styles.solutionItem}>
                      <Text style={styles.solutionDot}>✔</Text>
                      <Text style={[styles.solutionText, isLight && styles.solutionTextLight]}>
                        {sol}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={[styles.descText, isLight && styles.descTextLight]}>
                    নিয়মিত স্বাস্থ্য পরীক্ষা ও বিশেষজ্ঞ চিকিৎসকের পরামর্শ গ্রহণ করুন।
                  </Text>
                )}
              </View>
            ) : null}

            {/* Lifestyle & Fitness Tips */}
            {activeTab === 'all' || activeTab === 'fitness' ? (
              <View style={[styles.sectionCard, isLight && styles.sectionCardLight]}>
                <Text style={[styles.sectionHeading, { color: '#10b981' }]}>
                  🌿 Lifestyle & Fitness Advice (সুস্থ থাকার নির্দেশিকা)
                </Text>
                {organData.fitness_tips_bn && organData.fitness_tips_bn.length > 0 ? (
                  organData.fitness_tips_bn.map((tip, idx) => (
                    <View key={idx} style={styles.fitnessItem}>
                      <Text style={styles.fitnessDot}>☘</Text>
                      <Text style={[styles.fitnessText, isLight && styles.fitnessTextLight]}>
                        {tip}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={[styles.descText, isLight && styles.descTextLight]}>
                    সুষম খাদ্য গ্রহণ, পর্যাপ্ত ঘুম এবং নিয়মিত শারীরিক ব্যায়াম করুন।
                  </Text>
                )}
              </View>
            ) : null}

            {/* Related Medications */}
            {activeTab === 'all' || activeTab === 'meds' ? (
              <View style={[styles.sectionCard, isLight && styles.sectionCardLight]}>
                <Text style={[styles.sectionHeading, { color: '#ec4899' }]}>
                  💊 Common Medications (সম্পর্কিত ওষুধ নির্দেশিকা)
                </Text>
                <Text style={[styles.medsText, isLight && styles.medsTextLight]}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  backdrop: {
    flex: 1,
  },
  sheetContainer: {
    width: '100%',
    backgroundColor: '#0f172a',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  sheetContainerLight: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    shadowOpacity: 0.15,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 6,
    marginBottom: 4,
  },
  dragHandle: {
    width: 44,
    height: 5,
    backgroundColor: '#475569',
    borderRadius: 3,
    marginBottom: 6,
  },
  dragHandleLight: {
    backgroundColor: '#cbd5e1',
  },
  handleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
  },
  handleBadgeLight: {
    backgroundColor: 'rgba(2, 132, 199, 0.1)',
  },
  handleHint: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '700',
  },
  handleHintLight: {
    color: '#0284c7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  headerLight: {
    borderBottomColor: '#e2e8f0',
  },
  titleColumn: {
    flex: 1,
    paddingRight: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  organTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  organTitleLight: {
    color: '#0f172a',
  },
  organTitleBn: {
    fontSize: 15,
    fontWeight: '600',
    color: '#38bdf8',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
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
    color: '#94a3b8',
    fontSize: 12,
  },
  latinTextLight: {
    color: '#64748b',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  expandToggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#0284c7',
    borderWidth: 1,
    borderColor: '#38bdf8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandToggleBtnLight: {
    backgroundColor: '#0284c7',
    borderColor: '#0284c7',
  },
  expandToggleText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  closeBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnLight: {
    backgroundColor: '#e2e8f0',
  },
  closeBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  closeBtnTextLight: {
    color: '#1e293b',
  },
  tabBar: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
    backgroundColor: '#0b1322',
  },
  tabBarLight: {
    backgroundColor: '#f8fafc',
    borderBottomColor: '#e2e8f0',
  },
  tabScroll: {
    paddingHorizontal: 14,
    gap: 8,
  },
  tabChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#1e293b',
  },
  tabChipLight: {
    backgroundColor: '#e2e8f0',
  },
  tabChipActive: {
    backgroundColor: '#0284c7',
  },
  tabChipText: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '600',
  },
  tabChipTextLight: {
    color: '#64748b',
  },
  tabChipTextActive: {
    color: '#ffffff',
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  sectionCard: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  sectionCardLight: {
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  sectionHeadingLight: {
    color: '#0f172a',
  },
  descText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#e2e8f0',
  },
  descTextLight: {
    color: '#334155',
  },
  descEnText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#94a3b8',
    marginTop: 4,
  },
  descEnTextLight: {
    color: '#64748b',
  },
  bulletList: {
    marginTop: 10,
    gap: 6,
  },
  subHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: '#38bdf8',
    marginBottom: 2,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  bulletDot: {
    color: '#38bdf8',
    fontSize: 14,
    lineHeight: 18,
  },
  bulletText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#cbd5e1',
  },
  bulletTextLight: {
    color: '#334155',
  },
  factBox: {
    marginTop: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderLeftWidth: 3,
    borderLeftColor: '#38bdf8',
  },
  factBoxLight: {
    backgroundColor: 'rgba(2, 132, 199, 0.08)',
    borderLeftColor: '#0284c7',
  },
  factTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#38bdf8',
    marginBottom: 2,
  },
  factText: {
    fontSize: 12,
    lineHeight: 17,
    color: '#e0f2fe',
  },
  factTextLight: {
    color: '#0f172a',
  },
  diseaseItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  diseaseDot: {
    color: '#f59e0b',
    fontSize: 12,
    marginTop: 2,
  },
  diseaseText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#fef3c7',
  },
  diseaseTextLight: {
    color: '#78350f',
  },
  solutionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  solutionDot: {
    color: '#06b6d4',
    fontSize: 12,
    marginTop: 2,
  },
  solutionText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#cffafe',
  },
  solutionTextLight: {
    color: '#164e63',
  },
  fitnessItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  fitnessDot: {
    color: '#10b981',
    fontSize: 12,
    marginTop: 2,
  },
  fitnessText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#d1fae5',
  },
  fitnessTextLight: {
    color: '#064e3b',
  },
  medsText: {
    fontSize: 12,
    lineHeight: 19,
    color: '#fce7f3',
  },
  medsTextLight: {
    color: '#831843',
  },
});

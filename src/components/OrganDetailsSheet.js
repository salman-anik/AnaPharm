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

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function OrganDetailsSheet({ visible, organData, onClose }) {
  if (!organData) return null;

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

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
            { height: isExpanded ? SCREEN_HEIGHT * 0.93 : SCREEN_HEIGHT * 0.48 },
          ]}
        >
          {/* Interactive Drag / Tap Handle */}
          <TouchableOpacity
            style={styles.handleContainer}
            onPress={() => setIsExpanded(!isExpanded)}
            activeOpacity={0.7}
          >
            <View style={styles.dragHandle} />
            <Text style={styles.handleHint}>
              {isExpanded ? '▼ Tap for Half View' : '▲ Tap for Full Screen'}
            </Text>
          </TouchableOpacity>

          {/* Sticky Header */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <View style={styles.titleRow}>
                <Text style={styles.organTitle}>{organData.name}</Text>
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
                  <Text style={styles.latinText}>{organData.latin}</Text>
                ) : null}
              </View>
            </View>

            {/* Action Buttons: Expand Toggle & Close */}
            <View style={styles.headerActions}>
              <TouchableOpacity
                onPress={() => setIsExpanded(!isExpanded)}
                style={styles.expandToggleBtn}
                activeOpacity={0.7}
              >
                <Text style={styles.expandToggleText}>
                  {isExpanded ? '🗗 Half' : '⛶ Full'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onClose}
                style={styles.closeBtn}
                activeOpacity={0.7}
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section Filter Chips */}
          <View style={styles.tabBar}>
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
                    style={[styles.tabChip, isActive && styles.tabChipActive]}
                    onPress={() => setActiveTab(tab.id)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.tabChipText,
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

          {/* Scrollable Details Dossier */}
          <ScrollView
            style={styles.scrollBody}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
          >
            {/* 1. Anatomy & Overview */}
            {(activeTab === 'all' || activeTab === 'overview') && (
              <View style={styles.sectionCard}>
                <Text style={styles.sectionHeading}>📋 Anatomy & Overview</Text>
                <Text style={styles.descText}>
                  {organData.desc_bn || organData.desc_en}
                </Text>
                {organData.desc_en && organData.desc_bn ? (
                  <Text style={styles.descEnText}>{organData.desc_en}</Text>
                ) : null}
              </View>
            )}

            {/* 2. Primary Functions */}
            {(activeTab === 'all' || activeTab === 'overview') && (
              <View style={styles.sectionCard}>
                <Text style={styles.sectionHeading}>🧬 Primary Functions</Text>
                {(organData.funcs_bn || organData.funcs_en || []).map(
                  (func, idx) => (
                    <View key={idx} style={styles.bulletRow}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{func}</Text>
                    </View>
                  )
                )}
              </View>
            )}

            {/* 3. Clinical Fact */}
            {(activeTab === 'all' || activeTab === 'overview') && (
              <View style={styles.factBox}>
                <Text style={styles.factTitle}>💡 Clinical Fact</Text>
                <Text style={styles.factText}>
                  {organData.fact_bn || organData.fact_en}
                </Text>
              </View>
            )}

            {/* 4. Diseases & Conditions */}
            {(activeTab === 'all' || activeTab === 'diseases') && (
              <View style={styles.sectionCard}>
                <Text style={[styles.sectionHeading, { color: '#f87171' }]}>
                  ⚠️ Diseases & Conditions (রোগ ও জটিলতা)
                </Text>
                {(
                  organData.diseases_bn || [
                    organData.patho_bn || organData.patho_en,
                  ]
                ).map((dis, idx) => (
                  <View key={idx} style={styles.bulletRow}>
                    <Text style={[styles.bulletDot, { color: '#ef4444' }]}>
                      ⚠️
                    </Text>
                    <Text style={styles.bulletText}>{dis}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* 5. Solutions & Medical Treatments */}
            {(activeTab === 'all' || activeTab === 'treatments') && (
              <View style={styles.sectionCard}>
                <Text style={[styles.sectionHeading, { color: '#38bdf8' }]}>
                  🩺 Solutions & Medical Treatments (চিকিৎসা ও সমাধান)
                </Text>
                {(
                  organData.solutions_bn || [
                    'নিয়মিত চিকিৎসকের পরামর্শ গ্রহণ এবং সঠিক পরীক্ষা-নিরীক্ষা সম্পন্ন করা।',
                  ]
                ).map((sol, idx) => (
                  <View key={idx} style={styles.bulletRow}>
                    <Text style={[styles.bulletDot, { color: '#38bdf8' }]}>
                      🩺
                    </Text>
                    <Text style={styles.bulletText}>{sol}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* 6. How to Keep Fit & Healthy */}
            {(activeTab === 'all' || activeTab === 'fitness') && (
              <View style={styles.sectionCard}>
                <Text style={[styles.sectionHeading, { color: '#4ade80' }]}>
                  🌿 How to Keep Fit & Healthy (স্বাস্থ্যবিধি ও খাদ্যাভ্যাস)
                </Text>
                {(
                  organData.fitness_tips_bn || [
                    'স্বাস্থ্যকর খাদ্যাভ্যাস ও পরিমিত ব্যায়াম বজায় রাখুন।',
                  ]
                ).map((tip, idx) => (
                  <View key={idx} style={styles.bulletRow}>
                    <Text style={[styles.bulletDot, { color: '#22c55e' }]}>
                      🌿
                    </Text>
                    <Text style={styles.bulletText}>{tip}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* 7. Common Medications & Clinical Care */}
            {(activeTab === 'all' || activeTab === 'meds') && (
              <View style={styles.sectionCard}>
                <Text style={[styles.sectionHeading, { color: '#fbbf24' }]}>
                  💊 Common Medications & Clinical Care (ওষুধ ও পর্যবেক্ষণ)
                </Text>
                <Text style={styles.medsText}>
                  {organData.medications_bn ||
                    'উপসর্গ অনুযায়ী চিকিৎসকের পরামর্শমাফিক ওষুধ গ্রহণ আবশ্যক।'}
                </Text>
                <View style={styles.disclaimerBox}>
                  <Text style={styles.disclaimerText}>
                    ⚠️ Note: Educational clinical overview. Consult a licensed
                    physician for prescription and diagnosis.
                  </Text>
                </View>
              </View>
            )}

            <View style={{ height: 40 }} />
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
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 4,
    marginBottom: 6,
  },
  dragHandle: {
    width: 44,
    height: 5,
    backgroundColor: '#475569',
    borderRadius: 3,
    marginBottom: 4,
  },
  handleHint: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  organTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  organTitleBn: {
    fontSize: 16,
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expandToggleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
  },
  expandToggleText: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '700',
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '700',
  },
  tabBar: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
    backgroundColor: '#0b1322',
  },
  tabScroll: {
    paddingHorizontal: 14,
    gap: 8,
  },
  tabChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: '#1e293b',
  },
  tabChipActive: {
    backgroundColor: '#0284c7',
  },
  tabChipText: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '600',
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
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  descText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#e2e8f0',
  },
  descEnText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#94a3b8',
    marginTop: 8,
    fontStyle: 'italic',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  bulletDot: {
    fontSize: 13,
    color: '#38bdf8',
    lineHeight: 18,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: '#cbd5e1',
  },
  factBox: {
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    borderRadius: 14,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#38bdf8',
  },
  factTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#38bdf8',
    marginBottom: 4,
  },
  factText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#e2e8f0',
  },
  medsText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#fde68a',
  },
  disclaimerBox: {
    marginTop: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(251, 191, 36, 0.08)',
  },
  disclaimerText: {
    fontSize: 10,
    color: '#fbbf24',
    lineHeight: 14,
  },
});

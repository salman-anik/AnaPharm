import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { SYSTEMS } from '../data/anatomyData';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function OrganDetailsSheet({ visible, organData, onClose }) {
  if (!organData) return null;

  const systemInfo = SYSTEMS[organData.system] || { name: 'Human Anatomy', icon: '🧬', color: '#38bdf8' };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
        <View style={styles.sheetContainer}>
          <View style={styles.dragHandle} />

          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <View style={styles.titleRow}>
                <Text style={styles.organTitle}>{organData.name}</Text>
                <View style={[styles.badge, { backgroundColor: systemInfo.color + '25', borderColor: systemInfo.color }]}>
                  <Text style={[styles.badgeText, { color: systemInfo.color }]}>
                    {systemInfo.icon} {systemInfo.name}
                  </Text>
                </View>
              </View>
              {organData.latin ? (
                <Text style={styles.latinText}>{organData.latin}</Text>
              ) : null}
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Scrollable Details Dossier */}
          <ScrollView
            style={styles.scrollBody}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
          >
            {/* 1. Anatomy & Overview (Bangla) */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionHeading}>Anatomy & Overview</Text>
              <Text style={styles.descText}>{organData.desc_bn || organData.desc_en}</Text>
            </View>

            {/* 2. Primary Functions (Bangla) */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionHeading}>Primary Functions</Text>
              {(organData.funcs_bn || organData.funcs_en || []).map((func, idx) => (
                <View key={idx} style={styles.bulletRow}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>{func}</Text>
                </View>
              ))}
            </View>

            {/* 3. Clinical Fact (Bangla) */}
            <View style={styles.factBox}>
              <Text style={styles.factTitle}>💡 Clinical Fact</Text>
              <Text style={styles.factText}>{organData.fact_bn || organData.fact_en}</Text>
            </View>

            {/* 4. Diseases & Conditions (Bangla) */}
            <View style={styles.sectionCard}>
              <Text style={[styles.sectionHeading, { color: '#f87171' }]}>Diseases & Conditions</Text>
              {(organData.diseases_bn || [organData.patho_bn || organData.patho_en]).map((dis, idx) => (
                <View key={idx} style={styles.bulletRow}>
                  <Text style={[styles.bulletDot, { color: '#ef4444' }]}>⚠️</Text>
                  <Text style={styles.bulletText}>{dis}</Text>
                </View>
              ))}
            </View>

            {/* 5. Solutions & Medical Treatments (Bangla) */}
            <View style={styles.sectionCard}>
              <Text style={[styles.sectionHeading, { color: '#38bdf8' }]}>Solutions & Medical Treatments</Text>
              {(organData.solutions_bn || ['নিয়মিত চিকিৎসকের পরামর্শ গ্রহণ এবং সঠিক পরীক্ষা-নিরীক্ষা সম্পন্ন করা।']).map((sol, idx) => (
                <View key={idx} style={styles.bulletRow}>
                  <Text style={[styles.bulletDot, { color: '#38bdf8' }]}>🩺</Text>
                  <Text style={styles.bulletText}>{sol}</Text>
                </View>
              ))}
            </View>

            {/* 6. How to Keep Fit & Healthy (Bangla) */}
            <View style={styles.sectionCard}>
              <Text style={[styles.sectionHeading, { color: '#4ade80' }]}>How to Keep Fit & Healthy</Text>
              {(organData.fitness_tips_bn || ['স্বাস্থ্যকর খাদ্যাভ্যাস ও পরিমিত ব্যায়াম বজায় রাখুন।']).map((tip, idx) => (
                <View key={idx} style={styles.bulletRow}>
                  <Text style={[styles.bulletDot, { color: '#22c55e' }]}>🌿</Text>
                  <Text style={styles.bulletText}>{tip}</Text>
                </View>
              ))}
            </View>

            {/* 7. Common Medications & Clinical Care (Bangla) */}
            <View style={styles.sectionCard}>
              <Text style={[styles.sectionHeading, { color: '#fbbf24' }]}>Common Medications & Clinical Care</Text>
              <Text style={styles.medsText}>
                {organData.medications_bn || 'উপসর্গ অনুযায়ী চিকিৎসকের পরামর্শমাফিক ওষুধ গ্রহণ আবশ্যক।'}
              </Text>
              <View style={styles.disclaimerBox}>
                <Text style={styles.disclaimerText}>
                  ⚠️ Note: Information provided for educational reference. Consult a licensed physician for prescription and diagnosis.
                </Text>
              </View>
            </View>

            <View style={{ height: 30 }} />
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
    maxHeight: SCREEN_HEIGHT * 0.85,
    minHeight: SCREEN_HEIGHT * 0.5,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  dragHandle: {
    width: 44,
    height: 5,
    backgroundColor: '#475569',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  organTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  latinText: {
    fontStyle: 'italic',
    color: '#38bdf8',
    fontSize: 13,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  closeBtnText: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    padding: 18,
    gap: 14,
  },
  sectionCard: {
    backgroundColor: '#1e293b',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: '#94a3b8',
    marginBottom: 8,
  },
  descText: {
    color: '#e2e8f0',
    fontSize: 14,
    lineHeight: 22,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 6,
  },
  bulletDot: {
    color: '#38bdf8',
    fontSize: 14,
    marginRight: 8,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    color: '#cbd5e1',
    fontSize: 13.5,
    lineHeight: 20,
  },
  factBox: {
    backgroundColor: 'rgba(14, 165, 233, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#0ea5e9',
    padding: 12,
    borderRadius: 10,
  },
  factTitle: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  factText: {
    color: '#e2e8f0',
    fontSize: 13.5,
    lineHeight: 20,
  },
  medsText: {
    color: '#cbd5e1',
    fontSize: 13.5,
    lineHeight: 20,
  },
  disclaimerBox: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(245, 158, 11, 0.35)',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  disclaimerText: {
    color: '#fbbf24',
    fontSize: 11.5,
    lineHeight: 16,
  },
});

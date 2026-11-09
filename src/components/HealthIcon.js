import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { HEALTH_ICON_DATA } from './HealthIconData';

// Self-contained inlined Base64 Health Icons (https://healthicons.org/)
// Zero bundler 404s, 100% reliable image loading on all devices
export const HEALTH_ICONS = Object.keys(HEALTH_ICON_DATA).reduce((acc, key) => {
  acc[key] = { uri: HEALTH_ICON_DATA[key] };
  return acc;
}, {});

// Helper mapping from medicine category to HealthIcon
export const getMedicineCategoryIcon = (category) => {
  const c = (category || '').toLowerCase().trim();
  switch (c) {
    case 'cardio':
    case 'cardiovascular':
      return HEALTH_ICONS.heartOrgan;
    case 'digestive':
    case 'gastro':
    case 'gastrointestinal':
      return HEALTH_ICONS.stomach;
    case 'respiratory':
      return HEALTH_ICONS.lungs;
    case 'neuro':
    case 'cns':
      return HEALTH_ICONS.neurology;
    case 'endocrine':
    case 'hormone':
    case 'diabetes':
      return HEALTH_ICONS.thyroid;
    case 'urinary':
    case 'renal':
      return HEALTH_ICONS.kidneys;
    case 'musculoskeletal':
    case 'bone':
      return HEALTH_ICONS.skeleton;
    case 'analgesic':
    case 'pain':
      return HEALTH_ICONS.pills;
    case 'antibiotic':
    case 'anti-infective':
      return HEALTH_ICONS.virus;
    case 'ophthalmic':
    case 'eye':
      return HEALTH_ICONS.eye;
    case 'ent':
    case 'ear':
      return HEALTH_ICONS.ear;
    case 'derma':
    case 'skin':
      return HEALTH_ICONS.skinLayers;
    default:
      return HEALTH_ICONS.pills;
  }
};
export const getSystemIcon = (systemKey) => {
  switch (systemKey) {
    case 'cardiovascular': return HEALTH_ICONS.heartOrgan;
    case 'respiratory': return HEALTH_ICONS.lungs;
    case 'nervous': return HEALTH_ICONS.neurology;
    case 'digestive': return HEALTH_ICONS.stomach;
    case 'urinary': return HEALTH_ICONS.kidneys;
    case 'musculoskeletal': return HEALTH_ICONS.skeleton;
    case 'endocrine': return HEALTH_ICONS.thyroid;
    case 'lymphatic': return HEALTH_ICONS.lymphNodes;
    case 'reproductive': return HEALTH_ICONS.femaleReproductive;
    case 'integumentary': return HEALTH_ICONS.skinLayers;
    default: return HEALTH_ICONS.dna;
  }
};

// Helper mapping from organ key or organ name to HealthIcon
export const getOrganIcon = (organKeyOrName) => {
  const k = (organKeyOrName || '').toLowerCase().trim();
  if (k.includes('heart')) return HEALTH_ICONS.heartOrgan;
  if (k.includes('lung')) return HEALTH_ICONS.lungs;
  if (k.includes('brain') || k.includes('nerv')) return HEALTH_ICONS.neurology;
  if (k.includes('stomach')) return HEALTH_ICONS.stomach;
  if (k.includes('liver')) return HEALTH_ICONS.liver;
  if (k.includes('kidney')) return HEALTH_ICONS.kidneys;
  if (k.includes('bone') || k.includes('skelet') || k.includes('joint')) return HEALTH_ICONS.skeleton;
  if (k.includes('thyroid')) return HEALTH_ICONS.thyroid;
  if (k.includes('pancreas')) return HEALTH_ICONS.pancreas;
  if (k.includes('gallbladder')) return HEALTH_ICONS.gallbladder;
  if (k.includes('spleen')) return HEALTH_ICONS.spleen;
  if (k.includes('intestine') || k.includes('colon') || k.includes('bowel')) return HEALTH_ICONS.intestine;
  if (k.includes('bladder')) return HEALTH_ICONS.bladder;
  if (k.includes('eye')) return HEALTH_ICONS.eye;
  if (k.includes('ear')) return HEALTH_ICONS.ear;
  if (k.includes('spine')) return HEALTH_ICONS.spine;
  if (k.includes('skin')) return HEALTH_ICONS.skinLayers;
  if (k.includes('vessel') || k.includes('artery') || k.includes('vein')) return HEALTH_ICONS.bloodVessel;
  if (k.includes('lymph') || k.includes('immune')) return HEALTH_ICONS.lymphNodes;
  return HEALTH_ICONS.bodyOutline;
};

export default function HealthIcon({
  name,
  source,
  size = 20,
  color = '#ffffff',
  style,
  resizeMode = 'contain',
}) {
  const iconSource = source || (name ? HEALTH_ICONS[name] : null);
  if (!iconSource) return null;

  return (
    <Image
      source={iconSource}
      style={[
        {
          width: size,
          height: size,
          tintColor: color,
        },
        style,
      ]}
      resizeMode={resizeMode}
    />
  );
}

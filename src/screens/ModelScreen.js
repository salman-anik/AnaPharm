import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Model3DView from '../components/Model3DView';
import OrganDetailModal from './OrganDetailModal';
import { ANATOMY_DATA } from '../data/anatomyData';
import { getTheme } from '../theme/theme';
import HealthIcon from '../components/HealthIcon';
import Slider from '@react-native-community/slider';

const ORGAN_LAYERS = [
  { id: 'brain', label: 'Brain' }, { id: 'heart', label: 'Heart' }, { id: 'lungs', label: 'Lungs' },
  { id: 'liver', label: 'Liver' }, { id: 'stomach', label: 'Stomach' }, { id: 'kidneys', label: 'Kidneys' },
  { id: 'smallIntestine', label: 'Small bowel' }, { id: 'largeIntestine', label: 'Large bowel' }, { id: 'trachea', label: 'Trachea' },
];
const ORGAN_MODEL_ID_BY_NAME = {
  Brain: 'brain', Heart: 'heart', Lungs: 'lungs', Liver: 'liver', Stomach: 'stomach',
  Kidneys: 'kidneys', 'Small Intestine': 'smallIntestine', 'Large Intestine': 'largeIntestine', Trachea: 'trachea',
};

const MODEL_LAYER_DETAILS = {
  Brain: ANATOMY_DATA['Brain (Cerebrum & Cortex)'],
  Lungs: ANATOMY_DATA['Lungs (Pulmonary Lobes)'],
  'Large Intestine': ANATOMY_DATA['Large Intestine (Colon)'],
  Trachea: {
    name: 'Trachea', name_bn: 'শ্বাসনালি', system: 'respiratory', region: 'thorax', latin: 'Trachea',
    desc_en: 'The trachea is a flexible air passage connecting the larynx to the main bronchi. C-shaped cartilage rings help keep it open while its lining filters and moves particles upward.',
    desc_bn: 'শ্বাসনালি হলো নমনীয় বায়ুপথ, যা স্বরযন্ত্রকে প্রধান ব্রঙ্কাসের সঙ্গে যুক্ত করে। এর C-আকৃতির তরুণাস্থির বলয় নালিটি খোলা রাখে এবং ভেতরের আবরণ ধূলিকণা আটকে উপরের দিকে সরাতে সাহায্য করে।',
    funcs_en: ['Conducts air between the throat and the bronchi.', 'Mucus and cilia trap and move dust and microbes toward the throat.', 'Cartilage supports the airway while allowing the esophagus behind it to expand during swallowing.'],
    funcs_bn: ['গলা থেকে ব্রঙ্কাসে বাতাস চলাচলের পথ তৈরি করে।', 'শ্লেষ্মা ও সিলিয়া ধূলিকণা এবং জীবাণু আটকে গলার দিকে সরিয়ে দেয়।', 'তরুণাস্থি শ্বাসনালিকে খোলা রাখে; পেছনের খাদ্যনালি গিলবার সময় প্রসারিত হতে পারে।'],
    fact_en: 'The trachea divides into the right and left main bronchi near the upper chest.',
    fact_bn: 'বক্ষের ওপরের দিকে শ্বাসনালি ডান ও বাম প্রধান ব্রঙ্কাসে বিভক্ত হয়।',
    patho_en: 'Inflammation (tracheitis), narrowing, or an inhaled foreign object can obstruct airflow.',
    patho_bn: 'শ্বাসনালির প্রদাহ (ট্রাকিয়াইটিস), সরু হয়ে যাওয়া বা শ্বাসনালিতে বস্তু আটকে গেলে বাতাস চলাচলে বাধা হতে পারে।',
  },
  Skeleton: { name: 'Skeleton', name_bn: 'কঙ্কাল', system: 'skeletal', region: 'all', latin: 'Systema skeletale', desc_en: 'The adult skeleton is commonly described as 206 bones. This 3D atlas separates many bones, cartilage, and joint structures into 267 selectable parts.', desc_bn: 'প্রাপ্তবয়স্ক মানুষের কঙ্কালে সাধারণত ২০৬টি হাড় ধরা হয়। এই 3D অ্যাটলাসে হাড়, তরুণাস্থি ও জয়েন্টের কাঠামো আলাদা করে ২৬৭টি অংশ হিসেবে দেখানো হয়েছে।', funcs_en: ['Supports the body and provides attachment points for muscles.', 'Protects the brain, spinal cord, heart, and lungs.', 'Works with joints and muscles to produce movement.', 'Bone marrow makes blood cells; bone tissue stores calcium and phosphorus.'], funcs_bn: ['শরীরকে support দেয় এবং পেশির সংযুক্তির স্থান তৈরি করে।', 'মস্তিষ্ক, মেরুরজ্জু, হৃদপিণ্ড ও ফুসফুসকে সুরক্ষা দেয়।', 'জয়েন্ট ও পেশির সঙ্গে মিলে চলাচল ঘটায়।', 'অস্থিমজ্জা রক্তকণিকা তৈরি করে; হাড়ে ক্যালসিয়াম ও ফসফরাস সঞ্চিত থাকে।'], fact_en: 'The 206-bone count is a typical adult count; some small bones can fuse as a person grows.', fact_bn: '২০৬টি হাড়ের সংখ্যা প্রাপ্তবয়স্কদের প্রচলিত গণনা; বেড়ে ওঠার সময় কিছু ছোট হাড় একত্র হতে পারে।', diseases_en: ['Fractures', 'Osteoporosis', 'Scoliosis', 'Osteoarthritis'], diseases_bn: ['হাড় ভাঙা', 'অস্টিওপোরোসিস', 'স্কোলিওসিস', 'অস্টিওআর্থ্রাইটিস'], solutions_en: ['Assessment may include examination and imaging such as X-ray or CT.', 'Treatment depends on the condition and may include immobilization, rehabilitation, or specialist care.'], solutions_bn: ['পরীক্ষার সঙ্গে এক্স-রে বা CT-এর মতো ইমেজিং লাগতে পারে।', 'সমস্যা অনুযায়ী immobilization, পুনর্বাসন বা বিশেষজ্ঞের চিকিৎসা প্রয়োজন হতে পারে।'], fitness_tips_en: ['Include weight-bearing activity and strength exercise as appropriate.', 'Support bone health with balanced nutrition, including calcium and vitamin D sources.'], fitness_tips_bn: ['উপযুক্ত হলে weight-bearing activity ও শক্তিবর্ধক ব্যায়াম করুন।', 'ক্যালসিয়াম ও ভিটামিন D-সহ সুষম খাবার হাড়ের স্বাস্থ্যে সহায়ক।'] },
  Muscles: { name: 'Muscles', name_bn: 'পেশি', system: 'muscular', region: 'all', latin: 'Systema musculare', desc_en: 'This layer shows skeletal muscles that attach to bones. The body also has smooth muscle in organs and cardiac muscle in the heart.', desc_bn: 'এই স্তরে হাড়ের সঙ্গে যুক্ত skeletal muscle দেখানো হয়েছে। শরীরের অঙ্গে smooth muscle এবং হৃদপিণ্ডে cardiac muscle-ও থাকে।', funcs_en: ['Creates voluntary movement by pulling on bones through tendons.', 'Helps maintain posture and stabilize joints.', 'Produces heat during activity.', 'The diaphragm and other respiratory muscles help move air.'], funcs_bn: ['টেন্ডনের মাধ্যমে হাড়ে টান দিয়ে ইচ্ছাধীন চলাচল ঘটায়।', 'ভঙ্গি বজায় রাখতে ও জয়েন্ট স্থিতিশীল রাখতে সাহায্য করে।', 'কাজের সময় তাপ তৈরি করে।', 'ডায়াফ্রামসহ শ্বাসের পেশিগুলো বাতাস চলাচলে সাহায্য করে।'], fact_en: 'There are over 600 named skeletal muscles, depending on how muscle groups are counted.', fact_bn: 'পেশিগুলো কীভাবে গণনা করা হয় তার ওপর নির্ভর করে শরীরে ৬০০টিরও বেশি skeletal muscle-এর নাম পাওয়া যায়।', diseases_en: ['Muscle strain or tear', 'Muscle cramps', 'Muscular dystrophy', 'Myasthenia gravis'], diseases_bn: ['পেশিতে টান বা ছিঁড়ে যাওয়া', 'পেশিতে খিঁচুনি', 'মাসকুলার ডিস্ট্রফি', 'মায়াস্থেনিয়া গ্রাভিস'], solutions_en: ['Evaluation may include a physical examination and, when needed, blood tests or imaging.', 'Care varies by cause and may include guided rehabilitation, activity changes, or specialist treatment.'], solutions_bn: ['শারীরিক পরীক্ষার পাশাপাশি প্রয়োজনে রক্ত পরীক্ষা বা ইমেজিং হতে পারে।', 'কারণ অনুযায়ী guided rehabilitation, কাজের ধরন পরিবর্তন বা বিশেষজ্ঞের চিকিৎসা দেওয়া হয়।'], fitness_tips_en: ['Build strength gradually and allow recovery between demanding sessions.', 'Warm up, use controlled technique, and stop if pain is sharp or worsening.'], fitness_tips_bn: ['ধীরে ধীরে শক্তি বাড়ান এবং কঠিন ব্যায়ামের পর বিশ্রাম নিন।', 'ওয়ার্ম-আপ ও সঠিক কৌশল ব্যবহার করুন; তীব্র বা বাড়তে থাকা ব্যথা হলে থামুন।'] },
};

export default function ModelScreen({
  isActive = false,
  keep3DLoaded = false,
  autoRotate,
  setAutoRotate,
  xrayMode,
  setXrayMode,
  theme = 'light',
  fontSize = 'small',
  language = 'bn',
}) {
  const [selectedOrganKey, setSelectedOrganKey] = useState(null);
  const [selectedPartName, setSelectedPartName] = useState(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [focusRegion, setFocusRegion] = useState('all');
  const [resetKey, setResetKey] = useState(0);
  const [layersOpen, setLayersOpen] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [showMuscles, setShowMuscles] = useState(true);
  const [muscleOpacity, setMuscleOpacity] = useState(0.58);
  const [organsVisible, setOrgansVisible] = useState(() => Object.fromEntries(ORGAN_LAYERS.map(({ id }) => [id, true])));

  const t = useMemo(() => getTheme(theme, fontSize), [theme, fontSize]);
  const selectedData = selectedOrganKey ? (() => {
    const base = ANATOMY_DATA[selectedOrganKey] || MODEL_LAYER_DETAILS[selectedOrganKey];
    if (!base || !selectedPartName || selectedPartName === selectedOrganKey) return base;
    const normalized = selectedPartName.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
    const known = Object.keys(ANATOMY_DATA).find((key) => key.toLowerCase() === normalized.toLowerCase() || normalized.toLowerCase().includes(key.toLowerCase()));
    if (known) return ANATOMY_DATA[known];
    const lowerPart = normalized.toLowerCase();
    const muscleAction = lowerPart.includes('biceps') ? ['Often bends the elbow; the long head also helps move the shoulder.', 'কনুই ভাঁজ করতে সাহায্য করে; long head কাঁধের নড়াচড়াতেও অংশ নেয়।']
      : lowerPart.includes('triceps') ? ['Primarily straightens the elbow; its long head also crosses the shoulder.', 'মূলত কনুই সোজা করে; long head কাঁধের জয়েন্টও অতিক্রম করে।']
      : lowerPart.includes('gluteus maximus') ? ['Extends and externally rotates the hip; it is active when rising or climbing.', 'হিপ প্রসারিত ও বাইরে ঘোরায়; দাঁড়ানো বা সিঁড়ি ওঠার সময় সক্রিয় থাকে।']
      : lowerPart.includes('gluteus medius') || lowerPart.includes('gluteus minimus') ? ['Moves the hip outward and helps keep the pelvis level during walking.', 'হিপ বাইরে সরায় এবং হাঁটার সময় পেলভিস সমতল রাখতে সাহায্য করে।']
      : lowerPart.includes('quadriceps') || lowerPart.includes('vastus') || lowerPart.includes('rectus femoris') ? ['The quadriceps group helps straighten the knee; rectus femoris also crosses the hip.', 'কোয়াড্রিসেপস গ্রুপ হাঁটু সোজা করতে সাহায্য করে; rectus femoris হিপও অতিক্রম করে।']
      : lowerPart.includes('hamstring') || lowerPart.includes('biceps femoris') ? ['The hamstring group bends the knee and helps extend the hip.', 'হ্যামস্ট্রিং গ্রুপ হাঁটু ভাঁজ ও হিপ প্রসারণে সাহায্য করে।']
      : lowerPart.includes('deltoid') ? ['Raises the arm at the shoulder; different fibers assist different directions of movement.', 'কাঁধ থেকে বাহু তুলতে সাহায্য করে; বিভিন্ন অংশ ভিন্ন দিকে নড়াচড়ায় কাজ করে।']
      : lowerPart.includes('pectoralis') ? ['Draws the arm toward and across the chest and assists shoulder movement.', 'বাহুকে বুকের দিকে ও বুকের ওপর দিয়ে আনতে এবং কাঁধ নাড়াতে সাহায্য করে।']
      : lowerPart.includes('gastrocnemius') || lowerPart.includes('soleus') ? ['Points the foot downward and contributes to pushing off while walking.', 'পা নিচের দিকে প্রসারিত করে এবং হাঁটার সময় সামনে ঠেলে এগোতে সাহায্য করে।']
      : lowerPart.includes('tibialis anterior') ? ['Lifts the front of the foot and helps control foot placement.', 'পায়ের সামনের অংশ তোলে এবং পা ফেলার নিয়ন্ত্রণে সাহায্য করে।'] : null;
    const partFunctions = muscleAction ? [muscleAction[0], 'Works with neighboring muscles, tendons, and joints to coordinate movement.', 'Tendon attachments transfer its pulling force to bone.'] : base.funcs_en;
    const partFunctionsBn = muscleAction ? [muscleAction[1], 'সমন্বিত চলাচলে পাশের পেশি, টেন্ডন ও জয়েন্টের সঙ্গে কাজ করে।', 'টেন্ডনের সংযোগ পেশির টান হাড়ে পৌঁছে দেয়।'] : base.funcs_bn;
    const bn = base.system === 'muscular' ? 'এই পেশি শরীরের নির্দিষ্ট অংশ নাড়াতে ও স্থিতিশীল রাখতে আশপাশের পেশি, হাড় ও টেন্ডনের সঙ্গে কাজ করে।' : 'এই হাড় বা কাঠামো শরীরকে support দেয় এবং কাছের জয়েন্ট ও অঙ্গকে সুরক্ষায় বা চলাচলে সহায়তা করে।';
    return { ...base, name: normalized, name_bn: normalized, latin: undefined,
      desc_en: base.system === 'muscular' ? `${normalized} is an individual skeletal muscle in the 3D model. Its action depends on its attachments and the joint it crosses; the 3D atlas helps locate it in relation to nearby muscles.` : `${normalized} is an individually selectable skeletal structure in this 3D model. Its shape and connections help support or protect nearby structures.`,
      desc_bn: bn, funcs_en: partFunctions, funcs_bn: partFunctionsBn };
  })() : null;

  const handleSelectOrgan = (organName, partName) => {
    setSelectedOrganKey(organName);
    setSelectedPartName(partName && partName !== organName ? partName : null);
    setSheetVisible(false);
    const layerId = ORGAN_MODEL_ID_BY_NAME[organName];
    if (layerId && organsVisible[layerId] === false) {
      setOrgansVisible((current) => ({ ...current, [layerId]: true }));
    }
    const detail = ANATOMY_DATA[organName] || MODEL_LAYER_DETAILS[organName];
    if (detail?.region && detail.region !== 'all') {
      setFocusRegion(detail.region);
    }
  };

  const toggleOrganLayer = (id) => {
    const nextVisible = !organsVisible[id];
    setOrgansVisible((current) => ({ ...current, [id]: nextVisible }));
    if (!nextVisible) {
      const selectedLayerId = ORGAN_MODEL_ID_BY_NAME[selectedOrganKey];
      if (selectedLayerId === id) setSelectedOrganKey(null);
    }
  };

  const toggleBodySystem = (system) => {
    if (system === 'skeletal') {
      if (showSkeleton && selectedOrganKey === 'Skeleton') { setSelectedOrganKey(null); setSelectedPartName(null); }
      setShowSkeleton((visible) => !visible);
    } else {
      if (showMuscles && selectedOrganKey === 'Muscles') { setSelectedOrganKey(null); setSelectedPartName(null); }
      setShowMuscles((visible) => !visible);
    }
  };

  const handleReset = () => {
    setFocusRegion('all');
    setSelectedOrganKey(null);
    setSelectedPartName(null);
    setSheetVisible(false);
    setAutoRotate && setAutoRotate(false);
    setXrayMode && setXrayMode(false);
    setShowSkeleton(true);
    setShowMuscles(true);
    setMuscleOpacity(0.58);
    setOrgansVisible(Object.fromEntries(ORGAN_LAYERS.map(({ id }) => [id, true])));
    setLayersOpen(false);
    setResetKey((prev) => prev + 1);
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: t.bg }]}
    >
      {/* 3D Viewport Area - Fullscreen immersion */}
      <View style={styles.viewport}>
        <Model3DView
          isActive={isActive && !sheetVisible}
          keepAlive={keep3DLoaded || sheetVisible}
          onSelectOrgan={handleSelectOrgan}
          autoRotate={autoRotate}
          xrayMode={xrayMode}
          focusRegion={focusRegion}
          theme={theme}
          resetKey={resetKey}
          showSkeleton={showSkeleton}
          showMuscles={showMuscles}
          muscleOpacity={muscleOpacity}
          organsVisible={organsVisible}
        />

        <TouchableOpacity
          style={[styles.layersButton, { backgroundColor: t.glassBg, borderColor: t.glassBorder }]}
          onPress={() => setLayersOpen((open) => !open)} activeOpacity={0.8}
        >
          <Text style={[styles.layersButtonText, { color: t.text }]}>{layersOpen ? 'CLOSE LAYERS' : 'BODY SYSTEMS'}</Text>
          <Text style={[styles.layersChevron, { color: t.textMuted }]}>{layersOpen ? '−' : '+'}</Text>
        </TouchableOpacity>

        {layersOpen && <View style={[styles.layersPanel, { backgroundColor: t.isDark ? '#17191a' : '#f8faf8', borderColor: t.glassBorder }]}>
          <ScrollView style={styles.layersScroll} showsVerticalScrollIndicator={false}>
            <View style={styles.layersHeaderRow}>
              <View><Text style={[styles.layerSectionTitle, { color: t.text, marginBottom: 3 }]}>BODY SYSTEMS</Text><Text style={[styles.layerHint, { color: t.textMuted, marginBottom: 0 }]}>Choose the layers to explore</Text></View>
              <TouchableOpacity onPress={() => setLayersOpen(false)} style={[styles.layersClose, { borderColor: t.chipBorder }]}><Text style={{ color: t.text, fontSize: 16 }}>×</Text></TouchableOpacity>
            </View>
            <View style={styles.systemToggleRow}>
              <LayerToggle label="Skeleton · 267 parts" checked={showSkeleton} onPress={() => toggleBodySystem('skeletal')} theme={t} />
              <LayerToggle label="Muscles · full body" checked={showMuscles} onPress={() => toggleBodySystem('muscular')} theme={t} />
            </View>
            <View style={styles.transparencyHeader}>
              <Text style={[styles.layerLabel, { color: t.text }]}>Muscle transparency</Text>
              <Text style={[styles.transparencyValue, { color: t.textMuted }]}>{Math.round((1 - muscleOpacity) * 100)}%</Text>
            </View>
            <Slider
              minimumValue={0.05} maximumValue={0.95} step={0.01} value={1 - muscleOpacity}
              onValueChange={(transparency) => setMuscleOpacity(1 - transparency)} minimumTrackTintColor={t.text}
              maximumTrackTintColor={t.chipBorder} thumbTintColor={t.text}
              disabled={!showMuscles} style={styles.muscleSlider}
            />
            <Text style={[styles.layerHint, { color: t.textMuted }]}>Adjust visibility to reveal deeper anatomy.</Text>

            <Text style={[styles.layerSectionTitle, styles.organsSectionTitle, { color: t.text }]}>ORGANS</Text>
            <View style={styles.organLayerGrid}>
              {ORGAN_LAYERS.map(({ id, label }) => (
                <LayerToggle key={id} label={label} checked={organsVisible[id]} onPress={() => toggleOrganLayer(id)} theme={t} compact />
              ))}
            </View>
          </ScrollView>
        </View>}

        {!!selectedOrganKey && !!selectedData && !layersOpen && <View style={[styles.selectionCard, { backgroundColor: t.glassBg, borderColor: t.glassBorder }]}>
          <View style={styles.selectionCopy}>
            <Text numberOfLines={1} style={[styles.selectionTitle, { color: t.text }]}>{selectedData.name}</Text>
            <Text style={[styles.selectionHint, { color: t.textMuted }]}>Selected in 3D · open details to learn more</Text>
          </View>
          <TouchableOpacity style={styles.detailsButton} onPress={() => setSheetVisible(true)} activeOpacity={0.8}>
            <Text style={styles.detailsButtonText}>Details</Text>
          </TouchableOpacity>
        </View>}

        {/* Floating Viewport Action FABs */}
        <View pointerEvents={layersOpen ? 'none' : 'auto'} style={[styles.fabColumn, layersOpen && { opacity: 0 }]}>
          {/* Auto Rotate 360 */}
          <TouchableOpacity
            style={[
              styles.actionFab,
              {
                backgroundColor: autoRotate ? (t.isDark ? '#3f3f46' : '#d4d4d8') : t.glassBg,
                borderColor: t.glassBorder,
                shadowColor: t.shadowColor,
              },
            ]}
            onPress={() => setAutoRotate && setAutoRotate(!autoRotate)}
            activeOpacity={0.8}
          >
            <HealthIcon name="bodyOutline" size={20} color={t.text} />
            <Text style={[styles.fabLabel, { color: t.text }]}>
              {autoRotate ? 'Orbit On' : 'Orbit'}
            </Text>
          </TouchableOpacity>

          {/* X-Ray Mode */}
          <TouchableOpacity
            style={[
              styles.actionFab,
              {
                backgroundColor: xrayMode ? (t.isDark ? '#3f3f46' : '#d4d4d8') : t.glassBg,
                borderColor: t.glassBorder,
                shadowColor: t.shadowColor,
              },
            ]}
            onPress={() => setXrayMode && setXrayMode(!xrayMode)}
            activeOpacity={0.8}
          >
            <HealthIcon name="xray" size={20} color={t.text} />
            <Text style={[styles.fabLabel, { color: t.text }]}>
              {xrayMode ? 'X-Ray On' : 'X-Ray'}
            </Text>
          </TouchableOpacity>

          {/* Reset Camera */}
          <TouchableOpacity
            style={[
              styles.actionFab,
              {
                backgroundColor: t.glassBg,
                borderColor: t.glassBorder,
                shadowColor: t.shadowColor,
              },
            ]}
            onPress={handleReset}
            activeOpacity={0.8}
          >
            <Text style={[styles.resetGlyph, { color: t.text }]}>↻</Text>
            <Text style={[styles.fabLabel, { color: t.text }]}>Reset all</Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* Dedicated Separate Page for Organ Details */}
      <OrganDetailModal
        visible={sheetVisible}
        organData={selectedData}
        onClose={() => setSheetVisible(false)}
        theme={theme}
        fontSize={fontSize}
        initialLanguage={language}
      />
    </SafeAreaView>
  );
}

function LayerToggle({ label, checked, onPress, theme, compact = false }) {
  return (
    <TouchableOpacity
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={onPress}
      activeOpacity={0.75}
      style={[
        styles.layerToggle,
        compact && styles.layerToggleCompact,
        { borderColor: checked ? theme.text : theme.chipBorder, backgroundColor: checked ? (theme.isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.06)') : 'transparent' },
      ]}
    >
      <View style={[styles.layerCheckbox, { borderColor: checked ? theme.text : theme.textMuted, backgroundColor: checked ? theme.text : 'transparent' }]}>
        {checked && <Text style={[styles.layerCheckmark, { color: theme.bg }]}>✓</Text>}
      </View>
      <Text numberOfLines={1} style={[styles.layerLabel, compact && styles.organLayerLabel, { color: theme.text, fontWeight: checked ? '700' : '500' }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewport: {
    flex: 1,
    position: 'relative',
  },
  layersButton: {
    position: 'absolute', top: 14, left: 14, minHeight: 38, paddingHorizontal: 14,
    borderRadius: 12, borderWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    zIndex: 10, elevation: 8,
  },
  layersButtonText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  layersChevron: { fontSize: 16, fontWeight: '700' },
  layersPanel: {
    position: 'absolute', bottom: 64, left: 12, right: 12, height: '59%', maxHeight: '70%',
    borderWidth: 1, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 12,
    zIndex: 12, elevation: 9,
  },
  layersScroll: { flex: 1 },
  layersHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  layersClose: { width: 30, height: 30, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  systemToggleRow: { gap: 4, marginBottom: 5 },
  layerSectionTitle: { fontSize: 11, fontWeight: '900', letterSpacing: 1.1, marginBottom: 9 },
  layerToggle: {
    minHeight: 40, paddingHorizontal: 11, borderWidth: 1, borderRadius: 13,
    flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 5,
  },
  layerToggleCompact: { width: '48%', minHeight: 38, paddingHorizontal: 9, marginBottom: 0 },
  layerCheckbox: { width: 16, height: 16, borderWidth: 1.5, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  layerCheckmark: { color: '#062334', fontSize: 11, fontWeight: '900', lineHeight: 14 },
  layerLabel: { flex: 1, fontSize: 11, fontWeight: '600' },
  organLayerLabel: { fontSize: 11 },
  transparencyHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 3 },
  transparencyValue: { fontSize: 10, fontWeight: '800' },
  muscleSlider: { width: '100%', height: 38, marginVertical: -2 },
  layerHint: { fontSize: 10, lineHeight: 14, marginBottom: 12 },
  organsSectionTitle: { marginTop: 7 },
  organLayerGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8 },
  selectionCard: {
    position: 'absolute', left: 14, right: 14, bottom: 58, minHeight: 54, borderWidth: 1,
    borderRadius: 14, paddingVertical: 8, paddingHorizontal: 12, flexDirection: 'row',
    alignItems: 'center', gap: 12, zIndex: 8, elevation: 8,
  },
  selectionCopy: { flex: 1 },
  selectionTitle: { fontSize: 12, fontWeight: '800' },
  selectionHint: { fontSize: 9, marginTop: 2 },
  detailsButton: { backgroundColor: '#38bdf8', borderRadius: 10, paddingVertical: 8, paddingHorizontal: 14 },
  detailsButtonText: { color: '#082f49', fontWeight: '900', fontSize: 11 },
  resetGlyph: { fontSize: 29, lineHeight: 33, fontWeight: '500', marginTop: -5 },
  fabColumn: {
    position: 'absolute',
    top: 14,
    right: 14,
    gap: 10,
  },
  actionFab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  fabLabel: {
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
  },
});

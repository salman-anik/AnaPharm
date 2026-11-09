import React, { useState, useMemo, useCallback, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MEDICINE_DATABASE, MEDICINE_CATEGORIES } from '../data/medicineData';
import { getTheme } from '../theme/theme';
import HealthIcon, { HEALTH_ICONS, getSystemIcon, getMedicineCategoryIcon } from '../components/HealthIcon';

export const MEDICINE_COMPANIES = [
  { id: 'all', name_en: 'All Pharma', name_bn: 'সকল ফার্মা', icon: '🏭', patterns: [] },
  {
    id: 'square',
    name_en: 'Square',
    name_bn: 'স্কয়ার',
    icon: '🟦',
    patterns: [
      'square', 'ace', 'seclo', 'ciprocin', 'alatrol', 'filmet', 'camlosart',
      'entacyd', 'tofen', 'virux', 'clofenac', 'xinc', 'flamyd', 'bizoran',
      'calbo', 'lefra', 'd-vit', 'lucent', 'oradexon', 'provair', 'roxex',
      'fixal', 'glicron', 'coralcal', 'trupan', 'anaflex', 'angilock',
      'neotack', 'olmesart', 'pulmocure', 'acerux', 'adalimab', 'advixa',
      'novirax', 'simplovir', 'acitretin', 'soricap', 'soritec', 'mucomist',
      'acemox', 'remox',
    ],
  },
  {
    id: 'beximco',
    name_en: 'Beximco',
    name_bn: 'বেক্সিমকো',
    icon: '🟡',
    patterns: [
      'beximco', 'napa', 'neoceptin', 'bexitrol', 'azmasol', 'tyclav',
      'inflam', 'proceptin', 'de-rash', 'amdocal', 'atova', 'c-vit',
      'diapro', 'e-gel', 'fexo', 'ipratrop', 'lora', 'melix', 'nabilup',
      'olmesan', 'pantonil', 'rosu', 'torax', 'triocim', 'bexicap',
      'bexidal', 'azicap', 'cefaclor', 'clobet', 'depram', 'etolac',
      'fexofen', 'glipita', 'kopen', 'levoking', 'moxacillin', 'nadoxin',
      'neoflox', 'optocef', 'provent', 'ranitid', 'solbion', 'trilept',
      'ultracef', 'volmax',
    ],
  },
  {
    id: 'incepta',
    name_en: 'Incepta',
    name_bn: 'ইনসেপ্টা',
    icon: '🟢',
    patterns: [
      'incepta', 'pantonix', 'osartil', 'monas', 'rivotril', 'cef-3',
      'esoral', 'fixocard', 'bio-emg', 'diabeta', 'furocef', 'gliclazide',
      'hexitol', 'i-comb', 'linaglip', 'maxima', 'nilstat', 'ometac',
      'preva', 'q-pin', 'robit', 'secrin', 'triben', 'unisat', 'v-plex',
      'zimad', 'alacot', 'aniracet', 'apixaban', 'azithro', 'calcin',
      'dexa', 'esita', 'famotak', 'g-amox', 'inbac', 'ketotif', 'lefun',
      'moxiflox', 'neurorub', 'olmesar', 'pantop', 'quetiap', 'rovast',
      'setalo', 'tamsulosin', 'vildaglip', 'zolpid',
    ],
  },
  {
    id: 'renata',
    name_en: 'Renata',
    name_bn: 'রেনাটা',
    icon: '🟣',
    patterns: [
      'renata', 'maxpro', 'rolac', 'alarid', 'cabolin', 'fenofex', 'altrum',
      'ben-a', 'cal-d', 'd-rise', 'e-cap', 'fevastin', 'lamotrig', 'melic',
      'normens', 'orastat', 'progut', 'quickgel', 'renacor', 's-amlo',
      'triocard', 'aceclo', 'bronkolat', 'cabergol', 'densit', 'esoprex',
      'felocord', 'gliben', 'hycort', 'isomax', 'ketorol', 'levomax',
      'mefen', 'nitrocot', 'omastat', 'parafen', 'reno', 'somina',
      'tolfen', 'urispas', 'zincovit',
    ],
  },
  {
    id: 'sk_f',
    name_en: 'SK+F',
    name_bn: 'এসকেএফ',
    icon: '🔴',
    patterns: [
      'sk+f', 'eskayef', 'losan', 'monocast', 'pepticon', 'viodin',
      'tirlac', 'cefotax', 'diclofen', 'efadox', 'flamir', 'gliclaz',
      'intracef', 'ketolac', 'mycoril', 'neuro-b', 'odrel', 'p-cef',
      'sk-cef', 'tivoral', 'agile', 'betameson', 'cardizem', 'defuz',
      'entero', 'flucon', 'gastran', 'hicap', 'irbesten', 'ketofen',
      'locid', 'micon', 'norflox', 'optal', 'pantocid', 'rosutin',
      'sk-z', 'topi', 'urolax', 'verap',
    ],
  },
  {
    id: 'opsonin',
    name_en: 'Opsonin',
    name_bn: 'অপসোনিন',
    icon: '🔵',
    patterns: [
      'opsonin', 'finix', 'opso', 'gastrid', 'cipro-a', 'diclophen',
      'epitol', 'famotack', 'glifix', 'histan', 'imotil', 'ketoral',
      'metron', 'noflam', 'paracetamol opso', 'quinol', 'ronid', 'sedil',
      'triam', 'ascor', 'beklo', 'cefix', 'dexameson', 'ebast', 'flunat',
      'gemcit', 'hyos', 'ipra', 'k-cit', 'leflo', 'myorel', 'norin',
      'optacort', 'polymyx', 'ranit', 'spasmo', 'tolnaft', 'veron',
      'zinet',
    ],
  },
  {
    id: 'aristopharma',
    name_en: 'Aristopharma',
    name_bn: 'অ্যারিস্টোফার্মা',
    icon: '🟠',
    patterns: [
      'aristo', 'aristopharma', 'arixon', 'rovator', 'afun', 'aristovit',
      'cartilage', 'dofic', 'ermox', 'furoside', 'melafex', 'ocid',
      'pantaloc', 'q-ten', 'rozith', 'trizol', 'ultrafen', 'almex',
      'becovon', 'cefox', 'deslor', 'esomep', 'flur', 'gabitril',
      'hifen', 'isordil', 'koflet', 'lorace', 'mucospel', 'norxacin',
      'optipen', 'prelica', 'relac', 'supramox', 'telmi', 'vasocor',
      'zenith',
    ],
  },
  {
    id: 'aci',
    name_en: 'ACI',
    name_bn: 'এসিআই',
    icon: '🌿',
    patterns: [
      'aci', 'anadol', 'cerox-a', 'fluclox', 'aci-plus', 'bioderm',
      'c-plus', 'deflux', 'emistat', 'fixolin', 'g-met', 'i-drop',
      'k-plex', 'lipicon', 'moxac', 'naprosyn', 'oticon', 'provit',
      'respolin', 'synalin', 'tyflox', 'algin', 'b-50', 'cloxa',
      'dextro', 'epirub', 'furo', 'gastinol', 'hepa', 'irocap',
      'ketor', 'lucan', 'mycofin', 'nise', 'oraderm', 'pepsil',
      'risper', 'sedno', 'tramadol aci', 'vasartan', 'zovir',
    ],
  },
  {
    id: 'acme',
    name_en: 'Acme',
    name_bn: 'একমি',
    icon: '🔷',
    patterns: [
      'acme', 'paracip', 'tenor', 'acme-cef', 'claricin', 'diclomax',
      'e-plex', 'fast', 'g-pred', 'h-cort', 'i-clav', 'kalium',
      'lorin', 'micoson', 'nervo', 'omez', 'prednisolone acme', 'rano',
      'salbutamol acme', 'azithromycin acme', 'b-vit', 'ceftriaxone acme',
      'd-cal', 'efen', 'folison', 'g-flox', 'histacin', 'inpec',
      'k-lyte', 'lovat', 'metroderm', 'neo-hydro', 'odipine', 'pantoz',
      'renil', 'sol-b', 'tetracycline acme', 'urox',
    ],
  },
  {
    id: 'healthcare',
    name_en: 'Healthcare',
    name_bn: 'হেলথকেয়ার',
    icon: '🏥',
    patterns: [
      'healthcare', 'hpl', 'sergel', 'h-b12', 'c-plex', 'dulox',
      'esomeprazole hpl', 'feroglobin', 'g-care', 'h-cal', 'i-soft',
      'linatop', 'mirak', 'neurocare', 'o-cal', 'rosuva', 'telmi',
      'z-zinc', 'actil', 'b-complex hpl', 'cefutox', 'diacare',
      'ezetim', 'fexotab', 'glim', 'h-cipro', 'ivor', 'ketoderm',
      'livocare', 'montair', 'normolax', 'osteocal', 'pepcid',
      'quiclox', 'rostab', 'secnid', 'tropic', 'uromid', 'vildap',
    ],
  },
  {
    id: 'popular',
    name_en: 'Popular',
    name_bn: 'পপুলার',
    icon: '⭐',
    patterns: [
      'popular', 'poplor', 'pop-cef', 'acifix', 'biocef', 'ceftron',
      'denvar', 'epocel', 'folitab', 'glirid', 'hepashield', 'immuvit',
      'levocet', 'moxiflox', 'neuro-p', 'optidrop', 'p-amlo',
      'sulbacin', 'alcef', 'b-neuro', 'cifran', 'diafree', 'ezipen',
      'famotin', 'glicon', 'heparin pop', 'iso-b', 'ketoskin',
      'losamax', 'm-clox', 'novapen', 'omipres', 'provas', 'renaflox',
      'spasmonil', 'trovan', 'unidox', 'v-cef',
    ],
  },
  {
    id: 'drug_intl',
    name_en: 'Drug Intl',
    name_bn: 'ড্রাগ ইন্টা.',
    icon: '🌐',
    patterns: [
      'drug intl', 'drug international', 'd-cef', 'g-amoxicillin',
      'a-cal', 'b-complex', 'cipro-d', 'd-fluc', 'e-oil', 'folic',
      'g-cetirizine', 'hilin', 'iron-d', 'ketoconazole d',
      'losartan-d', 'metformin-d', 'n-drop', 'omeprazole-d',
      'ampicillin d', 'cal-cit d', 'dexa-d', 'esom-d', 'fexo-d',
      'g-rab', 'h-vit d', 'i-ceft', 'k-plus d', 'levo-d',
      'm-cef d', 'n-flam', 'os-d', 'pan-d', 'q-cef d', 'r-zole',
      's-cor d', 't-cin d', 'u-ceft',
    ],
  },
];

// Pre-index the entire medicine database ONCE at startup!
// Pre-calculates company matching and unified lowercase search text upfront
// so filter and search runs in microseconds with zero string re-allocation.
const INDEXED_MEDICINES = MEDICINE_DATABASE.map((med) => {
  const brandsLower = (med.brands || '').toLowerCase();
  const nameLower = (med.name_en || '').toLowerCase();

  let detectedCompany = null;
  for (const comp of MEDICINE_COMPANIES) {
    if (comp.id === 'all') continue;
    if (comp.patterns.some((p) => brandsLower.includes(p) || nameLower.includes(p))) {
      detectedCompany = comp;
      break;
    }
  }

  const searchText = (
    nameLower + ' ' +
    (med.generic || '').toLowerCase() + ' ' +
    (med.work_bn || '').toLowerCase() + ' ' +
    (med.work_en || '').toLowerCase() + ' ' +
    (med.category_bn || '').toLowerCase() + ' ' +
    (med.target_organ || '').toLowerCase() + ' ' +
    brandsLower
  );

  return {
    ...med,
    _companyId: detectedCompany ? detectedCompany.id : null,
    _company: detectedCompany,
    _search: searchText,
  };
});

// Memoized Card Component: Prevents re-rendering untouched cards
const MedicineCardItem = React.memo(function MedicineCardItem({
  item,
  isExpanded,
  isBn,
  t,
  onToggleExpand,
}) {
  const detectedCompany = item._company;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: t.card,
          borderColor: isExpanded ? t.text : t.cardBorder,
          shadowColor: t.shadowColor,
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.cardHeader,
          {
            backgroundColor: isExpanded ? t.accentBg : 'transparent',
            borderBottomColor: t.border,
          },
        ]}
        onPress={() => onToggleExpand(item.id)}
        activeOpacity={0.75}
      >
        <View style={styles.headerLeft}>
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
              source={getMedicineCategoryIcon(item.category)}
              size={20}
              color={t.text}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.medNameEn, { color: t.text, fontSize: t.fs(15) }]}>
              {item.name_en}
            </Text>

            {/* Badges row */}
            <View style={styles.badgeRow}>
              <View
                style={[
                  styles.categoryBadge,
                  {
                    backgroundColor: t.surfaceSecondary,
                    borderColor: t.border,
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                ]}
              >
                <HealthIcon
                  source={getMedicineCategoryIcon(item.category)}
                  size={11}
                  color={t.text}
                  style={{ marginRight: 4 }}
                />
                <Text style={[styles.categoryBadgeText, { color: t.text, fontSize: t.fs(11) }]}>
                  {item.category_bn}
                </Text>
              </View>

              {detectedCompany ? (
                <View
                  style={[
                    styles.companyBadge,
                    {
                      backgroundColor: t.accentBg,
                      borderColor: t.cardBorder,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  ]}
                >
                  <HealthIcon
                    name="pharmacy"
                    size={11}
                    color={t.text}
                    style={{ marginRight: 4 }}
                  />
                  <Text style={[styles.companyBadgeText, { color: t.text, fontSize: t.fs(11) }]}>
                    {detectedCompany.name_en}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>

        <View style={styles.headerRight}>
          <View
            style={[
              styles.expandPill,
              {
                backgroundColor: isExpanded ? (t.isDark ? '#ffffff' : '#000000') : t.chipBg,
                borderColor: t.chipBorder,
              },
            ]}
          >
            <Text
              style={[
                styles.expandPillText,
                { color: isExpanded ? (t.isDark ? '#000000' : '#ffffff') : t.text },
              ]}
            >
              {isExpanded ? '▲' : '▼'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Detailed Clinical Content when expanded */}
      {isExpanded && (
        <View
          style={[
            styles.expandedContent,
            {
              backgroundColor: t.card,
              borderTopColor: t.border,
            },
          ]}
        >
          {/* Primary Action Box */}
          <View style={[styles.detailBlock, { borderBottomColor: t.border }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <HealthIcon name="medicines" size={13} color={t.text} style={{ marginRight: 6 }} />
              <Text style={[styles.detailTitle, { color: t.text, fontSize: t.fs(12) }]}>
                {isBn
                  ? 'ওষুধের কাজ (Primary Action):'
                  : 'Primary Action:'}
              </Text>
            </View>
            <Text style={[styles.detailText, { color: t.text, fontSize: t.fs(13), lineHeight: Math.round(t.fs(13) * 1.45) }]}>
              {isBn ? item.work_bn : item.work_en || item.primary_indication_en}
            </Text>
          </View>

          {/* Mechanism of Action */}
          <View style={[styles.detailBlock, { borderBottomColor: t.border }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <HealthIcon name="microscope" size={13} color={t.text} style={{ marginRight: 6 }} />
              <Text style={[styles.detailTitle, { color: t.text, fontSize: t.fs(12) }]}>
                {isBn
                  ? 'যেভাবে কাজ করে (Mechanism of Action):'
                  : 'Mechanism of Action:'}
              </Text>
            </View>
            <Text style={[styles.detailText, { color: t.text, fontSize: t.fs(13), lineHeight: Math.round(t.fs(13) * 1.45) }]}>
              {isBn ? item.how_it_works_bn : item.how_it_works_en}
            </Text>
          </View>

          {/* Dosage */}
          <View style={[styles.detailBlock, { borderBottomColor: t.border }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <HealthIcon name="pills" size={13} color={t.text} style={{ marginRight: 6 }} />
              <Text style={[styles.detailTitle, { color: t.text, fontSize: t.fs(12) }]}>
                {isBn
                  ? 'খাবার নিয়ম ও মাত্রা (Dosage Guidance):'
                  : 'Dosage Guidance:'}
              </Text>
            </View>
            <Text style={[styles.detailText, { color: t.text, fontSize: t.fs(13), lineHeight: Math.round(t.fs(13) * 1.45) }]}>
              {isBn ? item.dosage_bn : item.dosage_en}
            </Text>
          </View>

          {/* Side Effects */}
          <View style={[styles.detailBlock, { borderBottomColor: t.border }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <HealthIcon name="alert" size={13} color={t.text} style={{ marginRight: 6 }} />
              <Text style={[styles.detailTitle, { color: t.text, fontSize: t.fs(12) }]}>
                {isBn
                  ? 'সম্ভাব্য পার্শ্বপ্রতিক্রিয়া (Side Effects):'
                  : 'Side Effects:'}
              </Text>
            </View>
            <Text style={[styles.detailText, { color: t.text, fontSize: t.fs(13), lineHeight: Math.round(t.fs(13) * 1.45) }]}>
              {isBn ? item.side_effects_bn : item.side_effects_en}
            </Text>
          </View>

          {/* Precautions */}
          <View style={[styles.detailBlock, { borderBottomColor: t.border }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <HealthIcon name="alert" size={13} color={t.text} style={{ marginRight: 6 }} />
              <Text style={[styles.detailTitle, { color: t.text, fontSize: t.fs(12) }]}>
                {isBn
                  ? 'সতর্কতা ও নিষেধাজ্ঞা (Precautions):'
                  : 'Precautions:'}
              </Text>
            </View>
            <Text style={[styles.detailText, { color: t.text, fontSize: t.fs(13), lineHeight: Math.round(t.fs(13) * 1.45) }]}>
              {isBn ? item.precautions_bn : item.precautions_en}
            </Text>
          </View>

          {/* Top Bangladesh Brands */}
          {item.brands ? (
            <View style={[styles.detailBlock, { borderBottomWidth: 0 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <HealthIcon name="pharmacy" size={13} color={t.text} style={{ marginRight: 6 }} />
                <Text style={[styles.detailTitle, { color: t.text, fontSize: t.fs(12) }]}>
                  {isBn
                    ? 'বাংলাদেশে প্রচলিত ব্র্যান্ড (Top BD Brands):'
                    : 'Popular Bangladesh Brands:'}
                </Text>
              </View>
              <View style={styles.brandChipsWrap}>
                {item.brands.split(',').map((b, bIdx) => {
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
                      <Text style={[styles.brandTagText, { color: t.text }]}>
                        {bTrim}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          ) : null}

          {/* Pregnancy Category */}
          {item.pregnancy_bn || item.pregnancy_en ? (
            <View
              style={[
                styles.detailBlock,
                {
                  borderBottomWidth: 0,
                  marginTop: 6,
                  backgroundColor: t.surfaceSecondary,
                  borderRadius: 12,
                  padding: 10,
                },
              ]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <HealthIcon name="femaleReproductive" size={13} color={t.text} style={{ marginRight: 6 }} />
                <Text style={[styles.detailTitle, { color: t.text, fontSize: t.fs(12) }]}>
                  {isBn
                    ? 'গর্ভকালীন নিরাপত্তা (Pregnancy Safety):'
                    : 'Pregnancy Safety:'}
                </Text>
              </View>
              <Text style={[styles.detailText, { color: t.text, fontSize: t.fs(13), lineHeight: Math.round(t.fs(13) * 1.45) }]}>
                {isBn ? item.pregnancy_bn : item.pregnancy_en}
              </Text>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
});

export default function MedicineScreen({
  theme = 'dark',
  fontSize = 'medium',
  onNavigateToOrgan,
  onScrollLock,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [globalLang, setGlobalLang] = useState('bn');

  const flatListRef = useRef(null);
  const t = getTheme(theme, fontSize);

  const selectedCompanyObj = useMemo(() => {
    return MEDICINE_COMPANIES.find((c) => c.id === selectedCompany) || MEDICINE_COMPANIES[0];
  }, [selectedCompany]);

  // COMBINED FILTER: Instant microsecond filtering over pre-indexed dataset!
  const filteredMedicines = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return INDEXED_MEDICINES.filter((med) => {
      // 1. System Category Filter
      if (selectedCategory !== 'all' && med.category !== selectedCategory) {
        return false;
      }

      // 2. Pharmaceutical Company Filter
      if (selectedCompany !== 'all' && med._companyId !== selectedCompany) {
        return false;
      }

      // 3. Search Query
      if (q && !med._search.includes(q)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedCompany]);

  const toggleExpand = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const handleSelectCompany = useCallback((id) => {
    setSelectedCompany(id);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, []);

  const handleSelectCategory = useCallback((id) => {
    setSelectedCategory(id);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, []);

  const handleResetFilters = useCallback(() => {
    setSelectedCompany('all');
    setSelectedCategory('all');
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, []);

  const renderMedicineCard = useCallback(
    ({ item }) => {
      return (
        <MedicineCardItem
          item={item}
          isExpanded={expandedId === item.id}
          isBn={globalLang === 'bn'}
          t={t}
          onToggleExpand={toggleExpand}
        />
      );
    },
    [expandedId, globalLang, t, toggleExpand]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: t.bg }]}
    >
      {/* Top Header */}
      <View
        style={[
          styles.topHeader,
          {
            backgroundColor: t.headerBg,
            borderBottomColor: t.glassBorder,
          },
        ]}
      >
        {/* Page Title & Language Toggle at Top Right */}
        <View style={styles.headerTitleRow}>
          <Text style={[styles.pageTitle, { color: t.text, fontSize: t.fs(26) }]}>
            {globalLang === 'bn' ? 'ওষুধ ও ব্র্যান্ড' : 'Medicines'}
          </Text>

          {/* Global Language Toggle at Top Right */}
          <View
            style={[
              styles.langToggleWrap,
              {
                backgroundColor: t.chipBg,
                borderColor: t.chipBorder,
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.langTab,
                globalLang === 'bn' && { backgroundColor: t.isDark ? '#ffffff' : '#000000' },
              ]}
              onPress={() => setGlobalLang('bn')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.langTabText,
                  {
                    color: globalLang === 'bn'
                      ? t.isDark ? '#000000' : '#ffffff'
                      : t.text,
                  },
                ]}
              >
                বাংলা
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.langTab,
                globalLang === 'en' && { backgroundColor: t.isDark ? '#ffffff' : '#000000' },
              ]}
              onPress={() => setGlobalLang('en')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.langTabText,
                  {
                    color: globalLang === 'en'
                      ? t.isDark ? '#000000' : '#ffffff'
                      : t.text,
                  },
                ]}
              >
                EN
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Full-width Search Bar */}
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: t.inputBg,
              borderColor: t.glassBorder,
            },
          ]}
        >
          <HealthIcon name="magnifyingGlass" size={16} color={t.textMuted} style={{ marginRight: 8 }} />
          <TextInput
            style={[styles.searchInput, { color: t.text }]}
            placeholder={
              globalLang === 'bn'
                ? 'ওষুধ, ব্র্যান্ড (Napa, Seclo) খুঁজুন...'
                : 'Search 2,500+ generics, brands...'
            }
            placeholderTextColor={t.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={[styles.clearBtnText, { color: t.textMuted }]}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ROW 1: PHARMACEUTICAL COMPANY FILTER */}
        <View
          style={styles.filterSectionRow}
          onTouchStart={() => onScrollLock?.(true)}
          onTouchEnd={() => onScrollLock?.(false)}
          onTouchCancel={() => onScrollLock?.(false)}
        >
          <Text style={[styles.filterSectionLabel, { color: t.textMuted }]}>
            Company:
          </Text>
          <ScrollView
            horizontal
            nestedScrollEnabled={true}
            onScrollBeginDrag={() => onScrollLock?.(true)}
            onScrollEndDrag={() => onScrollLock?.(false)}
            onMomentumScrollEnd={() => onScrollLock?.(false)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsScroll}
          >
            {MEDICINE_COMPANIES.map((comp) => {
              const active = selectedCompany === comp.id;
              const compIconColor = active ? (t.isDark ? '#000000' : '#ffffff') : t.text;
              return (
                <TouchableOpacity
                  key={comp.id}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: active
                        ? t.isDark
                          ? '#ffffff'
                          : '#000000'
                        : t.chipBg,
                      borderColor: active ? t.text : t.chipBorder,
                    },
                  ]}
                  onPress={() => handleSelectCompany(comp.id)}
                  activeOpacity={0.7}
                >
                  <HealthIcon
                    name="pharmacy"
                    size={13}
                    color={compIconColor}
                    style={{ marginRight: 5 }}
                  />
                  <Text
                    style={[
                      styles.chipLabel,
                      {
                        color: active
                          ? t.isDark
                            ? '#000000'
                            : '#ffffff'
                          : t.text,
                        fontWeight: active ? '800' : '600',
                      },
                    ]}
                  >
                    {comp.name_en}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* ROW 2: SYSTEM CATEGORY FILTER */}
        <View
          style={styles.filterSectionRow}
          onTouchStart={() => onScrollLock?.(true)}
          onTouchEnd={() => onScrollLock?.(false)}
          onTouchCancel={() => onScrollLock?.(false)}
        >
          <Text style={[styles.filterSectionLabel, { color: t.textMuted }]}>
            {globalLang === 'bn' ? 'সিস্টেম:' : 'System:'}
          </Text>
          <ScrollView
            horizontal
            nestedScrollEnabled={true}
            onScrollBeginDrag={() => onScrollLock?.(true)}
            onScrollEndDrag={() => onScrollLock?.(false)}
            onMomentumScrollEnd={() => onScrollLock?.(false)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsScroll}
          >
            {MEDICINE_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              const catIconColor = active ? (t.isDark ? '#000000' : '#ffffff') : t.text;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: active
                        ? t.isDark
                          ? '#ffffff'
                          : '#000000'
                        : t.chipBg,
                      borderColor: active ? t.text : t.chipBorder,
                    },
                  ]}
                  onPress={() => handleSelectCategory(cat.id)}
                  activeOpacity={0.7}
                >
                  <HealthIcon
                    source={cat.id === 'all' ? HEALTH_ICONS.medicines : getMedicineCategoryIcon(cat.id)}
                    size={13}
                    color={catIconColor}
                    style={{ marginRight: 5 }}
                  />
                  <Text
                    style={[
                      styles.chipLabel,
                      {
                        color: active
                          ? t.isDark
                            ? '#000000'
                            : '#ffffff'
                          : t.text,
                        fontWeight: active ? '800' : '600',
                      },
                    ]}
                  >
                    {globalLang === 'bn'
                      ? cat.label_bn
                      : cat.label_en || cat.label_bn}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Combined Filter Active Indicator & Quick Reset */}
        {(selectedCompany !== 'all' || selectedCategory !== 'all') && (
          <View style={styles.activeFilterBar}>
            {selectedCompany !== 'all' && (
              <TouchableOpacity
                style={[
                  styles.filterTag,
                  {
                    backgroundColor: t.isDark ? '#27272a' : '#e4e4e7',
                    borderColor: t.cardBorder,
                  },
                ]}
                onPress={() => handleSelectCompany('all')}
              >
                <Text style={[styles.filterTagText, { color: t.text }]}>
                  {selectedCompanyObj.name_en} ✕
                </Text>
              </TouchableOpacity>
            )}
            {selectedCategory !== 'all' && (
              <TouchableOpacity
                style={[
                  styles.filterTag,
                  {
                    backgroundColor: t.isDark ? '#27272a' : '#e4e4e7',
                    borderColor: t.cardBorder,
                  },
                ]}
                onPress={() => handleSelectCategory('all')}
              >
                <Text style={[styles.filterTagText, { color: t.text }]}>
                  {MEDICINE_CATEGORIES.find((c) => c.id === selectedCategory)?.label_bn || selectedCategory} ✕
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.resetAllBtn,
                {
                  backgroundColor: t.surfaceSecondary,
                  borderColor: t.border,
                },
              ]}
              onPress={handleResetFilters}
            >
              <Text style={[styles.resetAllBtnText, { color: t.textMuted }]}>
                {globalLang === 'bn' ? 'রিসেট' : 'Reset'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Medicine List */}
      <FlatList
        ref={flatListRef}
        data={filteredMedicines}
        keyExtractor={keyExtractor}
        renderItem={renderMedicineCard}
        contentContainerStyle={styles.listContent}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <HealthIcon
              name="magnifyingGlass"
              size={38}
              color={t.textMuted}
              style={{ marginBottom: 12 }}
            />
            <Text style={[styles.emptyText, { color: t.text }]}>
              {globalLang === 'bn'
                ? 'এই কোম্পানি ও সিস্টেমে কোনো ওষুধ পাওয়া যায়নি'
                : 'No Medicines Found for this Company & System'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    elevation: 6,
  },
  searchRowWithLang: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  titleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'relative',
    minHeight: 38,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  langToggleWrap: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    borderRadius: 14,
    padding: 3,
    borderWidth: 1,
  },
  langTab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  langTabText: {
    fontSize: 11,
    fontWeight: '700',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 42,
    borderWidth: 1,
    marginBottom: 8,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    paddingVertical: 0,
  },
  clearBtnText: {
    fontSize: 14,
    fontWeight: '700',
    paddingHorizontal: 4,
  },
  filterSectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  filterSectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    width: 52,
  },
  chipsScroll: {
    gap: 6,
    paddingVertical: 2,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  chipIcon: {
    fontSize: 12,
  },
  chipLabel: {
    fontSize: 11,
  },
  activeFilterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  filterTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  filterTagText: {
    fontSize: 10,
    fontWeight: '700',
  },
  resetAllBtn: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  resetAllBtnText: {
    fontSize: 10,
    fontWeight: '600',
  },
  listContent: {
    padding: 14,
    gap: 12,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  medIcon: {
    fontSize: 20,
  },
  medNameEn: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  companyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  companyBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  organBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  organBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  expandPill: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  expandPillText: {
    fontSize: 10,
    fontWeight: '800',
  },
  expandedContent: {
    padding: 14,
    gap: 10,
    borderTopWidth: 1,
  },
  detailBlock: {
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  detailTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    lineHeight: 18,
  },
  brandChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  brandTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  brandTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 44,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

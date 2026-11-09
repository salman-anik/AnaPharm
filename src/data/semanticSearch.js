/**
 * Comprehensive Bilingual Semantic Search Engine for AnaPharm
 * Maps colloquial symptoms, clinical concepts, and Bengali / English medical queries
 * to therapeutic indications, drug classes, and pharmacological mechanisms.
 */

export const SEMANTIC_CONCEPTS = [
  {
    id: 'headache',
    label_en: 'Headache & Migraine',
    label_bn: 'মাথা ব্যথা ও মাইগ্রেন',
    keywords: [
      'মাথা ব্যথা', 'মাথাব্যথা', 'মাইগ্রেন', 'মাথা যন্ত্রণা', 'মাথা ঘোরানো',
      'headache', 'migraine', 'matha betha', 'mathabyatha', 'cephalea', 'head pain'
    ],
    expansions: [
      'paracetamol', 'tolfenamic', 'ibuprofen', 'naproxen', 'diclofenac',
      'ergotamine', 'sumatriptan', 'analgesic', 'headache', 'migraine', 'মাথা ব্যথা', 'ব্যথা'
    ]
  },
  {
    id: 'fever',
    label_en: 'Fever & High Temperature',
    label_bn: 'জ্বর ও শরীর গরম',
    keywords: [
      'জ্বর', 'গা গরম', 'তাপমাত্রা', 'জ্বর সর্দি',
      'fever', 'pyrexia', 'temperature', 'jor', 'ga gorom', 'febrile', 'chills'
    ],
    expansions: [
      'paracetamol', 'acetaminophen', 'napa', 'ace', 'pyrex', 'antipyretic', 'জ্বর', 'fever'
    ]
  },
  {
    id: 'gastric',
    label_en: 'Gastric, Acidity & Heartburn',
    label_bn: 'গ্যাস্ট্রিক, এসিডিটি ও বুক জ্বালা',
    keywords: [
      'গ্যাস্ট্রিক', 'গ্যাস', 'এসিডিটি', 'বুক জ্বালা', 'বদহজম', 'আলসার', 'পেট ফাঁপা',
      'gastric', 'acidity', 'heartburn', 'gas', 'acid', 'ulcer', 'gerd', 'reflux', 'peptic', 'indigestion'
    ],
    expansions: [
      'omeprazole', 'esomeprazole', 'pantoprazole', 'rabeprazole', 'dexlansoprazole',
      'antacid', 'famotidine', 'ranitidine', 'seclo', 'sergel', 'maxpro', 'finix',
      'pantonix', 'algin', 'sucralfate', 'gastric', 'এসিডিটি', 'আলসার', 'heartburn'
    ]
  },
  {
    id: 'cough',
    label_en: 'Cough & Bronchitis',
    label_bn: 'কাশি, কফ ও ব্রঙ্কাইটিস',
    keywords: [
      'কাশি', 'কফ', 'শুকনো কাশি', 'বুকের কফ', 'গলা খুশখুশ',
      'cough', 'kashi', 'kof', 'phlegm', 'bronchitis', 'dry cough', 'throat irritation'
    ],
    expansions: [
      'dextromethorphan', 'guaifenesin', 'ambroxol', 'bromhexine', 'butamirate',
      'levodropropizine', 'expectorant', 'antitussive', 'কাশি', 'কফ', 'cough'
    ]
  },
  {
    id: 'cold',
    label_en: 'Common Cold, Flu & Sneezing',
    label_bn: 'সর্দি, হাঁচি ও নাক বন্ধ',
    keywords: [
      'সর্দি', 'হাঁচি', 'নাক বন্ধ', 'ঠাণ্ডা', 'নাক দিয়ে জল পড়া',
      'cold', 'shordi', 'hachi', 'sneezing', 'runny nose', 'flu', 'nasal', 'congestion', 'rhinitis'
    ],
    expansions: [
      'fexofenadine', 'cetirizine', 'desloratadine', 'bilastine', 'phenylephrine',
      'pseudoephedrine', 'oxymetazoline', 'antihistamine', 'সর্দি', 'হাঁচি', 'rhinitis'
    ]
  },
  {
    id: 'pain',
    label_en: 'Pain Relief & Painkillers',
    label_bn: 'ব্যথানাশক ও শারীরিক ব্যথা',
    keywords: [
      'ব্যথা', 'বেদনা', 'কোমর ব্যথা', 'হাঁটু ব্যথা', 'দাঁতের ব্যথা', 'মাংসপেশির ব্যথা',
      'pain', 'painkiller', 'ache', 'betha', 'body ache', 'back pain', 'toothache', 'joint pain', 'analgesic'
    ],
    expansions: [
      'ketorolac', 'naproxen', 'diclofenac', 'aceclofenac', 'tramadol', 'ibuprofen',
      'etoricoxib', 'celecoxib', 'pain', 'ব্যথা', 'analgesic', 'nsaid', 'arthritis'
    ]
  },
  {
    id: 'asthma',
    label_en: 'Asthma & Breathing Difficulty',
    label_bn: 'হাঁপানি ও শ্বাসকষ্ট',
    keywords: [
      'হাঁপানি', 'শ্বাসকষ্ট', 'দম বন্ধ', 'বুকে ঘড়ঘড়',
      'asthma', 'hapani', 'shashkoshto', 'breathless', 'wheezing', 'copd', 'dyspnea'
    ],
    expansions: [
      'salbutamol', 'montelukast', 'budesonide', 'ipratropium', 'fluticasone',
      'formoterol', 'theophylline', 'doxofylline', 'monas', 'bronchodilator', 'হাঁপানি', 'শ্বাসকষ্ট'
    ]
  },
  {
    id: 'allergy',
    label_en: 'Allergy & Skin Itching',
    label_bn: 'অ্যালার্জি ও চুলকানি',
    keywords: [
      'অ্যালার্জি', 'চুলকানি', 'ফুসকুড়ি', 'চামড়া লাল হওয়া',
      'allergy', 'allergic', 'itching', 'chulkani', 'rash', 'urticaria', 'pruritus'
    ],
    expansions: [
      'cetirizine', 'fexofenadine', 'loratadine', 'rupatadine', 'bilastine',
      'levocetirizine', 'hydroxyzine', 'antihistamine', 'চুলকানি', 'অ্যালার্জি', 'allergy'
    ]
  },
  {
    id: 'vomiting',
    label_en: 'Vomiting & Nausea',
    label_bn: 'বমি ও বমি বমি ভাব',
    keywords: [
      'বমি', 'বমি বমি ভাব', 'বমির সমস্যা',
      'vomit', 'vomiting', 'nausea', 'bomi', 'motion sickness', 'emesis'
    ],
    expansions: [
      'ondansetron', 'domperidone', 'metoclopramide', 'palonosetron', 'promethazine',
      'antiemetic', 'বমি', 'nausea', 'vomiting'
    ]
  },
  {
    id: 'diarrhea',
    label_en: 'Diarrhea & Loose Motion',
    label_bn: 'ডায়রিয়া ও পাতলা পায়খানা',
    keywords: [
      'ডায়রিয়া', 'পাতলা পায়খানা', 'আমাশয়', 'পেট খারাপ',
      'diarrhea', 'diarrhoea', 'loose motion', 'patla paikhana', 'dysentery', 'cholera'
    ],
    expansions: [
      'ors', 'zinc', 'loperamide', 'ciprofloxacin', 'metronidazole', 'azithromycin',
      'racecadotril', 'electrolytes', 'ডায়রিয়া', 'পায়খানা', 'diarrhea'
    ]
  },
  {
    id: 'diabetes',
    label_en: 'Diabetes & High Blood Sugar',
    label_bn: 'ডায়াবেটিস ও রক্তে শর্করা',
    keywords: [
      'ডায়াবেটিস', 'সুগার', 'বহুমূত্র', 'রক্তে চিনি',
      'diabetes', 'diabetic', 'blood sugar', 'sugar', 'glucose', 'insulin'
    ],
    expansions: [
      'metformin', 'linagliptin', 'glimepiride', 'sitagliptin', 'vildagliptin',
      'dapagliflozin', 'empagliflozin', 'gliclazide', 'insulin', 'ডায়াবেটিস', 'antidiabetic'
    ]
  },
  {
    id: 'hypertension',
    label_en: 'High Blood Pressure (BP)',
    label_bn: 'উচ্চ রক্তচাপ ও প্রেসার',
    keywords: [
      'উচ্চ রক্তচাপ', 'প্রেসার', 'ব্লাড প্রেসার', 'উচ্চ চাপ',
      'hypertension', 'blood pressure', 'high bp', 'pressure', 'bp', 'presser'
    ],
    expansions: [
      'amlodipine', 'losartan', 'telmisartan', 'bisoprolol', 'atenolol',
      'ramipril', 'valsartan', 'olmesartan', 'carvedilol', 'diltiazem',
      'antihypertensive', 'রক্তচাপ', 'hypertension'
    ]
  },
  {
    id: 'insomnia',
    label_en: 'Sleep Problems & Insomnia',
    label_bn: 'ঘুমের সমস্যা ও অনিদ্রা',
    keywords: [
      'ঘুম', 'ঘুমের ওষুধ', 'অনিদ্রা', 'রাত জাগা', 'ঘুম না হওয়া',
      'sleep', 'insomnia', 'sleeplessness', 'ghum', 'onidra', 'somnolence'
    ],
    expansions: [
      'melatonin', 'zolpidem', 'clonazepam', 'diazepam', 'lorazepam', 'alprazolam',
      'sedative', 'hypnotic', 'ঘুম', 'অনিদ্রা', 'insomnia'
    ]
  },
  {
    id: 'infection',
    label_en: 'Bacterial Infection & Antibiotics',
    label_bn: 'জীবাণু সংক্রমণ ও অ্যান্টিবায়োটিক',
    keywords: [
      'অ্যান্টিবায়োটিক', 'ইনফেকশন', 'সংক্রমণ', 'জীবাণু', 'পুঁজ',
      'antibiotic', 'infection', 'bacterial', 'infaction', 'germ', 'sepsis'
    ],
    expansions: [
      'azithromycin', 'cefixime', 'ciprofloxacin', 'amoxicillin', 'ceftriaxone',
      'flucloxacillin', 'clarithromycin', 'moxifloxacin', 'cefpodoxime',
      'antibiotic', 'অ্যান্টিবায়োটিক', 'সংক্রমণ', 'infection'
    ]
  },
  {
    id: 'skin_disease',
    label_en: 'Skin Diseases, Fungal & Eczema',
    label_bn: 'দাদ, চর্মরোগ ও ফাঙ্গাল ইনফেকশন',
    keywords: [
      'দাদ', 'চর্মরোগ', 'ত্বক', 'একজিমা', 'ফাঙ্গাল', 'খোস পাঁচড়া',
      'skin', 'fungal', 'eczema', 'dermatitis', 'dad', 'ringworm', 'candidiasis'
    ],
    expansions: [
      'clotrimazole', 'miconazole', 'ketoconazole', 'terbinafine', 'fluconazole',
      'betamethasone', 'clobetasol', 'antifungal', 'চর্মরোগ', 'দাদ', 'ত্বক', 'dermatological'
    ]
  },
  {
    id: 'stomach_ache',
    label_en: 'Abdominal Cramps & Stomach Ache',
    label_bn: 'পেট ব্যথা ও পেটের মোচড়',
    keywords: [
      'পেট ব্যথা', 'পেটে ব্যথা', 'মোচড়', 'পেট কামড়ানো',
      'stomach ache', 'abdominal pain', 'pet betha', 'cramp', 'colic', 'spasm'
    ],
    expansions: [
      'tiemonium', 'hyoscine', 'drotaverine', 'mebeverine', 'dicyclomine',
      'alverine', 'antispasmodic', 'পেট ব্যথা', 'spasmodic'
    ]
  },
  {
    id: 'constipation',
    label_en: 'Constipation & Hard Stool',
    label_bn: 'কোষ্ঠকাঠিন্য ও পায়খানা কষা',
    keywords: [
      'কোষ্ঠকাঠিন্য', 'কষা', 'মলত্যাগ', 'পায়খানা পরিষ্কার না হওয়া',
      'constipation', 'hard stool', 'koshthakathinjo', 'bowel', 'purgative'
    ],
    expansions: [
      'lactulose', 'bisacodyl', 'psyllium', 'senna', 'polyethylene glycol',
      'glycerin', 'laxative', 'কোষ্ঠকাঠিন্য'
    ]
  },
  {
    id: 'eye_care',
    label_en: 'Eye Infection & Eye Drops',
    label_bn: 'চোখের সমস্যা ও চোখের ড্রপ',
    keywords: [
      'চোখ', 'চোখের ড্রপ', 'চোখ লাল', 'চোখ ওঠা', 'চোখে চুলকানি',
      'eye', 'eye drop', 'chokh', 'conjunctivitis', 'ocular', 'red eye'
    ],
    expansions: [
      'moxifloxacin', 'tobramycin', 'ciprofloxacin', 'artificial tears',
      'carboxymethylcellulose', 'olopatadine', 'eye drop', 'চোখ', 'ophthalmic'
    ]
  },
  {
    id: 'vitamins',
    label_en: 'Vitamins, Weakness & Nutrition',
    label_bn: 'ভিটামিন, পুষ্টি ও দুর্বলতা',
    keywords: [
      'ভিটামিন', 'দুর্বলতা', 'ক্লান্তি', 'পুষ্টি', 'রক্তশূন্যতা', 'ক্ষুধামন্দা',
      'vitamin', 'weakness', 'fatigue', 'nutrition', 'anemia', 'durbolota', 'energy'
    ],
    expansions: [
      'multivitamin', 'b-complex', 'vitamin c', 'vitamin d', 'folic acid',
      'iron', 'calcium', 'zinc', 'ভিটামিন', 'রক্তশূন্যতা', 'পুষ্টি', 'supplement'
    ]
  },
  {
    id: 'heart_care',
    label_en: 'Heart Care & Chest Pain',
    label_bn: 'হৃদরোগ ও বুকে ব্যথা',
    keywords: [
      'হার্ট', 'হৃদরোগ', 'বুকে ব্যথা', 'বুক ধড়ফড়', 'হার্ট অ্যাটাক',
      'heart', 'cardiac', 'angina', 'chest pain', 'palpitation', 'infarction'
    ],
    expansions: [
      'nitroglycerin', 'clopidogrel', 'aspirin', 'atorvastatin', 'metoprolol',
      'cardiac', 'হৃদরোগ', 'হার্ট', 'angina'
    ]
  }
];

/**
 * Match a user's free-form query against known semantic medical concepts
 * Returns matching concepts with labels and search query expansions
 */
export function getSemanticMatches(rawQuery) {
  if (!rawQuery || typeof rawQuery !== 'string') {
    return { concepts: [], expansionTerms: [] };
  }

  const query = rawQuery.toLowerCase().trim();
  if (query.length < 2) {
    return { concepts: [], expansionTerms: [] };
  }

  const matchedConcepts = [];
  const expansionSet = new Set();

  for (const concept of SEMANTIC_CONCEPTS) {
    const isMatched = concept.keywords.some((kw) => {
      const kwLower = kw.toLowerCase();
      return query.includes(kwLower) || (kwLower.length >= 3 && kwLower.includes(query));
    });

    if (isMatched) {
      matchedConcepts.push(concept);
      concept.expansions.forEach((term) => expansionSet.add(term.toLowerCase()));
    }
  }

  return {
    concepts: matchedConcepts,
    expansionTerms: Array.from(expansionSet)
  };
}

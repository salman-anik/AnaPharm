// AnaPharm Clinical Disease & Treatment Database
// Comprehensive clinical profiles with causes, symptoms, diagnostics, medicines, lifestyle, and emergency alerts.

export const DISEASE_CATEGORIES = [
  { id: 'all', label_bn: 'সকল রোগ', label_en: 'All Diseases', icon: '🩺' },
  { id: 'cardiovascular', label_bn: 'হৃদরোগ ও রক্ত সংবহন', label_en: 'Cardiovascular', icon: '❤️' },
  { id: 'respiratory', label_bn: 'শ্বাসতন্ত্র ও ফুসফুস', label_en: 'Respiratory', icon: '🫁' },
  { id: 'gastrointestinal', label_bn: 'পরিপাকতন্ত্র ও পেট', label_en: 'Digestive', icon: '🥣' },
  { id: 'hepatobiliary', label_bn: 'যকৃৎ ও পিত্তথলি', label_en: 'Liver & Biliary', icon: '🫀' },
  { id: 'nervous', label_bn: 'স্নায়ু ও মস্তিষ্ক', label_en: 'Brain & Nervous', icon: '🧠' },
  { id: 'endocrine', label_bn: 'ডায়াবেটিস ও হরমোন', label_en: 'Endocrine', icon: '💉' },
  { id: 'renal', label_bn: 'কিডনি ও মূত্রতন্ত্র', label_en: 'Kidney & Renal', icon: '🫘' },
  { id: 'musculoskeletal', label_bn: 'হাড় ও বাতব্যাধি', label_en: 'Bones & Joints', icon: '🦴' },
  { id: 'infectious', label_bn: 'সংক্রামক ব্যাধি', label_en: 'Infectious Diseases', icon: '🦠' },
  { id: 'dermatology', label_bn: 'ত্বক ও চর্মরোগ', label_en: 'Dermatology', icon: '🩹' }
];

export const DISEASE_DATABASE = [
  {
    "id": "hypertension",
    "name_en": "Hypertension (High Blood Pressure)",
    "name_bn": "উচ্চ রক্তচাপ (হাইপারটেনশন)",
    "icd10": "I10",
    "system": "cardiovascular",
    "system_bn": "হৃদ ও রক্ত সংবহনতন্ত্র",
    "organ": "Heart & Arteries",
    "organ_icon": "❤️",
    "severity": "High",
    "overview_bn": "ধমনীর প্রাচীরে রক্তের চাপ স্বাভাবিকের (১২০/৮০ mmHg) চেয়ে দীর্ঘ সময় ধরে বেশি (১৪০/৯০ mmHg বা তদূর্ধ্ব) থাকা। একে 'নীরব ঘাতক' (Silent Killer) বলা হয়।",
    "overview_en": "A chronic medical condition where the blood pressure in the arteries is persistently elevated (>= 140/90 mmHg). Known as the silent killer.",
    "causes_bn": [
      "রক্তনালীর প্রাচীর শক্ত ও সংকুচিত হয়ে যাওয়া (Atherosclerosis)",
      "অতিরিক্ত সোডিয়াম (লবণ) গ্রহণ এবং দেহে তরল জমে থাকা",
      "বংশগত বা জেনেটিক প্রবণতা",
      "স্থূলতা ও অলস জীবনযাপন",
      "দীর্ঘস্থায়ী মানসিক চাপ ও উদ্বেগ",
      "কিডনি রোগ বা এন্ডোক্রাইন হরমোনের ভারসাম্যহীনতা (Secondary Hypertension)"
    ],
    "causes_en": [
      "Arterial stiffness and atherosclerosis",
      "Excess sodium intake leading to fluid retention",
      "Genetic predisposition and family history",
      "Obesity and sedentary lifestyle",
      "Chronic stress and sympathetic overactivity",
      "Secondary causes like renal artery stenosis, Cushing's syndrome"
    ],
    "risk_factors_bn": [
      "ধূমপান ও তামাক",
      "বয়স বৃদ্ধি (৪৫+)",
      "ডায়াবেটিস",
      "অতিরিক্ত অ্যালকোহল",
      "পারিবারিক হৃদরোগের ইতিহাস"
    ],
    "risk_factors_en": [
      "Smoking and tobacco use",
      "Age 45+",
      "Diabetes mellitus",
      "High alcohol intake",
      "Family history of early CVD"
    ],
    "symptoms_bn": [
      "মাথার পেছনে ও ঘাড়ে ভোঁতা ব্যথা (বিশেষ করে সকালে)",
      "মাথা ঘোরানো ও ক্লান্তি বোধ",
      "বুক ধড়ফড় করা (Palpitations)",
      "চোখে ঝাপসা দেখা",
      "নাক দিয়ে রক্ত পড়া (মারাত্মক পর্যায়ে)"
    ],
    "symptoms_en": [
      "Occipital morning headache",
      "Dizziness and fatigue",
      "Palpitations and shortness of breath on exertion",
      "Visual blurriness",
      "Epistaxis (nosebleeds in severe hypertensive crisis)"
    ],
    "diagnostic_tests": [
      "Sphygmomanometer BP measurement (Serial)",
      "24-Hour Ambulatory Blood Pressure Monitoring (ABPM)",
      "Electrocardiogram (ECG)",
      "Echocardiography (Echo)",
      "Serum Creatinine & Electrolytes",
      "Fasting Lipid Profile"
    ],
    "medicines": [
      {
        "generic": "Amlodipine",
        "class": "Calcium Channel Blocker (CCB)",
        "usage_bn": "রক্তনালী শিথিল ও প্রসারিত করে রক্তচাপ কমায় (দৈনিক ৫-১০ মিগ্রা)",
        "usage_en": "Relaxes arterial smooth muscle (5-10 mg OD)",
        "top_brands": [
          "Amdocal (Square)",
          "Camlodin (Beximco)",
          "Amlopin (Incepta)",
          "Lodipine (Renata)"
        ]
      },
      {
        "generic": "Losartan Potassium",
        "class": "Angiotensin II Receptor Blocker (ARB)",
        "usage_bn": "এনজিওটেনসিন রিসেপ্টর ব্লক করে রক্তচাপ কমায় ও কিডনি সুরক্ষিত রাখে (২৫-৫০ মিগ্রা)",
        "usage_en": "Blocks AT1 receptors, cardio and renal protective (25-50 mg OD)",
        "top_brands": [
          "Osartil (Square)",
          "Angilock (Incepta)",
          "Prosan (Beximco)",
          "Losan (Renata)"
        ]
      },
      {
        "generic": "Bisoprolol Hemifumarate",
        "class": "Cardioselective Beta-1 Blocker",
        "usage_bn": "হৃদস্পন্দন ও হৃদপিণ্ডের রক্ত পাম্পের অতিরিক্ত চাপ কমায় (২.৫-৫ মিগ্রা)",
        "usage_en": "Reduces heart rate and cardiac workload (2.5-5 mg OD)",
        "top_brands": [
          "Cardibis (Square)",
          "Bisonova (Beximco)",
          "Bisocor (Incepta)",
          "Embeta (Renata)"
        ]
      },
      {
        "generic": "Telmisartan + Hydrochlorothiazide",
        "class": "ARB + Diuretic Combination",
        "usage_bn": "অতিরিক্ত পানি ও লবণ নিঃসরণ করে অনিয়ন্ত্রিত রক্তচাপ দ্রুত স্বাভাবিক করে",
        "usage_en": "Dual action ARB + Thiazide diuretic for synergistic BP control",
        "top_brands": [
          "Telmax-H (Square)",
          "Telsar-H (Beximco)",
          "Arbitel-H (Incepta)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "দৈনিক লবণের পরিমাণ ১ চা চামচের নিচে (৫ গ্রামের কম) নামিয়ে আনুন।",
      "DASH ডায়েট মেনে চলুন: প্রচুর শাকসবজি, ফলমূল, বাদাম ও কম চর্বিযুক্ত খাবার খান।",
      "প্রতিদিন অন্তত ৩০ মিনিট দ্রুত হাঁটুন এবং ওজন নিয়ন্ত্রণে রাখুন।",
      "ধূমপান ও জর্দা সম্পূর্ণ বর্জন করুন।"
    ],
    "lifestyle_diet_en": [
      "Limit sodium intake to less than 2,000 mg/day (under 1 teaspoon salt).",
      "Follow DASH diet: high in vegetables, fruits, whole grains, low-fat dairy.",
      "30 minutes of brisk walking daily; target BMI 18.5-24.9.",
      "Quit smoking and avoid secondhand smoke."
    ],
    "emergency_warning_bn": "রক্তচাপ ১৮০/১২০ এর বেশি হলে, তীব্র বুকব্যথা, বিভ্রান্তি, কথা জড়িয়ে যাওয়া বা শ্বাসকষ্ট দেখা দিলে দ্রুত জরুরি বিভাগে যান (Hypertensive Emergency)।",
    "emergency_warning_en": "BP > 180/120 with chest pain, acute shortness of breath, numbness, speech slurring indicates Hypertensive Crisis. Call emergency immediately."
  },
  {
    "id": "coronary-artery-disease",
    "name_en": "Coronary Artery Disease & Angina Pectoris",
    "name_bn": "করোনারি হৃদরোগ ও এনজাইনা (বুকে ব্যথা)",
    "icd10": "I25 / I20",
    "system": "cardiovascular",
    "system_bn": "হৃদ ও রক্ত সংবহনতন্ত্র",
    "organ": "Heart (Coronary Arteries)",
    "organ_icon": "❤️",
    "severity": "Critical",
    "overview_bn": "হৃদপিণ্ডের নিজস্ব রক্তনালীগুলোতে (করোনারি ধমনী) কোলেস্টেরল ও চর্বির প্লাক জমে রক্ত চলাচল কমে গিয়ে অক্সিজেনের ঘাটতি তৈরি হওয়া।",
    "overview_en": "Narrowing or blockage of coronary arteries usually caused by atherosclerosis, leading to ischemia and angina chest pain.",
    "causes_bn": [
      "ধমনীর ভেতর কোলেস্টেরল ও ফ্যাটি প্লাক জমা (Atherosclerosis)",
      "উচ্চ কোলেস্টেরল (High LDL, Low HDL, High Triglycerides)",
      "অনিয়ন্ত্রিত ডায়াবেটিস যা রক্তনালীর আস্তরণ ক্ষতিগ্রস্ত করে",
      "ধূমপানজনিত ভাস্কুলার প্রদাহ ও স্প্যাজম"
    ],
    "causes_en": [
      "Atherosclerotic plaque accumulation in coronary vessels",
      "Hyperlipidemia (Elevated LDL cholesterol & triglycerides)",
      "Endothelial injury from diabetes and hypertension",
      "Smoking-induced vascular inflammation and coronary spasm"
    ],
    "risk_factors_bn": [
      "ধূমপান",
      "স্থূলতা",
      "ডায়াবেটিস",
      "উচ্চ রক্তচাপ",
      "অলস জীবনযাপন",
      "বংশে হার্ট অ্যাটাকের ইতিহাস"
    ],
    "risk_factors_en": [
      "Tobacco consumption",
      "Obesity",
      "Diabetes mellitus",
      "Hypertension",
      "Sedentary habits",
      "Family history of premature CAD"
    ],
    "symptoms_bn": [
      "বুকে তীব্র চাপ, ভারী ভাব বা জ্বালাপোড়া (বিশেষ করে পরিশ্রম বা সিঁড়ি ওঠার সময়)",
      "ব্যথা বাম বাহু, ঘাড়, চোয়াল বা পিঠে ছড়িয়ে পড়া",
      "সামান্য পরিশ্রমে শ্বাসকষ্ট ও বুক ধড়ফড়",
      "অস্বস্তিকর অতিরিক্ত ঘাম ও মাথা ঘোরা"
    ],
    "symptoms_en": [
      "Substernal chest pressure or squeezing exacerbated by exertion",
      "Radiation to left shoulder, arm, neck, or jaw",
      "Dyspnea on exertion and unexplained fatigue",
      "Diaphoresis (cold clammy sweats) and dizziness"
    ],
    "diagnostic_tests": [
      "Coronary Angiogram (CAG - Gold Standard)",
      "Exercise Tolerance Test (ETT / TMT)",
      "Cardiac Troponin-I & CK-MB",
      "Echocardiogram (Regional Wall Motion Abnormality)",
      "Coronary CT Calcium Score / CT Angiogram"
    ],
    "medicines": [
      {
        "generic": "Nitroglycerin (Sublingual Spray / Tablet)",
        "class": "Nitrate / Vasodilator",
        "usage_bn": "জরুরি বুক ব্যথায় জিহ্বার নিচে স্প্রে বা ট্যাবলেট; দ্রুত করোনারি রক্তনালী প্রসারিত করে",
        "usage_en": "Rapid sublingual vasodilator for acute angina relief (0.4-0.8 mg SL)",
        "top_brands": [
          "Nitrocard (Square)",
          "Angispray (Beximco)",
          "Nitrovas (Incepta)"
        ]
      },
      {
        "generic": "Aspirin + Clopidogrel",
        "class": "Dual Antiplatelet Therapy (DAPT)",
        "usage_bn": "রক্ত জমাট বাঁধা প্রতিরোধ করে হার্ট অ্যাটাক ও ব্লকেজ বৃদ্ধি রোধ করে (৭৫ মিগ্রা + ৭৫ মিগ্রা)",
        "usage_en": "Prevents platelet aggregation and coronary thrombus formation",
        "top_brands": [
          "Anclog (Square)",
          "Ecosprin Plus (Acme)",
          "Plagrin-A (Incepta)",
          "Noclot Plus (Square)"
        ]
      },
      {
        "generic": "Atorvastatin Calcium",
        "class": "HMG-CoA Reductase Inhibitor (Statin)",
        "usage_bn": "কোলেস্টেরল কমায় ও ধমনীর প্লাক স্থিতিশীল করে ফেটে যাওয়া রোধ করে (১০-২০-৪০ মিগ্রা)",
        "usage_en": "Lowers LDL, stabilizes atherosclerotic plaques (10-40 mg HS)",
        "top_brands": [
          "Atova (Square)",
          "Lipicon (Incepta)",
          "Xelpid (Beximco)",
          "Tiginor (Renata)"
        ]
      },
      {
        "generic": "Metoprolol Succinate",
        "class": "Beta Blocker",
        "usage_bn": "হৃদপিণ্ডের অক্সিজেনের চাহিদা কমায় ও এনজাইনা অ্যাটাক প্রতিরোধ করে (২৫-৫০ মিগ্রা)",
        "usage_en": "Decreases myocardial oxygen demand and prevents ischemic episodes",
        "top_brands": [
          "Metocard XR (Square)",
          "Betaloc (AstraZeneca)",
          "Prolol (Incepta)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "সম্পৃক্ত চর্বি (ঘি, ডালডা, খাসির মাংস, গরু) ও ভাজাপোড়া খাবার সম্পূর্ণরূপে বাদ দিন।",
      "খাদ্যে ওমেগা-৩ ফ্যাটি এসিডযুক্ত মাছ (ইলিশ, টুনা, স্যামন) এবং উদ্ভিজ্জ তেল ব্যবহার করুন।",
      "ভারী ওজন তোলা পরিহার করুন কিন্তু হালকা থেকে মাঝারি হাঁটাচলা নিয়মিত রাখুন।",
      "মানসিক চাপমুক্ত থাকতে মেডিটেশন ও প্রাণায়ম অভ্যাস করুন।"
    ],
    "lifestyle_diet_en": [
      "Eliminate trans fats, hydrogenated oils, deep-fried food, and red meat.",
      "Incorporate omega-3 fatty acids, flaxseeds, and leafy green vegetables.",
      "Avoid sudden heavy isometric lifting; adhere to guided aerobic walks.",
      "Stress reduction techniques, adequate 8-hour sleep."
    ],
    "emergency_warning_bn": "বুকে চাপ ২০ মিনিটের বেশি স্থায়ী হলে, জিহ্বার নিচে নাইট্রেট নেওয়ার পরেও ব্যথা না কমলে তাৎক্ষণিক হাসপাতালে নিয়ে যান (জরুরি হার্ট অ্যাটাক সতর্কতা)।",
    "emergency_warning_en": "Chest pain lasting >20 mins unrelieved by rest/nitroglycerin with diaphoresis signifies impending Myocardial Infarction. Rush to CCU immediately."
  },
  {
    "id": "myocardial-infarction",
    "name_en": "Myocardial Infarction (Acute Heart Attack)",
    "name_bn": "মায়োকার্ডিয়াল ইনফার্কশন (তীব্র হার্ট অ্যাটাক)",
    "icd10": "I21",
    "system": "cardiovascular",
    "system_bn": "হৃদ ও রক্ত সংবহনতন্ত্র",
    "organ": "Heart Muscle",
    "organ_icon": "❤️",
    "severity": "Critical",
    "overview_bn": "করোনারি ধমনীতে রক্তজমাট বাঁধার কারণে রক্ত চলাচল সম্পূর্ণ বন্ধ হয়ে হৃৎপিণ্ডের পেশির কোষগুলোর দ্রুত মৃত্যু ঘটা। এটি তাৎক্ষণিক জীবনঘাতী অবস্থা।",
    "overview_en": "Necrosis of myocardial tissue resulting from acute, total obstruction of a coronary artery. A time-critical medical emergency.",
    "causes_bn": [
      "ধমনীর মধ্যকার প্লাক ফেটে গিয়ে রক্তজমাট বাঁধা (Acute Coronary Thrombosis)",
      "করোনারি ধমনীর গুরুতর খিঁচুনি (Spasm)",
      "অনিয়ন্ত্রিত উচ্চ রক্তচাপ ও ট্রমা",
      "অতিরিক্ত ধূমপান ও ভারী মানসিক উত্তেজনা"
    ],
    "causes_en": [
      "Rupture of vulnerable atherosclerotic plaque triggering occlusive thrombus",
      "Severe prolonged coronary vasospasm",
      "Embolism to coronary arterial circulation",
      "Extreme physical exhaustion or acute autonomic catecholamine surge"
    ],
    "risk_factors_bn": [
      "পূর্বের এনজাইনা বা হার্ট অ্যাটাক",
      "উচ্চ ট্রাইগ্লিসারাইড ও কোলেস্টেরল",
      "ধূমপান",
      "উচ্চ রক্তচাপ ও ডায়াবেটিস"
    ],
    "risk_factors_en": [
      "Prior ischemic episodes",
      "Severe hyperlipidemia",
      "Tobacco abuse",
      "Diabetes and metabolic syndrome"
    ],
    "symptoms_bn": [
      "বুকে অসহ্য চাপ, পিষে ফেলার মতো ব্যথা যা বিশ্রামে কমে না",
      "ব্যথা বাম হাত, গলা, চোয়াল, পিঠ বা পেটের উপরিভাগে ছড়ানো",
      "প্রচণ্ড ঘাম হওয়া (শরীর ঠান্ডা হয়ে যাওয়া)",
      "শ্বাসকষ্ট ও দম বন্ধ হয়ে আসার অনুভূতি",
      "বমি বমি ভাব বা বমি ও অজ্ঞান হয়ে যাওয়া"
    ],
    "symptoms_en": [
      "Crushing, agonizing retrosternal pressure radiating to left arm/jaw",
      "Profuse cold diaphoresis",
      "Acute dyspnea and feeling of impending doom",
      "Nausea, epigastric discomfort, vomiting",
      "Syncope, lightheadedness, sudden collapse"
    ],
    "diagnostic_tests": [
      "Serial ECG (ST-Elevation STEMI or Non-STEMI)",
      "High-Sensitivity Cardiac Troponin-I (hs-cTnI)",
      "Emergency Coronary Angiogram",
      "Echocardiogram (LVEF assessment)"
    ],
    "medicines": [
      {
        "generic": "Aspirin 300mg + Clopidogrel 300mg",
        "class": "Emergency Antiplatelet Loading Dose",
        "usage_bn": "লক্ষণ দেখা মাত্রই চিবিয়ে বা জল দিয়ে দ্রুত সেব্য (ফার্স্ট এইড লোডিং ডোজ)",
        "usage_en": "Stat emergency chewed antiplatelet loading dose to inhibit platelet thrombus",
        "top_brands": [
          "Disprin 300mg",
          "Anclog Loading Pack (Square)",
          "Ecosprin (Acme)"
        ]
      },
      {
        "generic": "Streptokinase / Tenecteplase",
        "class": "Thrombolytic / Fibrinolytic Agent",
        "usage_bn": "হাসপাতালে জরুরি রক্তজমাট গলানোর ইনজেকশন (যদি প্রাইমারি পিসিআই দ্রুত সম্ভব না হয়)",
        "usage_en": "Intravenous thrombolysis within golden window (under 12 hours) to dissolve clot",
        "top_brands": [
          "Streptase",
          "Metalyse",
          "Tenecte"
        ]
      },
      {
        "generic": "Atorvastatin 80mg",
        "class": "High-Intensity Statin Loading",
        "usage_bn": "রক্তনালীর তীব্র প্রদাহ দ্রুত কমায় ও এন্ডোথেলিয়াল মেরামত করে",
        "usage_en": "High-intensity statin to stabilize endothelial plaque immediately",
        "top_brands": [
          "Atova 80 (Square)",
          "Lipicon 80 (Incepta)"
        ]
      },
      {
        "generic": "Unfractionated Heparin / Enoxaparin",
        "class": "Low Molecular Weight Heparin (LMWH)",
        "usage_bn": "সাবকিউটেনিয়াস ইনজেকশন হিসেবে জমাট বাঁধা বিস্তার রোধ করে",
        "usage_en": "Anticoagulation therapy administered during hospitalization",
        "top_brands": [
          "Clexane (Sanofi)",
          "Enoxil (Square)",
          "Lupenox (Incepta)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "হাসপাতাল পরবর্তী কার্ডিয়াক রিহ্যাবিলিটেশন প্রোগ্রামে অংশগ্রহণ করুন।",
      "লবণ শূন্যের কোঠায় নামিয়ে আনুন এবং নিয়মিত রক্তচাপ ও রক্তের সুগার মাপুন।",
      "চিকিৎসকের পরামর্শ ছাড়া কখনোই রক্ত পাতলা করার ওষুধ বন্ধ করবেন না।",
      "ভারী পরিশ্রম ও মানসিক উত্তেজনা থেকে সম্পূর্ণ বিরত থাকুন।"
    ],
    "lifestyle_diet_en": [
      "Enroll in formal Phase II cardiac rehabilitation.",
      "Strict sodium and fluid monitoring; strict lipid target (LDL < 55 mg/dL).",
      "Never discontinue dual antiplatelet therapy without cardiologist consultation.",
      "Gradual monitored return to physical activity."
    ],
    "emergency_warning_bn": "হার্ট অ্যাটাকের লক্ষণ দেখা দিলে প্রথম ৯০ মিনিটকে 'গোল্ডেন আওয়ার' বলা হয়। রোগীকে দ্রুত সিসিইউযুক্ত হাসপাতালে স্থানান্তর করুন।",
    "emergency_warning_en": "Door-to-balloon time within 90 mins saves heart muscle. Call ambulance and rush directly to PCI-capable cardiac center."
  },
  {
    "id": "heart-failure",
    "name_en": "Congestive Heart Failure (CHF)",
    "name_bn": "হার্ট ফেইলিউর (হৃদযন্ত্রের অকার্যকারিতা)",
    "icd10": "I50",
    "system": "cardiovascular",
    "system_bn": "হৃদ ও রক্ত সংবহনতন্ত্র",
    "organ": "Heart (Ventricles)",
    "organ_icon": "❤️",
    "severity": "High",
    "overview_bn": "হৃদপিণ্ডের পাম্প করার ক্ষমতা কমে গিয়ে শরীরের বিভিন্ন অঙ্গে পর্যাপ্ত রক্ত ও অক্সিজেন সরবরাহ করতে না পারা এবং ফুসফুস ও পায়ে পানি জমে যাওয়া।",
    "overview_en": "A condition where the heart cannot pump enough blood to meet the metabolic needs of the body, leading to fluid congestion in lungs and periphery.",
    "causes_bn": [
      "দীর্ঘদিনের অনিয়ন্ত্রিত উচ্চ রক্তচাপ",
      "পূর্ববর্তী হার্ট অ্যাটাকের কারণে হৃদপেশির ক্ষতি ও স্কার টিস্যু",
      "কার্ডিওমায়োপ্যাথি (Cardiomyopathy)",
      "হৃদপিণ্ডের ভালভের রোগ (Valvular Heart Disease)"
    ],
    "causes_en": [
      "Chronic untreated hypertension causing left ventricular hypertrophy",
      "Ischemic heart disease and post-MI myocardial scarring",
      "Dilated or hypertrophic cardiomyopathy",
      "Valvular regurgitation or stenosis"
    ],
    "risk_factors_bn": [
      "বার্ধক্য",
      "ডায়াবেটিস",
      "রক্তশূন্যতা (Severe Anemia)",
      "অতিরিক্ত অ্যালকোহল গ্রহণ"
    ],
    "risk_factors_en": [
      "Advanced age",
      "Diabetes",
      "Chronic severe anemia",
      "Excessive alcohol consumption"
    ],
    "symptoms_bn": [
      "শুয়ে থাকলে শ্বাসকষ্ট বেড়ে যাওয়া (Orthopnea) এবং রাতে হঠাৎ দম বন্ধ হয়ে ঘুম ভাঙা (PND)",
      "পা, গোড়ালি ও পেটে পানি জমে ফুলে যাওয়া (Edema)",
      "অল্প পরিশ্রমে প্রচণ্ড ক্লান্তি ও দুর্বলতা",
      "ক্রমাগত শুকনো কাশি বা সাদা-গোলাপি কফ বের হওয়া"
    ],
    "symptoms_en": [
      "Orthopnea (dyspnea lying flat) and paroxysmal nocturnal dyspnea (PND)",
      "Bilateral lower extremity pitting edema and ascites",
      "Extreme fatigue and decreased exercise tolerance",
      "Persistent cough producing pinkish frothy sputum"
    ],
    "diagnostic_tests": [
      "NT-proBNP / BNP (Cardiac Biomarker)",
      "2D Echocardiogram with Doppler (Ejection Fraction EF%)",
      "Chest X-Ray (Cardiomegaly & Pulmonary Edema)",
      "Serum Electrolytes (Sodium, Potassium) & Kidney function"
    ],
    "medicines": [
      {
        "generic": "Furosemide / Torsemide",
        "class": "Loop Diuretic",
        "usage_bn": "পায়ে ও ফুসফুসে জমে থাকা অতিরিক্ত পানি ও লবণ প্রস্রাবের মাধ্যমে বের করে শ্বাসকষ্ট কমায়",
        "usage_en": "Removes pulmonary and peripheral fluid congestion rapidly (20-40 mg)",
        "top_brands": [
          "Fusid (Square)",
          "Uritor (Incepta)",
          "Frusil (Beximco)",
          "Toran (Renata)"
        ]
      },
      {
        "generic": "Sacubitril + Valsartan",
        "class": "ARNI (Angiotensin Receptor-Neprilysin Inhibitor)",
        "usage_bn": "হার্টের রিভার্স রিমডেলিং করে আয়ু ও কর্মক্ষমতা লক্ষণীয়ভাবে বৃদ্ধি করে",
        "usage_en": "Gold standard ARNI for heart failure with reduced ejection fraction (HFrEF)",
        "top_brands": [
          "Entresto (Novartis)",
          "Varnis (Square)",
          "Nepril (Incepta)",
          "Securita (Beximco)"
        ]
      },
      {
        "generic": "Empagliflozin / Dapagliflozin",
        "class": "SGLT2 Inhibitor",
        "usage_bn": "হার্ট ফেইলিউরে হাসপাতালে ভর্তি ও মৃত্যুর ঝুঁকি অভাবনীয় হারে কমায়",
        "usage_en": "Cardiovascular and renal protective agent for heart failure",
        "top_brands": [
          "G-Empa (Square)",
          "Dapamet (Incepta)",
          "Empaza (Beximco)",
          "Dapaglif (Renata)"
        ]
      },
      {
        "generic": "Spironolactone",
        "class": "Mineralocorticoid Receptor Antagonist (MRA)",
        "usage_bn": "হৃদপেশীর ফাইব্রোসিস বা শক্ত হওয়া রোধ করে এবং পটাশিয়াম ধরে রাখে",
        "usage_en": "Aldosterone antagonist reducing myocardial fibrosis and mortality",
        "top_brands": [
          "Spiractin (Square)",
          "Aldotrol (Incepta)",
          "Spiron (Beximco)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "দৈনিক তরল পানীয় গ্রহণ ১.৫ লিটারের মধ্যে সীমাবদ্ধ রাখুন।",
      "প্রতিদিন সকালে একই পোশাকে ওজন মাপুন; ১-২ দিনে ২ কেজির বেশি ওজন বাড়লে চিকিৎসকের পরামর্শ নিন।",
      "লবণ একেবারেই কমিয়ে দিন (দৈনিক ২ গ্রামের নিচে)।",
      "মাঝারি ধরনের শ্বাসপ্রশ্বাসের ব্যায়াম করুন।"
    ],
    "lifestyle_diet_en": [
      "Fluid restriction to 1.5 - 2.0 liters daily.",
      "Daily morning weight monitoring; report weight gain > 2kg in 48 hours.",
      "Strict sodium restriction < 1.5 - 2g/day.",
      "Paced low-impact exercises and rest intervals."
    ],
    "emergency_warning_bn": "তীব্র শ্বাসকষ্ট, গোলাপি ফেনা কফ এবং শোয়া অবস্থায় দম বন্ধ হওয়ার অনুভূতি ফুসফুসে পানি জমে যাওয়া (Acute Pulmonary Edema) নির্দেশ করে। জরুরি অক্সিজেন প্রয়োজন।",
    "emergency_warning_en": "Acute worsening dyspnea with pink frothy sputum suggests acute pulmonary edema requiring urgent IV diuretics and oxygen therapy."
  },
  {
    "id": "bronchial-asthma",
    "name_en": "Bronchial Asthma",
    "name_bn": "ব্রঙ্কিয়াল অ্যাজমা (হাঁপানি)",
    "icd10": "J45",
    "system": "respiratory",
    "system_bn": "শ্বাসতন্ত্র",
    "organ": "Lungs (Bronchi)",
    "organ_icon": "🫁",
    "severity": "Moderate to High",
    "overview_bn": "শ্বাসনালীর দীর্ঘমেয়াদী প্রদাহ ও অতিরিক্ত সংবেদনশীলতা, যার ফলে ব্রঙ্কিওলগুলো সরু হয়ে শ্বাস নিতে ও ছাড়তে বাঁশির মতো শোঁ শোঁ শব্দ হয়।",
    "overview_en": "A chronic inflammatory disorder of the airways characterized by hyper-responsiveness, airflow obstruction, and wheezing.",
    "causes_bn": [
      "অ্যালার্জেন (ঘরের ধুলোবালি, মাইট, পরাগরেণু, পোষা প্রাণীর লোম)",
      "শ্বাসনালীর ভাইরাল সংক্রমণ ও ঠান্ডা আবহাওয়া",
      "বায়ুদূষণ, ধোঁয়া ও রাসায়নিক বাষ্প",
      "বংশগত অ্যালার্জি ও এটোপিক প্রবণতা"
    ],
    "causes_en": [
      "Environmental allergens (dust mites, pollen, animal dander, mold)",
      "Viral respiratory infections and cold dry air triggers",
      "Air pollution, tobacco smoke, noxious fumes",
      "Genetic predisposition and atopy"
    ],
    "risk_factors_bn": [
      "পারিবারিক হাঁপানির ইতিহাস",
      "ধূমপান বা পরোক্ষ ধূমপান",
      "অ্যালার্জিক রাইনাইটিস বা একজিমা থাকা",
      "মোটা হওয়া"
    ],
    "risk_factors_en": [
      "Family history of atopy",
      "Active or passive smoke exposure",
      "History of allergic rhinitis or eczema",
      "Obesity"
    ],
    "symptoms_bn": [
      "শ্বাস নেওয়ার সময় বুকে বাঁশির মতো শোঁ-শোঁ শব্দ (Wheezing)",
      "শ্বাসকষ্ট ও বুকে টান লাগা (বিশেষ করে রাতে বা ভোরের দিকে)",
      "ক্রমাগত শুকনো কাশি যা রাতে বা ঠান্ডা লাগলে বেড়ে যায়",
      "কথা বলতে গেলে শ্বাস ফুরিয়ে আসা"
    ],
    "symptoms_en": [
      "Expiratory wheezing",
      "Dyspnea, chest tightness especially nocturnal or early morning",
      "Recurrent dry cough aggravated by exercise or cold exposure",
      "Inability to complete full sentences in a single breath during flare-ups"
    ],
    "diagnostic_tests": [
      "Spirometry with Pre & Post Bronchodilator Reversibility Test",
      "Peak Expiratory Flow Rate (PEFR) Monitoring",
      "Fractional Exhaled Nitric Oxide (FeNO)",
      "Serum IgE & Complete Blood Count (Absolute Eosinophil Count AEC)",
      "Chest X-Ray (to exclude pneumonia/pneumothorax)"
    ],
    "medicines": [
      {
        "generic": "Salbutamol Inhaler (100 mcg)",
        "class": "Short-Acting Beta-2 Agonist (SABA) - Reliever",
        "usage_bn": "তীব্র শ্বাসকষ্টের সময় দ্রুত শ্বাসনালী খুলে দেয় (জরুরি মুহূর্তে ১-২ পাফ ইনহেলার)",
        "usage_en": "Rapid rescue bronchodilator for acute spasm (1-2 puffs PRN)",
        "top_brands": [
          "Azmasol (Beximco)",
          "Ventolin (GSK)",
          "Aerolin (Square)",
          "Salmol (Incepta)"
        ]
      },
      {
        "generic": "Budesonide + Formoterol",
        "class": "ICS + LABA (Inhaled Corticosteroid + Long-Acting Bronchodilator)",
        "usage_bn": "নিয়মিত ব্যবহার করে প্রদাহ দূর করে ও ভবিষ্যতে হাঁপানির আক্রমণ প্রতিরোধ করে (Preventer)",
        "usage_en": "Maintenance controller inhaler preventing airway inflammation and remodeling",
        "top_brands": [
          "Symbicort (AstraZeneca)",
          "Inhalon-F (Square)",
          "Bexitrol-F (Beximco)",
          "Pulmicort (AstraZeneca)"
        ]
      },
      {
        "generic": "Montelukast",
        "class": "Leukotriene Receptor Antagonist (LTRA)",
        "usage_bn": "শ্বাসনালীর প্রদাহ ও অ্যালার্জি হ্রাস করে (দৈনিক ১টি ১০ মিগ্রা রাতে)",
        "usage_en": "Oral anti-inflammatory leukotriene receptor antagonist (10 mg OD HS)",
        "top_brands": [
          "Monas (Square)",
          "Montene (Incepta)",
          "Odmon (Beximco)",
          "Lumona (Renata)"
        ]
      },
      {
        "generic": "Doxophylline",
        "class": "Xanthine Bronchodilator",
        "usage_bn": "দীর্ঘস্থায়ীভাবে শ্বাসনালী প্রসারিত রাখে ও ফুসফুসের ক্ষমতা বজায় রাখে (৪০০ মিগ্রা)",
        "usage_en": "Novel xanthine bronchodilator with superior tolerability profile (400 mg)",
        "top_brands": [
          "Doxiva (Square)",
          "Phyloconti (Beximco)",
          "Puf-400 (Incepta)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "ঘরের বালিশ, তোশক ও বিছানার চাদর সপ্তাহে অন্তত একবার গরম পানিতে ধুয়ে পরিষ্কার করুন।",
      "ধুলোবালিযুক্ত স্থানে অবশ্যই ভালো মানের মাস্ক পরিধান করুন।",
      "ঠান্ডা পানি, আইসক্রিম ও কৃত্রিম রঙযুক্ত খাবার পরিহার করুন।",
      "ইনহেলার ব্যবহারের সঠিক কৌশল (স্পেসার ব্যবহার ও গার্গল করা) নিশ্চিত করুন।"
    ],
    "lifestyle_diet_en": [
      "Encase mattress and pillows; wash bedding in hot water weekly to eliminate dust mites.",
      "Wear particulate respirator masks in dusty environments.",
      "Avoid known dietary triggers and icy beverages.",
      "Always use a spacer chamber with MDI inhalers and rinse mouth after steroid puffs."
    ],
    "emergency_warning_bn": "রেলিভার ইনহেলারেও শ্বাসকষ্ট না কমলে, ঠোঁট বা নখ নীল হয়ে আসলে এবং কথা বলতে না পারলে তাৎক্ষণিক নেবুলাইজার ও অক্সিজেন নিতে হাসপাতালে যান (Status Asthmaticus)।",
    "emergency_warning_en": "Severe exacerbation unresponsive to salbutamol with cyanosis, silent chest, or tachypnea requires immediate emergency department nebulization and IV steroids."
  },
  {
    "id": "copd",
    "name_en": "Chronic Obstructive Pulmonary Disease (COPD)",
    "name_bn": "সিওপিডি (ক্রনিক অবস্ট্রাকটিভ পালমোনারি ডিজিজ)",
    "icd10": "J44",
    "system": "respiratory",
    "system_bn": "শ্বাসতন্ত্র",
    "organ": "Lungs (Alveoli & Airway)",
    "organ_icon": "🫁",
    "severity": "High",
    "overview_bn": "ফুসফুসের দীর্ঘমেয়াদী অপরিবর্তনযোগ্য ক্ষতি যা শ্বাসনালীকে সরু করে ফেলে এবং বায়ুথলিগুলোকে (Alveoli) ধ্বংস করে স্থায়ী শ্বাসকষ্ট তৈরি করে।",
    "overview_en": "A progressive, largely irreversible lung disease characterized by long-term breathing problems and poor airflow due to emphysema and chronic bronchitis.",
    "causes_bn": [
      "দীর্ঘদিনের প্রত্যক্ষ বা পরোক্ষ ধূমপান (বিড়ি ও সিগারেট)",
      "গ্রামাঞ্চলে রান্নার মাটির চুলার বায়োমাস ধোঁয়া (Biomass Fuel Smoke)",
      "কলকারখানার বিষাক্ত রাসায়নিক গ্যাস ও ধূলিকণা",
      "আলফা-১ অ্যান্টিট্রিপসিন ঘাটতি (Alpha-1 Antitrypsin Deficiency)"
    ],
    "causes_en": [
      "Chronic cigarette/bidi smoking (major causative agent in >85% cases)",
      "Indoor air pollution from biomass cooking stoves in poorly ventilated kitchens",
      "Occupational dust and noxious chemical exposure",
      "Genetic Alpha-1 Antitrypsin deficiency"
    ],
    "risk_factors_bn": [
      "৪০ বছরের বেশি বয়সীদের দীর্ঘমেয়াদী ধূমপানের ইতিহাস",
      "কয়লাখনি বা টেক্সটাইল কারখানায় কাজ",
      "বায়ুদূষণ"
    ],
    "risk_factors_en": [
      "Heavy smoking history (>20 pack-years)",
      "Occupational particulate exposure",
      "Chronic respiratory infections"
    ],
    "symptoms_bn": [
      "দীর্ঘস্থায়ী কাশি যাতে প্রায় প্রতিদিন কফ বা শ্লেষ্মা নির্গত হয়",
      "সামান্য পরিশ্রমেই শ্বাস ফুরিয়ে যাওয়া এবং ক্রমাগত শ্বাসকষ্ট বৃদ্ধি",
      "বুকে ভারী ভাব ও শোঁ-শোঁ শব্দ",
      "শরীর ভেঙে যাওয়া, ক্ষুধা মন্দা ও ক্লান্তি"
    ],
    "symptoms_en": [
      "Chronic productive cough with daily sputum production",
      "Progressive exertional dyspnea",
      "Chest tightness and prolonged expiratory phase",
      "Weight loss and skeletal muscle wasting"
    ],
    "diagnostic_tests": [
      "Post-Bronchodilator Spirometry (FEV1/FVC < 0.70 confirms obstruction)",
      "High Resolution CT (HRCT) of Chest (evaluating emphysema)",
      "Arterial Blood Gas (ABG - monitoring PaO2 and PaCO2)",
      "6-Minute Walk Test (6MWT)",
      "Chest X-Ray (hyperinflated lung fields, flattened diaphragms)"
    ],
    "medicines": [
      {
        "generic": "Tiotropium Bromide",
        "class": "Long-Acting Muscarinic Antagonist (LAMA)",
        "usage_bn": "শ্বাসনালীর মাংসপেশি দীর্ঘ ২৪ ঘণ্টা শিথিল রেখে শ্বাস চলাচল স্বাভাবিক রাখে",
        "usage_en": "Once-daily maintenance anticholinergic bronchodilator improving FEV1 and quality of life",
        "top_brands": [
          "Tiozest (Square)",
          "Tiocair (Incepta)",
          "Spiriva (Boehringer)"
        ]
      },
      {
        "generic": "Glycopyrronium + Formoterol",
        "class": "Dual Bronchodilator (LAMA + LABA)",
        "usage_bn": "উন্নত দ্বৈত ব্রঙ্কোডাইলেটর যা তীব্র সিওপিডি নিয়ন্ত্রণে অত্যন্ত কার্যকর",
        "usage_en": "Synergistic dual bronchodilation targeting both adrenergic and cholinergic receptors",
        "top_brands": [
          "Bevespi Aerosphere",
          "Duotres (Incepta)",
          "Glyco-F (Square)"
        ]
      },
      {
        "generic": "N-Acetylcysteine (NAC 600mg)",
        "class": "Mucolytic & Powerful Antioxidant",
        "usage_bn": "ঘন কফ পাতলা করে সহজে বের করে দেয় এবং ফুসফুসের প্রদাহ কমায়",
        "usage_en": "Breaks disulfide bonds in mucus and restores glutathione stores in lung tissue",
        "top_brands": [
          "Cysnac (Square)",
          "Fluimucil",
          "Mucopect (Incepta)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "ধূমপান ১ মিনিটের জন্যও আর স্পর্শ করবেন না (ধূমপান ত্যাগই ফুসফুসের পতন ঠেকাতে পারে)।",
      "বার্ষিক ইনফ্লুয়েঞ্জা ও নিউমোকক্কাল ভ্যাকসিন গ্রহণ করুন।",
      "পালমোনারি রিহ্যাবিলিটেশন ও পার্সড-লিপ ব্রিদিং (Pursed-lip breathing) কৌশল শিখুন।",
      "প্রয়োজনে চিকিৎসকের পরামর্শ অনুযায়ী হোম অক্সিজেন কনসেনট্রেটর ব্যবহার করুন।"
    ],
    "lifestyle_diet_en": [
      "Immediate absolute cessation of tobacco smoking.",
      "Annual influenza and pneumococcal vaccinations.",
      "Pulmonary rehabilitation and diaphragmatic/pursed-lip breathing exercises.",
      "Prescribed Long-Term Oxygen Therapy (LTOT) for chronic hypoxemia."
    ],
    "emergency_warning_bn": "কফের রঙ হলুদ/সবুজ হয়ে যাওয়া, তীব্র শ্বাসকষ্ট এবং রক্তে অক্সিজেনের মাত্রা (SpO2) ৮৮% এর নিচে নেমে গেলে তাৎক্ষণিক আইসিইউ/এইচডিইউতে ভর্তি করতে হবে।",
    "emergency_warning_en": "Acute exacerbation with purulent sputum, respiratory failure, and SpO2 < 88% mandates urgent hospital admission for non-invasive ventilation (NIV)."
  },
  {
    "id": "pneumonia",
    "name_en": "Pneumonia",
    "name_bn": "নিউমোনিয়া (ফুসফুসের তীব্র সংক্রমণ)",
    "icd10": "J18",
    "system": "respiratory",
    "system_bn": "শ্বাসতন্ত্র",
    "organ": "Lungs (Alveoli)",
    "organ_icon": "🫁",
    "severity": "Critical",
    "overview_bn": "এক বা উভয় ফুসফুসের অ্যালভিওলাই বা বায়ুথলিতে ব্যাকটেরিয়াল বা ভাইরাল সংক্রমণ, যার ফলে সেখানে পুঁজ ও তরল জমে তীব্র শ্বাসকষ্ট তৈরি হয়।",
    "overview_en": "An acute inflammatory infection of one or both lungs' alveoli, causing them to fill with pus and fluid, hindering oxygen exchange.",
    "causes_bn": [
      "ব্যাকটেরিয়া (Streptococcus pneumoniae, Klebsiella, Haemophilus influenzae)",
      "ভাইরাস (Influenza, RSV, SARS-CoV-2)",
      "অ্যাটিপিকাল জীবাণু (Mycoplasma pneumoniae, Legionella)",
      "রোগ প্রতিরোধ ক্ষমতা কমে যাওয়া ও অ্যাসপিরেশন"
    ],
    "causes_en": [
      "Bacterial pathogens (Streptococcus pneumoniae most common, Klebsiella)",
      "Viral pathogens (Influenza A/B, Respiratory syncytial virus, Coronaviruses)",
      "Atypical bacteria (Mycoplasma, Chlamydia pneumoniae)",
      "Aspiration of oral or gastric secretions in elderly or debilitated patients"
    ],
    "risk_factors_bn": [
      "শিশু (<৫ বছর) ও প্রবীণ (৬৫+)",
      "দুর্বল রোগ প্রতিরোধ ক্ষমতা",
      "সিওপিডি বা ডায়াবেটিস",
      "হাসপাতালে দীর্ঘ অবস্থান"
    ],
    "risk_factors_en": [
      "Extremes of age (<5 or >65)",
      "Immunocompromised states",
      "Chronic conditions like COPD, DM",
      "Mechanical ventilation"
    ],
    "symptoms_bn": [
      "তীব্র জ্বর ও কাঁপুনি দিয়ে শীত লাগা",
      "বুকে সুঁচ ফোটার মতো ব্যথা যা দীর্ঘশ্বাস নিলে বা কাশলে তীব্র হয় (Pleuritic chest pain)",
      "হলুদ, সবুজ বা মরিচা রঙের কফসহ কাশি",
      "দ্রুত অগভীর শ্বাসপ্রশ্বাস ও শ্বাসকষ্ট",
      "প্রবীণদের ক্ষেত্রে তীব্র বিভ্রান্তি বা মানসিক ভারসাম্যহীনতা (Confusion)"
    ],
    "symptoms_en": [
      "High grade fever accompanied by rigors and chills",
      "Pleuritic stabbing chest pain exacerbated by deep inspiration and coughing",
      "Productive cough with purulent or rust-colored sputum",
      "Tachypnea and dyspnea",
      "Altered mental status/confusion, especially in geriatric patients"
    ],
    "diagnostic_tests": [
      "Chest X-Ray PA View (Consolidation / Infiltrates)",
      "Complete Blood Count (Leukocytosis with Left Shift / high Neutrophils)",
      "C-Reactive Protein (CRP) & Procalcitonin",
      "Sputum Gram Stain & Culture Sensitivity",
      "Pulse Oximetry for Oxygen Saturation"
    ],
    "medicines": [
      {
        "generic": "Amoxicillin + Clavulanic Acid",
        "class": "Beta-Lactam + Beta-Lactamase Inhibitor",
        "usage_bn": "কমিউনিটি একোয়ার্ড নিউমোনিয়ায় প্রথম সারির শক্তিশালী অ্যান্টিবায়োটিক (৬২৫ মিগ্রা / ১ গ্রাম)",
        "usage_en": "First-line empirical broad-spectrum coverage for bacterial pneumonia",
        "top_brands": [
          "Moxacil Clav (Square)",
          "Fimoxyl Clav (Beximco)",
          "A-Klav (Incepta)",
          "Enhancin (Ranbaxy)"
        ]
      },
      {
        "generic": "Azithromycin",
        "class": "Macrolide Antibiotic",
        "usage_bn": "অ্যাটিপিকাল নিউমোনিয়া ও শ্বাসনালীর সংক্রমণে কার্যকর (৫০০ মিগ্রা দৈনিক ১ বার)",
        "usage_en": "Macrolide covering atypical respiratory pathogens (500 mg OD)",
        "top_brands": [
          "Zithrin (Square)",
          "Azyth (Incepta)",
          "Macrozith (Beximco)",
          "Zimax (Square)"
        ]
      },
      {
        "generic": "Ceftriaxone (IV Injection)",
        "class": "3rd Generation Cephalosporin",
        "usage_bn": "হাসপাতালে ভর্তি গুরুতর নিউমোনিয়ায় শিরার মাধ্যমে শিরায় প্রয়োগযোগ্য অ্যান্টিবায়োটিক (১-২ গ্রাম)",
        "usage_en": "Parenteral therapy for moderate to severe hospitalized pneumonia",
        "top_brands": [
          "Rocephin (Roche)",
          "Ceftron (Square)",
          "Oricef (Incepta)",
          "Traxyl (Beximco)"
        ]
      },
      {
        "generic": "Paracetamol 500mg/665mg",
        "class": "Antipyretic & Analgesic",
        "usage_bn": "জ্বর নিয়ন্ত্রণ এবং বুকের ব্যথা উপশম করতে",
        "usage_en": "Fever and pleuritic discomfort management",
        "top_brands": [
          "Napa (Beximco)",
          "Ace (Square)",
          "Renova (Renata)",
          "Fast (Acme)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "পর্যাপ্ত বিশ্রাম নিন এবং প্রচুর তরল খাবার (স্যুপ, ডাবের পানি, কুসুম গরম পানি) পান করুন।",
      "শ্বাসকষ্ট উপশমে বুকে হালকা গরম সেঁক ও ভাপ (Steam inhalation) নিতে পারেন।",
      "অ্যান্টিবায়োটিকের পুরো কোর্স সম্পূর্ণ করুন, সুস্থ অনুভব করলেও কোর্স অসম্পূর্ণ রাখবেন না।",
      "ধোঁয়া ও ঠান্ডা থেকে দূরে থাকুন।"
    ],
    "lifestyle_diet_en": [
      "Bed rest and maintain aggressive oral hydration (clear broths, electrolyte fluids).",
      "Humidified air or warm steam inhalation to loosen tenacious secretions.",
      "Strict completion of prescribed antimicrobial regimen to prevent drug resistance.",
      "Avoid exposure to chilling winds and cigarette smoke."
    ],
    "emergency_warning_bn": "শ্বাসপ্রশ্বাসের গতি মিনিটে ৩০ এর বেশি হলে, রক্তে অক্সিজেন ৯২% এর নিচে নামলে, বা ঠোঁট নীল হলে অবিলম্বে জরুরি বিভাগে ভর্তি করুন।",
    "emergency_warning_en": "Respiratory rate >30/min, SpO2 <92%, low blood pressure, or confusion score high on CURB-65 criteria demands urgent hospital admission."
  },
  {
    "id": "peptic-ulcer-disease",
    "name_en": "Peptic Ulcer Disease & Gastritis",
    "name_bn": "পেপটিক আলসার ও তীব্র গ্যাস্ট্রাইটিস",
    "icd10": "K27 / K29",
    "system": "gastrointestinal",
    "system_bn": "পরিপাকতন্ত্র",
    "organ": "Stomach & Duodenum",
    "organ_icon": "🥣",
    "severity": "Moderate to High",
    "overview_bn": "পাকস্থলী বা ডুওডেনামের শ্লৈষ্মিক আস্তরণে ক্ষত তৈরি হওয়া যা হাইড্রোক্লোরিক অ্যাসিড ও পেপসিনের কারণে মারাত্মক জ্বালাপোড়া ও ক্ষয় ঘটায়।",
    "overview_en": "Sores that develop on the inside lining of stomach (gastric ulcer) and upper portion of small intestine (duodenal ulcer).",
    "causes_bn": [
      "হেলিকোব্যাকটার পাইলোরি (Helicobacter pylori) ব্যাকটেরিয়ার সংক্রমণ",
      "নিয়মিত ব্যথানাশক ওষুধ (NSAIDs যেমন ডাইক্লোফেনাক, আইবুপ্রোফেন, কেটোরোলাক) সেবন",
      "অনিয়মিত খাদ্যাভ্যাস ও দীর্ঘক্ষণ না খেয়ে থাকা",
      "অতিরিক্ত ধূমপান, অ্যালকোহল ও অতিমাত্রায় মসলাযুক্ত ভাজাপোড়া খাবার"
    ],
    "causes_en": [
      "Helicobacter pylori chronic mucosal colonization",
      "Regular use of nonsteroidal anti-inflammatory drugs (NSAIDs) inhibiting prostaglandin",
      "Prolonged fasting and erratic meal timings",
      "Excessive alcohol, smoking, and high-stress hyperchlorhydria"
    ],
    "risk_factors_bn": [
      "ব্যথানাশক বা স্টেরয়েড ওষুধ সেবন",
      "ধূমপান",
      "মানসিক চাপ",
      "বংশের ইতিহাস"
    ],
    "risk_factors_en": [
      "Chronic NSAID/steroid use",
      "Cigarette smoking",
      "Psychological stress",
      "Blood group O predilection"
    ],
    "symptoms_bn": [
      "পেটের উপরিভাগে (নাভির উপরে) জ্বালাপোড়া বা কামড়ানো ব্যথা",
      "খালি পেটে ব্যথা বেড়ে যাওয়া এবং খাবার বা অ্যান্টাসিড খেলে কিছুটা আরাম লাগা (Duodenal Ulcer)",
      "খাবার খাওয়ার পরপরই ব্যথা বেড়ে যাওয়া (Gastric Ulcer)",
      "ঢেকুর ওঠা, পেট ফাঁপা ও বমি বমি ভাব",
      "ক্ষুধা কমে যাওয়া ও ওজন হ্রাস"
    ],
    "symptoms_en": [
      "Epigastric burning or gnawing pain",
      "Pain worse on empty stomach, relieved by eating or antacids (Duodenal)",
      "Pain triggered immediately after meals (Gastric)",
      "Belching, bloating, nausea, waterbrash",
      "Anorexia and unintended weight loss"
    ],
    "diagnostic_tests": [
      "Upper Gastrointestinal Endoscopy with Biopsy (Gold Standard)",
      "H. pylori Stool Antigen Test / Urea Breath Test (UBT)",
      "Complete Blood Count (evaluating chronic iron deficiency anemia)",
      "Fecal Occult Blood Test (FOBT)"
    ],
    "medicines": [
      {
        "generic": "Esomeprazole / Pantoprazole",
        "class": "Proton Pump Inhibitor (PPI)",
        "usage_bn": "পাকস্থলীর অ্যাসিড তৈরি বন্ধ করে আলসার দ্রুত শুকিয়ে তোলে (২০-৪০ মিগ্রা সকালে খালি পেটে)",
        "usage_en": "Potently suppresses gastric acid secretion by blocking H+/K+ ATPase pump (20-40 mg OD AC)",
        "top_brands": [
          "Nexum (Square)",
          "Sergel (Beximco)",
          "Proceptin (Incepta)",
          "Pantobex (Beximco)"
        ]
      },
      {
        "generic": "H. pylori Kit (Clarithromycin + Amoxicillin + Esomeprazole)",
        "class": "Triple Therapy Eradication Kit",
        "usage_bn": "১৪ দিনের কমপ্লিট ট্রিপল থেরাপি যা এইচ. পাইলোরি ব্যাকটেরিয়া নির্মূল করে",
        "usage_en": "14-day standard triple therapy regimen to eradicate H. pylori",
        "top_brands": [
          "Hp-Kit (Square)",
          "Pylokit (Beximco)",
          "Helicook (Incepta)"
        ]
      },
      {
        "generic": "Sucralfate + Oxetacaine",
        "class": "Mucosal Protective & Topical Anesthetic",
        "usage_bn": "আলসারের ক্ষতের উপর প্রলেপ তৈরি করে এসিডের আক্রমণ থেকে রক্ষা করে ও দ্রুত ব্যথা কমায়",
        "usage_en": "Forms protective adherent barrier over ulcer crater against acid-pepsin digestion",
        "top_brands": [
          "Ulcid (Square)",
          "Mucosa (Incepta)",
          "Sucral (Renata)"
        ]
      },
      {
        "generic": "Magaldrate + Simethicone",
        "class": "Antacid & Antiflatulent Suspension",
        "usage_bn": "তীব্র অ্যাসিড জ্বালা ও পেট ফাঁপা তৎক্ষণাৎ প্রশমিত করতে",
        "usage_en": "Instant neutralization of stomach acid and dispersion of trapped gas bubbles",
        "top_brands": [
          "Marlox (Square)",
          "Novagid (Beximco)",
          "Simag (Incepta)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "নির্দিষ্ট সময়ে খাবার খান; কখনোই দীর্ঘ সময় পেট সম্পূর্ণ খালি রাখবেন না।",
      "অতিরিক্ত ঝাল, চর্বিযুক্ত খাবার, চা ও কফি পরিহার করুন।",
      "খাবার গ্রহণের অন্তত ২ ঘণ্টা পর ঘুমাতে যান।",
      "চিকিৎসকের পরামর্শ ছাড়া নিজে নিজে ব্যথানাশক ওষুধ খাবেন না।"
    ],
    "lifestyle_diet_en": [
      "Eat smaller, regular meals; avoid skipping breakfast or prolonged fasting.",
      "Eliminate hot chili peppers, raw spices, deep-fried snacks, and black coffee.",
      "Avoid recumbency for at least 2 hours post-prandial.",
      "Never consume OTC NSAID painkillers without a co-prescribed gastroprotective PPI."
    ],
    "emergency_warning_bn": "কালো রঙের আলকাতরার মতো পায়খানা (Melena), কফির মতো দানাদার রক্তবমি বা হঠাৎ পেটে ছুরি মারার মতো তীব্র ব্যথা অনুভব হলে আলসার ছিদ্র বা রক্তক্ষরণ হতে পারে। তাৎক্ষণিক সার্জারি জরুরি।",
    "emergency_warning_en": "Black tarry stools (melena), hematemesis (coffee-ground vomit), or sudden rigid peritonitis signs denote perforation or active bleed. Immediate surgical intervention needed."
  },
  {
    "id": "gerd",
    "name_en": "Gastroesophageal Reflux Disease (GERD)",
    "name_bn": "জিইআরডি (অ্যাসিড রিফ্লাক্স ও বুকজ্বালা)",
    "icd10": "K21",
    "system": "gastrointestinal",
    "system_bn": "পরিপাকতন্ত্র",
    "organ": "Esophagus & Lower Esophageal Sphincter",
    "organ_icon": "🥣",
    "severity": "Moderate",
    "overview_bn": "পাকস্থলীর অ্যাসিড ও খাদ্যবস্তু উল্টো দিকে খাদ্যনালীতে উঠে আসা, যার ফলে খাদ্যনালীর নিচের অংশের স্পিংটার শিথিল হয়ে মারাত্মক বুকজ্বালা ও গলার অস্বস্তি হয়।",
    "overview_en": "A digestive disease where stomach acid or bile irritates the food pipe lining due to transient relaxation of lower esophageal sphincter (LES).",
    "causes_bn": [
      "লোয়ার খাদ্যনালীর ভালভ (LES) দুর্বল বা শিথিল হয়ে যাওয়া",
      "হায়াটাস হার্নিয়া (Hiatus Hernia)",
      "স্থূলতা ও পেটের অতিরিক্ত চাপ",
      "ভারী খাবার খাওয়ার পরপরই শুয়ে পড়া",
      "ধূমপান ও ক্যাফেইনযুক্ত পানীয়"
    ],
    "causes_en": [
      "Transient lower esophageal sphincter relaxation (TLESR)",
      "Hiatal hernia displacing the gastroesophageal junction",
      "Elevated intra-abdominal pressure from central obesity",
      "Post-prandial recumbency",
      "High intake of chocolate, peppermint, alcohol, and caffeine"
    ],
    "risk_factors_bn": [
      "স্থূলতা",
      "গর্ভাবস্থা",
      "ধূমপান",
      "দেরিতে রাতের খাবার খাওয়া"
    ],
    "risk_factors_en": [
      "Obesity",
      "Pregnancy",
      "Tobacco smoking",
      "Late-night dinner habits"
    ],
    "symptoms_bn": [
      "বুকে জ্বালাপোড়া (Heartburn) যা গলার দিকে উঠে আসে",
      "মুখে টক বা তিক্ত স্বাদের পানি উঠে আসা (Acid Regurgitation)",
      "গলায় কিছু আটকে থাকার অনুভূতি (Globus Sensation)",
      "দীর্ঘস্থায়ী শুকনো কাশি ও কণ্ঠস্বর ভেঙে যাওয়া (Hoarseness of voice)",
      "খাবার গিলতে কষ্ট হওয়া (Dysphagia)"
    ],
    "symptoms_en": [
      "Retrosternal pyrosis (burning sensation rising into throat)",
      "Acid regurgitation and waterbrash",
      "Globus hystericus (sensation of lump in throat)",
      "Chronic non-productive cough, wheeze, and laryngitis",
      "Odynophagia or progressive dysphagia"
    ],
    "diagnostic_tests": [
      "24-Hour Ambulatory Esophageal pH & Impedance Monitoring",
      "Upper GI Endoscopy (identifying Reflux Esophagitis, Barrett's Esophagus)",
      "High-Resolution Esophageal Manometry",
      "Barium Swallow Study"
    ],
    "medicines": [
      {
        "generic": "Dexlansoprazole",
        "class": "Dual Delayed-Release PPI",
        "usage_bn": "দ্বৈত নিঃসরণ প্রযুক্তির মাধ্যমে পুরো ২৪ ঘণ্টা অ্যাসিড নিয়ন্ত্রণ করে বুকজ্বালা বন্ধ রাখে (৩০-৬০ মিগ্রা)",
        "usage_en": "Advanced dual delayed release PPI offering extended 24-hour pH control (30-60 mg OD)",
        "top_brands": [
          "Dexpant (Square)",
          "Delix (Beximco)",
          "D-Praz (Incepta)"
        ]
      },
      {
        "generic": "Sodium Alginate + Potassium Bicarbonate",
        "class": "Raft-Forming Oral Suspension",
        "usage_bn": "পাকস্থলীর ওপর ভাসমান আলজিনেট জেল স্তর তৈরি করে অ্যাসিড খাদ্যনালীতে ওঠা সম্পূর্ণ ঠেকায়",
        "usage_en": "Creates a physical mechanical foam barrier floating on stomach contents preventing reflux",
        "top_brands": [
          "Gaviscon (Reckitt)",
          "Algitab (Square)",
          "Gastral (Incepta)",
          "Refcon (Beximco)"
        ]
      },
      {
        "generic": "Itopride / Domperidone",
        "class": "Prokinetic Agent",
        "usage_bn": "পাকস্থলী দ্রুত খালি করে এবং খাদ্যনালীর নিচের ভালভের শক্তি বৃদ্ধি করে",
        "usage_en": "Enhances gastric emptying and increases lower esophageal sphincter tone",
        "top_brands": [
          "Itopride (Square)",
          "Motigut (Square)",
          "Deflux (Beximco)",
          "Domin (Incepta)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "ঘুমানোর বিছানার মাথার দিকটি ৬ থেকে ৮ ইঞ্চি উঁচু করে রাখুন (অতিরিক্ত বালিশ নয়, খাটের পায়া উঁচু করুন)।",
      "রাতের খাবার ঘুমানোর অন্তত ৩ ঘণ্টা পূর্বে শেষ করুন।",
      "চকলেট, চা, কোল্ড ড্রিংকস ও অতিরিক্ত তেলে ভাজা খাবার বর্জন করুন।",
      "টাইট পোশাক বা অতিরিক্ত বেল্ট পরা পরিহার করুন।"
    ],
    "lifestyle_diet_en": [
      "Elevate head of bed by 6-8 inches using bed risers (not stacks of pillows).",
      "Allow at least 3 hours interval between dinner and bedtime.",
      "Strictly avoid mint, chocolate, carbonated sodas, and heavy deep-fried food.",
      "Wear loose clothing; avoid tight abdominal belts or corsets."
    ],
    "emergency_warning_bn": "খাবার গিলতে ক্রমাগত বাধা সৃষ্টি হওয়া, দ্রুত ওজন হ্রাস বা রক্তবমি দেখা দিলে খাদ্যনালীর সংকোচন বা টিউমার নির্ণয়ে জরুরি এন্ডোস্কোপি করান।",
    "emergency_warning_en": "Progressive dysphagia, unintentional weight loss, or persistent hematemesis requires urgent endoscopy to rule out stricture or esophageal adenocarcinoma."
  },
  {
    "id": "appendicitis",
    "name_en": "Acute Appendicitis",
    "name_bn": "তীব্র অ্যাপেন্ডিসাইটিস (অ্যাপেন্ডিক্সের প্রদাহ)",
    "icd10": "K35",
    "system": "gastrointestinal",
    "system_bn": "পরিপাকতন্ত্র",
    "organ": "Appendix & Cecum",
    "organ_icon": "🥣",
    "severity": "Critical",
    "overview_bn": "বৃহদান্ত্রের সাথে যুক্ত ছোট থলি অ্যাপেন্ডিক্সের ভেতর মল বা লিম্ফয়েড টিস্যু আটকে গিয়ে ব্যাকটেরিয়াল ইনফেকশন ও তীব্র প্রদাহ সৃষ্টি হওয়া। এটি একটি জরুরি সার্জিক্যাল রোগ।",
    "overview_en": "Acute inflammation of the vermiform appendix, typically caused by luminal obstruction, representing the most common surgical acute abdomen.",
    "causes_bn": [
      "শক্ত শুকনো মলের দলা (Fecalith) দ্বারা অ্যাপেন্ডিক্সের মুখ বন্ধ হয়ে যাওয়া",
      "ভাইরাল বা ব্যাকটেরিয়াল সংক্রমণে লিম্ফয়েড ফলিকল ফুলে ওঠা",
      "অন্ত্রের পরজীবী কৃমি বা বীজ আটকে যাওয়া",
      "টিউমার বা কার্সিনয়েড দ্বারা অবরুদ্ধ হওয়া"
    ],
    "causes_en": [
      "Appendiceal lumen obstruction by a fecalith (hard fecal mass)",
      "Lymphoid follicular hyperplasia secondary to enteric infection",
      "Foreign bodies, seeds, or intestinal parasites (Enterobius vermicularis)",
      "Neoplasm or carcinoid tumor"
    ],
    "risk_factors_bn": [
      "১০ থেকে ৩০ বছর বয়সীদের ক্ষেত্রে সর্বাধিক",
      "কম ফাইবারযুক্ত প্রক্রিয়াজাত খাবার",
      "পারিবারিক প্রবণতা"
    ],
    "risk_factors_en": [
      "Age 10-30 years (peak incidence)",
      "Low dietary fiber intake",
      "Family history"
    ],
    "symptoms_bn": [
      "প্রথমে নাভির চারপাশে অস্বস্তিকর ব্যথা শুরু হয়ে কয়েক ঘণ্টা পর পেটের নিচে ডান পাশে (McBurney's Point) তীব্র স্থায়ী রূপ ধারণ করা",
      "তলপেটের ডান পাশে চাপ দিলে বা চাপ ছেড়ে দিলে অসহ্য ব্যথা (Rebound Tenderness)",
      "ব্যথা শুরু হওয়ার পরপরই বমি বমি ভাব বা বমি",
      "হালকা থেকে মাঝারি জ্বর ও ক্ষুধামন্দা",
      "হাঁটাহাঁটি করলে, কাশির দিলে বা ঝাঁকুনি লাগলে ব্যথা বহুগুণ বেড়ে যাওয়া"
    ],
    "symptoms_en": [
      "Periumbilical colicky pain migrating to right lower quadrant (McBurney's point)",
      "Right iliac fossa localized tenderness, guarding, and rebound tenderness (Blumberg sign)",
      "Anorexia, nausea, and vomiting following pain onset",
      "Low-grade fever (37.5 - 38.5 C)",
      "Pain aggravated by coughing, walking, or sudden movement (Rovsing/Psoas sign positive)"
    ],
    "diagnostic_tests": [
      "Ultrasonography of Lower Abdomen (Aperistaltic blind-ended non-compressible tube > 6mm)",
      "Contrast-Enhanced CT of Abdomen (Highest diagnostic accuracy >95%)",
      "Complete Blood Count (Leukocytosis with neutrophilia > 10,000/uL)",
      "C-Reactive Protein (Elevated CRP)"
    ],
    "medicines": [
      {
        "generic": "Laparoscopic / Open Appendectomy",
        "class": "Definitive Surgical Removal",
        "usage_bn": "প্রদাহযুক্ত অ্যাপেন্ডিক্স ফেটে যাওয়ার আগেই ল্যাপারোস্কোপিক অস্ত্রোপচারের মাধ্যমে কেটে ফেলা",
        "usage_en": "Emergency definitive surgical excision of inflamed appendix before perforation",
        "top_brands": [
          "Emergency Surgical Procedure"
        ]
      },
      {
        "generic": "Ceftriaxone + Metronidazole (IV)",
        "class": "Pre & Post-Operative Antibiotics",
        "usage_bn": "অস্ত্রোপচারের পূর্বে ও পরে পেটের অভ্যন্তরীণ সংক্রমণ ও পেরিটোনাইটিস প্রতিরোধে শিরায় প্রয়োগ",
        "usage_en": "Broad-spectrum parenteral coverage against Gram-negative enteric bacilli and anaerobes",
        "top_brands": [
          "Ceftron IV (Square)",
          "Amodis IV (Square)",
          "Flamyd IV (Incepta)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "অ্যাপেন্ডিসাইটিসের সন্দেহ হলে রোগীকে মুখে খাবার বা পানি দেওয়া সম্পূর্ণ বন্ধ রাখুন (NPO - Nil Per Os)।",
      "ব্যথা কমানোর জন্য পেটে কখনোই গরম পানির সেঁক দেবেন না (এতে অ্যাপেন্ডিক্স ফেটে যাওয়ার ঝুঁকি থাকে)।",
      "ডাক্তার দেখানোর পূর্বে তীব্র ব্যথানাশক বা জোলাপ (Laxative) সেবন করাবেন না।",
      "তাৎক্ষণিক জেনারেল সার্জনের শরণাপন্ন হোন।"
    ],
    "lifestyle_diet_en": [
      "Keep patient strictly NPO (nothing by mouth) in preparation for anesthesia/surgery.",
      "NEVER apply a heating pad to the abdomen (increases risk of rupture/perforation).",
      "Avoid strong analgesics or enemas/laxatives prior to surgical clinical evaluation.",
      "Immediate hospital transport to a surgical facility."
    ],
    "emergency_warning_bn": "হঠাৎ ব্যথা সাময়িক কমে গিয়ে আবার তীব্র জ্বরসহ পুরো পেট ফুলে শক্ত হয়ে যাওয়া অ্যাপেন্ডিক্স ফেটে যাওয়া (Ruptured Appendix & Peritonitis) নির্দেশ করে। কয়েক ঘণ্টার মধ্যে সেপটিক শকে মৃত্যু হতে পারে।",
    "emergency_warning_en": "Sudden cessation of pain followed by intense generalized peritonitis, rigid abdomen, and septic shock indicates appendiceal perforation. Immediate exploratory laparotomy required."
  },
  {
    "id": "fatty-liver-disease",
    "name_en": "Non-Alcoholic Fatty Liver Disease (NAFLD) & NASH",
    "name_bn": "ফ্যাটি লিভার (যকৃতে চর্বি জমা ও ন্যাশ)",
    "icd10": "K76.0",
    "system": "hepatobiliary",
    "system_bn": "যকৃৎ ও হেপাটোবিলিয়ারি",
    "organ": "Liver",
    "organ_icon": "🫀",
    "severity": "Moderate to High",
    "overview_bn": "অ্যালকোহল গ্রহণ না করা সত্ত্বেও যকৃতের কোষে অতিরিক্ত ট্রাইগ্লিসারাইড ও চর্বি জমা হওয়া। পরবর্তীতে এটি লিভারে প্রদাহ (NASH), ফাইব্রোসিস ও সিরোসিস ঘটাতে পারে।",
    "overview_en": "Excessive fat accumulation in hepatocytes exceeding 5% of liver weight, progressing from simple steatosis to non-alcoholic steatohepatitis (NASH) and cirrhosis.",
    "causes_bn": [
      "অতিরিক্ত কার্বোহাইড্রেট ও ফ্রুক্টোজসমৃদ্ধ প্রক্রিয়াজাত চিনিযুক্ত খাবার খাওয়া",
      "ইনসুলিন রেজিস্ট্যান্স ও টাইপ-২ ডায়াবেটিস",
      "স্থূলতা (বিশেষ করে পেটের ভিসেরাল ফ্যাট)",
      "রক্তে অতিরিক্ত কোলেস্টেরল ও ট্রাইগ্লিসারাইড",
      "শারীরিক ব্যায়ামহীন অলস জীবন"
    ],
    "causes_en": [
      "High dietary intake of refined carbs and high-fructose corn syrup",
      "Insulin resistance leading to free fatty acid flux to liver",
      "Central/visceral obesity and metabolic syndrome",
      "Dyslipidemia with high triglycerides and low HDL",
      "Sedentary lifestyle and skeletal muscle inactivity"
    ],
    "risk_factors_bn": [
      "মেটাবলিক সিন্ড্রোম",
      "পলিসিস্টিক ওভারি সিন্ড্রোম (PCOS)",
      "হাইপোথাইরয়েডিজম",
      "উচ্চ রক্তচাপ"
    ],
    "risk_factors_en": [
      "Metabolic syndrome",
      "Polycystic ovary syndrome",
      "Hypothyroidism",
      "Sleep apnea syndrome"
    ],
    "symptoms_bn": [
      "প্রাথমিক পর্যায়ে কোনো উপসর্গ নাও থাকতে পারে (Silent disease)",
      "পেটের ডান পাশে পাঁজরের নিচে ভারী ভাব বা মৃদু অস্বস্তি",
      "ক্রমাগত অবসাদ, দুর্বলতা ও দ্রুত ক্লান্ত হয়ে পড়া",
      "পরবর্তী পর্যায়ে ত্বক ও চোখের সাদা অংশ হলুদ হয়ে আসা (জন্ডিস)"
    ],
    "symptoms_en": [
      "Asymptomatic in early stages; incidental finding on routine screening",
      "Right upper quadrant dull aching discomfort or fullness",
      "Chronic malaise and profound fatigue",
      "Progression symptoms: pruritus, mild jaundice, spider angiomas"
    ],
    "diagnostic_tests": [
      "Ultrasonography of Whole Abdomen (increased echogenicity/bright liver)",
      "Liver Function Tests (ALT/SGPT, AST/SGOT, Alkaline Phosphatase)",
      "FibroScan (Transient Elastography - measures steatosis CAP score and stiffness)",
      "Fasting Lipid Profile & HbA1c",
      "Liver Biopsy (Definitive staging of NASH and fibrosis)"
    ],
    "medicines": [
      {
        "generic": "Saroglitazar",
        "class": "Dual PPAR Alpha/Gamma Agonist",
        "usage_bn": "লিভারের অতিরিক্ত চর্বি কমায় এবং ইনসুলিন সংবেদনশীলতা বাড়িয়ে লিভারের এনজাইম স্বাভাবিক করে (৪ মিগ্রা)",
        "usage_en": "Approved novel therapy for NAFLD/NASH reducing hepatic steatosis and transaminases (4 mg OD)",
        "top_brands": [
          "Lipaglyn (Zydus)",
          "Saroglit (Incepta)",
          "Sarogard (Square)"
        ]
      },
      {
        "generic": "Ursodeoxycholic Acid (UDCA 300mg)",
        "class": "Hepatoprotective Bile Acid",
        "usage_bn": "যকৃতের কোষ সুরক্ষিত রাখে, প্রদাহ কমায় এবং পিত্তপ্রবাহ উন্নত করে",
        "usage_en": "Cytoprotective hydrophilic bile acid reducing oxidative liver stress (300 mg BD)",
        "top_brands": [
          "Ursobil (Square)",
          "Ursocol (Incepta)",
          "Dechol (Beximco)"
        ]
      },
      {
        "generic": "Vitamin E (Natural d-alpha-tocopherol 400 IU)",
        "class": "Antioxidant",
        "usage_bn": "ন্যাশ (NASH) আক্রান্ত নন-ডায়াবেটিক রোগীদের লিভারের অক্সিডেটিভ ক্ষতি রোধ করে",
        "usage_en": "Lipid-soluble antioxidant proven to improve histology in non-diabetic NASH",
        "top_brands": [
          "Evit 400 (Square)",
          "E-Gel (Beximco)",
          "E-Cap (Drug Intl)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "দেহের ওজনের ৭% থেকে ১০% ধীরে ধীরে হ্রাস করুন (এটি ফ্যাটি লিভার নিরাময়ের প্রধান চিকিৎসা)।",
      "চিনিযুক্ত পানীয়, কোমল পানীয়, মিষ্টি ও পরিশোধিত ময়দার খাবার সম্পূর্ণ বাদ দিন।",
      "প্রতিদিন অন্তত ৪০ মিনিট ঘাম ঝরিয়ে হাঁটুন বা অ্যারোবিক ব্যায়াম করুন।",
      "কালো কফি (চিনি ও দুধ ছাড়া) যকৃতের স্বাস্থ্যের জন্য উপকারী।"
    ],
    "lifestyle_diet_en": [
      "Achieve gradual 7-10% total body weight reduction over 6-12 months.",
      "Completely eliminate sugary soft drinks, sweets, and refined white flour.",
      "40 minutes of moderate aerobic exercise 5 days/week.",
      "2-3 cups of unsweetened black coffee daily provides hepatoprotective benefits."
    ],
    "emergency_warning_bn": "পেটে পানি জমা (Ascites), পায়ে তীব্র ফোলা বা রক্তবমি হলে ফ্যাটি লিভার থেকে লিভার সিরোসিসে রূপান্তর নির্দেশ করে। অতি দ্রুত হেপাটোলজিস্টের তত্ত্বাবধানে নিন।",
    "emergency_warning_en": "Development of ascites, pedal edema, or mental confusion (hepatic encephalopathy) signals end-stage liver disease."
  },
  {
    "id": "gallstones-cholecystitis",
    "name_en": "Cholelithiasis & Acute Cholecystitis",
    "name_bn": "পিত্তথলির পাথর ও তীব্র প্রদাহ (কোলেসিস্টাইটিস)",
    "icd10": "K80 / K81",
    "system": "hepatobiliary",
    "system_bn": "যকৃৎ ও হেপাটোবিলিয়ারি",
    "organ": "Gallbladder & Biliary Ducts",
    "organ_icon": "🫀",
    "severity": "High",
    "overview_bn": "পিত্তরসের কোলেস্টেরল বা বিলিরুবিন জমাট বেঁধে পিত্তথলিতে পাথর তৈরি হওয়া এবং পিত্তনালীর মুখে আটকে গিয়ে তীব্র প্রদাহ ও সংক্রমণ ঘটানো।",
    "overview_en": "Formation of gallstones in the gallbladder resulting from cholesterol supersaturation, with cystic duct obstruction leading to acute inflammation.",
    "causes_bn": [
      "পিত্তরসে কোলেস্টেরলের ঘনত্ব পিত্তলবণের চেয়ে বেশি হওয়া (Cholesterol stones)",
      "পিত্তথলির পেশী ঠিকমতো সংকুচিত না হয়ে পিত্তরস জমে থাকা (Biliary Stasis)",
      "রক্তের লোহিত কণিকা অতিরিক্ত ভাঙা (Hemolytic Anemia - Pigment stones)",
      "স্থূলতা ও হরমোনের প্রভাব (এস্ট্রোজেন পিত্তে কোলেস্টেরল বাড়ায়)"
    ],
    "causes_en": [
      "Cholesterol supersaturation in bile exceeding solubilizing capacity",
      "Gallbladder hypomotility and biliary sludge formation",
      "Chronic hemolysis producing excess unconjugated bilirubin (Pigment stones)",
      "Hormonal influences: estrogen increases cholesterol secretion, progesterone causes stasis"
    ],
    "risk_factors_bn": [
      "4F: Female, Forty, Fat, Fertile (৪০ ঊর্ধ্ব নারী, স্থূলতা, সন্তানবতী)",
      "দ্রুত ওজন কমানো",
      "ডায়াবেটিস"
    ],
    "risk_factors_en": [
      "The 4 Fs: Female, Fat, Forty, Fertile",
      "Rapid weight loss or prolonged fasting",
      "High-fat diet",
      "Diabetes mellitus"
    ],
    "symptoms_bn": [
      "পেটের উপরিভাগে ডান পাশে পাঁজরের নিচে তীব্র মোচড়ানো ব্যথা (Biliary Colic)",
      "ব্যথা পেছনের ডান কাঁধে বা পিঠের ডানা বরাবর ছড়িয়ে পড়া",
      "তৈলাক্ত বা ভারী খাবার খাওয়ার ১-২ ঘণ্টা পর ব্যথা শুরু হওয়া",
      "বমি বমি ভাব, অবিরাম বমি ও জ্বর",
      "চোখ ও প্রস্রাব হলুদ হয়ে যাওয়া (যদি পাথর পিত্তনালী বা সিবিডিতে আটকে জন্ডিস তৈরি করে)"
    ],
    "symptoms_en": [
      "Severe episodic right upper quadrant (RUQ) colicky pain",
      "Radiation to right infrascapular region or shoulder",
      "Precipitated by ingestion of fatty, fried meals",
      "Nausea, vomiting, and low to high grade fever",
      "Murphy's sign positive (inspiratory arrest on RUQ deep palpation)",
      "Obstructive jaundice with dark tea-colored urine and clay-colored stools if CBD is obstructed"
    ],
    "diagnostic_tests": [
      "Ultrasonography of Hepatobiliary System (HBS - 98% sensitive for gallstones & wall edema)",
      "MRCP (Magnetic Resonance Cholangiopancreatography - rules out Choledocholithiasis)",
      "Liver Function Tests (Total Bilirubin, Direct Bilirubin, Alkaline Phosphatase)",
      "Complete Blood Count (Leukocytosis in cholecystitis)",
      "Serum Amylase & Lipase (to exclude gallstone pancreatitis)"
    ],
    "medicines": [
      {
        "generic": "Laparoscopic Cholecystectomy",
        "class": "Definitive Surgical Standard",
        "usage_bn": "পিত্তথলি পাথরসহ ল্যাপারোস্কোপিক মেশিনের সাহায্যে ছোট ছিদ্র করে কেটে ফেলা (স্থায়ী নিরাময়)",
        "usage_en": "Gold standard definitive curative minimally invasive surgical removal of gallbladder",
        "top_brands": [
          "Day-care Laparoscopic Surgery"
        ]
      },
      {
        "generic": "Ketorolac / Drotaverine / Hyoscine",
        "class": "NSAID Analgesic & Antispasmodic",
        "usage_bn": "পিত্তথলির তীব্র খিঁচুনি ও অসহ্য কলিক পেইন নিয়ন্ত্রণে",
        "usage_en": "Potent parenteral anti-inflammatory and smooth muscle relaxant for biliary colic",
        "top_brands": [
          "Torax (Square)",
          "Butapan (Beximco)",
          "Norvis (Incepta)"
        ]
      },
      {
        "generic": "Ceftriaxone + Metronidazole (IV)",
        "class": "Biliary Excreted Antibiotics",
        "usage_bn": "পিত্তথলির ব্যাকটিরিয়াল সংক্রমণ ও পুঁজ (Empyema) নিয়ন্ত্রণে",
        "usage_en": "Antibiotic regimen achieving high biliary tissue concentrations",
        "top_brands": [
          "Ceftron (Square)",
          "Amodis (Square)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "ডিম, অতিরিক্ত তেল, চর্বিযুক্ত মাংস ও ভাজাপোড়া খাবার সম্পূর্ণ পরিহার করুন।",
      "একবারে বেশি খাবার না খেয়ে অল্প অল্প করে বারে বারে খাবার গ্রহণ করুন।",
      "পিত্তথলিতে পাথর হলে শুধুমাত্র ওষুধ দিয়ে দীর্ঘমেয়াদী নিরাময় সম্ভব হয় না; উপযুক্ত সময়ে অপারেশন করিয়ে নেওয়াই বুদ্ধিমানের কাজ।"
    ],
    "lifestyle_diet_en": [
      "Strict low-fat, low-cholesterol diet; avoid fried items and dairy fats.",
      "Eat regular small-portion meals to encourage regular gallbladder emptying.",
      "Understand that medical dissolution is rarely curative and surgical removal prevents future severe pancreatitis."
    ],
    "emergency_warning_bn": "পাথর পিত্তনালীতে আটকে তীব্র জন্ডিস, কাঁপুনি দিয়ে ১০৪° জ্বর ও পেট ব্যথা (Charcot's Triad) জীবনঘাতী ব্যাকটেরিয়াল সংক্রমণ (Acute Cholangitis) নির্দেশ করে। জরুরি ইআরসিপি (ERCP) প্রয়োজন।",
    "emergency_warning_en": "Charcot's triad (fever, jaundice, RUQ pain) indicates ascending bacterial cholangitis requiring emergent ERCP biliary drainage."
  },
  {
    "id": "stroke",
    "name_en": "Cerebrovascular Accident (Stroke - Ischemic & Hemorrhagic)",
    "name_bn": "স্ট্রোক (মস্তিষ্কে রক্ত চলাচল বিঘ্ন বা রক্তক্ষরণ)",
    "icd10": "I63 / I61",
    "system": "nervous",
    "system_bn": "স্নায়ুতন্ত্র ও মস্তিষ্ক",
    "organ": "Brain",
    "organ_icon": "🧠",
    "severity": "Critical",
    "overview_bn": "মস্তিষ্কের রক্তনালীতে রক্তজমাট বেঁধে রক্ত চলাচল বন্ধ হয়ে যাওয়া (Ischemic Stroke) অথবা রক্তনালী ফেটে মস্তিষ্কের ভেতর রক্তক্ষরণ ঘটা (Hemorrhagic Stroke)।",
    "overview_en": "A neurological emergency resulting from cerebral ischemia due to thrombosis/embolism, or intracranial hemorrhage depriving brain tissue of oxygen.",
    "causes_bn": [
      "মস্তিষ্কের রক্তনালীতে রক্ত জমাট বাঁধা (Thrombosis / Embolism)",
      "দীর্ঘদিনের অনিয়ন্ত্রিত অতি উচ্চ রক্তচাপের কারণে রক্তনালী ফেটে যাওয়া (Aneurysm Rupture)",
      "হৃৎপিণ্ডের অনিয়মিত স্পন্দন (Atrial Fibrillation) থেকে রক্তের দলা মস্তিষ্কে যাওয়া",
      "ক্যারোটিড ধমনীর প্লাক"
    ],
    "causes_en": [
      "Cerebral arterial thrombosis from atherosclerosis or cardioembolism (Atrial Fibrillation)",
      "Intracranial hemorrhage secondary to malignant hypertension or ruptured berry aneurysm",
      "Carotid artery stenosis and plaque rupture",
      "Arteriovenous malformation (AVM)"
    ],
    "risk_factors_bn": [
      "অনিয়ন্ত্রিত উচ্চ রক্তচাপ",
      "ডায়াবেটিস",
      "ধূমপান",
      "অ্যারিথমিয়া",
      "উচ্চ কোলেস্টেরল",
      "অলসতা"
    ],
    "risk_factors_en": [
      "Hypertension (single biggest risk factor)",
      "Diabetes mellitus",
      "Tobacco smoking",
      "Atrial fibrillation",
      "Prior TIA history"
    ],
    "symptoms_bn": [
      "BE-FAST লক্ষণ:",
      "B - ব্যালেন্স হারানো ও মাথা ঘোরা (Balance loss)",
      "E - চোখের দৃষ্টি ঝাপসা বা এক চোখে হঠাৎ অন্ধত্ব (Eyes vision loss)",
      "F - মুখের একপাশ বাঁকা হয়ে যাওয়া (Face drooping)",
      "A - এক হাত বা পায়ের শক্তি অবশ হয়ে যাওয়া (Arm weakness / Hemiplegia)",
      "S - কথা জড়িয়ে যাওয়া বা কথা বলতে না পারা (Slurred Speech)",
      "T - সময় নষ্ট না করে জরুরি অ্যাম্বুলেন্স ডাকা (Time to call 999)"
    ],
    "symptoms_en": [
      "BE-FAST mnemonic:",
      "B - Sudden loss of balance and ataxia",
      "E - Sudden visual field defect or diplopia",
      "F - Unilateral facial asymmetry or drooping",
      "A - Arm or leg sudden weakness, numbness, or paralysis (hemiparesis)",
      "S - Slurred speech, dysarthria, or expressive aphasia",
      "T - Time critical: golden period under 4.5 hours for thrombolysis"
    ],
    "diagnostic_tests": [
      "Emergency Non-Contrast CT Scan of Brain (differentiates ischemic vs hemorrhagic)",
      "Brain MRI with DWI (Diffusion-Weighted Imaging) & MRA",
      "Carotid Doppler Ultrasound",
      "Echocardiogram & 24-hr Holter Monitor (for cardiac embolic source)"
    ],
    "medicines": [
      {
        "generic": "Alteplase (r-tPA) / Tenecteplase",
        "class": "Intravenous Thrombolytic",
        "usage_bn": "ইস্কেমিক স্ট্রোকের লক্ষণ শুরুর ৪.৫ ঘণ্টার মধ্যে শিরায় দিলে রক্ত জমাট গলিয়ে পক্ষাঘাত সম্পূর্ণ নিরাময় হতে পারে",
        "usage_en": "Gold standard IV thrombolysis within 4.5 hours of ischemic stroke symptom onset",
        "top_brands": [
          "Actilyse (Boehringer)"
        ]
      },
      {
        "generic": "Aspirin 300mg + Atorvastatin 80mg",
        "class": "Secondary Stroke Prevention",
        "usage_bn": "সিটি স্ক্যানে রক্তক্ষরণ বাদ পড়ার পর দ্রুত রক্ত পাতলা ও রক্তনালীর স্থিতিশীলতা নিশ্চিতকরণে",
        "usage_en": "Immediate antiplatelet + high-intensity statin after hemorrhage is ruled out",
        "top_brands": [
          "Disprin",
          "Atova 80 (Square)"
        ]
      },
      {
        "generic": "Mannitol / Hypertonic Saline",
        "class": "Osmotic Diuretic",
        "usage_bn": "মস্তিষ্কের ভেতরের ফুলে যাওয়া পানি ও বিপজ্জনক চাপ (ICP) কমাতে হাসপাতালে ব্যবহৃত হয়",
        "usage_en": "Reduces acute intracranial pressure and cerebral edema",
        "top_brands": [
          "Mannitol IV Infusion (Beximco / Square)"
        ]
      },
      {
        "generic": "Citicoline + Piracetam",
        "class": "Neuroprotective & Cognitive Enhancer",
        "usage_bn": "স্ট্রোক পরবর্তী স্নায়বিক ক্ষতি পুনরুদ্ধার ও স্মৃতি-গতিশীলতা ফেরাতে দীর্ঘমেয়াদী থেরাপি",
        "usage_en": "Neuroprotective agent assisting neuro-rehabilitation and neuroplasticity",
        "top_brands": [
          "Citico (Square)",
          "Cognil (Incepta)",
          "Neurocet (Beximco)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "স্ট্রোক পরবর্তী দ্রুত ফিজিওথেরাপি ও স্পিচ থেরাপি শুরু করুন।",
      "রক্তচাপ ও ডায়াবেটিস কঠোরভাবে নিয়ন্ত্রণে রাখুন।",
      "ধূমপান ও তামাক সম্পূর্ণ পরিহার করুন।",
      "কম লবণযুক্ত ও পুষ্টিকর খাবার গ্রহণ করুন।"
    ],
    "lifestyle_diet_en": [
      "Early physiotherapy, occupational therapy, and speech therapy.",
      "Strict control of blood pressure, blood glucose, and LDL cholesterol.",
      "Zero tobacco tolerance.",
      "Mediterranean diet rich in green leafy vegetables and low in sodium."
    ],
    "emergency_warning_bn": "স্ট্রোকের লক্ষণ দেখা দিলে এক মিনিটও ঘরে অপেক্ষা করবেন না। লক্ষণ শুরুর ৪.৫ ঘণ্টার 'গোল্ডেন পিরিয়ড'-এর মধ্যে রোগীকে সিটি স্ক্যান সুবিধাযুক্ত হাসপাতালে পৌঁছান।",
    "emergency_warning_en": "Time is Brain: every minute untreated results in loss of 1.9 million neurons. Transport immediately to an acute stroke center."
  },
  {
    "id": "migraine",
    "name_en": "Migraine & Severe Headache",
    "name_bn": "মাইগ্রেন ও তীব্র মাথাব্যথা",
    "icd10": "G43",
    "system": "nervous",
    "system_bn": "স্নায়ুতন্ত্র ও মস্তিষ্ক",
    "organ": "Brain & Cranial Nerves",
    "organ_icon": "🧠",
    "severity": "Moderate",
    "overview_bn": "মস্তিষ্কের ট্রাইজেমিনোভ্যাস্কুলার সিস্টেমের অতিসংবেদনশীলতাজনিত তীব্র স্পন্দনশীল একপার্শ্বিক মাথাব্যথা, যা আলো, শব্দ এবং বমিভাবের সাথে সম্পর্কিত।",
    "overview_en": "A neurovascular disorder characterized by recurrent, pulsating moderate-to-severe unilateral headaches, often accompanied by nausea, photophobia, and phonophobia.",
    "causes_bn": [
      "মস্তিষ্কের ট্রাইজেমিনাল স্নায়ুর হাইপার-অ্যাকটিভিটি ও CGRP পেপটাইড নিঃসরণ",
      "সেরোটোনিন হরমোনের ভারসাম্যহীনতা ও সেরিব্রাল রক্তনালীর সংকোচন-প্রসারণ",
      "নির্দিষ্ট খাদ্য উপাদান (চিজ, চকোলেট, এমএসজি, কৃত্রিম মিষ্টিকারক)",
      "ঘুমের অনিয়ম, অনাহার ও অতিরিক্ত মানসিক চাপ",
      "হরমোনের তারতম্য (মাসিক ঋতুস্রাবের সময় ইস্ট্রোজেনের পতন)"
    ],
    "causes_en": [
      "Trigeminovascular system activation releasing calcitonin gene-related peptide (CGRP)",
      "Neurogenic inflammation and cortical spreading depression",
      "Dietary triggers (aged cheese, chocolates, MSG, aspartame, alcohol)",
      "Sleep deprivation, missed meals, and intense psychological stress",
      "Fluctuating estrogen levels (menstrual migraine)"
    ],
    "risk_factors_bn": [
      "মহিলাদের ক্ষেত্রে ৩ গুণ বেশি ঝুঁকি",
      "পারিবারিক ইতিহাস",
      "উদ্বেগ ও বিষণ্ণতা",
      "অনিয়মিত লাইফস্টাইল"
    ],
    "risk_factors_en": [
      "Female gender (3:1 ratio)",
      "Positive family history",
      "Comorbid anxiety/depression",
      "Irregular sleep patterns"
    ],
    "symptoms_bn": [
      "মাথার একপাশে তীব্র দপদপ করা ব্যথা (Throbbing / Pulsating pain)",
      "চোখে আলোর ঝলকানি, আঁকাবাঁকা দাগ বা দৃষ্টিবিভ্রম (Aura)",
      "উজ্জ্বল আলো (Photophobia) ও উচ্চ শব্দ (Phonophobia) একদম সহ্য না হওয়া",
      "তীব্র বমি বমি ভাব বা বমি হওয়া",
      "ব্যথা ৪ থেকে ৭২ ঘণ্টা পর্যন্ত স্থায়ী হওয়া"
    ],
    "symptoms_en": [
      "Unilateral, throbbing or pulsating moderate-to-severe headache",
      "Sensory aura (scintillating scotoma, visual zig-zag lights)",
      "Extreme sensitivity to light (photophobia), sound (phonophobia), and odors",
      "Nausea and vomiting",
      "Episodes lasting 4 to 72 hours aggravated by physical activity"
    ],
    "diagnostic_tests": [
      "Clinical Diagnosis based on ICHD-3 criteria",
      "Brain MRI or CT Scan (to exclude brain tumor, aneurysm, or secondary headache)",
      "Visual Field Testing & Fundoscopy (to exclude papilledema)"
    ],
    "medicines": [
      {
        "generic": "Zolmitriptan / Sumatriptan",
        "class": "5-HT 1B/1D Receptor Agonist (Triptan)",
        "usage_bn": "মাইগ্রেনের তীব্র আক্রমণ শুরুর সাথে সাথে সেব্য; দ্রুত মস্তিষ্কের রক্তনালী স্বাভাবিক করে ব্যথা নিরাময় করে",
        "usage_en": "Acute abortive therapy targeting 5-HT receptors taken at onset of headache (2.5-5 mg)",
        "top_brands": [
          "Zolmit (Square)",
          "Triptan (Incepta)",
          "Zomig (AstraZeneca)"
        ]
      },
      {
        "generic": "Flunarizine (5mg / 10mg)",
        "class": "Selective Calcium Channel Blocker (Prophylaxis)",
        "usage_bn": "মাইগ্রেনের আক্রমণের সংখ্যা ও তীব্রতা কমানোর জন্য নিয়মিত রাতে সেব্য প্রতিরোধমূলক ওষুধ",
        "usage_en": "First-line preventive prophylactic agent reducing attack frequency (5-10 mg OD HS)",
        "top_brands": [
          "Flunazin (Square)",
          "Sibelium",
          "Vertina (Incepta)",
          "Fluriz (Beximco)"
        ]
      },
      {
        "generic": "Propranolol / Amitriptyline",
        "class": "Beta Blocker / Tricyclic Agent (Prophylaxis)",
        "usage_bn": "মস্তিষ্কের স্নায়বিক উত্তেজনা কমিয়ে দীর্ঘমেয়াদে মাইগ্রেন প্রতিরোধ করে",
        "usage_en": "Standard prophylactic maintenance to lower headache days",
        "top_brands": [
          "Indever (Square)",
          "Tryptin (Square)",
          "Amitrip (Incepta)"
        ]
      },
      {
        "generic": "Naproxen Sodium + Domperidone",
        "class": "NSAID + Antiemetic Combination",
        "usage_bn": "মাইগ্রেন আক্রমণের সময় বমি ও প্রদাহজনিত তীব্র মাথা ব্যথা প্রশমিত করতে",
        "usage_en": "Effective early acute combination to abort pain and suppress nausea",
        "top_brands": [
          "Naproxen Plus (Square)",
          "Anaprox (Beximco)",
          "Napex Plus (Incepta)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "একটি 'মাথাব্যথা ডায়েরি' রাখুন এবং আপনার নির্দিষ্ট ট্রিগারগুলো (যেমন রোদ, চকলেট, কফি) চিহ্নিত করে এড়িয়ে চলুন।",
      "প্রতিদিন নির্দিষ্ট সময়ে ঘুমাতে যান এবং কমপক্ষে ৭-৮ ঘণ্টা গভীর ঘুম নিশ্চিত করুন।",
      "মাথাব্যথা শুরু হলে অন্ধকার ও শান্ত ঘরে চোখ বন্ধ করে বিশ্রাম নিন।",
      "কম্পিউটার বা মোবাইলের স্ক্রিন একটানা দীর্ঘক্ষণ ব্যবহার করবেন না।"
    ],
    "lifestyle_diet_en": [
      "Maintain a headache diary to identify individual triggers (sun glare, skip meals, cheeses).",
      "Establish strict regular sleep-wake cycles (7-8 hours).",
      "Rest in a quiet, dark room with a cold compress on forehead during attacks.",
      "Take 20-20-20 visual screen breaks and use blue-light filters."
    ],
    "emergency_warning_bn": "জীবনের সবচেয়ে ভয়াবহ আকস্মিক বজ্রপাতের মতো মাথাব্যথা (Thunderclap headache), সাথে ঘাড় শক্ত হওয়া বা জ্বর থাকলে তা মস্তিষ্কে রক্তক্ষরণ (Subarachnoid Hemorrhage) বা মেনিনজাইটিস নির্দেশ করতে পারে।",
    "emergency_warning_en": "Sudden onset 'thunderclap' headache peaking within seconds accompanied by fever or neck stiffness requires immediate lumbar puncture and CT to rule out Subarachnoid Hemorrhage."
  },
  {
    "id": "epilepsy-seizures",
    "name_en": "Epilepsy & Seizure Disorders",
    "name_bn": "মৃগীরোগ বা খিঁচুনি (এপিলেপসি)",
    "icd10": "G40",
    "system": "nervous",
    "system_bn": "স্নায়ুতন্ত্র ও মস্তিষ্ক",
    "organ": "Brain (Cerebral Cortex)",
    "organ_icon": "🧠",
    "severity": "High",
    "overview_bn": "মস্তিষ্কের নিউরনগুলোর অতিরিক্ত, অনিয়ন্ত্রিত ও আকস্মিক বৈদ্যুতিক তরঙ্গের কারণে শরীরের পেশিতে তীব্র অনিচ্ছাকৃত খিঁচুনি, কাঁপুনি ও চেতনা হারানোর পুনরাবৃত্তিমূলক অবস্থা।",
    "overview_en": "A neurological disorder characterized by recurrent, unprovoked seizures caused by abnormal, excessive hypersynchronous neuronal discharges in the brain.",
    "causes_bn": [
      "মস্তিষ্কে পূর্বে কোনো আঘাত বা ক্ষত (Head trauma)",
      "স্ট্রোক বা মস্তিষ্কের টিউমার",
      "মস্তিষ্কের সংক্রমণ যেমন মেনিনজাইটিস বা এনসেফালাইটিস",
      "জন্মগত বা জেনেটিক চ্যানেল জটিলতা (Ion channel mutations)",
      "শিশুদের উচ্চ জ্বরে খিঁচুনি (Febrile convulsion)"
    ],
    "causes_en": [
      "Cerebral structural lesions (post-stroke scar, head trauma, tumors)",
      "Central nervous system infections (meningitis, viral encephalitis, neurocysticercosis)",
      "Genetic channelopathies altering sodium/potassium neuronal conductances",
      "Metabolic derangements (severe hyponatremia, hypoglycemia, uremia)",
      "Febrile seizures in pediatric patients"
    ],
    "risk_factors_bn": [
      "পারিবারিক মৃগীরোগ",
      "অনিদ্রা",
      "অতিরিক্ত উজ্জ্বল ঝলকানি আলো (Photosensitivity)",
      "অ্যালকোহল বর্জন প্রতিক্রিয়া"
    ],
    "risk_factors_en": [
      "Family history",
      "Severe sleep deprivation",
      "Flickering stroboscopic lighting",
      "Sudden sedative/alcohol withdrawal"
    ],
    "symptoms_bn": [
      "হঠাৎ চিৎকার দিয়ে শরীর শক্ত হয়ে যাওয়া এবং মাটিতে পড়ে হাত-পা আছাড় মারা (Tonic-Clonic Convulsions)",
      "চোখ উল্টে যাওয়া, মুখ দিয়ে ফেনা বের হওয়া ও জিহ্বায় কামড় লাগা",
      "মল বা প্রস্রাবের নিয়ন্ত্রণ হারিয়ে ফেলা (Incontinence)",
      "খিঁচুনির পূর্বে অদ্ভুত গন্ধ, শব্দ বা অশুভ অনুভূতি (Aura)",
      "খিঁচুনির পর দীর্ঘক্ষণ ঘুম ঘুম ভাব ও বিভ্রান্তি (Post-ictal confusion)"
    ],
    "symptoms_en": [
      "Generalized tonic-clonic convulsions with abrupt loss of consciousness",
      "Upward rolling of eyeballs, tongue biting, and salivation/frothing at mouth",
      "Urinary or fecal incontinence",
      "Prodromal sensory or epigastric aura",
      "Post-ictal state characterized by flaccid coma, profound confusion, and amnesia"
    ],
    "diagnostic_tests": [
      "Electroencephalogram (EEG / Video EEG - detects spike-and-wave epileptiform discharges)",
      "Brain MRI Epilepsy Protocol (identifies mesial temporal sclerosis, focal cortical dysplasia)",
      "Serum Electrolytes (Sodium, Calcium, Magnesium) & Blood Glucose",
      "Serum Antiepileptic Drug (AED) Levels"
    ],
    "medicines": [
      {
        "generic": "Levetiracetam (250mg - 500mg)",
        "class": "SV2A Ligand Broad-Spectrum Anticonvulsant",
        "usage_bn": "আধুনিক মৃগীরোগের অত্যন্ত নিরাপদ ও কার্যকর ওষুধ; যকৃতের ওপর প্রভাব ফেলে না ও ড্রাগ ইন্টারঅ্যাকশন নেই",
        "usage_en": "First-line broad spectrum antiepileptic with clean metabolic and pharmacokinetic profile (500 mg BD)",
        "top_brands": [
          "Epilep (Square)",
          "Keppra (UCB)",
          "Levipil (Incepta)",
          "Tiracet (Beximco)"
        ]
      },
      {
        "generic": "Sodium Valproate (Cronex / Divalproex)",
        "class": "GABA-Ergic Antiepileptic",
        "usage_bn": "সব ধরনের খিঁচুনি (Generalized & Focal) নিয়ন্ত্রণে দীর্ঘদিনের নির্ভরযোগ্য ওষুধ",
        "usage_en": "Classic broad-spectrum agent highly effective across multiple seizure classifications",
        "top_brands": [
          "Epival (Square)",
          "Depakote (Sanofi)",
          "Valpro (Incepta)"
        ]
      },
      {
        "generic": "Clobazam / Clonazepam",
        "class": "Benzodiazepine Anticonvulsant",
        "usage_bn": "সহায়ক ওষুধ হিসেবে রাতে সেব্য; আকস্মিক ক্লাস্টার খিঁচুনি প্রতিরোধ করে",
        "usage_en": "Adjunctive allosteric GABA receptor modulator for refractory breakthrough seizures",
        "top_brands": [
          "Frisium (Sanofi)",
          "Clonapam (Square)",
          "Rivotril (Roche)",
          "Disopan (Incepta)"
        ]
      },
      {
        "generic": "Midazolam Nasal Spray",
        "class": "Emergency Rescue Anticonvulsant",
        "usage_bn": "বাসায় ৫ মিনিটের বেশি খিঁচুনি চললে নাকে স্প্রে করে খিঁচুনি তৎক্ষণাৎ বন্ধ করার ফার্স্ট-এইড স্প্রে",
        "usage_en": "Intranasal rescue benzodiazepine for terminating acute seizure clusters at home",
        "top_brands": [
          "Dormitol Nasal (Square)",
          "Midazol (Incepta)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "খিঁচুনির সময় রোগীর মুখে চামচ, কাপড় বা হাত দেবেন না এবং জোর করে চেপে ধরবেন না।",
      "রোগীকে একপাশে কাত করে শুইয়ে দিন যাতে মুখের লালা শ্বাসনালীতে না যায় (Recovery Position)।",
      "খিঁচুনির ওষুধ প্রতিদিন একই সময়ে নিয়ম মেনে খান; ১ দিনের জন্যও ওষুধ মিস করবেন না।",
      "নদী বা পুকুরে একা সাঁতার কাটা, উঁচু স্থানে ওঠা বা আগুন ও রান্নার কাছে যাওয়া পরিহার করুন।"
    ],
    "lifestyle_diet_en": [
      "During a seizure: do NOT insert any object into mouth or restrain limbs forcefully.",
      "Turn patient gently into the lateral recovery position to maintain airway patency.",
      "Strict compliance with daily antiepileptic medication; sudden cessation provokes status epilepticus.",
      "Avoid unsupervised swimming, driving, heights, or open cooking fires."
    ],
    "emergency_warning_bn": "একটানা ৫ মিনিটের বেশি খিঁচুনি চলা বা একটির পর জ্ঞান ফেরার আগেই আরেকটি খিঁচুনি শুরু হওয়া জীবনঘাতী স্ট্যাটাস এপিলেপ্টিকাস (Status Epilepticus)। দ্রুত জরুরি আইসিইউতে স্থানান্তর করুন।",
    "emergency_warning_en": "Seizure activity lasting >5 minutes or recurrent seizures without return of consciousness is Status Epilepticus requiring urgent IV lorazepam and intubation."
  },
  {
    "id": "type-2-diabetes",
    "name_en": "Type 2 Diabetes Mellitus",
    "name_bn": "টাইপ-২ ডায়াবেটিস মেলিটাস (বহুমূত্র রোগ)",
    "icd10": "E11",
    "system": "endocrine",
    "system_bn": "এন্ডোক্রাইন ও বিপাকতন্ত্র",
    "organ": "Pancreas & Target Tissues",
    "organ_icon": "💉",
    "severity": "High",
    "overview_bn": "অগ্ন্যাশয় থেকে পর্যাপ্ত ইনসুলিন নিঃসরণ না হওয়া অথবা শরীরের কোষগুলো ইনসুলিনের প্রতি যথাযথ সাড়া না দেওয়ার ফলে (Insulin Resistance) রক্তে গ্লুকোজের মাত্রা বিপজ্জনকভাবে বৃদ্ধি পাওয়া।",
    "overview_en": "A progressive chronic metabolic disease characterized by insulin resistance and relative insulin deficiency resulting in persistent hyperglycemia.",
    "causes_bn": [
      "কোষের ইনসুলিন সংবেদনশীলতা হ্রাস পাওয়া (Insulin Resistance)",
      "অগ্ন্যাশয়ের বিটা-কোষের কার্যক্ষমতা ধীরে ধীরে হ্রাস পাওয়া",
      "অতিরিক্ত ক্যালোরি, চিনি ও পরিশোধিত কার্বোহাইড্রেটযুক্ত খাদ্যাভ্যাস",
      "স্থূলতা (বিশেষ করে পেটের চর্বি)",
      "বংশগত বা জিনগত কারণ"
    ],
    "causes_en": [
      "Peripheral insulin resistance in skeletal muscle and adipose tissue",
      "Progressive beta-cell secretory failure in pancreas",
      "Excess intake of refined carbohydrates, trans fats, and sedentary lifestyle",
      "Visceral obesity inducing chronic systemic low-grade inflammation",
      "Polygenic susceptibility"
    ],
    "risk_factors_bn": [
      "পারিবারিক ইতিহাস",
      "স্থূলতা ও বিএমআই ২৫+",
      "অলস জীবনযাপন",
      "উচ্চ রক্তচাপ ও ডিসলিপিডেমিয়া",
      "গর্ভাবস্থাকালীন ডায়াবেটিস (GDM)"
    ],
    "risk_factors_en": [
      "Family history of diabetes",
      "BMI > 25 kg/m2 (or >23 for South Asians)",
      "Sedentary lifestyle",
      "Gestational diabetes history"
    ],
    "symptoms_bn": [
      "ঘন ঘন প্রস্রাবের বেগ (বিশেষ করে রাতে - Polyuria)",
      "অতিরিক্ত পানির পিপাসা লাগা (Polydipsia)",
      "বারবার অতিরিক্ত ক্ষুধা পাওয়া (Polyphagia)",
      "পর্যাপ্ত খাবার সত্ত্বেও দ্রুত ওজন কমে যাওয়া",
      "চোখে ঝাপসা দেখা এবং হাত ও পায়ের পাতায় অবশ বা ঝিঁঝিঁ লাগা",
      "শরীরের যেকোনো কাটা বা ক্ষত সহজে না শুকানো"
    ],
    "symptoms_en": [
      "Frequent urination, particularly nocturnal (Polyuria)",
      "Excessive unquenchable thirst (Polydipsia)",
      "Constant extreme hunger (Polyphagia)",
      "Unexplained weight loss and chronic fatigue",
      "Blurred vision and peripheral stocking-glove paresthesia",
      "Delayed healing of cuts, sores, and recurring fungal/skin infections"
    ],
    "diagnostic_tests": [
      "Fasting Plasma Glucose (FPG >= 7.0 mmol/L or 126 mg/dL)",
      "2-Hour Oral Glucose Tolerance Test (2h-OGTT >= 11.1 mmol/L)",
      "Glycated Hemoglobin (HbA1c >= 6.5%)",
      "Random Blood Sugar (RBS >= 11.1 mmol/L with symptoms)",
      "Urine Microalbumin/Creatinine Ratio (for diabetic nephropathy monitoring)"
    ],
    "medicines": [
      {
        "generic": "Metformin Hydrochloride (500mg / 850mg / 1000mg XR)",
        "class": "Biguanide - 1st Line",
        "usage_bn": "যকৃতের গ্লুকোজ তৈরি কমায় ও পেশী কোষে ইনসুলিন সংবেদনশীলতা বৃদ্ধি করে (খাবারের মাঝে বা পরে সেব্য)",
        "usage_en": "First-line oral antihyperglycemic reducing hepatic gluconeogenesis without hypoglycemia risk",
        "top_brands": [
          "Comet (Square)",
          "Insulet (Incepta)",
          "Gluconor (Beximco)",
          "Metfo (Renata)"
        ]
      },
      {
        "generic": "Sitagliptin / Linagliptin",
        "class": "DPP-4 Inhibitor",
        "usage_bn": "ইনক্রেটিন হরমোন রক্ষা করে খাওয়ার পর ইনসুলিন নিঃসরণ বাড়ায়; নিরাপদ ও ওজন বৃদ্ধি করে না",
        "usage_en": "Enhances glucose-dependent insulin secretion, kidney-safe linagliptin needs no dose adjustment",
        "top_brands": [
          "Rolip (Square)",
          "Linaglip (Incepta)",
          "Trajenta (Boehringer)",
          "Januvia (MSD)"
        ]
      },
      {
        "generic": "Empagliflozin / Dapagliflozin",
        "class": "SGLT2 Inhibitor",
        "usage_bn": "কিডনির মাধ্যমে প্রস্রাবে অতিরিক্ত গ্লুকোজ বের করে দেয়; ওজন কমায় ও হার্ট-কিডনি সুরক্ষিত রাখে",
        "usage_en": "Promotes urinary glucose excretion; proven cardiovascular and renal mortality reduction",
        "top_brands": [
          "G-Empa (Square)",
          "Dapamet (Incepta)",
          "Jardiance (Boehringer)",
          "Forxiga (AstraZeneca)"
        ]
      },
      {
        "generic": "Glimepiride",
        "class": "Sulfonylurea",
        "usage_bn": "অগ্ন্যাশয়কে সরাসরি উদ্দীপ্ত করে ইনসুলিন নিঃসরণ বাড়ায় (১-২ মিগ্রা সকালে)",
        "usage_en": "Secretagogue stimulating pancreatic beta cells to produce more insulin (1-2 mg)",
        "top_brands": [
          "Diapride (Square)",
          "Secrin (Incepta)",
          "Glimer (Beximco)",
          "Amaryl (Sanofi)"
        ]
      },
      {
        "generic": "Insulin Glargine / Degludec",
        "class": "Long-Acting Basal Insulin",
        "usage_bn": "২৪ ঘণ্টার নিরবচ্ছিন্ন সুগার নিয়ন্ত্রণে প্রতিদিন নির্দিষ্ট সময়ে সাবকিউটেনিয়াস ইনজেকশন",
        "usage_en": "Peakless once-daily long-acting basal insulin for tight glycemic control",
        "top_brands": [
          "Lantus (Sanofi)",
          "Glaritus (Square)",
          "Tresiba (Novo Nordisk)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "সরাসরি চিনি, গুড়, কোমল পানীয়, মিষ্টি ও সাদা ভাত-ময়দার পরিমাণ কঠোরভাবে নিয়ন্ত্রণ করুন।",
      "খাবারের প্লেটের ৫০% রঙিন শাকসবজি ও সালাদ, ২৫% প্রোটিন (মাছ/ডিম) এবং ২৫% লাল চালের ভাত রাখুন।",
      "প্রতিদিন অন্তত ৪৫ মিনিট দ্রুত হাঁটুন বা ব্যায়াম করুন।",
      "নিয়মিত পায়ের যত্ন নিন (ডায়াবেটিক ফুট পরীক্ষা) এবং কোনো ক্ষত অবহেলা করবেন না।"
    ],
    "lifestyle_diet_en": [
      "Eliminate refined sucrose, sodas, and processed high-glycemic foods.",
      "Adopt plate method: 50% non-starchy vegetables, 25% lean protein, 25% complex carbs.",
      "150 minutes of moderate aerobic exercise per week plus resistance training.",
      "Daily self-examination of feet to prevent diabetic foot ulceration."
    ],
    "emergency_warning_bn": "সুগার হঠাৎ ৩.৯ mmol/L এর নিচে নেমে শরীর ঘেমে বুক ধড়ফড় ও অজ্ঞান হয়ে যাওয়া (Hypoglycemia) অথবা অত্যন্ত উচ্চ সুগার ও ভারী শ্বাসকষ্ট (DKA/HHS) হলে জরুরি হাসপাতালে নিন।",
    "emergency_warning_en": "Hypoglycemia (<3.9 mmol/L) with tremors/confusion requires immediate fast-acting carbs. Extreme thirst/vomiting with Kussmaul breathing indicates DKA emergency."
  },
  {
    "id": "hypothyroidism",
    "name_en": "Hypothyroidism",
    "name_bn": "হাইপোথাইরয়েডিজম (থাইরয়েড হরমোনের ঘাটতি)",
    "icd10": "E03",
    "system": "endocrine",
    "system_bn": "এন্ডোক্রাইন ও বিপাকতন্ত্র",
    "organ": "Thyroid Gland",
    "organ_icon": "🦋",
    "severity": "Moderate",
    "overview_bn": "গলার থাইরয়েড গ্রন্থি থেকে প্রয়োজনীয় মাত্রায় থাইরয়েড হরমোন (T3 ও T4) উৎপাদিত না হওয়া, যার ফলে সামগ্রিক শারীরিক বিপাকক্রিয়া (Metabolism) ধীর হয়ে যায়।",
    "overview_en": "An endocrine disorder in which the thyroid gland does not produce enough thyroid hormones, slowing systemic metabolism.",
    "causes_bn": [
      "হাশিমোটো থাইরয়েডাইটিস (Hashimoto's Thyroiditis - অটোইমিউন রোগ)",
      "আয়োডিনের দীর্ঘমেয়াদী ঘাটতি (Iodine Deficiency)",
      "থাইরয়েডের সার্জারি বা রেডিওঅ্যাকটিভ আয়োডিন থেরাপির পরবর্তী অবস্থা",
      "পিটুইটারি গ্রন্থির অকার্যকারিতা (Secondary Hypothyroidism)"
    ],
    "causes_en": [
      "Hashimoto's autoimmune thyroiditis destroying follicular architecture",
      "Iodine deficiency in endemic regions",
      "Post-surgical thyroidectomy or radioactive iodine ablation",
      "Pituitary TSH deficiency (Central hypothyroidism)"
    ],
    "risk_factors_bn": [
      "মহিলাদের ক্ষেত্রে ৫-৮ গুণ বেশি ঝুঁকি",
      "পারিবারিক থাইরয়েড রোগ",
      "টাইপ-১ ডায়াবেটিস বা ভিটিলিগো থাকা"
    ],
    "risk_factors_en": [
      "Female sex",
      "Age > 60",
      "Family history of autoimmune endocrinopathy",
      "Post-partum thyroiditis history"
    ],
    "symptoms_bn": [
      "কম খাওয়া সত্ত্বেও দ্রুত অস্বাভাবিক ওজন বৃদ্ধি",
      "অতিরিক্ত ক্লান্তি, অবসাদ ও ঘুম ঘুম ভাব",
      "অস্বাভাবিক শীতকাতরতা (অন্যদের চেয়ে বেশি শীত লাগা)",
      "চুল পড়ে যাওয়া, ত্বক শুষ্ক ও রুক্ষ হওয়া",
      "কোষ্ঠকাঠিন্য ও স্মৃতিশক্তি হ্রাস",
      "মহিলাদের ক্ষেত্রে অনিয়মিত বা অতিরিক্ত ঋতুস্রাব"
    ],
    "symptoms_en": [
      "Unexplained weight gain despite poor appetite",
      "Profound fatigue, lethargy, and excessive somnolence",
      "Cold intolerance",
      "Coarse, brittle hair, alopecia, and dry scaly skin",
      "Chronic constipation, bradycardia, cognitive sluggishness",
      "Menorrhagia, menstrual irregularities, subfertility"
    ],
    "diagnostic_tests": [
      "Serum TSH (Elevated > 4.5 mIU/L confirms primary hypothyroidism)",
      "Free Thyroxine (FT4 - low in overt, normal in subclinical)",
      "Anti-Thyroid Peroxidase (Anti-TPO) Antibodies (for Hashimoto's)",
      "Ultrasonography of Thyroid Gland"
    ],
    "medicines": [
      {
        "generic": "Levothyroxine Sodium (25mcg / 50mcg / 100mcg)",
        "class": "Synthetic Thyroid Hormone (T4)",
        "usage_bn": "শরীরে থাইরয়েডের ঘাটতি পূরণ করে বিপাক স্বাভাবিক রাখে (প্রতিদিন সকালে ঘুম থেকে উঠে খালি পেটে পানির সাথে সেব্য)",
        "usage_en": "Daily life-long synthetic T4 replacement taken on an empty stomach 30-60 mins before breakfast",
        "top_brands": [
          "Thyrox (Square)",
          "Eltroxin (GSK)",
          "Thyrolux (Incepta)",
          "Euthyrox (Merck)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "আয়োডিনযুক্ত লবণ ব্যবহার করুন এবং পুষ্টিকর সুষম খাবার গ্রহণ করুন।",
      "কাঁচা বাঁধাকপি, ফুলকপি, ব্রোকলি অতিরিক্ত পরিমাণে খাওয়া পরিহার করুন (এগুলোতে গয়ট্রোজেন থাকে)।",
      "নিয়মিত থাইরক্সিন ওষুধ সেবনের অন্তত ১ ঘণ্টা পর চা, কফি বা সকালের নাশতা গ্রহণ করুন।",
      "প্রতি ৩-৬ মাস অন্তর রক্তের TSH পরীক্ষা করিয়ে ওষুধের মাত্রা সমন্বয় করুন।"
    ],
    "lifestyle_diet_en": [
      "Use iodized salt; maintain adequate selenium and zinc intake.",
      "Limit raw goitrogenic brassica vegetables (excess raw cabbage, cauliflower).",
      "Ensure Levothyroxine is taken with water only; separate iron/calcium supplements by 4 hours.",
      "Serial TSH monitoring every 8-12 weeks until stable euthyroid state is maintained."
    ],
    "emergency_warning_bn": "গুরুতর থাইরয়েড ঘাটতিতে শরীর অত্যন্ত ঠান্ডা হয়ে যাওয়া, তীব্র ফোলা ও অচেতন হয়ে যাওয়া (Myxedema Coma) জীবনঘাতী। তাৎক্ষণিক আইসিইউ প্রয়োজন।",
    "emergency_warning_en": "Severe hypothermia, profound bradycardia, and stupor (Myxedema Coma) is a fatal medical emergency requiring IV levothyroxine and hydrocortisone."
  },
  {
    "id": "chronic-kidney-disease",
    "name_en": "Chronic Kidney Disease (CKD)",
    "name_bn": "দীর্ঘস্থায়ী কিডনি রোগ (সিকেডি)",
    "icd10": "N18",
    "system": "renal",
    "system_bn": "রেণাল ও মূত্রতন্ত্র",
    "organ": "Kidneys",
    "organ_icon": "🫘",
    "severity": "Critical",
    "overview_bn": "কিডনির রক্ত পরিশোধন ক্ষমতা (eGFR) ধীরে ধীরে ও স্থায়ীভাবে ক্ষতিগ্রস্ত হয়ে রক্তে ইউরিয়া, ক্রিয়েটিনিন ও অতিরিক্ত ক্ষতিকর বর্জ্য জমা হওয়া।",
    "overview_en": "Gradual irreversible loss of kidney function over months or years, leading to accumulation of uremic toxins and electrolyte disturbances.",
    "causes_bn": [
      "অনিয়ন্ত্রিত ডায়াবেটিস (Diabetic Nephropathy - সর্বাধিক প্রচলিত কারণ)",
      "দীর্ঘদিনের অনিয়ন্ত্রিত উচ্চ রক্তচাপ (Hypertensive Nephrosclerosis)",
      "ক্রনিক গ্লোমেরুলোনেফ্রাইটিস (Glomerulonephritis)",
      "অতিরিক্ত ও অনিয়ন্ত্রিত ব্যথানাশক ওষুধ (NSAIDs) সেবন",
      "পলিসিস্টিক কিডনি রোগ (Polycystic Kidney Disease)"
    ],
    "causes_en": [
      "Diabetic nephropathy (leading cause worldwide)",
      "Hypertensive nephrosclerosis causing arteriolar hyalinosis",
      "Chronic glomerulonephritis and autoimmune glomerulopathies",
      "Analgesic nephropathy from indiscriminate chronic NSAID abuse",
      "Polycystic kidney disease and obstructive uropathy"
    ],
    "risk_factors_bn": [
      "ডায়াবেটিস",
      "উচ্চ রক্তচাপ",
      "৬০+ বয়স",
      "পারিবারিক কিডনি রোগ",
      "ধূমপান",
      "ঘন ঘন প্রস্রাবের ইনফেকশন"
    ],
    "risk_factors_en": [
      "Diabetes",
      "Hypertension",
      "Age >60",
      "Family history of renal failure",
      "Tobacco use"
    ],
    "symptoms_bn": [
      "সকালে ঘুম থেকে উঠলে চোখের চারপাশে ও মুখে ফোলা ভাব",
      "পা ও গোড়ালি ফুলে যাওয়া (Fluid retention)",
      "প্রস্রাবের পরিমাণ কমে যাওয়া বা রাতে বারবার প্রস্রাব হওয়া",
      "প্রস্রাবে অতিরিক্ত ফেনা হওয়া (প্রোটিন বা অ্যালবুমিন নির্গমন)",
      "রক্তশূন্যতা, চরম দুর্বলতা, বমি বমি ভাব ও ত্বকে তীব্র চুলকানি"
    ],
    "symptoms_en": [
      "Periorbital morning puffiness and facial edema",
      "Dependent pitting pedal edema",
      "Oliguria or nocturnal polyuria",
      "Foamy/frothy urine indicating heavy proteinuria",
      "Uremic symptoms: severe anemia, pallor, metallic taste, nausea, intractable pruritus"
    ],
    "diagnostic_tests": [
      "Serum Creatinine & Estimated Glomerular Filtration Rate (eGFR)",
      "Urine Protein:Creatinine Ratio (UPCR) / 24-Hour Urine Total Protein",
      "Ultrasonography of KUB (Kidney size, Corticomedullary differentiation)",
      "Serum Electrolytes (Sodium, Potassium, Calcium, Phosphate)",
      "Renal Biopsy (in specific glomerular diseases)"
    ],
    "medicines": [
      {
        "generic": "Dapagliflozin / Empagliflozin",
        "class": "SGLT2 Inhibitor (Renoprotective)",
        "usage_bn": "কিডনির কার্যক্ষমতা পতন রোধ করে এবং ডায়ালাইসিসের প্রয়োজনীয়তা উল্লেখযোগ্যভাবে পিছিয়ে দেয়",
        "usage_en": "Landmark nephroprotective agent slowing eGFR decline and proteinuria (10 mg OD)",
        "top_brands": [
          "Dapamet (Incepta)",
          "G-Empa (Square)",
          "Forxiga (AstraZeneca)"
        ]
      },
      {
        "generic": "Erythropoietin Injection (EPO)",
        "class": "Erythropoiesis-Stimulating Agent (ESA)",
        "usage_bn": "কিডনি রোগের কারণে সৃষ্ট মারাত্মক রক্তশূন্যতায় রক্তকণিকা বৃদ্ধি করতে নিয়মিত সাবকিউটেনিয়াস ইনজেকশন",
        "usage_en": "Stimulates red blood cell production for anemia of chronic renal disease",
        "top_brands": [
          "Epotin (Square)",
          "Recormon (Roche)",
          "Epoetin (Incepta)"
        ]
      },
      {
        "generic": "Sevelamer Carbonate / Calcium Carbonate",
        "class": "Phosphate Binder",
        "usage_bn": "খাবারের সাথে সেব্য; রক্তে অতিরিক্ত ফসফেট জমা রোধ করে হাড় ও রক্তনালী সুরক্ষিত রাখে",
        "usage_en": "Binds dietary phosphate in gut lumen preventing mineral and bone disorder (CKD-MBD)",
        "top_brands": [
          "Renvel (Square)",
          "Sevcar (Incepta)",
          "Phoscut (Beximco)"
        ]
      },
      {
        "generic": "Telmisartan / Losartan",
        "class": "ARB (Early Stage Renoprotection)",
        "usage_bn": "প্রাথমিক পর্যায়ের সিকেডিতে প্রস্রাবে প্রোটিন নির্গমন কমায় (সতর্কতা: ক্রিয়েটিনিন ও পটাশিয়াম পর্যবেক্ষণ আবশ্যক)",
        "usage_en": "Reduces intraglomerular pressure and proteinuria in early stage CKD",
        "top_brands": [
          "Telmax (Square)",
          "Osartil (Square)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "প্রোটিন গ্রহণ পরিমিত রাখুন (বিশেষ করে রেড মিট বর্জন করুন; চিকিৎসক নির্দেশিত গ্রাম মেপে মাছ/ডিম খান)।",
      "পটাশিয়ামসমৃদ্ধ খাবার (কলা, ডাবের পানি, টমেটো, ডাল) এবং অতিরিক্ত লবণ কঠোরভাবে নিয়ন্ত্রণ করুন।",
      "ব্যথানাশক ওষুধ (NSAID) সম্পূর্ণ নিষিদ্ধ; কোনো ওষুধ খাওয়ার পূর্বে কিডনি বিশেষজ্ঞের অনুমোদন নিন।",
      "রক্তচাপ ১৩০/৮০ এর নিচে এবং রক্তের সুগার নিয়ন্ত্রণে রাখুন।"
    ],
    "lifestyle_diet_en": [
      "Low-protein diet (0.6-0.8 g/kg/day) to reduce nitrogenous waste load.",
      "Strict restriction of high-potassium foods (bananas, coconut water, legumes, dried fruits).",
      "Absolute contraindication to NSAIDs, aminoglycosides, and iodinated radiocontrast without prep.",
      "Strict target BP < 130/80 mmHg."
    ],
    "emergency_warning_bn": "প্রস্রাব সম্পূর্ণ বন্ধ হয়ে যাওয়া (Anuria), বুকে তীব্র ব্যথা, শ্বাসকষ্ট বা রক্তে পটাশিয়াম মারাত্মক বেড়ে গেলে (Hyperkalemia) তাৎক্ষণিক জরুরি হেমোডায়ালাইসিস প্রয়োজন।",
    "emergency_warning_en": "Uremic pericarditis, pulmonary edema, severe hyperkalemia (>6.5 mmol/L), or anuria requires emergent emergency hemodialysis."
  },
  {
    "id": "kidney-stones",
    "name_en": "Nephrolithiasis (Kidney & Ureteral Stones)",
    "name_bn": "কিডনিতে পাথর (নেফ্রোলিথিয়াসিস)",
    "icd10": "N20",
    "system": "renal",
    "system_bn": "রেণাল ও মূত্রতন্ত্র",
    "organ": "Kidneys & Urinary Tract",
    "organ_icon": "🫘",
    "severity": "Moderate to High",
    "overview_bn": "প্রস্রাবে খনিজ ও এসিড লবণের মাত্রা অতিরিক্ত বেড়ে গিয়ে কিডনি বা মূত্রনালীর ভেতরে স্ফটিক বা শক্ত পাথরের দলা তৈরি হওয়া।",
    "overview_en": "Hard deposits made of minerals and acid salts that form inside kidneys when urine becomes concentrated.",
    "causes_bn": [
      "পর্যাপ্ত পানি পান না করা (Chronic Dehydration)",
      "খাদ্যে অতিরিক্ত অক্সালেট, ইউরিক এসিড ও সোডিয়াম গ্রহণ",
      "হাইপারপ্যারাথাইরয়েডিজম বা বিপাকীয় সমস্যা",
      "ঘন ঘন মূত্রনালীর সংক্রমণ (UTI)"
    ],
    "causes_en": [
      "Inadequate fluid intake causing supersaturation of stone-forming salts",
      "High dietary intake of oxalates (spinach, nuts), animal purines, and sodium",
      "Primary hyperparathyroidism, renal tubular acidosis",
      "Recurrent urea-splitting bacterial urinary infections (Struvite stones)"
    ],
    "risk_factors_bn": [
      "গরম আবহাওয়ায় কম পানি পান",
      "পারিবারিক ইতিহাস",
      "স্থূলতা",
      "গেঁটেবাত (Gout)"
    ],
    "risk_factors_en": [
      "Arid climate with high sweat loss",
      "Family history",
      "Gout/hyperuricemia",
      "High protein/salt diet"
    ],
    "symptoms_bn": [
      "কোমরের একপাশে বা পিঠে তীব্র অসহ্য মোচড়ানো ব্যথা (Renal Colic) যা তলপেট ও কুঁচকিতে ছড়ায়",
      "প্রস্রাবের সাথে লালচে বা বাদামী রঙের রক্ত যাওয়া (Hematuria)",
      "প্রস্রাব করতে তীব্র জ্বালাপোড়া ও ঘন ঘন প্রস্রাবের বেগ",
      "তীব্র ব্যথার কারণে বমি বমি ভাব ও বমি হওয়া",
      "জ্বর ও কাঁপুনি (যদি ইনফেকশন যুক্ত হয়)"
    ],
    "symptoms_en": [
      "Excruciating spasmodic flank pain radiating to lower abdomen, groin, and scrotum/labia",
      "Gross or microscopic hematuria (pink, red, or cola-colored urine)",
      "Dysuria, urinary urgency, and interrupted urine stream",
      "Severe nausea and projectile vomiting from visceral autonomic reflex",
      "Fever and rigors if associated with pyelonephritis/urosepsis"
    ],
    "diagnostic_tests": [
      "Non-Contrast CT KUB (Gold Standard - detects 99% of stones)",
      "Ultrasonography of KUB (evaluates hydronephrosis)",
      "Urine Routine & Microscopic Examination (R/M/E)",
      "Serum Calcium, Uric Acid & Creatinine",
      "Stone Analysis (Calcium oxalate, Uric acid, Struvite)"
    ],
    "medicines": [
      {
        "generic": "Tamsulosin Hydrochloride (0.4mg)",
        "class": "Alpha-1 Blocker (Medical Expulsive Therapy - MET)",
        "usage_bn": "মূত্রনালীর পেশী শিথিল করে ছোট পাথর (<৬-৮ মিমি) সহজে ও ব্যথাহীনভাবে প্রস্রাবের সাথে বের হতে সাহায্য করে",
        "usage_en": "Relaxes ureteral smooth muscle aiding spontaneous passage of ureteral calculi (0.4 mg OD)",
        "top_brands": [
          "Tamsolin (Square)",
          "Uromax (Incepta)",
          "Prostacare (Beximco)"
        ]
      },
      {
        "generic": "Potassium Citrate + Citric Acid",
        "class": "Urinary Alkalinizer",
        "usage_bn": "প্রস্রাবের অম্লতা কমিয়ে ইউরিক এসিড ও ক্যালসিয়াম পাথর দ্রবীভূত করতে ও নতুন পাথর প্রতিরোধে সহায়ক",
        "usage_en": "Alkalinizes urine pH and increases urinary citrate inhibiting calcium crystal aggregation",
        "top_brands": [
          "Urocit-K",
          "Alkapot (Square)",
          "Citrokem (Incepta)"
        ]
      },
      {
        "generic": "Ketorolac Tromethamine / Drotaverine",
        "class": "NSAID Analgesic / Antispasmodic",
        "usage_bn": "কিডনির পাথরের তীব্র অসহ্য কোলিক পেইন দ্রুত উপশম করতে",
        "usage_en": "Relieves ureteric smooth muscle spasm and acute renal colic pain",
        "top_brands": [
          "Torax (Square)",
          "Ketonic (Beximco)",
          "Dorin (Incepta)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "প্রতিদিন অন্তত ৩ থেকে ৩.৫ লিটার বিশুদ্ধ পানি পান করুন যাতে প্রস্রাবের রঙ স্বচ্ছ পানির মতো থাকে।",
      "খাদ্যে অতিরিক্ত লবণ ও প্রাণিজ প্রোটিন (খাসি, গরু, কলিজা) কমিয়ে দিন।",
      "অক্সালেটযুক্ত খাবার (পালং শাক, বিটরুট, চকোলেট, অতিরিক্ত চা) পরিহার করুন।",
      "লেবুর শরবত বা সাইট্রাস ফলের রস নিয়মিত পান করুন (এতে থাকা সাইট্রেট পাথর প্রতিরোধ করে)।"
    ],
    "lifestyle_diet_en": [
      "Maintain high fluid intake aiming for >2.5 liters of clear urine output daily.",
      "Reduce dietary sodium and animal purines.",
      "Moderate high-oxalate foods (spinach, Swiss chard, almonds, beets).",
      "Daily lemon juice or citrus drinks containing natural stone-inhibiting citrate."
    ],
    "emergency_warning_bn": "পাথরের কারণে প্রস্রাব সম্পূর্ণ আটকে গেলে বা পাথরের সাথে তীব্র জ্বর ও কাঁপুনি দেখা দিলে তা কিডনির পুঁজ ও সেপসিস নির্দেশ করে। জরুরি ইউরোলজিক্যাল ইন্টারভেনশন প্রয়োজন।",
    "emergency_warning_en": "Obstructed solitary kidney, anuria, or stone with fever/chills (obstructive urosepsis) requires immediate ureteral stenting or nephrostomy."
  },
  {
    "id": "urinary-tract-infection",
    "name_en": "Urinary Tract Infection (UTI) & Cystitis",
    "name_bn": "মূত্রনালীর সংক্রমণ (ইউটিআই বা সিস্টাইটিস)",
    "icd10": "N39.0 / N30",
    "system": "renal",
    "system_bn": "রেণাল ও মূত্রতন্ত্র",
    "organ": "Bladder & Urethra",
    "organ_icon": "🫘",
    "severity": "Moderate",
    "overview_bn": "মূত্রথলি বা মূত্রনালীতে ব্যাকটেরিয়ার (বিশেষ করে ই. কোলাই) বিস্তার ও সংক্রমণ, যা নারীদের মধ্যে মূত্রনালী ছোট হওয়ার কারণে অনেক বেশি দেখা যায়।",
    "overview_en": "An infection affecting parts of urinary tract, primarily bladder (cystitis) and urethra, most commonly caused by uropathogenic Escherichia coli.",
    "causes_bn": [
      "মলদ্বার থেকে ই. কোলাই (E. coli) ব্যাকটেরিয়া মূত্রনালীতে প্রবেশ করা",
      "পর্যাপ্ত পানি পান না করা ও দীর্ঘক্ষণ প্রস্রাব আটকে রাখা",
      "অপরিচ্ছন্ন টয়লেট ব্যবহার ও ভুল নিয়মে পরিষ্কার করা (পেছন থেকে সামনে ধোয়া)",
      "যৌনমিলনের পর প্রস্রাব না করা",
      "ডায়াবেটিস বা ক্যাথেটার ব্যবহার"
    ],
    "causes_en": [
      "Uropathogenic Escherichia coli (UPEC) ascending from perineum (80-85% cases)",
      "Infrequent voiding, dehydration, and urinary stasis",
      "Improper wiping technique (back-to-front contamination)",
      "Post-coital bacterial inoculation",
      "Indwelling urinary catheters, glucosuria in diabetes"
    ],
    "risk_factors_bn": [
      "নারী লিঙ্গ (পুরুষদের চেয়ে ৩০ গুণ বেশি ঝুঁকিপূর্ণ)",
      "গর্ভাবস্থা",
      "বিবাহিত জীবন",
      "প্রস্টেট বৃদ্ধি (পুরুষদের ক্ষেত্রে)",
      "মেনোপজ"
    ],
    "risk_factors_en": [
      "Female anatomy (short urethra close to anus)",
      "Pregnancy",
      "Sexual activity",
      "Benign prostatic hyperplasia (BPH) in males",
      "Post-menopausal estrogen decline"
    ],
    "symptoms_bn": [
      "প্রস্রাবের সময় প্রচণ্ড জ্বালাপোড়া ও সুঁই ফোটার মতো ব্যথা (Dysuria)",
      "ঘন ঘন প্রস্রাবের প্রবল বেগ কিন্তু সামান্য প্রস্রাব হওয়া (Urgency & Frequency)",
      "তলপেটে ভারী বা কামড়ানো ব্যথা",
      "প্রস্রাবের রঙ ঘোলাটে, দুর্গন্ধযুক্ত বা লালচে রক্তবর্ণ (Hematuria)",
      "হালকা জ্বর ও শরীর মেজমেজ করা"
    ],
    "symptoms_en": [
      "Dysuria (intense burning pain during micturition)",
      "Urinary urgency, frequency with voiding small volumes",
      "Suprapubic discomfort and pelvic fullness",
      "Cloudy, foul-smelling, or pinkish/red tinged urine",
      "Low grade fever, fatigue, malaise"
    ],
    "diagnostic_tests": [
      "Urine Routine & Microscopic Examination (R/M/E - Pus cells > 5/HPF, RBC, Bacteria)",
      "Urine Culture & Sensitivity (C/S - Gold Standard for bacterial identification)",
      "Ultrasonography of KUB with Post-Void Residual (PVR) volume"
    ],
    "medicines": [
      {
        "generic": "Nitrofurantoin (100mg)",
        "class": "Urinary Antibacterial",
        "usage_bn": "অন্ত্রের স্বাভাবিক ব্যাকটেরিয়ার ক্ষতি না করে শুধু মূত্রনালীর ইনফেকশনে অত্যন্ত কার্যকর প্রথম পছন্দের অ্যান্টিবায়োটিক",
        "usage_en": "First-line oral agent concentrating specifically in bladder urine (100 mg BD for 5-7 days)",
        "top_brands": [
          "Nifuran (Square)",
          "Urotoin (Incepta)",
          "Nitrofur (Beximco)"
        ]
      },
      {
        "generic": "Fosfomycin Trometamol (3g Sachet)",
        "class": "Single-Dose Broad Spectrum Antibiotic",
        "usage_bn": "এক গ্লাস পানিতে গুলে মাত্র এক ডোজ পান করতে হয়; তীব্র সিস্টাইটিসে দ্রুত আরামদায়ক",
        "usage_en": "Convenient single-dose oral packet dissolving in water with high urinary bactericidal concentration",
        "top_brands": [
          "Fosmid (Square)",
          "Cystifos (Incepta)",
          "Fosfocin (Beximco)"
        ]
      },
      {
        "generic": "Cranberry Extract + D-Mannose",
        "class": "Anti-Adherence Urinary Supplement",
        "usage_bn": "ব্যাকটেরিয়াকে মূত্রথলির প্রাচীরে আঁকড়ে ধরতে দেয় না; ঘন ঘন ইউটিআই প্রতিরোধে দীর্ঘমেয়াদে উপকারী",
        "usage_en": "Prevents bacterial fimbrial adhesion to uroepithelium, preventing recurring UTIs",
        "top_brands": [
          "Uroberry (Square)",
          "Cranbex (Beximco)",
          "Uricran (Incepta)"
        ]
      },
      {
        "generic": "Flavoxate / Phenazopyridine",
        "class": "Urinary Antispasmodic & Analgesic",
        "usage_bn": "প্রস্রাবের তীব্র জ্বালাপোড়া ও ঘন ঘন চাপ দেওয়া দ্রুত উপশম করতে",
        "usage_en": "Relieves painful spasms and dysuria within hours of administration",
        "top_brands": [
          "Urispas (Incepta)",
          "Flavox (Square)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "প্রতিদিন অন্তত ৩ লিটার বিশুদ্ধ পানি পান করুন যাতে প্রস্রাবের মাধ্যমে ব্যাকটেরিয়া ধুয়ে বের হয়ে যায়।",
      "কখনোই প্রস্রাবের বেগ চেপে রাখবেন না; বেগ পাওয়া মাত্র প্রস্রাব ত্যাগ করুন।",
      "শৌচকর্মের সময় সব সময় সামনে থেকে পেছনের দিকে পরিষ্কার করুন (কখনোই পেছন থেকে সামনে নয়)।",
      "সহবাসের পরপরই প্রস্রাব করে মূত্রনালী পরিষ্কার করার অভ্যাস গড়ে তুলুন।"
    ],
    "lifestyle_diet_en": [
      "Drink at least 2.5-3 liters of fluids daily to actively flush pathogens.",
      "Never hold urine; void as soon as urge occurs and empty bladder completely.",
      "Always wipe from front to back after toileting to avoid rectal flora transfer.",
      "Void urine immediately post-coitus to clear any mechanically inoculated microbes."
    ],
    "emergency_warning_bn": "কাঁপুনি দিয়ে তীব্র জ্বর, কোমরের পেছনে একপাশে তীব্র ব্যথা এবং বমি হওয়া ইনফেকশন কিডনিতে ছড়িয়ে পড়া (Acute Pyelonephritis) নির্দেশ করে। জরুরি শিরার মাধ্যমে অ্যান্টিবায়োটিক প্রয়োজন।",
    "emergency_warning_en": "High fever with chills, severe unilateral flank pain (CVA tenderness), and vomiting indicates Acute Pyelonephritis requiring IV antimicrobials."
  },
  {
    "id": "osteoarthritis",
    "name_en": "Osteoarthritis (OA)",
    "name_bn": "অস্টিওআর্থ্রাইটিস (সন্ধিবাত বা হাঁটুর ক্ষয়রোগ)",
    "icd10": "M15 / M17",
    "system": "musculoskeletal",
    "system_bn": "অস্থি ও পেশীতন্ত্র",
    "organ": "Joints & Cartilage (Knees, Hips, Spine)",
    "organ_icon": "🦴",
    "severity": "Moderate",
    "overview_bn": "হাড়ের সংযোগস্থলের প্রতিরক্ষামূলক নরম তরুণাস্থি (Cartilage) ধীরে ধীরে ক্ষয় হয়ে হাড়ে হাড়ে ঘষা লাগা, তীব্র ব্যথা ও চলাচলে অক্ষমতা তৈরি হওয়া।",
    "overview_en": "A degenerative wear-and-tear joint disease characterized by breakdown of articular cartilage and underlying subchondral bone remodeling.",
    "causes_bn": [
      "বয়স বৃদ্ধির সাথে সাথে জয়েন্টের কার্টিলেজের স্বাভাবিক স্থিতিস্থাপকতা হ্রাস",
      "অতিরিক্ত শারীরিক ওজন যা হাঁটু ও নিতম্বের সন্ধিতে মাত্রাতিরিক্ত চাপ দেয়",
      "পূর্বে জয়েন্টে কোনো আঘাত বা লিগামেন্ট ছিঁড়ে যাওয়া (Prior trauma)",
      "বংশগত হাড় ও তরুণাস্থির দুর্বলতা"
    ],
    "causes_en": [
      "Age-related chondrocyte senescence and loss of proteoglycan matrix",
      "Mechanical overload from chronic obesity on weight-bearing joints",
      "Post-traumatic joint injury (meniscal tear, ACL damage)",
      "Genetic predisposition and joint malalignment (genu varum/valgum)"
    ],
    "risk_factors_bn": [
      "৫০+ বয়স",
      "মহিলাদের ক্ষেত্রে বেশি প্রবণতা",
      "স্থূলতা",
      "ভারী বোঝা বহনের পেশা"
    ],
    "risk_factors_en": [
      "Age >50",
      "Female sex (post-menopausal)",
      "Obesity (quadruples knee OA risk)",
      "Repetitive occupational stress"
    ],
    "symptoms_bn": [
      "হাঁটাহাঁটি করলে বা সিঁড়ি দিয়ে উঠা-নামা করলে হাঁটুতে তীব্র ব্যথা",
      "সকালে ঘুম থেকে উঠলে জয়েন্ট শক্ত হয়ে থাকা (Morning stiffness < 30 minutes)",
      "জয়েন্ট নাড়ালে কটকট বা মটমট শব্দ হওয়া (Crepitus)",
      "জয়েন্ট ফুলে যাওয়া ও চারপাশের পেশী দুর্বল হয়ে যাওয়া",
      "দীর্ঘক্ষণ বসে থাকার পর হঠাৎ উঠে দাঁড়াতে প্রচণ্ড কষ্ট হওয়া"
    ],
    "symptoms_en": [
      "Joint pain aggravated by movement/weight-bearing and relieved by rest",
      "Morning joint stiffness lasting less than 30 minutes",
      "Audible or palpable joint crepitus upon movement",
      "Bony enlargement, joint effusion, and quadriceps muscle wasting",
      "Gelling phenomenon: stiffness after periods of inactivity"
    ],
    "diagnostic_tests": [
      "Weight-Bearing Plain X-Ray of Joint (Joint space narrowing, osteophytes, subchondral sclerosis)",
      "MRI of Knee (evaluates cartilage loss and meniscal pathology)",
      "Serum ESR & Rheumatoid Factor (to exclude inflammatory arthritis)",
      "Synovial Fluid Analysis (non-inflammatory clear fluid)"
    ],
    "medicines": [
      {
        "generic": "Glucosamine Sulfate + Chondroitin",
        "class": "Cartilage Nutrition / Chondroprotective",
        "usage_bn": "তরুণাস্থির ক্ষয় ধীর করে এবং জয়েন্টের অভ্যন্তরীণ সাইনোভিয়াল ফ্লুইড তৈরিতে সহায়তা করে",
        "usage_en": "Symptomatic slow-acting drug for osteoarthritis (SYSADOA) protecting cartilage matrix",
        "top_brands": [
          "Cartilage (Square)",
          "Rejoin (Incepta)",
          "Flexi (Beximco)",
          "Cartil (Renata)"
        ]
      },
      {
        "generic": "Paracetamol 665mg XR / Celecoxib 200mg",
        "class": "Analgesic / Selective COX-2 Inhibitor",
        "usage_bn": "জয়েন্টের ব্যথা ও প্রদাহ প্রশমনে (পাকস্থলীর জন্য তুলনামূলক নিরাপদ COX-2 স্পেসিফিক)",
        "usage_en": "Pain control; selective COX-2 inhibitor has reduced gastrointestinal bleeding risk",
        "top_brands": [
          "Celenta (Square)",
          "Celeb (Beximco)",
          "Cox-B (Incepta)",
          "Ace XR (Square)"
        ]
      },
      {
        "generic": "Intra-Articular Hyaluronic Acid Injection",
        "class": "Viscosupplementation",
        "usage_bn": "হাঁটুর জয়েন্টের ভেতরে সরাসরি কৃত্রিম লুব্রিকেন্ট ইনজেকশন যা ৬-১২ মাস ঘর্ষণহীন রাখে",
        "usage_en": "Restores viscoelasticity of synovial fluid directly inside knee capsule",
        "top_brands": [
          "Synvisc",
          "Hyalgan",
          "Ostenil"
        ]
      },
      {
        "generic": "Diacerein (50mg)",
        "class": "Interleukin-1 Inhibitor",
        "usage_bn": "জয়েন্টের অভ্যন্তরীণ প্রদাহজনক সাইটোকাইন কমিয়ে দীর্ঘমেয়াদী ব্যথা নিয়ন্ত্রণ করে",
        "usage_en": "Inhibits IL-1 beta reducing catabolic cartilage breakdown",
        "top_brands": [
          "Arthrocer (Square)",
          "Diacer (Incepta)",
          "Carticare (Beximco)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "শরীরের ওজন ৫ কেজি কমালে হাঁটুর জয়েন্টের ওপর থেকে ২০ কেজির সমপরিমাণ চাপ হ্রাস পায়।",
      "হাঁটু মুড়ে নিচে বা মেঝেতে বসা সম্পূর্ণ পরিহার করুন; হাই-কমোড ব্যবহার করুন।",
      "কোয়াড্রিসেপস শক্তিশালী করার আইসোমেট্রিক ফিজিওথেরাপি ব্যায়াম নিয়মিত করুন।",
      "নরম আরামদায়ক সোলের জুতো ব্যবহার করুন এবং হাঁটাহাঁটিতে প্রয়োজনে লাঠি ব্যবহার করুন।"
    ],
    "lifestyle_diet_en": [
      "Weight reduction: losing 1 lb off body weight relieves 4 lbs of pressure off knees.",
      "Avoid cross-legged sitting, squatted postures; use Western-style high commodes.",
      "Quadriceps and hamstring strengthening exercises (swimming, cycling, straight leg raises).",
      "Cushioned footwear and shock-absorbing walking aids."
    ],
    "emergency_warning_bn": "জয়েন্ট হঠাৎ লাল হয়ে প্রচণ্ড গরম হয়ে যাওয়া, তীব্র জ্বরের সাথে অসহ্য ব্যথা হওয়া জয়েন্টে ব্যাকটেরিয়াল ইনফেকশন (Septic Arthritis) নির্দেশ করে। অবিলম্বে জয়েন্ট ফ্লুইড পরীক্ষা জরুরি।",
    "emergency_warning_en": "Acute erythematous, hot, swollen joint with systemic fever signifies Septic Arthritis requiring urgent arthrocentesis and IV antibiotics."
  },
  {
    "id": "rheumatoid-arthritis",
    "name_en": "Rheumatoid Arthritis (RA)",
    "name_bn": "রিউমাটয়েড আর্থ্রাইটিস (বাতব্যাধি বা অটোইমিউন বাত)",
    "icd10": "M05 / M06",
    "system": "musculoskeletal",
    "system_bn": "অস্থি ও পেশীতন্ত্র",
    "organ": "Joints & Synovium",
    "organ_icon": "🦴",
    "severity": "High",
    "overview_bn": "একটি দীর্ঘস্থায়ী অটোইমিউন রোগ যেখানে দেহের রোগ প্রতিরোধ ব্যবস্থা ভুলবশত নিজের জয়েন্টের সাইনোভিয়াল পর্দাকে আক্রমণ করে উভয় পাশের ছোট জয়েন্টগুলো ফুলে বিকৃত করে ফেলে।",
    "overview_en": "A systemic autoimmune inflammatory disorder causing symmetrical polyarthritis primarily targeting synovial joints, leading to cartilage destruction and bone erosion.",
    "causes_bn": [
      "অটোইমিউন প্রতিক্রিয়া: ইমিউন সিস্টেম সাইনোভিয়াল টিস্যুকে আক্রমণ করে",
      "বংশগত HLA-DR4 ও HLA-DR1 জিনগত সংবেদনশীলতা",
      "ধূমপানজনিত সাইট্রুলিনেশন (Citrullination) ও অ্যান্টিবডি তৈরি",
      "হরমোন ও পরিবেশগত ট্রিগার"
    ],
    "causes_en": [
      "Autoimmune attack against synovial antigens by autoantibodies (RF and anti-CCP)",
      "Genetic predisposition linked to HLA-DRB1 shared epitope alleles",
      "Tobacco smoking triggering mucosal citrullination and immune dysregulation",
      "Epigenetic and micro-environmental triggers"
    ],
    "risk_factors_bn": [
      "নারীদের ক্ষেত্রে পুরুষদের তুলনায় ৩ গুণ বেশি",
      "৩০ থেকে ৫০ বছর বয়স",
      "ধূমপান",
      "পারিবারিক ইতিহাস"
    ],
    "risk_factors_en": [
      "Female gender (3:1)",
      "Peak age of onset 30-55",
      "Cigarette smoking (major environmental factor)",
      "Family history of autoimmune disease"
    ],
    "symptoms_bn": [
      "উভয় হাতের আঙুল, কব্জি ও পায়ের ছোট জয়েন্টগুলোতে প্রতিসম (Symmetrical) ফোলা ও ব্যথা",
      "সকালে ঘুম থেকে উঠলে জয়েন্ট অত্যন্ত শক্ত হয়ে থাকা যা ১ ঘণ্টারও বেশি সময় ধরে চলে (Morning stiffness > 1 hour)",
      "জয়েন্ট গরম ও লালচে হওয়া",
      "হাত ও আঙুল বাঁকা হয়ে যাওয়া (Ulnar deviation, Swan-neck deformity)",
      "ক্রমাগত অবসাদ, হালকা জ্বর ও রক্তশূন্যতা"
    ],
    "symptoms_en": [
      "Symmetrical polyarthritis affecting MCP, PIP, and MTP small joints",
      "Prolonged morning joint stiffness lasting longer than 60 minutes",
      "Warm, boggy, tender joint swelling",
      "Progressive joint deformities (swan-neck, boutonniere, ulnar drift)",
      "Systemic malaise, low-grade fever, subcutaneous rheumatoid nodules"
    ],
    "diagnostic_tests": [
      "Anti-Cyclic Citrullinated Peptide (Anti-CCP / ACPA - >95% specific)",
      "Rheumatoid Factor (RF IgM titer)",
      "ESR & C-Reactive Protein (CRP - monitors systemic inflammation)",
      "X-Ray of Hands and Feet (Periarticular osteopenia, marginal bone erosions)",
      "Musculoskeletal Ultrasound / MRI (detects active synovitis and bone marrow edema)"
    ],
    "medicines": [
      {
        "generic": "Methotrexate (7.5mg - 20mg Weekly)",
        "class": "Conventional Synthetic DMARD (Anchor Drug)",
        "usage_bn": "রোগের অগ্রগতি স্থায়ীভাবে থামাতে প্রথম পছন্দের মূল ওষুধ (সতর্কতা: সপ্তাহে মাত্র একদিন সেব্য, সাথে ফলিক এসিড আবশ্যক)",
        "usage_en": "Gold standard anchor DMARD taken once weekly with mandatory folic acid supplementation",
        "top_brands": [
          "Trex (Square)",
          "Metrex (Incepta)",
          "Novidat",
          "Rheumatrex (Beximco)"
        ]
      },
      {
        "generic": "Hydroxychloroquine (200mg)",
        "class": "Antimalarial DMARD",
        "usage_bn": "মৃদু বা মাঝারি রিউমাটয়েডে প্রদাহ নিয়ন্ত্রণে নিরাপদ সহায়ক ওষুধ",
        "usage_en": "Mild immunomodulator commonly used in early combination therapy (200 mg OD/BD)",
        "top_brands": [
          "Reuqin (Square)",
          "Plenil (Incepta)",
          "Hydrox (Beximco)"
        ]
      },
      {
        "generic": "Tofacitinib / Baricitinib",
        "class": "Targeted Synthetic DMARD (JAK Inhibitor)",
        "usage_bn": "আধুনিক মুখে খাওয়ার জৈব ওষুধ যা তীব্র ও ওষুধ-প্রতিরোধী বাতের আক্রমণ নিয়ন্ত্রণে যুগান্তকারী",
        "usage_en": "Targeted JAK kinase inhibitor for moderate-to-severe refractory disease",
        "top_brands": [
          "Tofata (Square)",
          "Jaknib (Incepta)",
          "Tofajak (Beximco)"
        ]
      },
      {
        "generic": "Deflazacort / Prednisolone (Short course bridging)",
        "class": "Corticosteroid",
        "usage_bn": "ডিএমএআরডি কাজ শুরু করার পূর্ববর্তী প্রাথমিক সপ্তাহে দ্রুত প্রদাহ ও তীব্র যন্ত্রণা প্রশমনে ব্রিজিং থেরাপি",
        "usage_en": "Rapid flare control bridging therapy tapered once DMARDs take effect",
        "top_brands": [
          "Defla (Square)",
          "Cortan (Beximco)",
          "Precodil (Incepta)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "সক্রিয় প্রদাহের সময়ও পেশীর দুর্বলতা এড়াতে ফিজিওথেরাপিস্টের পরামর্শে হালকা স্ট্রেচিং ও মোশন এক্সারসাইজ করুন।",
      "অ্যান্টি-ইনফ্ল্যামেটরি ডায়েট মেনে চলুন: সামুদ্রিক মাছ, জলপাই তেল, হলুদ ও আখরোট প্রদাহ কমায়।",
      "ধূমপান অবিলম্বে ত্যাগ করুন (ধূমপান রিউমাটয়েড আর্থ্রাইটিসের ওষুধ অকেজো করে দেয়)।",
      "জয়েন্টের ওপর অতিরিক্ত চাপ না দিতে ভারী কাজ করার সময় স্প্লিন্ট বা সহায়ক ডিভাইস ব্যবহার করুন।"
    ],
    "lifestyle_diet_en": [
      "Perform gentle range-of-motion and isometric joint exercises to preserve flexibility.",
      "Anti-inflammatory Mediterranean diet high in omega-3 fish oils and antioxidants.",
      "Immediate smoking cessation as tobacco accelerates joint destruction and blunts response to DMARDs.",
      "Utilize ergonomic joint protection aids for daily chores."
    ],
    "emergency_warning_bn": "ঘাড়ে তীব্র ব্যথা এবং হাত-পায়ে হঠাৎ অবশ ভাব মেরুদণ্ডের ওপরের হাড়ের বিচ্যুতি (Atlantoaxial Subluxation) নির্দেশ করতে পারে যা তাৎক্ষণিক নিউরোসার্জিক্যাল মূল্যায়ন দাবি করে।",
    "emergency_warning_en": "Severe cervical spine pain with upper/lower extremity neurological signs warrants urgent imaging for atlantoaxial joint subluxation and spinal cord compression."
  },
  {
    "id": "dengue-fever",
    "name_en": "Dengue Fever & Dengue Hemorrhagic Fever",
    "name_bn": "ডেঙ্গু জ্বর ও রক্তক্ষরণজনিত ডেঙ্গু",
    "icd10": "A90 / A91",
    "system": "infectious",
    "system_bn": "সংক্রামক ব্যাধি",
    "organ": "Circulatory System & Platelets",
    "organ_icon": "🦟",
    "severity": "High to Critical",
    "overview_bn": "এডিস মশার কামড়ের মাধ্যমে সংক্রমিত ডেঙ্গু ভাইরাসজনিত তীব্র জ্বর। মারাত্মক পর্যায়ে ক্যাপিলারি লিকেজের ফলে রক্তচাপ কমে যাওয়া এবং রক্তের প্লাটিলেট আশঙ্কাজনকভাবে হ্রাস পায়।",
    "overview_en": "A mosquito-borne tropical viral disease caused by Dengue virus (DENV-1 to 4) transmitted by female Aedes aegypti, potentially leading to severe capillary plasma leak and shock.",
    "causes_bn": [
      "ডেঙ্গু ভাইরাস (DENV ১, ২, ৩, ৪ সেরোটাইপ)",
      "সংক্রমিত স্ত্রী এডিস মশার (Aedes aegypti / albopictus) দংশন",
      "আবাসস্থলে জমে থাকা পরিষ্কার স্বচ্ছ পানিতে মশার বংশবৃদ্ধি",
      "পূর্বে ভিন্ন সেরোটাইপের ডেঙ্গু হয়ে থাকলে দ্বিতীয়বার মারাত্মক জটিলতার ঝুঁকি"
    ],
    "causes_en": [
      "Dengue virus infection across four distinct serotypes (DENV 1-4)",
      "Transmission by infected female Aedes aegypti mosquitoes",
      "Stagnant clean water containers acting as domestic breeding sites",
      "Antibody-dependent enhancement (ADE) in secondary heterotypic infection"
    ],
    "risk_factors_bn": [
      "বর্ষাকাল ও পরবর্তী মৌসুম",
      "বাসাবাড়ির টব বা ড্রামে পানি জমে থাকা",
      "শিশু ও গর্ভবতী মা",
      "পূর্বে ডেঙ্গু আক্রান্ত হওয়া"
    ],
    "risk_factors_en": [
      "Monsoon/post-monsoon season",
      "Urban water stagnancy",
      "Extreme age & pregnancy",
      "Secondary dengue infection"
    ],
    "symptoms_bn": [
      "হঠাৎ তীব্র উচ্চ জ্বর (১০৩°-১০৫° ফারেনহাইট)",
      "চোখের পেছনের অংশে তীব্র ব্যথা (Retro-orbital pain)",
      "হাড়, মাংসপেশি ও জয়েন্টে অসহ্য ভাঙা ব্যথা ('Break-bone fever')",
      "শরীরে লালচে ফুসকুড়ি বা র্যাশ (Dengue Rash)",
      "তীব্র বমি বমি ভাব, অরুচি ও চরম শারীরিক দুর্বলতা"
    ],
    "symptoms_en": [
      "Sudden high-grade fever (103-105 F)",
      "Severe retro-orbital pain aggravated by eye movement",
      "Severe generalized arthralgia and myalgia (break-bone fever)",
      "Maculopapular petechial skin rash",
      "Intractable nausea, metallic taste, severe prostration"
    ],
    "diagnostic_tests": [
      "Dengue NS1 Antigen (Positive within Day 1 to Day 4 of fever)",
      "Complete Blood Count (Serial Hematocrit HCT & Platelet Count monitoring)",
      "Dengue IgM & IgG Antibody Test (Positive after Day 5)",
      "Serum ALT/AST (Liver transaminases)",
      "Ultrasonography of Abdomen (evaluates Gallbladder wall thickening & Ascites)"
    ],
    "medicines": [
      {
        "generic": "Paracetamol (500mg)",
        "class": "Antipyretic (Only Safe Medication)",
        "usage_bn": "জ্বর ও তীব্র ব্যথায় একমাত্র নিরাপদ ওষুধ (সর্বোচ্চ দৈনিক ৩-৪ গ্রাম; কখনোই ব্যথানাশক খাওয়া যাবে না)",
        "usage_en": "Only safe antipyretic for dengue fever; NSAIDs strictly contraindicated (max 3-4 g/day)",
        "top_brands": [
          "Napa (Beximco)",
          "Ace (Square)",
          "Renova (Renata)"
        ]
      },
      {
        "generic": "Oral Rehydration Salts (ORS) / Coconut Water",
        "class": "Fluid & Electrolyte Replacement",
        "usage_bn": "ক্যাপিলারি লিকেজ ও পানিশূন্যতা রোধে দিনে আড়াই থেকে ৩ লিটার তরল খাবার",
        "usage_en": "Essential oral hydration preventing plasma leakage and hypovolemia",
        "top_brands": [
          "Orsaline-N (SMC)",
          "Taste Saline (Square)"
        ]
      },
      {
        "generic": "IV Normal Saline (0.9% NaCl) / Ringer's Lactate",
        "class": "Intravenous Crystalloid Resuscitation",
        "usage_bn": "ক্রিটিক্যাল ফেজে (জ্বর কমার সময়) হাসপাতালে হেমাটোক্রিট পর্যবেক্ষণ সাপেক্ষে মেপে মেপে আইভি স্যালাইন",
        "usage_en": "Titrated IV crystalloid based on hematocrit in hospital for plasma leakage phase",
        "top_brands": [
          "Normal Saline IV (Beximco / Square / Orion)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "অ্যাসপিরিন, ডাইক্লোফেনাক বা যেকোনো ব্যথানাশক (NSAIDs) সম্পূর্ণ নিষিদ্ধ (এগুলো খেলে রক্তক্ষরণ হয়ে মৃত্যু হতে পারে)।",
      "রোগীকে সম্পূর্ণ বেড রেস্টে রাখুন এবং দিনে প্রচুর তরল খাবার (স্যালাইন, ডাবের পানি, স্যুপ, ফলের জুস) পান করান।",
      "দিনে ও রাতে ঘুমানোর সময় মশারি টানান যাতে অন্য কারো মধ্যে মশা সংক্রমণ না ছড়ায়।",
      "জ্বর কমার পর (৩য় থেকে ৭ম দিন) সবচেয়ে ঝুঁকিপূর্ণ 'ক্রিটিক্যাল ফেজ'; এই সময় নিয়মিত প্লাটিলেট ও হেমাটোক্রিট পরীক্ষা করুন।"
    ],
    "lifestyle_diet_en": [
      "STRICT CONTRAINDICATION to Aspirin, Ibuprofen, Diclofenac or any NSAIDs (provokes fatal hemorrhages).",
      "Absolute bed rest and aggressive oral hydration (electrolyte water, broths, coconut water).",
      "Sleep under mosquito nets even during daytime to prevent spreading infection to household.",
      "The critical phase begins as fever defervesces (Days 3-7); close hematocrit/platelet monitoring essential."
    ],
    "emergency_warning_bn": "পেটে তীব্র ব্যথা, ক্রমাগত বমি, মাড়ি বা নাক দিয়ে রক্তপাত, কালো পায়খানা বা চরম অবসাদ ডেঙ্গু শক সিন্ড্রোমের (DSS) লক্ষণ। তাৎক্ষণিক রোগীকে আইসিইউযুক্ত হাসপাতালে ভর্তি করুন।",
    "emergency_warning_en": "Warning signs: persistent vomiting, abdominal pain, mucosal bleeding, lethargy, or rising HCT with falling platelets requires urgent hospitalization for Dengue Shock Syndrome."
  },
  {
    "id": "typhoid-fever",
    "name_en": "Typhoid & Enteric Fever",
    "name_bn": "টাইফয়েড বা এন্টেরিক ফিভার (অন্ত্রের তীব্র সংক্রমণ)",
    "icd10": "A01",
    "system": "infectious",
    "system_bn": "সংক্রামক ব্যাধি",
    "organ": "Gastrointestinal Tract & Spleen",
    "organ_icon": "🦠",
    "severity": "High",
    "overview_bn": "সালমোনেলা টাইফি ব্যাকটেরিয়া দ্বারা দূষিত খাবার বা পানির মাধ্যমে সংক্রমিত তীব্র সিস্টেমিক জ্বর যা অন্ত্রের লিম্ফ নোড ও রক্তে ছড়িয়ে পড়ে।",
    "overview_en": "A systemic bacterial infection caused by Salmonella enterica serotype Typhi transmitted via the fecal-oral route through contaminated food and water.",
    "causes_bn": [
      "সালমোনেলা টাইফি (Salmonella Typhi) এবং প্যারাটাইফি ব্যাকটেরিয়ার সংক্রমণ",
      "অনিরাপদ রাস্তার খোলা খাবার ও পানীয় গ্রহণ (Fecal-Oral Transmission)",
      "খাবার তৈরির পূর্বে ভালোভাবে হাত না ধোয়া",
      "টাইফয়েডের ক্রনিক ক্যারিয়ারের মাধ্যমে খাদ্য দূষণ"
    ],
    "causes_en": [
      "Salmonella enterica serovar Typhi/Paratyphi infection",
      "Ingestion of food or water contaminated with infected human feces/urine",
      "Poor personal hygiene and inadequate handwashing",
      "Chronic asymptomatic biliary carriers shedding bacilli"
    ],
    "risk_factors_bn": [
      "রাস্তার খোলা শরবত বা স্ট্রিট ফুড খাওয়া",
      "বিশুদ্ধ পানির অভাব",
      "বৃষ্টি ও বন্যার পানি দূষণ"
    ],
    "risk_factors_en": [
      "Consuming untreated tap water or street food",
      "Substandard sanitation",
      "Flood-prone endemic regions"
    ],
    "symptoms_bn": [
      "ধাপে ধাপে জ্বর বৃদ্ধি পাওয়া (Step-ladder pattern fever) যা ১০৩°-১০৪° পর্যন্ত ওঠে",
      "তীব্র মাথাব্যথা ও চরম শরীর ব্যথা",
      "পেট ব্যথা, পেট ফাঁপা ও কোষ্ঠকাঠিন্য (পরবর্তীতে মটর দানার মতো ডায়রিয়া)",
      "বুকের খাঁচায় গোলাপী রঙের ফুসকুড়ি (Rose spots)",
      "জ্বরের তুলনায় নাড়ির গতি অস্বাভাবিকভাবে কম থাকা (Relative Bradycardia / Faget's Sign)"
    ],
    "symptoms_en": [
      "Step-ladder progressive rising high-grade fever",
      "Severe frontal headache and profound malaise",
      "Abdominal pain, distension, initial constipation followed by 'pea-soup' diarrhea",
      "Rose spots (faint salmon-colored macules on trunk)",
      "Relative bradycardia (pulse rate inappropriately slow for high fever temperature)"
    ],
    "diagnostic_tests": [
      "Blood Culture for Salmonella Typhi (Gold Standard in 1st week)",
      "Typhidot IgM & IgG Antibody Rapid Test",
      "Widal Test (Significant if TO & TH titer >= 1:160 on paired sera)",
      "Complete Blood Count (Leukopenia with Eosinopenia)",
      "Stool & Urine Culture (in 2nd and 3rd week)"
    ],
    "medicines": [
      {
        "generic": "Cefixime (200mg / 400mg)",
        "class": "3rd Generation Cephalosporin (Oral)",
        "usage_bn": "টাইফয়েড নিরাময়ে প্রথম সারির কার্যকর মুখে খাওয়ার অ্যান্টিবায়োটিক (১৪ দিনের পূর্ণ কোর্স)",
        "usage_en": "First-line oral treatment for uncomplicated enteric fever (20 mg/kg/day in two doses for 14 days)",
        "top_brands": [
          "Cef-3 (Square)",
          "T-Cef (Incepta)",
          "Oricef-O (Incepta)",
          "Triocim (Beximco)"
        ]
      },
      {
        "generic": "Azithromycin (500mg)",
        "class": "Macrolide Antibiotic",
        "usage_bn": "মাল্টিড্রাগ রেজিস্ট্যান্ট টাইফয়েড চিকিৎসায় অত্যন্ত কার্যকর (দৈনিক ১ গ্রাম প্রথম দিন, পরে ৫০০ মিগ্রা ৭ দিন)",
        "usage_en": "Highly effective for multi-drug resistant (MDR) Salmonella strains",
        "top_brands": [
          "Zithrin (Square)",
          "Azyth (Incepta)",
          "Macrozith (Beximco)"
        ]
      },
      {
        "generic": "Ceftriaxone (IV 1g - 2g)",
        "class": "3rd Generation Cephalosporin (Parenteral)",
        "usage_bn": "তীব্র ও জটিল টাইফয়েডে হাসপাতালে শিরার মাধ্যমে ইনজেকশন থেরাপি",
        "usage_en": "Intravenous therapy for severe, hospitalized enteric fever",
        "top_brands": [
          "Ceftron (Square)",
          "Rocephin (Roche)",
          "Oricef (Incepta)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "সব সময় ফুটিয়ে ঠান্ডা করা নিরাপদ পানি পান করুন।",
      "খাবার গ্রহণের পূর্বে ও শৌচাগার ব্যবহারের পর সাবান দিয়ে অন্তত ২০ সেকেন্ড হাত ধোয়ার অভ্যাস করুন।",
      "সহজে হজম হয় এমন পুষ্টিকর তরল ও নরম খাবার (খিচুড়ি, জাউ ভাত, স্যুপ) খান।",
      "রাস্তার খোলা শরবত, ফুচকা ও কাঁচা সালাদ খাওয়া সম্পূর্ণ বন্ধ রাখুন।"
    ],
    "lifestyle_diet_en": [
      "Drink exclusively boiled or certified filtered bottled water.",
      "Strict hand hygiene with soap and water after lavatory use and prior to eating.",
      "Easily digestible, high-calorie soft diet (congee, boiled eggs, broths).",
      "Avoid raw street food, tap water ice cubes, and unpeeled fresh fruits."
    ],
    "emergency_warning_bn": "জ্বরের দ্বিতীয়-তৃতীয় সপ্তাহে হঠাৎ পেটে অসহ্য তীব্র ব্যথা ও পেট শক্ত কাঠের মতো হয়ে যাওয়া অন্ত্রের প্রাচীর ফুটো হয়ে যাওয়া (Intestinal Perforation) নির্দেশ করে। জরুরি অস্ত্রোপচার প্রয়োজন।",
    "emergency_warning_en": "Sudden abdominal rigidity, rebound tenderness, and hypovolemic shock signifies ileal intestinal perforation demanding immediate laparotomy."
  },
  {
    "id": "eczema-dermatitis",
    "name_en": "Atopic Dermatitis & Eczema",
    "name_bn": "একজিমা ও এটোপিক চর্মপ্রদাহ",
    "icd10": "L20",
    "system": "dermatology",
    "system_bn": "ত্বক ও চর্মরোগ",
    "organ": "Skin Barrier",
    "organ_icon": "🩹",
    "severity": "Moderate",
    "overview_bn": "ত্বকের প্রাকৃতিক প্রতিরক্ষামূলক আস্তরণ নষ্ট হয়ে দীর্ঘমেয়াদী শুষ্কতা, লালচে প্রদাহ ও তীব্র অস্বস্তিকর চুলকানি সৃষ্টি হওয়া।",
    "overview_en": "A chronic pruritic inflammatory skin disease characterized by skin barrier disruption, immune dysregulation, and intense itching.",
    "causes_bn": [
      "ত্বকের ফিলাগ্রিন (Filaggrin) প্রোটিনের জেনেটিক ঘাটতি যা ত্বককে আর্দ্র রাখতে ব্যর্থ হয়",
      "সাবান, ডিটারজেন্ট, সুগন্ধি ও রাসায়নিক উপাদানের অ্যালার্জি",
      "ধুলোবালি, সিন্থেটিক বা উলের পোশাকের ঘর্ষণ",
      "আবহাওয়ার পরিবর্তন (শীতকালে শুষ্কতা বৃদ্ধি)",
      "মানসিক চাপ ও অস্বাস্থ্যকর পরিবেশ"
    ],
    "causes_en": [
      "Filaggrin gene mutations impairing stratum corneum epidermal barrier function",
      "Contact irritants (harsh alkaline soaps, synthetic detergents, fragrances)",
      "Aeroallergens, wool textiles, environmental humidity changes",
      "Type 2 immune inflammation (IL-4 and IL-13 cytokines)"
    ],
    "risk_factors_bn": [
      "পারিবারিক একজিমা, অ্যালার্জি বা হাঁপানির ইতিহাস (Atopic Triad)",
      "শহুরে জীবন",
      "সংবেদনশীল শুষ্ক ত্বক"
    ],
    "risk_factors_en": [
      "Personal or family history of atopy (Asthma, Allergic Rhinitis, Eczema)",
      "Urban environment",
      "Frequent hot bathing"
    ],
    "symptoms_bn": [
      "অসহ্য ও তীব্র চুলকানি (বিশেষ করে রাতে চুলকানি বেড়ে গিয়ে ঘুমে ব্যাঘাত ঘটায়)",
      "ত্বক অত্যন্ত শুষ্ক, খসখসে ও ফেটে যাওয়া",
      "কনুইয়ের ভাঁজ, হাঁটুর পেছনে, ঘাড়ে ও মুখে লালচে ছোপ ছোপ প্রদাহ",
      "চুলকাতে চুলকাতে ত্বক থেকে রস ঝরা এবং পরবর্তীতে ত্বক শক্ত ও চামড়ার মতো পুরু হয়ে যাওয়া (Lichenification)",
      "ত্বকে ক্ষতের কারণে ব্যাকটেরিয়াল সংক্রমণের ঝুঁকি"
    ],
    "symptoms_en": [
      "Intense, intractable pruritus leading to itch-scratch cycle",
      "Xerosis (profoundly dry, rough, scaling skin)",
      "Erythematous papules and plaques predominantly on flexural creases (antecubital and popliteal fossae)",
      "Oozing and crusting in acute stage; lichenification in chronic stage",
      "Secondary bacterial impetiginization by Staphylococcus aureus"
    ],
    "diagnostic_tests": [
      "Clinical Examination (Hanifin and Rajka Criteria)",
      "Serum Total IgE Levels",
      "Skin Prick Allergy Testing / Patch Testing",
      "Skin Biopsy / Swab Culture (if secondary infection is suspected)"
    ],
    "medicines": [
      {
        "generic": "Liquid Paraffin + White Soft Paraffin",
        "class": "Medical Grade Emollient Moisturizer",
        "usage_bn": "একজিমার চিকিৎসার মূল ভিত্তি; গোসলের পর ত্বক ভেজা থাকতেই পুরো শরীরে পর্যাপ্ত পরিমাণে মেখে আর্দ্রতা ধরে রাখতে হয়",
        "usage_en": "First-line baseline skin barrier therapy applied liberally multiple times daily",
        "top_brands": [
          "Ezerra",
          "Emolient (Square)",
          "Cetaphil Restoraderm",
          "Paraffin Ointment"
        ]
      },
      {
        "generic": "Mometasone Furoate / Clobetasol Propionate",
        "class": "Topical Corticosteroid",
        "usage_bn": "তীব্র প্রদাহ ও লালচে চুলকানির জায়গায় নির্দিষ্ট কয়েক দিনের জন্য পাতলা করে প্রয়োগ করতে হয়",
        "usage_en": "Topical anti-inflammatory applied thinly once daily to active plaques during flares",
        "top_brands": [
          "Momeson (Square)",
          "Elocon",
          "Clobate (Incepta)",
          "Dermasol (Beximco)"
        ]
      },
      {
        "generic": "Tacrolimus Ointment (0.03% / 0.1%)",
        "class": "Topical Calcineurin Inhibitor (Non-Steroid)",
        "usage_bn": "মুখ, চোখের পাতা ও ঘাড়ের সংবেদনশীল ত্বকে স্টেরয়েডের বিকল্প নিরাপদ চর্মরোগের ওষুধ",
        "usage_en": "Steroid-free immunomodulator safe for delicate facial, neck, and intertriginous skin",
        "top_brands": [
          "Tacrol (Square)",
          "Prograf",
          "Tacrotor (Incepta)"
        ]
      },
      {
        "generic": "Bilastine / Rupatadine",
        "class": "2nd Generation Antihistamine",
        "usage_bn": "রাতের তীব্র চুলকানি ও অস্বস্তি প্রশমিত করতে",
        "usage_en": "Suppresses pruritus and controls nighttime sleep-disrupting itching",
        "top_brands": [
          "Bila (Incepta)",
          "Rupa (Square)",
          "Bilashin (Beximco)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "প্রতিবার গোসলের ৩ মিনিটের মধ্যে (ত্বক ভেজা থাকা অবস্থায়) ভালো মানের সুগন্ধিমুক্ত ময়েশ্চারাইজার ব্যবহার করুন।",
      "অতিরিক্ত গরম পানিতে দীর্ঘক্ষণ গোসল করা বন্ধ করুন; হালকা কুসুম গরম পানিতে ৫-১০ মিনিটের মধ্যে গোসল শেষ করুন।",
      "ক্ষারযুক্ত শক্ত সাবান সম্পূর্ণ পরিহার করে মাইল্ড বা সাবানমুক্ত বডি ওয়াশ ব্যবহার করুন।",
      "১০০% সুতি আরামদায়ক পোশাক পরিধান করুন; উল বা পলিয়েস্টারের খসখসে পোশাক এড়িয়ে চলুন।",
      "নখ ছোট রাখুন যাতে চুলকানোর সময় ত্বকে আঁচড় না লাগে।"
    ],
    "lifestyle_diet_en": [
      "Follow the '3-minute rule': apply generous emollient immediately after bathing onto damp skin.",
      "Avoid long hot showers; use lukewarm water limited to under 10 minutes.",
      "Substitute harsh alkaline soaps with soap-free syndet cleansing bars.",
      "Wear 100% breathable loose cotton textiles; avoid coarse wool or synthetics.",
      "Keep fingernails trimmed short to prevent nocturnal excoriation and secondary infection."
    ],
    "emergency_warning_bn": "একজিমার ওপর হঠাৎ পুঁজযুক্ত ছোট ছোট ফোসকা দেখা দেওয়া, তীব্র জ্বর ও ব্যথা হার্পিস ভাইরাস সংক্রমণ (Eczema Herpeticum) নির্দেশ করে। অবিলম্বে হাসপাতালে অ্যান্টিভাইরাল থেরাপি প্রয়োজন।",
    "emergency_warning_en": "Sudden eruption of widespread painful vesicular pustules with fever indicates Eczema Herpeticum, a dermatological emergency requiring systemic Acyclovir."
  }
];

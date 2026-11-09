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
  },
  {
    "id": "diarrhea-cholera",
    "name_en": "Acute Watery Diarrhea & Cholera",
    "name_bn": "তীব্র পানিবাহিত ডায়রিয়া ও কলেরা",
    "icd10": "A00 / A09",
    "system": "gastrointestinal",
    "system_bn": "পরিপাকতন্ত্র ও পেট",
    "organ": "Small & Large Intestine",
    "organ_icon": "🥣",
    "severity": "Critical",
    "overview_bn": "ভিব্রিও কলেরি বা রোটাভাইরাস দ্বারা সংক্রমিত মারাত্মক পানিবাহিত রোগ। চাল ধোয়া পানির মতো ঘন ঘন পাতলা পায়খানা ও বমি হয়ে দ্রুত বিপজ্জনক পানিশূন্যতা ও শক তৈরি হয়।",
    "overview_en": "Severe diarrheal infection caused by Vibrio cholerae or enteropathogens, producing voluminous rice-water stools, rapid dehydration, and hypovolemic shock.",
    "causes_bn": [
      "দূষিত পানি ও খাবার গ্রহণ (Vibrio cholerae, Rotavirus, E. coli)",
      "অস্বাস্থ্যকর পয়ঃনিষ্কাশন ও হাত না ধোয়ার অভ্যাস",
      "রাস্তার খোলা ও বাসি খাবার এবং কাঁচা সালাদ খাওয়া",
      "বন্যা ও প্রাকৃতিক দুর্যোগের পর সুপেয় পানির সংকট"
    ],
    "causes_en": [
      "Contaminated drinking water and food (Vibrio cholerae, Rotavirus)",
      "Poor sanitation and inadequate hand hygiene",
      "Street food and uncooked raw produce exposed to flies",
      "Post-flood drinking water contamination"
    ],
    "risk_factors_bn": [
      "অনিরাপদ নলকূপ বা ওয়াসার দূষিত পানি পান",
      "ঘনবসতিপূর্ণ এলাকা ও বস্তিবাসী",
      "৫ বছরের কম বয়সী শিশু ও বৃদ্ধ",
      "বর্ষাকাল ও গরম আবহাওয়া"
    ],
    "risk_factors_en": [
      "Unsafe municipal or flood-affected water",
      "Crowded urban settlements and slums",
      "Malnourished children under 5 and elderly",
      "Monsoon and post-monsoon seasons in Bangladesh"
    ],
    "symptoms_bn": [
      "হঠাৎ শুরু হওয়া চাল ধোয়া পানির মতো প্রচুর পাতলা পায়খানা",
      "ঘন ঘন বমি ও তীব্র পিপাসা",
      "চোখ কোটরাগত হওয়া ও ত্বকের স্থিতিস্থাপকতা কমে যাওয়া (Skin pinch goes back slowly)",
      "প্রস্রাবের পরিমাণ মারাত্মক কমে যাওয়া (Oliguria)",
      "পেশিতে তীব্র টান বা ক্র্যাম্প (ইলেক্ট্রোলাইটের অভাবে)"
    ],
    "symptoms_en": [
      "Sudden onset profuse watery stools (rice-water appearance)",
      "Repeated vomiting and intense thirst",
      "Sunken eyes, dry mucous membranes, sluggish skin turgor",
      "Marked oliguria or anuria",
      "Severe painful muscle cramps due to hypokalemia/hyponatremia"
    ],
    "diagnostic_tests": [
      "Stool Cholera RDT (Rapid Diagnostic Strip)",
      "Stool Routine & Microscopic Examination (R/M/E)",
      "Serum Electrolytes (Sodium, Potassium, Bicarbonate)",
      "Serum Creatinine & Blood Urea",
      "Dark-field stool microscopy for darting motility"
    ],
    "medicines": [
      {
        "generic": "Oral Rehydration Salt (ORS)",
        "class": "WHO-Formulated Fluid & Electrolyte Replacer",
        "usage_bn": "প্রতিবার পাতলা পায়খানার পর ১ প্যাকেট খাবার স্যালাইন আধা লিটার বিশুদ্ধ পানিতে গুলে খেতে হবে",
        "usage_en": "WHO Low-Osmolarity ORS: 1 sachet per 500 mL water after every loose stool",
        "top_brands": [
          "Orsaline-N (SMC)",
          "Tasty Saline",
          "Neo-Saline (Beximco)",
          "Oral Saline (Square)"
        ]
      },
      {
        "generic": "Zinc Sulfate Dispersible",
        "class": "Mucosal Repair & Antidiarrheal Micronutrient",
        "usage_bn": "শিশুদের জন্য দৈনিক ২০ মিগ্রা (৬ মাসের কম হলে ১০ মিগ্রা) টানা ১৪ দিন",
        "usage_en": "20 mg daily for 14 days (10 mg for infants < 6 months) for enterocyte repair",
        "top_brands": [
          "Baby Zinc (Square)",
          "Zif-CI (Incepta)",
          "Zinc-B (Beximco)",
          "Zinkid (Renata)"
        ]
      },
      {
        "generic": "Azithromycin",
        "class": "Macrolide Antibiotic (Cholera First-line)",
        "usage_bn": "প্রাপ্তবয়স্কদের ক্ষেত্রে ১ গ্রাম একক মাত্রায় অথবা ৫০০ মিগ্রা দৈনিক ৩ দিন",
        "usage_en": "1 g single dose for cholera in adults or 20 mg/kg single dose in children",
        "top_brands": [
          "Zimax (Square)",
          "A-Zith (Incepta)",
          "Tridosil (Beximco)",
          "Zithrin (Renata)"
        ]
      },
      {
        "generic": "Ringer's Lactate (IV Infusion)",
        "class": "Balanced Intravenous Crystalloid",
        "usage_bn": "তীব্র পানিশূন্যতা ও শকে আক্রান্ত রোগীদের হাসপাতালে দ্রুত শিরার মাধ্যমে প্রয়োগ",
        "usage_en": "IV fluid resuscitation: 100 mL/kg divided per WHO Plan C protocol",
        "top_brands": [
          "Hartman Solution (Orion)",
          "Ringer Lactate (Square)",
          "RL Infusion (Beximco)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "পানি অন্তত ২০ মিনিট ফুটিয়ে অথবা হ্যালোজেন ট্যাবলেট দিয়ে বিশুদ্ধ করে পান করুন।",
      "স্যালাইনের পাশাপাশি ভাতের মাড়, ডাবের পানি, ও চিঁড়ার পানি পান করুন।",
      "খাওয়ার আগে ও শৌচাগার ব্যবহারের পর সাবান দিয়ে অন্তত ২০ সেকেন্ড হাত ধোয়ার অভ্যাস করুন।",
      "ডায়রিয়া চলাকালীন শিশুদের বুকের দুধ বা স্বাভাবিক পুষ্টিকর খাবার বন্ধ করবেন না।"
    ],
    "lifestyle_diet_en": [
      "Boil drinking water for at least 20 minutes or use water purification chlorine tablets.",
      "Supplement ORS with coconut water, rice starch soup (jao), and green banana puree.",
      "Strict handwashing with soap for 20 seconds before food prep and after toilet use.",
      "Never withhold breastfeeding or age-appropriate nutrition during active diarrhea."
    ],
    "emergency_warning_bn": "রোগী অজ্ঞান বা নিস্তেজ হয়ে পড়লে, পানি পান করতে না পারলে বা কোনো প্রস্রাব না হলে মুহূর্ত বিলম্ব না করে icddr,b বা নিকটস্থ সদর হাসপাতালের জরুরি বিভাগে নিন।",
    "emergency_warning_en": "Lethargy, unconsciousness, inability to drink, or total absence of urination indicates severe hypovolemic shock. Rush to ICDDR,B or nearest emergency hospital immediately."
  },
  {
    "id": "tuberculosis",
    "name_en": "Pulmonary Tuberculosis (TB)",
    "name_bn": "যক্ষ্মা ও ফুসফুসের টিবি",
    "icd10": "A15",
    "system": "respiratory",
    "system_bn": "শ্বাসতন্ত্র ও ফুসফুস",
    "organ": "Lungs & Bronchi",
    "organ_icon": "🫁",
    "severity": "Critical",
    "overview_bn": "মাইকোব্যাকটেরিয়াম টিউবারকিউলোসিস ব্যাক্টেরিয়া দ্বারা সৃষ্ট দীর্ঘস্থায়ী সংক্রামক ব্যাধি যা প্রধানত ফুসফুসকে আক্রমণ করে এবং কাশির মাধ্যমে বাতাসে ছড়ায়।",
    "overview_en": "A chronic infectious bacterial disease caused by Mycobacterium tuberculosis, primarily affecting the lungs and transmitted through airborne droplets.",
    "causes_bn": [
      "মাইকোব্যাকটেরিয়াম টিউবারকিউলোসিস (Mycobacterium tuberculosis) ব্যাক্টেরিয়ার সংক্রমণ",
      "আক্রান্ত রোগীর হাঁচি-কাশির ড্রপলেট বাতাসে শ্বাস নেওয়ার মাধ্যমে ফুসফুসে প্রবেশ",
      "রোগ প্রতিরোধ ক্ষমতা দুর্বল হয়ে পড়া (যেমন অনিয়ন্ত্রিত ডায়াবেটিস বা অপুষ্টি)",
      "অপরিচ্ছন্ন, অন্ধকার ও আলো-বাতাসহীন স্যাঁতসেঁতে পরিবেশে দীর্ঘদিন বসবাস"
    ],
    "causes_en": [
      "Mycobacterium tuberculosis acid-fast bacillus infection",
      "Inhalation of aerosolized droplets from active untreated patients",
      "Immunosuppression, poorly controlled diabetes, or severe malnutrition",
      "Overcrowded, poorly ventilated living conditions"
    ],
    "risk_factors_bn": [
      "যক্ষ্মা রোগীর সাথে দীর্ঘসময় ঘনিষ্ঠ সংস্পর্শ",
      "ধূমপান ও তামাক সেবন",
      "রোগ প্রতিরোধ ক্ষমতার ঘাটতি বা স্টেরয়েড গ্রহণ",
      "অপুষ্টি ও দারিদ্র্য"
    ],
    "risk_factors_en": [
      "Close contact with untreated open pulmonary TB cases",
      "Cigarette smoking and indoor biomass fuel smoke",
      "Diabetes mellitus, renal failure, chronic steroid use",
      "Malnutrition and socio-economic deprivation"
    ],
    "symptoms_bn": [
      "৩ সপ্তাহের বেশি সময় ধরে স্থায়ী কাশি (কখনও কফের সাথে রক্ত পড়া)",
      "বিকালে ও রাতে মৃদু জ্বর এবং রাতে অতিরিক্ত ঘাম হওয়া (Night sweats)",
      "উল্লেখযোগ্য ওজন হ্রাস ও ক্ষুধামান্দ্য",
      "বুকে চিনচিনে ব্যথা ও শ্বাসকষ্ট",
      "অতিরিক্ত শারীরিক ক্লান্তি ও অবসাদ"
    ],
    "symptoms_en": [
      "Persistent cough lasting more than 3 weeks, sometimes with hemoptysis",
      "Low-grade evening fever and drenching night sweats",
      "Unexplained rapid weight loss and severe anorexia",
      "Pleuritic chest pain and breathlessness",
      "Chronic malaise and profound fatigue"
    ],
    "diagnostic_tests": [
      "GeneXpert MTB/RIF Assay (Sputum PCR)",
      "Sputum AFB Stain & Smear Microscopy",
      "Chest X-Ray PA View (Apical cavitation/infiltrates)",
      "Tuberculin Skin Test (Mantoux Test - MT)",
      "ESR & Complete Blood Count (CBC)"
    ],
    "medicines": [
      {
        "generic": "4-FDC (Rifampicin + Isoniazid + Pyrazinamide + Ethambutol)",
        "class": "First-Line National DOTS Fixed Dose Combination",
        "usage_bn": "জাতীয় যক্ষ্মা কর্মসূচি অনুযায়ী ওজন অনুপাতে প্রতিদিন সকালে খালিপেটে টানা ২ মাস (নিবিড় পর্ব)",
        "usage_en": "Intensive phase: 3-4 tablets daily according to body weight for 2 months",
        "top_brands": [
          "Rimactazid-4 (Novartis)",
          "4-FDC (Square)",
          "Rifater (Sanofi)",
          "Mycorif (Incepta)"
        ]
      },
      {
        "generic": "2-FDC (Rifampicin + Isoniazid)",
        "class": "Continuation Phase Antitubercular Therapy",
        "usage_bn": "নিবিড় পর্বের পর পরবর্তী ৪ মাস প্রতিদিন সকালে খালিপেটে নিয়মিত সেবন",
        "usage_en": "Continuation phase: Daily fixed combination for 4 months to eradicate persisters",
        "top_brands": [
          "Rimactazid (Novartis)",
          "Rifadiz (Incepta)",
          "Iso-Rif (Beximco)"
        ]
      },
      {
        "generic": "Pyridoxine (Vitamin B6)",
        "class": "Neuroprotective Co-therapy",
        "usage_bn": "আইসোনায়াজিডের কারণে হাত-পায়ে ঝিঁঝিঁ ধরা বা নিউরোপ্যাথি প্রতিরোধে দৈনিক ২০-৫০ মিগ্রা",
        "usage_en": "20-50 mg daily to prevent isoniazid-induced peripheral neuropathy",
        "top_brands": [
          "Vitamin B6 (Square)",
          "Pyridoxine (Incepta)",
          "Benavit (Beximco)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "সরকারি স্বাস্থ্য কমপ্লেক্সের ডটস (DOTS) সেন্টার থেকে সম্পূর্ণ বিনামূল্যে নিয়মিত ওষুধ সেবন করুন।",
      "কাশির সময় রুমাল বা টিস্যু ব্যবহার করুন এবং যত্রতত্র কফ-থুতু ফেলবেন না।",
      "উচ্চ প্রোটিনযুক্ত খাবার যেমন ডিম, মাছ, মাংস, দুধ ও ডাল বেশি করে খান।",
      "ঘরের জানালা খোলা রেখে পর্যাপ্ত আলো-বাতাস নিশ্চিত করুন।"
    ],
    "lifestyle_diet_en": [
      "Complete the mandatory 6-month DOTS treatment regimen without skipping any dose.",
      "Strict respiratory etiquette: cover mouth during coughing, avoid spitting in public.",
      "High-protein diet: eggs, lentils, milk, fish to accelerate tissue repair and recovery.",
      "Ensure proper ventilation and direct sunlight in the patient's room."
    ],
    "emergency_warning_bn": "প্রচুর পরিমাণে তাজা রক্ত বমি বা কাশির সাথে বের হলে (Massive Hemoptysis) অথবা তীব্র শ্বাসকষ্ট হলে অবিলম্বে বক্ষব্যাধি হাসপাতাল বা সদর হাসপাতালে ভর্তি হন।",
    "emergency_warning_en": "Massive coughing of blood (>200 mL hemoptysis) or acute respiratory failure requires immediate emergency hospital admission."
  },
  {
    "id": "malaria",
    "name_en": "Malaria (Plasmodium Falciparum & Vivax)",
    "name_bn": "ম্যালেরিয়া ও ফ্যালসিপেরাম ম্যালেরিয়া",
    "icd10": "B50 / B51",
    "system": "infectious",
    "system_bn": "সংক্রামক ব্যাধি",
    "organ": "Blood & Spleen",
    "organ_icon": "🩸",
    "severity": "Critical",
    "overview_bn": "স্ত্রী অ্যানোফিলিস মশার কামড়ে ছড়ানো প্লাজমোডিয়াম পরজীবীঘটিত রক্ত সংক্রমণ। বাংলাদেশের পার্বত্য চট্টগ্রাম (বান্দরবান, রাঙামাটি, খাগড়াছড়ি) ও সিলেটের সীমান্তবর্তী অঞ্চলে এর প্রাদুর্ভাব বেশি।",
    "overview_en": "A protozoan parasitic infection transmitted by female Anopheles mosquitoes, prevalent in the Chittagong Hill Tracts and border districts of Bangladesh.",
    "causes_bn": [
      "সংক্রমিত স্ত্রী অ্যানোফিলিস মশার কামড় (Plasmodium falciparum ও Plasmodium vivax)",
      "পার্বত্য বনাঞ্চলে মশার বংশবিস্তার ও মশারির অপ্রতুল ব্যবহার",
      "রক্তের লোহিত কণিকায় পরজীবীর দ্রুত সংখ্যাবৃদ্ধি ও ফেটে যাওয়া"
    ],
    "causes_en": [
      "Infection with Plasmodium falciparum or P. vivax via female Anopheles bite",
      "Exposure in endemic forested belts (Bandarban, Rangamati, Khagrachhari, Sylhet)",
      "Erythrocytic rupture releasing merozoites and toxins into bloodstream"
    ],
    "risk_factors_bn": [
      "পার্বত্য চট্টগ্রাম বা সীমান্ত জেলাগুলোতে ভ্রমণ বা বসবাস",
      "রাতে বা ভোরে মশারির বাইরে ঘুমানো",
      "জলাশয় ও বনাঞ্চলের নিকটবর্তী বাসস্থান"
    ],
    "risk_factors_en": [
      "Travel or residency in Chittagong Hill Tracts and forested border areas",
      "Outdoor sleeping without insecticide-treated bed nets (ITNs)",
      "Stagnant clean water bodies favoring vector breeding"
    ],
    "symptoms_bn": [
      "কাঁপুনি দিয়ে তীব্র জ্বর (জ্বরের ৩টি পর্যায়: শীত পর্যায়, উত্তাপ পর্যায়, ঘাম পর্যায়)",
      "তীব্র মাথাব্যথা, বমি ও বমিভাব",
      "পেশি ও সারা শরীরে অসহ্য ব্যথা",
      "প্লীহা ও যকৃৎ ফুলে যাওয়া (Hepatosplenomegaly)",
      "মারাত্মক পর্যায়ে রক্তাল্পতা ও জন্ডিস"
    ],
    "symptoms_en": [
      "Paroxysms of high fever with rigors (cold stage, hot stage, sweating stage)",
      "Severe throbbing headache, nausea, and vomiting",
      "Myalgia, arthralgia, and profound weakness",
      "Splenomegaly and mild hepatomegaly",
      "Hemolytic anemia, dark urine, and jaundice"
    ],
    "diagnostic_tests": [
      "Malaria Rapid Diagnostic Test (RDT for Pf & Pv antigen)",
      "Peripheral Blood Film (PBF - Thick and Thin smears for ring forms)",
      "Complete Blood Count (CBC showing thrombocytopenia & anemia)",
      "Serum Bilirubin and Liver Function Tests"
    ],
    "medicines": [
      {
        "generic": "Artemether + Lumefantrine",
        "class": "Artemisinin-based Combination Therapy (ACT)",
        "usage_bn": "জাতীয় ম্যালেরিয়া গাইডলাইন অনুযায়ী ৩ দিনে মোট ৬ ডোজের পূর্ণ কোর্স",
        "usage_en": "First-line ACT for P. falciparum: 6-dose regimen over 3 days with fatty meal",
        "top_brands": [
          "Coartem (Novartis)",
          "Lumart (Square)",
          "Artem (Incepta)",
          "Coartam (Beximco)"
        ]
      },
      {
        "generic": "Primaquine Phosphate",
        "class": "Antimalarial 8-Aminoquinoline (Gametocytocidal & Hypnozoitocidal)",
        "usage_bn": "পুনরাক্রমণ রোধে চিকিৎসকের নির্দেশনায় নির্দিষ্ট মাত্রায় সেবন (G6PD পরীক্ষা প্রয়োজন)",
        "usage_en": "Eradicates liver hypnozoites in P. vivax (0.25-0.5 mg/kg daily for 14 days after G6PD screen)",
        "top_brands": [
          "Primaquine (Sanofi)",
          "Primacin (Square)"
        ]
      },
      {
        "generic": "Artesunate (IV Injection)",
        "class": "Intravenous Antimalarial for Severe / Cerebral Malaria",
        "usage_bn": "মারাত্মক ম্যালেরিয়ায় হাসপাতালে অবিলম্বে শিরার মাধ্যমে প্রয়োগ",
        "usage_en": "IV artesunate 2.4 mg/kg at 0, 12, 24h for cerebral/complicated falciparum malaria",
        "top_brands": [
          "Artesun (Square)",
          "Falcinil (Incepta)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "পার্বত্য অঞ্চলে ভ্রমণের সময় কীটনাশকযুক্ত মশারি (LLIN) টাঙিয়ে ঘুমান।",
      "শরীরে মসকুইটো রিপেলেন্ট ক্রিম বা লোশন ব্যবহার করুন এবং পুরো শরীর ঢাকা পোশাক পরুন।",
      "জ্বর চলাকালীন প্রচুর তরল খাবার, ডাবের পানি ও ফলের রস পান করুন।",
      "পার্বত্য এলাকা থেকে ফেরার পর জ্বর দেখা দিলে দ্রুত ম্যালেরিয়া রক্ত পরীক্ষা করান।"
    ],
    "lifestyle_diet_en": [
      "Always sleep under Long-Lasting Insecticidal Nets (LLINs) in endemic zones.",
      "Apply DEET mosquito repellents and wear full-length protective clothing at dawn/dusk.",
      "Maintain high fluid intake with oral rehydration solution, coconut water, and soups.",
      "Get prompt RDT/PBF testing upon any fever after visiting hill districts."
    ],
    "emergency_warning_bn": "রোগীর চেতনা কমে গেলে, প্রলাপ বকলে, খিঁচুনি হলে বা গাঢ় খয়েরি প্রস্রাব হলে তা সেরিব্রাল ম্যালেরিয়ার লক্ষণ—তাৎক্ষণিক আইসিইউ বা জেলা সদর হাসপাতালে নিন।",
    "emergency_warning_en": "Altered sensorium, seizures, severe jaundice, or black urine (Blackwater fever) signifies Cerebral Malaria. Urgent tertiary care and IV Artesunate required."
  },
  {
    "id": "viral-hepatitis-b-c",
    "name_en": "Viral Hepatitis B & C (Chronic Liver Infection)",
    "name_bn": "হেপাটাইটিস বি ও সি এবং জন্ডিস",
    "icd10": "B16 / B18",
    "system": "hepatobiliary",
    "system_bn": "যকৃৎ ও পিত্তথলি",
    "organ": "Liver",
    "organ_icon": "🫀",
    "severity": "High",
    "overview_bn": "হেপাটাইটিস বি (HBV) ও সি (HCV) ভাইরাস দ্বারা যকৃতের দীর্ঘস্থায়ী প্রদাহ। প্রাথমিক অবস্থায় উপসর্গহীন থাকলেও অবহেলায় লিভার সিরোসিস ও লিভার ক্যান্সারের ঝুঁকি বহুগুণ বেড়ে যায়।",
    "overview_en": "Chronic viral infections of the liver caused by Hepatitis B and C viruses, leading to chronic inflammation, progressive fibrosis, cirrhosis, and hepatocellular carcinoma.",
    "causes_bn": [
      "অনিরাপদ রক্ত গ্রহণ ও জীবাণুমুক্ত না করা সিরিঞ্জ ব্যবহার",
      "সেলুনে একই ব্লেড একাধিক ব্যক্তির দাড়িকাটা বা রক্তপাত",
      "সংক্রমিত মায়ের থেকে নবজাতকে প্রসবকালীন সংক্রমণ (Vertical transmission)",
      "অনিরাপদ শারীরিক সম্পর্ক ও টুথব্রাশ/রেজার ভাগাভাগি"
    ],
    "causes_en": [
      "Unscreened blood transfusions and contaminated needles/syringes",
      "Shared razor blades at barbershops and non-sterile tattoo equipment",
      "Mother-to-child vertical transmission during childbirth",
      "Unprotected sexual contact and sharing personal grooming items"
    ],
    "risk_factors_bn": [
      "অস্ত্রোপচার বা ডেন্টাল চিকিৎসার ইতিহাস",
      "নিয়মিত রক্তগ্রহীতা (যেমন থ্যালাসেমিয়া রোগী)",
      "পরিবারে হেপাটাইটিস বি পজিটিভ রোগী থাকা",
      "হেপাটাইটিস বি প্রতিরোধী টিকা না নেওয়া"
    ],
    "risk_factors_en": [
      "History of invasive dental or surgical procedures in unsterilized setups",
      "Frequent blood transfusions (e.g. thalassemia patients)",
      "Family members positive for HBsAg",
      "Lack of Hepatitis B immunization"
    ],
    "symptoms_bn": [
      "চোখ ও প্রস্রাব হলুদ হয়ে যাওয়া (জন্ডিস)",
      "পেটের ওপরের ডানপাশে ভারী ভাব ও অস্বস্তি",
      "ক্রমাগত অবসাদ ও খাবারে অরুচি",
      "বমি বমি ভাব ও বদহজম",
      "দীর্ঘমেয়াদে পেট ফুলে পানি আসা (Ascites) ও পায়ে ফোলা"
    ],
    "symptoms_en": [
      "Scleral icterus and dark amber urine (jaundice)",
      "Right upper quadrant dull ache and liver tenderness",
      "Unremitting chronic fatigue and anorexia",
      "Nausea, dyspepsia, and generalized pruritus",
      "Late stages: abdominal ascites, spider angiomas, pedal edema"
    ],
    "diagnostic_tests": [
      "HBsAg (Hepatitis B Surface Antigen)",
      "Anti-HCV Total Antibody (ELISA)",
      "HBV DNA Viral Load (Real-Time PCR)",
      "HCV RNA Quantitative PCR",
      "Serum Bilirubin, SGPT (ALT), SGOT (AST)",
      "Liver FibroScan & Ultrasonography of Whole Abdomen"
    ],
    "medicines": [
      {
        "generic": "Tenofovir Disoproxil Fumarate",
        "class": "Nucleotide Reverse Transcriptase Inhibitor (HBV First-line)",
        "usage_bn": "হেপাটাইটিস বি ভাইরাল লোড নিয়ন্ত্রণে রাখতে দৈনিক ৩০০ মিগ্রা ১টি ট্যাবলেট নিয়মিত",
        "usage_en": "First-line oral antiviral for Chronic Hepatitis B: 300 mg once daily",
        "top_brands": [
          "Tenovir (Square)",
          "Tenohep (Incepta)",
          "Hepavir (Beximco)",
          "Tavin (Renata)"
        ]
      },
      {
        "generic": "Entecavir",
        "class": "Potent HBV Polymerase Inhibitor",
        "usage_bn": "কিডনি সমস্যাযুক্ত রোগীদের ক্ষেত্রে চিকিৎসকের পরামর্শে দৈনিক ০.৫ মিগ্রা খালিপেটে",
        "usage_en": "0.5 mg once daily on empty stomach for chronic HBV with high genetic barrier",
        "top_brands": [
          "Enteca (Incepta)",
          "Entavir (Square)",
          "Baraclude (BMS)"
        ]
      },
      {
        "generic": "Sofosbuvir + Velpatasvir",
        "class": "Pan-Genotypic Direct Acting Antiviral (HCV Cure)",
        "usage_bn": "হেপাটাইটিস সি নিরাময়ে দৈনিক ১টি ট্যাবলেট টানা ১২ সপ্তাহ",
        "usage_en": "Pan-genotypic HCV regimen: 1 tablet (400 mg/100 mg) daily for 12 weeks achieving >95% cure rate",
        "top_brands": [
          "Sofosvel (Beacon)",
          "Epclusa (Gilead)",
          "Velpat (Incepta)",
          "Sovaldi-V (Square)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "পরিবারের সকল সদস্যকে হেপাটাইটিস বি প্রতিরোধী ৩টি টিকার পূর্ণ ডোজ দিন।",
      "সেলুনে প্রতিবার নতুন ব্লেড ব্যবহার নিশ্চিত করুন এবং টুথব্রাশ কখনো শেয়ার করবেন না।",
      "তেল-চর্বিযুক্ত খাবার ও অ্যালকোহল সম্পূর্ণ পরিহার করুন।",
      "যেকোনো রক্ত গ্রহণের পূর্বে স্ক্রিনিং টেস্ট শতভাগ নিশ্চিত করুন।"
    ],
    "lifestyle_diet_en": [
      "Ensure all household contacts complete the 3-dose Hepatitis B vaccine series.",
      "Insist on single-use disposable blades at barbers and never share toothbrushes or clippers.",
      "Strict avoidance of alcohol, hepatotoxic medications, and excess deep-fried foods.",
      "Verify certified nucleic-acid screening for any blood or blood product transfusions."
    ],
    "emergency_warning_bn": "রক্তবমি হলে, কালো আলকাতরার মতো পায়খানা হলে বা মানসিক বিভ্রান্তি/অসংলগ্ন আচরণ দেখা দিলে লিভার ব্যর্থতা হয়েছে—দ্রুত হেপাটোলজি বিভাগে ভর্তি করান।",
    "emergency_warning_en": "Hematemesis, melena, or hepatic encephalopathy (drowsiness, flapping tremors) indicates decompensated cirrhosis. Urgent gastroenterology/hepatology hospitalization required."
  },
  {
    "id": "iron-deficiency-anemia",
    "name_en": "Iron Deficiency Anemia",
    "name_bn": "রক্তস্বল্পতা ও আয়রনের ঘাটতি",
    "icd10": "D50",
    "system": "infectious",
    "system_bn": "রক্ত ও রক্তসংবহন",
    "organ": "Bone Marrow & Red Blood Cells",
    "organ_icon": "🩸",
    "severity": "Medium",
    "overview_bn": "শরীরে আয়রনের অভাবে পর্যাপ্ত হিমোগ্লোবিন তৈরি না হওয়া। বাংলাদেশের গর্ভবতী নারী, কিশোরী ও শিশুদের মধ্যে এটি অত্যন্ত সাধারণ একটি পুষ্টিজনিত স্বাস্থ্য সমস্যা।",
    "overview_en": "The most common nutritional disorder in Bangladesh, characterized by inadequate iron stores impairing normal erythropoiesis and hemoglobin synthesis.",
    "causes_bn": [
      "খাবারে অপর্যাপ্ত আয়রন গ্রহণ (শাকসবজি, মাংস ও কলিজা কম খাওয়া)",
      "কৃমি সংক্রমণ (Hookworm infestation যা অন্ত্র থেকে নিয়মিত রক্তক্ষরণ ঘটায়)",
      "গর্ভকালীন ও প্রসবকালীন অতিরিক্ত রক্তের চাহিদা",
      "অতিরিক্ত ঋতুস্রাব বা পাইলস থেকে রক্তক্ষরণ"
    ],
    "causes_en": [
      "Poor dietary bioavailability of heme iron",
      "Chronic blood loss from Hookworm (Ancylostoma duodenale) infection",
      "Increased physiological requirements during pregnancy and lactation",
      "Menorrhagia, occult GI bleeding from peptic ulcers or hemorrhoids"
    ],
    "risk_factors_bn": [
      "গর্ভবতী ও স্তন্যদানকারী মা",
      "বৃদ্ধিপ্রাপ্ত কিশোর-কিশোরী ও বাড়ন্ত শিশু",
      "নিয়মিত খালি পায়ে হাঁটার কারণে কৃমির সংক্রমণ",
      "চায়ের অতিরিক্ত আসক্তি (খাবারের পর চা খেলে আয়রন শোষণ বাধাগ্রস্ত হয়)"
    ],
    "risk_factors_en": [
      "Pregnant and adolescent females in low-income populations",
      "Walking barefoot in rural soil facilitating hookworm penetration",
      "High tannin intake: drinking tea immediately with or after meals",
      "Frequent unspaced pregnancies"
    ],
    "symptoms_bn": [
      "ত্বক, চোখের পাতা ও ঠোঁটের ভেতরের অংশ ফ্যাকাশে হয়ে যাওয়া",
      "সামান্য পরিশ্রমে বুক ধড়ফড় ও দ্রুত হাঁপিয়ে ওঠা",
      "মাথা ঘোরানো, মাথা ব্যথা ও চোখে অন্ধকার দেখা",
      "নখ ভঙ্গুর ও চামচের মতো গর্ত হয়ে যাওয়া (Koilonychia)",
      "অখাদ্য জিনিস যেমন মাটি বা বরফ খাওয়ার তীব্র ইচ্ছা (Pica)"
    ],
    "symptoms_en": [
      "Pallor of skin, palpebral conjunctiva, tongue, and nailbeds",
      "Exertional dyspnea, palpitations, and rapid fatigue",
      "Postural dizziness, tinnitus, and morning headaches",
      "Brittle nails and spoon-shaped nails (Koilonychia)",
      "Craving for non-nutritive substances like clay, chalk, or ice (Pica)"
    ],
    "diagnostic_tests": [
      "Complete Blood Count (CBC showing microcytic hypochromic indices, low Hb)",
      "Serum Ferritin (Confirmatory: < 15-30 ng/mL)",
      "Total Iron Binding Capacity (TIBC) & Transferrin Saturation",
      "Stool Routine Examination for Hookworm Ova",
      "Peripheral Blood Film (PBF)"
    ],
    "medicines": [
      {
        "generic": "Carbonyl Iron + Folic Acid + Zinc",
        "class": "Oral Hematinic Formulation",
        "usage_bn": "দৈনিক ১টি ক্যাপসুল খাবারের ১ ঘণ্টা আগে ভিটামিন সি সমৃদ্ধ পানির সাথে",
        "usage_en": "1 capsule daily before meals or at bedtime with Vitamin C for optimal absorption",
        "top_brands": [
          "Fecontin-F (Incepta)",
          "I-Car (Square)",
          "Fefol-CI (Beximco)",
          "Globac-Z (Renata)"
        ]
      },
      {
        "generic": "Ferric Carboxymaltose",
        "class": "High-Dose Intravenous Iron Infusion",
        "usage_bn": "তীব্র রক্তাল্পতায় বা মুখে ওষুধ সহ্য না হলে হাসপাতালে শিরার মাধ্যমে ৫০০০-১০০০ মিগ্রা প্রয়োগ",
        "usage_en": "500-1000 mg IV infusion diluted in 0.9% normal saline for rapid replenishment",
        "top_brands": [
          "Ferinject (Vifor)",
          "Ferrania (Square)",
          "Orofer (Emcure)"
        ]
      },
      {
        "generic": "Albendazole",
        "class": "Anthelmintic Co-therapy",
        "usage_bn": "অন্ত্রের রক্তচোষা কৃমি ধ্বংস করতে ৪০০ মিগ্রা একক মাত্রায় চিবিয়ে খেতে হবে",
        "usage_en": "400 mg single chewable dose to treat underlying hookworm blood loss",
        "top_brands": [
          "Almex (Square)",
          "Alben (Incepta)",
          "Solas (Beximco)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "আয়রন সমৃদ্ধ খাবার যেমন গরুর কলিজা, ডিমের কুসুম, ছোট মাছ, কচুশাক ও ডাল বেশি খান।",
      "খাবারের সাথে লেবুর রস খান—ভিটামিন সি আয়রনের শোষণ দ্বিগুণ বাড়িয়ে দেয়।",
      "খাবার খাওয়ার অন্তত ১ ঘণ্টা আগে বা পরে চা বা কফি পান করুন।",
      "গ্রামাঞ্চলে জুতো পরে চলাফেরা করুন যাতে হুকওয়ার্ম ত্বকে প্রবেশ করতে না পারে।"
    ],
    "lifestyle_diet_en": [
      "Consume iron-rich foods: chicken/beef liver, egg yolk, small indigenous fish, spinach, lentils.",
      "Pair meals with citrus juice or vitamin C to significantly boost non-heme iron absorption.",
      "Never drink tea or coffee within 1 hour of meals as phytates inhibit iron uptake.",
      "Wear sandals/shoes outdoors to avoid percutaneous hookworm larva penetration."
    ],
    "emergency_warning_bn": "হিমোগ্লোবিন ৫ g/dL এর নিচে নেমে গেলে, তীব্র শ্বাসকষ্ট বা বুক ধড়ফড় করে অচেতন হলে দ্রুত জরুরি রক্ত সঞ্চালনের জন্য হাসপাতালে নিন।",
    "emergency_warning_en": "Severe anemia (Hb < 5-6 g/dL) with heart failure, syncope, or orthopnea demands immediate packed red blood cell transfusion."
  },
  {
    "id": "scabies",
    "name_en": "Scabies (Sarcoptic Mange Infestation)",
    "name_bn": "খোস-পাঁচড়া ও ছোঁয়াচে চুলকানি",
    "icd10": "B86",
    "system": "dermatology",
    "system_bn": "ত্বক ও চর্মরোগ",
    "organ": "Skin & Subcutaneous Tissue",
    "organ_icon": "🩹",
    "severity": "Low",
    "overview_bn": "সারকপটিস স্ক্যাবিয়ে নামক আণুবীক্ষণিক জীবাণুর ত্বকের নিচে গর্ত করে ডিম পাড়ার কারণে তীব্র চুলকানিযুক্ত ছোঁয়াচে চর্মরোগ। বাংলাদেশের স্কুল, মাদ্রাসা ও ঘনবসতিপূর্ণ পরিবারগুলোতে দ্রুত ছড়ায়।",
    "overview_en": "A highly contagious parasitic skin infestation caused by Sarcoptes scabiei mite burrows, leading to intense nocturnal pruritus and secondary impetigo.",
    "causes_bn": [
      "আক্রান্ত ব্যক্তির সাথে ত্বকের প্রত্যক্ষ সংস্পর্শ (আলিঙ্গন বা হাত মেলানো)",
      "একই বিছানায় ঘুমানো বা একই বিছানার চাদর, তোয়ালে ও কাপড় ব্যবহার",
      "মাদ্রাসা, হোস্টেল বা ঘনবসতিপূর্ণ পরিবারের একজন থেকে অন্যজনে দ্রুত সংক্রমণ",
      "ব্যক্তিগত পরিচ্ছন্নতার অভাব ও ভেজা কাপড় পরা"
    ],
    "causes_en": [
      "Direct skin-to-skin contact with an infested person",
      "Sharing bedding, mattresses, towels, or unwashed clothes",
      "Crowded dormitories, madrasas, orphanages, and slums",
      "Poor domestic hygiene and humid weather"
    ],
    "risk_factors_bn": [
      "মাদ্রাসা ও আবাসিক হোস্টেলের শিক্ষার্থী",
      "একই বিছানায় একাধিক সদস্য ঘুমানোর অভ্যাস",
      "পরিবারের যেকোনো একজন সদস্যের চুলকানি থাকা",
      "নিয়মিত সাবান দিয়ে গোসল না করা"
    ],
    "risk_factors_en": [
      "Students in residential madrasas, barracks, and hostels",
      "Sleeping together in congested domestic rooms",
      "Family member with untreated persistent itching",
      "Infrequent hot water laundry and bathing"
    ],
    "symptoms_bn": [
      "রাতে বিছানায় শোয়ার পর অসহ্য চুলকানি (Nocturnal itching)",
      "আঙুলের ফাঁকে, কবজি, বগল, নাভি ও যৌনাঙ্গে ছোট ছোট ফুসকুড়ি ও লাল দানা",
      "চুলকাতে চুলকাতে ঘা হয়ে যাওয়া ও কষ বা পুঁজ বের হওয়া",
      "পরিবারের একাধিক সদস্যের একই সাথে চুলকানি হওয়া"
    ],
    "symptoms_en": [
      "Intense nocturnal pruritus exacerbated by bed warmth",
      "Pruritic papules, vesicles, and burrows in web spaces of fingers, wrists, groin",
      "Secondary bacterial excoriation, crusting, and impetigo",
      "Concurrent pruritus in multiple family members"
    ],
    "diagnostic_tests": [
      "Clinical Skin Examination (Burrows in web spaces)",
      "Skin Scraping Microscopic Examination for mites/eggs",
      "Dermoscopy (Delta wing jet sign)",
      "Burrow Ink Test (BIT)"
    ],
    "medicines": [
      {
        "generic": "Permethrin 5% Cream / Lotion",
        "class": "Scabicidal Neurotoxic Agent (Gold Standard)",
        "usage_bn": "গলা থেকে পায়ের আঙুল পর্যন্ত মেখে ৮-১৪ ঘণ্টা রেখে ধুয়ে ফেলতে হবে। ৭ দিন পর পুনরায় একই নিয়মে ব্যবহার্য",
        "usage_en": "Apply neck-to-toe, leave for 8-14 hours before washing. Repeat exactly 7 days later",
        "top_brands": [
          "Scabo (Square)",
          "Permin (Incepta)",
          "Elimite",
          "Perbex (Beximco)"
        ]
      },
      {
        "generic": "Ivermectin",
        "class": "Oral Anthelmintic / Scabicide",
        "usage_bn": "চিকিৎসকের পরামর্শে ২০০ মাইক্রোগ্রাম/কেজি ওজনে খালিপেটে একক মাত্রায়, ৭ দিন পর ২য় ডোজ",
        "usage_en": "200 mcg/kg single oral dose on empty stomach; repeat after 7-14 days for crusted/refractory scabies",
        "top_brands": [
          "Scabo Oral (Square)",
          "Ivera (Incepta)",
          "Ivermec (Beximco)"
        ]
      },
      {
        "generic": "Cetirizine / Bilastine",
        "class": "Second-Generation Antihistamine",
        "usage_bn": "রাতের চুলকানি কমাতে ও আরামদায়ক ঘুমের জন্য ঘুমানোর আগে ১০-২০ মিগ্রা",
        "usage_en": "10-20 mg at bedtime to relieve severe nocturnal allergic pruritus",
        "top_brands": [
          "Alatrol (Square)",
          "Cetriz (Incepta)",
          "Bilatin (Beximco)",
          "Bilaxten (Renata)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "সবচেয়ে গুরুত্বপূর্ণ: পরিবারের সকল সদস্যকে উপসর্গ থাকুক বা না থাকুক একই সাথে চিকিৎসা নিতে হবে।",
      "বিছানার চাদর, বালিশের কভার ও সকল পরিধেয় বস্ত্র ফুটন্ত গরম পানিতে ধুয়ে কড়া রোদে শুকান।",
      "যেসব জিনিস ধোয়া যায় না, সেগুলো একটি পলিথিন ব্যাগে ভরে মুখ বন্ধ করে টানা ৭২ ঘণ্টা রেখে দিন।",
      "নখ ছোট করে কাটুন যাতে চুলকানোর সময় ত্বকে ক্ষত ও ব্যাকটেরিয়ার সংক্রমণ না হয়।"
    ],
    "lifestyle_diet_en": [
      "Crucial rule: Treat all household contacts simultaneously regardless of current symptoms.",
      "Wash all clothing, linens, and blankets in hot water (>50 deg C) and dry in hot sun.",
      "Seal non-washable items in airtight plastic bags for at least 72 hours to starve mites.",
      "Keep fingernails closely trimmed to prevent excoriation and secondary streptococcal impetigo."
    ],
    "emergency_warning_bn": "চুলকানির ক্ষত লাল হয়ে ফুলে গেলে, প্রচুর পুঁজ বের হলে বা জ্বর দেখা দিলে ব্যাক্টেরিয়াল রক্তদূষণ (Cellulitis/Sepsis) হতে পারে—দ্রুত চর্মরোগ বিশেষজ্ঞ দেখান।",
    "emergency_warning_en": "Erythematous swelling, purulent exudate, or systemic fever suggests secondary pyoderma or cellulitis requiring systemic antibiotics."
  },
  {
    "id": "chikungunya",
    "name_en": "Chikungunya Fever",
    "name_bn": "চিকুনগুনিয়া জ্বর ও তীব্র গিঁটে ব্যথা",
    "icd10": "A92.0",
    "system": "infectious",
    "system_bn": "সংক্রামক ব্যাধি",
    "organ": "Joints & Immune System",
    "organ_icon": "🦴",
    "severity": "Medium",
    "overview_bn": "এডিস মশার কামড়ে ছড়ানো চিকুনগুনিয়া ভাইরাসঘটিত তীব্র রোগ। এর প্রধান বৈশিষ্ট্য হলো উচ্চ জ্বরের সাথে হাত-পায়ের সন্ধি বা গিঁটে তীব্র ও দীর্ঘমেয়াদী পঙ্গুত্বকারী ব্যথা।",
    "overview_en": "An arboviral infection transmitted by Aedes mosquitoes characterized by acute high fever followed by debilitating, excruciating polyarthralgia.",
    "causes_bn": [
      "এডিস মশার (Aedes aegypti ও Aedes albopictus) কামড়",
      "চিকুনগুনিয়া ভাইরাস (Togaviridae family) রক্তে সংক্রমণ",
      "শহরের জমাটবদ্ধ পরিষ্কার পানিতে মশার বংশবৃদ্ধি"
    ],
    "causes_en": [
      "Bite of infected day-biting female Aedes aegypti or A. albopictus mosquitoes",
      "Chikungunya Alphavirus replication in synovial and muscle tissue",
      "Rainwater accumulation in discarded tyres, pots, and rooftops"
    ],
    "risk_factors_bn": [
      "ঢাকা ও অন্যান্য নগর এলাকায় বর্ষাকালে বসবাস",
      "দিনে ঘুমানোর সময় মশারি ব্যবহার না করা",
      "বাসার ছাদে বা বারান্দায় ফুলের টবে জমে থাকা পানি"
    ],
    "risk_factors_en": [
      "Urban residency in Dhaka/monsoon-prone cities in Bangladesh",
      "Daytime rest without window screens or repellents",
      "Unattended water reservoirs in building construction sites"
    ],
    "symptoms_bn": [
      "হঠাৎ ১০৩-১০৪ ডিগ্রি ফারেনহাইটের তীব্র জ্বর",
      "হাত, পা, কবজি ও গোড়ালির গিঁটে অসহ্য ব্যথা ও ফুলে যাওয়া",
      "ব্যথার কারণে সোজা হয়ে দাঁড়াতে বা হাঁটতে না পারা",
      "ত্বকে লালচে র‍্যাশ ও চুলকানি",
      "জ্বর সেরে যাওয়ার পরও কয়েক মাস ধরে গিঁটে ব্যথা অব্যাহত থাকা"
    ],
    "symptoms_en": [
      "Sudden high-grade fever (>103 deg F) with chills",
      "Severe debilitating polyarthralgia and periarticular joint swelling",
      "Stooped posture due to unbearable joint pain upon walking",
      "Maculopapular rash on trunk and limbs",
      "Post-viral chronic inflammatory arthritis persisting for months"
    ],
    "diagnostic_tests": [
      "Chikungunya RT-PCR (Best in days 1-5 of fever)",
      "Anti-Chikungunya IgM & IgG Antibody ELISA",
      "Complete Blood Count (CBC showing lymphopenia)",
      "Serum CRP and ESR (Markedly elevated)"
    ],
    "medicines": [
      {
        "generic": "Paracetamol",
        "class": "Analgesic & Antipyretic",
        "usage_bn": "জ্বর ও হালকা ব্যথায় ৫০০-১০০০ মিগ্রা প্রতি ৬-৮ ঘণ্টা পর পর (দৈনিক সর্বোচ্চ ৪ গ্রাম)",
        "usage_en": "500-1000 mg every 6-8 hours for fever and acute pain control",
        "top_brands": [
          "Napa (Beximco)",
          "Ace (Square)",
          "Fast (Acme)",
          "Reset (Incepta)"
        ]
      },
      {
        "generic": "Naproxen Sodium",
        "class": "NSAID (After Dengue Ruled Out)",
        "usage_bn": "ডেঙ্গু নেগেটিভ নিশ্চিত হওয়ার পর গিঁটের তীব্র ব্যথায় ২৫০-৫০০ মিগ্রা ভরাপেটে গ্যাস্ট্রিকের ওষুধসহ",
        "usage_en": "250-500 mg BD with food and PPI strictly after excluding dengue fever",
        "top_brands": [
          "Napryn (Square)",
          "Anaprox (Incepta)",
          "Naprox (Beximco)"
        ]
      },
      {
        "generic": "Cold Compress Gel",
        "class": "Topical Cryotherapy",
        "usage_bn": "ফুলে যাওয়া গিঁটে দিনে ৩-৪ বার ঠান্ডা সেঁক দিলে দ্রুত ফোলা ও জ্বালাপোড়া কমে",
        "usage_en": "Cold pack ice application for 15-20 minutes thrice daily to reduce synovitis",
        "top_brands": [
          "Ice Pack Gel",
          "Cooling Pad"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "ব্যথা থাকা অবস্থায় পর্যাপ্ত বিশ্রাম নিন, কোনো ভারী কাজ করবেন না।",
      "প্রচুর পানি, স্যালাইন, ডাবের পানি ও তরল খাদ্য গ্রহণ করুন।",
      "ডেঙ্গু সম্পূর্ণ নাকচ হওয়ার আগে অ্যাসপিরিন বা ডাইক্লোফেনাক সেবন করবেন না।",
      "বাসার আশপাশের পানি জমার পাত্র প্রতি সপ্তাহে অন্তত একবার পরিষ্কার করুন।"
    ],
    "lifestyle_diet_en": [
      "Strict physical rest during the acute viremic and inflammatory phase.",
      "Abundant hydration: electrolytes, coconut water, fresh fruit juices.",
      "Avoid aspirin or non-selective NSAIDs until dengue hemorrhagic fever is definitively excluded.",
      "Eliminate stagnant freshwater breeding grounds weekly (3-day rule)."
    ],
    "emergency_warning_bn": "বয়স্ক বা হৃদরোগীদের অতিরিক্ত দুর্বলতা, পানিশূন্যতা বা বিভ্রান্তি দেখা দিলে দ্রুত হাসপাতালে ভর্তি করান।",
    "emergency_warning_en": "Elderly patients exhibiting profound dehydration, hemodynamic instability, or delirium need emergency hospital care."
  },
  {
    "id": "kala-azar",
    "name_en": "Kala-Azar (Visceral Leishmaniasis)",
    "name_bn": "কালাজ্বর ও ভিসারাল লেইশম্যানিয়াসিস",
    "icd10": "B55.0",
    "system": "infectious",
    "system_bn": "সংক্রামক ব্যাধি",
    "organ": "Spleen, Liver & Bone Marrow",
    "organ_icon": "🫀",
    "severity": "Critical",
    "overview_bn": "বেলেমাছির (Sandfly) কামড়ে ছড়ানো লেইশম্যানিয়া ডনোভানি পরজীবীঘটিত মারাত্মক ব্যাধি। চিকিৎসার অভাবে এতে প্লীহা ও যকৃৎ বিশাল আকার ধারণ করে এবং মৃত্যুঝুঁকি তৈরি হয়। ময়মনসিংহ, দিনাজপুর ও পাবনায় একসময় এর উচ্চ প্রকোপ ছিল।",
    "overview_en": "A life-threatening protozoan infection caused by Leishmania donovani and transmitted by Phlebotomus sandflies, targeted for national elimination in Bangladesh.",
    "causes_bn": [
      "সংক্রমিত স্ত্রী বেলেমাছি বা স্যান্ডফ্লাইয়ের (Phlebotomus argentipes) কামড়",
      "লেইশম্যানিয়া ডনোভানি পরজীবী রক্তকণিকা ও রেটিকুলোএন্ডোথেলিয়াল সিস্টেমে আক্রমণ",
      "কাঁচা মাটির ঘর, স্যাঁতসেঁতে মেঝের ফাটলে বেলেমাছির বংশবিস্তার"
    ],
    "causes_en": [
      "Bite of female Phlebotomus argentipes sandfly",
      "Intracellular parasitism of macrophages by Leishmania donovani amastigotes",
      "Mud houses, cracked earthen floors, and proximity to cattle sheds"
    ],
    "risk_factors_bn": [
      "ময়মনসিংহ, ত্রিশাল, ভালুকা, দিনাজপুর ও উত্তরাঞ্চলের গ্রামীণ এলাকায় বসবাস",
      "কাঁচা মাটির স্যাঁতসেঁতে ঘরে বাস করা",
      "পশু-পাখির খামারের কাছাকাছি থাকা"
    ],
    "risk_factors_en": [
      "Residing in endemic alluvial plains (Mymensingh, Dinajpur, Rajshahi belts)",
      "Earthen cracked walls and mud flooring providing sandfly microhabitats",
      "Malnutrition and immunosuppression"
    ],
    "symptoms_bn": [
      "২ সপ্তাহের বেশি সময় ধরে অনিয়মিত ও অবিরাম জ্বর",
      "পেটের বাঁপাশে বিশাল প্লীহা ফুলে ওঠা (Massive Splenomegaly)",
      "চরম দুর্বলতা, ক্ষুধামান্দ্য ও দ্রুত ওজন হ্রাস",
      "ত্বকের রঙ অস্বাভাবিক কালচে হয়ে যাওয়া (এ কারণেই নাম 'কালাজ্বর')",
      "মারাত্মক রক্তস্বল্পতা ও দাঁতের মাড়ি বা নাক দিয়ে রক্তক্ষরণ"
    ],
    "symptoms_en": [
      "Protracted irregular fever with double daily peaks",
      "Massive progressive enlargement of the spleen (Splenomegaly)",
      "Profound wasting, cachexia, and anorexia",
      "Greyish-black hyperpigmentation of skin (hands, feet, abdomen)",
      "Severe pancytopenia, bleeding tendency, and secondary bacterial infections"
    ],
    "diagnostic_tests": [
      "rK39 Dipstick Rapid Diagnostic Test (Finger-prick blood)",
      "Bone Marrow or Splenic Aspiration for LD Bodies (Gold standard)",
      "Complete Blood Count (Pancytopenia: low RBC, low WBC, low Platelets)",
      "Direct Agglutination Test (DAT)"
    ],
    "medicines": [
      {
        "generic": "Liposomal Amphotericin B",
        "class": "Single-Dose Antileishmanial Polyene (First-line)",
        "usage_bn": "জাতীয় কালাজ্বর নির্মূল কর্মসূচির অধীনে সরকারি হাসপাতালে একক ডোজ ১০ মিগ্রা/কেজি শিরার মাধ্যমে সম্পূর্ণ বিনামূল্যে প্রয়োগ",
        "usage_en": "10 mg/kg single-dose IV infusion under national elimination protocol (curative >95%)",
        "top_brands": [
          "AmBisome (Gilead)",
          "Fungisome (Life Care)"
        ]
      },
      {
        "generic": "Miltefosine",
        "class": "Oral Antileishmanial Agent",
        "usage_bn": "মুখে সেবনযোগ্য ওষুধ—দৈনিক ৫০-১০০ মিগ্রা ভরাপেটে টানা ২৮ দিন (গর্ভবতীদের ক্ষেত্রে সম্পূর্ণ নিষিদ্ধ)",
        "usage_en": "50 mg capsules twice daily with meals for 28 days (strictly teratogenic)",
        "top_brands": [
          "Impavido (Knight)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "কাঁচা ঘরের মাটির ফাটল সিমেন্ট বা মাটি দিয়ে নিয়মিত বন্ধ করুন।",
      "ঘরের ভেতরে কীটনাশক স্প্রে (IRS) কার্যক্রমে স্বাস্থ্যকর্মীদের পূর্ণ সহযোগিতা করুন।",
      "উচ্চ ক্যালোরি ও উচ্চ প্রোটিনযুক্ত খাবার বেশি করে খান।",
      "জ্বর ২ সপ্তাহের বেশি স্থায়ী হলে সরকারি হাসপাতালে বিনামূল্যে rK39 পরীক্ষা করান।"
    ],
    "lifestyle_diet_en": [
      "Plaster cracked earthen walls and floors with lime/cement to destroy sandfly breeding.",
      "Support indoor residual spraying (IRS) with insecticides conducted by DGHS.",
      "High-protein, micronutrient-dense nutritional rehabilitation.",
      "Avail free rK39 testing at Upazila Health Complexes across Bangladesh."
    ],
    "emergency_warning_bn": "তীব্র রক্তক্ষরণ, চরম শ্বাসকষ্ট বা গুরুতর ব্যাকটেরিয়ার সংক্রমণ দেখা দিলে রোগীকে তাৎক্ষণিক টারশিয়ারি মেডিকেল কলেজ হাসপাতালে স্থানান্তর করুন।",
    "emergency_warning_en": "Severe mucosal hemorrhage, agranulocytosis, or secondary septic shock requires immediate tertiary medical center admission."
  },
  {
    "id": "arsenicosis",
    "name_en": "Chronic Arsenicosis (Groundwater Poisoning)",
    "name_bn": "আর্সেনিকোসিস ও ভূগর্ভস্থ আর্সেনিক বিষক্রিয়া",
    "icd10": "T57.0",
    "system": "dermatology",
    "system_bn": "ত্বক ও চর্মরোগ",
    "organ": "Skin, Liver & Blood Vessels",
    "organ_icon": "🩹",
    "severity": "High",
    "overview_bn": "পানীয় জলে সহনশীল মাত্রার অতিরিক্ত (৫০ পিপিবি এর বেশি) আর্সেনিকযুক্ত নলকূপের পানি দীর্ঘদিন পান করার ফলে সৃষ্ট দীর্ঘমেয়াদী বিষক্রিয়া। ত্বক, ফুসফুস ও মূত্রথলির ক্যান্সারের অন্যতম প্রধান কারণ।",
    "overview_en": "Chronic systemic toxicity resulting from prolonged ingestion of groundwater containing arsenic above national safety levels (>50 ppb), widely affecting rural Bangladesh.",
    "causes_bn": [
      "ভূগর্ভস্থ পানিতে অতিরিক্ত প্রাকৃতিক অজৈব আর্সেনিক মিশ্রিত থাকা",
      "লাল চিহ্নিত বিপদজনক আর্সেনিকযুক্ত অগভীর নলকূপের পানি নিয়মিত পান ও রান্নায় ব্যবহার",
      "শরীরে দীর্ঘদিন ধরে বিষাক্ত আর্সেনিক জমে থাকা (কেরাটিনসমৃদ্ধ ত্বক ও নখে জমা)"
    ],
    "causes_en": [
      "Long-term ingestion of groundwater contaminated with natural inorganic arsenic",
      "Using red-marked tube-wells for drinking and household cooking",
      "Accumulation of trivalent/pentavalent arsenite in keratinized tissues"
    ],
    "risk_factors_bn": [
      "চাঁদপুর, কুমিল্লা, ফরিদপুর, গোপালগঞ্জ, নোয়াখালী ও বাগেরহাটের মতো উচ্চ ঝুঁকিপূর্ণ জেলায় বসবাস",
      "অগভীর নলকূপের পানি পরীক্ষা না করে পান করা",
      "দরিদ্র ও অপুষ্টিতে ভোগা গ্রামীণ জনগোষ্ঠী"
    ],
    "risk_factors_en": [
      "Residency in severely affected river basin districts (Chandpur, Noakhali, Gopalganj)",
      "Drinking water from untested or red-painted tube-wells",
      "Protein and micronutrient malnutrition enhancing toxicity"
    ],
    "symptoms_bn": [
      "ত্বকে বৃষ্টির ফোঁটার মতো কালো ও সাদা ছোট ছোট দাগ (Raindrop melanosis)",
      "হাতের তালু ও পায়ের তলায় চামড়া শক্ত হয়ে খসখসে গুটি হওয়া (Keratosis)",
      "হাত ও পায়ের চামড়া ফেটে ঘা ও চুলকানি হওয়া",
      "দীর্ঘমেয়াদে গ্যাংগ্রিন (Blackfoot disease) ও চর্ম ক্যান্সার (Bowen's disease)"
    ],
    "symptoms_en": [
      "Raindrop macular hyperpigmentation interspersed with white depigmented spots",
      "Rough, nodular palmoplantar keratosis on soles and palms",
      "Fissuring, chronic ulceration, and paresthesias in extremities",
      "Long-term risks: peripheral vascular gangrene (Blackfoot disease) and skin squamous cell cancer"
    ],
    "diagnostic_tests": [
      "Water Arsenic Field Test Kit / Atomic Absorption Spectrophotometry",
      "Nail and Hair Arsenic Concentration (> 1 mg/kg)",
      "Spot Urinary Arsenic Level",
      "Skin Lesion Biopsy & Histopathology"
    ],
    "medicines": [
      {
        "generic": "Antioxidant Multivitamins (Vit A, C, E, Selenium)",
        "class": "Free-Radical Scavenging & Cellular Defense",
        "usage_bn": "আর্সেনিকের বিষক্রিয়া প্রশমিত করতে দৈনিক ১টি ট্যাবলেট টানা কয়েক মাস",
        "usage_en": "Daily formulation of Vitamin A (Beta-carotene), Vit C 500 mg, Vit E 400 IU, and Selenium 100 mcg",
        "top_brands": [
          "Selenium-ACE",
          "Arovit (Square)",
          "Nutrum-50 (Incepta)",
          "E-Gel (Beximco)"
        ]
      },
      {
        "generic": "Salicylic Acid 5-10% in White Petrolatum",
        "class": "Topical Keratolytic Ointment",
        "usage_bn": "হাতের তালু ও পায়ের তলার শক্ত চামড়া নরম করতে রাতে শোয়ার পূর্বে মালিশ",
        "usage_en": "Topical keratolytic applied nightly to soften hyperkeratotic plaques and fissures",
        "top_brands": [
          "Salicyl Ointment",
          "Dermasal",
          "Salicylic Acid 10%"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "সবচেয়ে প্রধান চিকিৎসা: আর্সেনিকযুক্ত নলকূপের পানি পান ও রান্নায় ব্যবহার তাৎক্ষণিক বন্ধ করুন।",
      "সবুজ চিহ্নিত নিরাপদ নলকূপ, গভীর নলকূপ বা বৃষ্টির ফিল্টার করা পানি পান করুন।",
      "প্রচুর শাকসবজি, ডিম, দুধ ও অ্যান্টিঅক্সিডেন্টসমৃদ্ধ খাবার খান।",
      "হাতের ও পায়ের তালু সবসময় পরিষ্কার ও ময়েশ্চারাইজড রাখুন।"
    ],
    "lifestyle_diet_en": [
      "Primary treatment: Immediately switch to arsenic-free green-marked or deep tube-well water.",
      "Utilize rainwater harvesting and community arsenic-iron removal filters (AIRP).",
      "High-protein and antioxidant-rich diet: green leafy vegetables, eggs, seasonal fruits.",
      "Regular dermatological follow-up to detect malignant transformation early."
    ],
    "emergency_warning_bn": "ত্বকের কোনো ঘা যদি দীর্ঘদিন না শুকায়, রক্তক্ষরণ হয় বা কালো হয়ে পচে যায়, তবে তা ক্যান্সারের রূপ নিতে পারে—দ্রুত চর্মরোগ ও অনকোলজি বিশেষজ্ঞের পরামর্শ নিন।",
    "emergency_warning_en": "Non-healing ulcerating keratotic nodules or non-pigmented fungating lesions indicate malignant skin cancer. Urgent oncological evaluation needed."
  },
  {
    "id": "tinea-fungal-infection",
    "name_en": "Dermatophytosis & Tinea (Ringworm)",
    "name_bn": "দাদ ও ছত্রাকজনিত চর্মরোগ",
    "icd10": "B35",
    "system": "dermatology",
    "system_bn": "ত্বক ও চর্মরোগ",
    "organ": "Skin, Groin & Nails",
    "organ_icon": "🩹",
    "severity": "Low",
    "overview_bn": "ডার্মাটোফাইট ছত্রাকঘটিত সাধারণ চর্মরোগ। বর্ষাকালে গরম ও ঘামের কারণে কুচকি (দাদ), মাথা ও শরীরের ভাঁজে বৃত্তাকার চুলকানিযুক্ত চাকা তৈরি হয়। স্টেরয়েড মলম ব্যবহারের কারণে বাংলাদেশে এটি জটিল আকার ধারণ করছে।",
    "overview_en": "Superficial fungal infection of keratinized tissue caused by dermatophytes (Trichophyton, Microsporum), producing pruritic annular lesions with active scaly borders.",
    "causes_bn": [
      "ট্রাইকোফাইটন ও মাইক্রোস্পোরাম ছত্রাকের সংক্রমণ",
      "অতিরিক্ত ঘাম ও দীর্ঘসময় ভেজা অন্তর্বাস বা স্যাঁতসেঁতে কাপড় পরা",
      "আক্রান্ত ব্যক্তির তোয়ালে, চিরুনি বা পোশাক ব্যবহার",
      "অনিয়ন্ত্রিতভাবে স্টেরয়েডযুক্ত মিশ্র মলম (ডার্মোমিক্স, পেভিসন ইত্যাদি) ব্যবহার"
    ],
    "causes_en": [
      "Trichophyton rubrum and T. mentagrophytes dermatophyte colonization",
      "Maceration from excess perspiration, synthetic unbreathable tight clothes",
      "Fomite transmission via towels, innerwear, bedsheets, razors",
      "Widespread misuse of over-the-counter topical steroid combinations"
    ],
    "risk_factors_bn": [
      "বাংলাদেশের উষ্ণ ও আর্দ্র আবহাওয়া",
      "ডায়াবেটিস ও স্থূলতা",
      "নিয়মিত গোসল না করা বা ভেজা শরীর ভালোভাবে না মোছা"
    ],
    "risk_factors_en": [
      "Tropical humid monsoon environment in Bangladesh",
      "Diabetes mellitus, obesity, immune suppression",
      "Inadequate drying of skin folds after bathing"
    ],
    "symptoms_bn": [
      "গোলাকার আংটির মতো চাকা যার কিনারাগুলো লালচে, উঁচু ও আঁশযুক্ত",
      "তীব্র চুলকানি ও ত্বক জ্বালাপোড়া করা",
      "কুচকি, ঊরু, বুক, পিঠ ও পায়ের আঙুলের ফাঁকে লাল ফুসকুড়ি",
      "আক্রান্ত স্থানের ত্বক কালচে হয়ে যাওয়া"
    ],
    "symptoms_en": [
      "Annular ring-shaped erythematous plaques with elevated active scaly borders",
      "Intense burning pruritus exacerbated by sweating",
      "Maceration in interdigital spaces and groin (Tinea cruris / pedis)",
      "Post-inflammatory dark hyperpigmentation"
    ],
    "diagnostic_tests": [
      "Potassium Hydroxide (KOH 10-20%) Mount Microscopy",
      "Wood's Lamp Ultraviolet Examination",
      "Fungal Culture on Sabouraud Dextrose Agar (SDA)",
      "Dermoscopy of cutaneous border"
    ],
    "medicines": [
      {
        "generic": "Terbinafine Hydrochloride",
        "class": "Allylamine Antifungal (Topical & Oral)",
        "usage_bn": "মলম: দিনে ১-২ বার আক্রান্ত স্থানের চেয়ে ২ সেমি বাইরে পর্যন্ত লাগাতে হবে টানা ২-৪ সপ্তাহ; মুখে: ২৫০ মিগ্রা দৈনিক ১টি",
        "usage_en": "Topical cream 1% applied BD extending 2 cm beyond border for 2-4 weeks; 250 mg oral OD for extensive cases",
        "top_brands": [
          "Terbifin (Square)",
          "Tinasil (Incepta)",
          "Terbex (Beximco)",
          "Lamisil (Novartis)"
        ]
      },
      {
        "generic": "Itraconazole",
        "class": "Broad-Spectrum Oral Triazole Antifungal",
        "usage_bn": "পুরনো ও জটিল দাদে দৈনিক ১০০-২০০ মিগ্রা ভরাপেটে টানা ১৫-২৮ দিন",
        "usage_en": "100-200 mg once or twice daily with high-fat meals for refractory dermatophytosis",
        "top_brands": [
          "Itra (Incepta)",
          "Itracon (Square)",
          "Sporanox (Janssen)",
          "Micoral (Beximco)"
        ]
      },
      {
        "generic": "Clotrimazole / Luliconazole Cream",
        "class": "Topical Imidazole Antifungal",
        "usage_bn": "আক্রান্ত স্থানে পাতলা প্রলেপ দিয়ে দিনে ২ বার ব্যবহার করতে হবে",
        "usage_en": "Apply thin layer to affected area twice daily for 2 weeks",
        "top_brands": [
          "Luliderm (Square)",
          "Candid (Glenmark)",
          "Lulifast (Incepta)",
          "Cloben (Beximco)"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "কখনোই ফার্মেসি থেকে স্টেরয়েড বা মিশ্র মলম (Betamethasone/Clobetasol) কিনে দাদে লাগাবেন না।",
      "সুতি ঢিলেঢালা পোশাক ও অন্তর্বাস পরুন এবং প্রতিদিন রোদে শুকানো পরিষ্কার অন্তর্বাস পরিবর্তন করুন।",
      "গোসলের পর শরীরের প্রতিটি ভাঁজ শুকনো তোয়ালে দিয়ে ভালোভাবে মুছে সম্পূর্ণ শুকিয়ে নিন।",
      "চুলকানি সেরে যাওয়ার পরও চিকিৎসকের পরামর্শমতো অন্তত ১ সপ্তাহ মলম লাগানো চালিয়ে যান।"
    ],
    "lifestyle_diet_en": [
      "Strictly avoid OTC steroid combination creams (causes Tinea incognito and recurrence).",
      "Wear loose 100% cotton clothing and change innerwear daily after sun-drying.",
      "Thoroughly dry intertriginous skin folds with clean towels after every shower.",
      "Continue antifungal application for 1-2 weeks past complete visual clearance."
    ],
    "emergency_warning_bn": "ত্বক লাল হয়ে ফুলে ভীষণ ব্যথা হলে ও পুঁজ বের হলে দ্বিতীয় পর্যায়ের ব্যাকটেরিয়ার সংক্রমণ হয়েছে—অবিলম্বে অ্যান্টিবায়োটিকের জন্য ডাক্তার দেখান।",
    "emergency_warning_en": "Severe swelling, radiating cellulitis, or purulent drainage requires immediate systemic antibacterial treatment."
  },
  {
    "id": "intestinal-worms",
    "name_en": "Helminthiasis & Intestinal Worms",
    "name_bn": "কৃমি সংক্রমণ (গোলকৃমি ও বক্রকৃমি)",
    "icd10": "B82",
    "system": "gastrointestinal",
    "system_bn": "পরিপাকতন্ত্র ও পেট",
    "organ": "Intestinal Tract",
    "organ_icon": "🥣",
    "severity": "Low",
    "overview_bn": "অন্ত্রে পরজীবী কৃমির (যেমন গোলকৃমি, বক্রকৃমি, সুতাকৃমি) সংক্রমণ। বাংলাদেশের শিশুদের অপুষ্টি, রক্তস্বল্পতা ও শারীরিক বৃদ্ধি বাধাগ্রস্ত হওয়ার অন্যতম কারণ। জাতীয় কৃমি নিয়ন্ত্রণ সপ্তাহ প্রতি বছর এ কারণেই পরিচালিত হয়।",
    "overview_en": "Soil-transmitted helminth (STH) infestations including Ascaris, Hookworm, and Trichuris, targeted by nationwide biannual school deworming campaigns in Bangladesh.",
    "causes_bn": [
      "মাটিতে খালি পায়ে চলাফেরা (হুকওয়ার্মের লার্ভা ত্বকের ভেতর দিয়ে ঢোকে)",
      "খাওয়ার আগে সাবান দিয়ে হাত না ধোয়া ও অপরিচ্ছন্ন নখ",
      "অসিদ্ধ শাকসবজি ও অপরিশোধিত পানি পান",
      "উন্মুক্ত স্থানে মলত্যাগ ও অস্বাস্থ্যকর শৌচাগার"
    ],
    "causes_en": [
      "Percutaneous penetration of hookworm larvae while walking barefoot",
      "Fecal-oral ingestion of Ascaris/Trichuris eggs via unwashed hands and soil",
      "Consuming unwashed vegetables and raw irrigation water",
      "Inadequate sanitation and unpaved latrines"
    ],
    "risk_factors_bn": [
      "স্কুলগামী শিশু ও কিশোর-কিশোরী",
      "গ্রামীণ কৃষিশ্রমিক ও খালি পায়ে চলাচলকারী ব্যক্তি",
      "পরিবারে ৬ মাস অন্তর কৃমির ওষুধ না খাওয়ার অভ্যাস"
    ],
    "risk_factors_en": [
      "Primary school children playing in rural soil",
      "Agricultural laborers and gardeners without footwear",
      "Household failure to undergo regular biannual deworming"
    ],
    "symptoms_bn": [
      "নাভির চারপাশে ও পেটে ঘন ঘন হালকা বা মোচড়ানো ব্যথা",
      "ক্ষুধামান্দ্য বা অতিরিক্ত খাওয়া সত্ত্বেও ওজন না বাড়া",
      "মলদ্বারের মুখে তীব্র চুলকানি (বিশেষ করে রাতে সুতাকৃমির ক্ষেত্রে)",
      "রক্তস্বল্পতা ও শারীরিক দুর্বলতা",
      "মুখে অতিরিক্ত লালা ঝরা ও ঘুমের মধ্যে দাঁত কিড়মিড় করা"
    ],
    "symptoms_en": [
      "Recurrent periumbilical colicky abdominal discomfort",
      "Impaired growth, failure to thrive, and poor cognitive performance",
      "Pruritus ani (intense nocturnal perianal itching from Enterobius pinworms)",
      "Chronic microcytic hypochromic anemia (hookworm)",
      "Excessive ptyalism and nocturnal bruxism (teeth grinding)"
    ],
    "diagnostic_tests": [
      "Stool Routine Examination (R/M/E for Ova, Cysts, and Parasites)",
      "Scotch Adhesive Tape Test (For Pinworm eggs)",
      "Complete Blood Count (Elevated absolute eosinophil count - Eosinophilia)"
    ],
    "medicines": [
      {
        "generic": "Albendazole",
        "class": "Broad-Spectrum Benzimidazole Anthelmintic",
        "usage_bn": "২ বছর বা তদূর্ধ্বদের জন্য ৪০০ মিগ্রা ১টি ট্যাবলেট একক মাত্রায় চিবিয়ে খেতে হবে (৬ মাস পর আবার)",
        "usage_en": "400 mg single chewable tablet for adults and children > 2 years (200 mg for age 1-2)",
        "top_brands": [
          "Almex (Square)",
          "Alben (Incepta)",
          "Solas (Beximco)",
          "Albend (Renata)"
        ]
      },
      {
        "generic": "Mebendazole",
        "class": "Anthelmintic Agent",
        "usage_bn": "১০০ মিগ্রা ট্যাবলেট দিনে ২ বার করে টানা ৩ দিন চিবিয়ে সেব্য",
        "usage_en": "100 mg twice daily for 3 consecutive days for heavy mixed worm loads",
        "top_brands": [
          "Vermox (Janssen)",
          "Meben (Square)",
          "Mebex (Incepta)"
        ]
      },
      {
        "generic": "Pyrantel Pamoate",
        "class": "Depolarizing Neuromuscular Blocker",
        "usage_bn": "সুতাকৃমির চিকিৎসায় ১১ মিগ্রা/কেজি একক মাত্রায়, ২ সপ্তাহ পর দ্বিতীয় ডোজ",
        "usage_en": "11 mg/kg single dose, repeated in 2 weeks for persistent pinworms",
        "top_brands": [
          "Melphin (Square)",
          "Antiworm"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "পরিবারের সকল সদস্যকে প্রতি ৬ মাস পরপর একসাথে কৃমির ওষুধ খেতে হবে।",
      "খাওয়ার আগে এবং টয়লেটের পর সাবান দিয়ে ভালো করে হাত ধোয়ার অভ্যাস গড়ে তুলুন।",
      "শিশুদের হাতের নখ নিয়মিত কেটে ছোট রাখুন যাতে নখের নিচে ডিম না জমে।",
      "বাড়ির বাইরে সব সময় জুতো বা স্যান্ডেল পরে হাঁটার অভ্যাস করুন।"
    ],
    "lifestyle_diet_en": [
      "Administer mass deworming to all family members concurrently every 6 months.",
      "Teach rigorous handwashing with soap before every meal and after toilet visits.",
      "Keep children's fingernails clipped short and clean to eliminate ovum harbor.",
      "Always wear shoes/slippers outdoors in rural soil."
    ],
    "emergency_warning_bn": "অতিরিক্ত কৃমির কারণে শিশুর পেট ফুলে শক্ত হয়ে গেলে, বমি হলে বা মল-বায়ু চলাচল বন্ধ হলে (Intestinal Obstruction) তাৎক্ষণিক শিশু সার্জারি বিভাগে নিন।",
    "emergency_warning_en": "Acute bowel obstruction from an Ascaris bolus presenting with abdominal distension and bilious vomiting requires urgent surgical intervention."
  },
  {
    "id": "h-pylori-gastritis",
    "name_en": "Helicobacter Pylori Gastritis",
    "name_bn": "এইচ. পাইলোরি পাকস্থলী সংক্রমণ ও তীব্র গ্যাস্ট্রিক",
    "icd10": "K29.5",
    "system": "gastrointestinal",
    "system_bn": "পরিপাকতন্ত্র ও পেট",
    "organ": "Stomach Lining",
    "organ_icon": "🥣",
    "severity": "Medium",
    "overview_bn": "পাকস্থলীর শ্লৈষ্মিক ঝিল্লিতে হেলিকোব্যাক্টার পাইলোরি ব্যাক্টেরিয়ার দীর্ঘস্থায়ী সংক্রমণ। বাংলাদেশের সাধারণ গ্যাস্ট্রিক, পেপটিক আলসার ও দীর্ঘমেয়াদী এসিডিটির অন্যতম প্রধান অনুঘটক।",
    "overview_en": "Chronic bacterial infection of the gastric mucosa by Helicobacter pylori, highly endemic in Bangladesh and the major cause of recurrent peptic ulcers and gastric MALToma.",
    "causes_bn": [
      "দূষিত খাবার ও পানির মাধ্যমে এইচ. পাইলোরি ব্যাক্টেরিয়া মুখে প্রবেশ",
      "পাকস্থলীর অ্যাসিড প্রতিরোধী ইউরিয়েজ এনজাইমের সাহায্যে ব্যাক্টেরিয়া প্রাচীরে টিকে থাকা",
      "একই পাত্রে ভাগাভাগি করে খাওয়া ও অস্বাস্থ্যকর পানীয় জল"
    ],
    "causes_en": [
      "Fecal-oral or oral-oral transmission via contaminated food and water supplies",
      "Bacterial urease neutralizing gastric acid to colonize epithelial lining",
      "Shared dining utensils in crowded households"
    ],
    "risk_factors_bn": [
      "অনিরাপদ রাস্তার খাবার ও ফুটানো ছাড়া পানি পান",
      "দীর্ঘদিন ধরে পেটের গ্যাস বা বুকজ্বালার সমস্যায় ভোগা",
      "ধূমপান ও অতিরিক্ত মসলাযুক্ত খাবার"
    ],
    "risk_factors_en": [
      "Consumption of untreated municipal/well water in Bangladesh",
      "Chronic non-responsive dyspeptic symptoms despite standard PPI therapy",
      "Tobacco smoking promoting mucosal vulnerability"
    ],
    "symptoms_bn": [
      "পেটের ওপরের মাঝখানে জ্বালাপোড়া বা কামড়ানো ব্যথা (খালি পেটে বাড়ে)",
      "খাওয়ার পর পেট অতিরিক্ত ফাঁপা ও ভারী বোধ হওয়া",
      "ঘন ঘন টক ঢেঁকুর ওঠা ও বমি ভাব",
      "অল্প খাবার খেলেই পেট ভরে গেছে মনে হওয়া (Early satiety)"
    ],
    "symptoms_en": [
      "Gnawing or burning epigastric pain, worse on empty stomach or at night",
      "Postprandial bloating, early satiety, and belching",
      "Nausea, sour regurgitation, and episodic vomiting",
      "Unintended weight loss and iron deficiency anemia"
    ],
    "diagnostic_tests": [
      "Stool H. Pylori Antigen Test (HpSA - High sensitivity non-invasive)",
      "14C/13C Urea Breath Test (UBT - Gold Standard for active infection & cure)",
      "Upper GI Endoscopy with Rapid Urease Test (RUT / CLO test)",
      "Gastric Mucosal Histopathology"
    ],
    "medicines": [
      {
        "generic": "Standard Triple Therapy Pack (Esomeprazole + Clarithromycin + Amoxicillin)",
        "class": "14-Day Eradication Regimen",
        "usage_bn": "ইসোমিপ্রাজল ৪০ মিগ্রা + ক্ল্যারিথ্রোমাইসিন ৫০০ মিগ্রা + এমোক্সিসিলিন ১০০০ মিগ্রা দিনে ২ বার করে টানা ১৪ দিন",
        "usage_en": "Standard 14-day triple therapy: PPI 40 mg BD + Clarithromycin 500 mg BD + Amoxicillin 1 g BD",
        "top_brands": [
          "Pylotrip (Square)",
          "Triokit (Incepta)",
          "HP Kit (Beximco)",
          "Helico-Kit (Renata)"
        ]
      },
      {
        "generic": "Bismuth Subsalicylate Quadruple Pack",
        "class": "Second-Line Bismuth Quadruple Regimen",
        "usage_bn": "ক্ল্যারিথ্রোমাইসিন রেজিস্ট্যান্স হলে বিসমাথ + মেট্রোনিডাজল + টেট্রাসাইক্লিন + পিপিআই টানা ১৪ দিন",
        "usage_en": "Bismuth subsalicylate + Metronidazole + Tetracycline + PPI for 14 days in resistant cases",
        "top_brands": [
          "De-Nol",
          "Bismo (Incepta)",
          "Pepto-Bismol"
        ]
      }
    ],
    "lifestyle_diet_bn": [
      "ওষুধের ১৪ দিনের পুরো কোর্স শতভাগ নিয়ম মেনে শেষ করুন, মাঝপথে কখনো বন্ধ করবেন না।",
      "পানি সব সময় ফুটিয়ে পান করুন এবং বাইরের খোলা খাবার ও মিষ্টির দোকানে অপরিচ্ছন্ন পানি বর্জন করুন।",
      "অতিরিক্ত তেল, ঝাল, ভাজাভুজি ও ক্যাফেইনযুক্ত পানীয় পরিহার করুন।",
      "একবারে বেশি না খেয়ে অল্প অল্প করে দিনে কয়েকবার আহার গ্রহণ করুন।"
    ],
    "lifestyle_diet_en": [
      "Adhere strictly to the complete 14-day antibiotic regimen to prevent drug resistance.",
      "Strict water purification by boiling or UV filtration; avoid street-vended drinks.",
      "Limit spicy, oily fried foods, tobacco, and high caffeine consumption.",
      "Confirm eradication using Stool Antigen or Urea Breath Test 4-6 weeks after therapy."
    ],
    "emergency_warning_bn": "কালো আলকাতরার মতো পায়খানা হলে বা কফির গুঁড়োর মতো বমি হলে আলসার থেকে রক্তপাত শুরু হয়েছে—তাৎক্ষণিক হাসপাতালের ইমার্জেন্সিতে যান।",
    "emergency_warning_en": "Coffee-ground vomiting or pitch-black tarry stools (melena) indicates upper GI bleeding. Rush to hospital emergency immediately."
  }
];

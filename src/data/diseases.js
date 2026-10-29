export const diseaseCategories = [
  {
    id: "diabetes",
    nameKey: "diabetes",
    descKey: "diabetesDesc",
    icon: "Activity",
    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    symptoms: [
      { id: "freq_urination", label: "Frequent urination (especially at night)", severity: 18, demoDefault: true },
      { id: "weight_loss", label: "Unexpected weight loss despite normal appetite", severity: 18, demoDefault: true },
      { id: "constant_fatigue", label: "Constant fatigue and low physical stamina", severity: 15, demoDefault: true },
      { id: "blurred_vision", label: "Blurred vision or difficulty focusing", severity: 14, demoDefault: true },
      { id: "excess_thirst", label: "Excessive, unquenchable thirst (Polydipsia)", severity: 16 },
      { id: "slow_healing", label: "Slow healing sores or recurrent infections", severity: 12 },
      { id: "tingling_hands_feet", label: "Tingling, numbness, or pain in hands/feet", severity: 15 },
      { id: "increased_hunger", label: "Extreme hunger even after eating (Polyphagia)", severity: 10 }
    ],
    info: {
      overview: "Diabetes Mellitus is a metabolic disorder where blood glucose levels are chronically elevated. Early detection prevents microvascular and macrovascular complications.",
      prevalence: "Affects over 537 million adults globally, with 1 in 2 remaining undiagnosed.",
      riskFactors: ["Sedentary lifestyle", "Family history", "BMI > 25", "Age 45+", "Hypertension"],
      primaryTests: ["Fasting Plasma Glucose (FPG)", "HbA1c Test (Glycated Hemoglobin)", "Oral Glucose Tolerance Test (OGTT)"]
    }
  },
  {
    id: "heart",
    nameKey: "heartDisease",
    descKey: "heartDiseaseDesc",
    icon: "HeartPulse",
    badgeColor: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    symptoms: [
      { id: "chest_discomfort", label: "Chest pressure, tightness, or aching sensation", severity: 24 },
      { id: "shortness_breath", label: "Shortness of breath during mild exertion", severity: 20 },
      { id: "irregular_heartbeat", label: "Palpitations or rapid, fluttering pulse", severity: 16 },
      { id: "swelling_legs", label: "Swelling in ankles, feet, or lower legs (Edema)", severity: 15 },
      { id: "dizziness_lightheaded", label: "Lightheadedness, dizziness, or fainting episodes", severity: 15 },
      { id: "radiating_pain", label: "Pain radiating to jaw, neck, shoulder, or left arm", severity: 22 },
      { id: "cold_sweats", label: "Cold sweats and sudden clammy skin", severity: 14 }
    ],
    info: {
      overview: "Cardiovascular diseases (CVDs) remain the leading cause of death globally. Early risk assessment evaluates arterial stiffness, cardiac workload, and ischemic indicators.",
      prevalence: "Responsible for ~32% of all global deaths annually.",
      riskFactors: ["High LDL Cholesterol", "Hypertension (>130/80)", "Tobacco use", "Physical inactivity", "High stress"],
      primaryTests: ["12-lead Electrocardiogram (ECG)", "Lipid Panel", "Echocardiogram", "Coronary Calcium Scan"]
    }
  },
  {
    id: "cancer",
    nameKey: "cancerRisk",
    descKey: "cancerRiskDesc",
    icon: "ShieldAlert",
    badgeColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    symptoms: [
      { id: "unexplained_weight_drop", label: "Unexplained weight loss (>10 lbs in 1-2 months)", severity: 22 },
      { id: "persistent_lump", label: "Persistent lump or thickening in breast, neck, or lymph node", severity: 26 },
      { id: "skin_mole_changes", label: "Noticeable change in size, color, or shape of skin mole", severity: 18 },
      { id: "chronic_hoarseness", label: "Chronic hoarseness or persistent cough > 4 weeks", severity: 16 },
      { id: "unusual_bleeding", label: "Unusual bleeding, discharge, or blood in stool/urine", severity: 25 },
      { id: "unrelieved_night_sweats", label: "Drenching night sweats or unexplained low-grade fevers", severity: 17 },
      { id: "difficulty_swallowing", label: "Persistent dysphagia (trouble swallowing)", severity: 16 }
    ],
    info: {
      overview: "Early cancer risk screening focuses on early detection when cellular abnormalities or localized tumors are highly treatable and curable.",
      prevalence: "Over 19 million new diagnoses worldwide each year; early screening increases 5-year survival beyond 90% for most common types.",
      riskFactors: ["Carcinogen exposure", "Tobacco / excessive alcohol", "Genetic mutations (e.g., BRCA)", "Chronic inflammation"],
      primaryTests: ["Biomarker / Tumor Panels", "Low-Dose CT (LDCT)", "Mammography", "Colonoscopy / Pap Smear"]
    }
  },
  {
    id: "neurological",
    nameKey: "neurological",
    descKey: "neurologicalDesc",
    icon: "Brain",
    badgeColor: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    symptoms: [
      { id: "sudden_numbness", label: "Sudden weakness or numbness in face, arm, or leg (especially one side)", severity: 28 },
      { id: "speech_confusion", label: "Difficulty speaking, slurred words, or trouble understanding speech", severity: 26 },
      { id: "balance_loss", label: "Sudden loss of balance, coordination, or severe unsteady gait", severity: 20 },
      { id: "severe_headache", label: "Severe, unprecedented headache ('thunderclap' onset)", severity: 22 },
      { id: "memory_lapses", label: "Progressive short-term memory lapses and spatial disorientation", severity: 15 },
      { id: "tremors_rigidity", label: "Involuntary hand/limb tremors or muscular rigidity", severity: 16 }
    ],
    info: {
      overview: "Neurological risk screening detects warning signs of stroke (CVA), neurodegenerative deterioration, and central nervous system disturbances.",
      prevalence: "Stroke is the 2nd leading cause of death globally. Every 40 seconds someone experiences a cerebrovascular event.",
      riskFactors: ["Transient Ischemic Attack (TIA) history", "Atrial Fibrillation", "High Blood Pressure", "Carotid Stenosis"],
      primaryTests: ["Brain MRI / CT Angiography", "Carotid Doppler Ultrasound", "Neurocognitive MMSE Exam"]
    }
  },
  {
    id: "kidney",
    nameKey: "kidneyDisease",
    descKey: "kidneyDiseaseDesc",
    icon: "Droplets",
    badgeColor: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    symptoms: [
      { id: "foamy_urine", label: "Foamy or bubbly urine (suggesting proteinuria)", severity: 22 },
      { id: "puffy_eyes", label: "Persistent puffiness around eyes, especially in mornings", severity: 18 },
      { id: "metallic_taste", label: "Metallic taste in mouth or ammonia-smelling breath", severity: 15 },
      { id: "decreased_urine_output", label: "Noticeably decreased or painful urination", severity: 20 },
      { id: "severe_flank_pain", label: "Persistent dull flank or lower back pain below ribs", severity: 16 },
      { id: "restless_legs_cramps", label: "Severe muscle cramping and restless legs at night", severity: 14 }
    ],
    info: {
      overview: "Chronic Kidney Disease (CKD) often progresses silently. Early screening detects decline in Glomerular Filtration Rate (eGFR) before nephron destruction.",
      prevalence: "More than 850 million people have kidney disease, with over 90% unaware of their early condition.",
      riskFactors: ["Uncontrolled Diabetes", "Chronic Hypertension", "Prolonged NSAID painkiller use", "Glomerulonephritis"],
      primaryTests: ["Serum Creatinine & eGFR", "Urine Albumin-to-Creatinine Ratio (uACR)", "Renal Ultrasound"]
    }
  },
  {
    id: "respiratory",
    nameKey: "respiratory",
    descKey: "respiratoryDesc",
    icon: "Wind",
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    symptoms: [
      { id: "chronic_cough", label: "Chronic cough producing clear, white, or yellow mucus (>3 weeks)", severity: 20 },
      { id: "wheezing_chest_tight", label: "Audible wheezing or whistling sound when exhaling", severity: 22 },
      { id: "dyspnea_stairs", label: "Severe breathlessness even when climbing a single flight of stairs", severity: 24 },
      { id: "frequent_chest_infections", label: "Frequent respiratory infections like recurrent bronchitis", severity: 18 },
      { id: "morning_headache_apnea", label: "Waking up gasping for air or with morning headaches", severity: 16 }
    ],
    info: {
      overview: "Evaluates respiratory compromises including Chronic Obstructive Pulmonary Disease (COPD), reactive airway disease, and restrictive lung deficits.",
      prevalence: "COPD is the 3rd leading cause of death worldwide; asthma affects over 260 million individuals.",
      riskFactors: ["Active/Passive tobacco smoke", "Biomass & particulate pollution", "Occupational chemical dusts"],
      primaryTests: ["Spirometry (FEV1/FVC)", "Chest X-Ray / High-Resolution CT", "Pulse Oximetry (SpO2)"]
    }
  }
];

export const healthyLivingTips = [
  {
    id: "sleep",
    title: "Prioritizing Restorative Sleep (7-8 Hours)",
    category: "Rest & Recovery",
    icon: "Moon",
    summary: "Consistent circadian sleep cycles optimize metabolic hormone regulation, insulin sensitivity, and cellular repair.",
    actionPoints: [
      "Keep a fixed bedtime within ±30 minutes every day.",
      "Avoid blue-light screens and heavy meals 90 minutes before sleep.",
      "Keep the bedroom cool (65-68°F / 18-20°C) and dark."
    ]
  },
  {
    id: "nutrition",
    title: "Balanced Glycemic & Anti-Inflammatory Diet",
    category: "Nutrition",
    icon: "Apple",
    summary: "Whole-food nutrition rich in soluble fiber slows glucose absorption and mitigates cardiovascular plaque formation.",
    actionPoints: [
      "Incorporate leafy greens, legumes, and omega-3 rich seeds/fish.",
      "Replace refined carbohydrates with complex grains (oats, quinoa, millets).",
      "Limit ultra-processed snacks and added sugars to less than 25g/day."
    ]
  },
  {
    id: "hydration",
    title: "Optimal Hydration & Electrolyte Balance",
    category: "Vitality",
    icon: "Droplet",
    summary: "Adequate fluid intake supports renal glomerular filtration and maintains healthy blood viscosity.",
    actionPoints: [
      "Target 2.5 to 3 liters of fresh water daily.",
      "Monitor urine color: aim for pale straw-yellow clarity.",
      "Minimize sugar-sweetened beverages and excessive caffeine."
    ]
  },
  {
    id: "exercise",
    title: "150 Minutes of Moderate Aerobic Movement",
    category: "Physical Activity",
    icon: "Footprints",
    summary: "Brisk walking or cycling enhances insulin-independent glucose uptake into skeletal muscles and strengthens heart chambers.",
    actionPoints: [
      "Break activity into 30-minute sessions, 5 days per week.",
      "Include resistance exercises twice a week to maintain lean muscle mass.",
      "Take 2-minute active walking breaks for every 45 minutes of sedentary sitting."
    ]
  },
  {
    id: "stress",
    title: "Stress Regulation & Cortisol Management",
    category: "Mental Wellness",
    icon: "Heart",
    summary: "Chronic stress elevates cortisol and sympathetic tone, driving hypertension and glycemic spikes.",
    actionPoints: [
      "Practice 5-10 minutes of diaphragmatic breathing (4-7-8 technique).",
      "Dedicate daily time to screen-free mindfulness or nature walks.",
      "Cultivate regular social connections with family and supportive peers."
    ]
  }
];

export const healthInsights = [
  {
    id: "ins_1",
    tag: "Epidemiological Alert",
    title: "Rising Pre-Diabetes Rates in Urban Demographics",
    date: "October 2026",
    summary: "Recent clinical surveys indicate that over 65% of individuals exhibiting early insulin resistance remain asymptomatic. Timely lifestyle interventions reverse pre-diabetes in 70% of cases.",
    readTime: "3 min read"
  },
  {
    id: "ins_2",
    tag: "Cardiovascular Health",
    title: "Silent Hypertension: The Stealth Risk Factor",
    date: "October 2026",
    summary: "Blood pressure above 130/80 mmHg frequently goes unnoticed without headaches. Routine monthly checks and sodium moderation significantly lower stroke hazards.",
    readTime: "4 min read"
  },
  {
    id: "ins_3",
    tag: "Preventive Care",
    title: "The Power of Annual Biomarker & Lipid Screening",
    date: "September 2026",
    summary: "Checking HbA1c, complete blood count, and lipid profiles once a year provides doctors with early trajectory data before irreversible organ impact occurs.",
    readTime: "5 min read"
  }
];


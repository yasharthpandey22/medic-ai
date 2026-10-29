export const initialUsers = {
  patient: {
    id: "usr_pat_01",
    name: "Patient User",
    email: "patient@demo.com",
    gender: "Male",
    age: 30,
    role: "patient",
    bloodGroup: "O+",
    phone: "",
    emergencyContact: "",
    medicalHistory: []
  },
  doctor: {
    id: "usr_doc_01",
    name: "Dr. Clinician",
    email: "doctor@demo.com",
    role: "doctor",
    specialty: "Internal Medicine & Preventive Diabetology",
    hospital: "City Health Memorial & Research Center"
  },
  admin: {
    id: "usr_adm_01",
    name: "System Administrator",
    email: "admin@demo.com",
    role: "admin",
    department: "Clinical AI Operations & Informatics"
  }
};

// Starts empty for a clean, brand-new session
export const initialAssessments = [];

export const initialNotifications = [
  {
    id: "notif_1",
    title: "Welcome to Medic AI",
    message: "Multi-language support for Telugu and Hindi is active across all 6 screening modules.",
    time: "Just now",
    read: false,
    type: "system"
  },
  {
    id: "notif_2",
    title: "Healthy Living Tip",
    message: "Hydration check: Drinking fresh water upon waking accelerates morning metabolic clearance.",
    time: "1 hour ago",
    read: false,
    type: "info"
  }
];

export const sampleDoctorReports = [
  {
    id: "rep_sample_1",
    title: "Comprehensive Metabolic & Glucose Panel (Quest Diagnostics)",
    date: "24-Oct-2026",
    extractedData: {
      patientName: "Screened Patient",
      fastingGlucose: "148 mg/dL (High, Ref: 70-99)",
      hbA1c: "7.4% (Elevated, Ref: < 5.7%)",
      urineKetones: "Negative",
      serumCreatinine: "0.95 mg/dL (Normal)",
      lipidPanel: "Total Cholesterol 215 mg/dL, LDL 138 mg/dL"
    },
    aiSummary: "Biomarker analysis indicates persistent hyperglycemia consistent with early Type 2 Diabetes Mellitus with borderline hyperlipidemia.",
    suggestedRiskScore: 72,
    suggestedRiskLevel: "Medium Risk"
  },
  {
    id: "rep_sample_2",
    title: "Cardiac Lipid & High-Sensitivity CRP Profile (Apollo Clinics)",
    date: "12-Sep-2026",
    extractedData: {
      patientName: "Screened Patient",
      totalCholesterol: "185 mg/dL (Optimal)",
      hdlCholesterol: "52 mg/dL (Normal)",
      ldlCholesterol: "110 mg/dL (Desirable)",
      triglycerides: "140 mg/dL (Normal)",
      hsCRP: "1.1 mg/L (Low cardiovascular risk)"
    },
    aiSummary: "Cardiovascular biomarkers fall within acceptable physiological limits. Minimal systemic inflammatory markers detected.",
    suggestedRiskScore: 22,
    suggestedRiskLevel: "Low Risk"
  }
];

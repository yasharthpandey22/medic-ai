# Medic AI — Clinical Early Screening & AI Diagnostics Prototype
**Presented by Team Internals**

Medic AI is an interactive clinical prototype designed for early disease risk screening before conditions become critical. It combines multi-symptom checklist scoring, natural language conversational screening, and lab report optical analysis.

---

## 🌟 Key Features (Mapped to Presentation Demo)

### 1. Role-Based Authentication
- **Three Core Roles:**
  - **Patient**: Run screenings, track symptoms, view recommendations & history.
  - **Doctor**: Physician queue, case review, clinical notes, and teleconsult scheduling.
  - **Admin**: System analytics, screening distribution by disease, neural pipeline uptime.
- **Registration & Login**:
  - Sign Up captures: **Gender**, **Age**, **Gmail Address**, **Password**, and **Full Name**.
  - Login with credentials, with 1-click quick demo accounts for all roles.

### 2. Multi-Language Support (3 Languages)
- **English** (EN)
- **Hindi** (हिंदी - HI)
- **Telugu** (తెలుగు - TE)
- Seamless real-time language switcher in the header and side drawer.

### 3. Light & Dark Mode
- System-wide theme toggle supporting both crisp medical light mode and OLED dark mode.

### 4. Extreme Left Sliding Navigation Drawer
- **Home / Dashboard**: Central hub with 3 pathways and 6 disease panels.
- **Assessment History**: Audit log of all completed assessments, including the demo Diabetic check.
- **Healthy Living Tips**: Actionable protocols on prioritizing sleep, balanced hydration, and anti-inflammatory nutrition.
- **Symptoms & Conditions**: Encyclopedic reference covering hallmark symptoms, clinical risk factors, and recommended lab tests.
- **Health Insights**: Epidemiological alerts on prevailing conditions (e.g., urban pre-diabetes).
- **Health Profile**: Confidential patient demographics, blood group, emergency contact.
- **Settings**: System preferences, notifications, and localization.
- **Help & Support**: 24/7 tele-health helpline and emergency protocols.

### 5. Three Screening Pathways
1. **Check Disease through AI**: Guided clinical symptom checklist.
2. **Ask Disease to AI Chatbot**: Conversational AI bot that identifies and fetches symptoms naturally from conversation.
3. **Upload Doctor / Lab Report**: Optical extraction of biomarkers (e.g. Fasting Blood Glucose 148 mg/dL, HbA1c 7.4%) with AI interpretation.

### 6. Six Targeted Screening Conditions
1. **Diabetes Screening** (Type 2, insulin resistance, hyperglycemia)
2. **Heart Disease** (Cardiovascular, hypertension, coronary risk)
3. **Cancer Risk Screening** (Early oncology warning signs & tissue markers)
4. **Neurological Risk** (Stroke alerts, nerve dysfunction, cognitive checks)
5. **Kidney Disease** (Renal filtration, fluid retention, proteinuria)
6. **Respiratory Diseases** (Asthma, chronic bronchitis, COPD)

### 7. Demo Diabetic Screening Flow
- Selected Checkpoints:
  - Frequent urination
  - Unexpected weight loss
  - Constant fatigue
  - Blurred vision
- Review Answers step
- AI Prediction Output:
  - **Risk Level**: **Medium Risk**
  - **Score**: **65 / 100** (animated gauge meter)
  - Key Recommendations:
    1. *Book a consultation with a doctor within 2 to 4 weeks.*
    2. *Start tracking your symptoms daily.*
    3. *Cut back risk factors like smoking, salt, or sugar.*
  - Quick action buttons: **Start a New Check**, **View History**, **Back to Dashboard**, and **Download/Print PDF Summary**.

---

## 🚀 Running the Project

### Development Server:
```bash
cd "C:\Users\v\.gemini\antigravity\scratch\medic-ai"
npm.cmd run dev
```

### Production Build & Preview:
```bash
npm.cmd run build
npm.cmd run preview
```
Or double-click `start-dev.bat`.

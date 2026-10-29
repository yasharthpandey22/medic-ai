import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SidebarDrawer } from './components/SidebarDrawer';
import { DashboardHome } from './components/DashboardHome';
import { SymptomCheckWorkflow } from './components/SymptomCheckWorkflow';
import { AIChatbot } from './components/AIChatbot';
import { ReportUpload } from './components/ReportUpload';
import { AssessmentHistory } from './components/AssessmentHistory';
import { HealthyLivingTips } from './components/HealthyLivingTips';
import { SymptomsEncyclopedia } from './components/SymptomsEncyclopedia';
import { HealthInsights } from './components/HealthInsights';
import { HealthProfile } from './components/HealthProfile';
import { SettingsView } from './components/SettingsView';
import { HelpSupport } from './components/HelpSupport';
import { DoctorPortal } from './components/DoctorPortal';
import { AdminPortal } from './components/AdminPortal';
import { AuthView } from './components/AuthView';

import { translations } from './data/translations';
import { diseaseCategories } from './data/diseases';
import { initialUsers, initialAssessments, initialNotifications } from './data/mockData';

export default function App() {
  // Theme state: dark / light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('medic_ai_theme') || 'dark';
  });

  // Language state: en / hi / te
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('medic_ai_lang') || 'en';
  });

  // Navigation tab state
  const [activeTab, setActiveTab] = useState('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // User state: starts null (unauthenticated) so user sees the login/register screen as demonstrated!
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('medic_ai_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Global search input
  const [searchQuery, setSearchQuery] = useState('');

  // Assessment & Notification data (starts fresh/empty)
  const [assessments, setAssessments] = useState(() => {
    const saved = localStorage.getItem('medic_ai_assessments');
    return saved ? JSON.parse(saved) : initialAssessments;
  });

  const [notifications, setNotifications] = useState(initialNotifications);

  // Selected disease for screening / chat / report
  const [selectedDisease, setSelectedDisease] = useState(diseaseCategories[0]);

  // Sync theme with HTML class
  useEffect(() => {
    localStorage.setItem('medic_ai_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Sync language with localStorage
  useEffect(() => {
    localStorage.setItem('medic_ai_lang', lang);
  }, [lang]);

  // Persist assessments
  useEffect(() => {
    localStorage.setItem('medic_ai_assessments', JSON.stringify(assessments));
  }, [assessments]);

  // Persist user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('medic_ai_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('medic_ai_user');
    }
  }, [currentUser]);

  // Active translations
  const t = translations[lang] || translations.en;

  // Handlers
  const handleSelectDisease = (disease) => {
    setSelectedDisease(disease);
    setActiveTab('screening');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartScreening = (disease) => {
    setSelectedDisease(disease || diseaseCategories[0]);
    setActiveTab('screening');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChat = (disease) => {
    setSelectedDisease(disease || diseaseCategories[0]);
    setActiveTab('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenReportUpload = (disease) => {
    setSelectedDisease(disease || diseaseCategories[0]);
    setActiveTab('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveAssessment = (newAssessment) => {
    setAssessments(prev => [newAssessment, ...prev]);
    const newNotif = {
      id: `notif_${Date.now()}`,
      title: `${newAssessment.diseaseName} Recorded`,
      message: `Risk score ${newAssessment.riskScore}/100 (${newAssessment.riskLevel}) recorded in history.`,
      time: 'Just now',
      read: false,
      type: 'alert'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleNotificationClick = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    setActiveTab('history');
  };

  const handleSelectRole = (roleKey) => {
    if (roleKey === 'doctor') {
      setCurrentUser(prev => ({
        id: `usr_doc_${Date.now()}`,
        name: prev?.name?.startsWith('Dr.') ? prev.name : `Dr. ${prev?.name || 'Physician'}`,
        email: prev?.email || 'doctor@hospital.org',
        role: 'doctor',
        specialty: 'Internal Medicine & Diabetology'
      }));
      setActiveTab('doctor');
    } else if (roleKey === 'admin') {
      setCurrentUser(prev => ({
        id: `usr_adm_${Date.now()}`,
        name: 'System Administrator',
        email: prev?.email || 'admin@medicai.org',
        role: 'admin',
        department: 'Clinical AI Operations'
      }));
      setActiveTab('admin');
    } else {
      setCurrentUser(prev => ({
        id: `usr_pat_${Date.now()}`,
        name: prev?.name?.replace(/^Dr\.\s*/, '') || 'Patient User',
        email: prev?.email || 'patient@email.com',
        role: 'patient',
        gender: prev?.gender || 'Male',
        age: prev?.age || 30
      }));
      setActiveTab('home');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('medic_ai_user');
    localStorage.removeItem('medic_ai_assessments');
    setCurrentUser(null);
    setAssessments([]);
    setActiveTab('home');
  };

  // If user is not authenticated, show the complete Clean Authentication Entry View!
  if (!currentUser) {
    return (
      <AuthView
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'doctor') setActiveTab('doctor');
          else if (user.role === 'admin') setActiveTab('admin');
          else setActiveTab('home');
        }}
        t={t}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
      />
    );
  }

  // Authenticated Portal Interface
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header */}
      <Header
        t={t}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        user={currentUser}
        onOpenAuth={() => setCurrentUser(null)}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
        onSelectRole={handleSelectRole}
      />

      {/* Extreme Left Sliding Navigation Drawer */}
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        onSelectTab={(tabId) => {
          setActiveTab(tabId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        t={t}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        user={currentUser}
      />

      {/* Main Dynamic View Content */}
      <main style={{ flex: 1, paddingBottom: '3rem' }}>
        
        {/* Patient Dashboard Home */}
        {activeTab === 'home' && (
          <DashboardHome
            user={currentUser}
            t={t}
            onSelectDisease={handleSelectDisease}
            onStartScreening={handleStartScreening}
            onOpenChat={handleOpenChat}
            onOpenReportUpload={handleOpenReportUpload}
            searchQuery={searchQuery}
            assessmentsCount={assessments.length}
          />
        )}

        {/* Screening Workflow (Form -> Review -> 65/100 Medium Risk Prediction) */}
        {activeTab === 'screening' && (
          <SymptomCheckWorkflow
            selectedDisease={selectedDisease}
            onBackToDashboard={() => setActiveTab('home')}
            onSaveAssessment={handleSaveAssessment}
            onNavigateToHistory={() => setActiveTab('history')}
            onNavigateToChat={(d) => handleOpenChat(d)}
            onNavigateToReport={(d) => handleOpenReportUpload(d)}
            user={currentUser}
            t={t}
            lang={lang}
          />
        )}

        {/* Conversational AI Chatbot */}
        {activeTab === 'chat' && (
          <AIChatbot
            initialDisease={selectedDisease}
            onBack={() => setActiveTab('home')}
            onSaveAssessment={handleSaveAssessment}
            onViewHistory={() => setActiveTab('history')}
            t={t}
          />
        )}

        {/* Doctor Lab Report Uploader */}
        {activeTab === 'report' && (
          <ReportUpload
            initialDisease={selectedDisease}
            onBack={() => setActiveTab('home')}
            onSaveAssessment={handleSaveAssessment}
            onViewHistory={() => setActiveTab('history')}
            t={t}
          />
        )}

        {/* Assessment History */}
        {activeTab === 'history' && (
          <AssessmentHistory
            assessments={assessments}
            onBack={() => setActiveTab('home')}
            onRecheck={(diseaseId) => {
              const d = diseaseCategories.find(item => item.id === diseaseId) || diseaseCategories[0];
              handleSelectDisease(d);
            }}
            t={t}
          />
        )}

        {/* Healthy Living Tips */}
        {activeTab === 'tips' && (
          <HealthyLivingTips
            onBack={() => setActiveTab('home')}
            t={t}
          />
        )}

        {/* Symptoms and Conditions Encyclopedia */}
        {activeTab === 'symptoms' && (
          <SymptomsEncyclopedia
            onBack={() => setActiveTab('home')}
            onStartCheck={(disease) => handleSelectDisease(disease)}
            t={t}
          />
        )}

        {/* Health Insights */}
        {activeTab === 'insights' && (
          <HealthInsights
            onBack={() => setActiveTab('home')}
            t={t}
          />
        )}

        {/* Health Profile */}
        {activeTab === 'profile' && (
          <HealthProfile
            user={currentUser}
            onUpdateUser={(updated) => setCurrentUser(updated)}
            onBack={() => setActiveTab('home')}
            t={t}
          />
        )}

        {/* Settings View */}
        {activeTab === 'settings' && (
          <SettingsView
            theme={theme}
            setTheme={setTheme}
            lang={lang}
            setLang={setLang}
            onBack={() => setActiveTab('home')}
            t={t}
          />
        )}

        {/* Help & Support */}
        {activeTab === 'support' && (
          <HelpSupport
            onBack={() => setActiveTab('home')}
            t={t}
          />
        )}

        {/* Doctor Clinical Review Portal */}
        {activeTab === 'doctor' && (
          <DoctorPortal
            doctor={currentUser}
            assessments={assessments}
            onBackToPatient={() => handleSelectRole('patient')}
            t={t}
          />
        )}

        {/* Admin Hospital System Portal */}
        {activeTab === 'admin' && (
          <AdminPortal
            onBackToPatient={() => handleSelectRole('patient')}
            t={t}
          />
        )}

      </main>

      {/* App Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-app)',
        backgroundColor: 'var(--bg-card)',
        padding: '1.5rem',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        textAlign: 'center'
      }}>
        <div className="medic-container">
          <p style={{ margin: 0, marginBottom: '0.4rem' }}>
            Medic AI Prototype • Presented by <strong>Team Internals</strong> • Multilingual & Clinical Decision Support
          </p>
          <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-light)' }}>
            {t.disclaimer}
          </p>
        </div>
      </footer>

    </div>
  );
}

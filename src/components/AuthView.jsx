import React, { useState } from 'react';
import { 
  User, Stethoscope, Shield, Mail, Lock, CheckCircle, 
  ArrowRight, Sparkles, Activity, Globe, Sun, Moon 
} from 'lucide-react';

export function AuthView({
  onLoginSuccess,
  t,
  lang,
  setLang,
  theme,
  setTheme
}) {
  // 3 Choices: Patient, Doctor, Admin
  const [role, setRole] = useState('patient'); 
  // 2 Choices: New Account (register) vs Existing User (login) - default to 'register' to match demo!
  const [mode, setMode] = useState('register'); 

  // Clean, empty registration fields matching demo speech
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Status feedback message
  const [successBanner, setSuccessBanner] = useState('');
  const [errorBanner, setErrorBanner] = useState('');

  // Handle Sign Up
  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password || !age || !gender) {
      setErrorBanner("Please fill in gender, age, Gmail address, and password.");
      return;
    }

    const displayName = name.trim() || (role === 'doctor' ? `Dr. ${email.split('@')[0]}` : email.split('@')[0]);

    const newAccount = {
      id: `usr_${Date.now()}`,
      name: displayName,
      email: email.trim(),
      gender: gender,
      age: Number(age),
      role: role,
      bloodGroup: 'O+',
      phone: ''
    };

    // Store in localStorage registered users
    const existingAccounts = JSON.parse(localStorage.getItem('medic_ai_registered_users') || '[]');
    existingAccounts.push({ ...newAccount, password });
    localStorage.setItem('medic_ai_registered_users', JSON.stringify(existingAccounts));

    // Demo feedback: "You can see that my account has been created over here."
    setSuccessBanner("Account has been created successfully! Please log in now with your credentials.");
    setErrorBanner('');
    setLoginEmail(email.trim());
    setLoginPassword('');

    // Switch to Existing User (Login) tab as shown in the demo
    setTimeout(() => {
      setMode('login');
    }, 1200);
  };

  // Handle Log In
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail) {
      setErrorBanner("Please enter your email address.");
      return;
    }

    // Retrieve registered account if present
    const existingAccounts = JSON.parse(localStorage.getItem('medic_ai_registered_users') || '[]');
    const matched = existingAccounts.find(a => a.email.toLowerCase() === loginEmail.trim().toLowerCase());

    const loggedUser = matched ? {
      id: matched.id,
      name: matched.name,
      email: matched.email,
      gender: matched.gender,
      age: matched.age,
      role: matched.role || role,
      bloodGroup: matched.bloodGroup || 'O+',
      phone: matched.phone || ''
    } : {
      id: `usr_${Date.now()}`,
      name: role === 'doctor' ? `Dr. ${loginEmail.split('@')[0]}` : loginEmail.split('@')[0],
      email: loginEmail.trim(),
      gender: gender || 'Male',
      age: Number(age) || 30,
      role: role,
      bloodGroup: 'O+',
      phone: ''
    };

    setSuccessBanner("Authentication successful! Loading dashboard...");
    setTimeout(() => {
      onLoginSuccess(loggedUser);
    }, 600);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--bg-app)',
      color: 'var(--text-main)',
      transition: 'background-color 0.25s ease'
    }}>
      {/* Top minimal header during authentication */}
      <header style={{
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-app)',
        backgroundColor: 'var(--bg-card)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '0.75rem',
            background: 'linear-gradient(135deg, var(--primary) 0%, #0284c7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 10px var(--primary-glow)'
          }}>
            <Activity size={22} className="pulse-indicator" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {t.appName}
              </span>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '0.15rem 0.45rem',
                borderRadius: '9999px',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)'
              }}>
                {t.teamTagline}
              </span>
            </div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>
              Early Disease Risk Screening System
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Language selector */}
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {['en', 'hi', 'te'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="btn btn-secondary btn-sm"
                style={{
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.75rem',
                  backgroundColor: lang === l ? 'var(--primary)' : 'transparent',
                  color: lang === l ? '#ffffff' : 'var(--text-main)',
                  borderColor: lang === l ? 'var(--primary)' : 'var(--border-app)'
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.5rem', borderRadius: '0.5rem' }}
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} style={{ color: '#fbbf24' }} /> : <Moon size={16} style={{ color: '#6366f1' }} />}
          </button>
        </div>
      </header>

      {/* Main Auth Container */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1.5rem'
      }}>
        <div className="card animate-fade-in" style={{
          maxWidth: '520px',
          width: '100%',
          padding: '2.5rem 2.25rem',
          boxShadow: 'var(--shadow-xl)'
        }}>
          
          {/* Header Title */}
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
              Welcome to {t.appName}
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Sign in with your credentials or create a new account to begin your early diagnosis screening.
            </p>
          </div>

          {/* STEP 1: THREE CHOICES - Patient, Doctor, Admin */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Select Portal Role:
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.5rem'
            }}>
              {[
                { id: 'patient', label: t.rolePatient, icon: User },
                { id: 'doctor', label: t.roleDoctor, icon: Stethoscope },
                { id: 'admin', label: t.roleAdmin, icon: Shield }
              ].map(r => {
                const Icon = r.icon;
                const isSelected = role === r.id;

                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setRole(r.id);
                      setErrorBanner('');
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{
                      flexDirection: 'column',
                      padding: '0.75rem 0.5rem',
                      gap: '0.35rem',
                      backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-card-subtle)',
                      color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                      borderColor: isSelected ? 'var(--primary)' : 'var(--border-app)',
                      fontWeight: isSelected ? 700 : 500,
                      boxShadow: isSelected ? '0 0 0 2px var(--primary-glow)' : 'none'
                    }}
                  >
                    <Icon size={20} />
                    <span style={{ fontSize: '0.8rem' }}>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: TWO CHOICES - Existing User vs New Account */}
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--bg-app)',
            padding: '0.3rem',
            borderRadius: '0.625rem',
            marginBottom: '1.5rem',
            border: '1px solid var(--border-app)'
          }}>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorBanner('');
              }}
              style={{
                flex: 1,
                padding: '0.55rem',
                borderRadius: '0.5rem',
                border: 'none',
                backgroundColor: mode === 'register' ? 'var(--bg-card)' : 'transparent',
                color: mode === 'register' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.825rem',
                cursor: 'pointer',
                boxShadow: mode === 'register' ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {t.newUser} ({t.signup})
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorBanner('');
              }}
              style={{
                flex: 1,
                padding: '0.55rem',
                borderRadius: '0.5rem',
                border: 'none',
                backgroundColor: mode === 'login' ? 'var(--bg-card)' : 'transparent',
                color: mode === 'login' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.825rem',
                cursor: 'pointer',
                boxShadow: mode === 'login' ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {t.existingUser} ({t.login})
            </button>
          </div>

          {/* Alert Banners */}
          {successBanner && (
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--success-light)',
              color: 'var(--success)',
              fontSize: '0.825rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem',
              border: '1px solid var(--success)'
            }}>
              <CheckCircle size={18} />
              <span>{successBanner}</span>
            </div>
          )}

          {errorBanner && (
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--danger-light)',
              color: 'var(--danger)',
              fontSize: '0.825rem',
              fontWeight: 700,
              marginBottom: '1.25rem',
              border: '1px solid var(--danger)'
            }}>
              {errorBanner}
            </div>
          )}

          {/* CHOICE A: SIGN UP FORM (Gender, Age, Gmail, Password) */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  {t.fullName}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter full name"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-app)',
                    backgroundColor: 'var(--bg-app)',
                    color: 'var(--text-main)',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    {t.gender} *
                  </label>
                  <select
                    required
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border-app)',
                      backgroundColor: 'var(--bg-app)',
                      color: 'var(--text-main)',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">{t.male}</option>
                    <option value="Female">{t.female}</option>
                    <option value="Other">{t.other}</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    {t.age} *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="120"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    placeholder="Enter age (e.g. 35)"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border-app)',
                      backgroundColor: 'var(--bg-app)',
                      color: 'var(--text-main)',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  {t.email} *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-app)',
                    backgroundColor: 'var(--bg-app)',
                    color: 'var(--text-main)',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  {t.password} *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Create a password"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-app)',
                    backgroundColor: 'var(--bg-app)',
                    color: 'var(--text-main)',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ marginTop: '0.75rem', width: '100%' }}
              >
                <Sparkles size={18} /> {t.signUpAction} as {role === 'doctor' ? t.roleDoctor : role === 'admin' ? t.roleAdmin : t.rolePatient}
              </button>
            </form>
          )}

          {/* CHOICE B: LOGIN FORM (Email, Password) */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  {t.email}
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="Enter your email address"
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.85rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-app)',
                    backgroundColor: 'var(--bg-app)',
                    color: 'var(--text-main)',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  {t.password}
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.85rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-app)',
                    backgroundColor: 'var(--bg-app)',
                    color: 'var(--text-main)',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ marginTop: '0.5rem', width: '100%' }}
              >
                {t.signInAction} as {role === 'doctor' ? t.roleDoctor : role === 'admin' ? t.roleAdmin : t.rolePatient}
              </button>
            </form>
          )}

        </div>
      </div>

      {/* Footer info */}
      <footer style={{
        padding: '1.25rem',
        textAlign: 'center',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        borderTop: '1px solid var(--border-app)',
        backgroundColor: 'var(--bg-card)'
      }}>
        Medic AI Prototype • Team Internals • Early Diagnosis Before Disease Becomes Serious
      </footer>
    </div>
  );
}


import React, { useState } from 'react';
import { 
  User, Stethoscope, Shield, Mail, Lock, CheckCircle, 
  X, ArrowRight, Sparkles 
} from 'lucide-react';

export function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  t
}) {
  const [role, setRole] = useState('patient'); // 'patient' | 'doctor' | 'admin'
  const [mode, setMode] = useState('register'); // 'login' | 'register' (matching demo: "let me register first as a patient")
  
  // Registration fields matching demo
  const [name, setName] = useState('Rahul Verma');
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState('38');
  const [email, setEmail] = useState('rahul.internals@gmail.com');
  const [password, setPassword] = useState('medic123');
  
  const [successBanner, setSuccessBanner] = useState('');

  if (!isOpen) return null;

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessBanner("Account has been created successfully! You can now log in with your Gmail credentials.");
    setTimeout(() => {
      setMode('login');
      setSuccessBanner('');
    }, 1500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const loggedUser = {
      id: `usr_${Date.now()}`,
      name: role === 'doctor' ? 'Dr. Sarah Chen, MD' : role === 'admin' ? 'Admin (Hospital IT)' : name || 'Patient User',
      email: email,
      gender: gender,
      age: Number(age) || 35,
      role: role,
      bloodGroup: 'O+',
      phone: '+91 98765 43210'
    };
    onLoginSuccess(loggedUser);
    onClose();
  };

  const fillQuickDemo = (demoRole) => {
    setRole(demoRole);
    if (demoRole === 'patient') {
      setEmail('rahul.internals@gmail.com');
      setPassword('medic123');
      setName('Rahul Verma');
      setAge('38');
      setGender('Male');
    } else if (demoRole === 'doctor') {
      setEmail('dr.sarah.chen@medicai.org');
      setPassword('doctor123');
      setName('Dr. Sarah Chen, MD');
      setAge('44');
      setGender('Female');
    } else if (demoRole === 'admin') {
      setEmail('admin@medicai.org');
      setPassword('admin123');
      setName('Admin - Internals Team');
      setAge('32');
      setGender('Other');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="card animate-fade-in" style={{
        maxWidth: '490px',
        width: '100%',
        padding: '2rem',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          className="btn btn-secondary btn-sm"
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', padding: '0.4rem' }}
        >
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '3.25rem',
            height: '3.25rem',
            borderRadius: '0.75rem',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem auto'
          }}>
            {role === 'doctor' ? <Stethoscope size={24} /> : role === 'admin' ? <Shield size={24} /> : <User size={24} />}
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Medic AI Authentication</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Select your portal role and sign in or create an account
          </p>
        </div>

        {/* THREE CHOICES: Patient, Doctor, Admin (From demo) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.5rem',
          marginBottom: '1.25rem'
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
                onClick={() => { setRole(r.id); fillQuickDemo(r.id); }}
                className="btn btn-secondary btn-sm"
                style={{
                  flexDirection: 'column',
                  padding: '0.6rem 0.4rem',
                  gap: '0.35rem',
                  backgroundColor: isSelected ? 'var(--primary-light)' : 'transparent',
                  color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                  borderColor: isSelected ? 'var(--primary)' : 'var(--border-app)',
                  fontWeight: isSelected ? 700 : 500
                }}
              >
                <Icon size={18} />
                <span style={{ fontSize: '0.75rem' }}>{r.label}</span>
              </button>
            );
          })}
        </div>

        {/* TWO CHOICES: Existing User (Login) vs New Account (Sign Up) */}
        <div style={{
          display: 'flex',
          backgroundColor: 'var(--bg-app)',
          padding: '0.25rem',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem',
          border: '1px solid var(--border-app)'
        }}>
          <button
            type="button"
            onClick={() => setMode('register')}
            style={{
              flex: 1,
              padding: '0.45rem',
              borderRadius: '0.4rem',
              border: 'none',
              backgroundColor: mode === 'register' ? 'var(--bg-card)' : 'transparent',
              color: mode === 'register' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: mode === 'register' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            {t.newUser} ({t.signup})
          </button>
          <button
            type="button"
            onClick={() => setMode('login')}
            style={{
              flex: 1,
              padding: '0.45rem',
              borderRadius: '0.4rem',
              border: 'none',
              backgroundColor: mode === 'login' ? 'var(--bg-card)' : 'transparent',
              color: mode === 'login' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: mode === 'login' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            {t.existingUser} ({t.login})
          </button>
        </div>

        {/* Success message banner */}
        {successBanner && (
          <div style={{
            padding: '0.75rem',
            borderRadius: '0.5rem',
            backgroundColor: 'var(--success-light)',
            color: 'var(--success)',
            fontSize: '0.8rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            <CheckCircle size={16} />
            {successBanner}
          </div>
        )}

        {/* SIGN UP FORM (Gender, Age, Gmail, Password as shown in demo) */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                {t.fullName}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Rahul Verma"
                style={{
                  width: '100%',
                  padding: '0.6rem 0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border-app)',
                  backgroundColor: 'var(--bg-app)',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  {t.gender}
                </label>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-app)',
                    backgroundColor: 'var(--bg-app)',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem'
                  }}
                >
                  <option value="Male">{t.male}</option>
                  <option value="Female">{t.female}</option>
                  <option value="Other">{t.other}</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  {t.age}
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="120"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  placeholder="38"
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-app)',
                    backgroundColor: 'var(--bg-app)',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                {t.email}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="rahul.internals@gmail.com"
                style={{
                  width: '100%',
                  padding: '0.6rem 0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border-app)',
                  backgroundColor: 'var(--bg-app)',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                {t.password}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.6rem 0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border-app)',
                  backgroundColor: 'var(--bg-app)',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: '0.5rem', width: '100%' }}
            >
              <Sparkles size={16} /> {t.signUpAction}
            </button>
          </form>
        )}

        {/* LOGIN FORM (Email, Password as shown in demo) */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                {t.email}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="patient@demo.com"
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
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                {t.password}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
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
              className="btn btn-primary"
              style={{ marginTop: '0.5rem', width: '100%' }}
            >
              {t.signInAction} as {role === 'doctor' ? t.roleDoctor : role === 'admin' ? t.roleAdmin : t.rolePatient}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}


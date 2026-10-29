import React from 'react';
import { Settings, Globe, Moon, Sun, Bell, Volume2, ArrowLeft, Shield } from 'lucide-react';

export function SettingsView({
  theme,
  setTheme,
  lang,
  setLang,
  onBack,
  t
}) {
  return (
    <div className="medic-container" style={{ padding: '2rem 1.5rem', maxWidth: '780px', margin: '0 auto' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <button onClick={onBack} className="btn btn-secondary btn-sm">
          <ArrowLeft size={16} /> {t.backToDashboard}
        </button>
        <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700 }}>
          System Preferences
        </span>
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.35rem' }}>
          {t.navSettings}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
          Customize your Medic AI interface, language preferences, notification alerts, and theme.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Language Preference */}
          <div style={{
            padding: '1.25rem',
            borderRadius: '0.75rem',
            backgroundColor: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-app)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Globe size={20} style={{ color: 'var(--primary)' }} />
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{t.language} Selection</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Choose between English, Hindi, and Telugu</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {[
                { code: 'en', label: 'English' },
                { code: 'hi', label: 'हिंदी (Hindi)' },
                { code: 'te', label: 'తెలుగు (Telugu)' }
              ].map(item => (
                <button
                  key={item.code}
                  onClick={() => setLang(item.code)}
                  className="btn btn-secondary btn-sm"
                  style={{
                    backgroundColor: lang === item.code ? 'var(--primary)' : 'transparent',
                    color: lang === item.code ? '#ffffff' : 'var(--text-main)',
                    borderColor: lang === item.code ? 'var(--primary)' : 'var(--border-app)'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Mode Preference */}
          <div style={{
            padding: '1.25rem',
            borderRadius: '0.75rem',
            backgroundColor: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-app)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {theme === 'dark' ? <Moon size={20} style={{ color: '#fbbf24' }} /> : <Sun size={20} style={{ color: '#6366f1' }} />}
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>Appearance & Theme</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Switch between high-contrast Light mode and OLED Dark mode</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                onClick={() => setTheme('light')}
                className="btn btn-secondary btn-sm"
                style={{
                  backgroundColor: theme === 'light' ? 'var(--primary)' : 'transparent',
                  color: theme === 'light' ? '#ffffff' : 'var(--text-main)',
                  borderColor: theme === 'light' ? 'var(--primary)' : 'var(--border-app)'
                }}
              >
                <Sun size={14} /> {t.lightMode}
              </button>
              <button
                onClick={() => setTheme('dark')}
                className="btn btn-secondary btn-sm"
                style={{
                  backgroundColor: theme === 'dark' ? 'var(--primary)' : 'transparent',
                  color: theme === 'dark' ? '#ffffff' : 'var(--text-main)',
                  borderColor: theme === 'dark' ? 'var(--primary)' : 'var(--border-app)'
                }}
              >
                <Moon size={14} /> {t.darkMode}
              </button>
            </div>
          </div>

          {/* Clinical Notifications */}
          <div style={{
            padding: '1.25rem',
            borderRadius: '0.75rem',
            backgroundColor: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-app)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Bell size={20} style={{ color: 'var(--primary)' }} />
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>Diagnostic Reminders & Alerts</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Receive notifications for 14-day checkup follow-ups</div>
              </div>
            </div>

            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success)' }}>
              Enabled
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}


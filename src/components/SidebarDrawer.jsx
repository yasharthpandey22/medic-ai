import React from 'react';
import { 
  Home, History, HeartPulse, BookOpen, Sparkles, 
  Settings, UserCheck, HelpCircle, X, ChevronRight, Activity, 
  ShieldCheck, Moon, Sun, Globe
} from 'lucide-react';

export function SidebarDrawer({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  t,
  lang,
  setLang,
  theme,
  setTheme,
  user
}) {
  const menuItems = [
    { id: 'home', label: t.navHome, icon: Home, badge: null },
    { id: 'history', label: t.navHistory, icon: History, badge: 'Live' },
    { id: 'tips', label: t.navTips, icon: HeartPulse, badge: null },
    { id: 'symptoms', label: t.navSymptoms, icon: BookOpen, badge: '6 Conditions' },
    { id: 'insights', label: t.navInsights, icon: Sparkles, badge: 'New' },
    { id: 'profile', label: t.navProfile, icon: UserCheck, badge: null },
    { id: 'settings', label: t.navSettings, icon: Settings, badge: null },
    { id: 'support', label: t.navSupport, icon: HelpCircle, badge: '24/7' }
  ];

  return (
    <>
      {/* Background Dim Backdrop */}
      <div 
        className={`drawer-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sliding Window on the Extreme Left */}
      <aside 
        className={`drawer-panel ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-label="Medic AI Navigation Drawer"
      >
        {/* Drawer Header */}
        <div style={{
          padding: '1.25rem 1.25rem 1rem 1.25rem',
          borderBottom: '1px solid var(--border-app)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '0.625rem',
              background: 'linear-gradient(135deg, var(--primary) 0%, #0284c7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Activity size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>
                {t.appName}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {t.teamTagline} • Navigation
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.45rem', borderRadius: '0.5rem' }}
            title="Close Drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* User Card in Drawer */}
        {user && (
          <div style={{
            margin: '0.875rem 1rem 0.25rem 1rem',
            padding: '0.75rem',
            borderRadius: '0.75rem',
            backgroundColor: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-app)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '9999px',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.9rem'
            }}>
              {user.name.charAt(0)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 600 }}>
                {user.role} mode
              </div>
            </div>
          </div>
        )}

        {/* Navigation List */}
        <nav style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0.875rem 0.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem'
        }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.7rem 0.85rem',
                  borderRadius: '0.625rem',
                  border: 'none',
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-main)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} style={{ color: isActive ? 'var(--primary)' : 'var(--text-muted)' }} />
                  <span>{item.label}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {item.badge && (
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.45rem',
                      borderRadius: '9999px',
                      backgroundColor: isActive ? 'var(--primary)' : 'var(--border-app)',
                      color: isActive ? '#ffffff' : 'var(--text-muted)'
                    }}>
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight size={14} style={{ color: 'var(--text-light)', opacity: isActive ? 1 : 0.5 }} />
                </div>
              </button>
            );
          })}
        </nav>

        {/* Drawer Footer with Quick Toggles */}
        <div style={{
          padding: '1rem',
          borderTop: '1px solid var(--border-app)',
          backgroundColor: 'var(--bg-card-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {/* Language Quick Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Globe size={14} /> Language
            </span>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {['en', 'hi', 'te'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="btn btn-secondary btn-sm"
                  style={{
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.7rem',
                    backgroundColor: lang === l ? 'var(--primary)' : 'transparent',
                    color: lang === l ? '#ffffff' : 'var(--text-main)',
                    borderColor: lang === l ? 'var(--primary)' : 'var(--border-app)'
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Quick Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />} Theme
            </span>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.25rem 0.65rem', fontSize: '0.725rem' }}
            >
              {theme === 'dark' ? t.darkMode : t.lightMode}
            </button>
          </div>

          {/* Secure Medical AI Shield Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-app)',
            fontSize: '0.675rem',
            color: 'var(--text-muted)'
          }}>
            <ShieldCheck size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <span>Medic AI Early Screening Engine v2.4 Active</span>
          </div>
        </div>
      </aside>
    </>
  );
}


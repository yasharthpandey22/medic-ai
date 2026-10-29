import React, { useState } from 'react';
import { 
  Menu, Search, Bell, Sun, Moon, Globe, User, LogOut, 
  Activity, CheckCircle2, AlertCircle, Info, ChevronDown 
} from 'lucide-react';

export function Header({
  t,
  lang,
  setLang,
  theme,
  setTheme,
  onOpenDrawer,
  user,
  onOpenAuth,
  onLogout,
  searchQuery,
  setSearchQuery,
  notifications,
  onNotificationClick,
  onSelectRole
}) {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-app)',
      boxShadow: 'var(--shadow-sm)',
      backdropFilter: 'blur(8px)',
      transition: 'background-color 0.2s ease, border-color 0.2s ease'
    }}>
      <div className="medic-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '4.25rem',
        gap: '1rem'
      }}>
        {/* Left: Hamburger & Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <button
            onClick={onOpenDrawer}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.55rem', borderRadius: '0.5rem' }}
            title="Open Navigation Menu"
            aria-label="Open Navigation Menu"
          >
            <Menu size={20} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }}>
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
                <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
                  {t.appName}
                </span>
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.45rem',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  letterSpacing: '0.04em'
                }}>
                  {t.teamTagline}
                </span>
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1 }}>
                Clinical Early Screening & AI Diagnostics
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div style={{
          flex: 1,
          maxWidth: '480px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '0.875rem',
            color: 'var(--text-light)',
            pointerEvents: 'none'
          }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            style={{
              width: '100%',
              padding: '0.6rem 1rem 0.6rem 2.5rem',
              fontSize: '0.875rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--border-app)',
              backgroundColor: 'var(--bg-app)',
              color: 'var(--text-main)',
              outline: 'none',
              transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary)';
              e.target.style.boxShadow = '0 0 0 3px var(--primary-glow)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-app)';
              e.target.style.boxShadow = 'none';
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '0.75rem',
                background: 'none',
                border: 'none',
                color: 'var(--text-light)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Right: Actions (Language, Theme, Notification, User) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          
          {/* Language Selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="btn btn-secondary btn-sm"
              title="Change Language"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Globe size={16} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                {lang === 'en' ? 'EN' : lang === 'hi' ? 'HI (हि)' : 'TE (తె)'}
              </span>
              <ChevronDown size={14} />
            </button>

            {showLangMenu && (
              <div style={{
                position: 'absolute',
                right: 0,
                marginTop: '0.5rem',
                width: '160px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-app)',
                borderRadius: '0.75rem',
                boxShadow: 'var(--shadow-lg)',
                padding: '0.35rem',
                zIndex: 100
              }}>
                <button
                  onClick={() => { setLang('en'); setShowLangMenu(false); }}
                  className="btn btn-secondary btn-sm"
                  style={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    marginBottom: '0.2rem',
                    backgroundColor: lang === 'en' ? 'var(--primary-light)' : 'transparent',
                    color: lang === 'en' ? 'var(--primary)' : 'var(--text-main)'
                  }}
                >
                  🇬🇧 English
                </button>
                <button
                  onClick={() => { setLang('hi'); setShowLangMenu(false); }}
                  className="btn btn-secondary btn-sm"
                  style={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    marginBottom: '0.2rem',
                    backgroundColor: lang === 'hi' ? 'var(--primary-light)' : 'transparent',
                    color: lang === 'hi' ? 'var(--primary)' : 'var(--text-main)'
                  }}
                >
                  🇮🇳 हिंदी (Hindi)
                </button>
                <button
                  onClick={() => { setLang('te'); setShowLangMenu(false); }}
                  className="btn btn-secondary btn-sm"
                  style={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    backgroundColor: lang === 'te' ? 'var(--primary-light)' : 'transparent',
                    color: lang === 'te' ? 'var(--primary)' : 'var(--text-main)'
                  }}
                >
                  🇮🇳 తెలుగు (Telugu)
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.55rem', borderRadius: '0.5rem' }}
            title={`Switch to ${theme === 'dark' ? t.lightMode : t.darkMode}`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun size={18} style={{ color: '#fbbf24' }} />
            ) : (
              <Moon size={18} style={{ color: '#6366f1' }} />
            )}
          </button>

          {/* Notifications Bell */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.55rem', borderRadius: '0.5rem', position: 'relative' }}
              title={t.notifications}
              aria-label={t.notifications}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--danger)',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div style={{
                position: 'absolute',
                right: 0,
                marginTop: '0.5rem',
                width: '320px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-app)',
                borderRadius: '0.85rem',
                boxShadow: 'var(--shadow-xl)',
                padding: '0.75rem',
                zIndex: 100
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid var(--border-app)',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{t.notifications}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{unreadCount} new</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '280px', overflowY: 'auto' }}>
                  {notifications.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        onNotificationClick(notif.id);
                        setShowNotifMenu(false);
                      }}
                      style={{
                        padding: '0.6rem',
                        borderRadius: '0.5rem',
                        backgroundColor: notif.read ? 'transparent' : 'var(--bg-card-hover)',
                        borderLeft: notif.read ? '3px solid transparent' : '3px solid var(--primary)',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: notif.read ? 600 : 700 }}>{notif.title}</span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-light)' }}>{notif.time}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                        {notif.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Auth Button */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="btn btn-secondary btn-sm"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderRadius: '9999px',
                  padding: '0.35rem 0.75rem 0.35rem 0.4rem'
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.8rem'
                }}>
                  {user.name.charAt(0)}
                </div>
                <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{user.name}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--primary)', textTransform: 'capitalize' }}>
                    {user.role}
                  </div>
                </div>
                <ChevronDown size={14} />
              </button>

              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  marginTop: '0.5rem',
                  width: '230px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-app)',
                  borderRadius: '0.75rem',
                  boxShadow: 'var(--shadow-xl)',
                  padding: '0.5rem',
                  zIndex: 100
                }}>
                  <div style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-app)', marginBottom: '0.4rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                    <div style={{
                      marginTop: '0.35rem',
                      display: 'inline-block',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.5rem',
                      borderRadius: '9999px',
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary)',
                      textTransform: 'uppercase'
                    }}>
                      {user.role} Account
                    </div>
                  </div>

                  {/* Switch Role Quick Actions */}
                  <div style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>
                    {t.switchRole}
                  </div>
                  <button
                    onClick={() => { onSelectRole('patient'); setShowUserMenu(false); }}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '0.2rem', fontSize: '0.75rem' }}
                  >
                    👤 {t.rolePatient} Portal
                  </button>
                  <button
                    onClick={() => { onSelectRole('doctor'); setShowUserMenu(false); }}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '0.2rem', fontSize: '0.75rem' }}
                  >
                    🩺 {t.roleDoctor} Portal
                  </button>
                  <button
                    onClick={() => { onSelectRole('admin'); setShowUserMenu(false); }}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '0.4rem', fontSize: '0.75rem' }}
                  >
                    ⚙️ {t.roleAdmin} Portal
                  </button>

                  <div style={{ borderTop: '1px solid var(--border-app)', paddingTop: '0.35rem' }}>
                    <button
                      onClick={() => { onLogout(); setShowUserMenu(false); }}
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--danger)', fontSize: '0.75rem' }}
                    >
                      <LogOut size={14} /> {t.logout}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn btn-primary btn-sm"
            >
              <User size={16} /> {t.login}
            </button>
          )}

        </div>
      </div>
    </header>
  );
}


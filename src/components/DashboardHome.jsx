import React from 'react';
import { 
  Activity, HeartPulse, ShieldAlert, Brain, Droplets, Wind, 
  CheckSquare, Bot, FileText, ArrowRight, Sparkles, ChevronRight,
  TrendingUp, Calendar, AlertTriangle
} from 'lucide-react';
import { diseaseCategories } from '../data/diseases';

export function DashboardHome({
  user,
  t,
  onSelectDisease,
  onStartScreening,
  onOpenChat,
  onOpenReportUpload,
  searchQuery,
  assessmentsCount
}) {
  const iconMap = {
    Activity: Activity,
    HeartPulse: HeartPulse,
    ShieldAlert: ShieldAlert,
    Brain: Brain,
    Droplets: Droplets,
    Wind: Wind
  };

  // Filter diseases based on search query
  const filteredDiseases = diseaseCategories.filter(d => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const name = (t[d.nameKey] || d.id).toLowerCase();
    const desc = (t[d.descKey] || '').toLowerCase();
    const matchSymptoms = d.symptoms.some(s => s.label.toLowerCase().includes(q));
    return name.includes(q) || desc.includes(q) || matchSymptoms;
  });

  return (
    <div className="medic-container" style={{ padding: '2rem 1.5rem', minHeight: '80vh' }}>
      
      {/* HERO BANNER */}
      <div className="card" style={{
        padding: '2.5rem 2rem',
        marginBottom: '2.5rem',
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-card-subtle) 100%)',
        border: '1px solid var(--border-app)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '240px',
          height: '240px',
          borderRadius: '9999px',
          background: 'radial-gradient(circle, var(--primary-light) 0%, transparent 70%)',
          pointerEvents: 'none',
          opacity: 0.6
        }} />

        <div style={{ maxWidth: '780px', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.75rem',
            borderRadius: '9999px',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            fontSize: '0.75rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            <Sparkles size={14} /> Team Internals • Medic AI Prototype
          </div>

          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            marginBottom: '0.85rem',
            color: 'var(--text-main)'
          }}>
            {t.welcomeUser}, {user ? user.name : 'Patient'}!<br />
            <span style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {t.heroTitle}
            </span>
          </h1>

          <p style={{
            fontSize: '1rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '1.75rem'
          }}>
            {t.heroSubtitle}
          </p>

          {/* Quick Metrics Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-app)'
          }}>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
                {assessmentsCount}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {t.activeChecks}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--success)' }}>
                {t.goodStatus}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {t.healthStatus}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)' }}>
                6 Disease Panels
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Multi-Risk AI Screening
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* THREE MAIN ASSESSMENT SECTIONS (From transcript: Check disease through AI, Ask disease to AI, Upload report) */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.01em' }}>
            Choose Your AI Screening Pathway
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Three flexible options to evaluate your symptoms and clinical documents
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem'
        }}>
          {/* Section 1: Check Disease through AI */}
          <div
            onClick={() => onStartScreening(diseaseCategories[0])}
            className="card"
            style={{
              padding: '1.75rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderTop: '4px solid var(--primary)'
            }}
          >
            <div>
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.75rem',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <CheckSquare size={24} />
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                1. {t.sectionCheckAI}
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                {t.sectionCheckAIDesc}
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--primary)',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}>
              Start Symptom Form <ArrowRight size={16} />
            </div>
          </div>

          {/* Section 2: Ask Disease to AI Chatbot */}
          <div
            onClick={() => onOpenChat(diseaseCategories[0])}
            className="card"
            style={{
              padding: '1.75rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderTop: '4px solid #0284c7'
            }}
          >
            <div>
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.75rem',
                backgroundColor: 'var(--secondary-light)',
                color: 'var(--secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Bot size={24} />
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                2. {t.sectionChatbot}
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                {t.sectionChatbotDesc}
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--secondary)',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}>
              Chat with Medic AI Bot <ArrowRight size={16} />
            </div>
          </div>

          {/* Section 3: Upload Doctor Report */}
          <div
            onClick={() => onOpenReportUpload(diseaseCategories[0])}
            className="card"
            style={{
              padding: '1.75rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderTop: '4px solid #10b981'
            }}
          >
            <div>
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.75rem',
                backgroundColor: 'var(--success-light)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <FileText size={24} />
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                3. {t.sectionUploadReport}
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                {t.sectionUploadReportDesc}
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--success)',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}>
              Upload Doctor Report <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* SIX TARGETED DISEASE CATEGORIES (From transcript: diabetics, heart disease, cancer risk screening, neurological risk, kidney disease, respiratory diseases) */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
              {t.screeningCategories}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Select a clinical category to launch early screening
            </p>
          </div>

          {searchQuery && (
            <span style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>
              Matching "{searchQuery}" ({filteredDiseases.length} found)
            </span>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem'
        }}>
          {filteredDiseases.map((disease) => {
            const Icon = iconMap[disease.icon] || Activity;
            const isDemoDiabetic = disease.id === 'diabetes';

            return (
              <div
                key={disease.id}
                onClick={() => onSelectDisease(disease)}
                className="card"
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                {isDemoDiabetic && (
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    fontSize: '0.675rem',
                    fontWeight: 800,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--warning-light)',
                    color: 'var(--warning)',
                    letterSpacing: '0.04em'
                  }}>
                    Featured Demo
                  </span>
                )}

                <div>
                  <div style={{
                    width: '2.75rem',
                    height: '2.75rem',
                    borderRadius: '0.65rem',
                    backgroundColor: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-app)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <Icon size={22} />
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    {t[disease.nameKey] || disease.id}
                  </h3>

                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {t[disease.descKey] || disease.info.overview}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-app)',
                  fontSize: '0.75rem',
                  color: 'var(--text-light)'
                }}>
                  <span>{disease.symptoms.length} clinical checkpoints</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--primary)', fontWeight: 700 }}>
                    Screen Now <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}


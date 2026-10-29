import React from 'react';
import { Moon, Apple, Droplet, Footprints, Heart, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { healthyLivingTips } from '../data/diseases';

export function HealthyLivingTips({ onBack, t }) {
  const iconMap = {
    Moon: Moon,
    Apple: Apple,
    Droplet: Droplet,
    Footprints: Footprints,
    Heart: Heart
  };

  return (
    <div className="medic-container" style={{ padding: '2rem 1.5rem', minHeight: '80vh' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <button onClick={onBack} className="btn btn-secondary btn-sm">
          <ArrowLeft size={16} /> {t.backToDashboard}
        </button>
        <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700 }}>
          Preventive Lifestyle Medicine
        </span>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: '0.4rem' }}>
          {t.navTips}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '720px' }}>
          Evidence-based daily protocols to mitigate chronic metabolic, cardiovascular, and respiratory risks before clinical manifestation.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '1.5rem'
      }}>
        {healthyLivingTips.map((tip) => {
          const Icon = iconMap[tip.icon] || Heart;

          return (
            <div key={tip.id} className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '0.75rem',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}>
                      {tip.category}
                    </span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{tip.title}</h3>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {tip.summary}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {tip.actionPoints.map((point, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-app)',
                fontSize: '0.75rem',
                color: 'var(--text-light)',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>Daily Practice Recommended</span>
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Active Habit</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}


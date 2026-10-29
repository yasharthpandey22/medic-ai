import React from 'react';
import { Sparkles, ArrowLeft, Calendar, Clock, ChevronRight, Share2, Bookmark } from 'lucide-react';
import { healthInsights } from '../data/diseases';

export function HealthInsights({ onBack, t }) {
  return (
    <div className="medic-container" style={{ padding: '2rem 1.5rem', minHeight: '80vh' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <button onClick={onBack} className="btn btn-secondary btn-sm">
          <ArrowLeft size={16} /> {t.backToDashboard}
        </button>
        <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700 }}>
          Public Health & Disease Epidemiology
        </span>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: '0.4rem' }}>
          {t.navInsights}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '720px' }}>
          Stay informed on prevailing epidemiological trends, preventive care breakthroughs, and lifestyle intervention studies.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {healthInsights.map((insight) => (
          <div
            key={insight.id}
            className="card"
            style={{
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              borderLeft: '4px solid var(--primary)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{
                fontSize: '0.725rem',
                fontWeight: 700,
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                textTransform: 'uppercase'
              }}>
                {insight.tag}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-light)' }}>
                <span><Calendar size={13} style={{ display: 'inline', marginRight: '3px' }} /> {insight.date}</span>
                <span><Clock size={13} style={{ display: 'inline', marginRight: '3px' }} /> {insight.readTime}</span>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                {insight.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {insight.summary}
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--border-app)',
              fontSize: '0.8rem'
            }}>
              <span style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                Read Full Research Summary <ChevronRight size={14} />
              </span>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary btn-sm" style={{ padding: '0.3rem 0.5rem' }}>
                  <Bookmark size={14} />
                </button>
                <button className="btn btn-secondary btn-sm" style={{ padding: '0.3rem 0.5rem' }}>
                  <Share2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}


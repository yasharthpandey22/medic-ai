import React from 'react';
import { Shield, Server, Activity, Users, ArrowLeft, BarChart2, CheckCircle2 } from 'lucide-react';

export function AdminPortal({ onBackToPatient, t }) {
  return (
    <div className="medic-container" style={{ padding: '2rem 1.5rem', minHeight: '80vh' }}>
      
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <button onClick={onBackToPatient} className="btn btn-secondary btn-sm">
          <ArrowLeft size={16} /> Switch back to Patient View
        </button>
        <span className="badge badge-high" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderColor: 'var(--primary)' }}>
          <Shield size={14} /> Hospital Informatics Administration
        </span>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: '0.4rem' }}>
          {t.adminPortalTitle}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Real-time metrics, AI diagnostic model reliability, population screening distribution, and hospital clinical pipelines.
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            {t.totalScreenings}
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.35rem' }}>
            14,820
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.25rem' }}>
            ↑ +18.4% this month
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            {t.aiAccuracy}
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.35rem' }}>
            96.4%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Validated vs. Clinical Lab HbA1c / ECG
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            {t.activeUsers}
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--secondary)', marginTop: '0.35rem' }}>
            8,429
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            142 Hospital Network Clinicians
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Inference Pipeline
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.35rem' }}>
            99.98%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.25rem' }}>
            All 6 Neural Ensembles Operational
          </div>
        </div>
      </div>

      {/* Disease Distribution Progress Bars */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BarChart2 size={18} style={{ color: 'var(--primary)' }} />
          Screening Volume Distribution Across 6 Disease Domains:
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { label: 'Diabetes & Metabolic Risk Screening', pct: 38, color: 'var(--primary)' },
            { label: 'Cardiovascular & Coronary Heart Disease', pct: 24, color: '#f43f5e' },
            { label: 'Respiratory Diseases (COPD / Asthma)', pct: 16, color: '#10b981' },
            { label: 'Neurological & Cerebrovascular Alerts', pct: 10, color: '#6366f1' },
            { label: 'Chronic Kidney & Renal Filtration', pct: 7, color: '#06b6d4' },
            { label: 'Early Cancer Risk Biomarkers', pct: 5, color: '#a855f7' }
          ].map((bar, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.35rem' }}>
                <span style={{ fontWeight: 600 }}>{bar.label}</span>
                <span style={{ fontWeight: 800 }}>{bar.pct}% ({Math.round(14820 * (bar.pct / 100))} patients)</span>
              </div>
              <div style={{ height: '8px', borderRadius: '9999px', backgroundColor: 'var(--border-app)', overflow: 'hidden' }}>
                <div style={{ width: `${bar.pct}%`, height: '100%', backgroundColor: bar.color, borderRadius: '9999px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}


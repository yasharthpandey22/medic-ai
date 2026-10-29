import React, { useState } from 'react';
import { 
  BookOpen, ArrowLeft, Activity, HeartPulse, ShieldAlert, 
  Brain, Droplets, Wind, ChevronRight, Stethoscope, AlertCircle 
} from 'lucide-react';
import { diseaseCategories } from '../data/diseases';

export function SymptomsEncyclopedia({ onBack, onStartCheck, t }) {
  const [selectedDiseaseId, setSelectedDiseaseId] = useState('diabetes');

  const iconMap = {
    Activity: Activity,
    HeartPulse: HeartPulse,
    ShieldAlert: ShieldAlert,
    Brain: Brain,
    Droplets: Droplets,
    Wind: Wind
  };

  const currentDisease = diseaseCategories.find(d => d.id === selectedDiseaseId) || diseaseCategories[0];
  const Icon = iconMap[currentDisease.icon] || Activity;

  return (
    <div className="medic-container" style={{ padding: '2rem 1.5rem', minHeight: '80vh' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <button onClick={onBack} className="btn btn-secondary btn-sm">
          <ArrowLeft size={16} /> {t.backToDashboard}
        </button>
        <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700 }}>
          Clinical Symptoms & Conditions Guide
        </span>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: '0.4rem' }}>
          {t.navSymptoms}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '720px' }}>
          Detailed clinical information, hallmark symptoms, diagnostic tests, and risk factors across all 6 conditions supported by Medic AI.
        </p>
      </div>

      {/* Disease Category Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.75rem',
        marginBottom: '2rem'
      }}>
        {diseaseCategories.map(d => {
          const isSelected = d.id === selectedDiseaseId;
          const TabIcon = iconMap[d.icon] || Activity;

          return (
            <button
              key={d.id}
              onClick={() => setSelectedDiseaseId(d.id)}
              className="btn btn-secondary"
              style={{
                backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg-card)',
                color: isSelected ? '#ffffff' : 'var(--text-main)',
                borderColor: isSelected ? 'var(--primary)' : 'var(--border-app)',
                whiteSpace: 'nowrap',
                fontSize: '0.85rem',
                gap: '0.5rem'
              }}
            >
              <TabIcon size={16} />
              {t[d.nameKey] || d.id}
            </button>
          );
        })}
      </div>

      {/* Main Condition Detail Card */}
      <div className="card" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '0.85rem',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon size={28} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                {t[currentDisease.nameKey] || currentDisease.id}
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                {currentDisease.info.prevalence}
              </p>
            </div>
          </div>

          <button
            onClick={() => onStartCheck(currentDisease)}
            className="btn btn-primary"
          >
            Start Early Screening for this Condition <ChevronRight size={16} />
          </button>
        </div>

        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-main)', marginBottom: '2rem' }}>
          {currentDisease.info.overview}
        </p>

        {/* Hallmark Symptoms */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Stethoscope size={18} style={{ color: 'var(--primary)' }} />
            Common Diagnostic Symptoms & Warning Signals:
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
            {currentDisease.symptoms.map(s => (
              <div
                key={s.id}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-app)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem'
                }}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--primary)'
                }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Two-Column Clinical Grid: Risk Factors & Diagnostic Tests */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-app)' }}>
            <h5 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertCircle size={16} /> Key Clinical Risk Factors
            </h5>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              {currentDisease.info.riskFactors.map((rf, idx) => (
                <li key={idx}>{rf}</li>
              ))}
            </ul>
          </div>

          <div style={{ padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-app)' }}>
            <h5 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BookOpen size={16} /> Recommended Laboratory Confirmatory Tests
            </h5>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              {currentDisease.info.primaryTests.map((pt, idx) => (
                <li key={idx}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}


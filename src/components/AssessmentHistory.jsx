import React, { useState } from 'react';
import { 
  History, Calendar, AlertTriangle, CheckCircle, ChevronRight, 
  FileText, ArrowLeft, Download, RefreshCw, X, Stethoscope 
} from 'lucide-react';

export function AssessmentHistory({
  assessments,
  onBack,
  onRecheck,
  t
}) {
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [filterRisk, setFilterRisk] = useState('ALL');

  const filtered = assessments.filter(a => {
    if (filterRisk === 'ALL') return true;
    return a.riskLevel.toUpperCase().includes(filterRisk);
  });

  return (
    <div className="medic-container" style={{ padding: '2rem 1.5rem', minHeight: '80vh' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <button onClick={onBack} className="btn btn-secondary btn-sm">
          <ArrowLeft size={16} /> {t.backToDashboard}
        </button>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['ALL', 'LOW', 'MEDIUM', 'HIGH'].map(lvl => (
            <button
              key={lvl}
              onClick={() => setFilterRisk(lvl)}
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '0.75rem',
                backgroundColor: filterRisk === lvl ? 'var(--primary-light)' : 'transparent',
                color: filterRisk === lvl ? 'var(--primary)' : 'var(--text-main)',
                borderColor: filterRisk === lvl ? 'var(--primary)' : 'var(--border-app)'
              }}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.35rem' }}>
          {t.navHistory}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Review and audit all your previous AI disease screenings, risk scores, and clinical recommendations.
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <History size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
          <h3>No Assessments Found</h3>
          <p style={{ fontSize: '0.85rem' }}>Start a screening to see your historical health trajectory.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map((item) => {
            const isMedium = item.riskLevel.includes('Medium');
            const isHigh = item.riskLevel.includes('High');
            const badgeClass = isHigh ? 'badge-high' : isMedium ? 'badge-medium' : 'badge-low';

            return (
              <div
                key={item.id}
                onClick={() => setSelectedAssessment(item)}
                className="card"
                style={{
                  padding: '1.25rem 1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  transition: 'transform 0.15s ease, border-color 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  {/* Score Circular Badge */}
                  <div style={{
                    width: '3.25rem',
                    height: '3.25rem',
                    borderRadius: '9999px',
                    backgroundColor: isHigh ? 'var(--danger-light)' : isMedium ? 'var(--warning-light)' : 'var(--success-light)',
                    color: isHigh ? 'var(--danger)' : isMedium ? 'var(--warning)' : 'var(--success)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    lineHeight: 1,
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '1.15rem' }}>{item.riskScore}</span>
                    <span style={{ fontSize: '0.6rem', opacity: 0.8 }}>/100</span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{item.diseaseName}</h3>
                      <span className={`badge ${badgeClass}`}>{item.riskLevel}</span>
                    </div>

                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem' }}>
                      <span><Calendar size={12} style={{ display: 'inline', marginRight: '3px' }} /> {item.date}</span>
                      <span>Method: {item.method}</span>
                      <span>{item.symptoms.length} symptoms logged</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    fontSize: '0.725rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '0.35rem',
                    backgroundColor: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-app)',
                    color: 'var(--text-muted)'
                  }}>
                    {item.status}
                  </span>
                  <ChevronRight size={18} style={{ color: 'var(--text-light)' }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedAssessment && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '1rem'
        }}>
          <div className="card animate-fade-in" style={{
            maxWidth: '650px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem',
            position: 'relative'
          }}>
            <button
              onClick={() => setSelectedAssessment(null)}
              className="btn btn-secondary btn-sm"
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', padding: '0.4rem' }}
            >
              <X size={18} />
            </button>

            <div style={{ marginBottom: '1.5rem' }}>
              <span className={`badge ${selectedAssessment.riskLevel.includes('High') ? 'badge-high' : selectedAssessment.riskLevel.includes('Medium') ? 'badge-medium' : 'badge-low'}`} style={{ marginBottom: '0.5rem' }}>
                {selectedAssessment.riskLevel} ({selectedAssessment.riskScore} / 100)
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                {selectedAssessment.diseaseName} Report
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Assessment ID: {selectedAssessment.id} • Completed {selectedAssessment.date}
              </p>
            </div>

            {/* Symptoms logged */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Reported Checkpoints / Symptoms:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {selectedAssessment.symptoms.map((s, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.5rem',
                      backgroundColor: 'var(--bg-card-subtle)',
                      border: '1px solid var(--border-app)',
                      fontSize: '0.825rem'
                    }}
                  >
                    • {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Clinical Recommendations:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedAssessment.recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '0.5rem',
                      backgroundColor: 'var(--primary-light)',
                      border: '1px solid var(--primary)',
                      fontSize: '0.825rem',
                      color: 'var(--text-main)'
                    }}
                  >
                    {idx + 1}. {rec}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={() => window.print()} className="btn btn-secondary btn-sm">
                <Download size={16} /> Print / Save PDF
              </button>
              <button
                onClick={() => {
                  setSelectedAssessment(null);
                  onRecheck(selectedAssessment.diseaseId);
                }}
                className="btn btn-primary btn-sm"
              >
                <RefreshCw size={16} /> Re-run Assessment
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


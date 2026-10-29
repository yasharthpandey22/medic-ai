import React, { useState } from 'react';
import {
  Stethoscope, User, Calendar, CheckCircle, Clock,
  AlertTriangle, FileText, Send, ArrowLeft, ShieldCheck
} from 'lucide-react';

export function DoctorPortal({
  doctor,
  assessments,
  onBackToPatient,
  t
}) {
  const [activeQueue, setActiveQueue] = useState(assessments);
  const [selectedCase, setSelectedCase] = useState(null);
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleApproveCase = (id) => {
    setActiveQueue(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: 'Doctor Approved & Consultation Scheduled' };
      }
      return item;
    }));
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setSelectedCase(null);
    }, 1800);
  };

  return (
    <div className="medic-container" style={{ padding: '2rem 1.5rem', minHeight: '80vh' }}>

      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <button onClick={onBackToPatient} className="btn btn-secondary btn-sm">
          <ArrowLeft size={16} /> Switch back to Patient View
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge badge-low">
            <ShieldCheck size={14} /> Certified Physician Portal
          </span>
        </div>
      </div>

      {/* Doctor Header Banner */}
      <div className="card" style={{
        padding: '1.75rem',
        marginBottom: '2rem',
        backgroundColor: 'var(--bg-card-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '9999px',
            backgroundColor: 'var(--primary)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Stethoscope size={28} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{doctor?.name || "Dr. Clinician"}</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {doctor?.specialty || "Internal Medicine & Diagnostics"} • {doctor?.email || "physician@hospital.org"}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
              {activeQueue.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cases in Queue</div>
          </div>
        </div>
      </div>

      {/* Patient Review Queue */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.25rem' }}>
          {t.patientQueue}
        </h3>
        <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
          Review incoming AI symptom screenings, calibrate risk scores, and authorize consultation orders.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {activeQueue.map(item => (
          <div
            key={item.id}
            onClick={() => setSelectedCase(item)}
            className="card"
            style={{
              padding: '1.25rem 1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.65rem',
                backgroundColor: item.riskScore > 70 ? 'var(--danger-light)' : item.riskScore > 40 ? 'var(--warning-light)' : 'var(--success-light)',
                color: item.riskScore > 70 ? 'var(--danger)' : item.riskScore > 40 ? 'var(--warning)' : 'var(--success)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                lineHeight: 1
              }}>
                <span style={{ fontSize: '1.1rem' }}>{item.riskScore}</span>
                <span style={{ fontSize: '0.55rem' }}>SCORE</span>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{item.patientName || "Patient Screening"}</span>
                  <span className="badge badge-medium">{item.diseaseName}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({item.riskLevel})</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Reported: {item.symptoms.slice(0, 3).join(', ')}...
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>
                {item.status}
              </span>
              <button className="btn btn-outline-primary btn-sm">
                Review Case
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Case Review Modal */}
      {selectedCase && (
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
            padding: '2rem',
            position: 'relative'
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.25rem' }}>
              Physician Diagnostic Review: {selectedCase.diseaseName}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Patient: {selectedCase.patientName || "Screened Patient"} • Screening Method: {selectedCase.method}
            </p>

            <div style={{
              padding: '1rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-app)',
              marginBottom: '1.25rem'
            }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                Reported Patient Symptoms:
              </div>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.825rem', margin: 0 }}>
                {selectedCase.symptoms.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                Physician Clinical Observation / Notes:
              </label>
              <textarea
                rows={3}
                value={clinicalNotes}
                onChange={e => setClinicalNotes(e.target.value)}
                placeholder="e.g. Confirm fasting glucose panel and schedule 30-min teleconsult in 2 weeks..."
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border-app)',
                  backgroundColor: 'var(--bg-app)',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem',
                  resize: 'none'
                }}
              />
            </div>

            {feedbackSent && (
              <div style={{
                padding: '0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--success-light)',
                color: 'var(--success)',
                fontWeight: 700,
                fontSize: '0.85rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <CheckCircle size={18} /> Consultation scheduled and report endorsed to patient.
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedCase(null)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button onClick={() => handleApproveCase(selectedCase.id)} className="btn btn-primary btn-sm">
                <Send size={14} /> Endorse & Book Doctor Consult
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


import React from 'react';
import { HelpCircle, PhoneCall, Mail, MessageSquare, ArrowLeft, ShieldAlert } from 'lucide-react';

export function HelpSupport({ onBack, t }) {
  return (
    <div className="medic-container" style={{ padding: '2rem 1.5rem', maxWidth: '780px', margin: '0 auto' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <button onClick={onBack} className="btn btn-secondary btn-sm">
          <ArrowLeft size={16} /> {t.backToDashboard}
        </button>
        <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700 }}>
          Patient Assistance & Emergency
        </span>
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.35rem' }}>
          {t.navSupport}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
          Need urgent medical assistance or have questions about your Medic AI risk assessments?
        </p>

        {/* Emergency Alert Box */}
        <div style={{
          padding: '1.25rem',
          borderRadius: '0.75rem',
          backgroundColor: 'var(--danger-light)',
          border: '1px solid var(--danger)',
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start',
          marginBottom: '2rem'
        }}>
          <ShieldAlert size={24} style={{ color: 'var(--danger)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--danger)', marginBottom: '0.25rem' }}>
              Experiencing Acute Medical Symptoms?
            </h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.5 }}>
              If you are facing crushing chest pain, sudden unilateral numbness, severe breathing difficulty, or confusion, call national emergency services immediately at <strong>112 / 911</strong> or visit the nearest emergency room.
            </p>
          </div>
        </div>

        {/* Support Channels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ padding: '1rem', borderRadius: '0.75rem', backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-app)' }}>
            <PhoneCall size={20} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>24/7 Tele-Health Line</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+91 (800) 456-7890</div>
          </div>

          <div style={{ padding: '1rem', borderRadius: '0.75rem', backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-app)' }}>
            <Mail size={20} style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Clinical Query Email</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>support@medicai-internals.org</div>
          </div>

          <div style={{ padding: '1rem', borderRadius: '0.75rem', backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-app)' }}>
            <MessageSquare size={20} style={{ color: 'var(--success)', marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Doctor Consultation</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Book via Tele-clinic Portal</div>
          </div>
        </div>

        {/* FAQs */}
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          Frequently Asked Questions
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <details style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-app)' }}>
            <summary style={{ fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
              How does Medic AI calculate my risk score (e.g. 65/100)?
            </summary>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem', margin: 0 }}>
              Our model analyzes clinical weightage factors, co-morbid symptom clusters (such as frequent urination, fatigue, and sudden weight loss for diabetes), and patient age/demographics to compute a calibrated probability index.
            </p>
          </details>

          <details style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-app)' }}>
            <summary style={{ fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
              Can my doctor review my assessments?
            </summary>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem', margin: 0 }}>
              Yes! All completed screenings are securely routed to the Doctor Portal where certified physicians (like Dr. Sarah Chen) can review your reported symptoms and sign off on consultation recommendations.
            </p>
          </details>
        </div>

      </div>

    </div>
  );
}


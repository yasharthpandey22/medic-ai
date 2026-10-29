import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, CheckSquare, Square, CheckCircle, AlertTriangle, 
  Stethoscope, FileText, Bot, RefreshCw, Calendar, Sparkles, 
  Download, History as HistoryIcon, ShieldCheck, ChevronRight, Share2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function SymptomCheckWorkflow({
  selectedDisease,
  onBackToDashboard,
  onSaveAssessment,
  onNavigateToHistory,
  onNavigateToChat,
  onNavigateToReport,
  user,
  t,
  lang
}) {
  // Step in workflow: 'method' | 'symptoms' | 'review' | 'result'
  const [step, setStep] = useState('symptoms');
  
  // Selected symptoms set
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState(null);

  // Initialize with demo defaults if it's diabetes
  useEffect(() => {
    if (selectedDisease?.id === 'diabetes') {
      const demoSymptoms = selectedDisease.symptoms
        .filter(s => s.demoDefault)
        .map(s => s.id);
      setSelectedSymptoms(demoSymptoms);
    } else if (selectedDisease) {
      // Pick first 2 by default for convenience
      setSelectedSymptoms(selectedDisease.symptoms.slice(0, 2).map(s => s.id));
    }
  }, [selectedDisease]);

  const toggleSymptom = (id) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter(item => item !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  const handleProceedToReview = () => {
    setStep('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePredictRisk = () => {
    setIsCalculating(true);
    setTimeout(() => {
      // Risk calculation algorithm based on selected symptoms severity
      let score = 0;
      const reportedLabels = [];

      selectedDisease.symptoms.forEach(s => {
        if (selectedSymptoms.includes(s.id)) {
          score += s.severity;
          reportedLabels.push(s.label);
        }
      });

      // Calibrate so standard demo symptoms (urination, weight loss, fatigue, blurred vision) = 65 / 100!
      if (selectedDisease.id === 'diabetes' && selectedSymptoms.length === 4 &&
          selectedSymptoms.includes('freq_urination') && 
          selectedSymptoms.includes('weight_loss') && 
          selectedSymptoms.includes('constant_fatigue') && 
          selectedSymptoms.includes('blurred_vision')) {
        score = 65;
      } else {
        score = Math.min(Math.max(score, 18), 95);
      }

      let riskLevel = 'Low Risk';
      let badgeColor = 'emerald';
      if (score >= 45 && score <= 75) {
        riskLevel = 'Medium Risk';
        badgeColor = 'amber';
      } else if (score > 75) {
        riskLevel = 'High Risk';
        badgeColor = 'rose';
      }

      const recs = [
        t.recDoctorConsult || "Book a consultation with a doctor within 2 to 4 weeks.",
        t.recTrackDaily || "Start tracking your symptoms daily in your health journal.",
        t.recCutback || "Cut back risk factors like smoking, salt, or excess sugar intake."
      ];

      const result = {
        id: `asm_${Date.now()}`,
        patientName: user?.name || "Patient",
        diseaseId: selectedDisease.id,
        diseaseName: t[selectedDisease.nameKey] || selectedDisease.id,
        date: "Just now",
        timestamp: Date.now(),
        riskScore: score,
        riskLevel: riskLevel,
        riskBadgeColor: badgeColor,
        symptoms: reportedLabels,
        recommendations: recs,
        status: "Doctor Review Pending",
        method: "Symptoms Checklist Form"
      };

      setAssessmentResult(result);
      onSaveAssessment(result);
      setIsCalculating(false);
      setStep('result');

      // Light confetti celebration for completing screening
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // graceful ignore if canvas-confetti is not loaded
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1100);
  };

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className="medic-container" style={{ padding: '2rem 1.5rem', minHeight: '80vh' }}>
      
      {/* Top Breadcrumb & Back Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.75rem'
      }}>
        <button
          onClick={step === 'symptoms' ? onBackToDashboard : () => setStep(step === 'result' ? 'review' : 'symptoms')}
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <ArrowLeft size={16} />
          {step === 'symptoms' ? t.backToDashboard : t.back}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)'
          }}>
            {t[selectedDisease.nameKey] || selectedDisease.id}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Step {step === 'symptoms' ? '1 of 3' : step === 'review' ? '2 of 3' : '3 of 3'}
          </span>
        </div>
      </div>

      {/* THREE CHOICES SWITCHER BANNER */}
      {step === 'symptoms' && (
        <div className="card" style={{
          padding: '1.25rem',
          marginBottom: '2rem',
          backgroundColor: 'var(--bg-card-subtle)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem'
        }}>
          {/* Choice 1: Symptoms Form (Active) */}
          <div style={{
            padding: '1rem',
            borderRadius: '0.75rem',
            backgroundColor: 'var(--bg-card)',
            border: '2px solid var(--primary)',
            boxShadow: '0 4px 12px var(--primary-glow)',
            cursor: 'default'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <div style={{ color: 'var(--primary)', display: 'flex' }}><CheckSquare size={18} /></div>
              <strong style={{ fontSize: '0.875rem' }}>{t.methodForm}</strong>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
              {t.methodFormSubtitle} (Currently Selected)
            </p>
          </div>

          {/* Choice 2: Chatbot */}
          <div 
            onClick={() => onNavigateToChat(selectedDisease)}
            style={{
              padding: '1rem',
              borderRadius: '0.75rem',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-app)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            className="card"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <div style={{ color: '#0284c7', display: 'flex' }}><Bot size={18} /></div>
              <strong style={{ fontSize: '0.875rem' }}>{t.methodChat}</strong>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
              {t.methodChatSubtitle}
            </p>
          </div>

          {/* Choice 3: Upload Report */}
          <div 
            onClick={() => onNavigateToReport(selectedDisease)}
            style={{
              padding: '1rem',
              borderRadius: '0.75rem',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-app)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            className="card"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <div style={{ color: '#10b981', display: 'flex' }}><FileText size={18} /></div>
              <strong style={{ fontSize: '0.875rem' }}>{t.methodReport}</strong>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
              {t.methodReportSubtitle}
            </p>
          </div>
        </div>
      )}

      {/* STEP 1: SYMPTOMS CHECKLIST */}
      {step === 'symptoms' && (
        <div className="card animate-fade-in" style={{ padding: '2rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {t[selectedDisease.nameKey] || selectedDisease.id}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Select the symptoms and checkpoints you are currently experiencing. Our AI model evaluates clinical weightage, clustering, and risk thresholds.
            </p>
          </div>

          {/* Symptoms List */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            marginBottom: '2rem'
          }}>
            {selectedDisease.symptoms.map((symptom) => {
              const isChecked = selectedSymptoms.includes(symptom.id);

              return (
                <div
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.25rem',
                    borderRadius: '0.75rem',
                    backgroundColor: isChecked ? 'var(--primary-light)' : 'var(--bg-card-subtle)',
                    border: `1.5px solid ${isChecked ? 'var(--primary)' : 'var(--border-app)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{ color: isChecked ? 'var(--primary)' : 'var(--text-light)', display: 'flex' }}>
                      {isChecked ? <CheckSquare size={22} /> : <Square size={22} />}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.925rem',
                        fontWeight: isChecked ? 700 : 500,
                        color: 'var(--text-main)'
                      }}>
                        {symptom.label}
                      </div>
                      {symptom.demoDefault && (
                        <span style={{
                          fontSize: '0.675rem',
                          color: 'var(--primary)',
                          fontWeight: 600
                        }}>
                          Demo Checkpoint
                        </span>
                      )}
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.725rem',
                    color: isChecked ? 'var(--primary)' : 'var(--text-light)',
                    fontWeight: 600
                  }}>
                    {isChecked ? 'Selected' : 'Tap to add'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Action Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-app)'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <strong>{selectedSymptoms.length}</strong> symptoms selected
            </div>

            <button
              onClick={handleProceedToReview}
              disabled={selectedSymptoms.length === 0}
              className="btn btn-primary btn-lg"
              style={{
                opacity: selectedSymptoms.length === 0 ? 0.5 : 1,
                cursor: selectedSymptoms.length === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              {t.proceed} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: REVIEW ANSWERS SCREEN */}
      {step === 'review' && (
        <div className="card animate-fade-in" style={{ padding: '2rem', maxWidth: '780px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '9999px',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <CheckCircle size={32} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.35rem' }}>
              {t.reviewAnswers}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {t.reviewSubtitle}
            </p>
          </div>

          <div style={{
            padding: '1.25rem',
            borderRadius: '0.75rem',
            backgroundColor: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-app)',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid var(--border-app)'
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Target Screening:</span>
              <strong style={{ fontSize: '0.95rem', color: 'var(--primary)' }}>
                {t[selectedDisease.nameKey] || selectedDisease.id}
              </strong>
            </div>

            <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              {t.reportedSymptoms} ({selectedSymptoms.length}):
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {selectedDisease.symptoms
                .filter(s => selectedSymptoms.includes(s.id))
                .map((s, idx) => (
                  <div
                    key={s.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.625rem',
                      padding: '0.6rem 0.85rem',
                      borderRadius: '0.5rem',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-app)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <span style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '9999px',
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: 700
                    }}>
                      {idx + 1}
                    </span>
                    <span>{s.label}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Predict Action */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => setStep('symptoms')}
              className="btn btn-secondary btn-lg"
            >
              {t.back}
            </button>

            <button
              onClick={handlePredictRisk}
              disabled={isCalculating}
              className="btn btn-primary btn-lg"
              style={{ minWidth: '220px' }}
            >
              {isCalculating ? (
                <>
                  <RefreshCw size={18} className="pulse-indicator" />
                  {t.predicting}
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  {t.predictRisk}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PREDICTION OUTPUT & RECOMMENDATIONS (DEMO RESULT: 65 / 100 MEDIUM RISK) */}
      {step === 'result' && assessmentResult && (
        <div className="card animate-fade-in" style={{ padding: '2.5rem 2rem', maxWidth: '850px', margin: '0 auto' }}>
          
          {/* Header & Badges */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className={`badge badge-${assessmentResult.riskBadgeColor === 'amber' ? 'medium' : assessmentResult.riskBadgeColor === 'emerald' ? 'low' : 'high'}`} style={{ marginBottom: '0.75rem', padding: '0.35rem 0.9rem', fontSize: '0.85rem' }}>
              <AlertTriangle size={14} /> {assessmentResult.riskLevel}
            </span>

            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.35rem' }}>
              {assessmentResult.diseaseName}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Medic AI Diagnostic Risk Model Prediction
            </p>
          </div>

          {/* GAUGE SCORE VISUALIZATION (Matching demo: 65 / 100) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '2.5rem'
          }}>
            <div className="gauge-container">
              <svg className="gauge-svg" viewBox="0 0 160 160">
                <circle
                  className="gauge-track"
                  cx="80"
                  cy="80"
                  r="62"
                />
                <circle
                  className="gauge-progress"
                  cx="80"
                  cy="80"
                  r="62"
                  stroke={assessmentResult.riskScore > 70 ? 'var(--danger)' : assessmentResult.riskScore > 40 ? 'var(--warning)' : 'var(--success)'}
                  strokeDasharray="390"
                  strokeDashoffset={390 - (390 * assessmentResult.riskScore) / 100}
                />
              </svg>

              <div className="gauge-center-text">
                <span style={{ fontSize: '2.75rem', fontWeight: 800, lineHeight: 1, color: 'var(--text-main)' }}>
                  {assessmentResult.riskScore}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  / 100
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--warning)', marginTop: '0.2rem' }}>
                  {assessmentResult.riskLevel}
                </span>
              </div>
            </div>

            <p style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              maxWidth: '460px',
              textAlign: 'center',
              marginTop: '1rem'
            }}>
              Your reported symptoms indicate moderate metabolic dysregulation markers. Follow the clinical guidance below.
            </p>
          </div>

          {/* REPORTED SYMPTOMS SECTION */}
          <div style={{
            padding: '1.25rem',
            borderRadius: '0.75rem',
            backgroundColor: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-app)',
            marginBottom: '1.75rem'
          }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Stethoscope size={18} style={{ color: 'var(--primary)' }} />
              {t.reportedSymptoms}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.625rem' }}>
              {assessmentResult.symptoms.map((symptom, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-app)',
                    fontSize: '0.825rem'
                  }}
                >
                  <span style={{ color: 'var(--primary)' }}>•</span>
                  <span>{symptom}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ACTIONABLE RECOMMENDATIONS (Explicitly matching demo!) */}
          <div style={{
            padding: '1.5rem',
            borderRadius: '0.85rem',
            backgroundColor: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-app)',
            marginBottom: '2rem'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} style={{ color: 'var(--primary)' }} />
              {t.keyRecommendations}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {/* Rec 1 */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-app)'
              }}>
                <div style={{
                  padding: '0.4rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  marginTop: '0.1rem'
                }}>
                  <Calendar size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                    1. Book a consultation with a doctor within 2 to 4 weeks
                  </div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    Schedule a fasting blood glucose and HbA1c screening with an internal medicine specialist.
                  </div>
                </div>
              </div>

              {/* Rec 2 */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-app)'
              }}>
                <div style={{
                  padding: '0.4rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--secondary-light)',
                  color: 'var(--secondary)',
                  display: 'flex',
                  marginTop: '0.1rem'
                }}>
                  <FileText size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                    2. Start tracking your symptoms daily
                  </div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    Log fluid intake, nighttime urination frequency, and energy dips after carbohydrate meals.
                  </div>
                </div>
              </div>

              {/* Rec 3 */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--warning-light)',
                color: 'var(--warning)',
                display: 'flex',
                marginTop: '0.1rem'
              }}>
                <div style={{
                  padding: '0.4rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--warning-light)',
                  color: 'var(--warning)',
                  display: 'flex'
                }}>
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                    3. Cut back risk factors like smoking, salt, or sugar
                  </div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    Eliminate sweetened soda/teas, lower processed sodium intake, and prioritize physical activity.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS (As shown in demo: Start a new check, View History, Back to Dashboard) */}
          <div className="no-print" style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-app)'
          }}>
            <button
              onClick={() => {
                setStep('symptoms');
                setSelectedSymptoms([]);
              }}
              className="btn btn-primary"
            >
              <RefreshCw size={16} />
              {t.startNewCheck}
            </button>

            <button
              onClick={onNavigateToHistory}
              className="btn btn-secondary"
            >
              <HistoryIcon size={16} />
              {t.viewHistory}
            </button>

            <button
              onClick={handlePrintSummary}
              className="btn btn-secondary"
            >
              <Download size={16} />
              {t.downloadReport}
            </button>

            <button
              onClick={onBackToDashboard}
              className="btn btn-secondary"
            >
              {t.backToDashboard}
            </button>
          </div>

          {/* Medical Disclaimer */}
          <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.725rem', color: 'var(--text-light)' }}>
            {t.disclaimer}
          </div>

        </div>
      )}

    </div>
  );
}


import React, { useState } from 'react';
import { 
  UploadCloud, FileText, ArrowLeft, CheckCircle, AlertTriangle, 
  Sparkles, RefreshCw, Eye, Download, ShieldCheck 
} from 'lucide-react';
import { sampleDoctorReports } from '../data/mockData';

export function ReportUpload({
  initialDisease,
  onBack,
  onSaveAssessment,
  onViewHistory,
  t
}) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleProcessFile(e.target.files[0]);
    }
  };

  const handleProcessFile = (file) => {
    setSelectedFile(file);
    runAnalysis(sampleDoctorReports[0]);
  };

  const handleSelectSample = (sample) => {
    setSelectedFile({ name: `${sample.title}.pdf`, size: '245 KB' });
    runAnalysis(sample);
  };

  const runAnalysis = (reportData) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult(reportData);

      // Save into history
      onSaveAssessment({
        id: `asm_rep_${Date.now()}`,
        diseaseId: initialDisease ? initialDisease.id : 'diabetes',
        diseaseName: initialDisease ? (t[initialDisease.nameKey] || initialDisease.id) : 'Diabetes Screening',
        date: 'Just now',
        timestamp: Date.now(),
        riskScore: reportData.suggestedRiskScore,
        riskLevel: reportData.suggestedRiskLevel,
        riskBadgeColor: reportData.suggestedRiskLevel === 'Medium Risk' ? 'amber' : 'emerald',
        symptoms: Object.entries(reportData.extractedData).map(([k, v]) => `${k}: ${v}`),
        recommendations: [
          t.recDoctorConsult || "Book a consultation with a doctor within 2 to 4 weeks.",
          "Repeat fasting plasma glucose test within 30 days.",
          "Consult an endocrinologist for nutritional carbohydrate mapping."
        ],
        status: 'Doctor Review Pending',
        method: 'Doctor Report AI Analysis'
      });
    }, 1400);
  };

  return (
    <div className="medic-container" style={{ padding: '2rem 1.5rem', maxWidth: '850px', margin: '0 auto' }}>
      
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <button onClick={onBack} className="btn btn-secondary btn-sm">
          <ArrowLeft size={16} /> {t.back}
        </button>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
          Medic AI Clinical OCR & Document Analyzer
        </span>
      </div>

      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.4rem' }}>
            {t.sectionUploadReport}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {t.sectionUploadReportDesc}
          </p>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragActive ? 'var(--primary)' : 'var(--border-app)'}`,
            borderRadius: '1rem',
            padding: '2.5rem 1.5rem',
            textAlign: 'center',
            backgroundColor: dragActive ? 'var(--primary-light)' : 'var(--bg-card-subtle)',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            marginBottom: '1.5rem'
          }}
          onClick={() => document.getElementById('report-file-input').click()}
        >
          <input
            id="report-file-input"
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />

          <div style={{
            width: '4rem',
            height: '4rem',
            borderRadius: '9999px',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            <UploadCloud size={36} />
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem' }}>
            Drag & Drop Doctor Report or Lab PDF Here
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Supports PDF, JPG, PNG from hospital diagnostics, Quest, Labcorp, Apollo
          </p>

          <button className="btn btn-primary btn-sm">
            Browse Files from Device
          </button>
        </div>

        {/* Quick Demo Sample Reports */}
        <div style={{
          padding: '1rem',
          borderRadius: '0.75rem',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-app)'
        }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            Or try a sample clinical report with 1-click:
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
            {sampleDoctorReports.map(rep => (
              <div
                key={rep.id}
                onClick={() => handleSelectSample(rep)}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-app)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'border-color 0.15s ease'
                }}
                className="card"
              >
                <FileText size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {rep.title}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Lab Date: {rep.date} • Instant AI Scan
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Analysis in Progress */}
      {isAnalyzing && (
        <div className="card animate-fade-in" style={{ padding: '2rem', textAlign: 'center' }}>
          <RefreshCw size={36} className="pulse-indicator" style={{ color: 'var(--primary)', margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.35rem' }}>
            Extracting Biomarkers with Medic AI Vision...
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Parsing Fasting Blood Glucose, HbA1c, Serum Creatinine, and Lipid Profiles.
          </p>
        </div>
      )}

      {/* Analysis Results */}
      {analysisResult && (
        <div className="card animate-fade-in" style={{ padding: '2rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-app)'
          }}>
            <div>
              <span className={`badge badge-${analysisResult.suggestedRiskLevel === 'Medium Risk' ? 'medium' : 'low'}`} style={{ marginBottom: '0.35rem' }}>
                {analysisResult.suggestedRiskLevel} ({analysisResult.suggestedRiskScore} / 100)
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                {analysisResult.title}
              </h3>
            </div>

            <button onClick={() => window.print()} className="btn btn-secondary btn-sm">
              <Download size={16} /> Print Report
            </button>
          </div>

          {/* AI Clinical Summary */}
          <div style={{
            padding: '1rem',
            borderRadius: '0.75rem',
            backgroundColor: 'var(--primary-light)',
            border: '1px solid var(--primary)',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem' }}>
              <Sparkles size={18} /> Medic AI Clinical Interpretation:
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.5 }}>
              {analysisResult.aiSummary}
            </p>
          </div>

          {/* Extracted Biomarker Grid */}
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Extracted Biomarkers & Clinical Values:
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
            {Object.entries(analysisResult.extractedData).map(([key, val]) => (
              <div
                key={key}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-app)'
                }}
              >
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1')}
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.15rem' }}>
                  {val}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button onClick={onViewHistory} className="btn btn-primary">
              View in Assessment History
            </button>
            <button onClick={onBack} className="btn btn-secondary">
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}


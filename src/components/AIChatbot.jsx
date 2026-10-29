import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, User, Sparkles, AlertCircle, ArrowLeft, 
  CheckCircle, RefreshCw, ChevronRight, Activity, Clock, ShieldCheck, FileText 
} from 'lucide-react';

export function AIChatbot({
  initialDisease,
  onBack,
  onSaveAssessment,
  onViewHistory,
  t
}) {
  const [messages, setMessages] = useState([
    {
      id: 'msg_1',
      sender: 'bot',
      text: `Hello! I am your Medic AI Clinical Assistant. I am here to screen your symptoms early before health risks become serious. Which symptoms or changes in your body have you been noticing recently?`,
      time: 'Just now'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [detectedSymptoms, setDetectedSymptoms] = useState([]);
  const [detectedDuration, setDetectedDuration] = useState('');
  const [calculatedScore, setCalculatedScore] = useState(null);
  const [lastBotQuestion, setLastBotQuestion] = useState('symptoms');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, calculatedScore]);

  // Execute risk calculation and save to history
  const performRiskAssessment = (currentSymptoms, durationStr) => {
    let score = 0;
    
    // Evaluate symptoms
    if (currentSymptoms.includes('Constant fatigue')) score += 18;
    if (currentSymptoms.includes('Frequent urination')) score += 20;
    if (currentSymptoms.includes('Unexpected weight loss')) score += 18;
    if (currentSymptoms.includes('Blurred vision')) score += 14;
    if (currentSymptoms.includes('Excessive thirst')) score += 15;
    if (currentSymptoms.includes('Chest discomfort')) score += 25;
    if (currentSymptoms.includes('Shortness of breath')) score += 20;

    // Evaluate duration factor
    if (durationStr && (durationStr.includes('month') || durationStr.includes('year'))) {
      score += 10;
    }

    // Default calibration matching demo
    if (currentSymptoms.length >= 2 || score === 0) {
      score = Math.max(score, 65);
    }
    score = Math.min(Math.max(score, 30), 92);

    let riskLevel = 'Medium Risk';
    let badgeColor = 'amber';
    if (score < 45) {
      riskLevel = 'Low Risk';
      badgeColor = 'emerald';
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
      id: `asm_chat_${Date.now()}`,
      diseaseId: initialDisease ? initialDisease.id : 'diabetes',
      diseaseName: initialDisease ? (t[initialDisease.nameKey] || initialDisease.id) : 'Diabetes Screening',
      date: 'Just now',
      timestamp: Date.now(),
      riskScore: score,
      riskLevel: riskLevel,
      riskBadgeColor: badgeColor,
      symptoms: currentSymptoms.length > 0 ? currentSymptoms : ['General fatigue & malaise'],
      duration: durationStr || 'Not specified',
      recommendations: recs,
      status: 'Doctor Review Pending',
      method: 'AI Chatbot Screening'
    };

    setCalculatedScore(result);
    onSaveAssessment(result);
    return result;
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: userText,
      time: 'Just now'
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = userText.toLowerCase();
      const updatedSymptoms = [...detectedSymptoms];
      let newDuration = detectedDuration;

      // 1. DURATION DETECTION (e.g., "2months", "2 months", "3 weeks", "few days", "since 1 month")
      const durationMatch = userText.match(/(\d+)\s*(months?|weeks?|days?|years?|hrs?|hours?|m|w|d|y|mo)/i) ||
                            userText.match(/(couple of (?:months|weeks|days)|few (?:months|weeks|days)|yesterday|long time|recently)/i);
      if (durationMatch) {
        newDuration = durationMatch[0];
        setDetectedDuration(newDuration);
      }

      // 2. SYMPTOM DETECTION
      if (lower.includes('tired') || lower.includes('fatigue') || lower.includes('exhaust') || lower.includes('weak') || lower.includes('energy')) {
        if (!updatedSymptoms.includes('Constant fatigue')) updatedSymptoms.push('Constant fatigue');
      }
      if (lower.includes('urine') || lower.includes('urination') || lower.includes('pee') || lower.includes('washroom') || lower.includes('toilet')) {
        if (!updatedSymptoms.includes('Frequent urination')) updatedSymptoms.push('Frequent urination');
      }
      if (lower.includes('weight') || lower.includes('thin') || lower.includes('lost weight') || lower.includes('loss')) {
        if (!updatedSymptoms.includes('Unexpected weight loss')) updatedSymptoms.push('Unexpected weight loss');
      }
      if (lower.includes('vision') || lower.includes('blur') || lower.includes('blurry') || lower.includes('eye') || lower.includes('focus')) {
        if (!updatedSymptoms.includes('Blurred vision')) updatedSymptoms.push('Blurred vision');
      }
      if (lower.includes('thirst') || lower.includes('thirsty') || lower.includes('water') || lower.includes('drink')) {
        if (!updatedSymptoms.includes('Excessive thirst')) updatedSymptoms.push('Excessive thirst');
      }
      if (lower.includes('chest') || lower.includes('heart') || lower.includes('palpitation') || lower.includes('tightness')) {
        if (!updatedSymptoms.includes('Chest discomfort')) updatedSymptoms.push('Chest discomfort');
      }

      // 3. AFFIRMATIVE DETECTION ("yes", "yeah", "i do", "both", "yes i pee a lot")
      const isAffirmative = lower.includes('yes') || lower.includes('yeah') || lower.includes('yep') || lower.includes('i do') || lower.includes('both');
      const isNegative = lower.includes('no') || lower.includes('nope') || lower.includes('neither') || lower.includes('that\'s all') || lower.includes('nothing else');
      const wantsAnalysis = lower.includes('predict') || lower.includes('analyze') || lower.includes('score') || lower.includes('calculate') || lower.includes('check');

      if (isAffirmative && lastBotQuestion === 'urination_vision') {
        if (!updatedSymptoms.includes('Frequent urination')) updatedSymptoms.push('Frequent urination');
        if (!updatedSymptoms.includes('Blurred vision')) updatedSymptoms.push('Blurred vision');
      }

      setDetectedSymptoms(updatedSymptoms);

      let botReply = '';

      // CONTEXTUAL RESPONSE LOGIC:
      
      // Case A: User answered with a duration (e.g. "2months", "for 2 months")
      if (durationMatch && !isAffirmative && updatedSymptoms.length > 0 && !wantsAnalysis) {
        botReply = `Noted. Persistent symptoms lasting for ${durationMatch[0]} indicate a chronic pattern rather than temporary fatigue. When fatigue lasts this long, we look closely for metabolic indicators such as Diabetes. Are you also noticing frequent urination (especially waking up to pee at night) or blurred vision?`;
        setLastBotQuestion('urination_vision');
      }
      // Case B: User answered affirmative or provided additional symptoms
      else if (isAffirmative || updatedSymptoms.length >= 2 || wantsAnalysis) {
        const result = performRiskAssessment(updatedSymptoms, newDuration);
        botReply = `Thank you for the detailed information. I have analyzed your reported indicators: ${updatedSymptoms.join(', ')}${newDuration ? ` (persisting for ${newDuration})` : ''}. This cluster suggests moderate metabolic and glycemic stress. I have generated your clinical risk score (${result.riskScore}/100 - ${result.riskLevel}) below.`;
        setLastBotQuestion('completed');
      }
      // Case C: User answered negative ("no", "that's all")
      else if (isNegative && updatedSymptoms.length > 0) {
        const result = performRiskAssessment(updatedSymptoms, newDuration);
        botReply = `Understood, no other symptoms noted. Even with ${updatedSymptoms.join(', ')} alone${newDuration ? ` lasting ${newDuration}` : ''}, an early preventive checkup is advised. Here is your initial clinical risk evaluation:`;
        setLastBotQuestion('completed');
      }
      // Case D: User only provided initial single symptom without duration
      else if (updatedSymptoms.length === 1 && !newDuration) {
        botReply = `I understand you are experiencing ${updatedSymptoms[0]}. How long have you been noticing this? (For example: 2 weeks, 2 months?) And are you also feeling increased thirst or frequent trips to the washroom?`;
        setLastBotQuestion('duration_and_thirst');
      }
      // Case E: General query or fallback
      else {
        botReply = `Thank you. Could you specify which physical symptoms you are noticing (such as fatigue, frequent urination, unexpected weight loss, or blurred vision), and approximately how long you've experienced them?`;
        setLastBotQuestion('symptoms');
      }

      setMessages(prev => [
        ...prev,
        {
          id: `msg_bot_${Date.now()}`,
          sender: 'bot',
          text: botReply,
          time: 'Just now'
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleQuickChip = (text) => {
    setInputText(text);
  };

  return (
    <div className="medic-container" style={{ padding: '2rem 1.5rem', maxWidth: '880px', margin: '0 auto' }}>
      
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <button onClick={onBack} className="btn btn-secondary btn-sm">
          <ArrowLeft size={16} /> {t.back}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '9999px',
            backgroundColor: 'var(--success)'
          }} className="pulse-indicator" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
            Medic AI Interactive Symptom Screener
          </span>
        </div>
      </div>

      {/* Main Chat Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '650px', overflow: 'hidden' }}>
        
        {/* Chat Header */}
        <div style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border-app)',
          backgroundColor: 'var(--bg-card-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bot size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>Medic AI Diagnostic Assistant</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Context-Aware Clinical Symptom & Duration Analyzer</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {detectedDuration && (
              <span style={{
                fontSize: '0.725rem',
                fontWeight: 700,
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                backgroundColor: 'var(--secondary-light)',
                color: 'var(--secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <Clock size={12} /> Duration: {detectedDuration}
              </span>
            )}

            {detectedSymptoms.length > 0 && (
              <span style={{
                fontSize: '0.725rem',
                fontWeight: 700,
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)'
              }}>
                {detectedSymptoms.length} Symptoms Logged
              </span>
            )}
          </div>
        </div>

        {/* Message Thread */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {messages.map((m) => {
            const isBot = m.sender === 'bot';

            return (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  alignSelf: isBot ? 'flex-start' : 'flex-end',
                  maxWidth: '85%',
                  gap: '0.625rem'
                }}
              >
                {isBot && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Bot size={18} />
                  </div>
                )}

                <div>
                  <div style={{
                    padding: '0.85rem 1.15rem',
                    borderRadius: '1rem',
                    backgroundColor: isBot ? 'var(--bg-card-subtle)' : 'var(--primary)',
                    color: isBot ? 'var(--text-main)' : '#ffffff',
                    border: isBot ? '1px solid var(--border-app)' : 'none',
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    borderBottomLeftRadius: isBot ? '0.25rem' : '1rem',
                    borderBottomRightRadius: isBot ? '1rem' : '0.25rem'
                  }}>
                    {m.text}
                  </div>
                  <div style={{
                    fontSize: '0.65rem',
                    color: 'var(--text-light)',
                    marginTop: '0.25rem',
                    textAlign: isBot ? 'left' : 'right'
                  }}>
                    {m.time}
                  </div>
                </div>

                {!isBot && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--bg-card-hover)',
                    color: 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <User size={18} />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              <Bot size={16} /> Medic AI is evaluating clinical context...
            </div>
          )}

          {/* AI Result Card inside chat when risk assessment is calculated */}
          {calculatedScore && (
            <div className="card animate-fade-in" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--bg-card)',
              border: '2px solid var(--warning)',
              marginTop: '0.5rem',
              borderRadius: '0.85rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={20} style={{ color: 'var(--warning)' }} />
                  <strong style={{ fontSize: '1.05rem' }}>Clinical Risk Prediction Generated</strong>
                </div>
                <span className="badge badge-medium" style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}>
                  {calculatedScore.riskLevel} ({calculatedScore.riskScore} / 100)
                </span>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                <strong>Symptoms Profile:</strong> {calculatedScore.symptoms.join(', ')}
                {calculatedScore.duration !== 'Not specified' && (
                  <span style={{ color: 'var(--text-muted)' }}> (Duration: {calculatedScore.duration})</span>
                )}
              </div>

              {/* Actionable Recommendations from demo */}
              <div style={{
                padding: '0.85rem',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-app)',
                marginBottom: '1rem',
                fontSize: '0.825rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--primary)' }}>Key Clinical Recommendations:</div>
                {calculatedScore.recommendations.map((rec, idx) => (
                  <div key={idx}>• {rec}</div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button onClick={onViewHistory} className="btn btn-primary btn-sm">
                  <FileText size={14} /> View in Assessment History
                </button>
                <button onClick={onBack} className="btn btn-secondary btn-sm">
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Dynamic Quick Reply Suggestions */}
        <div style={{
          padding: '0.5rem 1rem',
          borderTop: '1px solid var(--border-app)',
          backgroundColor: 'var(--bg-card-subtle)',
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}>
          {detectedSymptoms.length === 0 ? (
            [
              "I am experiencing constant fatigue",
              "Frequent urination and unexpected weight loss",
              "Blurred vision and excessive thirst",
              "Chest tightness and breathing difficulty"
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickChip(chip)}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.725rem', padding: '0.3rem 0.65rem' }}
              >
                {chip}
              </button>
            ))
          ) : !detectedDuration ? (
            [
              "2 months",
              "3 weeks",
              "A few days",
              "Yes, frequent urination too",
              "Predict My Risk Now"
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickChip(chip)}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.725rem', padding: '0.3rem 0.65rem' }}
              >
                {chip}
              </button>
            ))
          ) : (
            [
              "Yes, frequent urination and blurred vision",
              "No other symptoms",
              "Predict My Risk Now"
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickChip(chip)}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.725rem', padding: '0.3rem 0.65rem' }}
              >
                {chip}
              </button>
            ))
          )}
        </div>

        {/* Input Bar */}
        <div style={{
          padding: '0.85rem 1rem',
          borderTop: '1px solid var(--border-app)',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center'
        }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your reply (e.g. '2 months', 'yes, frequent urination', 'blurred vision')..."
            style={{
              flex: 1,
              padding: '0.7rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--border-app)',
              backgroundColor: 'var(--bg-app)',
              color: 'var(--text-main)',
              fontSize: '0.875rem',
              outline: 'none'
            }}
          />
          
          {detectedSymptoms.length > 0 && !calculatedScore && (
            <button
              onClick={() => performRiskAssessment(detectedSymptoms, detectedDuration)}
              className="btn btn-secondary btn-sm"
              title="Calculate risk score immediately"
              style={{ padding: '0.65rem 0.85rem', color: 'var(--primary)', borderColor: 'var(--primary)', fontWeight: 700 }}
            >
              <Sparkles size={14} /> Predict
            </button>
          )}

          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="btn btn-primary"
            style={{ padding: '0.7rem 1.25rem' }}
          >
            <Send size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

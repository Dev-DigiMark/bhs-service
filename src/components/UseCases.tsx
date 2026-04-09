import { useState, useCallback } from 'react';
import type { UseCase, UseCaseId } from '../types';

const USE_CASES: UseCase[] = [
  {
    id: 'health',
    label: 'Health',
    situation:
      `"I've been to the GP multiple times and feel like I'm not being taken seriously."`,
    clearHelps: [
      'Structure what to say in your next appointment',
      'Suggest key questions to ask your doctor',
      'Help you explain your symptoms more clearly',
      'Draft a formal complaint if needed',
    ],
    suggestion: 'My GP keeps dismissing my symptoms without running any tests',
  },
  {
    id: 'workplace',
    label: 'Workplace',
    situation:
      `"I've raised concerns about racist comments at work, but my manager keeps dismissing or downplaying the situation."`,
    clearHelps: [
      `Break down what's happening and name it clearly`,
      'Explain your rights under the Equality Act 2010',
      'Suggest a structured response for your next conversation',
      'Provide language for a follow-up email or formal complaint',
      'Help you prepare for escalation',
    ],
    suggestion: 'My manager is ignoring my discrimination complaint at work',
  },
];

interface UseCasesProps {
  onSuggestion: (text: string) => void;
}

export function UseCases({ onSuggestion }: UseCasesProps): React.ReactElement {
  const [activeId, setActiveId] = useState<UseCaseId>('health');

  const activeCase = USE_CASES.find((c) => c.id === activeId)!;

  const handleTabClick = useCallback((id: UseCaseId) => {
    setActiveId(id);
  }, []);

  return (
    <section
      id="use-cases"
      aria-label="Use cases"
      style={{ padding: '100px 5%', background: '#fff', borderTop: '1px solid #E5E5E5' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p
            className="reveal"
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#888',
              marginBottom: 20,
            }}
          >
            Use Cases
          </p>
          <h2
            className="serif reveal"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: '#0A0A0A',
              marginBottom: 16,
            }}
          >
            Real situations. Real support.
          </h2>
          <p className="reveal" style={{ color: '#666', maxWidth: 460, margin: '0 auto', fontSize: 16 }}>
            Anywhere you need to explain your situation and be taken seriously.
          </p>
        </div>

        {/* Panel */}
        <div
          className="reveal"
          style={{
            border: '1px solid #E5E5E5',
            borderRadius: 16,
            overflow: 'hidden',
            background: '#fff',
          }}
        >
          {/* Tab bar */}
          <div
            role="tablist"
            aria-label="Use case categories"
            style={{
              display: 'flex',
              borderBottom: '1px solid #E5E5E5',
              background: '#F8F8F8',
            }}
          >
            {USE_CASES.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeId === c.id}
                aria-controls={`panel-${c.id}`}
                onClick={() => handleTabClick(c.id)}
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeId === c.id ? '2px solid #0A0A0A' : '2px solid transparent',
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: 16,
                  fontWeight: activeId === c.id ? 700 : 400,
                  color: activeId === c.id ? '#0A0A0A' : '#888',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Panel content */}
          <div
            id={`panel-${activeCase.id}`}
            role="tabpanel"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 0,
            }}
            className="usecase-panel"
          >
            {/* Situation */}
            <div
              style={{
                padding: '48px 40px',
                borderRight: '1px solid #E5E5E5',
                background: '#fff',
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#888',
                  marginBottom: 20,
                }}
              >
                The situation
              </p>
              <p
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: 20,
                  fontWeight: 600,
                  fontStyle: 'italic',
                  lineHeight: 1.55,
                  color: '#0A0A0A',
                }}
              >
                {activeCase.situation}
              </p>
            </div>

            {/* What CLEAR helps */}
            <div style={{ padding: '48px 40px', background: '#FAFAFA' }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#888',
                  marginBottom: 20,
                }}
              >
                CLEAR would help you
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {activeCase.clearHelps.map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: 20,
                        height: 20,
                        background: '#0A0A0A',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ fontSize: 15, color: '#333', lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSuggestion(activeCase.suggestion)}
                style={{
                  background: '#0A0A0A',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#333')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#0A0A0A')}
              >
                Try this scenario →
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .usecase-panel { grid-template-columns: 1fr !important; }
          .usecase-panel > div:first-child { border-right: none !important; border-bottom: 1px solid #E5E5E5; }
          .usecase-panel > div { padding: 32px 24px !important; }
        }
      `}</style>
    </section>
  );
}

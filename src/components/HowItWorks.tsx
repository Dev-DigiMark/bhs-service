export function HowItWorks(): React.ReactElement {
  const steps = [
    {
      number: '1',
      heading: 'Ask',
      body: `Describe your situation in your own words. No formal language needed — just tell CLEAR what's going on.`,
    },
    {
      number: '2',
      heading: 'Understand',
      body: `Get clear, structured guidance on your rights, the system you're dealing with, and what options you have.`,
    },
    {
      number: '3',
      heading: 'Act',
      body: 'Use suggested language, questions, templates, or next steps — ready to use straight away.',
    },
  ] as const;

  return (
    <section
      id="how-it-works"
      aria-label="How CLEAR works"
      style={{ padding: '100px 5%', background: '#F8F8F8', borderTop: '1px solid #E5E5E5' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <p
            className="reveal"
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#000',
              marginBottom: 20,
            }}
          >
            How It Works
          </p>
          <h2
            className="serif reveal"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: '#0A0A0A',
            }}
          >
            Three steps from question to action.
          </h2>
        </div>

        <div
          className="steps-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
            position: 'relative',
          }}
        >
          {/* Connector line (desktop only) */}
          <div
            aria-hidden="true"
            className="connector-line"
            style={{
              position: 'absolute',
              top: 36,
              left: 'calc(16.67% + 20px)',
              right: 'calc(16.67% + 20px)',
              height: 1,
              background: '#E5E5E5',
              zIndex: 0,
            }}
          />

          {steps.map(({ number, heading, body }, i) => (
            <div
              key={number}
              className="reveal"
              style={{
                padding: '0 40px 0',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
                borderRight: i < steps.length - 1 ? '1px solid #E5E5E5' : 'none',
              }}
            >
              {/* Step circle */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  background: '#0A0A0A',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 28px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontWeight: 700,
                    fontSize: 26,
                    color: '#fff',
                  }}
                >
                  {number}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#0A0A0A',
                  marginBottom: 14,
                }}
              >
                {heading}
              </h3>
              <p style={{ fontSize: 15, color: '#000', lineHeight: 1.75 }}>{body}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal" style={{ textAlign: 'center', marginTop: 64 }}>
          <a
            href="#prototype"
            style={{
              display: 'inline-block',
              background: '#0A0A0A',
              color: '#fff',
              padding: '14px 36px',
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#333')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#0A0A0A')}
          >
            Try it now →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .steps-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .steps-grid > div {
            border-right: none !important;
            border-bottom: 1px solid #E5E5E5;
            padding: 0 20px 48px !important;
          }
          .steps-grid > div:last-child { border-bottom: none !important; }
          .connector-line { display: none !important; }
        }
      `}</style>
    </section>
  );
}

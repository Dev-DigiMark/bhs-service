export function About(): React.ReactElement {
  return (
    <section
      id="about"
      aria-label="About BHSS"
      style={{
        padding: '100px 5%',
        background: '#0A0A0A',
        color: '#fff',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Label */}
        <p
          className="reveal"
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#888',
            marginBottom: 24,
          }}
        >
          About BHSS
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'start',
          }}
          className="about-grid"
        >
          {/* Left: headline */}
          <h2
            className="serif reveal"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              color: '#fff',
            }}
          >
            Built for communities that systems weren't designed for.
          </h2>

          {/* Right: body */}
          <div className="reveal">
            <p style={{ color: '#AAA', lineHeight: 1.85, marginBottom: 20, fontSize: 16 }}>
              BHSS is a community-led organisation focused on addressing health and public service
              inequalities affecting Black communities. We combine research, advocacy, and practical
              tools to help people navigate systems that are often complex, inconsistent, or
              unresponsive.
            </p>
            <p style={{ color: '#AAA', lineHeight: 1.85, fontSize: 16 }}>
              CLEAR is an extension of that mission — a practical, intelligent tool that meets
              people where they are, in the moments when they need support most.
            </p>

            <div
              style={{
                marginTop: 40,
                paddingTop: 40,
                borderTop: '1px solid #222',
                display: 'flex',
                gap: 48,
              }}
            >
              {[
                { stat: 'Community-led', desc: 'Not-for-profit' },
                { stat: 'UK-focused', desc: 'Rights-based guidance' },
                { stat: 'Free', desc: 'No sign-up required' },
              ].map(({ stat, desc }) => (
                <div key={stat}>
                  <div
                    style={{
                      fontFamily: "'Fraunces', Georgia, serif",
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#fff',
                      marginBottom: 4,
                    }}
                  >
                    {stat}
                  </div>
                  <div style={{ fontSize: 13, color: '#666' }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}

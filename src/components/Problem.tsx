export function Problem(): React.ReactElement {
  return (
    <section
      id="why"
      aria-label="Why CLEAR exists"
      style={{ padding: '100px 5%', background: '#fff' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ maxWidth: 560, marginBottom: 64 }}>
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
            Why This Exists
          </p>
          <h2
            className="serif reveal"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: '#0A0A0A',
              marginBottom: 20,
            }}
          >
            Too many people leave feeling unheard.
          </h2>
          <p className="reveal" style={{ fontSize: 16, color: '#666', lineHeight: 1.8 }}>
            Not because they don't know what's wrong — but because they don't always have the
            language, structure, or confidence to explain it clearly in the moment.
          </p>
        </div>

        <div
          className="problem-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {[
            {
              number: '01',
              heading: 'Hidden rules',
              body: 'Systems respond to inside processes and language that most people were never taught.',
            },
            {
              number: '02',
              heading: 'Overlooked and dismissed',
              body: 'Black communities are disproportionately dismissed in healthcare, housing, and the workplace.',
            },
            {
              number: '03',
              heading: 'No roadmap',
              body: `When something goes wrong, most people don't know their rights or where to start.`,
            },
          ].map(({ number, heading, body }) => (
            <div
              key={number}
              className="reveal"
              style={{
                padding: '36px 32px',
                background: '#F8F8F8',
                border: '1px solid #E5E5E5',
                borderRadius: 12,
              }}
            >
              <span
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: 48,
                  fontWeight: 700,
                  color: '#E5E5E5',
                  lineHeight: 1,
                  display: 'block',
                  marginBottom: 20,
                }}
              >
                {number}
              </span>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#0A0A0A',
                  marginBottom: 12,
                  fontFamily: "'Fraunces', Georgia, serif",
                }}
              >
                {heading}
              </h3>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.75 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .problem-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

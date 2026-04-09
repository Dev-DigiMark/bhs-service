export function CoreMessage(): React.ReactElement {
  return (
    <section
      aria-label="Core message"
      style={{
        padding: '100px 5%',
        background: '#F8F8F8',
        textAlign: 'center',
        borderTop: '1px solid #E5E5E5',
        borderBottom: '1px solid #E5E5E5',
      }}
    >
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {/* Pull quote */}
        <blockquote
          className="serif reveal"
          style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
            fontWeight: 700,
            fontStyle: 'italic',
            lineHeight: 1.25,
            color: '#0A0A0A',
            marginBottom: 48,
            position: 'relative',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: -16,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '5rem',
              lineHeight: 1,
              color: '#E5E5E5',
              fontStyle: 'normal',
              userSelect: 'none',
            }}
          >
            "
          </span>
          Nuh let people tek yuh fi eddiat!
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: -32,
              right: '50%',
              transform: 'translateX(50%)',
              fontSize: '5rem',
              lineHeight: 1,
              color: '#E5E5E5',
              fontStyle: 'normal',
              userSelect: 'none',
            }}
          >
            "
          </span>
        </blockquote>

        <p className="reveal" style={{ fontSize: 14, color: '#888', marginBottom: 56 }}>
          Don't let people take you for a fool.
        </p>

        {/* Three pillars */}
        <div
          className="pillars-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
          }}
        >
          {[
            { heading: 'Know your rights.', body: `Understand what you're entitled to, in plain English.` },
            { heading: 'Understand your options.', body: 'See the full picture before you act.' },
            { heading: 'Take action.', body: 'Move from confusion to clear, confident next steps.' },
          ].map(({ heading, body }, i) => (
            <div
              key={heading}
              className="reveal"
              style={{
                background: '#fff',
                border: '1px solid #E5E5E5',
                padding: '32px 28px',
                textAlign: 'left',
                borderRadius: i === 0 ? '10px 0 0 10px' : i === 2 ? '0 10px 10px 0' : 0,
              }}
            >
              <p
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#0A0A0A',
                  marginBottom: 10,
                }}
              >
                {heading}
              </p>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
          .pillars-grid > div { border-radius: 0 !important; }
          .pillars-grid > div:first-child { border-radius: 10px 10px 0 0 !important; }
          .pillars-grid > div:last-child { border-radius: 0 0 10px 10px !important; }
        }
      `}</style>
    </section>
  );
}

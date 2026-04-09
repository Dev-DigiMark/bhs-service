export function Solution(): React.ReactElement {
  const capabilities = [
    {
      icon: '⚖️',
      text: 'Understand your rights in plain language',
    },
    {
      icon: '🔍',
      text: 'Break down complex situations',
    },
    {
      icon: '💬',
      text: 'Find the right words for real conversations',
    },
    {
      icon: '→',
      text: 'Take practical next steps',
    },
  ] as const;

  return (
    <section
      aria-label="What CLEAR does"
      style={{
        padding: '100px 5%',
        background: '#0A0A0A',
        color: '#fff',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}
        className="solution-grid"
      >
        {/* Left */}
        <div>
          <p
            className="reveal"
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#555',
              marginBottom: 24,
            }}
          >
            What CLEAR Does
          </p>
          <h2
            className="serif reveal"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              marginBottom: 24,
              color: '#fff',
            }}
          >
            Designed for everyday moments, not theory.
          </h2>
          <p className="reveal" style={{ fontSize: 16, color: '#777', lineHeight: 1.8 }}>
            CLEAR supports you through real situations — giving you structure, language, and
            confidence when you need it most.
          </p>
        </div>

        {/* Right: capability list */}
        <ul className="reveal" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {capabilities.map(({ icon, text }, i) => (
            <li
              key={text}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: '22px 0',
                borderBottom: i < capabilities.length - 1 ? '1px solid #1E1E1E' : 'none',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 44,
                  height: 44,
                  background: '#161616',
                  border: '1px solid #282828',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {icon}
              </span>
              <span
                style={{
                  fontSize: 16,
                  color: '#CCC',
                  fontWeight: 400,
                  lineHeight: 1.5,
                }}
              >
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .solution-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

export function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      style={{
        padding: '48px 5%',
        background: '#0A0A0A',
        borderTop: '1px solid #1A1A1A',
        color: '#555',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 32,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ marginBottom: 8 }}>
            <span
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 700,
                fontSize: 18,
                color: '#fff',
              }}
            >
              CLEAR
            </span>
            <span style={{ fontSize: 12, color: '#444', marginLeft: 8 }}>by BHSS</span>
          </div>
          <p style={{ fontSize: 13, color: '#444', maxWidth: 220, lineHeight: 1.65 }}>
            An AI Advocacy Companion created for the Caribbean Health Exhibition (CHE).
          </p>
        </div>

        {/* Disclaimer */}
        <div style={{ maxWidth: 480 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#333',
              marginBottom: 10,
            }}
          >
            Important disclaimer
          </p>
          <p style={{ fontSize: 13, color: '#444', lineHeight: 1.75 }}>
            CLEAR is a prototype tool created by BHSS for the Caribbean Health Exhibition.
            This tool is for guidance and self-advocacy only. It does not replace legal or
            medical advice. If your situation is urgent or severe, seek appropriate professional
            support.
          </p>
        </div>

        {/* Copyright */}
        <div style={{ alignSelf: 'flex-end' }}>
          <p style={{ fontSize: 12, color: '#333' }}>© {currentYear} BHSS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

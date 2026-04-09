import { useState, useCallback } from 'react';
import { db, analytics } from '../lib/firebase';
import type { WaitlistEntry } from '../types';

export function Waitlist(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmed = email.trim();
      if (!trimmed) return;

      setStatus('loading');
      try {
        const entry: WaitlistEntry = { email: trimmed, source: 'cta', createdAt: Date.now() };
        await db.waitlist.add(entry);
        analytics.logEvent('waitlist_signup', { source: 'cta' });
        setStatus('done');
      } catch {
        setStatus('error');
      }
    },
    [email],
  );

  return (
    <section
      aria-label="Join the waitlist"
      style={{
        padding: '100px 5%',
        background: '#0A0A0A',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
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
          Early Access
        </p>

        <h2
          className="serif reveal"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '-0.01em',
            marginBottom: 20,
          }}
        >
          Be part of building something that actually helps.
        </h2>

        <p
          className="reveal"
          style={{
            color: '#777',
            fontSize: 16,
            lineHeight: 1.8,
            marginBottom: 44,
          }}
        >
          CLEAR is in early development. Join the waitlist for early access, or reach out if
          you'd like to be involved in shaping what we build next.
        </p>

        {status === 'done' ? (
          <div
            className="reveal"
            style={{
              display: 'inline-block',
              border: '1px solid #333',
              borderRadius: 10,
              padding: '16px 28px',
              fontSize: 15,
              fontWeight: 500,
              color: '#CCC',
            }}
          >
            ✓ You're on the list — we'll be in touch.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="reveal"
            style={{
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: 480,
              margin: '0 auto',
            }}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address for waitlist"
              style={{
                flex: 1,
                minWidth: 220,
                padding: '14px 18px',
                border: '1.5px solid #333',
                borderRadius: 8,
                background: '#111',
                color: '#fff',
                fontSize: 15,
                outline: 'none',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#fff')}
              onBlur={(e) => (e.target.style.borderColor = '#333')}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                background: status === 'loading' ? '#444' : '#fff',
                color: '#0A0A0A',
                padding: '14px 26px',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                border: 'none',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                transition: 'background 0.15s ease',
              }}
            >
              {status === 'loading' ? 'Sending…' : 'Get early access'}
            </button>

            {status === 'error' && (
              <p style={{ width: '100%', textAlign: 'center', fontSize: 13, color: '#f55', marginTop: 4 }}>
                Something went wrong — please try again.
              </p>
            )}
          </form>
        )}

        <p className="reveal" style={{ marginTop: 20, fontSize: 12, color: '#444' }}>
          No spam. No sharing. Just updates on what we're building.
        </p>
      </div>
    </section>
  );
}

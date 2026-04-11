import { useState, useCallback } from 'react';
import { db, analytics } from '../lib/firebase';
import type { WaitlistEntry } from '../types';

interface HeroProps {
  onTryPrototype: () => void;
}

export function Hero({ onTryPrototype }: HeroProps): React.ReactElement {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const handleWaitlist = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmed = email.trim();
      if (!trimmed) return;

      setStatus('loading');
      try {
        const entry: WaitlistEntry = { email: trimmed, source: 'hero', createdAt: Date.now() };
        await db.waitlist.add(entry);
        analytics.logEvent('waitlist_signup', { source: 'hero' });
        setStatus('done');
      } catch {
        setStatus('error');
      }
    },
    [email],
  );

  return (
    <section
      aria-label="Hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 5% 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid decoration */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          zIndex: 0,
        }}
      />
      {/* Fade out the grid at the bottom */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, #fff, transparent)',
          zIndex: 1,
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 780, margin: '0 auto' }}>
        {/* Badge */}
        <div
          className="fade-up"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#0A0A0A',
            color: '#fff',
            borderRadius: 100,
            padding: '6px 16px',
            marginBottom: 36,
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#fff',
              display: 'inline-block',
              opacity: 0.7,
            }}
          />
          An AI Advocacy Companion by BHSS
        </div>

        {/* Heading */}
        <h1
          className="serif fade-up delay-1"
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 5rem)',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            marginBottom: 12,
            color: '#0A0A0A',
          }}
        >
          CLEAR
        </h1>

        <p
          className="serif fade-up delay-2"
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#000',
            marginBottom: 28,
            lineHeight: 1.55,
          }}
        >
          Navigate systems. Find the right words. Take action.
        </p>

        <p
          className="fade-up delay-3"
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            color: '#000',
            maxWidth: 560,
            margin: '0 auto 44px',
            lineHeight: 1.8,
          }}
        >
          CLEAR is a simple prototype designed to explore how AI can support the Black community
          with everyday advocacy — especially in moments where you feel unheard or unsure what
          to say next.
        </p>

        {/* CTAs */}
        <div
          className="fade-up delay-4"
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 48,
          }}
        >
          <button
            onClick={onTryPrototype}
            style={{
              background: '#0A0A0A',
              color: '#fff',
              padding: '14px 34px',
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              border: 'none',
              transition: 'background 0.15s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => ((e.currentTarget).style.background = '#333')}
            onMouseLeave={(e) => ((e.currentTarget).style.background = '#0A0A0A')}
          >
            Try the prototype
          </button>
          <a
            href="#about"
            style={{
              background: 'transparent',
              color: '#0A0A0A',
              padding: '14px 34px',
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 500,
              border: '1.5px solid #CECECE',
              transition: 'border-color 0.15s ease',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#0A0A0A')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#CECECE')}
          >
            Learn more
          </a>
        </div>

        {/* Waitlist form */}
        <div className="fade-up delay-5">
          {status === 'done' ? (
            <p
              style={{
                display: 'inline-block',
                background: '#F3F3F3',
                border: '1px solid #E5E5E5',
                borderRadius: 8,
                padding: '12px 24px',
                fontSize: 14,
                color: '#0A0A0A',
                fontWeight: 500,
              }}
            >
              ✓ You're on the list — we'll be in touch.
            </p>
          ) : (
            <form
              onSubmit={handleWaitlist}
              style={{
                display: 'flex',
                gap: 8,
                justifyContent: 'center',
                flexWrap: 'wrap',
                maxWidth: 460,
                margin: '0 auto',
              }}
            >
              <input
                type="email"
                required
                placeholder="Your email — join the waitlist"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address for waitlist"
                style={{
                  flex: 1,
                  minWidth: 220,
                  padding: '12px 16px',
                  border: '1.5px solid #E5E5E5',
                  borderRadius: 8,
                  fontSize: 14,
                  color: '#0A0A0A',
                  background: '#fff',
                  outline: 'none',
                  transition: 'border-color 0.15s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#0A0A0A')}
                onBlur={(e) => (e.target.style.borderColor = '#E5E5E5')}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  background: status === 'loading' ? '#888' : '#0A0A0A',
                  color: '#fff',
                  padding: '12px 22px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  border: 'none',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  transition: 'background 0.15s ease',
                }}
              >
                {status === 'loading' ? 'Sending…' : 'Join waitlist'}
              </button>
              {status === 'error' && (
                <p style={{ width: '100%', textAlign: 'center', fontSize: 13, color: '#c00', marginTop: 4 }}>
                  Something went wrong — please try again.
                </p>
              )}
            </form>
          )}

          <p style={{ marginTop: 14, fontSize: 12, color: '#000' }}>
            No spam. No sharing. Just updates on what we're building.
          </p>
        </div>
      </div>
    </section>
  );
}

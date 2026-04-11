import {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { sendMessage } from '../lib/chatbot';
import { db, analytics } from '../lib/firebase';
import type { ChatMessage, FeedbackEntry } from '../types';
// ActionDocument
// const SUGGESTIONS = [
//   'My GP keeps dismissing my symptoms without running any tests',
//   'My manager is ignoring my discrimination complaint at work',
//   `My landlord won't fix the heating and it's been weeks`,
//   'My child was unfairly excluded from school',
// ] as const;

// // ── Sub-components ────────────────────────────────────────────────────────────

// function TypingIndicator(): React.ReactElement {
//   return (
//     <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
//       <Avatar />
//       <div
//         style={{
//           background: '#F3F3F3',
//           border: '1px solid #E5E5E5',
//           padding: '12px 16px',
//           borderRadius: '4px 12px 12px 12px',
//           display: 'flex',
//           gap: 5,
//           alignItems: 'center',
//         }}
//       >
//         {[0, 1, 2].map((i) => (
//           <span
//             key={i}
//             style={{
//               width: 6,
//               height: 6,
//               borderRadius: '50%',
//               background: '#999',
//               display: 'inline-block',
//               animation: 'typing-pulse 1.2s ease-in-out infinite',
//               animationDelay: `${i * 0.2}s`,
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// function Avatar(): React.ReactElement {
//   return (
//     <div
//       aria-hidden="true"
//       style={{
//         width: 32,
//         height: 32,
//         background: '#0A0A0A',
//         borderRadius: '50%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexShrink: 0,
//         color: '#fff',
//         fontFamily: "'Fraunces', Georgia, serif",
//         fontWeight: 700,
//         fontSize: 13,
//       }}
//     >
//       C
//     </div>
//   );
// }

// function formatContent(content: string): React.ReactNode {
//   return content.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
//     part.startsWith('**') && part.endsWith('**') ? (
//       <strong key={i}>{part.slice(2, -2)}</strong>
//     ) : (
//       part
//     ),
//   );
// }

// interface DocumentViewerProps {
//   doc: ActionDocument;
// }

// function DocumentViewer({ doc }: DocumentViewerProps): React.ReactElement {
//   const [open, setOpen] = useState(false);

//   return (
//     <div>
//       <button
//         onClick={() => setOpen((v) => !v)}
//         aria-expanded={open}
//         style={{
//           display: 'inline-flex',
//           alignItems: 'center',
//           gap: 6,
//           background: 'transparent',
//           border: '1.5px solid #0A0A0A',
//           color: '#0A0A0A',
//           borderRadius: 6,
//           padding: '7px 14px',
//           fontSize: 12,
//           fontWeight: 600,
//           letterSpacing: '0.02em',
//           cursor: 'pointer',
//           transition: 'all 0.15s ease',
//           marginTop: 8,
//         }}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.background = '#0A0A0A';
//           e.currentTarget.style.color = '#fff';
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.background = 'transparent';
//           e.currentTarget.style.color = '#0A0A0A';
//         }}
//       >
//         {open ? '↑ Hide' : '📄 View'} {doc.type}
//       </button>

//       {open && (
//         <div
//           style={{
//             marginTop: 10,
//             background: '#F8F8F8',
//             border: '1px solid #E5E5E5',
//             borderRadius: 10,
//             padding: '20px 22px',
//             maxWidth: 520,
//           }}
//         >
//           <p
//             style={{
//               fontSize: 11,
//               fontWeight: 700,
//               letterSpacing: '0.08em',
//               textTransform: 'uppercase',
//               color: '#888',
//               marginBottom: 12,
//             }}
//           >
//             {doc.title}
//           </p>
//           <pre
//             style={{
//               fontFamily: "'Inter', system-ui, sans-serif",
//               fontSize: 12,
//               lineHeight: 1.85,
//               color: '#333',
//               whiteSpace: 'pre-wrap',
//               wordBreak: 'break-word',
//               margin: 0,
//             }}
//           >
//             {doc.body}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }

// interface MessageBubbleProps {
//   message: ChatMessage;
// }

// function MessageBubble({ message }: MessageBubbleProps): React.ReactElement {
//   const isUser = message.role === 'user';
//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: isUser ? 'row-reverse' : 'row',
//         gap: 10,
//         alignItems: 'flex-start',
//       }}
//     >
//       {!isUser && <Avatar />}
//       <div style={{ maxWidth: '78%', display: 'flex', flexDirection: 'column', gap: 8 }}>
//         <div
//           style={{
//             background: isUser ? '#0A0A0A' : '#F3F3F3',
//             border: isUser ? 'none' : '1px solid #E5E5E5',
//             color: isUser ? '#fff' : '#0A0A0A',
//             padding: '12px 16px',
//             borderRadius: isUser ? '12px 12px 4px 12px' : '4px 12px 12px 12px',
//             fontSize: 14,
//             lineHeight: 1.75,
//             whiteSpace: 'pre-line',
//           }}
//         >
//           {formatContent(message.content)}
//         </div>
//         {message.actionDocument && <DocumentViewer doc={message.actionDocument} />}
//       </div>
//     </div>
//   );
// }

// ── Prototype handle (for scrolling to it from parent) ────────────────────────

export interface PrototypeHandle {
  scrollIntoView: () => void;
  sendSuggestion: (text: string) => void;
}

// ── Main Prototype component ──────────────────────────────────────────────────

export const Prototype = forwardRef<PrototypeHandle>(function Prototype(_, ref) {
  const sessionId = useRef<string>(Math.random().toString(36).slice(2, 9));
  const sectionRef = useRef<HTMLElement>(null);
  // const messagesEndRef = useRef<HTMLDivElement>(null);
  // const inputRef = useRef<HTMLTextAreaElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'assistant',
      content:
        `Hello. I'm CLEAR — here to help you navigate situations where you feel unheard or unsure what to say next.\n\nDescribe what's going on in your own words, or try one of the examples below.`,
      timestamp: Date.now(),
    },
  ]);
  // const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    scrollIntoView: () => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    },
    sendSuggestion: (text: string) => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      // Small delay to let scroll happen first
      setTimeout(() => handleSend(text), 400);
    },
  }));

  // Scroll to latest message
  useEffect(() => {
    // messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMessage: ChatMessage = {
        id: `u-${Date.now()}`,
        role: 'user',
        content: trimmed,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      // setInput('');
      setLoading(true);

      analytics.logEvent('message_sent', { session: sessionId.current });

      try {
        const response = await sendMessage(trimmed);
        const assistantMessage: ChatMessage = {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: response.content,
          actionDocument: response.actionDocument,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        analytics.logEvent('response_received', { session: sessionId.current });
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: 'assistant',
            content: 'Something went wrong. Please try again.',
            timestamp: Date.now(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  // const handleKeyDown = useCallback(
  //   (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //     if (e.key === 'Enter' && !e.shiftKey) {
  //       e.preventDefault();
  //       handleSend(input);
  //     }
  //   },
  //   [input, handleSend],
  // );

  const handleFeedback = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmed = feedbackText.trim();
      if (!trimmed) return;

      setFeedbackStatus('loading');
      const entry: FeedbackEntry = {
        content: trimmed,
        sessionId: sessionId.current,
        createdAt: Date.now(),
      };
      await db.feedback.add(entry);
      analytics.logEvent('feedback_submitted', { session: sessionId.current });
      setFeedbackStatus('done');
    },
    [feedbackText],
  );

  // const showSuggestions = messages.length <= 1;

  return (
    <section
      id="prototype"
      ref={sectionRef}
      aria-label="CLEAR prototype chat"
      style={{ padding: '100px 5%', background: '#F8F8F8', borderTop: '1px solid #E5E5E5' }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
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
            Prototype
          </p>
          <h2
            className="serif reveal"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: '#0A0A0A',
              marginBottom: 14,
            }}
          >
            Try CLEAR
          </h2>
          <p className="reveal" style={{ color: '#666', maxWidth: 480, margin: '0 auto 32px', fontSize: 15 }}>
            CLEAR is an early-stage prototype currently in design. This version exists to explore
            what's useful, what's missing, and how it should develop.
          </p>
        </div>

        {/* Disclaimer */}
        <div
          role="note"
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
            background: '#fff',
            border: '1px solid #E5E5E5',
            borderRadius: 10,
            padding: '14px 18px',
            marginBottom: 20,
          }}
        >
          <span aria-hidden="true" style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
          <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>
            <strong>Important:</strong> CLEAR provides general guidance and self-advocacy support.
            It does <strong>not</strong> replace legal or medical advice. For urgent or complex
            situations, seek qualified professional support. Relevant services are signposted in
            each response.
          </p>
        </div>

        {/* Chat window */}
     

        {/* Feedback form */}
        <div
          style={{
            marginTop: 40,
            padding: '32px',
            background: '#fff',
            border: '1px solid #E5E5E5',
            borderRadius: 14,
          }}
        >
          <h3
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 18,
              fontWeight: 700,
              color: '#0A0A0A',
              marginBottom: 8,
            }}
          >
            Give feedback
          </h3>
          <p style={{ fontSize: 14, color: '#666', marginBottom: 20, lineHeight: 1.6 }}>
            We are actively seeking feedback from the community. What would you like CLEAR to
            help you with?
          </p>

          {feedbackStatus === 'done' ? (
            <p style={{ fontSize: 14, color: '#0A0A0A', fontWeight: 500 }}>
              ✓ Thank you — your feedback has been received.
            </p>
          ) : (
            <form onSubmit={handleFeedback} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="What would you like CLEAR to help with? What's missing? What would make it more useful?"
                aria-label="Feedback"
                rows={4}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1.5px solid #E5E5E5',
                  borderRadius: 10,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: '#0A0A0A',
                  resize: 'vertical',
                  outline: 'none',
                  transition: 'border-color 0.15s ease',
                  fontFamily: 'inherit',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#0A0A0A')}
                onBlur={(e) => (e.target.style.borderColor = '#E5E5E5')}
              />
              <button
                type="submit"
                disabled={feedbackStatus === 'loading'}
                style={{
                  alignSelf: 'flex-start',
                  background: feedbackStatus === 'loading' ? '#888' : '#0A0A0A',
                  color: '#fff',
                  padding: '11px 28px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  border: 'none',
                  cursor: feedbackStatus === 'loading' ? 'not-allowed' : 'pointer',
                }}
              >
                {feedbackStatus === 'loading' ? 'Sending…' : 'Send feedback'}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes typing-pulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.85); }
          40%            { opacity: 1;   transform: scale(1); }
        }
      `}</style>
    </section>
  );
});






















//  {/* Chat window */}

    // <div
    //       className="reveal"
    //       style={{
    //         background: '#fff',
    //         border: '1px solid #E5E5E5',
    //         borderRadius: 16,
    //         overflow: 'hidden',
    //         boxShadow: '0 4px 40px rgba(0,0,0,0.06)',
    //       }}
    //     >
    //       {/* Chat header bar */}
    //       <div
    //         style={{
    //           padding: '16px 24px',
    //           borderBottom: '1px solid #E5E5E5',
    //           display: 'flex',
    //           alignItems: 'center',
    //           gap: 12,
    //           background: '#0A0A0A',
    //         }}
    //       >
    //         <div
    //           style={{
    //             width: 36,
    //             height: 36,
    //             background: '#1E1E1E',
    //             border: '1px solid #333',
    //             borderRadius: '50%',
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             color: '#fff',
    //             fontFamily: "'Fraunces', Georgia, serif",
    //             fontWeight: 700,
    //             fontSize: 15,
    //           }}
    //         >
    //           C
    //         </div>
    //         <div>
    //           <p style={{ fontWeight: 600, fontSize: 14, color: '#fff', lineHeight: 1 }}>
    //             CLEAR
    //           </p>
    //           <p style={{ fontSize: 11, color: '#666', marginTop: 3 }}>
    //             AI Advocacy Companion · UK-focused · Rights-based
    //           </p>
    //         </div>
    //       </div>

    //       {/* Messages */}
    //       <div
    //         role="log"
    //         aria-label="Conversation"
    //         aria-live="polite"
    //         style={{
    //           height: 440,
    //           overflowY: 'auto',
    //           padding: '24px',
    //           display: 'flex',
    //           flexDirection: 'column',
    //           gap: 18,
    //         }}
    //       >
    //         {messages.map((msg) => (
    //           <MessageBubble key={msg.id} message={msg} />
    //         ))}

    //         {loading && <TypingIndicator />}

    //         <div ref={messagesEndRef} />
    //       </div>

    //       {/* Suggestions */}
    //       {showSuggestions && !loading && (
    //         <div
    //           style={{
    //             padding: '0 24px 16px',
    //             display: 'flex',
    //             flexWrap: 'wrap',
    //             gap: 8,
    //           }}
    //         >
    //           {SUGGESTIONS.map((s) => (
    //             <button
    //               key={s}
    //               onClick={() => handleSend(s)}
    //               style={{
    //                 background: '#F3F3F3',
    //                 border: '1px solid #E5E5E5',
    //                 borderRadius: 100,
    //                 padding: '7px 14px',
    //                 fontSize: 12,
    //                 color: '#555',
    //                 fontWeight: 500,
    //                 cursor: 'pointer',
    //                 transition: 'all 0.15s ease',
    //               }}
    //               onMouseEnter={(e) => {
    //                 e.currentTarget.style.background = '#0A0A0A';
    //                 e.currentTarget.style.color = '#fff';
    //                 e.currentTarget.style.borderColor = '#0A0A0A';
    //               }}
    //               onMouseLeave={(e) => {
    //                 e.currentTarget.style.background = '#F3F3F3';
    //                 e.currentTarget.style.color = '#555';
    //                 e.currentTarget.style.borderColor = '#E5E5E5';
    //               }}
    //             >
    //               {s}
    //             </button>
    //           ))}
    //         </div>
    //       )}

    //       {/* Input area */}
    //       <div
    //         style={{
    //           borderTop: '1px solid #E5E5E5',
    //           padding: '12px 16px',
    //           display: 'flex',
    //           gap: 10,
    //           alignItems: 'flex-end',
    //           background: '#FAFAFA',
    //         }}
    //       >
    //         <textarea
    //           ref={inputRef}
    //           value={input}
    //           onChange={(e) => setInput(e.target.value)}
    //           onKeyDown={handleKeyDown}
    //           placeholder="Describe your situation…"
    //           aria-label="Message input"
    //           rows={2}
    //           style={{
    //             flex: 1,
    //             padding: '11px 14px',
    //             border: '1.5px solid #E5E5E5',
    //             borderRadius: 10,
    //             background: '#fff',
    //             resize: 'none',
    //             fontSize: 14,
    //             lineHeight: 1.55,
    //             color: '#0A0A0A',
    //             outline: 'none',
    //             transition: 'border-color 0.15s ease',
    //           }}
    //           onFocus={(e) => (e.target.style.borderColor = '#0A0A0A')}
    //           onBlur={(e) => (e.target.style.borderColor = '#E5E5E5')}
    //         />
    //         <button
    //           onClick={() => handleSend(input)}
    //           disabled={loading || !input.trim()}
    //           aria-label="Send message"
    //           style={{
    //             background: input.trim() && !loading ? '#0A0A0A' : '#E5E5E5',
    //             color: input.trim() && !loading ? '#fff' : '#AAA',
    //             border: 'none',
    //             borderRadius: 10,
    //             padding: '11px 22px',
    //             fontSize: 14,
    //             fontWeight: 600,
    //             height: 48,
    //             cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
    //             transition: 'all 0.15s ease',
    //           }}
    //         >
    //           Send
    //         </button>
    //       </div>
    //     </div>

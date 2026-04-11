import {
    useState,
    useRef,
    useCallback,
    forwardRef,
    useImperativeHandle,
    useEffect,
} from 'react';
import { sendMessage } from '../lib/chatbot';
import { analytics } from '../lib/firebase';
import type { ChatMessage, ActionDocument } from '../types';

const SUGGESTIONS = [
    'My GP keeps dismissing my symptoms without running any tests',
    'My manager is ignoring my discrimination complaint at work',
    `My landlord won't fix the heating and it's been weeks`,
    'My child was unfairly excluded from school',
] as const;

// ── Sub-components ────────────────────────────────────────────────────────────

function TypingIndicator(): React.ReactElement {
    return (
        <div className="flex gap-2.5 items-center">
            <Avatar />
            <div className="bg-[#F3F3F3] border border-[#E5E5E5] px-4 py-3 rounded-tr-xl rounded-br-xl rounded-bl-xl rounded-tl-sm flex gap-[5px] items-center">
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#999] inline-block animate-[typing-pulse_1.2s_ease-in-out_infinite]"
                        style={{
                            animationDelay: `${i * 0.2}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

function Avatar(): React.ReactElement {
    return (
        <div
            aria-hidden="true"
            className="w-8 h-8 bg-[#0A0A0A] rounded-full flex items-center justify-center shrink-0 text-white font-['Fraunces',_Georgia,_serif] font-bold text-[13px]"
        >
            C
        </div>
    );
}

function formatContent(content: string): React.ReactNode {
    return content.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
            <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
            part
        ),
    );
}

interface DocumentViewerProps {
    doc: ActionDocument;
}

function DocumentViewer({ doc }: DocumentViewerProps): React.ReactElement {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="inline-flex items-center gap-1.5 bg-transparent border-[1.5px] border-[#0A0A0A] text-[#0A0A0A] rounded-md px-3.5 py-[7px] text-[12px] font-semibold tracking-[0.02em] cursor-pointer transition-all duration-150 mt-2 hover:bg-[#0A0A0A] hover:text-white"
            >
                {open ? '↑ Hide' : '📄 View'} {doc.type}
            </button>

            {open && (
                <div className="mt-2.5 bg-[#F8F8F8] border border-[#E5E5E5] rounded-[10px] px-[22px] py-5 max-w-[520px]">
                    <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#888] mb-3">
                        {doc.title}
                    </p>
                    <pre className="font-['Inter',_system-ui,_sans-serif] text-[12px] leading-[1.85] text-[#333] whitespace-pre-wrap break-words m-0">
                        {doc.body}
                    </pre>
                </div>
            )}
        </div>
    );
}

interface MessageBubbleProps {
    message: ChatMessage;
}

function MessageBubble({ message }: MessageBubbleProps): React.ReactElement {
    const isUser = message.role === 'user';
    return (
        <div className={`flex gap-2.5 items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            {!isUser && <Avatar />}
            <div className="max-w-[78%] flex flex-col gap-2">
                <div
                    className={`px-4 py-3 text-sm leading-[1.75] whitespace-pre-line ${
                        isUser
                            ? 'bg-[#0A0A0A] text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-[4px]'
                            : 'bg-[#F3F3F3] text-[#0A0A0A] border border-[#E5E5E5] rounded-tl-[4px] rounded-tr-xl rounded-br-xl rounded-bl-xl'
                    }`}
                >
                    {formatContent(message.content)}
                </div>
                {message.actionDocument && <DocumentViewer doc={message.actionDocument} />}
            </div>
        </div>
    );
}

// ── Prototype handle (for scrolling to it from parent) ────────────────────────

export interface PrototypeHandle {
    scrollIntoView: () => void;
    sendSuggestion: (text: string) => void;
    // callBack:(val:any)=>void
}

// ── Main Prototype component ──────────────────────────────────────────────────

const ChatWindow = forwardRef<PrototypeHandle>(function Prototype(_, ref) {
    const sessionId = useRef<string>(Math.random().toString(36).slice(2, 9));
    const sectionRef = useRef<HTMLElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'init',
            role: 'assistant',
            content:
                `Hello. I'm CLEAR — here to help you navigate situations where you feel unheard or unsure what to say next.\n\nDescribe what's going on in your own words, or try one of the examples below.`,
            timestamp: Date.now(),
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    // Auto-expand textarea height
    useEffect(() => {
        const textarea = inputRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const newHeight = Math.min(textarea.scrollHeight, 200);
            textarea.style.height = `${newHeight}px`;
            textarea.style.overflowY = textarea.scrollHeight > 200 ? 'auto' : 'hidden';
        }
    }, [input]);

    // Scroll to bottom when messages or loading state changes
    useEffect(() => {
        const timer = setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 100);
        return () => clearTimeout(timer);
    }, [messages, loading]);

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
            setInput('');
            
            // Reset height after sending
            if (inputRef.current) {
                inputRef.current.style.height = 'auto';
            }

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

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(input);
            }
        },
        [input, handleSend],
    );



    const showSuggestions = messages.length <= 1;

    return (
        <div className="w-full bg-gray-100 h-full flex flex-col rounded-2xl">

            {/* Chat header bar */}
            <div className='text-xs bg-gray-300 text-gray-800 p-4 shrink-0 rounded-t-2xl'>
                <strong>Important:</strong> CLEAR provides general guidance and self-advocacy support.
                It does <strong>not</strong> replace legal or medical advice. For urgent or complex
                situations, seek qualified professional support. Relevant services are signposted in
                each response.
            </div>
            {/* Scrollable Area */}
            <div className="flex-1 overflow-y-auto min-h-0">
                {/* Messages */}
                <div
                    role="log"
                    aria-label="Conversation"
                    aria-live="polite"
                    className="p-6 flex flex-col gap-[18px]">
                    {messages.map((msg) => (
                        <MessageBubble key={msg.id} message={msg} />
                    ))}

                    {loading && <TypingIndicator />}

                    <div ref={messagesEndRef} />
                </div>

                {/* Suggestions */}
                {showSuggestions && !loading && (
                    <div className="px-6 pt-0 pb-6 flex flex-wrap gap-2">
                        {SUGGESTIONS.map((s) => (
                            <button
                                key={s}
                                onClick={() => handleSend(s)}
                                className="bg-[#F3F3F3] border border-[#E5E5E5] rounded-full px-[14px] py-[7px] text-[12px] text-[#555] font-medium cursor-pointer transition-all duration-150 ease-in-out hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A]"
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Input area */}
            <div className='flex items-end gap-2 p-4 pt-4 bg-gray-100 shrink-0 rounded-b-2xl'>
                <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe your situation…"
                    aria-label="Message input"
                    rows={1}
                    className="flex-1 px-[14px] py-[11px] border-[1.5px] border-[#E5E5E5] rounded-[10px] bg-white resize-none text-[14px] text-[#0A0A0A] outline-none transition-colors duration-150 ease-in-out focus:border-[#0A0A0A] min-h-[44px] max-h-[200px]"
                />
                <button
                    onClick={() => handleSend(input)}
                    disabled={loading || !input.trim()}
                    aria-label="Send message"
                    className={`rounded-[10px] px-[22px] py-[11px] text-[14px] font-semibold h-[44px] transition-all duration-150 ease-in-out border-none shrink-0 ${input.trim() && !loading
                        ? "bg-[#0A0A0A] text-white cursor-pointer"
                        : "bg-[#E5E5E5] text-[#AAA] cursor-not-allowed"
                        }`}
                >
                    Send
                </button>
            </div>

            <style>{`
        @keyframes typing-pulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.85); }
          40%            { opacity: 1;   transform: scale(1); }
        }
      `}</style>
        </div>
    );
});


export default ChatWindow
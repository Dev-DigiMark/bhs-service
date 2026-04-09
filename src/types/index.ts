// ── Chat ─────────────────────────────────────────────────────────────────────

export type MessageRole = 'user' | 'assistant';

export interface ActionDocument {
  title: string;
  body: string;
  type: 'letter' | 'script' | 'checklist';
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  actionDocument?: ActionDocument;
  timestamp: number;
}

export interface ChatbotResponse {
  content: string;
  actionDocument: ActionDocument;
}

// ── Firebase collections ──────────────────────────────────────────────────────

export interface WaitlistEntry {
  email: string;
  source: 'hero' | 'cta';
  createdAt: number;
}

export interface FeedbackEntry {
  content: string;
  sessionId: string;
  createdAt: number;
}

// ── UI ────────────────────────────────────────────────────────────────────────

export type UseCaseId = 'health' | 'workplace';

export interface UseCase {
  id: UseCaseId;
  label: string;
  situation: string;
  clearHelps: string[];
  suggestion: string;
}

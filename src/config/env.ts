/**
 * Application environment configuration.
 * Replace all fake values with real credentials before deploying.
 */
export const ENV = {
  // ── Firebase ─────────────────────────────────────────────────────────────
  FIREBASE_API_KEY: 'AIzaSyFAKE_API_KEY_REPLACE_WITH_REAL_1234567890',
  FIREBASE_AUTH_DOMAIN: 'clear-bhss.firebaseapp.com',
  FIREBASE_PROJECT_ID: 'clear-bhss',
  FIREBASE_STORAGE_BUCKET: 'clear-bhss.appspot.com',
  FIREBASE_MESSAGING_SENDER_ID: '123456789012',
  FIREBASE_APP_ID: '1:123456789012:web:abcdef1234567890abcdef',
  FIREBASE_MEASUREMENT_ID: 'G-FAKEANALYTIC00',

  // ── Chatbot (OpenAI-compatible) ───────────────────────────────────────────
  CHATBOT_API_KEY: 'sk-proj-FAKE_OPENAI_KEY_REPLACE_WITH_REAL_BEFORE_DEPLOY',
  CHATBOT_API_URL: 'https://api.openai.com/v1/chat/completions',
  CHATBOT_MODEL: 'gpt-4o',
} as const;

export type EnvConfig = typeof ENV;

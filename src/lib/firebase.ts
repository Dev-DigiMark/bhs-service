/**
 * Mock Firebase client.
 *
 * Mirrors the Firestore and Analytics surface so the rest of the codebase
 * can call identical APIs once the real SDK is wired in.
 *
 * To switch to real Firebase:
 *   1. `npm install firebase`
 *   2. Uncomment the real imports below and delete the mock implementations.
 *   3. Replace ENV values with production credentials.
 */

// ── Real imports (uncomment when ready) ──────────────────────────────────────
// import { initializeApp }           from 'firebase/app';
// import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
// import { getAnalytics, logEvent }  from 'firebase/analytics';
// import { ENV } from '../config/env';
//
// const app  = initializeApp({ apiKey: ENV.FIREBASE_API_KEY, ... });
// export const db        = getFirestore(app);
// export const analytics = getAnalytics(app);
// ─────────────────────────────────────────────────────────────────────────────

import type { WaitlistEntry, FeedbackEntry } from '../types';

// ── In-memory store ───────────────────────────────────────────────────────────

type CollectionName = 'waitlist' | 'feedback';

interface StoredDoc<T> {
  id: string;
  data: T;
}

const store = new Map<CollectionName, StoredDoc<unknown>[]>();

function generateId(): string {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
}

function getCollection<T>(name: CollectionName): StoredDoc<T>[] {
  if (!store.has(name)) store.set(name, []);
  return store.get(name) as StoredDoc<T>[];
}

// ── Mock Firestore ────────────────────────────────────────────────────────────

function addDoc<T extends object>(
  name: CollectionName,
  data: T,
): Promise<{ id: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const id = generateId();
      getCollection<T>(name).push({ id, data });
      console.info(`[Mock Firestore] ${name}.add`, { id, ...data });
      resolve({ id });
    }, 80);
  });
}

export const db = {
  waitlist: {
    add: (entry: WaitlistEntry) => addDoc('waitlist', entry),
    getAll: () => getCollection<WaitlistEntry>('waitlist'),
  },
  feedback: {
    add: (entry: FeedbackEntry) => addDoc('feedback', entry),
    getAll: () => getCollection<FeedbackEntry>('feedback'),
  },
} as const;

// ── Mock Analytics ────────────────────────────────────────────────────────────

export const analytics = {
  logEvent: (eventName: string, params?: Record<string, unknown>): void => {
    console.info(`[Mock Analytics] ${eventName}`, params ?? {});
  },
} as const;

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { create } from 'zustand';

// ─── Types ───────────────────────────────────────────────────
export interface UserData {
  id: string;
  email: string;
  name: string;
  role?: string;
  avatarUrl?: string;
  bio?: string;
  currentStreak: number;
  longestStreak: number;
  coins: number;
  createdAt?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  color: string;
  icon?: string;
  topics: { id: string; name: string; order: number }[];
  _count?: { questions: number };
}

export interface Question {
  id: string;
  type: string;
  difficulty: string;
  content: string;
  options?: string;
  correctAnswer: string;
  explanation?: string;
  topic?: { id: string; name: string };
  subject?: { id: string; name: string; code: string; color: string };
  progress?: { attempts: number; correct: number; mastered: boolean };
  bookmarkId?: string;
  flagged?: boolean;
}

export interface Stats {
  totalQuestions: number;
  totalCorrect: number;
  accuracy: number;
  streak: number;
  longestStreak: number;
  coins: number;
  level: number;
  subjectProgresses: Array<{
    id: string;
    subjectId: string;
    totalAttempts: number;
    correctAttempts: number;
    accuracy: number;
    questionsStudied: number;
    totalQuestions: number;
    subject: { name: string; code: string; color: string };
  }>;
}

export interface Deck {
  id: string;
  title: string;
  description?: string;
  subjectId?: string;
  cardCount: number;
  subject?: { id: string; name: string; code: string; color: string };
  cards?: { id: string; front: string; back: string; order: number }[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  subjectId?: string;
  color: string;
  isShared: boolean;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  user?: { id: string; name: string; avatarUrl?: string };
  subject?: { id: string; name: string; code: string; color: string };
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  metadata?: string;
  imageUrl?: string;
  isActive: boolean;
  stock?: number;
  owned?: boolean;
}

export interface ExamCountdown {
  id: string;
  userId: string;
  subjectId?: string;
  examName: string;
  examDate: string;
  daysRemaining: number;
  isPast: boolean;
  subject?: { id: string; name: string; code: string; color: string };
}

export interface LeaderboardEntry {
  rank: number;
  score: number;
  user: { id: string; name: string; avatarUrl?: string; currentStreak: number };
}

export interface SBATemplate {
  id: string;
  title: string;
  description?: string;
  structure: string;
  subject: { id: string; name: string; code: string; color: string };
}

export interface TopicProgress {
  id: string;
  topicId: string;
  totalAttempts: number;
  correctAttempts: number;
  accuracy: number;
  topic: { name: string; subject?: { name: string; code: string } };
}

export interface StudySession {
  id: string;
  type: string;
  durationSeconds: number;
  questionsAnswered: number;
  correctAnswers: number;
  startedAt: string;
  subject?: { id: string; name: string; code: string; color: string };
}

export interface TutorMessage {
  role: 'user' | 'assistant';
  content: string;
}

// ─── Constants ───────────────────────────────────────────────
export const SUBJECT_ICONS: Record<string, string> = {
  Mathematics: '📐', 'English A': '📖', Biology: '🧬', Chemistry: '⚗️',
  Physics: '⚡', History: '📜', Geography: '🌍', 'Pure Mathematics': '∑',
  'Caribbean Studies': '🏝️',
};

export const MOTIVATIONAL_QUOTES = [
  { text: "Education is the most powerful weapon you can use to change the world.", author: "Nelson Mandela" },
  { text: "The beautiful thing about learning is that nobody can take it away from you.", author: "B.B. King" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Don't let what you cannot do interfere with what you can do.", author: "John Wooden" },
  { text: "Every accomplishment starts with the decision to try.", author: "John F. Kennedy" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
];

export const NOTE_COLORS = [
  { name: 'Default', value: '#ffffff' },
  { name: 'Yellow', value: '#fef9c3' },
  { name: 'Green', value: '#dcfce7' },
  { name: 'Blue', value: '#dbeafe' },
  { name: 'Pink', value: '#fce7f3' },
  { name: 'Purple', value: '#f3e8ff' },
  { name: 'Orange', value: '#ffedd5' },
  { name: 'Red', value: '#fee2e2' },
];

// ─── Zustand Store ──────────────────────────────────────────
interface AppState {
  user: UserData | null;
  userId: string | null;
  route: string;
  subjects: Subject[];
  stats: Stats | null;
  isLoading: boolean;

  setUserId: (id: string) => void;
  setUser: (user: UserData) => void;
  logout: () => void;
  setRoute: (route: string) => void;
  setSubjects: (subjects: Subject[]) => void;
  setStats: (stats: Stats) => void;
  setLoading: (loading: boolean) => void;
  refreshUser: () => Promise<void>;
  refreshStats: () => Promise<void>;
  fetchSubjects: () => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  userId: typeof window !== 'undefined' ? localStorage.getItem('cxc-ace-userId') : null,
  route: '#home',
  subjects: [],
  stats: null,
  isLoading: true,

  setUserId: (id) => {
    localStorage.setItem('cxc-ace-userId', id);
    set({ userId: id });
  },
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem('cxc-ace-userId');
    set({ userId: null, user: null, stats: null, route: '#home' });
  },
  setRoute: (route) => set({ route }),
  setSubjects: (subjects) => set({ subjects }),
  setStats: (stats) => set({ stats }),
  setLoading: (loading) => set({ isLoading: loading }),

  refreshUser: async () => {
    const { userId } = get();
    if (!userId) return;
    try {
      const res = await fetch(`/api/auth?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        set({ user: data.user });
      }
    } catch (e) { console.error(e); }
  },

  refreshStats: async () => {
    const { userId } = get();
    if (!userId) return;
    try {
      const res = await fetch(`/api/progress?view=stats&userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        set({ stats: data });
        if (data.user && get().user) {
          set({ user: { ...get().user!, coins: data.coins, currentStreak: data.streak, longestStreak: data.longestStreak } });
        }
      }
    } catch (e) { console.error(e); }
  },

  fetchSubjects: async () => {
    try {
      const res = await fetch('/api');
      if (res.ok) {
        const data = await res.json();
        set({ subjects: data.subjects || [] });
      }
    } catch (e) { console.error(e); }
  },
}));

// ─── Utility Functions ──────────────────────────────────────
export function parseOptions(optionsStr?: string): { label: string; value: string; isCorrect: boolean }[] {
  if (!optionsStr) return [];
  try { return JSON.parse(optionsStr); }
  catch { return []; }
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export function daysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getLevelColor(level: number): string {
  if (level >= 10) return 'text-yellow-500';
  if (level >= 5) return 'text-orange-500';
  if (level >= 3) return 'text-green-500';
  return 'text-blue-500';
}

export function getDifficultyColor(d: string): string {
  switch (d) {
    case 'EASY': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'MEDIUM': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'HARD': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  }
}

export function getRandomQuote() {
  return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
}

// ─── Animation Variants ─────────────────────────────────────
export const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const slideIn = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

// ─── Loading Spinner ────────────────────────────────────────
export function LoadingSpinner({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <motion.div
        className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <p className="text-muted-foreground text-sm">{text}</p>
    </div>
  );
}

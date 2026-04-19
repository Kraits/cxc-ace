'use client';

import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { create } from 'zustand';
import { useTheme } from 'next-themes';
import {
  Home as HomeIcon, BookOpen, Brain, BarChart3, User, Plus, Star, Coins, Flame,
  Clock, Trophy, ChevronRight, ChevronLeft, Check, X, Bookmark,
  MessageCircle, StickyNote, Timer, Settings, LogOut, Download,
  Trash2, Edit3, Pin, Share2, Eye, Lock, Zap, Shield, Award,
  ShoppingBag, Calendar, FileText, ArrowLeft, RotateCcw, Send,
  Heart, Target, TrendingUp, Crown, Medal, AlertTriangle,
  CheckCircle2, Circle, CircleDot, Play, Pause, SkipForward,
  Layers, Sparkles, Mic, Volume2, Search, Filter, Moon, Sun,
  HelpCircle, GraduationCap, Globe, MapPin, ChevronDown,
  Copy, RefreshCw, ThumbsUp, ThumbsDown, MoreVertical,
  Menu, XIcon, Compass, FolderOpen, File, PenTool, XCircle,
  Dumbbell, BookMarked, Hash, Activity, PieChart, BarChart2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

// ─── Types ───────────────────────────────────────────────────
interface UserData {
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

interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  color: string;
  icon?: string;
  topics: { id: string; name: string; order: number }[];
  _count?: { questions: number };
}

interface Question {
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

interface Stats {
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

interface Deck {
  id: string;
  title: string;
  description?: string;
  subjectId?: string;
  cardCount: number;
  subject?: { id: string; name: string; code: string; color: string };
  cards?: { id: string; front: string; back: string; order: number }[];
}

interface Note {
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

interface ShopItem {
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

interface ExamCountdown {
  id: string;
  userId: string;
  subjectId?: string;
  examName: string;
  examDate: string;
  daysRemaining: number;
  isPast: boolean;
  subject?: { id: string; name: string; code: string; color: string };
}

interface LeaderboardEntry {
  rank: number;
  score: number;
  user: { id: string; name: string; avatarUrl?: string; currentStreak: number };
}

interface SBATemplate {
  id: string;
  title: string;
  description?: string;
  structure: string;
  subject: { id: string; name: string; code: string; color: string };
}

interface TopicProgress {
  id: string;
  topicId: string;
  totalAttempts: number;
  correctAttempts: number;
  accuracy: number;
  topic: { name: string; subject?: { name: string; code: string } };
}

interface StudySession {
  id: string;
  type: string;
  durationSeconds: number;
  questionsAnswered: number;
  correctAnswers: number;
  startedAt: string;
  subject?: { id: string; name: string; code: string; color: string };
}

interface TutorMessage {
  role: 'user' | 'assistant';
  content: string;
}

// ─── Constants ───────────────────────────────────────────────
const SUBJECT_ICONS: Record<string, string> = {
  Mathematics: '📐', 'English A': '📖', Biology: '🧬', Chemistry: '⚗️',
  Physics: '⚡', History: '📜', Geography: '🌍', 'Pure Mathematics': '∑',
  'Caribbean Studies': '🏝️',
};

const MOTIVATIONAL_QUOTES = [
  { text: "Education is the most powerful weapon you can use to change the world.", author: "Nelson Mandela" },
  { text: "The beautiful thing about learning is that nobody can take it away from you.", author: "B.B. King" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Don't let what you cannot do interfere with what you can do.", author: "John Wooden" },
  { text: "Every accomplishment starts with the decision to try.", author: "John F. Kennedy" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
];

const NOTE_COLORS = [
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

const useStore = create<AppState>((set, get) => ({
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
function parseOptions(optionsStr?: string): { label: string; value: string; isCorrect: boolean }[] {
  if (!optionsStr) return [];
  try { return JSON.parse(optionsStr); }
  catch { return []; }
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function daysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getLevelColor(level: number): string {
  if (level >= 10) return 'text-yellow-500';
  if (level >= 5) return 'text-orange-500';
  if (level >= 3) return 'text-green-500';
  return 'text-blue-500';
}

function getDifficultyColor(d: string): string {
  switch (d) {
    case 'EASY': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'MEDIUM': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'HARD': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  }
}

function getRandomQuote() {
  return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
}

// ─── Animation Variants ─────────────────────────────────────
const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const slideIn = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

// ─── Loading Spinner ────────────────────────────────────────
function LoadingSpinner({ text = 'Loading...' }: { text?: string }) {
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

// ─── AUTH SCREEN ─────────────────────────────────────────────
function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { setUserId, setUser, setRoute } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isLogin ? 'login' : 'register',
          name: !isLogin ? name : undefined,
          email,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setLoading(false);
        return;
      }

      setUserId(data.user.id);
      setUser(data.user);
      setRoute('#home');
      toast({ title: isLogin ? 'Welcome back!' : 'Account created!', description: `Hello, ${data.user.name}!` });
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <motion.div {...scaleIn} transition={{ duration: 0.4 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <motion.div
            className="text-5xl mb-3 inline-block"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🎓
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">
            CXC Ace
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">Your Caribbean Exam Prep Companion</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-center">{isLogin ? 'Welcome Back' : 'Create Account'}</CardTitle>
            <CardDescription className="text-center">
              {isLogin ? 'Sign in to continue studying' : 'Join thousands of Caribbean students'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="student@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Min 6 characters" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
              </div>

              {error && (
                <motion.div {...fadeIn} className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}

              <Button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600" disabled={loading}>
                {loading ? (
                  <motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                ) : isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium">
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// ─── HOME DASHBOARD ─────────────────────────────────────────
function HomeDashboard() {
  const { user, stats, subjects, setRoute, refreshStats, refreshUser } = useStore();
  const [countdowns, setCountdowns] = useState<ExamCountdown[]>([]);
  const [weakTopics, setWeakTopics] = useState<TopicProgress[]>([]);
  const [quote] = useState(getRandomQuote);

  useEffect(() => {
    refreshStats();
    refreshUser();
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/exams?userId=${user.id}`).then(r => r.json()).then(d => setCountdowns(d.countdowns || [])).catch(() => {});
    fetch(`/api/progress?view=weak&userId=${user.id}`).then(r => r.json()).then(d => setWeakTopics(d.weakTopics || [])).catch(() => {});
  }, [user?.id]);

  const level = stats?.level || 1;
  const xpForNextLevel = Math.pow(level, 2) * 5;
  const xpProgress = stats?.totalQuestions ? (stats.totalQuestions % xpForNextLevel) / xpForNextLevel * 100 : 0;

  return (
    <div className="space-y-6 pb-4">
      {/* Welcome Header */}
      <motion.div {...fadeIn} className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-12 w-12 border-2 border-white/30">
            <AvatarFallback className="bg-white/20 text-lg font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || 'S'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-bold text-lg">Hey, {user?.name?.split(' ')[0] || 'Student'}! 👋</h2>
            <p className="text-emerald-100 text-sm">Keep up the great work!</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4" />
            <span className="font-semibold">Level {level}</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4" />
            <span className="font-semibold">{user?.currentStreak || 0} day streak</span>
          </div>
          <div className="flex items-center gap-1">
            <Coins className="w-4 h-4" />
            <span className="font-semibold">{user?.coins || 0}</span>
          </div>
        </div>
        <Progress value={xpProgress} className="mt-3 h-2 bg-white/20" />
        <p className="text-xs text-emerald-100 mt-1">{stats?.totalQuestions || 0} questions answered</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-600" /> Quick Stats
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-muted-foreground">Questions</span>
            </div>
            <p className="text-2xl font-bold">{stats?.totalQuestions || 0}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-muted-foreground">Accuracy</span>
            </div>
            <p className="text-2xl font-bold">{stats?.accuracy || 0}%</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-muted-foreground">Best Streak</span>
            </div>
            <p className="text-2xl font-bold">{user?.longestStreak || 0}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Coins className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-muted-foreground">Coins</span>
            </div>
            <p className="text-2xl font-bold">{user?.coins || 0}</p>
          </Card>
        </div>
      </motion.div>

      {/* Subject Progress */}
      <motion.div {...fadeIn} transition={{ delay: 0.15 }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" /> Your Subjects
          </h3>
          <Button variant="ghost" size="sm" onClick={() => setRoute('#quiz')}>
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="space-y-2">
          {subjects.slice(0, 4).map(sub => {
            const sp = stats?.subjectProgresses?.find(s => s.subjectId === sub.id);
            return (
              <motion.button
                key={sub.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setRoute(`#quiz-${sub.id}`)}
                className="w-full"
              >
                <Card className="p-3 flex items-center gap-3 hover:shadow-md transition-shadow">
                  <div className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl" style={{ backgroundColor: sub.color + '20' }}>
                    {SUBJECT_ICONS[sub.name] || '📚'}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm">{sub.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={sp?.accuracy || 0} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground">{sp?.accuracy || 0}%</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">{sub._count?.questions || 0} Q</Badge>
                </Card>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Exam Countdowns */}
      {countdowns.length > 0 && (
        <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-500" /> Exam Countdowns
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setRoute('#exams')}>
              Manage <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-2">
            {countdowns.filter(c => !c.isPast).slice(0, 3).map(c => (
              <Card key={c.id} className="p-3 flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                  c.daysRemaining < 7 ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                  c.daysRemaining < 30 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                  'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                }`}>
                  {c.daysRemaining}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{c.examName}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.subject?.name || 'General'} · {c.daysRemaining} days left
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Weak Topics */}
      {weakTopics.length > 0 && (
        <motion.div {...fadeIn} transition={{ delay: 0.25 }}>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" /> Needs Improvement
          </h3>
          <div className="space-y-2">
            {weakTopics.slice(0, 3).map(wt => (
              <Card key={wt.id} className="p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Target className="w-5 h-5 text-amber-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{wt.topic?.name}</p>
                  <p className="text-xs text-muted-foreground">{wt.topic?.subject?.name}</p>
                </div>
                <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  {wt.accuracy.toFixed(0)}%
                </Badge>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Motivational Quote */}
      <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
        <Card className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 border-emerald-200/50 dark:border-emerald-800/50">
          <p className="text-sm italic text-emerald-800 dark:text-emerald-200">&ldquo;{quote.text}&rdquo;</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">— {quote.author}</p>
        </Card>
      </motion.div>
    </div>
  );
}

// ─── QUIZ SYSTEM ─────────────────────────────────────────────
function SubjectSelection() {
  const { subjects, setRoute } = useStore();
  const { stats } = useStore();

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setRoute('#quiz')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-bold">Choose a Subject</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {subjects.map((sub, i) => {
          const sp = stats?.subjectProgresses?.find(s => s.subjectId === sub.id);
          return (
            <motion.button
              key={sub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setRoute(`#quiz-config-${sub.id}`)}
              className="text-left"
            >
              <Card className="p-4 h-full hover:shadow-lg transition-all duration-200 border-2 hover:border-emerald-300 dark:hover:border-emerald-700">
                <div className="text-3xl mb-2">{SUBJECT_ICONS[sub.name] || '📚'}</div>
                <h3 className="font-semibold text-sm leading-tight">{sub.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{sub.code}</p>
                {sp && (
                  <div className="mt-2">
                    <Progress value={sp.accuracy} className="h-1.5" />
                    <p className="text-xs text-muted-foreground mt-1">{sp.accuracy}% accuracy</p>
                  </div>
                )}
                <Badge variant="secondary" className="mt-2 text-xs">{sub._count?.questions || 0} questions</Badge>
              </Card>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function QuizConfig({ subjectId }: { subjectId: string }) {
  const { subjects, setRoute, user } = useStore();
  const [count, setCount] = useState('10');
  const [difficulty, setDifficulty] = useState('ALL');
  const [topicId, setTopicId] = useState('ALL');
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');
  const subject = subjects.find(s => s.id === subjectId);

  if (!subject) return <LoadingSpinner />;

  const startQuiz = () => {
    const params = new URLSearchParams();
    params.set('subjectId', subjectId);
    params.set('count', count);
    if (difficulty !== 'ALL') params.set('difficulty', difficulty);
    if (topicId !== 'ALL') params.set('topicId', topicId);
    if (user?.id) params.set('userId', user.id);
    setRoute(`#quiz-taking-${mode}-${encodeURIComponent(params.toString())}`);
  };

  return (
    <div className="space-y-6 pb-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setRoute('#subjects')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-2xl">{SUBJECT_ICONS[subject.name] || '📚'}</div>
        <div>
          <h2 className="text-xl font-bold">{subject.name}</h2>
          <p className="text-xs text-muted-foreground">{subject._count?.questions || 0} questions available</p>
        </div>
      </div>

      <motion.div {...fadeIn} className="space-y-4">
        {/* Mode Selection */}
        <div>
          <Label className="mb-2 block font-semibold">Quiz Mode</Label>
          <div className="grid grid-cols-2 gap-3">
            <Card
              className={`p-4 cursor-pointer transition-all ${mode === 'practice' ? 'border-emerald-500 border-2 bg-emerald-50 dark:bg-emerald-950/30' : 'hover:border-gray-300'}`}
              onClick={() => setMode('practice')}
            >
              <Dumbbell className="w-6 h-6 mb-2 text-emerald-600" />
              <h4 className="font-semibold text-sm">Practice</h4>
              <p className="text-xs text-muted-foreground mt-1">Instant feedback</p>
            </Card>
            <Card
              className={`p-4 cursor-pointer transition-all ${mode === 'exam' ? 'border-amber-500 border-2 bg-amber-50 dark:bg-amber-950/30' : 'hover:border-gray-300'}`}
              onClick={() => setMode('exam')}
            >
              <Timer className="w-6 h-6 mb-2 text-amber-600" />
              <h4 className="font-semibold text-sm">Exam</h4>
              <p className="text-xs text-muted-foreground mt-1">Timed, results at end</p>
            </Card>
          </div>
        </div>

        {/* Question Count */}
        <div>
          <Label className="mb-2 block font-semibold">Number of Questions</Label>
          <Select value={count} onValueChange={setCount}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 Questions</SelectItem>
              <SelectItem value="10">10 Questions</SelectItem>
              <SelectItem value="15">15 Questions</SelectItem>
              <SelectItem value="20">20 Questions</SelectItem>
              <SelectItem value="30">30 Questions</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Difficulty */}
        <div>
          <Label className="mb-2 block font-semibold">Difficulty</Label>
          <div className="grid grid-cols-4 gap-2">
            {['ALL', 'EASY', 'MEDIUM', 'HARD'].map(d => (
              <Button
                key={d}
                variant={difficulty === d ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDifficulty(d)}
                className={difficulty === d ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
              >
                {d === 'ALL' ? '🎯 All' : d === 'EASY' ? '🟢 Easy' : d === 'MEDIUM' ? '🟡 Med' : '🔴 Hard'}
              </Button>
            ))}
          </div>
        </div>

        {/* Topic Filter */}
        {subject.topics.length > 0 && (
          <div>
            <Label className="mb-2 block font-semibold">Topic (Optional)</Label>
            <Select value={topicId} onValueChange={setTopicId}>
              <SelectTrigger><SelectValue placeholder="All topics" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Topics</SelectItem>
                {subject.topics.map(t => (
                  <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Button onClick={startQuiz} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 py-6 text-lg font-bold">
          <Play className="w-5 h-5 mr-2" /> Start Quiz
        </Button>
      </motion.div>
    </div>
  );
}

function QuizTaking({ configStr }: { configStr: string }) {
  const { setRoute, user } = useStore();
  const { toast } = useToast();
  const config = useMemo(() => {
    const params = new URLSearchParams(configStr);
    return {
      subjectId: params.get('subjectId')!,
      count: parseInt(params.get('count') || '10'),
      difficulty: params.get('difficulty') || undefined,
      topicId: params.get('topicId') || undefined,
      userId: params.get('userId') || undefined,
    };
  }, [configStr]);

  const [mode, ...rest] = useStore(s => s.route).split('-');
  // The route format is #quiz-taking-practice-xxx or #quiz-taking-exam-xxx
  const routeMode = useMemo(() => {
    const r = useStore.getState().route;
    if (r.includes('practice')) return 'practice' as const;
    return 'exam' as const;
  }, []);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('subjectId', config.subjectId);
    params.set('count', config.count.toString());
    if (config.difficulty) params.set('difficulty', config.difficulty);
    if (config.topicId) params.set('topicId', config.topicId);
    if (config.userId) params.set('userId', config.userId);

    fetch(`/api/questions?${params.toString()}`)
      .then(r => r.json())
      .then(d => {
        setQuestions(d.questions || []);
        setLoading(false);
        startTimeRef.current = Date.now();
      })
      .catch(() => setLoading(false));
  }, [config]);

  useEffect(() => {
    if (routeMode === 'exam' && questions.length > 0 && !showResults) {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [routeMode, questions.length, showResults]);

  const q = questions[currentQ];
  const options = q ? parseOptions(q.options) : [];

  const handleAnswer = useCallback(async (value: string) => {
    if (answered || !q || !user?.id) return;
    setSelected(value);
    setAnswered(true);

    const isCorrect = value === q.correctAnswer;
    if (isCorrect) setCorrectCount(c => c + 1);

    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'submit', userId: user.id, questionId: q.id, isCorrect }),
      });
    } catch (e) { console.error(e); }

    if (routeMode === 'practice') {
      setTimeout(() => {
        if (currentQ < questions.length - 1) {
          setCurrentQ(c => c + 1);
          setSelected(null);
          setAnswered(false);
        } else {
          setShowResults(true);
        }
      }, 2000);
    }
  }, [answered, q, user?.id, routeMode, currentQ, questions.length]);

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const toggleBookmark = async (questionId: string) => {
    if (!user?.id) return;
    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'bookmark', userId: user.id, questionId }),
      });
      const data = await res.json();
      setBookmarked(prev => {
        const next = new Set(prev);
        if (data.bookmarked) next.add(questionId);
        else next.delete(questionId);
        return next;
      });
      toast({ title: data.bookmarked ? 'Bookmarked!' : 'Bookmark removed' });
    } catch (e) { console.error(e); }
  };

  if (loading) return <LoadingSpinner text="Loading questions..." />;
  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-muted-foreground">No questions available for this selection.</p>
        <Button onClick={() => setRoute('#quiz')}>Go Back</Button>
      </div>
    );
  }

  if (showResults) {
    const accuracy = Math.round((correctCount / questions.length) * 100);
    const xpGained = correctCount * 10 + (questions.length - correctCount) * 2;
    const coinsGained = correctCount * 5 + (questions.length - correctCount);
    return (
      <motion.div {...scaleIn} className="space-y-6 pb-4">
        <div className="text-center">
          <motion.div
            className="text-6xl mb-4 inline-block"
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            {accuracy >= 80 ? '🎉' : accuracy >= 60 ? '👍' : '💪'}
          </motion.div>
          <h2 className="text-2xl font-bold">Quiz Complete!</h2>
        </div>
        <Card className="p-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-emerald-600">{correctCount}/{questions.length}</p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{accuracy}%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
            {routeMode === 'exam' && (
              <div>
                <p className="text-3xl font-bold text-amber-600">{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</p>
                <p className="text-xs text-muted-foreground">Time</p>
              </div>
            )}
            <div>
              <p className="text-3xl font-bold text-yellow-500">+{coinsGained}</p>
              <p className="text-xs text-muted-foreground">Coins</p>
            </div>
          </div>
        </Card>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => setRoute('#quiz')}>
            <HomeIcon className="w-4 h-4 mr-2" /> Home
          </Button>
          <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={() => window.location.reload()}>
            <RotateCcw className="w-4 h-4 mr-2" /> Retry
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => {
          if (timerRef.current) clearInterval(timerRef.current);
          setRoute('#quiz');
        }}>
          <X className="w-4 h-4 mr-1" /> Exit
        </Button>
        {routeMode === 'exam' && (
          <Badge variant="secondary" className="font-mono">
            {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
          </Badge>
        )}
        <Badge variant="secondary">{currentQ + 1}/{questions.length}</Badge>
      </div>

      {/* Progress Bar */}
      <Progress value={((currentQ + 1) / questions.length) * 100} className="h-2" />

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div key={currentQ} {...slideIn} transition={{ duration: 0.3 }}>
          <Card className="p-5">
            <div className="flex items-start justify-between mb-3">
              <Badge className={getDifficultyColor(q.difficulty)}>{q.difficulty}</Badge>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => toggleBookmark(q.id)}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked.has(q.id) ? 'fill-yellow-500 text-yellow-500' : ''}`} />
              </Button>
            </div>
            <p className="font-medium text-base leading-relaxed">{q.content}</p>
            {q.topic && (
              <p className="text-xs text-muted-foreground mt-2">
                {q.subject?.name} · {q.topic.name}
              </p>
            )}
          </Card>

          {/* Options */}
          <div className="space-y-2 mt-4">
            {options.map((opt) => {
              const isSelected = selected === opt.value;
              const isCorrect = opt.value === q.correctAnswer;
              let borderColor = 'border-border';
              let bgColor = '';
              if (answered) {
                if (isCorrect) { borderColor = 'border-green-500'; bgColor = 'bg-green-50 dark:bg-green-950/30'; }
                else if (isSelected && !isCorrect) { borderColor = 'border-red-500'; bgColor = 'bg-red-50 dark:bg-red-950/30'; }
              } else if (isSelected) {
                borderColor = 'border-emerald-500'; bgColor = 'bg-emerald-50 dark:bg-emerald-950/30';
              }

              return (
                <motion.button
                  key={opt.value}
                  whileTap={!answered ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswer(opt.value)}
                  disabled={answered && routeMode === 'practice'}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${borderColor} ${bgColor} ${
                    answered ? 'cursor-default' : 'cursor-pointer hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      answered && isCorrect ? 'bg-green-500 text-white' :
                      answered && isSelected && !isCorrect ? 'bg-red-500 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {answered && isCorrect ? <Check className="w-4 h-4" /> :
                       answered && isSelected && !isCorrect ? <X className="w-4 h-4" /> :
                       opt.label}
                    </div>
                    <span className="text-sm">{opt.value}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Feedback */}
          {answered && routeMode === 'practice' && q.explanation && (
            <motion.div {...fadeIn} className="mt-4">
              <Card className={`p-4 ${selected === q.correctAnswer
                ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30'
                : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30'
              }`}>
                <div className="flex items-center gap-2 mb-2 font-semibold text-sm">
                  {selected === q.correctAnswer ? (
                    <><CheckCircle2 className="w-4 h-4 text-green-600" /> Correct!</>
                  ) : (
                    <><XCircle className="w-4 h-4 text-red-600" /> Incorrect</>
                  )}
                </div>
                <p className="text-sm">{q.explanation}</p>
              </Card>
            </motion.div>
          )}

          {/* Next Button for Exam Mode */}
          {answered && routeMode === 'exam' && (
            <motion.div {...fadeIn} className="mt-4">
              <Card className={`p-4 ${selected === q.correctAnswer
                ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30'
                : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30'
              }`}>
                <div className="flex items-center gap-2 mb-2 font-semibold text-sm">
                  {selected === q.correctAnswer ? (
                    <><CheckCircle2 className="w-4 h-4 text-green-600" /> Correct!</>
                  ) : (
                    <><XCircle className="w-4 h-4 text-red-600" /> Incorrect. Answer: {q.correctAnswer}</>
                  )}
                </div>
                {q.explanation && <p className="text-sm">{q.explanation}</p>}
              </Card>
              <Button onClick={handleNext} className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700">
                {currentQ < questions.length - 1 ? 'Next Question' : 'See Results'} <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── FLASHCARDS ──────────────────────────────────────────────
function FlashcardsView() {
  const { user } = useStore();
  const { toast } = useToast();
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSubjectId, setNewSubjectId] = useState('');
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewCards, setReviewCards] = useState<Array<{ id: string; front: string; back: string; deck?: { title: string; subject?: { name: string; color: string } } }>>([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');
  const [dueCount, setDueCount] = useState(0);
  const { subjects } = useStore();

  const loadDecks = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/flashcards?userId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setDecks(data.decks || []);
      }
      const dueRes = await fetch(`/api/flashcards?userId=${user.id}&view=due`);
      if (dueRes.ok) {
        const dueData = await dueRes.json();
        setDueCount(dueData.dueCount || 0);
      }
      setLoading(false);
    } catch { setLoading(false); }
  }, [user?.id]);

  useEffect(() => { loadDecks(); }, [loadDecks]);

  const createDeck = async () => {
    if (!user?.id || !newTitle.trim()) return;
    try {
      await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'createDeck', userId: user.id, title: newTitle, description: newDesc, subjectId: newSubjectId || undefined }),
      });
      setShowCreate(false);
      setNewTitle('');
      setNewDesc('');
      setNewSubjectId('');
      toast({ title: 'Deck created!' });
      loadDecks();
    } catch (e) { console.error(e); }
  };

  const addCard = async () => {
    if (!activeDeck || !cardFront.trim() || !cardBack.trim()) return;
    try {
      await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'addCard', deckId: activeDeck.id, front: cardFront, back: cardBack }),
      });
      setAddCardOpen(false);
      setCardFront('');
      setCardBack('');
      toast({ title: 'Card added!' });
      loadDecks();
    } catch (e) { console.error(e); }
  };

  const startReview = async (deck?: Deck) => {
    if (!user?.id) return;
    try {
      if (deck) {
        const res = await fetch(`/api/flashcards?userId=${user.id}`);
        const data = await res.json();
        const d = data.decks?.find((dk: Deck) => dk.id === deck.id);
        if (d && d.cards && d.cards.length > 0) {
          setReviewCards(d.cards.map(c => ({ ...c, deck: { title: deck.title, subject: deck.subject as { name: string; color: string } } })));
          setReviewMode(true);
          setCurrentCard(0);
          setFlipped(false);
          return;
        }
      }
      // Due cards review
      const res = await fetch(`/api/flashcards?userId=${user.id}&view=due`);
      const data = await res.json();
      if (data.dueCards && data.dueCards.length > 0) {
        setReviewCards(data.dueCards);
        setReviewMode(true);
        setCurrentCard(0);
        setFlipped(false);
      } else {
        toast({ title: 'No cards to review!', description: 'All caught up! 🎉' });
      }
    } catch (e) { console.error(e); }
  };

  const rateCard = async (quality: number) => {
    if (!user?.id || !reviewCards[currentCard]) return;
    const card = reviewCards[currentCard];
    try {
      await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'review', userId: user.id, deckId: card.deck?.id || activeDeck?.id || '', cardId: card.id, quality }),
      });
      if (currentCard < reviewCards.length - 1) {
        setCurrentCard(c => c + 1);
        setFlipped(false);
      } else {
        setReviewMode(false);
        toast({ title: 'Review complete! Great job! 🎉' });
        loadDecks();
      }
    } catch (e) { console.error(e); }
  };

  if (loading) return <LoadingSpinner />;

  // Review Mode
  if (reviewMode && reviewCards.length > 0) {
    const card = reviewCards[currentCard];
    return (
      <div className="space-y-4 pb-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setReviewMode(false)}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Exit
          </Button>
          <Badge variant="secondary">{currentCard + 1}/{reviewCards.length}</Badge>
        </div>
        <Progress value={((currentCard + 1) / reviewCards.length) * 100} className="h-2" />

        <AnimatePresence mode="wait">
          <motion.div key={currentCard} {...scaleIn}>
            <motion.div
              className="min-h-[280px] rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 flex items-center justify-center p-6 cursor-pointer"
              onClick={() => setFlipped(!flipped)}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={`text-center ${flipped ? 'hidden' : ''}`}>
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Front</p>
                <p className="text-lg font-medium">{card.front}</p>
              </div>
              <div className={`text-center absolute ${flipped ? '' : 'hidden'}`} style={{ transform: 'rotateY(180deg)' }}>
                <p className="text-xs text-emerald-600 mb-2 uppercase tracking-wider">Back</p>
                <p className="text-lg font-medium">{card.back}</p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-sm text-muted-foreground">Tap the card to flip</p>

        {flipped && (
          <motion.div {...fadeIn} className="space-y-2">
            <p className="text-center text-xs text-muted-foreground mb-2">How well did you know this?</p>
            <div className="grid grid-cols-5 gap-2">
              {[
                { q: 1, label: '💀', color: 'bg-red-500 hover:bg-red-600' },
                { q: 2, label: '😟', color: 'bg-orange-500 hover:bg-orange-600' },
                { q: 3, label: '🤔', color: 'bg-yellow-500 hover:bg-yellow-600' },
                { q: 4, label: '😊', color: 'bg-lime-500 hover:bg-lime-600' },
                { q: 5, label: '🤩', color: 'bg-emerald-500 hover:bg-emerald-600' },
              ].map(btn => (
                <Button key={btn.q} className={`${btn.color} text-white py-4 text-lg`} onClick={() => rateCard(btn.q)}>
                  {btn.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  // Deck Detail
  if (activeDeck) {
    return (
      <div className="space-y-4 pb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setActiveDeck(null)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-xl font-bold">{activeDeck.title}</h2>
            <p className="text-xs text-muted-foreground">{activeDeck.cardCount} cards</p>
          </div>
        </div>

        {activeDeck.cards && activeDeck.cards.length > 0 && (
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => startReview(activeDeck)}>
            <Play className="w-4 h-4 mr-2" /> Review Cards ({activeDeck.cards.length})
          </Button>
        )}

        <Dialog open={addCardOpen} onOpenChange={setAddCardOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full"><Plus className="w-4 h-4 mr-2" /> Add Card</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Card</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div>
                <Label>Front (Question)</Label>
                <Textarea value={cardFront} onChange={e => setCardFront(e.target.value)} placeholder="What is...?" />
              </div>
              <div>
                <Label>Back (Answer)</Label>
                <Textarea value={cardBack} onChange={e => setCardBack(e.target.value)} placeholder="The answer is..." />
              </div>
              <Button onClick={addCard} className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={!cardFront.trim() || !cardBack.trim()}>
                Add Card
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {activeDeck.cards && activeDeck.cards.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Cards</h3>
            {activeDeck.cards.map(card => (
              <Card key={card.id} className="p-3">
                <p className="text-sm font-medium">{card.front}</p>
                <p className="text-xs text-muted-foreground mt-1">{card.back}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Deck List
  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-600" /> Flashcards
        </h2>
        {dueCount > 0 && (
          <Button size="sm" className="bg-amber-500 hover:bg-amber-600" onClick={() => startReview()}>
            <Clock className="w-4 h-4 mr-1" /> {dueCount} Due
          </Button>
        )}
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogTrigger asChild>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" /> Create New Deck
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader><DialogTitle>Create Deck</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Title</Label>
              <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Biology Chapter 1" />
            </div>
            <div>
              <Label>Description (optional)</Label>
              <Textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Brief description" />
            </div>
            <div>
              <Label>Subject (optional)</Label>
              <Select value={newSubjectId} onValueChange={setNewSubjectId}>
                <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                <SelectContent>
                  {subjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={createDeck} className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={!newTitle.trim()}>
              Create Deck
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {decks.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Layers className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No decks yet. Create your first deck!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {decks.map(deck => (
            <motion.div key={deck.id} {...fadeIn} whileTap={{ scale: 0.98 }}>
              <Card
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => { setActiveDeck(deck); loadDecks(); }}
              >
                <div className="flex items-center gap-3">
                  {deck.subject ? (
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: deck.subject.color + '20' }}>
                      {SUBJECT_ICONS[deck.subject.name] || '📚'}
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-emerald-600" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{deck.title}</h4>
                    <p className="text-xs text-muted-foreground">{deck.cardCount} cards · {deck.subject?.name || 'General'}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── AI TUTOR ────────────────────────────────────────────────
function AITutor() {
  const { user, subjects } = useStore();
  const { toast } = useToast();
  const [messages, setMessages] = useState<TutorMessage[]>([
    { role: 'assistant', content: "Hello! 👋 I'm your CXC tutor. Ask me anything about your subjects, and I'll help you understand concepts, solve problems, and prepare for exams. What would you like to study today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const chatMessages = [...messages, { role: 'user', content: userMsg }];
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatMessages.slice(1),
          subject: subjects.find(s => s.id === selectedSubject)?.name || undefined,
          topic: selectedTopic || undefined,
        }),
      });
      const data = await res.json();
      if (data.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network error. Please check your connection and try again.' }]);
    }
    setLoading(false);
  };

  const quickQuestions = [
    "Explain the Pythagorean theorem with an example",
    "What are the main causes of climate change in the Caribbean?",
    "How do I write a good persuasive essay?",
    "Explain photosynthesis in simple terms",
  ];

  const currentSubject = subjects.find(s => s.id === selectedSubject);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Subject/Topic Selector */}
      <div className="flex gap-2 p-3 pb-0 flex-shrink-0">
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="flex-1 h-9 text-xs">
            <SelectValue placeholder="Subject context" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map(s => <SelectItem key={s.id} value={s.id}>{SUBJECT_ICONS[s.name]} {s.name}</SelectItem>)}
          </SelectContent>
        </Select>
        {currentSubject && (
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger className="flex-1 h-9 text-xs">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              {currentSubject.topics.map(t => <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>)}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
              msg.role === 'user'
                ? 'bg-emerald-600 text-white rounded-br-md'
                : 'bg-muted rounded-bl-md'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-muted-foreground/50"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="flex gap-2 px-3 overflow-x-auto pb-2 flex-shrink-0">
          {quickQuestions.map((q, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => { setInput(q); }}
              className="shrink-0 text-xs bg-muted hover:bg-emerald-50 dark:hover:bg-emerald-950/30 px-3 py-1.5 rounded-full transition-colors"
            >
              {q}
            </motion.button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 flex gap-2 flex-shrink-0">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
          placeholder="Ask your tutor..."
          disabled={loading}
          className="flex-1"
        />
        <Button onClick={sendMessage} disabled={!input.trim() || loading} size="icon" className="bg-emerald-600 hover:bg-emerald-700 shrink-0">
          {loading ? (
            <motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

// ─── NOTES ───────────────────────────────────────────────────
function NotesView() {
  const { user, subjects } = useStore();
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [sharedNotes, setSharedNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [showShared, setShowShared] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [noteColor, setNoteColor] = useState('#ffffff');
  const [noteSubjectId, setNoteSubjectId] = useState('');
  const [noteIsShared, setNoteIsShared] = useState(false);
  const [noteIsPinned, setNoteIsPinned] = useState(false);

  const loadNotes = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/notes?userId=${user.id}`);
      if (res.ok) setNotes(await res.json().then(d => d.notes || []));
      const sharedRes = await fetch('/api/notes?view=shared');
      if (sharedRes.ok) setSharedNotes(await sharedRes.json().then(d => d.notes || []));
      setLoading(false);
    } catch { setLoading(false); }
  }, [user?.id]);

  useEffect(() => { loadNotes(); }, [loadNotes]);

  const openCreate = () => {
    setTitle(''); setContent(''); setNoteColor('#ffffff'); setNoteSubjectId('');
    setNoteIsShared(false); setNoteIsPinned(false); setEditingNote(null);
    setShowCreate(true);
  };

  const openEdit = (note: Note) => {
    setTitle(note.title); setContent(note.content); setNoteColor(note.color);
    setNoteSubjectId(note.subjectId || ''); setNoteIsShared(note.isShared);
    setNoteIsPinned(note.isPinned); setEditingNote(note);
    setShowCreate(true);
  };

  const saveNote = async () => {
    if (!user?.id || !title.trim()) return;
    try {
      await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(editingNote ? { id: editingNote.id } : {}),
          userId: user.id, title, content, color: noteColor,
          subjectId: noteSubjectId || undefined,
          isShared: noteIsShared, isPinned: noteIsPinned,
        }),
      });
      toast({ title: editingNote ? 'Note updated!' : 'Note created!' });
      setShowCreate(false);
      loadNotes();
    } catch (e) { console.error(e); }
  };

  const deleteNote = async (noteId: string) => {
    if (!user?.id) return;
    try {
      await fetch(`/api/notes?id=${noteId}&userId=${user.id}`, { method: 'DELETE' });
      toast({ title: 'Note deleted' });
      loadNotes();
    } catch (e) { console.error(e); }
  };

  if (loading) return <LoadingSpinner />;

  const displayNotes = showShared ? sharedNotes : notes;

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-emerald-600" /> Notes
        </h2>
        {!showShared && (
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={openCreate}>
            <Plus className="w-4 h-4 mr-1" /> New
          </Button>
        )}
      </div>

      <Tabs value={showShared ? 'shared' : 'mine'} onValueChange={v => setShowShared(v === 'shared')}>
        <TabsList className="w-full">
          <TabsTrigger value="mine" className="flex-1">My Notes</TabsTrigger>
          <TabsTrigger value="shared" className="flex-1">Community</TabsTrigger>
        </TabsList>
      </Tabs>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingNote ? 'Edit Note' : 'New Note'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Title</Label>
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Note title" />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Write your note..." rows={8} />
            </div>
            <div>
              <Label>Subject</Label>
              <Select value={noteSubjectId} onValueChange={setNoteSubjectId}>
                <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                <SelectContent>
                  {subjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Color</Label>
              <div className="flex gap-2 flex-wrap mt-1">
                {NOTE_COLORS.map(c => (
                  <button
                    key={c.value}
                    onClick={() => setNoteColor(c.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${noteColor === c.value ? 'border-emerald-500 scale-110' : 'border-transparent'}`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch checked={noteIsPinned} onCheckedChange={setNoteIsPinned} />
                <Label className="text-xs">Pin</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={noteIsShared} onCheckedChange={setNoteIsShared} />
                <Label className="text-xs">Share</Label>
              </div>
            </div>
            <Button onClick={saveNote} className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={!title.trim()}>
              {editingNote ? 'Update' : 'Create'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {displayNotes.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <StickyNote className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>{showShared ? 'No shared notes yet' : 'No notes yet. Create your first note!'}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {displayNotes.map(note => (
            <motion.div key={note.id} {...fadeIn}>
              <Card
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                style={{ backgroundColor: showShared ? undefined : note.color === '#ffffff' ? undefined : note.color }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1" onClick={() => !showShared && openEdit(note)}>
                    <div className="flex items-center gap-2 mb-1">
                      {note.isPinned && <Pin className="w-3 h-3 text-amber-500" />}
                      {note.isShared && <Share2 className="w-3 h-3 text-emerald-500" />}
                      {note.subject && (
                        <Badge variant="outline" className="text-xs py-0">{note.subject.code}</Badge>
                      )}
                    </div>
                    <h4 className="font-semibold text-sm">{note.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{note.content}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {showShared && note.user?.name && `By ${note.user.name} · `}
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  {!showShared && (
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(note)}>
                        <Edit3 className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteNote(note.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── STUDY TIMER ─────────────────────────────────────────────
function StudyTimer() {
  const { user, subjects } = useStore();
  const { toast } = useStore();
  const { toast: shadToast } = useToast();
  const [timerMode, setTimerMode] = useState<'pomodoro' | 'custom'>('pomodoro');
  const [duration, setDuration] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [subjectId, setSubjectId] = useState('');
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<string>('');

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/study?userId=${user.id}`)
      .then(r => r.json())
      .then(d => setSessions(d.sessions || []))
      .catch(() => {});
  }, [user?.id]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            completeSession();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [isRunning, isBreak]);

  const completeSession = async () => {
    if (!user?.id) return;
    shadToast({ title: isBreak ? 'Break over! Time to focus!' : 'Session complete! 🎉' });

    if (!isBreak) {
      setPomodoroCount(p => p + 1);
      try {
        const res = await fetch('/api/study', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id, subjectId: subjectId || undefined,
            type: timerMode, durationSeconds: duration - timeLeft,
            startedAt: startTimeRef.current, endedAt: new Date().toISOString(),
          }),
        });
        const data = await res.json();
        if (data.session) {
          setSessions(prev => [data.session, ...prev]);
        }
      } catch (e) { console.error(e); }

      // Start break
      if (timerMode === 'pomodoro') {
        setIsBreak(true);
        const breakTime = pomodoroCount % 4 === 3 ? 15 * 60 : 5 * 60;
        setDuration(breakTime);
        setTimeLeft(breakTime);
      }
    } else {
      setIsBreak(false);
      setDuration(25 * 60);
      setTimeLeft(25 * 60);
    }
  };

  const startTimer = () => {
    setIsRunning(true);
    startTimeRef.current = new Date().toISOString();
  };

  const pauseTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setDuration(timerMode === 'pomodoro' ? 25 * 60 : duration);
    setTimeLeft(timerMode === 'pomodoro' ? 25 * 60 : duration);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const progress = duration > 0 ? ((duration - timeLeft) / duration) * 100 : 0;
  const mins = Math.floor(timeLeft / 60);

  return (
    <div className="space-y-6 pb-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Timer className="w-5 h-5 text-emerald-600" /> Study Timer
      </h2>

      {/* Mode Selector */}
      <Tabs value={timerMode} onValueChange={(v: string) => {
        const mode = v as 'pomodoro' | 'custom';
        setTimerMode(mode);
        setIsRunning(false); setIsBreak(false);
        if (mode === 'pomodoro') { setDuration(25 * 60); setTimeLeft(25 * 60); }
      }}>
        <TabsList className="w-full">
          <TabsTrigger value="pomodoro" className="flex-1">🍅 Pomodoro</TabsTrigger>
          <TabsTrigger value="custom" className="flex-1">⏱️ Custom</TabsTrigger>
        </TabsList>
      </Tabs>

      {timerMode === 'custom' && !isRunning && (
        <div className="flex gap-2">
          <div className="flex-1">
            <Label className="text-xs">Minutes</Label>
            <Input type="number" value={Math.floor(duration / 60)} onChange={e => {
              const m = parseInt(e.target.value) || 0;
              setDuration(m * 60); setTimeLeft(m * 60);
            }} min={1} max={180} disabled={isRunning} />
          </div>
        </div>
      )}

      {/* Subject Selector */}
      <Select value={subjectId} onValueChange={setSubjectId}>
        <SelectTrigger><SelectValue placeholder="Select subject (optional)" /></SelectTrigger>
        <SelectContent>
          {subjects.map(s => <SelectItem key={s.id} value={s.id}>{SUBJECT_ICONS[s.name]} {s.name}</SelectItem>)}
        </SelectContent>
      </Select>

      {/* Timer Display */}
      <div className="text-center py-8">
        <motion.div
          className="text-7xl font-mono font-bold mb-4"
          animate={isRunning ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className={isBreak ? 'text-teal-500' : timeLeft < 60 ? 'text-red-500' : ''}>
            {formatTime(timeLeft)}
          </span>
        </motion.div>
        <div className="flex items-center justify-center gap-2 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full transition-colors ${
              i < (pomodoroCount % 4) ? 'bg-emerald-500' : 'bg-muted'
            }`} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          {isRunning
            ? isBreak ? 'Enjoy your break!' : 'Stay focused!'
            : timeLeft === duration ? 'Ready to start?' : 'Paused'}
        </p>
        <Progress value={progress} className="h-3 max-w-xs mx-auto mb-6" />
        <div className="flex gap-3 justify-center">
          {!isRunning ? (
            <Button onClick={startTimer} size="lg" className="bg-emerald-600 hover:bg-emerald-700 px-8">
              <Play className="w-5 h-5 mr-2" /> Start
            </Button>
          ) : (
            <Button onClick={pauseTimer} size="lg" variant="outline" className="px-8">
              <Pause className="w-5 h-5 mr-2" /> Pause
            </Button>
          )}
          <Button onClick={resetTimer} size="lg" variant="outline" className="px-8">
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Recent Sessions */}
      {sessions.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mb-2">Recent Sessions</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {sessions.slice(0, 5).map(s => (
              <Card key={s.id} className="p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{s.type} · {formatDuration(s.durationSeconds)}</p>
                  <p className="text-xs text-muted-foreground">{s.subject?.name || 'General'} · {new Date(s.startedAt).toLocaleDateString()}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ANALYTICS / PROGRESS ────────────────────────────────────
function AnalyticsDashboard() {
  const { user, stats, subjects } = useStore();
  const [weakTopics, setWeakTopics] = useState<TopicProgress[]>([]);
  const [topicProgresses, setTopicProgresses] = useState<TopicProgress[]>([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [studyStats, setStudyStats] = useState<{ totalDuration: number; totalSessions: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    Promise.all([
      fetch(`/api/progress?view=weak&userId=${user.id}`).then(r => r.json()),
      fetch(`/api/study?userId=${user.id}`).then(r => r.json()),
    ]).then(([weakData, studyData]) => {
      setWeakTopics(weakData.weakTopics || []);
      setStudyStats(studyData.stats || null);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id || !selectedSubject) return;
    fetch(`/api/progress?view=topic&userId=${user.id}&subjectId=${selectedSubject}`)
      .then(r => r.json())
      .then(d => setTopicProgresses(d.topicProgresses || []))
      .catch(() => {});
  }, [user?.id, selectedSubject]);

  if (loading) return <LoadingSpinner />;

  const level = stats?.level || 1;
  const totalStudyTime = studyStats?.totalDuration || 0;

  return (
    <div className="space-y-6 pb-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-emerald-600" /> Analytics
      </h2>

      {/* Overall Stats */}
      <motion.div {...fadeIn}>
        <Card className="p-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">{level}</p>
              <p className="text-emerald-100 text-xs">Level</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{stats?.totalQuestions || 0}</p>
              <p className="text-emerald-100 text-xs">Questions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{stats?.accuracy || 0}%</p>
              <p className="text-emerald-100 text-xs">Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{stats?.streak || 0}</p>
              <p className="text-emerald-100 text-xs">Day Streak</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Study Stats */}
      <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
        <h3 className="font-semibold mb-3">Study Overview</h3>
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 text-center">
            <Clock className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
            <p className="text-lg font-bold">{formatDuration(totalStudyTime)}</p>
            <p className="text-xs text-muted-foreground">Study Time</p>
          </Card>
          <Card className="p-3 text-center">
            <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
            <p className="text-lg font-bold">{stats?.longestStreak || 0}</p>
            <p className="text-xs text-muted-foreground">Best Streak</p>
          </Card>
          <Card className="p-3 text-center">
            <Coins className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
            <p className="text-lg font-bold">{stats?.coins || 0}</p>
            <p className="text-xs text-muted-foreground">Coins</p>
          </Card>
        </div>
      </motion.div>

      {/* Per-Subject Breakdown */}
      <motion.div {...fadeIn} transition={{ delay: 0.15 }}>
        <h3 className="font-semibold mb-3">Subject Performance</h3>
        <div className="space-y-3">
          {stats?.subjectProgresses?.map(sp => {
            const sub = subjects.find(s => s.id === sp.subjectId);
            return (
              <Card key={sp.id} className="p-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-xl">{sub ? (SUBJECT_ICONS[sub.name] || '📚') : '📚'}</div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{sp.subject.name}</p>
                    <p className="text-xs text-muted-foreground">{sp.questionsStudied} questions studied</p>
                  </div>
                  <Badge variant={sp.accuracy >= 70 ? 'default' : 'destructive'} className={sp.accuracy >= 70 ? 'bg-emerald-600' : ''}>
                    {sp.accuracy.toFixed(0)}%
                  </Badge>
                </div>
                <Progress value={sp.accuracy} className="h-2" />
              </Card>
            );
          })}
          {(!stats?.subjectProgresses || stats.subjectProgresses.length === 0) && (
            <p className="text-center text-muted-foreground text-sm py-4">Start studying to see your performance!</p>
          )}
        </div>
      </motion.div>

      {/* Topic Breakdown */}
      <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
        <h3 className="font-semibold mb-3">Topic Details</h3>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger>
          <SelectContent>
            {subjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
          </SelectContent>
        </Select>
        {topicProgresses.length > 0 && (
          <div className="space-y-2 mt-3 max-h-64 overflow-y-auto">
            {topicProgresses.map(tp => (
              <Card key={tp.id} className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">{tp.topic.name}</p>
                  <span className={`text-xs font-semibold ${tp.accuracy >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {tp.accuracy.toFixed(0)}%
                  </span>
                </div>
                <Progress value={tp.accuracy} className="h-1.5" />
                <p className="text-xs text-muted-foreground mt-1">{tp.totalAttempts} attempts</p>
              </Card>
            ))}
          </div>
        )}
      </motion.div>

      {/* Weak Topics */}
      {weakTopics.length > 0 && (
        <motion.div {...fadeIn} transition={{ delay: 0.25 }}>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Weak Topics
          </h3>
          <div className="space-y-2">
            {weakTopics.map(wt => (
              <Card key={wt.id} className="p-3 border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3">
                  <Target className="w-4 h-4 text-amber-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{wt.topic.name}</p>
                    <p className="text-xs text-muted-foreground">{wt.topic.subject?.name || ''} · {wt.accuracy.toFixed(0)}% accuracy</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── BOOKMARKS ───────────────────────────────────────────────
function BookmarksView() {
  const { user, subjects, setRoute } = useStore();
  const { toast } = useToast();
  const [bookmarks, setBookmarks] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const loadBookmarks = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/questions?view=bookmarks&userId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setBookmarks(data.bookmarks || []);
      }
      setLoading(false);
    } catch { setLoading(false); }
  }, [user?.id]);

  useEffect(() => { loadBookmarks(); }, [loadBookmarks]);

  const removeBookmark = async (questionId: string) => {
    if (!user?.id) return;
    try {
      await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'bookmark', userId: user.id, questionId }),
      });
      toast({ title: 'Bookmark removed' });
      loadBookmarks();
    } catch (e) { console.error(e); }
  };

  if (loading) return <LoadingSpinner />;

  // Quiz mode
  if (quizMode && bookmarks.length > 0) {
    const q = bookmarks[currentQ];
    const options = parseOptions(q.options);
    const isCorrect = selected === q.correctAnswer;

    if (currentQ >= bookmarks.length) {
      return (
        <div className="text-center py-12 space-y-4">
          <p className="text-3xl">🎉</p>
          <h3 className="text-xl font-bold">Done!</h3>
          <p>{correctCount}/{bookmarks.length} correct</p>
          <Button onClick={() => { setQuizMode(false); setCurrentQ(0); setCorrectCount(0); }}>Back to Bookmarks</Button>
        </div>
      );
    }

    return (
      <div className="space-y-4 pb-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setQuizMode(false)}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Exit
          </Button>
          <Badge variant="secondary">{currentQ + 1}/{bookmarks.length}</Badge>
        </div>
        <Card className="p-4">
          <Badge className={getDifficultyColor(q.difficulty)}>{q.difficulty}</Badge>
          <p className="font-medium mt-2">{q.content}</p>
        </Card>
        <div className="space-y-2">
          {options.map(opt => (
            <Button
              key={opt.value}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3 px-4"
              onClick={() => {
                if (answered) return;
                setSelected(opt.value);
                setAnswered(true);
                if (opt.value === q.correctAnswer) setCorrectCount(c => c + 1);
              }}
              disabled={answered}
            >
              <span className="font-bold mr-2">{opt.label}</span> {opt.value}
            </Button>
          ))}
        </div>
        {answered && (
          <motion.div {...fadeIn} className="space-y-3">
            <Card className={`p-3 ${isCorrect ? 'border-green-200 bg-green-50 dark:bg-green-950/30' : 'border-red-200 bg-red-50 dark:bg-red-950/30'}`}>
              <p className="text-sm">{isCorrect ? '✅ Correct!' : `❌ Wrong. Answer: ${q.correctAnswer}`}</p>
              {q.explanation && <p className="text-xs text-muted-foreground mt-1">{q.explanation}</p>}
            </Card>
            <Button onClick={() => { setCurrentQ(c => c + 1); setSelected(null); setAnswered(false); }} className="w-full bg-emerald-600 hover:bg-emerald-700">
              Next
            </Button>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-yellow-500" /> Bookmarks
        </h2>
        {bookmarks.length > 0 && (
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setQuizMode(true)}>
            <Play className="w-4 h-4 mr-1" /> Practice All
          </Button>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Bookmark className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No bookmarked questions yet.</p>
          <p className="text-xs mt-1">Bookmark questions during quizzes to review later.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {bookmarks.map(q => (
            <motion.div key={q.id} {...fadeIn}>
              <Card className="p-3">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`text-xs ${getDifficultyColor(q.difficulty)}`}>{q.difficulty}</Badge>
                      {q.flagged && <Badge variant="destructive" className="text-xs">Flagged</Badge>}
                      {q.subject && <Badge variant="outline" className="text-xs">{q.subject.code}</Badge>}
                    </div>
                    <p className="text-sm font-medium">{q.content}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-destructive" onClick={() => removeBookmark(q.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── LEADERBOARD ─────────────────────────────────────────────
function LeaderboardView() {
  const { userId } = useStore();
  const [period, setPeriod] = useState<'weekly' | 'allTime'>('weekly');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/leaderboard?period=${period}`)
      .then(r => r.json())
      .then(d => { setEntries(d.entries || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [period]);

  if (loading) return <LoadingSpinner />;

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="space-y-4 pb-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Trophy className="w-5 h-5 text-amber-500" /> Leaderboard
      </h2>

      <Tabs value={period} onValueChange={(v) => setPeriod(v as 'weekly' | 'allTime')}>
        <TabsList className="w-full">
          <TabsTrigger value="weekly" className="flex-1">This Week</TabsTrigger>
          <TabsTrigger value="allTime" className="flex-1">All Time</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Top 3 */}
      {entries.length >= 3 && (
        <div className="flex justify-center items-end gap-3 py-4">
          {/* 2nd */}
          <motion.div {...scaleIn} transition={{ delay: 0.1 }} className="text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center text-lg font-bold mx-auto">
              {entries[1].user.name.charAt(0)}
            </div>
            <p className="text-xs font-medium mt-1 truncate max-w-16">{entries[1].user.name}</p>
            <p className="text-xs text-muted-foreground">{entries[1].score}</p>
            <p className="text-lg">🥈</p>
          </motion.div>
          {/* 1st */}
          <motion.div {...scaleIn} className="text-center -mt-4">
            <Crown className="w-6 h-6 text-yellow-500 mx-auto" />
            <div className="w-18 h-18 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center text-2xl font-bold mx-auto w-[72px] h-[72px]">
              {entries[0].user.name.charAt(0)}
            </div>
            <p className="text-xs font-bold mt-1 truncate max-w-20">{entries[0].user.name}</p>
            <p className="text-xs text-muted-foreground">{entries[0].score}</p>
            <p className="text-lg">🥇</p>
          </motion.div>
          {/* 3rd */}
          <motion.div {...scaleIn} transition={{ delay: 0.2 }} className="text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center text-lg font-bold mx-auto">
              {entries[2].user.name.charAt(0)}
            </div>
            <p className="text-xs font-medium mt-1 truncate max-w-16">{entries[2].user.name}</p>
            <p className="text-xs text-muted-foreground">{entries[2].score}</p>
            <p className="text-lg">🥉</p>
          </motion.div>
        </div>
      )}

      {/* Rest of entries */}
      <div className="space-y-2">
        {entries.map(entry => {
          const isCurrentUser = entry.user.id === userId;
          return (
            <motion.div key={entry.user.id} {...fadeIn}>
              <Card className={`p-3 flex items-center gap-3 ${isCurrentUser ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : ''}`}>
                <span className="text-sm font-bold w-8 text-center">{getRankIcon(entry.rank)}</span>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={isCurrentUser ? 'bg-emerald-600 text-white text-xs' : 'text-xs'}>
                    {entry.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{entry.user.name} {isCurrentUser && <span className="text-xs text-emerald-600">(You)</span>}</p>
                  <p className="text-xs text-muted-foreground">{entry.user.currentStreak} day streak</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{entry.score}</p>
                  <p className="text-xs text-muted-foreground">coins</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No leaderboard entries yet. Be the first!</p>
        </div>
      )}
    </div>
  );
}

// ─── SHOP ────────────────────────────────────────────────────
function ShopView() {
  const { user } = useStore();
  const { toast } = useToast();
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { refreshUser } = useStore();

  useEffect(() => {
    fetch(`/api/shop?userId=${user?.id || ''}`)
      .then(r => r.json())
      .then(d => { setItems(d.items || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [user?.id]);

  const purchase = async (itemId: string) => {
    if (!user?.id) return;
    try {
      const res = await fetch('/api/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, shopItemId: itemId }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({ title: 'Error', description: data.error, variant: 'destructive' });
        return;
      }
      toast({ title: 'Purchased! 🎉', description: data.message });
      setItems(prev => prev.map(item => item.id === itemId ? { ...item, owned: true } : item));
      refreshUser();
    } catch (e) { console.error(e); }
  };

  if (loading) return <LoadingSpinner />;

  const typeIcons: Record<string, string> = {
    avatar: '🎭', theme: '🎨', boost: '⚡', badge: '🏅', streak_freeze: '❄️', hint_pack: '💡',
  };

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-amber-500" /> Shop
        </h2>
        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 gap-1">
          <Coins className="w-3 h-3" /> {user?.coins || 0}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-4 text-center h-full flex flex-col justify-between">
              <div>
                <p className="text-3xl mb-2">{typeIcons[item.type] || '🎁'}</p>
                <h4 className="font-semibold text-sm">{item.name}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
              </div>
              <div className="mt-3">
                {item.owned ? (
                  <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 w-full justify-center">
                    <Check className="w-3 h-3 mr-1" /> Owned
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    className="w-full bg-amber-500 hover:bg-amber-600"
                    onClick={() => purchase(item.id)}
                    disabled={(user?.coins || 0) < item.price}
                  >
                    <Coins className="w-3 h-3 mr-1" /> {item.price}
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── EXAM COUNTDOWNS ─────────────────────────────────────────
function ExamCountdownsView() {
  const { user, subjects } = useStore();
  const { toast } = useToast();
  const [countdowns, setCountdowns] = useState<ExamCountdown[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examSubjectId, setExamSubjectId] = useState('');

  const loadCountdowns = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/exams?userId=${user.id}`);
      if (res.ok) setCountdowns(await res.json().then(d => d.countdowns || []));
      setLoading(false);
    } catch { setLoading(false); }
  }, [user?.id]);

  useEffect(() => { loadCountdowns(); }, [loadCountdowns]);

  const addCountdown = async () => {
    if (!user?.id || !examName.trim() || !examDate) return;
    try {
      await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, examName, examDate, subjectId: examSubjectId || undefined }),
      });
      toast({ title: 'Countdown added!' });
      setShowAdd(false); setExamName(''); setExamDate(''); setExamSubjectId('');
      loadCountdowns();
    } catch (e) { console.error(e); }
  };

  const deleteCountdown = async (id: string) => {
    if (!user?.id) return;
    try {
      await fetch(`/api/exams?id=${id}&userId=${user.id}`, { method: 'DELETE' });
      toast({ title: 'Countdown removed' });
      loadCountdowns();
    } catch (e) { console.error(e); }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-red-500" /> Exam Countdowns
        </h2>
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setShowAdd(true)}>
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Exam Countdown</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Exam Name</Label>
              <Input value={examName} onChange={e => setExamName(e.target.value)} placeholder="e.g. CSEC Mathematics Paper 2" />
            </div>
            <div>
              <Label>Exam Date</Label>
              <Input type="date" value={examDate} onChange={e => setExamDate(e.target.value)} />
            </div>
            <div>
              <Label>Subject (optional)</Label>
              <Select value={examSubjectId} onValueChange={setExamSubjectId}>
                <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                <SelectContent>
                  {subjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addCountdown} className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={!examName.trim() || !examDate}>
              Add Countdown
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {countdowns.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No exam countdowns yet.</p>
          <p className="text-xs mt-1">Add your upcoming exams to track preparation time.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {countdowns.map(c => (
            <motion.div key={c.id} {...fadeIn}>
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0 ${
                    c.isPast ? 'bg-gray-100 text-gray-400 dark:bg-gray-800' :
                    c.daysRemaining < 7 ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                    c.daysRemaining < 30 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                    'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {c.isPast ? '✓' : c.daysRemaining}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{c.examName}</h4>
                    <p className="text-xs text-muted-foreground">
                      {c.subject?.name || 'General'} · {new Date(c.examDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {c.isPast ? 'Completed' : `${c.daysRemaining} days remaining`}
                    </p>
                  </div>
                  {!c.isPast && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteCountdown(c.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SBA TEMPLATES ───────────────────────────────────────────
function SBATemplatesView() {
  const { subjects } = useStore();
  const [templates, setTemplates] = useState<SBATemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);

  useEffect(() => {
    const params = selectedSubject ? `?subjectId=${selectedSubject}` : '';
    fetch(`/api/sba${params}`)
      .then(r => r.json())
      .then(d => { setTemplates(d.templates || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [selectedSubject]);

  if (loading) return <LoadingSpinner />;

  const parseStructure = (str: string) => {
    try { return JSON.parse(str); }
    catch { return null; }
  };

  return (
    <div className="space-y-4 pb-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <FileText className="w-5 h-5 text-emerald-600" /> SBA Templates
      </h2>

      <Select value={selectedSubject} onValueChange={setSelectedSubject}>
        <SelectTrigger><SelectValue placeholder="All subjects" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="">All subjects</SelectItem>
          {subjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
        </SelectContent>
      </Select>

      {templates.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No SBA templates available yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {templates.map(tmpl => {
            const structure = parseStructure(tmpl.structure);
            const isExpanded = expandedTemplate === tmpl.id;
            return (
              <motion.div key={tmpl.id} {...fadeIn}>
                <Card className="overflow-hidden">
                  <button
                    className="w-full p-4 text-left flex items-center gap-3"
                    onClick={() => setExpandedTemplate(isExpanded ? null : tmpl.id)}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: tmpl.subject.color + '20' }}>
                      {SUBJECT_ICONS[tmpl.subject.name] || '📚'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{tmpl.title}</h4>
                      <p className="text-xs text-muted-foreground">{tmpl.subject.name}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  {isExpanded && (
                    <motion.div {...fadeIn} className="px-4 pb-4 border-t">
                      {tmpl.description && <p className="text-sm mt-3 text-muted-foreground">{tmpl.description}</p>}
                      {structure && typeof structure === 'object' && (
                        <div className="mt-3 space-y-2">
                          {Object.entries(structure).map(([key, value]) => (
                            <div key={key} className="bg-muted rounded-lg p-3">
                              <p className="font-medium text-sm capitalize">{key.replace(/_/g, ' ')}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                      {typeof structure === 'string' && (
                        <pre className="mt-3 text-xs bg-muted rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
                          {structure}
                        </pre>
                      )}
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── PROFILE ─────────────────────────────────────────────────
function ProfileView() {
  const { user, setRoute, logout, refreshUser } = useStore();
  const { toast } = useToast();
  const { setTheme, theme } = useTheme();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');

  const handleExport = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/export?userId=${user.id}`);
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cxc-ace-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: 'Data exported!' });
    } catch (e) { console.error(e); }
  };

  const menuItems = [
    { icon: BookMarked, label: 'Bookmarks', route: '#bookmarks', color: 'text-yellow-500' },
    { icon: ShoppingBag, label: 'Shop', route: '#shop', color: 'text-amber-500' },
    { icon: Calendar, label: 'Exam Countdowns', route: '#exams', color: 'text-red-500' },
    { icon: FileText, label: 'SBA Templates', route: '#sba', color: 'text-emerald-500' },
  ];

  return (
    <div className="space-y-6 pb-4">
      {/* Profile Header */}
      <motion.div {...fadeIn}>
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-emerald-300">
              <AvatarFallback className="bg-emerald-600 text-white text-2xl">
                {user?.name?.charAt(0)?.toUpperCase() || 'S'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              {user?.bio && <p className="text-xs text-muted-foreground mt-1">{user.bio}</p>}
              <div className="flex items-center gap-3 mt-2 text-sm">
                <Badge variant="secondary" className="gap-1"><Shield className="w-3 h-3" /> Level {Math.floor(Math.sqrt((useStore.getState().stats?.totalQuestions || 0) / 5)) + 1}</Badge>
                <Badge variant="secondary" className="gap-1"><Coins className="w-3 h-3" /> {user?.coins}</Badge>
                <Badge variant="secondary" className="gap-1"><Flame className="w-3 h-3" /> {user?.currentStreak}</Badge>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Menu */}
      <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
        <div className="grid grid-cols-2 gap-3">
          {menuItems.map(item => (
            <motion.button key={item.route} whileTap={{ scale: 0.97 }} onClick={() => setRoute(item.route)}>
              <Card className="p-4 hover:shadow-md transition-shadow h-full">
                <item.icon className={`w-6 h-6 mb-2 ${item.color}`} />
                <p className="font-semibold text-sm">{item.label}</p>
              </Card>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div {...fadeIn} transition={{ delay: 0.15 }}>
        <h3 className="font-semibold text-lg mb-3">Settings</h3>
        <Card className="divide-y">
          {/* Dark Mode */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? <Moon className="w-5 h-5 text-blue-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
              <div>
                <p className="text-sm font-medium">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Toggle theme preference</p>
              </div>
            </div>
            <Switch checked={theme === 'dark'} onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
          </div>

          {/* Export Data */}
          <button className="p-4 flex items-center justify-between w-full text-left hover:bg-muted/50 transition-colors" onClick={handleExport}>
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-emerald-500" />
              <div>
                <p className="text-sm font-medium">Export Data</p>
                <p className="text-xs text-muted-foreground">Download all your progress</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* About */}
          <div className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
              <p className="text-sm font-medium">About CXC Ace</p>
            </div>
            <p className="text-xs text-muted-foreground ml-8">
              Your Caribbean exam prep companion for CSEC and CAPE students.
              Study smarter with AI-powered tutoring, flashcards, quizzes, and progress tracking.
            </p>
            <p className="text-xs text-muted-foreground ml-8 mt-1">Version 1.0.0</p>
          </div>
        </Card>
      </motion.div>

      {/* Logout */}
      <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
        <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10" onClick={logout}>
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </Button>
      </motion.div>
    </div>
  );
}

// ─── STUDY HUB (Tab Content for "Study") ────────────────────
function StudyHub() {
  const [tab, setTab] = useState('flashcards');

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Study Hub</h2>
        <p className="text-sm text-muted-foreground">Flashcards, AI Tutor, Notes & Timer</p>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="flashcards" className="text-xs">
            <Layers className="w-3.5 h-3.5 mr-1 hidden sm:inline" /> Cards
          </TabsTrigger>
          <TabsTrigger value="tutor" className="text-xs">
            <MessageCircle className="w-3.5 h-3.5 mr-1 hidden sm:inline" /> Tutor
          </TabsTrigger>
          <TabsTrigger value="notes" className="text-xs">
            <StickyNote className="w-3.5 h-3.5 mr-1 hidden sm:inline" /> Notes
          </TabsTrigger>
          <TabsTrigger value="timer" className="text-xs">
            <Timer className="w-3.5 h-3.5 mr-1 hidden sm:inline" /> Timer
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="mt-4">
        {tab === 'flashcards' && <FlashcardsView />}
        {tab === 'tutor' && <AITutor />}
        {tab === 'notes' && <NotesView />}
        {tab === 'timer' && <StudyTimer />}
      </div>
    </div>
  );
}

// ─── PROGRESS HUB (Tab Content for "Progress") ──────────────
function ProgressHub() {
  const [tab, setTab] = useState('analytics');

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Progress</h2>
        <p className="text-sm text-muted-foreground">Analytics, Bookmarks & Leaderboard</p>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="analytics" className="text-xs">
            <BarChart3 className="w-3.5 h-3.5 mr-1 hidden sm:inline" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="bookmarks" className="text-xs">
            <Bookmark className="w-3.5 h-3.5 mr-1 hidden sm:inline" /> Saved
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="text-xs">
            <Trophy className="w-3.5 h-3.5 mr-1 hidden sm:inline" /> Ranks
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="mt-4">
        {tab === 'analytics' && <AnalyticsDashboard />}
        {tab === 'bookmarks' && <BookmarksView />}
        {tab === 'leaderboard' && <LeaderboardView />}
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────
export default function Home() {
  const { userId, route, setRoute, fetchSubjects, refreshUser, setLoading, isLoading } = useStore();

  useEffect(() => {
    const init = async () => {
      await fetchSubjects();
      if (userId) {
        try {
          const res = await fetch(`/api/auth?userId=${userId}`);
          if (res.ok) {
            const data = await res.json();
            useStore.getState().setUser(data.user);
          } else {
            // User not found, clear localStorage
            localStorage.removeItem('cxc-ace-userId');
            useStore.getState().setUserId(''); // trigger re-render
          }
        } catch (e) { console.error(e); }
      }
      setLoading(false);
    };
    init();
  }, []);

  // Hash change listener
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash || '#home';
      if (hash !== route) setRoute(hash);
    };
    window.addEventListener('hashchange', handleHash);
    // Set initial route from hash
    if (window.location.hash) {
      setRoute(window.location.hash);
    }
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigate = useCallback((newRoute: string) => {
    window.location.hash = newRoute;
    setRoute(newRoute);
  }, []);

  // Override setRoute to also update hash
  useEffect(() => {
    const originalSetRoute = useStore.getState().setRoute;
    // We handle this in the navigate function
  }, []);

  // Loading screen
  if (isLoading && userId) {
    return <LoadingSpinner text="Loading your data..." />;
  }

  // Not logged in
  if (!userId) {
    return <AuthScreen />;
  }

  // Determine which view to show
  const getView = () => {
    // Quiz routes
    if (route === '#subjects') return <SubjectSelection />;
    if (route.startsWith('#quiz-config-')) {
      const subjectId = route.replace('#quiz-config-', '');
      return <QuizConfig subjectId={subjectId} />;
    }
    if (route.startsWith('#quiz-taking-')) {
      const configStr = route.replace('#quiz-taking-', '');
      return <QuizTaking configStr={configStr} />;
    }
    if (route.startsWith('#quiz-') && route !== '#quiz') {
      // Subject quick-start from home
      const subjectId = route.replace('#quiz-', '');
      if (subjectId.length > 10) return <QuizConfig subjectId={subjectId} />;
    }

    // Study sub-routes (shown inside StudyHub tabs)
    if (route.startsWith('#tutor') || route.startsWith('#notes') || route.startsWith('#timer') || route.startsWith('#flashcard')) {
      return <StudyHub />;
    }

    // Profile sub-routes
    if (route === '#bookmarks') return <BookmarksView />;
    if (route === '#shop') return <ShopView />;
    if (route === '#exams') return <ExamCountdownsView />;
    if (route === '#sba') return <SBATemplatesView />;
    if (route === '#settings') return <ProfileView />;

    // Main tabs
    if (route === '#home') return <HomeDashboard />;
    if (route === '#quiz') return <SubjectSelection />;
    if (route === '#study') return <StudyHub />;
    if (route === '#progress') return <ProgressHub />;
    if (route === '#profile') return <ProfileView />;

    return <HomeDashboard />;
  };

  // Determine active bottom tab
  const getActiveTab = () => {
    if (route === '#home' || route === '#' || route === '') return 'home';
    if (route.startsWith('#quiz') || route.startsWith('#subjects')) return 'quiz';
    if (route.startsWith('#study') || route.startsWith('#tutor') || route.startsWith('#notes') || route.startsWith('#timer') || route.startsWith('#flashcard')) return 'study';
    if (route.startsWith('#progress') || route.startsWith('#bookmarks') || route.startsWith('#leaderboard') || route.startsWith('#analytics')) return 'progress';
    return 'profile';
  };

  const activeTab = getActiveTab();

  const tabs = [
    { id: 'home', icon: Home, label: 'Home', route: '#home' },
    { id: 'quiz', icon: BookOpen, label: 'Quiz', route: '#quiz' },
    { id: 'study', icon: Brain, label: 'Study', route: '#study' },
    { id: 'progress', icon: BarChart3, label: 'Progress', route: '#progress' },
    { id: 'profile', icon: User, label: 'Profile', route: '#profile' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 pt-4 pb-20 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={route}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {getView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t z-50">
        <div className="max-w-lg mx-auto flex">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.route)}
                className={`flex-1 flex flex-col items-center py-2 pt-3 transition-colors ${
                  isActive ? 'text-emerald-600' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="relative"
                >
                  {isActive && (
                    <motion.div
                      layoutId="tabIndicator"
                      className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-1 bg-emerald-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <tab.icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : ''}`} />
                </motion.div>
                <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : ''}`}>{tab.label}</span>
              </button>
            );
          })}
        </div>
        {/* Safe area padding for iOS */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );
}

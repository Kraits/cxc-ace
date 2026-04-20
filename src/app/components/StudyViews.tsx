'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useStore, formatDuration, SUBJECT_ICONS, fadeIn, slideIn,
  type StudySession, type Note,
} from '@/app/lib/store';
import { Timer, Play, Pause, RotateCcw, Clock, Layers, MessageCircle, StickyNote, BookOpen, ChevronRight, ChevronLeft, Search, GraduationCap } from '@/app/lib/icons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import FlashcardsView from './FlashcardsView';
import AITutor from './AITutor';
import NotesView from './NotesView';

// ─── Study Guides Library ──────────────────────────────────
function StudyGuides() {
  const { subjects, setRoute } = useStore();
  const [guides, setGuides] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/notes?view=shared')
      .then(r => r.json())
      .then(d => { setGuides(d.notes || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = guides.filter(g => {
    if (search && !g.title.toLowerCase().includes(search.toLowerCase()) && !g.content.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedSubject !== 'ALL' && g.subject?.id !== selectedSubject) return false;
    return true;
  });

  // Group by subject
  const grouped = new Map<string, Note[]>();
  filtered.forEach(g => {
    const key = g.subject?.name || 'Other';
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(g);
  });

  if (expandedGuide) {
    const guide = guides.find(g => g.id === expandedGuide);
    if (!guide) return null;
    return (
      <div className="space-y-4 pb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setExpandedGuide(null)}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            {guide.subject && (
              <Badge variant="outline" className="text-xs mb-1" style={{ borderColor: guide.subject.color }}>
                {SUBJECT_ICONS[guide.subject.name] || '📚'} {guide.subject.name}
              </Badge>
            )}
            <h2 className="text-lg font-bold">{guide.title}</h2>
          </div>
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none bg-white dark:bg-zinc-900 rounded-xl p-5 border">
          <div className="whitespace-pre-wrap leading-relaxed text-sm" dangerouslySetInnerHTML={{
            __html: guide.content
              .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-3 text-emerald-700 dark:text-emerald-400">$1</h1>')
              .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-5 mb-2 border-b pb-1">$1</h2>')
              .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-1">$1</h3>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
              .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
              .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 list-decimal">$1</li>')
              .replace(/^---$/gm, '<hr class="my-4 border-zinc-200 dark:border-zinc-700">')
          }} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <GraduationCap className="w-5 h-5 text-emerald-600" /> Study Guides
      </h2>
      <p className="text-sm text-muted-foreground">Comprehensive notes for every topic across all subjects</p>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <motion.div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
        </div>
      ) : (
        <>
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search study guides..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Subject Filter */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            <Button
              size="sm" variant={selectedSubject === 'ALL' ? 'default' : 'outline'}
              onClick={() => setSelectedSubject('ALL')}
              className={selectedSubject === 'ALL' ? 'bg-emerald-600 hover:bg-emerald-700 shrink-0' : 'shrink-0'}
            >
              All
            </Button>
            {subjects.map(s => (
              <Button
                key={s.id}
                size="sm" variant={selectedSubject === s.id ? 'default' : 'outline'}
                onClick={() => setSelectedSubject(s.id)}
                className={selectedSubject === s.id ? 'bg-emerald-600 hover:bg-emerald-700 shrink-0' : 'shrink-0'}
              >
                {SUBJECT_ICONS[s.name] || '📚'} {s.name}
              </Button>
            ))}
          </div>

          {/* Guides List */}
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No study guides found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Array.from(grouped.entries()).map(([subjectName, subjectGuides]) => {
                const sub = subjects.find(s => s.name === subjectName);
                return (
                  <div key={subjectName}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{SUBJECT_ICONS[subjectName] || '📚'}</span>
                      <h3 className="font-semibold text-sm">{subjectName}</h3>
                      <Badge variant="secondary" className="text-xs">{subjectGuides.length} guides</Badge>
                    </div>
                    <div className="space-y-2 ml-7">
                      {subjectGuides.map(guide => (
                        <motion.button
                          key={guide.id}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setExpandedGuide(guide.id)}
                          className="w-full text-left"
                        >
                          <Card className="p-3 hover:shadow-md transition-all border hover:border-emerald-300 dark:hover:border-emerald-700">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{guide.title.replace('Study Guide: ', '')}</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {guide.content.length > 200 ? Math.floor(guide.content.length / 200) + ' sections' : 'Quick guide'}
                                </p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </Card>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function StudyTimer() {
  const { user, subjects } = useStore();
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

export function StudyHub() {
  const [tab, setTab] = useState('guides');

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Study Hub</h2>
        <p className="text-sm text-muted-foreground">Flashcards, AI Tutor, Notes & Timer</p>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full grid grid-cols-5">
          <TabsTrigger value="guides" className="text-xs">
            <BookOpen className="w-3.5 h-3.5 mr-1 hidden sm:inline" /> Guides
          </TabsTrigger>
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
        {tab === 'guides' && <StudyGuides />}
        {tab === 'flashcards' && <FlashcardsView />}
        {tab === 'tutor' && <AITutor />}
        {tab === 'notes' && <NotesView />}
        {tab === 'timer' && <StudyTimer />}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  useStore, formatDuration, SUBJECT_ICONS,
  type StudySession,
} from '@/app/lib/store';
import { Timer, Play, Pause, RotateCcw, Clock, Layers, MessageCircle, StickyNote } from '@/app/lib/icons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import FlashcardsView from './FlashcardsView';
import AITutor from './AITutor';
import NotesView from './NotesView';

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

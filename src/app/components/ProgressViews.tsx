'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  useStore, LoadingSpinner, fadeIn, formatDuration, getDifficultyColor,
  parseOptions, SUBJECT_ICONS, type TopicProgress, type Question,
} from '@/app/lib/store';
import {
  BarChart3, Clock, Flame, Coins, Target, AlertTriangle,
  Bookmark, Play, Trash2, Trophy, ArrowLeft,
} from '@/app/lib/icons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { LeaderboardView } from './SocialViews';

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

function BookmarksView() {
  const { user, setRoute } = useStore();
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

export function ProgressHub() {
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

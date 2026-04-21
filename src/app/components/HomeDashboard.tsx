'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useStore, SUBJECT_ICONS, getRandomQuote, fadeIn, type ExamCountdown, type TopicProgress } from '@/app/lib/store';
import { Shield, Flame, Coins, Activity, Target, TrendingUp, BookOpen, ChevronRight, Calendar, AlertTriangle } from '@/app/lib/icons';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function HomeDashboard() {
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

      {/* Quick Quiz - Start with one tap */}
      <motion.div {...fadeIn} transition={{ delay: 0.12 }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" /> Quick Quiz
          </h3>
          <Button variant="ghost" size="sm" onClick={() => setRoute('#quiz')}>
            All Subjects <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {subjects.slice(0, 9).map(sub => (
            <motion.button
              key={sub.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                const params = new URLSearchParams({ subjectId: sub.id, count: '10' });
                setRoute(`#quiz-taking-practice-${encodeURIComponent(params.toString())}`);
              }}
              className="text-left"
            >
              <Card className="p-3 hover:shadow-md transition-all border hover:border-emerald-300 dark:hover:border-emerald-700">
                <div className="text-2xl text-center mb-1">{SUBJECT_ICONS[sub.name] || '📚'}</div>
                <p className="text-xs font-medium text-center leading-tight">{sub.name}</p>
                <p className="text-[10px] text-muted-foreground text-center">{sub._count?.questions || 0} Q</p>
              </Card>
            </motion.button>
          ))}
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
          {subjects.slice(0, 6).map(sub => {
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
                  <p className="font-medium text-sm">{wt.topic?.name || 'Unknown Topic'}</p>
                  <p className="text-xs text-muted-foreground">{wt.topic?.subject?.name || ''}</p>
                </div>
                <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  {(wt.accuracy ?? 0).toFixed(0)}%
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

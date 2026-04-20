'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useStore, parseOptions, getDifficultyColor, LoadingSpinner,
  fadeIn, slideIn, scaleIn,
  SUBJECT_ICONS, type Question,
} from '@/app/lib/store';
import {
  ArrowLeft, Bookmark, Check, X, Dumbbell, Timer, Play,
  ChevronRight, HomeIcon, RotateCcw, CheckCircle2, XCircle,
  Sparkles, Zap,
} from '@/app/lib/icons';
import { Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export function SubjectSelection() {
  const { subjects, setRoute, stats, user } = useStore();

  const startQuickQuizAll = () => {
    const params = new URLSearchParams();
    params.set('count', '10');
    if (user?.id) params.set('userId', user.id);
    setRoute(`#quiz-taking-practice-${encodeURIComponent(params.toString())}`);
  };

  const startQuickQuizSubject = (e: React.MouseEvent, subjectId: string) => {
    e.stopPropagation();
    const params = new URLSearchParams();
    params.set('subjectId', subjectId);
    params.set('count', '5');
    if (user?.id) params.set('userId', user.id);
    setRoute(`#quiz-taking-practice-${encodeURIComponent(params.toString())}`);
  };

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setRoute('#quiz')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-bold">Choose a Subject</h2>
      </div>

      {/* Quick Quiz Card — All Subjects */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div whileTap={{ scale: 0.98 }}>
          <Card
            className="relative overflow-hidden cursor-pointer border-2 border-emerald-400 dark:border-emerald-600 hover:shadow-lg hover:border-emerald-500 transition-all duration-200"
            onClick={startQuickQuizAll}
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 opacity-10 dark:opacity-20" />
            <div className="relative flex items-center gap-4 p-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                <Shuffle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-emerald-700 dark:text-emerald-400">Quick Quiz</h3>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  10 random questions across all subjects
                </p>
              </div>
              <div className="flex-shrink-0 flex items-center gap-1">
                <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 hover:bg-emerald-100 border-0 text-xs">
                  <Zap className="w-3 h-3 mr-1" /> Practice
                </Badge>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Subject Grid */}
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
              className="text-left relative"
            >
              <Card className="p-4 h-full hover:shadow-lg transition-all duration-200 border-2 hover:border-emerald-300 dark:hover:border-emerald-700">
                <div className="flex items-start justify-between">
                  <div className="text-3xl mb-2">{SUBJECT_ICONS[sub.name] || '📚'}</div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-7 px-2 text-xs font-semibold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:hover:bg-emerald-900/60 shrink-0"
                    onClick={(e) => startQuickQuizSubject(e, sub.id)}
                  >
                    <Zap className="w-3 h-3 mr-0.5" /> Quick
                  </Button>
                </div>
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

export function QuizConfig({ subjectId }: { subjectId: string }) {
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

export function QuizTaking({ configStr }: { configStr: string }) {
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

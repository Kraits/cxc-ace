'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useStore, parseOptions, LoadingSpinner,
  fadeIn, slideIn, scaleIn,
  SUBJECT_ICONS, type Question,
} from '@/app/lib/store';
import {
  ArrowLeft, Clock, AlertTriangle, GraduationCap,
  ChevronRight, ChevronLeft, HomeIcon, CheckCircle2, XCircle,
  Check, X, Bookmark,
} from '@/app/lib/icons';
import { Flag, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from '@/components/ui/dialog';

// ─── Helper Functions ──────────────────────────────────────

function isCAPESubject(subjectName: string): boolean {
  return subjectName.startsWith('CAPE ') ||
    subjectName === 'Pure Mathematics' ||
    subjectName === 'Caribbean Studies' ||
    subjectName === 'Applied Mathematics' ||
    subjectName === 'Communication Studies' ||
    subjectName === 'Sociology' ||
    subjectName === 'Management of Business' ||
    subjectName === 'Accounting' ||
    subjectName === 'Computer Science' ||
    subjectName === 'Law';
}

function getExamTypeLabel(subjectName: string): string {
  return isCAPESubject(subjectName) ? 'CAPE Unit 1' : 'CXC Paper 1';
}

function getTimePerQuestion(subjectName: string): number {
  return isCAPESubject(subjectName) ? 2 : 1.25;
}

function formatTimerDisplay(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function formatTimeTaken(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function getCXCGrade(percentage: number): { grade: string; label: string; color: string; bgColor: string } {
  if (percentage >= 80) return { grade: 'I', label: 'Outstanding', color: 'text-emerald-700 dark:text-emerald-300', bgColor: 'bg-emerald-100 dark:bg-emerald-900/50' };
  if (percentage >= 70) return { grade: 'II', label: 'Good', color: 'text-blue-700 dark:text-blue-300', bgColor: 'bg-blue-100 dark:bg-blue-900/50' };
  if (percentage >= 60) return { grade: 'III', label: 'Satisfactory', color: 'text-amber-700 dark:text-amber-300', bgColor: 'bg-amber-100 dark:bg-amber-900/50' };
  if (percentage >= 50) return { grade: 'IV', label: 'Adequate', color: 'text-orange-700 dark:text-orange-300', bgColor: 'bg-orange-100 dark:bg-orange-900/50' };
  if (percentage >= 40) return { grade: 'V', label: 'Weak', color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-900/50' };
  return { grade: 'VI', label: 'Poor', color: 'text-red-800 dark:text-red-300', bgColor: 'bg-red-200 dark:bg-red-900/60' };
}

function getGradeEmoji(percentage: number): string {
  if (percentage >= 80) return '🏆';
  if (percentage >= 70) return '🌟';
  if (percentage >= 60) return '👏';
  if (percentage >= 50) return '📚';
  if (percentage >= 40) return '💪';
  return '📖';
}

// ─── RealExamSelection ────────────────────────────────────

export function RealExamSelection() {
  const { subjects, setRoute } = useStore();

  const startExam = (subjectId: string, subjectName: string) => {
    const examType = isCAPESubject(subjectName) ? 'cape' : 'cxc';
    const params = new URLSearchParams();
    params.set('subjectId', subjectId);
    params.set('examType', examType);
    setRoute(`#real-exam-taking-${encodeURIComponent(params.toString())}`);
  };

  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setRoute('#quiz')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-amber-600" />
          <h2 className="text-xl font-bold">Real Exams</h2>
        </div>
      </div>

      {/* Description */}
      <motion.p {...fadeIn} className="text-sm text-muted-foreground">
        Simulate real CXC exam conditions. Timed tests with no feedback until submission — just like the real thing.
      </motion.p>

      {/* Exam Cards */}
      <div className="space-y-3">
        {subjects.map((sub, i) => {
          const questionCount = sub._count?.questions || 0;
          if (questionCount === 0) return null;
          const timePerQ = getTimePerQuestion(sub.name);
          const totalMinutes = Math.ceil(questionCount * timePerQ);
          const examType = getExamTypeLabel(sub.name);
          const isCape = isCAPESubject(sub.name);

          return (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <motion.div whileTap={{ scale: 0.98 }}>
                <Card
                  className="relative overflow-hidden cursor-pointer border-2 border-amber-300 dark:border-amber-700 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-lg transition-all duration-200"
                  onClick={() => startExam(sub.id, sub.name)}
                >
                  {/* Gradient border effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${
                    isCape
                      ? 'from-purple-500 via-indigo-500 to-purple-600'
                      : 'from-amber-400 via-orange-500 to-amber-500'
                  } opacity-[0.07] dark:opacity-[0.12]`} />

                  <div className="relative flex items-center gap-4 p-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center shadow-md text-2xl ${
                      isCape
                        ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
                        : 'bg-gradient-to-br from-amber-500 to-orange-500'
                    }`}>
                      {SUBJECT_ICONS[sub.name] || '📚'}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-base">{sub.name}</h3>
                        <Badge className={`text-xs border-0 ${
                          isCape
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                        }`}>
                          {examType}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-3">
                        <span>{questionCount} questions</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {totalMinutes} min
                        </span>
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0">
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── RealExamTaking ────────────────────────────────────────

export function RealExamTaking({ configStr }: { configStr: string }) {
  const { setRoute, user, refreshStats } = useStore();

  const config = useMemo(() => {
    try {
      const params = new URLSearchParams(decodeURIComponent(configStr));
      return {
        subjectId: params.get('subjectId') || '',
        examType: (params.get('examType') || 'cxc') as 'cxc' | 'cape',
      };
    } catch {
      return { subjectId: '', examType: 'cxc' as const };
    }
  }, [configStr]);

  // Exam state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());

  // Timer
  const [totalTime, setTotalTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeWarningShownRef = useRef(false);

  // Dialogs
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);

  // Results
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewQ, setReviewQ] = useState(0);

  const submitExamRef = useRef<((auto?: boolean) => void) | null>(null);
  const answersListRef = useRef(0);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const params = new URLSearchParams();
        params.set('subjectId', config.subjectId);
        params.set('count', '100');
        params.set('exam', 'true');
        const res = await fetch(`/api/questions?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        const fetched: Question[] = data.questions || [];
        setQuestions(fetched);

        // Calculate time
        const subjectName = fetched[0]?.subject?.name || '';
        const timePerQ = getTimePerQuestion(subjectName);
        const total = Math.ceil(fetched.length * timePerQ) * 60;
        setTotalTime(total);
        setTimeLeft(total);
        setLoading(false);
      } catch {
        setLoadError(true);
        setLoading(false);
      }
    };
    if (config.subjectId) fetchQuestions();
  }, [config.subjectId]);

  // Timer countdown
  useEffect(() => {
    if (examSubmitted || loading || questions.length === 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examSubmitted, loading, questions.length]);

  // Auto-submit and warnings
  useEffect(() => {
    if (timeLeft === 0 && !examSubmitted) {
      submitExamRef.current?.(true);
    }
    if (timeLeft === 300 && !timeWarningShownRef.current && !examSubmitted && !showResults) {
      setShowTimeWarning(true);
      timeWarningShownRef.current = true;
    }
  }, [timeLeft, examSubmitted, showResults]);

  // Current question
  const q = questions[currentQ];
  const options = q ? parseOptions(q.options) : [];
  const subjectName = questions[0]?.subject?.name || '';
  const examTypeLabel = getExamTypeLabel(subjectName);
  const isLowTime = timeLeft <= 300 && !examSubmitted;
  const answeredCount = answers.size;
  const unansweredCount = questions.length - answeredCount;

  // Select answer
  const handleSelectAnswer = useCallback((value: string) => {
    if (examSubmitted || !q) return;
    setAnswers(prev => {
      const next = new Map(prev);
      next.set(q.id, value);
      return next;
    });
  }, [examSubmitted, q]);

  // Toggle mark for review
  const toggleMarkReview = useCallback(() => {
    if (examSubmitted || !q) return;
    setMarkedForReview(prev => {
      const next = new Set(prev);
      if (next.has(q.id)) next.delete(q.id);
      else next.add(q.id);
      return next;
    });
  }, [examSubmitted, q]);

  // Submit exam
  const submitExam = useCallback(async (autoSubmit = false) => {
    if (examSubmitted) return;
    setExamSubmitted(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const timeTaken = totalTime - timeLeft;
    let correctCount = 0;

    // Build answers array for batch submit
    const answersList: Array<{ questionId: string; isCorrect: boolean }> = [];
    questions.forEach(question => {
      const userAnswer = answers.get(question.id);
      if (userAnswer) {
        const isCorrect = userAnswer === question.correctAnswer;
        if (isCorrect) correctCount++;
        answersList.push({ questionId: question.id, isCorrect });
      }
    });

    // Single batch API call instead of 100 individual calls
    if (user?.id && answersList.length > 0) {
      answersListRef.current = answersList.length;
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'batch-submit', userId: user.id, answers: answersList }),
        });
      } catch (e) {
        console.error('Failed to submit exam results:', e);
      }

      // Refresh stats
      setTimeout(() => {
        useStore.getState().refreshStats();
      }, 500);
    }

    // Store results for display
    setExamResultData({
      correctCount,
      timeTaken,
    });

    setShowResults(true);
  }, [examSubmitted, totalTime, timeLeft, user?.id, questions, answers]);

  submitExamRef.current = submitExam;

  const [examResultData, setExamResultData] = useState({ correctCount: 0, timeTaken: 0 });

  // Topic breakdown for results
  const topicBreakdown = useMemo(() => {
    if (!showResults) return [];
    const topics: Record<string, { name: string; total: number; correct: number }> = {};
    questions.forEach(question => {
      const topicName = question.topic?.name || 'General';
      if (!topics[topicName]) topics[topicName] = { name: topicName, total: 0, correct: 0 };
      topics[topicName].total++;
      const userAnswer = answers.get(question.id);
      if (userAnswer === question.correctAnswer) topics[topicName].correct++;
    });
    return Object.values(topics).map(t => ({
      ...t,
      accuracy: t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0,
    }));
  }, [showResults, questions, answers]);

  // ─── Loading State ────────────────────────────────────
  if (loading) {
    return <LoadingSpinner text="Preparing your exam..." />;
  }

  if (loadError || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-muted-foreground">No questions available for this exam.</p>
        <Button onClick={() => setRoute('#real-exam')}>Back to Exams</Button>
      </div>
    );
  }

  // ─── Results View ─────────────────────────────────────
  if (showResults && !reviewMode) {
    const { correctCount, timeTaken } = examResultData;
    const answeredTotal = answersListRef.current;
    const percentage = answeredTotal > 0 ? Math.round((correctCount / answeredTotal) * 100) : 0;
    const grade = getCXCGrade(percentage);
    const xpGained = correctCount * 10 + (questions.length - correctCount) * 2 + 50;
    const coinsGained = correctCount * 5 + (questions.length - correctCount) * 2 + 25;
    const markedCount = markedForReview.size;

    return (
      <motion.div {...scaleIn} className="space-y-5 pb-6">
        {/* Header */}
        <div className="text-center">
          <motion.div
            className="text-5xl mb-2 inline-block"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
          >
            {getGradeEmoji(percentage)}
          </motion.div>
          <h2 className="text-2xl font-bold">Exam Complete!</h2>
          <p className="text-sm text-muted-foreground mt-1">{subjectName} — {examTypeLabel}</p>
        </div>

        {/* Grade Display */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
          className="flex justify-center"
        >
          <div className={`relative w-36 h-36 rounded-2xl ${grade.bgColor} flex flex-col items-center justify-center shadow-lg border-2 border-white/50`}>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Grade</span>
            <span className={`text-5xl font-black ${grade.color} leading-none`}>{grade.grade}</span>
            <span className={`text-xs font-medium mt-1 ${grade.color}`}>{grade.label}</span>
          </div>
        </motion.div>

        {/* Score Stats */}
        <Card className="p-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{correctCount}<span className="text-muted-foreground font-normal">/{answeredTotal}</span></p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${grade.color}`}>{percentage}%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">{formatTimeTaken(timeTaken)}</p>
              <p className="text-xs text-muted-foreground">Time Taken</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-500">+{coinsGained}</p>
              <p className="text-xs text-muted-foreground">Coins Earned</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t flex justify-center gap-2">
            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border-0 text-xs">
              +{xpGained} XP
            </Badge>
            {markedCount > 0 && (
              <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400 border-0 text-xs">
                {markedCount} marked for review
              </Badge>
            )}
          </div>
        </Card>

        {/* Topic Breakdown */}
        {topicBreakdown.length > 0 && (
          <Card className="p-4">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-amber-600" />
              Topic Breakdown
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {topicBreakdown.map((topic, i) => (
                <motion.div
                  key={topic.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium truncate mr-2">{topic.name}</span>
                    <span className="text-muted-foreground shrink-0">{topic.accuracy}% ({topic.correct}/{topic.total})</span>
                  </div>
                  <Progress
                    value={topic.accuracy}
                    className="h-2"
                  />
                </motion.div>
              ))}
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-1">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setRoute('#real-exam')}
          >
            <HomeIcon className="w-4 h-4 mr-2" /> Back to Exams
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
            onClick={() => {
              setReviewMode(true);
              setReviewQ(0);
            }}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" /> Review Answers
          </Button>
        </div>
      </motion.div>
    );
  }

  // ─── Answer Review View ───────────────────────────────
  if (showResults && reviewMode) {
    const rq = questions[reviewQ];
    const rOptions = rq ? parseOptions(rq.options) : [];
    const userAnswer = rq ? answers.get(rq.id) : null;
    const isCorrectAnswer = userAnswer === rq?.correctAnswer;

    return (
      <div className="space-y-4 pb-6">
        {/* Review Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setReviewMode(false)}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Results
          </Button>
          <Badge variant="secondary" className="font-mono">
            {reviewQ + 1}/{questions.length}
          </Badge>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={reviewQ} {...slideIn} transition={{ duration: 0.25 }}>
            <Card className="p-5">
              {/* Question header */}
              <div className="flex items-start justify-between mb-3">
                <Badge className={isCorrectAnswer
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                }>
                  {isCorrectAnswer ? (
                    <><Check className="w-3 h-3 mr-1" /> Correct</>
                  ) : (
                    <><X className="w-3 h-3 mr-1" /> Incorrect</>
                  )}
                </Badge>
                {rq?.topic && (
                  <span className="text-xs text-muted-foreground">{rq.topic.name}</span>
                )}
              </div>

              {/* Question text */}
              <p className="font-medium text-base leading-relaxed">{rq?.content}</p>
            </Card>

            {/* Options */}
            <div className="space-y-2 mt-3">
              {rOptions.map((opt) => {
                const isSelected = opt.value === userAnswer;
                const isCorrect = opt.value === rq?.correctAnswer;
                let borderColor = 'border-border';
                let bgColor = '';
                if (isCorrect) {
                  borderColor = 'border-green-500';
                  bgColor = 'bg-green-50 dark:bg-green-950/30';
                } else if (isSelected && !isCorrect) {
                  borderColor = 'border-red-500';
                  bgColor = 'bg-red-50 dark:bg-red-950/30';
                }

                return (
                  <div
                    key={opt.value}
                    className={`w-full text-left p-3.5 rounded-xl border-2 transition-all ${borderColor} ${bgColor}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isCorrect ? 'bg-green-500 text-white' :
                        isSelected && !isCorrect ? 'bg-red-500 text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {isCorrect ? <Check className="w-3.5 h-3.5" /> :
                         isSelected && !isCorrect ? <X className="w-3.5 h-3.5" /> :
                         opt.label}
                      </div>
                      <span className="text-sm">{opt.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* If unanswered */}
            {!userAnswer && (
              <Card className="mt-3 p-3 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/30">
                <p className="text-sm text-orange-700 dark:text-orange-400 font-medium">Not answered</p>
                <p className="text-xs text-orange-600 dark:text-orange-500 mt-1">
                  Correct answer: <strong>{rq?.correctAnswer}</strong>
                </p>
              </Card>
            )}

            {/* Explanation */}
            {rq?.explanation && (
              <Card className="mt-3 p-4 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">Explanation</p>
                <p className="text-sm text-blue-800 dark:text-blue-300">{rq.explanation}</p>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Review Navigation */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            disabled={reviewQ === 0}
            onClick={() => setReviewQ(r => r - 1)}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={reviewQ === questions.length - 1}
            onClick={() => setReviewQ(r => r + 1)}
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Review Question Navigator */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 px-1" style={{ scrollbarWidth: 'none' }}>
          {questions.map((question, i) => {
            const isThisCorrect = answers.get(question.id) === question.correctAnswer;
            const isUnanswered = !answers.has(question.id);
            const isCurrent = i === reviewQ;
            return (
              <button
                key={question.id}
                onClick={() => setReviewQ(i)}
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                  isCurrent ? 'ring-2 ring-amber-500 ring-offset-2 ring-offset-background scale-110' : ''
                } ${
                  isUnanswered ? 'bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400' :
                  isThisCorrect ? 'bg-emerald-500 text-white' :
                  'bg-red-500 text-white'
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── Exam Taking View ─────────────────────────────────
  return (
    <div className="space-y-3 pb-4">
      {/* Exam Header */}
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/30 shrink-0"
          onClick={() => setShowSubmitDialog(true)}
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Submit
        </Button>

        {/* Timer */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-mono font-bold ${
          isLowTime
            ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 animate-pulse'
            : 'bg-muted text-foreground'
        }`}>
          {isLowTime && <AlertTriangle className="w-3.5 h-3.5" />}
          <Clock className={`w-3.5 h-3.5 ${isLowTime ? 'text-red-600 dark:text-red-400' : ''}`} />
          {formatTimerDisplay(timeLeft)}
        </div>

        {/* Question counter */}
        <Badge variant="secondary" className="shrink-0">
          Q {currentQ + 1}/{questions.length}
        </Badge>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <Progress value={(answeredCount / questions.length) * 100} className="h-2 flex-1" />
        <span className="text-xs text-muted-foreground font-medium w-16 text-right">
          {answeredCount}/{questions.length}
        </span>
      </div>

      {/* Marked for review info */}
      {markedForReview.has(q?.id) && (
        <motion.div {...fadeIn} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800">
          <Flag className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
          <span className="text-xs text-orange-700 dark:text-orange-400 font-medium">Marked for review</span>
        </motion.div>
      )}

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div key={currentQ} {...slideIn} transition={{ duration: 0.25 }}>
          <Card className="p-5">
            <div className="flex items-start justify-between mb-3">
              <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                Q{currentQ + 1}
              </Badge>
              {q?.topic && (
                <span className="text-xs text-muted-foreground">{q.topic.name}</span>
              )}
            </div>
            <p className="font-medium text-base leading-relaxed">{q?.content}</p>
          </Card>

          {/* Options - No feedback during exam */}
          <div className="space-y-2 mt-3">
            {options.map((opt) => {
              const isSelected = answers.get(q?.id || '') === opt.value;

              return (
                <motion.button
                  key={opt.value}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectAnswer(opt.value)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer hover:border-amber-300 dark:hover:border-amber-700 ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30'
                      : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-amber-500 text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {opt.label}
                    </div>
                    <span className="text-sm">{opt.value}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Mark for review + navigation */}
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="ghost"
              size="sm"
              className={`text-xs ${markedForReview.has(q?.id || '') ? 'text-orange-600' : 'text-muted-foreground'}`}
              onClick={toggleMarkReview}
            >
              <Flag className={`w-4 h-4 mr-1.5 ${markedForReview.has(q?.id || '') ? 'fill-orange-500 text-orange-500' : ''}`} />
              {markedForReview.has(q?.id || '') ? 'Unmark review' : 'Mark for review'}
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentQ === 0}
                onClick={() => setCurrentQ(c => c - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                disabled={currentQ === questions.length - 1}
                onClick={() => setCurrentQ(c => c + 1)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Question Navigator */}
      <Card className="p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-muted-foreground">Question Navigator</span>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-muted inline-block" /> Empty
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Answered
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" /> Flagged
            </span>
          </div>
        </div>
        <div
          className="flex gap-1.5 overflow-x-auto pb-1 px-0.5"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {questions.map((question, i) => {
            const isAnswered = answers.has(question.id);
            const isCurrent = i === currentQ;
            const isMarked = markedForReview.has(question.id);

            return (
              <button
                key={question.id}
                onClick={() => setCurrentQ(i)}
                className={`relative flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCurrent ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-background scale-110' : ''
                } ${
                  isAnswered ? 'bg-amber-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {i + 1}
                {isMarked && (
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-orange-500 border-2 border-background" />
                )}
              </button>
            );
          })}
        </div>
      </Card>

      {/* ─── Submit Confirmation Dialog ──────────────────── */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-amber-600" />
              Submit Exam?
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your exam? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Answered</span>
              <span className="font-semibold text-emerald-600">{answeredCount}/{questions.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Unanswered</span>
              <span className={`font-semibold ${unansweredCount > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                {unansweredCount}
              </span>
            </div>
            {markedForReview.size > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Marked for review</span>
                <span className="font-semibold text-orange-600">{markedForReview.size}</span>
              </div>
            )}
            {unansweredCount > 0 && (
              <div className="mt-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <p className="text-xs text-amber-700 dark:text-amber-400 font-medium flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  You have {unansweredCount} unanswered question{unansweredCount > 1 ? 's' : ''}.
                </p>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
              Continue Exam
            </Button>
            <Button
              onClick={() => {
                setShowSubmitDialog(false);
                submitExam(false);
              }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
            >
              Submit Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── Time Warning Dialog ──────────────────────────── */}
      <Dialog open={showTimeWarning} onOpenChange={setShowTimeWarning}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              5 Minutes Remaining!
            </DialogTitle>
            <DialogDescription>
              You have less than 5 minutes left. Please review your answers and prepare to submit.
            </DialogDescription>
          </DialogHeader>
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Answered</span>
              <span className="font-semibold">{answeredCount}/{questions.length}</span>
            </div>
            {unansweredCount > 0 && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                {unansweredCount} question{unansweredCount > 1 ? 's' : ''} still unanswered
              </p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowTimeWarning(false)}>
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

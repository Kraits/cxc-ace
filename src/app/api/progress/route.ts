import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// ── POST /api/progress/submit ────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'submit') {
      return handleSubmit(body);
    }

    if (action === 'batch-submit') {
      return handleBatchSubmit(body);
    }

    return NextResponse.json({ error: 'Invalid action. Use submit or batch-submit.' }, { status: 400 });
  } catch (error) {
    console.error('[PROGRESS POST ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── GET handlers ─────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const view = searchParams.get('view') || 'stats';
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    if (view === 'stats') {
      return getStats(userId);
    }

    if (view === 'topic') {
      const subjectId = searchParams.get('subjectId');
      if (!subjectId) {
        return NextResponse.json({ error: 'subjectId is required for topic view' }, { status: 400 });
      }
      return getTopicBreakdown(userId, subjectId);
    }

    if (view === 'weak') {
      return getWeakTopics(userId);
    }

    return NextResponse.json({ error: 'Invalid view. Use stats, topic, or weak.' }, { status: 400 });
  } catch (error) {
    console.error('[PROGRESS GET ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── Submit quiz result ───────────────────────────────────────
async function handleSubmit(body: Record<string, unknown>) {
  const { userId, questionId, isCorrect, timeTaken } = body as {
    userId: string;
    questionId: string;
    isCorrect: boolean;
    timeTaken?: number;
  };

  if (!userId || !questionId || typeof isCorrect !== 'boolean') {
    return NextResponse.json(
      { error: 'userId, questionId, and isCorrect are required' },
      { status: 400 }
    );
  }

  // Fetch question with topic & subject info
  const question = await db.question.findUnique({
    where: { id: questionId },
    include: { topic: true, subject: true },
  });

  if (!question) {
    return NextResponse.json({ error: 'Question not found' }, { status: 404 });
  }

  // 1. Update UserQuestionProgress (upsert)
  const questionProgress = await db.userQuestionProgress.upsert({
    where: { userId_questionId: { userId, questionId } },
    create: {
      userId,
      questionId,
      attempts: 1,
      correct: isCorrect ? 1 : 0,
      mastered: isCorrect,
      lastAttemptAt: new Date(),
    },
    update: {
      attempts: { increment: 1 },
      correct: isCorrect ? { increment: 1 } : undefined,
      mastered: isCorrect,
      lastAttemptAt: new Date(),
    },
  });

  // 2. Update UserTopicProgress (if question has a topic)
  if (question.topicId) {
    const existingTP = await db.userTopicProgress.findUnique({
      where: { userId_topicId: { userId, topicId: question.topicId } },
    });

    const newAttempts = (existingTP?.totalAttempts ?? 0) + 1;
    const newCorrect = (existingTP?.correctAttempts ?? 0) + (isCorrect ? 1 : 0);
    const newAccuracy = Math.round((newCorrect / newAttempts) * 10000) / 100;

    await db.userTopicProgress.upsert({
      where: { userId_topicId: { userId, topicId: question.topicId } },
      create: {
        userId,
        topicId: question.topicId,
        totalAttempts: newAttempts,
        correctAttempts: newCorrect,
        accuracy: newAccuracy,
        lastStudiedAt: new Date(),
      },
      update: {
        totalAttempts: newAttempts,
        correctAttempts: newCorrect,
        accuracy: newAccuracy,
        lastStudiedAt: new Date(),
      },
    });
  }

  // 3. Update UserSubjectProgress
  const existingSP = await db.userSubjectProgress.findUnique({
    where: { userId_subjectId: { userId, subjectId: question.subjectId } },
  });

  const spAttempts = (existingSP?.totalAttempts ?? 0) + 1;
  const spCorrect = (existingSP?.correctAttempts ?? 0) + (isCorrect ? 1 : 0);
  const spAccuracy = Math.round((spCorrect / spAttempts) * 10000) / 100;

  await db.userSubjectProgress.upsert({
    where: { userId_subjectId: { userId, subjectId: question.subjectId } },
    create: {
      userId,
      subjectId: question.subjectId,
      totalAttempts: spAttempts,
      correctAttempts: spCorrect,
      accuracy: spAccuracy,
      questionsStudied: 1,
      lastStudiedAt: new Date(),
    },
    update: {
      totalAttempts: spAttempts,
      correctAttempts: spCorrect,
      accuracy: spAccuracy,
      questionsStudied: { increment: 1 },
      lastStudiedAt: new Date(),
    },
  });

  // 4. Update user XP, coins, streak
  const xpGain = isCorrect ? 10 : 2;
  const coinsGain = isCorrect ? 5 : 1;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const user = await db.user.findUnique({ where: { id: userId } });
  let streakIncrement = 0;

  if (user) {
    const lastStudy = user.lastStudyAt ? new Date(user.lastStudyAt) : null;
    if (lastStudy) {
      lastStudy.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((today.getTime() - lastStudy.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        streakIncrement = 1; // consecutive day
      } else if (diffDays > 1) {
        streakIncrement = 0; // streak broken, reset to 1 below
      }
      // diffDays === 0 means already studied today, no streak change
    } else {
      streakIncrement = 1; // first study ever
    }

    const newStreak = streakIncrement > 0 ? user.currentStreak + streakIncrement : (lastStudy ? (Math.floor((today.getTime() - lastStudy.getTime()) / (1000 * 60 * 60 * 24)) > 1 ? 1 : user.currentStreak) : 1);
    const newLongestStreak = Math.max(user.longestStreak, newStreak);

    await db.user.update({
      where: { id: userId },
      data: {
        coins: { increment: coinsGain },
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastStudyAt: new Date(),
      },
    });
  }

  return NextResponse.json({
    success: true,
    questionProgress,
    xpGain,
    coinsGain,
  });
}

// ── Batch submit exam results (single request for all questions) ──
async function handleBatchSubmit(body: Record<string, unknown>) {
  const { userId, answers } = body as {
    userId: string;
    answers: Array<{ questionId: string; isCorrect: boolean }>;
  };

  if (!userId || !answers || !Array.isArray(answers)) {
    return NextResponse.json(
      { error: 'userId and answers array are required' },
      { status: 400 }
    );
  }

  // Fetch all questions with topic & subject in a single query
  const questionIds = answers.map(a => a.questionId);
  const questions = await db.question.findMany({
    where: { id: { in: questionIds } },
    include: { topic: true, subject: true },
  });

  const questionMap = new Map(questions.map(q => [q.id, q]));

  // Track totals for user update
  let totalXp = 0;
  let totalCoins = 0;
  let correctCount = 0;

  // Process each answer
  for (const answer of answers) {
    const question = questionMap.get(answer.questionId);
    if (!question) continue;

    if (answer.isCorrect) {
      totalXp += 10;
      totalCoins += 5;
      correctCount++;
    } else {
      totalXp += 2;
      totalCoins += 1;
    }

    // 1. Upsert UserQuestionProgress
    await db.userQuestionProgress.upsert({
      where: { userId_questionId: { userId, questionId: answer.questionId } },
      create: {
        userId,
        questionId: answer.questionId,
        attempts: 1,
        correct: answer.isCorrect ? 1 : 0,
        mastered: answer.isCorrect,
        lastAttemptAt: new Date(),
      },
      update: {
        attempts: { increment: 1 },
        correct: answer.isCorrect ? { increment: 1 } : undefined,
        mastered: answer.isCorrect,
        lastAttemptAt: new Date(),
      },
    });

    // 2. Upsert UserTopicProgress
    if (question.topicId) {
      const existingTP = await db.userTopicProgress.findUnique({
        where: { userId_topicId: { userId, topicId: question.topicId } },
      });

      const newAttempts = (existingTP?.totalAttempts ?? 0) + 1;
      const newCorrect = (existingTP?.correctAttempts ?? 0) + (answer.isCorrect ? 1 : 0);
      const newAccuracy = Math.round((newCorrect / newAttempts) * 10000) / 100;

      await db.userTopicProgress.upsert({
        where: { userId_topicId: { userId, topicId: question.topicId } },
        create: {
          userId,
          topicId: question.topicId,
          totalAttempts: newAttempts,
          correctAttempts: newCorrect,
          accuracy: newAccuracy,
          lastStudiedAt: new Date(),
        },
        update: {
          totalAttempts: newAttempts,
          correctAttempts: newCorrect,
          accuracy: newAccuracy,
          lastStudiedAt: new Date(),
        },
      });
    }

    // 3. Upsert UserSubjectProgress
    const existingSP = await db.userSubjectProgress.findUnique({
      where: { userId_subjectId: { userId, subjectId: question.subjectId } },
    });

    const spAttempts = (existingSP?.totalAttempts ?? 0) + 1;
    const spCorrect = (existingSP?.correctAttempts ?? 0) + (answer.isCorrect ? 1 : 0);
    const spAccuracy = Math.round((spCorrect / spAttempts) * 10000) / 100;

    await db.userSubjectProgress.upsert({
      where: { userId_subjectId: { userId, subjectId: question.subjectId } },
      create: {
        userId,
        subjectId: question.subjectId,
        totalAttempts: spAttempts,
        correctAttempts: spCorrect,
        accuracy: spAccuracy,
        questionsStudied: 1,
        lastStudiedAt: new Date(),
      },
      update: {
        totalAttempts: spAttempts,
        correctAttempts: spCorrect,
        accuracy: spAccuracy,
        questionsStudied: { increment: 1 },
        lastStudiedAt: new Date(),
      },
    });
  }

  // 4. Update user XP, coins, streak once
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const user = await db.user.findUnique({ where: { id: userId } });

  if (user) {
    const lastStudy = user.lastStudyAt ? new Date(user.lastStudyAt) : null;
    let streakIncrement = 0;

    if (lastStudy) {
      lastStudy.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((today.getTime() - lastStudy.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        streakIncrement = 1;
      } else if (diffDays > 1) {
        streakIncrement = 0;
      }
    } else {
      streakIncrement = 1;
    }

    const newStreak = streakIncrement > 0
      ? user.currentStreak + streakIncrement
      : (lastStudy ? (Math.floor((today.getTime() - lastStudy.getTime()) / (1000 * 60 * 60 * 24)) > 1 ? 1 : user.currentStreak) : 1);
    const newLongestStreak = Math.max(user.longestStreak, newStreak);

    await db.user.update({
      where: { id: userId },
      data: {
        coins: { increment: totalCoins },
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastStudyAt: new Date(),
      },
    });
  }

  return NextResponse.json({
    success: true,
    correctCount,
    totalAnswered: answers.length,
    xpGain: totalXp,
    coinsGain: totalCoins,
  });
}

// ── Get overall stats ────────────────────────────────────────
async function getStats(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      currentStreak: true,
      longestStreak: true,
      coins: true,
      createdAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const totalProgress = await db.userQuestionProgress.aggregate({
    where: { userId },
    _sum: { attempts: true, correct: true },
  });

  const totalQuestions = totalProgress._sum.attempts ?? 0;
  const totalCorrect = totalProgress._sum.correct ?? 0;
  const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 10000) / 100 : 0;

  // Calculate level from total questions answered
  const level = Math.floor(Math.sqrt(totalQuestions / 5)) + 1;

  const subjectProgresses = await db.userSubjectProgress.findMany({
    where: { userId },
    include: { subject: { select: { name: true, code: true, color: true } } },
  });

  return NextResponse.json({
    user,
    totalQuestions,
    totalCorrect,
    accuracy,
    streak: user.currentStreak,
    longestStreak: user.longestStreak,
    coins: user.coins,
    level,
    subjectProgresses,
  });
}

// ── Get topic breakdown ──────────────────────────────────────
async function getTopicBreakdown(userId: string, subjectId: string) {
  const topicProgresses = await db.userTopicProgress.findMany({
    where: {
      userId,
      topic: { subjectId },
    },
    include: {
      topic: { select: { id: true, name: true, order: true } },
    },
    orderBy: { topic: { order: 'asc' } },
  });

  return NextResponse.json({ topicProgresses });
}

// ── Get weak topics ──────────────────────────────────────────
async function getWeakTopics(userId: string) {
  const weakTopics = await db.userTopicProgress.findMany({
    where: {
      userId,
      accuracy: { lt: 70 },
      totalAttempts: { gte: 3 }, // at least 3 attempts to be meaningful
    },
    include: {
      topic: {
        select: { name: true, subject: { select: { name: true, code: true } } },
      },
    },
    orderBy: { accuracy: 'asc' },
    take: 10,
  });

  return NextResponse.json({ weakTopics });
}

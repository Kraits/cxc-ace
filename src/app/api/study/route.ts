import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// ── POST /api/study/session ──────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      userId,
      subjectId,
      topicId,
      type,
      durationSeconds,
      questionsAnswered,
      correctAnswers,
      startedAt,
      endedAt,
    } = body as {
      userId: string;
      subjectId?: string;
      topicId?: string;
      type?: string;
      durationSeconds?: number;
      questionsAnswered?: number;
      correctAnswers?: number;
      startedAt: string;
      endedAt?: string;
    };

    if (!userId || !startedAt) {
      return NextResponse.json({ error: 'userId and startedAt are required' }, { status: 400 });
    }

    const session = await db.studySession.create({
      data: {
        userId,
        subjectId: subjectId ?? null,
        topicId: topicId ?? null,
        type: type ?? 'general',
        durationSeconds: durationSeconds ?? 0,
        questionsAnswered: questionsAnswered ?? 0,
        correctAnswers: correctAnswers ?? 0,
        startedAt: new Date(startedAt),
        endedAt: endedAt ? new Date(endedAt) : null,
      },
      include: {
        subject: { select: { id: true, name: true, code: true, color: true } },
        topic: { select: { id: true, name: true } },
      },
    });

    // Update user streak
    await db.user.update({
      where: { id: userId },
      data: { lastStudyAt: new Date() },
    });

    return NextResponse.json({ session }, { status: 201 });
  } catch (error) {
    console.error('[STUDY POST ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── GET /api/study/sessions ──────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 30;

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const sessions = await db.studySession.findMany({
      where: { userId },
      include: {
        subject: { select: { id: true, name: true, code: true, color: true } },
        topic: { select: { id: true, name: true } },
      },
      orderBy: { startedAt: 'desc' },
      take: Math.min(limit, 100),
    });

    // Aggregate stats
    const totalDuration = sessions.reduce((sum, s) => sum + s.durationSeconds, 0);
    const totalSessions = sessions.length;
    const totalQuestions = sessions.reduce((sum, s) => sum + s.questionsAnswered, 0);
    const totalCorrect = sessions.reduce((sum, s) => sum + s.correctAnswers, 0);
    const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 10000) / 100 : 0;

    return NextResponse.json({
      sessions,
      stats: {
        totalDuration,
        totalSessions,
        totalQuestions,
        totalCorrect,
        accuracy,
      },
    });
  } catch (error) {
    console.error('[STUDY GET ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// ── GET /api/questions ───────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const view = searchParams.get('view');
    const userId = searchParams.get('userId');
    const subjectId = searchParams.get('subjectId');
    const topicId = searchParams.get('topicId');
    const difficulty = searchParams.get('difficulty');
    const count = searchParams.get('count');
    const type = searchParams.get('type');

    // Bookmarked questions
    if (view === 'bookmarks') {
      if (!userId) {
        return NextResponse.json({ error: 'userId is required for bookmarks' }, { status: 400 });
      }

      const bookmarks = await db.bookmark.findMany({
        where: { userId },
        include: {
          question: {
            include: {
              topic: { select: { id: true, name: true } },
              subject: { select: { id: true, name: true, code: true, color: true } },
              tags: { include: { tag: { select: { id: true, name: true, color: true } } } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({
        bookmarks: bookmarks.map((b) => ({
          ...b.question,
          bookmarkId: b.id,
          bookmarkedAt: b.createdAt,
          flagged: b.flagged,
          bookmarkNote: b.note,
        })),
      });
    }

    // Questions with filters
    // Include APPROVED questions or those with no status set (for backward compat with seeded data)
    const where: Record<string, unknown> = {
      OR: [
        { status: 'APPROVED' },
        { status: null },
      ],
    };

    if (subjectId) where.subjectId = subjectId;
    if (topicId) where.topicId = topicId;
    if (difficulty) where.difficulty = difficulty;
    if (type) where.type = type;

    const take = count ? parseInt(count, 10) : 20;

    // Fetch all matching questions first, then shuffle for random order
    const allMatching = await db.question.findMany({
      where,
      include: {
        topic: { select: { id: true, name: true } },
        subject: { select: { id: true, name: true, code: true, color: true } },
        tags: { include: { tag: { select: { id: true, name: true, color: true } } } },
      },
      take: Math.min(take * 3, 300), // fetch more so shuffle still has enough
      orderBy: { createdAt: 'desc' },
    });

    // Fisher-Yates shuffle for random question order
    const shuffled = [...allMatching];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const questions = shuffled.slice(0, Math.min(take, 100));

    // If user is logged in, include their progress
    let enrichedQuestions = questions;
    if (userId) {
      const progress = await db.userQuestionProgress.findMany({
        where: {
          userId,
          questionId: { in: questions.map((q) => q.id) },
        },
        select: { questionId: true, attempts: true, correct: true, mastered: true },
      });

      const progressMap = new Map(progress.map((p) => [p.questionId, p]));
      enrichedQuestions = questions.map((q) => ({
        ...q,
        progress: progressMap.get(q.id) ?? null,
      }));
    }

    return NextResponse.json({ questions: enrichedQuestions });
  } catch (error) {
    console.error('[QUESTIONS GET ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── POST /api/questions ──────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'bookmark') {
      return toggleBookmark(body);
    }

    if (action === 'submit') {
      return submitContent(body);
    }

    return NextResponse.json(
      { error: 'Invalid action. Use bookmark or submit.' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[QUESTIONS POST ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── Toggle bookmark ──────────────────────────────────────────
async function toggleBookmark(body: Record<string, unknown>) {
  const { userId, questionId, flagged, note } = body as {
    userId: string;
    questionId: string;
    flagged?: boolean;
    note?: string;
  };

  if (!userId || !questionId) {
    return NextResponse.json({ error: 'userId and questionId are required' }, { status: 400 });
  }

  // Check if bookmark exists
  const existing = await db.bookmark.findUnique({
    where: { userId_questionId: { userId, questionId } },
  });

  if (existing) {
    // Remove bookmark
    await db.bookmark.delete({ where: { id: existing.id } });
    return NextResponse.json({ bookmarked: false, message: 'Bookmark removed' });
  }

  // Create bookmark
  const bookmark = await db.bookmark.create({
    data: {
      userId,
      questionId,
      flagged: flagged ?? false,
      note: note ?? null,
    },
  });

  return NextResponse.json({ bookmarked: true, bookmark, message: 'Question bookmarked' });
}

// ── Submit teacher content ───────────────────────────────────
async function submitContent(body: Record<string, unknown>) {
  const { userId, type, title, content } = body as {
    userId: string;
    type: string;
    title: string;
    content: string;
  };

  if (!userId || !type || !title || !content) {
    return NextResponse.json(
      { error: 'userId, type, title, and content are required' },
      { status: 400 }
    );
  }

  const submission = await db.contentSubmission.create({
    data: {
      type,
      title,
      content,
      submittedById: userId,
      status: 'PENDING',
    },
  });

  return NextResponse.json(
    { submission, message: 'Content submitted for review' },
    { status: 201 }
  );
}

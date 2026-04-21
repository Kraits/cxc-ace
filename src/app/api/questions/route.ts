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

    const take = count ? Math.min(parseInt(count, 10), 100) : 20;
    const isExam = searchParams.get('exam') === 'true';

    // Use SQLite RANDOM() for efficient DB-level random ordering (no over-fetching)
    // Build params array for SQL injection protection
    const sqlParams: string[] = [];
    let paramIndex = 1;

    let whereClause = "q.status = 'APPROVED'";
    if (subjectId) {
      whereClause += ` AND q."subjectId" = $${paramIndex++}`;
      sqlParams.push(subjectId);
    }
    if (topicId) {
      whereClause += ` AND q."topicId" = $${paramIndex++}`;
      sqlParams.push(topicId);
    }
    if (difficulty) {
      whereClause += ` AND q.difficulty = $${paramIndex++}`;
      sqlParams.push(difficulty);
    }
    if (type) {
      whereClause += ` AND q.type = $${paramIndex++}`;
      sqlParams.push(type);
    }

    const questions = await db.$queryRawUnsafe<Array<Record<string, unknown>>>(
      `SELECT q.id, q.type, q.difficulty, q.content, q.explanation, q.options, q.correctAnswer,
             q.subjectId, q.topicId,
             t.id as "topicId_inner", t.name as "topicName",
             s.id as "subjectId_inner", s.name as "subjectName", s.code as "subjectCode", s.color as "subjectColor"
      FROM questions q
      LEFT JOIN topics t ON q."topicId" = t.id
      LEFT JOIN subjects s ON q."subjectId" = s.id
      WHERE ${whereClause}
      ORDER BY RANDOM()
      LIMIT $${paramIndex}`,
      ...sqlParams,
      take,
    );

    // Format questions to match the expected structure
    const formattedQuestions = questions.map((q) => ({
      id: q.id,
      type: q.type,
      difficulty: q.difficulty,
      content: q.content,
      explanation: q.explanation,
      options: q.options,
      correctAnswer: q.correctAnswer,
      subjectId: q.subjectId,
      topicId: q.topicId,
      subject: q.subjectName ? {
        id: q.subjectId,
        name: q.subjectName,
        code: q.subjectCode,
        color: q.subjectColor,
      } : null,
      topic: q.topicName ? {
        id: q.topicId_inner,
        name: q.topicName,
      } : null,
    }));

    // Only include user progress for non-exam queries
    let enrichedQuestions = formattedQuestions;
    if (userId && !isExam) {
      const progress = await db.userQuestionProgress.findMany({
        where: {
          userId,
          questionId: { in: formattedQuestions.map((q) => q.id as string) },
        },
        select: { questionId: true, attempts: true, correct: true, mastered: true },
      });

      const progressMap = new Map(progress.map((p) => [p.questionId, p]));
      enrichedQuestions = formattedQuestions.map((q) => ({
        ...q,
        progress: progressMap.get(q.id as string) ?? null,
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

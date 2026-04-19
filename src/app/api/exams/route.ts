import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// ── GET /api/exams/countdowns ────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const countdowns = await db.examCountdown.findMany({
      where: { userId },
      include: {
        subject: { select: { id: true, name: true, code: true, color: true } },
      },
      orderBy: { examDate: 'asc' },
    });

    // Calculate days remaining
    const now = new Date();
    const enriched = countdowns.map((c) => ({
      ...c,
      daysRemaining: Math.ceil((c.examDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
      isPast: c.examDate < now,
    }));

    return NextResponse.json({ countdowns: enriched });
  } catch (error) {
    console.error('[EXAMS GET ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── POST /api/exams/countdown ────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, subjectId, examName, examDate } = body as {
      userId: string;
      subjectId?: string;
      examName: string;
      examDate: string;
    };

    if (!userId || !examName || !examDate) {
      return NextResponse.json(
        { error: 'userId, examName, and examDate are required' },
        { status: 400 }
      );
    }

    const parsedDate = new Date(examDate);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json({ error: 'Invalid examDate format' }, { status: 400 });
    }

    const countdown = await db.examCountdown.create({
      data: {
        userId,
        subjectId: subjectId ?? null,
        examName,
        examDate: parsedDate,
      },
      include: {
        subject: { select: { id: true, name: true, code: true, color: true } },
      },
    });

    return NextResponse.json({ countdown }, { status: 201 });
  } catch (error) {
    console.error('[EXAMS POST ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── DELETE /api/exams/countdown?id=xxx ───────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const userId = searchParams.get('userId');

    if (!id || !userId) {
      return NextResponse.json({ error: 'id and userId are required' }, { status: 400 });
    }

    const countdown = await db.examCountdown.findFirst({ where: { id, userId } });
    if (!countdown) {
      return NextResponse.json({ error: 'Countdown not found' }, { status: 404 });
    }

    await db.examCountdown.delete({ where: { id } });

    return NextResponse.json({ message: 'Exam countdown deleted successfully' });
  } catch (error) {
    console.error('[EXAMS DELETE ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// ── GET /api/notes ───────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const view = searchParams.get('view');
    const userId = searchParams.get('userId');
    const id = searchParams.get('id');

    // Shared notes – no userId required
    if (view === 'shared') {
      const sharedNotes = await db.note.findMany({
        where: { isShared: true },
        include: {
          user: { select: { id: true, name: true, avatarUrl: true } },
          subject: { select: { id: true, name: true, code: true, color: true } },
        },
        orderBy: { updatedAt: 'desc' },
        take: 50,
      });
      return NextResponse.json({ notes: sharedNotes });
    }

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    // Get single note by id
    if (id) {
      const note = await db.note.findFirst({
        where: { id, userId },
        include: { subject: { select: { id: true, name: true, code: true } } },
      });

      if (!note) {
        return NextResponse.json({ error: 'Note not found' }, { status: 404 });
      }

      return NextResponse.json({ note });
    }

    // Get all user's notes
    const notes = await db.note.findMany({
      where: { userId },
      include: { subject: { select: { id: true, name: true, code: true, color: true } } },
      orderBy: [{ isPinned: 'desc' }, { updatedAt: 'desc' }],
    });

    return NextResponse.json({ notes });
  } catch (error) {
    console.error('[NOTES GET ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── POST /api/notes ──────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, userId, title, content, subjectId, color, isShared, isPinned } = body as {
      id?: string;
      userId: string;
      title: string;
      content?: string;
      subjectId?: string;
      color?: string;
      isShared?: boolean;
      isPinned?: boolean;
    };

    if (!userId || !title) {
      return NextResponse.json({ error: 'userId and title are required' }, { status: 400 });
    }

    // Update existing note
    if (id) {
      const existing = await db.note.findFirst({ where: { id, userId } });
      if (!existing) {
        return NextResponse.json({ error: 'Note not found' }, { status: 404 });
      }

      const note = await db.note.update({
        where: { id },
        data: {
          title,
          content: content ?? existing.content,
          subjectId: subjectId ?? existing.subjectId,
          color: color ?? existing.color,
          isShared: isShared ?? existing.isShared,
          isPinned: isPinned ?? existing.isPinned,
        },
        include: { subject: { select: { id: true, name: true, code: true } } },
      });

      return NextResponse.json({ note });
    }

    // Create new note
    const note = await db.note.create({
      data: {
        userId,
        title,
        content: content ?? '',
        subjectId: subjectId ?? null,
        color: color ?? '#ffffff',
        isShared: isShared ?? false,
        isPinned: isPinned ?? false,
      },
      include: { subject: { select: { id: true, name: true, code: true } } },
    });

    return NextResponse.json({ note }, { status: 201 });
  } catch (error) {
    console.error('[NOTES POST ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── DELETE /api/notes?id=xxx ─────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const userId = searchParams.get('userId');

    if (!id || !userId) {
      return NextResponse.json({ error: 'id and userId are required' }, { status: 400 });
    }

    const note = await db.note.findFirst({ where: { id, userId } });
    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    await db.note.delete({ where: { id } });

    return NextResponse.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('[NOTES DELETE ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

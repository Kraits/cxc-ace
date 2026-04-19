import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// ── GET /api/sba/templates ───────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subjectId = searchParams.get('subjectId');

    const where: Record<string, unknown> = { isPublic: true };
    if (subjectId) {
      where.subjectId = subjectId;
    }

    const templates = await db.sBATemplate.findMany({
      where,
      include: {
        subject: { select: { id: true, name: true, code: true, color: true } },
        createdBy: { select: { id: true, name: true, avatarUrl: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ templates });
  } catch (error) {
    console.error('[SBA GET ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── POST /api/sba/templates ──────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { createdById, subjectId, title, description, structure, isPublic } = body as {
      createdById: string;
      subjectId: string;
      title: string;
      description?: string;
      structure: string; // JSON string
      isPublic?: boolean;
    };

    if (!createdById || !subjectId || !title || !structure) {
      return NextResponse.json(
        { error: 'createdById, subjectId, title, and structure are required' },
        { status: 400 }
      );
    }

    const template = await db.sBATemplate.create({
      data: {
        createdById,
        subjectId,
        title,
        description: description ?? null,
        structure,
        isPublic: isPublic ?? true,
      },
      include: {
        subject: { select: { id: true, name: true, code: true, color: true } },
        createdBy: { select: { id: true, name: true, avatarUrl: true } },
      },
    });

    return NextResponse.json({ template }, { status: 201 });
  } catch (error) {
    console.error('[SBA POST ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

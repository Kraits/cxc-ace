import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// ── GET /api/flashcards ──────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const view = searchParams.get('view');
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    if (view === 'due') {
      return getDueCards(userId);
    }

    if (view === 'public') {
      return getPublicDecks();
    }

    // Default: get user's own decks + public decks
    const userDecks = await db.flashcardDeck.findMany({
      where: { userId },
      include: {
        subject: { select: { id: true, name: true, code: true, color: true } },
        cards: {
          select: { id: true, front: true, back: true, order: true },
          orderBy: { order: 'asc' },
        },
        _count: { select: { reviews: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });

    const publicDecks = await db.flashcardDeck.findMany({
      where: { isPublic: true, userId: { not: userId } },
      include: {
        subject: { select: { id: true, name: true, code: true, color: true } },
        cards: {
          select: { id: true, front: true, back: true, order: true },
          orderBy: { order: 'asc' },
        },
        _count: { select: { reviews: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ decks: userDecks, publicDecks });
  } catch (error) {
    console.error('[FLASHCARDS GET ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── POST /api/flashcards ─────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'createDeck') {
      return createDeck(body);
    }

    if (action === 'addCard') {
      return addCard(body);
    }

    if (action === 'review') {
      return submitReview(body);
    }

    return NextResponse.json(
      { error: 'Invalid action. Use createDeck, addCard, or review.' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[FLASHCARDS POST ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── Create deck ──────────────────────────────────────────────
async function createDeck(body: Record<string, unknown>) {
  const { userId, title, description, subjectId, isPublic } = body as {
    userId: string;
    title: string;
    description?: string;
    subjectId?: string;
    isPublic?: boolean;
  };

  if (!userId || !title) {
    return NextResponse.json({ error: 'userId and title are required' }, { status: 400 });
  }

  const deck = await db.flashcardDeck.create({
    data: {
      userId,
      title,
      description: description ?? null,
      subjectId: subjectId ?? null,
      isPublic: isPublic ?? false,
    },
  });

  return NextResponse.json({ deck }, { status: 201 });
}

// ── Add card to deck ─────────────────────────────────────────
async function addCard(body: Record<string, unknown>) {
  const { deckId, front, back, order } = body as {
    deckId: string;
    front: string;
    back: string;
    order?: number;
  };

  if (!deckId || !front || !back) {
    return NextResponse.json({ error: 'deckId, front, and back are required' }, { status: 400 });
  }

  // Get current card count for ordering
  const deck = await db.flashcardDeck.findUnique({ where: { id: deckId } });
  if (!deck) {
    return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
  }

  const card = await db.flashcardCard.create({
    data: {
      deckId,
      front,
      back,
      order: order ?? deck.cardCount,
    },
  });

  // Increment deck card count
  await db.flashcardDeck.update({
    where: { id: deckId },
    data: { cardCount: { increment: 1 } },
  });

  return NextResponse.json({ card }, { status: 201 });
}

// ── Submit card review (SM-2 algorithm) ──────────────────────
async function submitReview(body: Record<string, unknown>) {
  const { userId, deckId, cardId, quality } = body as {
    userId: string;
    deckId: string;
    cardId: string;
    quality: number; // 0-5: 0=complete failure, 3=hard, 5=perfect
  };

  if (!userId || !deckId || !cardId || typeof quality !== 'number') {
    return NextResponse.json(
      { error: 'userId, deckId, cardId, and quality (0-5) are required' },
      { status: 400 }
    );
  }

  // Clamp quality
  const q = Math.max(0, Math.min(5, quality));

  // Find existing review or create new
  const existing = await db.cardReview.findUnique({
    where: { userId_cardId: { userId, cardId } },
  });

  let ease: number;
  let interval: number;
  let repetitions: number;

  if (existing) {
    // SM-2 algorithm
    const oldEase = existing.ease;
    const oldRepetitions = existing.repetitions;
    const oldInterval = existing.interval;

    // Calculate new ease factor
    ease = Math.max(1.3, oldEase + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));

    if (q < 3) {
      // Failed: reset repetitions
      repetitions = 0;
      interval = 1;
    } else {
      // Passed: increase interval
      if (oldRepetitions === 0) {
        interval = 1;
      } else if (oldRepetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(oldInterval * ease);
      }
      repetitions = oldRepetitions + 1;
    }
  } else {
    // First review
    ease = 2.5;
    repetitions = q < 3 ? 0 : 1;
    interval = q < 3 ? 1 : 1;
  }

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  const review = await db.cardReview.upsert({
    where: { userId_cardId: { userId, cardId } },
    create: {
      userId,
      deckId,
      cardId,
      ease,
      interval,
      repetitions,
      nextReview,
      lastReview: new Date(),
    },
    update: {
      ease,
      interval,
      repetitions,
      nextReview,
      lastReview: new Date(),
    },
  });

  return NextResponse.json({ review });
}

// ── Get due cards ────────────────────────────────────────────
async function getDueCards(userId: string) {
  const now = new Date();

  const dueReviews = await db.cardReview.findMany({
    where: {
      userId,
      nextReview: { lte: now },
    },
    include: {
      card: { select: { id: true, front: true, back: true, order: true } },
      deck: { select: { id: true, title: true, subject: { select: { name: true, color: true } } } },
    },
    orderBy: { nextReview: 'asc' },
    take: 50,
  });

  return NextResponse.json({
    dueCount: dueReviews.length,
    dueCards: dueReviews,
  });
}

// ── Get all public decks ──────────────────────────────────────
async function getPublicDecks() {
  const decks = await db.flashcardDeck.findMany({
    where: { isPublic: true },
    include: {
      subject: { select: { id: true, name: true, code: true, color: true } },
      cards: {
        select: { id: true, front: true, back: true, order: true },
        orderBy: { order: 'asc' },
      },
      _count: { select: { reviews: true } },
    },
    orderBy: { createdAt: 'asc' },
  });

  return NextResponse.json({ decks });
}

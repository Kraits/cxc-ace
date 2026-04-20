import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// ── GET /api/leaderboard ─────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || 'weekly';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 20;

    if (period === 'weekly') {
      // Get current week's Monday
      const now = new Date();
      const dayOfWeek = now.getDay();
      const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      const monday = new Date(now.setDate(diff));
      monday.setHours(0, 0, 0, 0);

      const entries = await db.leaderboardEntry.findMany({
        where: { weekStart: monday },
        include: {
          user: {
            select: { id: true, name: true, avatarUrl: true, currentStreak: true },
          },
        },
        orderBy: [{ score: 'desc' }, { rank: 'asc' }],
        take: limit,
      });

      return NextResponse.json({ period, weekStart: monday, entries });
    }

    // All-time: aggregate from user stats
    const topUsers = await db.user.findMany({
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        currentStreak: true,
        longestStreak: true,
        coins: true,
      },
      orderBy: { coins: 'desc' },
      take: limit,
    });

    const entries = topUsers.map((user, index) => ({
      rank: index + 1,
      score: user.coins,
      user,
    }));

    return NextResponse.json({ period: 'allTime', entries });
  } catch (error) {
    console.error('[LEADERBOARD GET ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── POST /api/leaderboard/snapshot ───────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'snapshot') {
      return generateSnapshot();
    }

    return NextResponse.json({ error: 'Invalid action. Use snapshot.' }, { status: 400 });
  } catch (error) {
    console.error('[LEADERBOARD POST ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── Generate weekly snapshot ─────────────────────────────────
async function generateSnapshot() {
  // Get current week's Monday
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(now.getFullYear(), now.getMonth(), diff);
  monday.setHours(0, 0, 0, 0);

  // Delete existing entries for this week
  await db.leaderboardEntry.deleteMany({ where: { weekStart: monday } });

  // Get all users with their scores (coins as proxy for activity)
  const users = await db.user.findMany({
    select: { id: true, coins: true, currentStreak: true, longestStreak: true },
    orderBy: { coins: 'desc' },
  });

  // Create entries with ranks
  const entries: Awaited<ReturnType<typeof db.leaderboardEntry.create>>[] = [];
  for (let i = 0; i < users.length; i++) {
    const entry = await db.leaderboardEntry.create({
      data: {
        userId: users[i].id,
        weekStart: monday,
        score: users[i].coins,
        rank: i + 1,
      },
    });
    entries.push(entry);
  }

  return NextResponse.json({
    message: `Weekly snapshot generated for ${monday.toISOString().split('T')[0]}`,
    entryCount: entries.length,
    weekStart: monday,
  });
}

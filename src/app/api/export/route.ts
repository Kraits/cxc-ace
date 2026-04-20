import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// ── GET /api/export?userId=xxx ───────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    // Fetch all user data in parallel
    const [
      user,
      subjectProgresses,
      topicProgresses,
      questionProgresses,
      flashcardDecks,
      notes,
      studySessions,
      bookmarks,
      achievements,
      examCountdowns,
      purchases,
      notificationPrefs,
    ] = await Promise.all([
      // User profile (no password hash)
      db.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          avatarUrl: true,
          bio: true,
          currentStreak: true,
          longestStreak: true,
          coins: true,
          createdAt: true,
          updatedAt: true,
        },
      }),

      db.userSubjectProgress.findMany({
        where: { userId },
        include: { subject: { select: { name: true, code: true } } },
      }),

      db.userTopicProgress.findMany({
        where: { userId },
        include: { topic: { select: { name: true } } },
      }),

      db.userQuestionProgress.findMany({
        where: { userId },
      }),

      db.flashcardDeck.findMany({
        where: { userId },
        include: {
          cards: true,
          reviews: true,
          subject: { select: { name: true, code: true } },
        },
      }),

      db.note.findMany({
        where: { userId },
        include: { subject: { select: { name: true, code: true } } },
      }),

      db.studySession.findMany({
        where: { userId },
        include: {
          subject: { select: { name: true, code: true } },
          topic: { select: { name: true } },
        },
      }),

      db.bookmark.findMany({
        where: { userId },
        include: {
          question: {
            select: {
              id: true,
              content: true,
              type: true,
              difficulty: true,
            },
          },
        },
      }),

      db.userAchievement.findMany({
        where: { userId },
        include: {
          achievement: {
            select: { name: true, description: true, icon: true, category: true, points: true },
          },
        },
      }),

      db.examCountdown.findMany({
        where: { userId },
        include: { subject: { select: { name: true, code: true } } },
      }),

      db.purchase.findMany({
        where: { userId },
        include: {
          shopItem: {
            select: { name: true, type: true, metadata: true },
          },
        },
      }),

      db.notificationPreference.findMany({
        where: { userId },
      }),
    ]);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const exportData = {
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
      user,
      subjectProgresses,
      topicProgresses,
      questionProgresses,
      flashcardDecks,
      notes,
      studySessions,
      bookmarks,
      achievements,
      examCountdowns,
      purchases,
      notificationPreferences: notificationPrefs,
    };

    return NextResponse.json(exportData);
  } catch (error) {
    console.error('[EXPORT ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

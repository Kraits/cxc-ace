import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

// ── POST /api/auth/register ──────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'register') {
      return handleRegister(body);
    }

    if (action === 'login') {
      return handleLogin(body);
    }

    return NextResponse.json({ error: 'Invalid action. Use "register" or "login".' }, { status: 400 });
  } catch (error) {
    console.error('[AUTH ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── GET /api/auth/session?userId=xxx ─────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const user = await db.user.findUnique({
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
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('[AUTH SESSION ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── Register handler ─────────────────────────────────────────
async function handleRegister(body: Record<string, unknown>) {
  const { name, email, password } = body as { name: string; email: string; password: string };

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
  }

  // Check if user already exists
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user
  const user = await db.user.create({
    data: { name, email, passwordHash },
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
    },
  });

  return NextResponse.json({ user, message: 'Account created successfully' }, { status: 201 });
}

// ── Login handler ────────────────────────────────────────────
async function handleLogin(body: Record<string, unknown>) {
  const { email, password } = body as { email: string; password: string };

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  // Return user without passwordHash
  const { passwordHash: _ph, ...safeUser } = user;
  void _ph; // suppress unused warning

  return NextResponse.json({ user: safeUser, message: 'Login successful' });
}

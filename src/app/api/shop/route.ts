import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// ── GET /api/shop/items ──────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type');

    const where: Record<string, unknown> = { isActive: true };
    if (type) where.type = type;

    const items = await db.shopItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // If userId provided, mark which items user already owns
    let enriched = items;
    if (userId) {
      const purchases = await db.purchase.findMany({
        where: { userId },
        select: { shopItemId: true },
      });

      const ownedSet = new Set(purchases.map((p) => p.shopItemId));
      enriched = items.map((item) => ({
        ...item,
        owned: ownedSet.has(item.id),
      }));
    }

    return NextResponse.json({ items: enriched });
  } catch (error) {
    console.error('[SHOP GET ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── POST /api/shop/purchase ──────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, shopItemId } = body as {
      userId: string;
      shopItemId: string;
    };

    if (!userId || !shopItemId) {
      return NextResponse.json({ error: 'userId and shopItemId are required' }, { status: 400 });
    }

    // Fetch user and item in a transaction
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const item = await db.shopItem.findUnique({ where: { id: shopItemId } });
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    if (!item.isActive) {
      return NextResponse.json({ error: 'This item is no longer available' }, { status: 400 });
    }

    // Check if already owned
    const existingPurchase = await db.purchase.findUnique({
      where: { userId_shopItemId: { userId, shopItemId } },
    });
    if (existingPurchase) {
      return NextResponse.json({ error: 'You already own this item' }, { status: 409 });
    }

    // Check stock
    if (item.stock !== null && item.stock <= 0) {
      return NextResponse.json({ error: 'This item is out of stock' }, { status: 400 });
    }

    // Check coins
    if (user.coins < item.price) {
      return NextResponse.json(
        { error: 'Not enough coins', required: item.price, balance: user.coins },
        { status: 400 }
      );
    }

    // Execute purchase in a transaction
    const result = await db.$transaction(async (tx) => {
      // Deduct coins
      await tx.user.update({
        where: { id: userId },
        data: { coins: { decrement: item.price } },
      });

      // Create purchase record
      const purchase = await tx.purchase.create({
        data: {
          userId,
          shopItemId,
          coinsSpent: item.price,
        },
      });

      // Decrease stock if limited
      if (item.stock !== null) {
        await tx.shopItem.update({
          where: { id: shopItemId },
          data: { stock: { decrement: 1 } },
        });
      }

      return purchase;
    });

    return NextResponse.json({
      purchase: result,
      message: `Purchased "${item.name}" for ${item.price} coins`,
      newBalance: user.coins - item.price,
    });
  } catch (error) {
    console.error('[SHOP POST ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

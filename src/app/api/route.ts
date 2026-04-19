import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const subjects = await db.subject.findMany({
      include: {
        topics: {
          select: { id: true, name: true, order: true },
          orderBy: { order: "asc" },
        },
        _count: { select: { questions: true } },
      },
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ subjects });
  } catch (error) {
    console.error("[API ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

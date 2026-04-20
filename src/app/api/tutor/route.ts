import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// ── POST /api/tutor/chat ─────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { messages, subject, topic } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'messages array is required' }, { status: 400 });
    }

    const systemPrompt = `You are an expert CXC and CAPE exam tutor for Caribbean students. IMPORTANT: Always respond in English only. You help students understand concepts, solve problems, and prepare for exams. Be encouraging, clear, and concise. Use examples relevant to Caribbean education. Format math with proper notation.${
      subject ? `\n\nCurrent subject: ${subject}` : ''
    }${topic ? `\nCurrent topic: ${topic}` : ''}`;

    // Build messages array with system prompt prepended
    const chatMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    ];

    // Use z-ai-web-dev-sdk for real AI response
    const ZAI = (await import('z-ai-web-dev-sdk')).default;
    const zai = await ZAI.create();
    const response = await zai.chat.completions.create({
      messages: chatMessages,
    });

    const assistantMessage =
      response?.choices?.[0]?.message?.content ??
      response?.content ??
      response?.message ??
      'Sorry, I could not generate a response. Please try again.';

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error('[TUTOR ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to get AI response', details: String(error) },
      { status: 500 }
    );
  }
}

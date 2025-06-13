import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }

    const { messages, model = 'gpt-3.5-turbo' } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Geçersiz mesaj formatı' }, { status: 400 });
    }

    // Kullanıcının kredilerini kontrol et
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true }
    });

    if (!user || user.credits <= 0) {
      return NextResponse.json({ error: 'Yetersiz kredi' }, { status: 402 });
    }

    // Kredi kullanımını kaydet
    await prisma.creditUsage.create({
      data: {
        userId: session.user.id,
        amount: 1,
        type: 'CHAT',
        model: model
      }
    });

    // Kullanıcının kredisini güncelle
    await prisma.user.update({
      where: { id: session.user.id },
      data: { credits: { decrement: 1 } }
    });

    const response = await openai.chat.completions.create({
      model,
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      temperature: 0.7,
      max_tokens: 1000,
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Bir hata oluştu' },
      { status: 500 }
    );
  }
} 
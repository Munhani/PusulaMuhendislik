import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Chat hizmeti şu an kullanılamıyor' }, { status: 503 });
    }

    const openai = new OpenAI({ apiKey });
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

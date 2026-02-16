import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

// CORS ayarları
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// OPTIONS isteği için handler
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

function getPrismaCode(error: unknown): string | undefined {
  return error && typeof error === 'object' && 'code' in error
    ? (error as { code?: string }).code
    : undefined;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, subject } = body;

    // Veri doğrulama
    if (!name || !email || !phone || !message || !subject) {
      return NextResponse.json(
        { error: 'Tüm alanları doldurun' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Email formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi girin' },
        { status: 400, headers: corsHeaders }
      );
    }

    const canSendEmail =
      process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.CONTACT_EMAIL;

    // 1. Veritabanına kaydetmeyi dene (başarısız olursa sadece e-posta ile devam)
    let contact: { id: string; name: string; email: string; createdAt: string } | null = null;
    try {
      contact = await prisma.contact.create({
        data: { name, email, phone, subject, message },
      });
    } catch (dbError) {
      const code = getPrismaCode(dbError);
      if (code === 'P2002') {
        return NextResponse.json(
          { error: 'Bu e-posta adresi ile daha önce gönderim yapıldı.' },
          { status: 400, headers: corsHeaders }
        );
      }
      console.warn('İletişim formu: veritabanı kullanılamıyor, e-posta deneniyor.', code, dbError);
    }

    // 2. E-posta gönder
    if (canSendEmail) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: String(process.env.SMTP_PASS).replace(/\s/g, ''),
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.CONTACT_EMAIL,
          subject: `Yeni İletişim Formu: ${subject}`,
          html: `
            <h2>Yeni İletişim Formu Mesajı</h2>
            <p><strong>İsim:</strong> ${name}</p>
            <p><strong>E-posta:</strong> ${email}</p>
            <p><strong>Telefon:</strong> ${phone}</p>
            <p><strong>Konu:</strong> ${subject}</p>
            <p><strong>Mesaj:</strong></p>
            <p>${message}</p>
          `,
        });
      } catch (mailError) {
        console.error('İletişim formu e-posta gönderilemedi:', mailError);
        if (!contact) {
          console.info('[İletişim formu] Mesaj (DB ve e-posta kullanılamadı):', {
            name,
            email,
            phone,
            subject,
            message,
          });
        }
      }
    }

    return NextResponse.json(
      { success: true, contact, message: 'Mesajınız alındı, en kısa sürede dönüş yapacağız.' },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('İletişim formu hatası:', error);

    const code = getPrismaCode(error);
    const userMessage =
      code === 'P2002'
        ? 'Bu e-posta adresi ile daha önce gönderim yapıldı.'
        : code === 'P1001' || code === 'P1017'
          ? 'Veritabanına ulaşılamıyor. Lütfen daha sonra tekrar deneyin.'
          : 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';

    return NextResponse.json(
      { error: userMessage },
      { status: 500, headers: corsHeaders }
    );
  }
} 
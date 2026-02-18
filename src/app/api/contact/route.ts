import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// CORS ayarları
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi girin' },
        { status: 400, headers: corsHeaders }
      );
    }

    const canSendEmail = Boolean(
      process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.CONTACT_EMAIL
    );

    if (!canSendEmail) {
      return NextResponse.json(
        {
          error:
            'İletişim formu şu an yapılandırılmamış. Lütfen bizi doğrudan arayın: +90 212 597 97 00 veya tsivri@pusulamuhendislik.com',
        },
        { status: 503, headers: corsHeaders }
      );
    }

    const port = Number(process.env.SMTP_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
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
        <p>${String(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Mesajınız alındı, en kısa sürede dönüş yapacağız.',
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('İletişim formu hatası:', error);
    return NextResponse.json(
      {
        error:
          'E-posta gönderilemedi. Lütfen doğrudan bizi arayın: +90 212 597 97 00 veya tsivri@pusulamuhendislik.com',
      },
      { status: 503, headers: corsHeaders }
    );
  }
}

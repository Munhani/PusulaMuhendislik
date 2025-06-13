import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

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
        { error: 'Geçerli bir email adresi girin' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Veritabanına kaydet
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
      },
    });

    // Email gönder
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `Yeni İletişim Formu: ${subject}`,
      text: `
        İsim: ${name}
        Email: ${email}
        Telefon: ${phone}
        Konu: ${subject}
        Mesaj: ${message}
      `,
    });

    return NextResponse.json(
      { success: true, contact },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Hata:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500, headers: corsHeaders }
    );
  } finally {
    await prisma.$disconnect();
  }
} 
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

<<<<<<< HEAD
<<<<<<< HEAD
    // E-posta gönderici yapılandırması
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // E-posta içeriği
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'pusulamuhendislikweb@gmail.com',
      subject: `İletişim Formu: ${subject}`,
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <p><strong>İsim:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Konu:</strong> ${subject}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${message}</p>
      `,
    };

    // E-postayı gönder
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, contact, message: 'E-posta başarıyla gönderildi' },
=======
=======
>>>>>>> 15482864ec85881d2236f4414271b3ec43fac266
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
<<<<<<< HEAD
>>>>>>> 15482864ec85881d2236f4414271b3ec43fac266
=======
>>>>>>> 15482864ec85881d2236f4414271b3ec43fac266
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
import dotenv from 'dotenv/config';
import nodemailer from 'nodemailer';

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Wrap in an async IIFE so we can use await.
export const sendMail = async (email) => {
  try {
    console.log('📧 Attempting to send email to:', email);

    const info = await transporter.sendMail({
      from: '"Part Timr Collective" <part.timr.collective@gmail.com>',
      to: email,
      subject: 'Cảnh báo bảo mật',
      text: 'Tài khoản có lượt đăng nhập mới',
      html: '<b>Tài khoản có lượt đăng nhập mới</b>',
    });

    console.log('✅ Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
};

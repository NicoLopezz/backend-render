import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 Testing email configuration in production...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('EMAIL:', process.env.EMAIL);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'Set' : 'NOT SET');

const transporter = nodemailer.createTransporter({
  host: "smtp.zoho.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  logger: true,
  debug: true,
});

async function testEmail() {
  try {
    console.log('📧 Testing SMTP connection...');
    
    // Test connection
    await transporter.verify();
    console.log('✅ SMTP connection successful');
    
    // Send test email
    const result = await transporter.sendMail({
      from: `Test <${process.env.EMAIL}>`,
      to: 'nicolas.lopez1919@gmail.com', // Cambia por tu email para probar
      subject: 'Test email from Render production',
      html: '<h1>Test email</h1><p>If you receive this, email is working in production!</p>',
      text: 'Test email - If you receive this, email is working in production!'
    });
    
    console.log('✅ Test email sent successfully:', result.messageId);
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.error('Full error:', error);
  }
}

testEmail();

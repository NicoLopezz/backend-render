import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 Testing SMTP connection from Render...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('EMAIL:', process.env.EMAIL);

const transporter = nodemailer.createTransporter({
  host: "smtp.zoho.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  connectionTimeout: 5000,
  greetingTimeout: 3000,
  socketTimeout: 5000,
  logger: true,
  debug: true,
});

async function testSMTP() {
  try {
    console.log('📧 Testing SMTP connection...');
    
    // Test connection
    const isConnected = await transporter.verify();
    console.log('✅ SMTP connection successful:', isConnected);
    
    // Test sending email
    const result = await transporter.sendMail({
      from: `Test <${process.env.EMAIL}>`,
      to: 'nicolas.lopez1919@gmail.com',
      subject: 'SMTP Test from Render',
      html: '<h1>SMTP Test</h1><p>If you receive this, SMTP is working from Render!</p>',
    });
    
    console.log('✅ Test email sent successfully:', result.messageId);
    
  } catch (error) {
    console.error('❌ SMTP test failed:', error.message);
    console.error('Error code:', error.code);
    console.error('Error command:', error.command);
  }
}

testSMTP();

import { config } from 'dotenv';
import nodemailer from 'nodemailer';

config();

console.log('🔍 Testing email configuration...');
console.log('EMAIL:', process.env.EMAIL ? '✅ Configured' : '❌ Not configured');
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✅ Configured' : '❌ Not configured');

const transporter = nodemailer.createTransport({
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
    console.log('📧 Testing email connection...');
    
    const verifyResult = await transporter.verify();
    console.log('✅ SMTP connection verified:', verifyResult);
    
    console.log('📤 Sending test email...');
    const result = await transporter.sendMail({
      from: `Oxygen Group <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject: "🧪 Test Email - Oxygen Registration",
      html: `
        <h1>Test Email</h1>
        <p>This is a test email to verify the email configuration is working.</p>
        <p>Time: ${new Date().toISOString()}</p>
      `,
      text: "This is a test email to verify the email configuration is working.",
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', result.messageId);
    console.log('Accepted recipients:', result.accepted);
    
  } catch (error) {
    console.log('❌ Email test failed:');
    console.log('Error:', error.message);
    console.log('Code:', error.code);
    
    if (error.code === 'EAUTH') {
      console.log('🔑 Authentication failed. Check your email and password.');
      console.log('💡 For Zoho, make sure you\'re using the correct email and password.');
      console.log('💡 You might need to enable SMTP access in your Zoho account settings.');
    } else if (error.code === 'ECONNECTION') {
      console.log('🌐 Connection failed. Check your internet connection and SMTP settings.');
    }
  }
}

testEmail();

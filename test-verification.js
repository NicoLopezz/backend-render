import { config } from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';
import axios from 'axios';

config();

async function testVerification() {
  try {
    // Generar un token de verificación válido
    const token = jsonwebtoken.sign(
      { userMail: "test.frontend@example.com" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '24h' }
    );

    console.log('🔍 Generated verification token:', token);
    console.log('📧 Testing verification endpoint...');

    // Probar el endpoint de verificación
    const response = await axios.get(`http://localhost:10001/verify?token=${token}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Verification successful!');
    console.log('Response:', response.data);

    if (response.data.success) {
      console.log('🎉 User verified successfully!');
      console.log('Frontend should redirect to: http://localhost:3000/es/verify-success');
    }

  } catch (error) {
    console.log('❌ Verification failed!');
    if (error.response) {
      console.log('Error response:', error.response.data);
      console.log('Status:', error.response.status);
    } else {
      console.log('Error:', error.message);
    }
  }
}

testVerification();


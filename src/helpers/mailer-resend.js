import { Resend } from 'resend';
import { config } from 'dotenv';
config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmailNuevoEstilo(direccion, token) {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const baseUrl = isProduction 
      ? 'https://www.oxygentoken.org' 
      : 'http://localhost:3000';
    const verificationUrl = `${baseUrl}/es/verify-success?token=${token}`;
    
    const { data, error } = await resend.emails.send({
      from: 'Oxygen Group <noreply@oxygentoken.org>',
      to: [direccion],
      subject: '🎉 ¡Bienvenido(a) a Oxygen! - Verifica tu email',
      html: mailBienvenidaNuevoEstilo(direccion, token, verificationUrl),
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Email sent successfully with Resend:', data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    return { success: false, error: error.message };
  }
}

export async function sendWelcomeEmailNuevoEstiloEN(direccion, token) {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const baseUrl = isProduction 
      ? 'https://www.oxygentoken.org' 
      : 'http://localhost:3000';
    const verificationUrl = `${baseUrl}/en/verify-success?token=${token}`;
    
    const { data, error } = await resend.emails.send({
      from: 'Oxygen Group <noreply@oxygentoken.org>',
      to: [direccion],
      subject: '🎉 Welcome to Oxygen! - Verify your email',
      html: mailBienvenidaNuevoEstiloEN(direccion, token, verificationUrl),
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Email sent successfully with Resend:', data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    return { success: false, error: error.message };
  }
}

function mailBienvenidaNuevoEstilo(email, token, verificationUrl) {
  return `
  <html>
  <body style="font-family: Arial, sans-serif; background-color: #f8fbfa; color: #2d3748; margin:0;padding:0;">
    <div style="max-width:600px; margin:40px auto; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,77,64,0.08); overflow:hidden;">
      <div style="background:linear-gradient(135deg,#004d40 0%,#1ABC9C 100%); color:#fff; text-align:center; padding:30px 0;">
        <h1 style="margin:0; font-size:28px; font-weight:600;">OXYGEN</h1>
      </div>
      
      <div style="padding:40px 30px; text-align:center;">
        <h2 style="color:#004d40; font-size:28px; margin:0 0 20px; line-height:1.3;">
          ¡Bienvenid@!
        </h2>
        
        <p style="font-size:16px; color:#666; margin-bottom:30px; line-height:1.6;">
          Gracias por registrarte en nuestra plataforma. Para completar tu registro y acceder a todas las funcionalidades, necesitamos verificar tu dirección de email.
        </p>
        
        <div style="margin:40px 0;">
          <a href="${verificationUrl}" style="background:linear-gradient(135deg,#1ABC9C 0%,#0e9c8a 100%);color:#fff;padding:18px 40px;text-decoration:none;border-radius:8px;font-weight:600;display:inline-block;font-size:16px;box-shadow:0 4px 15px rgba(26,188,156,0.3);">
            Verificar mi email
          </a>
        </div>
        
        <hr style="border:0;border-top:1px solid #e2e8f0; margin:40px 0;">
        
        <p style="font-size:14px; color:#666; margin-bottom:20px;">
          ¿Tienes preguntas? Contáctanos en 
          <a href="mailto:support@oxygentoken.org" style="color:#1ABC9C;">support@oxygentoken.org</a>
        </p>
        
        <p style="font-style:italic; color:#999; margin:0;">
          Con gratitud,<br>El equipo Oxygen
        </p>
      </div>
      
      <div style="background:#004d40; color:#fff; text-align:center; font-size:14px; padding:20px 0;">
        <div style="margin-bottom:10px;">
          <a href="https://www.linkedin.com/company/oxygentoken/" style="margin:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn" width="24"></a>
          <a href="https://x.com/OxygenToken" style="margin:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968958.png" alt="Twitter" width="24"></a>
          <a href="https://instagram.com/oxygentoken" style="margin:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="24"></a>
        </div>
        Oxygen Token · Innovación al servicio del planeta<br>
        © 2023 Todos los derechos reservados
      </div>
    </div>
  </body>
  </html>
  `;
}

function mailBienvenidaNuevoEstiloEN(email, token, verificationUrl) {
  return `
  <html>
  <body style="font-family: Arial, sans-serif; background-color: #f8fbfa; color: #2d3748; margin:0;padding:0;">
    <div style="max-width:600px; margin:40px auto; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,77,64,0.08); overflow:hidden;">
      <div style="background:linear-gradient(135deg,#004d40 0%,#1ABC9C 100%); color:#fff; text-align:center; padding:30px 0;">
        <h1 style="margin:0; font-size:28px; font-weight:600;">OXYGEN</h1>
      </div>
      
      <div style="padding:40px 30px; text-align:center;">
        <h2 style="color:#004d40; font-size:28px; margin:0 0 20px; line-height:1.3;">
          Welcome!
        </h2>
        
        <p style="font-size:16px; color:#666; margin-bottom:30px; line-height:1.6;">
          Thank you for registering on our platform. To complete your registration and access all features, we need to verify your email address.
        </p>
        
        <div style="margin:40px 0;">
          <a href="${verificationUrl}" style="background:linear-gradient(135deg,#1ABC9C 0%,#0e9c8a 100%);color:#fff;padding:18px 40px;text-decoration:none;border-radius:8px;font-weight:600;display:inline-block;font-size:16px;box-shadow:0 4px 15px rgba(26,188,156,0.3);">
            Verify my email
          </a>
        </div>
        
        <hr style="border:0;border-top:1px solid #e2e8f0; margin:40px 0;">
        
        <p style="font-size:14px; color:#666; margin-bottom:20px;">
          Have questions? Contact us at 
          <a href="mailto:support@oxygentoken.org" style="color:#1ABC9C;">support@oxygentoken.org</a>
        </p>
        
        <p style="font-style:italic; color:#999; margin:0;">
          With gratitude,<br>The Oxygen Team
        </p>
      </div>
      
      <div style="background:#004d40; color:#fff; text-align:center; font-size:14px; padding:20px 0;">
        <div style="margin-bottom:10px;">
          <a href="https://www.linkedin.com/company/oxygentoken/" style="margin:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn" width="24"></a>
          <a href="https://x.com/OxygenToken" style="margin:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968958.png" alt="Twitter" width="24"></a>
          <a href="https://instagram.com/oxygentoken" style="margin:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="24"></a>
        </div>
        Oxygen Token · Innovation for the planet<br>
        © 2023 All rights reserved
      </div>
    </div>
  </body>
  </html>
  `;
}

export default resend;

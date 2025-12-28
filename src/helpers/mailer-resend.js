import { Resend } from 'resend';
import { config } from 'dotenv';
config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmailNuevoEstilo(direccion, token) {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const baseUrl = isProduction 
      ? 'https://www.oxygentoken.org' 
      : 'http://localhost:3003';
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
      : 'http://localhost:3003';
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

export async function sendTwoFactorEmail(direccion, code) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Oxygen Group <noreply@oxygentoken.org>',
      to: [direccion],
      subject: '🔐 Código de verificación de dos factores - Oxygen',
      html: mailTwoFactorAuth(direccion, code),
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ 2FA email sent successfully with Resend:', data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error('❌ 2FA email sending failed:', error.message);
    return { success: false, error: error.message };
  }
}

export async function sendTwoFactorEmailEN(direccion, code) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Oxygen Group <noreply@oxygentoken.org>',
      to: [direccion],
      subject: '🔐 Two-factor authentication code - Oxygen',
      html: mailTwoFactorAuthEN(direccion, code),
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ 2FA email sent successfully with Resend:', data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error('❌ 2FA email sending failed:', error.message);
    return { success: false, error: error.message };
  }
}

function mailTwoFactorAuth(email, code) {
  return `
  <html>
  <body style="font-family: Arial, sans-serif; background-color: #f8fbfa; color: #2d3748; margin:0;padding:0;">
    <div style="max-width:600px; margin:40px auto; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,77,64,0.08); overflow:hidden;">
      <div style="background:linear-gradient(135deg,#004d40 0%,#1ABC9C 100%); color:#fff; text-align:center; padding:30px 0;">
        <h1 style="margin:0; font-size:28px; font-weight:600;">OXYGEN</h1>
      </div>
      
      <div style="padding:40px 30px; text-align:center;">
        <h2 style="color:#004d40; font-size:28px; margin:0 0 20px; line-height:1.3;">
          Código de verificación
        </h2>
        
        <p style="font-size:16px; color:#666; margin-bottom:30px; line-height:1.6;">
          Se ha iniciado sesión en tu cuenta. Para completar el inicio de sesión, ingresa el siguiente código de 6 dígitos:
        </p>
        
        <div style="margin:40px 0;">
          <div style="background:#f0f9ff; border:2px solid #1ABC9C; border-radius:12px; padding:30px; display:inline-block;">
            <div style="font-size:48px; font-weight:700; color:#004d40; letter-spacing:8px; font-family:monospace;">
              ${code}
            </div>
          </div>
        </div>
        
        <p style="font-size:14px; color:#999; margin-top:30px;">
          Este código expirará en 10 minutos. Si no solicitaste este código, ignora este mensaje.
        </p>
        
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

function mailTwoFactorAuthEN(email, code) {
  return `
  <html>
  <body style="font-family: Arial, sans-serif; background-color: #f8fbfa; color: #2d3748; margin:0;padding:0;">
    <div style="max-width:600px; margin:40px auto; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,77,64,0.08); overflow:hidden;">
      <div style="background:linear-gradient(135deg,#004d40 0%,#1ABC9C 100%); color:#fff; text-align:center; padding:30px 0;">
        <h1 style="margin:0; font-size:28px; font-weight:600;">OXYGEN</h1>
      </div>
      
      <div style="padding:40px 30px; text-align:center;">
        <h2 style="color:#004d40; font-size:28px; margin:0 0 20px; line-height:1.3;">
          Verification Code
        </h2>
        
        <p style="font-size:16px; color:#666; margin-bottom:30px; line-height:1.6;">
          A login attempt has been made on your account. To complete the login, enter the following 6-digit code:
        </p>
        
        <div style="margin:40px 0;">
          <div style="background:#f0f9ff; border:2px solid #1ABC9C; border-radius:12px; padding:30px; display:inline-block;">
            <div style="font-size:48px; font-weight:700; color:#004d40; letter-spacing:8px; font-family:monospace;">
              ${code}
            </div>
          </div>
        </div>
        
        <p style="font-size:14px; color:#999; margin-top:30px;">
          This code will expire in 10 minutes. If you didn't request this code, please ignore this message.
        </p>
        
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

// Reset Password Email Functions
export async function sendResetPasswordEmail(direccion, token) {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const baseUrl = isProduction
      ? 'https://www.oxygentoken.org'
      : 'http://localhost:3003';
    const resetUrl = `${baseUrl}/es/reset-password?token=${token}`;

    const { data, error } = await resend.emails.send({
      from: 'Oxygen Group <noreply@oxygentoken.org>',
      to: [direccion],
      subject: 'Restablecer contraseña - Oxygen',
      html: mailResetPassword(direccion, resetUrl),
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Reset password email sent successfully:', data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error('❌ Reset password email failed:', error.message);
    return { success: false, error: error.message };
  }
}

export async function sendResetPasswordEmailEN(direccion, token) {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const baseUrl = isProduction
      ? 'https://www.oxygentoken.org'
      : 'http://localhost:3003';
    const resetUrl = `${baseUrl}/en/reset-password?token=${token}`;

    const { data, error } = await resend.emails.send({
      from: 'Oxygen Group <noreply@oxygentoken.org>',
      to: [direccion],
      subject: 'Reset Password - Oxygen',
      html: mailResetPasswordEN(direccion, resetUrl),
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Reset password email sent successfully:', data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error('❌ Reset password email failed:', error.message);
    return { success: false, error: error.message };
  }
}

function mailResetPassword(email, resetUrl) {
  return `
  <html>
  <body style="font-family: Arial, sans-serif; background-color: #f8fbfa; color: #2d3748; margin:0;padding:0;">
    <div style="max-width:600px; margin:40px auto; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,77,64,0.08); overflow:hidden;">
      <div style="background:linear-gradient(135deg,#004d40 0%,#1ABC9C 100%); color:#fff; text-align:center; padding:30px 0;">
        <h1 style="margin:0; font-size:28px; font-weight:600;">OXYGEN</h1>
      </div>

      <div style="padding:40px 30px; text-align:center;">
        <h2 style="color:#004d40; font-size:28px; margin:0 0 20px; line-height:1.3;">
          Restablecer contraseña
        </h2>

        <p style="font-size:16px; color:#666; margin-bottom:30px; line-height:1.6;">
          Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el botón de abajo para crear una nueva contraseña.
        </p>

        <div style="margin:40px 0;">
          <a href="${resetUrl}" style="background:linear-gradient(135deg,#1ABC9C 0%,#0e9c8a 100%);color:#fff;padding:18px 40px;text-decoration:none;border-radius:8px;font-weight:600;display:inline-block;font-size:16px;box-shadow:0 4px 15px rgba(26,188,156,0.3);">
            Restablecer contraseña
          </a>
        </div>

        <p style="font-size:14px; color:#999; margin-top:30px;">
          Este enlace expirará en 1 hora. Si no solicitaste restablecer tu contraseña, puedes ignorar este mensaje.
        </p>

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

function mailResetPasswordEN(email, resetUrl) {
  return `
  <html>
  <body style="font-family: Arial, sans-serif; background-color: #f8fbfa; color: #2d3748; margin:0;padding:0;">
    <div style="max-width:600px; margin:40px auto; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,77,64,0.08); overflow:hidden;">
      <div style="background:linear-gradient(135deg,#004d40 0%,#1ABC9C 100%); color:#fff; text-align:center; padding:30px 0;">
        <h1 style="margin:0; font-size:28px; font-weight:600;">OXYGEN</h1>
      </div>

      <div style="padding:40px 30px; text-align:center;">
        <h2 style="color:#004d40; font-size:28px; margin:0 0 20px; line-height:1.3;">
          Reset Password
        </h2>

        <p style="font-size:16px; color:#666; margin-bottom:30px; line-height:1.6;">
          We received a request to reset your account password. Click the button below to create a new password.
        </p>

        <div style="margin:40px 0;">
          <a href="${resetUrl}" style="background:linear-gradient(135deg,#1ABC9C 0%,#0e9c8a 100%);color:#fff;padding:18px 40px;text-decoration:none;border-radius:8px;font-weight:600;display:inline-block;font-size:16px;box-shadow:0 4px 15px rgba(26,188,156,0.3);">
            Reset Password
          </a>
        </div>

        <p style="font-size:14px; color:#999; margin-top:30px;">
          This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this message.
        </p>

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

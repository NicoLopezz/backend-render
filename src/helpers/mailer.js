import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  connectionTimeout: 10000, // 10 segundos para conectar
  greetingTimeout: 5000,    // 5 segundos para saludo
  socketTimeout: 10000,     // 10 segundos para socket
  logger: true,
  debug: true,
});

export async function sendEmailVeirifcation(direccion, token) {
  try {
    return await transporter.sendMail({
      from: `Oxygen Group <${process.env.EMAIL}>`,
      to: direccion,
      subject: "Bienvenido! OXYGEN",
      html: mailVerificator(token),
      text: mailVerificatorText(token),
    });
  } catch (error) {
    console.error('Email sending failed:', error.message);
    return { success: false, error: error.message };
  }
}

export async function sendWelcomeEmailNuevoEstilo(direccion, token) {
  try {
    const result = await transporter.sendMail({
      from: `Oxygen Group <${process.env.EMAIL}>`,
      to: direccion,
      subject: "🎉 ¡Bienvenido(a) a Oxygen! - Verifica tu email",
      html: mailBienvenidaNuevoEstilo(direccion, token),
      text: mailBienvenidaNuevoEstiloText(direccion, token),
    });
    
    // Verificar si el email se envió correctamente
    if (!result || !result.messageId) {
      console.error('Email sending failed: No messageId returned');
      return { success: false, error: 'No messageId returned' };
    }
    
    console.log('✅ Email sent successfully with messageId:', result.messageId);
    return { success: true, messageId: result.messageId, accepted: result.accepted };
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    return { success: false, error: error.message };
  }
}

// VERSIÓN EN INGLÉS
export async function sendWelcomeEmailNuevoEstiloEN(direccion, token) {
  try {
    const result = await transporter.sendMail({
      from: `Oxygen Group <${process.env.EMAIL}>`,
      to: direccion,
      subject: "🎉 Welcome to Oxygen! - Verify your email",
      html: mailBienvenidaNuevoEstiloEN(direccion, token),
      text: mailBienvenidaNuevoEstiloTextEN(direccion, token),
    });
    
    // Verificar si el email se envió correctamente
    if (!result || !result.messageId) {
      console.error('Email sending failed: No messageId returned');
      return { success: false, error: 'No messageId returned' };
    }
    
    console.log('✅ Email sent successfully with messageId:', result.messageId);
    return { success: true, messageId: result.messageId, accepted: result.accepted };
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    return { success: false, error: error.message };
  }
}

// --- FUNCIONES HTML/PLAIN TEXT ---

function mailVerificator(token) {
  return `
  <html>
  <body style="font-family: Arial, sans-serif; background-color: #f8fbfa; color: #2d3748; margin:0;padding:0;">
    <div style="max-width:600px; margin:40px auto; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,77,64,0.08); overflow:hidden;">
      <div style="background:linear-gradient(135deg,#004d40 0%,#1ABC9C 100%); color:#fff; text-align:center; padding:16px 0;">
        <strong>INVERSIÓN EN LA NATURALEZA, GANANCIA PARA EL FUTURO</strong>
      </div>
      <img src="https://i.postimg.cc/y8N92bzS/forest.jpg" alt="Gran Chaco" style="width:100%; display:block;">
      <div style="padding:30px;">
        <h1 style="color:#004d40; font-size:28px; margin:0 0 20px; text-align:center; line-height:1.3;">Tu viaje hacia la <span style="color:#1ABC9C;">sostenibilidad</span> comienza</h1>
        <p style="font-size:16px;">Bienvenido a nuestra comunidad de agentes de cambio. Juntos estamos protegiendo el Gran Chaco mientras creamos oportunidades económicas sostenibles.</p>
        <ul style="padding-left:18px;">
          <li><b>01:</b> Explora nuestros proyectos de conservación certificados</li>
          <li><b>02:</b> Selecciona el área que deseas proteger</li>
          <li><b>03:</b> Recibe tokens $OM y genera impacto real</li>
        </ul>
        <hr style="border:0;border-top:1px solid #e2e8f0; margin:30px 0;">
        <h2 style="color:#004d40;font-size:20px;margin:30px 0 15px;">Welcome to our global movement</h2>
        <p style="font-size:16px;">You've joined an innovative network that combines environmental conservation with blockchain transparency. Together we're setting new standards for ecological investments.</p>
        <div style="text-align:center; margin:40px 0;">
          <a href="https://www.oxygentoken.org/roles" style="background:linear-gradient(135deg,#1ABC9C 0%,#0e9c8a 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:8px;font-weight:600;display:inline-block;font-size:16px;">DESCUBRE TU IMPACTO / DISCOVER YOUR ROLE</a>
        </div>
        <p style="font-size:12px; text-align:center;">Español / English</p>
        <p style="font-style:italic; margin-top:20px;">Con gratitud,<br>El equipo Oxygen</p>
      </div>
      <div style="background:#004d40; color:#fff; text-align:center; font-size:14px; padding:20px 0;">
        <div style="margin-bottom:10px;">
          <a href="#" style="margin:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn" width="24"></a>
          <a href="#" style="margin:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968958.png" alt="Twitter" width="24"></a>
          <a href="#" style="margin:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="24"></a>
        </div>
        Oxygen Token · Innovación al servicio del planeta<br>
        © 2023 Todos los derechos reservados<br>
        <a href="#" style="color:rgba(255,255,255,0.7);text-decoration:underline;font-size:12px;display:block;margin-top:15px;">Cancelar suscripción</a>
      </div>
    </div>
  </body>
  </html>
  `;
}

function mailVerificatorText(token) {
  return `Tu viaje hacia la sostenibilidad comienza.

Bienvenido a nuestra comunidad de agentes de cambio. Juntos estamos protegiendo el Gran Chaco mientras creamos oportunidades económicas sostenibles.

01: Explora nuestros proyectos de conservación certificados
02: Selecciona el área que deseas proteger
03: Recibe tokens $OM y genera impacto real

Descubre tu impacto: https://www.oxygentoken.org/roles

Con gratitud,
El equipo Oxygen

Oxygen Token · Innovación al servicio del planeta
Cancelar suscripción
`;
}

function mailBienvenidaNuevoEstilo(email, token) {
  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction 
    ? 'https://www.oxygentoken.org' 
    : 'http://localhost:3003';
  const verificationUrl = `${baseUrl}/es/verify-success?token=${token}`;
  
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

function mailBienvenidaNuevoEstiloText(first_name) {
  return `

Bienvenido a la comunidad Oxygen 🌱

Gracias por unirte a nuestra lista de espera. Ahora sos parte de una red global decidida a conservar el Gran Chaco y a demostrar que invertir en la naturaleza puede ser rentable y transparente.

¿Cómo podés participar?
1. Descubrí nuestro proyecto de conservación: LA FLORENCIA.
2. Elegí cuántos m² querés proteger.
3. Recibí tokens $OM y empezá a generar créditos de carbono.

Si trabajás en marketing, finanzas verdes, diseño o tech: el planeta te necesita. Hablemos.

Descubrí tu rol: https://www.oxygentoken.org/proyectos

Con gratitud,
El equipo Oxygen

Oxygen Token · Innovación al servicio del planeta
Cancelar suscripción
`;
}

function mailBienvenidaNuevoEstiloEN(email, token) {
  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction 
    ? 'https://www.oxygentoken.org' 
    : 'http://localhost:3003';
  const verificationUrl = `${baseUrl}/en/verify-success?token=${token}`;
  
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

function mailBienvenidaNuevoEstiloTextEN(first_name) {
  return `

Welcome to the Oxygen community 🌱

Thank you for joining our waitlist. Now you are part of a global network determined to conserve the Gran Chaco and show that investing in nature can be profitable and transparent.

How can you participate?
1. Discover our conservation project: LA FLORENCIA.
2. Choose how many m² you want to protect.
3. Receive $OM tokens and start generating carbon credits.

If you work in marketing, green finance, design or tech: the planet needs you. Let's talk.

Discover your role: https://www.oxygentoken.org/en/proyectos

With gratitude,
The Oxygen Team

Oxygen Token · Innovation for the planet
Unsubscribe
`;
}

export default transporter;

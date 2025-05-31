import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  logger: true,
  debug: true,
});

export async function sendEmailVeirifcation(direccion, token) {
  return transporter.sendMail({
    from: `Oxygen Group <${process.env.EMAIL}>`,
    to: direccion,
    subject: "Bienvenido! OXYGEN",
    html: mailVerificator(token),
    text: mailVerificatorText(token),
  });
}

export async function sendWelcomeEmailNuevoEstilo(direccion, nombre) {
  return transporter.sendMail({
    from: `Oxygen Group <${process.env.EMAIL}>`,
    to: direccion,
    subject: "🎉 ¡Bienvenido(a) a Oxygen!",
    html: mailBienvenidaNuevoEstilo(nombre),
    text: mailBienvenidaNuevoEstiloText(nombre),
  });
}

// VERSIÓN EN INGLÉS
export async function sendWelcomeEmailNuevoEstiloEN(direccion, nombre) {
  return transporter.sendMail({
    from: `Oxygen Group <${process.env.EMAIL}>`,
    to: direccion,
    subject: "🎉 Welcome to Oxygen!",
    html: mailBienvenidaNuevoEstiloEN(nombre),
    text: mailBienvenidaNuevoEstiloTextEN(nombre),
  });
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

function mailBienvenidaNuevoEstilo(first_name) {
  return `
  <html>
  <body style="font-family: Arial, sans-serif; background-color: #f8fbfa; color: #2d3748; margin:0;padding:0;">
    <div style="max-width:600px; margin:40px auto; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,77,64,0.08); overflow:hidden;">
      <div style="background:linear-gradient(135deg,#004d40 0%,#1ABC9C 100%); color:#fff; text-align:center; padding:16px 0;">
        <strong>INVERSIÓN EN LA NATURALEZA, GANANCIA PARA EL FUTURO</strong>
      </div>
      <img src="https://i.postimg.cc/y8N92bzS/forest.jpg" alt="Gran Chaco" style="width:100%; display:block;">
      <div style="padding:30px;">
        <h1 style="color:#004d40; font-size:28px; margin:0 0 20px; text-align:center; line-height:1.3;">Bienvenido a la <span style="color:#1ABC9C;">comunidad Oxygen</span> 🌱</h1>
        <p style="font-size:16px;">Gracias por unirte a nuestra lista de espera. Ahora sos parte de una red global decidida a conservar el Gran Chaco y a demostrar que <b>invertir en la naturaleza puede ser rentable y transparente</b>.</p>
        <ul style="padding-left:18px;">
          <li><b>¿Cómo podés participar?</b></li>
          <li>1. Descubrí nuestro proyecto de conservación: LA FLORENCIA.</li>
          <li>2. Elegí cuántos m² querés proteger.</li>
          <li>3. Recibí tokens $OM y empezá a generar créditos de carbono.</li>
        </ul>
        <p style="font-size:14px;font-style:italic;">Si trabajás en marketing, finanzas verdes, diseño o tech: el planeta te necesita. Hablemos.</p>
        <div style="text-align:center; margin:40px 0;">
          <a href="https://www.oxygentoken.org/roles" style="background:linear-gradient(135deg,#1ABC9C 0%,#0e9c8a 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:8px;font-weight:600;display:inline-block;font-size:16px;">Descubrí tu rol</a>
        </div>
        <p style="font-size:12px; text-align:center;">Español / English</p>
        <p style="font-style:italic; margin-top:20px;">Con gratitud,<br>El equipo Oxygen</p>
      </div>
      <div style="background:#004d40; color:#fff; text-align:center; font-size:14px; padding:20px 0;">
        <div style="margin-bottom:10px;">
          <a href="https://www.linkedin.com/company/oxygentoken/" style="margin:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn" width="24"></a>
          <a href="https://x.com/OxygenToken" style="margin:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968958.png" alt="Twitter" width="24"></a>
          <a href="https://instagram.com/oxygentoken" style="margin:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="24"></a>
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

function mailBienvenidaNuevoEstiloEN(first_name) {
  return `
  <html>
  <body style="font-family: Arial, sans-serif; background-color: #f8fbfa; color: #2d3748; margin:0;padding:0;">
    <div style="max-width:600px; margin:40px auto; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,77,64,0.08); overflow:hidden;">
      <div style="background:linear-gradient(135deg,#004d40 0%,#1ABC9C 100%); color:#fff; text-align:center; padding:16px 0;">
        <strong>INVEST IN NATURE, EARN THE FUTURE</strong>
      </div>
      <img src="https://i.postimg.cc/y8N92bzS/forest.jpg" alt="Gran Chaco" style="width:100%; display:block;">
      <div style="padding:30px;">
        <h1 style="color:#004d40; font-size:28px; margin:0 0 20px; text-align:center; line-height:1.3;">Welcome to the <span style="color:#1ABC9C;">Oxygen community</span> 🌱</h1>
        <p style="font-size:16px;">Thank you for joining our waitlist. Now you are part of a global network determined to conserve the Gran Chaco and show that <b>investing in nature can be profitable and transparent</b>.</p>
        <ul style="padding-left:18px;">
          <li><b>How can you participate?</b></li>
          <li>1. Discover our conservation project: LA FLORENCIA.</li>
          <li>2. Choose how many m² you want to protect.</li>
          <li>3. Receive $OM tokens and start generating carbon credits.</li>
        </ul>
        <p style="font-size:14px;font-style:italic;">If you work in marketing, green finance, design or tech: the planet needs you. Let's talk.</p>
        <div style="text-align:center; margin:40px 0;">
          <a href="https://www.oxygentoken.org/roles" style="background:linear-gradient(135deg,#1ABC9C 0%,#0e9c8a 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:8px;font-weight:600;display:inline-block;font-size:16px;">Discover your role</a>
        </div>
        <p style="font-size:12px; text-align:center;">Español / English</p>
        <p style="font-style:italic; margin-top:20px;">With gratitude,<br>The Oxygen Team</p>
      </div>
      <div style="background:#004d40; color:#fff; text-align:center; font-size:14px; padding:20px 0;">
        <div style="margin-bottom:10px;">
          <a href="https://www.linkedin.com/company/oxygentoken/" style="margin:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn" width="24"></a>
          <a href="https://x.com/OxygenToken" style="margin:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968958.png" alt="Twitter" width="24"></a>
          <a href="https://instagram.com/oxygentoken" style="margin:0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="24"></a>
        </div>
        Oxygen Token · Innovation for the planet<br>
        © 2023 All rights reserved<br>
        <a href="#" style="color:rgba(255,255,255,0.7);text-decoration:underline;font-size:12px;display:block;margin-top:15px;">Unsubscribe</a>
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

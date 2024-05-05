import nodemailer from 'nodemailer'
import {config} from 'dotenv'
config();

const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  export async function sendEmailVeirifcation (direccion, token){
    return transporter.sendMail({
      from: `Oxygen Group ${process.env.EMAIL}`, 
      to: direccion,
      subject: 'TESTING',
      html: mailVerificator(token)
    })
}
   

function mailVerificator(token){
  return`
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Validación de Contraseña</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #ffff; /* Fondo claro */
          }
  
          .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #ffff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
              color: #333; /* Texto oscuro */
          }
  
          h1 {
              text-align: center;
              color: #333;
          }
  
          p {
              margin-bottom: 20px;
              line-height: 1.6;
          }
  
          .btn {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #ffff;
              text-decoration: none;
              border-radius: 3px;
              transition: background-color 0.5s ease;
          }
  
          .btn:hover {
              background-color: #0056b3; /* Cambio de color en hover */
          }
  
          .footer {
              margin-top: 20px;
              text-align: center;
              color: #666;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Validación de Contraseña</h1>
          <p>Estimado Usuario,</p>
          <p>Para completar el proceso de validación de su cuenta, haga clic en el siguiente enlace:</p>
          <a href="https://backend-render-test-se07.onrender.com/api/verify/${token}" class="btn">Validar Contraseña</a>
          <p class="footer">Si no solicitó este cambio, por favor ignore este mensaje.</p>
      </div>
  </body>
  </html>
  `}

export default transporter 
 



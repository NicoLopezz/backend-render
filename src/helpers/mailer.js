import nodemailer from 'nodemailer'
import {config} from 'dotenv'
config();

const transporter = nodemailer.createTransport({
    host:'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    logger: true, // habilita la salida de registros
    debug: true // habilita la depuración!
  })

  export async function sendEmailVeirifcation (direccion, token){
    return transporter.sendMail({
      from: `Oxygen Group ${process.env.EMAIL}`, 
      to: direccion,
      subject: 'Bienvenido! OXYGEN',
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
    <title>Email Bienvenidos</title>
    <style>
        .email-body {
            background-color: #ffffff !important; /* Fondo blanco sólido */
            padding: 20px;
            margin: 0;
            width: 100%;
        }
        .email-container {
            background-color: #ffffff !important; /* Fondo blanco sólido para el contenedor */
            border: 1px solid #ddd;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #006A6A; /* Fondo oscuro para el encabezado */
            color: #ffffff; /* Texto blanco */
            text-align: center;
            padding: 2em;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            text-align: center;
            padding: 2em;
        }
        .content h2 {
            color: #006A6A !important; /* Texto en color azul oscuro */
            font-size: 22px;
            margin-top: 0;
        }
        .content p {
            color: #333333 !important; /* Texto en color gris oscuro */
            line-height: 1.5;
            font-size: 16px;
            font-weight: 500;
        }
        .button {
            display: inline-block;
            background-color: #3EAD26; /* Fondo verde para el botón */
            color: #ffffff !important; /* Texto blanco en el botón */
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 20px;
            margin-top: 20px;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <table class="email-body" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td>
                <table class="email-container" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td class="header">
                            <h1>EMPRENDE TU VIAJE CON OXYGEN!</h1>
                            <p>¿Estás listo para ayudarnos a salvar 30,000 hectáreas de bosques nativos?</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="content">
                            <h2>BIENVENIDO A OXYGEN!</h2>
                            <a href='https://postimages.org/' target='_blank'>
                                <img src='https://i.postimg.cc/jSNXm1P5/imgMail.png' border='0' alt='Imagen de bienvenida' style="display: block; margin: 0 auto;"/>
                            </a>
                            <p>Gracias por unirte a nuestra lista de espera. Ahora sos parte de una comunidad dedicada a salvar 30,000 hectáreas en el Norte de Argentina. Estate alerta a las novedades para aprender más sobre cómo podés participar activamente en nuestros proyectos. Si trabajás en marketing, legales, diseño o tecnología, el planeta te necesita. Hablemos!</p>
                            <p>Estamos emocionados por tenerte con nosotros!</p>
                            <a href="https://calendly.com/conservation-0bjx/30min" target="_blank" class="button">Descubrí tu rol</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  
  

  
  `}



export default transporter 
 



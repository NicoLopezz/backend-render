import express from 'express'
import cors from 'cors'
//rutas de la API
import AuthRoutes from './routes/auth.routes.js'
const app = express() //OBJETO DEL SERVIDOR
import fetch from 'node-fetch';

const INTERVALO_PETICIONES = 5 * 1000; // 5 minutos en milisegundos
setInterval(async () => {
  try {
    // Realizar una petición GET a tu servidor en Render
    const response = await fetch('https://backend-render-bdaf.onrender.com/');
    console.log('Respuesta del servidor:', response.statusText);
  } catch (error) {
    console.error('Error al realizar la petición:', error);
  }
}, INTERVALO_PETICIONES);


//SETTING
app.set('port' , process.env.PORT || 10001); //Si no hay otro puerto entonces ejecuta en el 3000

app.use(express.json());

app.use(express.text()); //for text common user complet

app.use(cors())

app.use("/api" , AuthRoutes); //for separete all mis pages with pre-API

app.use(express.static("public"))

export default app;











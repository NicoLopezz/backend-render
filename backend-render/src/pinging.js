import fetch from 'node-fetch';

export const INTERVALO_PETICIONES = 45 * 1000;

const startPinging = () => {
  setInterval(async () => {
    try {
      const response = await fetch('https://backend-render-7vh2.onrender.com/');
      console.log('Respuesta del servidor:', response.statusText);
    } catch (error) {
      console.error('Error al realizar la petición:', error);
    }
  }, INTERVALO_PETICIONES);
};

export default startPinging;

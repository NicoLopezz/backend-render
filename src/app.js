import express from 'express';
import cors from 'cors';
import AuthRoutes from './routes/auth.routes.js';
import startPinging from './pinging.js';

startPinging();

const app = express();

app.set('port', process.env.PORT || 10001);
app.use(express.json());
app.use(express.text());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://www.oxygentoken.org",
      "https://oxygentoken.org",
      "https://wwww.oxygenworld.org",
    ],
    credentials: true,
  })
);

app.use("/", AuthRoutes);
app.use("/en", AuthRoutes);
app.use(express.static("public"));

export default app;

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import AuthRoutes from './routes/auth.routes.js';
import WalletRoutes from './routes/wallet.routes.js';
import PreUsersRoutes from './routes/pre-users.routes.js';
import startPinging from './pinging.js';

config();

startPinging();

const app = express();

app.set('port', process.env.PORT || 10001);
app.use(express.json());
app.use(express.text());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:3003",
      "https://www.oxygentoken.org",
      "https://oxygentoken.org",
      "https://wwww.oxygenworld.org",
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use("/", AuthRoutes);
app.use("/", WalletRoutes);
app.use("/", PreUsersRoutes);
app.use("/en", AuthRoutes);
app.use(express.static("public"));

export default app;

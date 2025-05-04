import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import patientsRoutes from './routes/patients.routes.js';
import morgan from 'morgan';

const app = express();

// Middleware para registrar las peticiones HTTP en la consola
app.use(morgan('dev'));

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

app.use(patientsRoutes);

app.listen(PORT)
console.log('Servidor en puerto', PORT);
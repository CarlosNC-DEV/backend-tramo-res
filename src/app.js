import express from "express";
import cors from "cors";
import morgan from "morgan";

import admin from './routes/login.admin.routes.js';
import solicitudes from './routes/solicitudes.routes.js';
import estado from './routes/estado.conductores.routes.js';
import conductores from './routes/datos.conductores.routes.js';
import natural from './routes/cliente.natural.routes.js';

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(admin);
app.use(solicitudes);
app.use(estado);
app.use(conductores);
app.use(natural);

export default app;

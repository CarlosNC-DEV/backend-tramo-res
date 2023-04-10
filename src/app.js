import express from "express";
import cors from "cors";
import morgan from "morgan";

import admin from './routes/login.admin.routes.js';
import solicitudes from './routes/solicitudes.routes.js';
import estado from './routes/estado.conductores.routes.js';
import conductores from './routes/datos.conductores.routes.js';
import natural from './routes/cliente.natural.routes.js';
import empresa from './routes/cliente.empresa.routes.js';

import loginEmpresa from './routes/login.empresa.routes.js';
import loginNatural from './routes/login.natural.routes.js';
import loginConductor from './routes/login.conductor.routes.js';


const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(admin);
app.use(loginEmpresa);
app.use(loginNatural);
app.use(loginConductor);

app.use("/admin", solicitudes);
app.use("/admin", estado);
app.use("/admin", conductores);
app.use("/admin", natural);
app.use("/admin", empresa);

export default app;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import clienteRoute from "./src/routes/clienteRoute.js";
import advogadoRoute from "./src/routes/advogadoRoute.js";
import authRoute from "./src/routes/authRoute.js";
import processosRoute from "./src/routes/processosRoute.js";


dotenv.config();

const PORT = process.env.PORT_SERVER || 8000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5500", // porta do Live Server / front-end
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/clientes", clienteRoute);

app.use("/advogados", advogadoRoute);

app.use("/auth", authRoute);

app.use("/processos", processosRoute);

app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
});
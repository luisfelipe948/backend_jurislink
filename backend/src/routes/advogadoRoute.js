import express from "express";
import advogadoController from "../controllers/advogadoController.js";

const advogadoRoute = express.Router();

advogadoRoute.get("/", advogadoController.selectAll);
advogadoRoute.get("/:id", advogadoController.selectById);
advogadoRoute.post("/", advogadoController.create);
advogadoRoute.delete("/:id", advogadoController.delete);

export default advogadoRoute;
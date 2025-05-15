import { Router } from "express";
import { getUsuario, getUsuarios } from "./controllers/usuarios.controller.js";

const router = Router();

// Listar médicos
router.get("/usuarios", getUsuarios);

// Obtener un médico por idUsuario
router.get("/usuarios/:idUsuario", getUsuario);

export default router;
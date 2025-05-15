import { Router } from "express";
import { getUsuario, getUsuarios } from "./controllers/users.controller.js";

const router = Router();

// Listar usuarios
router.get("/usuarios", getUsuarios);

// Obtener un usuario por idUsuario
router.get("/usuarios/:idUsuario", getUsuario);

export default router;
import { Router } from "express";
import { login, authenticateToken, getUserInfo, logout } from "./controllers/auth.controller.js";

const router = Router();

// Inicio de sesion
router.post("/login", login);

// Obtener info de la persona logeada
router.get("/info", authenticateToken, getUserInfo);

// Salirse de la sesion
router.post("/logout", logout);


export default router;
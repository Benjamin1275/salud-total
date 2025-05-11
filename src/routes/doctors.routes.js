import { Router } from "express";
import { getMedico, getMedicos } from "./controllers/doctors.controller.js";
import { createMedico, deleteMedico, updateMedico } from "./controllers/doctors.controller.js";

const router = Router();

// Listar médicos
router.get("/medicos", getMedicos);

// Obtener un médico por idMedico
router.get("/medicos/:idMedico", getMedico);

// Agregar un médico
router.post("/medicos", createMedico);

// Eliminar un médico por idMedico
router.delete("/medicos/:idMedico", deleteMedico);

// Actualizar un médico por idMedico
router.put("/medicos/:idMedico", updateMedico);

export default router;
import { Router } from "express";
import { getEspecialidad, getEspecialidades } from "./controllers/specialties.controller.js";
import { createEspecialidad, deleteEspecialidad, updateEspecialidad } from "./controllers/specialties.controller.js";

const router = Router();

// Listar especialidades
router.get("/especialidades", getEspecialidades);

// Obtener una especialidad por idEspecialidad
router.get("/especialidades/:idEspecialidad", getEspecialidad);

// Agregar una especialidad
router.post("/especialidades", createEspecialidad);

// Eliminar una especialidad por idEspecialidad
router.delete("/especialidades/:idEspecialidad", deleteEspecialidad);

// Actualizar una especialidad por idEspecialidad
router.put("/especialidades/:idEspecialidad", updateEspecialidad);

export default router;
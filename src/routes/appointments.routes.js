import { Router } from "express";
import { getCita, getCitas } from "./controllers/appointments.controller.js";
import { createCita, deleteCita, updateCita } from "./controllers/appointments.controller.js";

const router = Router();

// Listar citas
router.get("/citas", getCitas);

// Obtener una cita por idCita
router.get("/citas/:idCita", getCita);

// Agregar una cita
router.post("/citas", createCita);

// Eliminar una cita por idCita
router.delete("/citas/:idCita", deleteCita);

// Actualizar una cita por idCita
router.put("/citas/:idCita", updateCita);

export default router;
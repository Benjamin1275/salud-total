import { Router } from "express";
//import { pool } from "../db.js";

import { getPaciente, getPacientes } from "./controllers/patients.controller.js";
import { createUser, deleteUser, updateUser } from "./controllers/patients.controller.js";
const router = Router();

// Listar pacientes //
router.get("/pacientes", getPacientes);


//Obtener un pacinete por idPaciente
router.get("/pacientes/:idPaciente", getPaciente);

//------------------------------------------------------------------------------------------------------------//

//Agregar un paciente //
router.post("/pacientes", createUser);

//------------------------------------------------------------------------------------------------------------//

// Eliminar un paciente por idPaciente //
router.delete("/pacientes/:idPaciente", deleteUser);

//------------------------------------------------------------------------------------------------------------//

// Actualizar un paciente por idPaciente //
router.put("/pacientes/:idPaciente", updateUser);



export default router;
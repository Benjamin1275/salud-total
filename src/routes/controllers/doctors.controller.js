import { pool } from "../../db.js";

// Lógica y consultas a la base de datos para traer datos de la tabla medico

//------------------------------------------------------------------------------------------------------------//

export const getMedicos = async (req, res) => {
    try {
        console.log("Intentando conectar a la base de datos...");
        const { rows } = await pool.query("SELECT * FROM medico");
        console.log("Consulta ejecutada exitosamente");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener los médicos:", error);
        res.status(500).json({ message: "Error al obtener los médicos" });
    }
};

export const getMedico = async (req, res) => {
    const { idMedico } = req.params;

    const { rows } = await pool.query("SELECT * FROM medico WHERE idMedico = $1", [idMedico]);

    if (rows.length === 0) {
        return res.status(404).json({ message: "Medico no encontrado" });
    }

    res.json(rows);
}

//------------------------------------------------------------------------------------------------------------//

export const createMedico = async (req, res) => {
    const { certificacion, idEspecialidad } = req.body; 

    try {
        const { rows } = await pool.query(
            "INSERT INTO medico (certificacion, idEspecialidad) VALUES ($1, $2) RETURNING *",
            [certificacion, idEspecialidad] 
        );

        return res.status(201).json({
            message: "Medico creado exitosamente",
            medico: rows[0]
        });
    } catch (error) {
        console.error("Error al insertar medico:", error);
        return res.status(500).json({ message: "Error al insertar medico" });
    }
}

//------------------------------------------------------------------------------------------------------------//

export const deleteMedico = async (req, res) => {
    const { idMedico } = req.params;

    const { rows, rowCount } = await pool.query("DELETE FROM medico WHERE idMedico = $1 RETURNING *", [idMedico]);

    if (rowCount === 0) {
        return res.status(404).json({ message: "Medico no encontrado" });
    }

    return res.json({
        message: "Medico eliminado exitosamente",
        medico: rows[0] // Devuelve solo el objeto eliminado sin estar dentro de un array
    });
}

//------------------------------------------------------------------------------------------------------------//

export const updateMedico = async (req, res) => {
    const { idMedico } = req.params;
    const { certificacion, idEspecialidad } = req.body; 

    try {
        const { rows, rowCount } = await pool.query(
            "UPDATE medico SET certificacion = $1, idEspecialidad = $2 WHERE idMedico = $3 RETURNING *",
            [certificacion, idEspecialidad, idMedico] 
        );

        if (rowCount === 0) {
            return res.status(404).json({ message: "Medico no encontrado" });
        }

        return res.json({
            message: "Medico actualizado exitosamente",
            medico: rows[0]
        });
    } catch (error) {
        console.error("Error al actualizar medico:", error);
        return res.status(500).json({ message: "Error al actualizar medico" });
    }
}
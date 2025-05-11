import { pool } from "../../db.js";

// Lógica y consultas a la base de datos para manejar las especialidades

//------------------------------------------------------------------------------------------------------------//

export const getEspecialidades = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM especialidad");
    res.json(rows);
}

export const getEspecialidad = async (req, res) => {
    const { idEspecialidad } = req.params;

    const { rows } = await pool.query("SELECT * FROM especialidad WHERE idEspecialidad = $1", [idEspecialidad]);

    if (rows.length === 0) {
        return res.status(404).json({ message: "Especialidad no encontrada" });
    }

    res.json(rows);
}

//------------------------------------------------------------------------------------------------------------//

export const createEspecialidad = async (req, res) => {
    const { nomEspe } = req.body; 

    try {
        const { rows } = await pool.query(
            "INSERT INTO especialidad (nomEspe) VALUES ($1) RETURNING *",
            [nomEspe] 
        );

        return res.status(201).json({
            message: "Especialidad creada exitosamente",
            especialidad: rows[0]
        });
    } catch (error) {
        console.error("Error al insertar especialidad:", error);
        return res.status(500).json({ message: "Error al insertar especialidad" });
    }
}


//------------------------------------------------------------------------------------------------------------//

export const deleteEspecialidad = async (req, res) => {
    const { idEspecialidad } = req.params;

    const { rows, rowCount } = await pool.query("DELETE FROM especialidad WHERE idEspecialidad = $1 RETURNING *", [idEspecialidad]);

    if (rowCount === 0) {
        return res.status(404).json({ message: "Especialidad no encontrada" });
    }

    return res.json({
        message: "Especialidad eliminada exitosamente",
        especialidad: rows[0]
    });
}

//------------------------------------------------------------------------------------------------------------//

export const updateEspecialidad = async (req, res) => {
    const { idEspecialidad } = req.params;
    const { nomEspe } = req.body; 

    try {
        const { rows, rowCount } = await pool.query(
            "UPDATE especialidad SET nomEspe = $1 WHERE idEspecialidad = $2 RETURNING *",
            [nomEspe, idEspecialidad] 
        );

        if (rowCount === 0) {
            return res.status(404).json({ message: "Especialidad no encontrada" });
        }

        return res.json({
            message: "Especialidad actualizada exitosamente",
            especialidad: rows[0]
        });
    } catch (error) {
        console.error("Error al actualizar especialidad:", error);
        return res.status(500).json({ message: "Error al actualizar especialidad" });
    }
}
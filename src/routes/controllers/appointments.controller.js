import { pool } from "../../db.js";

// Lógica y consultas a la base de datos para manejar las citas

//------------------------------------------------------------------------------------------------------------//

export const getCitas = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM cita");
    res.json(rows);
}

export const getCita = async (req, res) => {
    const { idCita } = req.params;

    const { rows } = await pool.query("SELECT * FROM cita WHERE idCita = $1", [idCita]);

    if (rows.length === 0) {
        return res.status(404).json({ message: "Cita no encontrada" });
    }

    res.json(rows);
}

//------------------------------------------------------------------------------------------------------------//

export const createCita = async (req, res) => {
    const { token, fecCita, motivoCita, idEstado, idMedico, idPaciente, idSeguro } = req.body; 

    try {
        const { rows } = await pool.query(
            "INSERT INTO cita (token, fecCita, motivoCita, idEstado, idMedico, idPaciente, idSeguro) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [token, fecCita, motivoCita, idEstado, idMedico, idPaciente, idSeguro] 
        );

        return res.status(201).json({
            message: "Cita creada exitosamente",
            cita: rows[0]
        });
    } catch (error) {
        console.error("Error al insertar cita:", error);
        return res.status(500).json({ message: "Error al insertar cita" });
    }
}


//------------------------------------------------------------------------------------------------------------//

export const deleteCita = async (req, res) => {
    const { idCita } = req.params;

    const { rows, rowCount } = await pool.query("DELETE FROM cita WHERE idCita = $1 RETURNING *", [idCita]);

    if (rowCount === 0) {
        return res.status(404).json({ message: "Cita no encontrada" });
    }

    return res.json({
        message: "Cita eliminada exitosamente",
        cita: rows[0]
    });
}

//------------------------------------------------------------------------------------------------------------//

export const updateCita = async (req, res) => {
    const { idCita } = req.params;
    const { token, fecCita, motivoCita, idEstado, idMedico, idPaciente, idSeguro } = req.body; 

    try {
        const { rows, rowCount } = await pool.query(
            "UPDATE cita SET token = $1, fecCita = $2, motivoCita = $3, idEstado = $4, idMedico = $5, idPaciente = $6, idSeguro = $7 WHERE idCita = $8 RETURNING *",
            [token, fecCita, motivoCita, idEstado, idMedico, idPaciente, idSeguro, idCita] 
        );

        if (rowCount === 0) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }

        return res.json({
            message: "Cita actualizada exitosamente",
            cita: rows[0]
        });
    } catch (error) {
        console.error("Error al actualizar cita:", error);
        return res.status(500).json({ message: "Error al actualizar cita" });
    }
}
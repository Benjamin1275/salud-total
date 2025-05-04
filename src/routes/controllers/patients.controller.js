import { poolDB1 } from "../../db.js";


// Logica y consultas a la base de datos para traer datos de la tabla personas y pacientes








//------------------------------------------------------------------------------------------------------------//

export const getPacientes = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM pacientes");
    res.json(rows)
};

export const getPaciente = async (req, res) => {
    const { idPaciente } = req.params

    const { rows } = await pool.query("SELECT * FROM pacientes WHERE idPaciente = $1", [idPaciente]);

    if (rows.length === 0) {
        return res.status(404).json({ message: "Paciente no encontrado" });
    }

    res.json(rows);
}

//------------------------------------------------------------------------------------------------------------//

export const createUser = async (req, res) => {
    const { name, fecnac, telefono, email, estado } = req.body;

    try {
        const { rows } = await pool.query(
            "INSERT INTO pacientes (name, fecNac, telefono, email, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, fecnac, telefono, email, estado]
        );

        return res.status(201).json({
            message: "Paciente creado exitosamente",
            paciente: rows[0] // Incluye el paciente recién creado
        });
    } catch (error) {
        console.error("Error al insertar paciente:", error);
        return res.status(500).json({ message: "Error al insertar paciente" });
    }
}

//------------------------------------------------------------------------------------------------------------//

export const deleteUser = async (req, res) => {
    const { idPaciente } = req.params

    const { rows, rowCount } = await pool.query("DELETE FROM pacientes WHERE idPaciente = $1 RETURNING *", [idPaciente]);

    if (rowCount === 0) {
        return res.status(404).json({ message: "Paciente no encontrado" });
    }

    return res.json({
        message: "Paciente eliminado exitosamente",
        paciente: rows[0] // Devuelve solo el objeto eliminado sin estar dentro de un array
    });
    // rows devuelve un array con el objeto eliminado
}

//------------------------------------------------------------------------------------------------------------//

export const updateUser = async (req, res) => {
    const { idPaciente } = req.params;
    const { name, fecnac, telefono, email, estado } = req.body;

    try {
        const { rows, rowCount } = await pool.query(
            "UPDATE pacientes SET name = $1, fecNac = $2, telefono = $3, email = $4, estado = $5 WHERE idPaciente = $6 RETURNING *",
            [name, fecnac, telefono, email, estado, idPaciente]
        );

        if (rowCount === 0) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }

        return res.json({
            message: "Paciente actualizado exitosamente",
            paciente: rows[0]
        });
    } catch (error) {
        console.error("Error al actualizar paciente:", error);
        return res.status(500).json({ message: "Error al actualizar paciente" });
    }
}
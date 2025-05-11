import { pool } from "../../db.js";


// Logica y consultas a la base de datos para traer datos de la tabla personas y pacientes



// export const getData = async (req, res) => {
//     const { query, params } = req.body; // Recibe la consulta y los parámetros desde el cuerpo de la solicitud

//     try {
//         const { rows } = await pool.query(query, params);
//         return res.json({ data: rows });
//     } catch (error) {
//         console.error("Error al ejecutar la consulta:", error);
//         return res.status(500).json({ message: "Error al obtener los datos" });
//     }
// };




//------------------------------------------------------------------------------------------------------------//

export const getPacientes = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM paciente");
    res.json(rows)
};

export const getPaciente = async (req, res) => {
    const { idPaciente } = req.params

    const { rows } = await pool.query("SELECT * FROM paciente WHERE idPaciente = $1", [idPaciente]);

    if (rows.length === 0) {
        return res.status(404).json({ message: "Paciente no encontrado" });
    }

    res.json(rows);
}

//------------------------------------------------------------------------------------------------------------//

export const createUser = async (req, res) => {
    const { fecNac, telefono, estado, idHistorial } = req.body; // Excluir "fecReg" y agregar "idHistorial"

    try {
        const { rows } = await pool.query(
            "INSERT INTO paciente (fecNac, telefono, estado, idHistorial) VALUES ($1, $2, $3, $4) RETURNING *",
            [fecNac, telefono, estado, idHistorial] // Excluir "fecReg"
        );

        return res.status(201).json({
            message: "Paciente creado exitosamente",
            paciente: rows[0]
        });
    } catch (error) {
        console.error("Error al insertar paciente:", error);
        return res.status(500).json({ message: "Error al insertar paciente" });
    }
}

//------------------------------------------------------------------------------------------------------------//

export const deleteUser = async (req, res) => {
    const { idPaciente } = req.params

    const { rows, rowCount } = await pool.query("DELETE FROM paciente WHERE idPaciente = $1 RETURNING *", [idPaciente]);

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
    const { fecNac, telefono, estado, idHistorial } = req.body; // Excluir "fecReg" y agregar "idHistorial"

    try {
        const { rows, rowCount } = await pool.query(
            "UPDATE paciente SET fecNac = $1, telefono = $2, estado = $3, idHistorial = $4 WHERE idPaciente = $5 RETURNING *",
            [fecNac, telefono, estado, idHistorial, idPaciente] // Excluir "fecReg"
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
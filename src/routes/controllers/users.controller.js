import { pool } from "../../db.js";

// Lógica y consultas a la base de datos para traer datos de la tabla usuario

//------------------------------------------------------------------------------------------------------------//

export const getUsuarios = async (req, res) => {
    try {
        console.log("Intentando conectar a la base de datos...");
        const { rows } = await pool.query("SELECT * FROM usuario");
        console.log("Consulta ejecutada exitosamente");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ message: "Error al obtener los usuarios" });
    }
};

export const getUsuario = async (req, res) => {
    const { idUsuario } = req.params;

    const { rows } = await pool.query("SELECT * FROM usuario WHERE idUsuario = $1", [idUsuario]);

    if (rows.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(rows);
}
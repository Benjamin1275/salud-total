import { pool } from "../../db.js";

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM usuario");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ message: "Error al obtener los usuarios" });
    }
};

// Obtener un usuario por ID
export const getUsuario = async (req, res) => {
    const { idUsuario } = req.params;

    try {
        const { rows } = await pool.query("SELECT * FROM usuario WHERE idUsuario = $1", [idUsuario]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).json({ message: "Error al obtener el usuario" });
    }
};
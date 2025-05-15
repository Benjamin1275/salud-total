import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "../../db.js"; // Asegúrate de importar el pool para la base de datos

// Función para generar un token de acceso
const createAccessToken = (payload) => {
    return jwt.sign(payload, "secretKey", { expiresIn: "1h" }); // Cambia "secretKey" por una clave segura en el env de azure y git
};

// POST /api/auth/login
export const login = async (req, res) => {
    const { correo, contrasena } = req.body; 
    try {
        // Verificar si el usuario existe en la base de datos
        const result = await pool.query("SELECT * FROM usuario WHERE correo = $1", [correo]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: "El correo no está registrado" });
        }

        // Verificar si la contraseña es correcta
        const validPassword = await bcrypt.compare(contrasena, result.rows[0].contrasena);
        if (!validPassword) {
            return res.status(400).json({ message: "La contraseña es incorrecta" });
        }

        // Generar el token JWT
        const token = createAccessToken({ id: result.rows[0].idusuario });

        // Configurar la cookie con el token
        res.cookie("token", token, {
            httpOnly: true, // Evita que el cliente acceda a la cookie desde JavaScript
            secure: true, // Solo se envía en conexiones HTTPS
            sameSite: "none", // Permite el uso de cookies en diferentes dominios
            maxAge: 24 * 60 * 60 * 1000, // 1 día
        });

        // Devolver los datos del usuario (sin incluir la contraseña)
        const { contrasena: _, ...userWithoutPassword } = result.rows[0];
        return res.json(userWithoutPassword);
    } catch (error) {
        console.error("Error al autenticar al usuario:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

// GET /api/auth/me
export const getUserInfo = (req, res) => {
    const token = req.cookies.token; // Obtener el token desde las cookies

    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    try {
        // Verificar el token JWT
        const decoded = jwt.verify(token, "secretKey");
        res.json({ user: decoded });
    } catch (error) {
        res.status(401).json({ message: "Token inválido o expirado" });
    }
};

// POST /api/auth/logout
export const logout = (req, res) => {
    // Limpiar la cookie del token
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.json({ message: "Sesión cerrada exitosamente" });
};
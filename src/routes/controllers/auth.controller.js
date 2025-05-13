// Acordarse de importar el pool para la bd
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const doctors = [
    { email: "raul@saludtotal.cl", password: bcrypt.hashSync("1234", 10), name: "Dr. Raúl Pérez" },
    { email: "maria@saludtotal.cl", password: bcrypt.hashSync("5678", 10), name: "Dra. María López" },
    { email: "juan@saludtotal.cl", password: bcrypt.hashSync("abcd", 10), name: "Dr. Juan Martínez" }
];

// POST /api/auth/login
// Si la autenticación es exitosa, genera un token JWT que se devuelve al cliente.
export const login = (req, res) => {
    const { email, password } = req.body;

    //try {
    // const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    // const user = rows[0]; 

    // if (!user || !bcrypt.compareSync(password, user.password)) {
    //     return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    // }

    // Buscar al médico en la lista simulada por su correo electrónico.
    const doctor = doctors.find((d) => d.email === email);

    if (!doctor || !bcrypt.compareSync(password, doctor.password)) {
        return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }

    // Generar un token JWT con los datos del médico.
    // El token incluye el correo y el nombre del médico, y expira en 1 hora.
    const token = jwt.sign({ email: doctor.email, name: doctor.name }, "secretKey", { expiresIn: "1h" });

    // Devolver el token y los datos del médico al cliente.
    res.json({ token, user: { email: doctor.email, name: doctor.name } });

    // } catch (error) {
    // // Manejo de errores en caso de problemas con la base de datos o el servidor
    // console.error("Error al autenticar al usuario:", error);
    // res.status(500).json({ message: "Error interno del servidor" });    
    // }
};

// GET /api/auth/me
// Requiere que el cliente envíe un token valido en el encabezado authorization
export const getUserInfo = (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    // Extraer el token del encabezado Authorization.
    const token = authHeader.split(" ")[1];

    try {
        // Verificar el token JWT, si es válido devuelve los datos del usuario
        const decoded = jwt.verify(token, "secretKey");
        res.json({ user: decoded });
    } catch (error) {
        // Si el token es inválido o ha expirado, devolver un error 401.
        res.status(401).json({ message: "Token inválido o expirado" });
    }
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded; // Agrega los datos del usuario al objeto `req`
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};


// POST /api/auth/logout
// Este método cierra la sesión del usuario.
// En el caso de tokens, el logout se maneja en el cliente eliminando el token almacenado.
export const logout = (req, res) => {
    res.json({ message: "Sesión cerrada exitosamente" });
};
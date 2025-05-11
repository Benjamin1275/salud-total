import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

export const DB_USER = process.env.DB_USER;
export const DB_HOST = process.env.DB_HOST;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_PORT = process.env.DB_PORT;
export const PORT = process.env.PORT; // || 4080 Valor por defecto si no está definido en .env


// export const DB_USER = "administrador"
// export const DB_HOST = "salud-total.postgres.database.azure.com"
// export const DB_PASSWORD = "Pokemega12#"
// export const DB_DATABASE = "salud-total"
// export const DB_PORT = 5432

//export const PORT = process.env.PORT || 4080; // Para cambiar el puerto solo una vez

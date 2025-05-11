import pg from 'pg';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from'./config.js';
//import { DB_DATABASE2, DB_HOST2, DB_PASSWORD2, DB_PORT2, DB_USER2 } from'./config.js';

export const pool = new pg.Pool({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT,
    ssl: { rejectUnauthorized: false }, // Requerido para conexiones seguras en Azure
});

// Probar la conexión
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.stack);
    } else {
        console.log('Conexión exitosa a la base de datos');
        release(); // Liberar el cliente
    }
});



// export const poolDB2 = new pg.Pool({
//     user: DB_USER2,
//     host: DB_HOST2,
//     password: DB_PASSWORD2,
//     database: DB_DATABASE2,
//     port: DB_PORT2,
// })
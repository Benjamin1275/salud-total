import pg from 'pg';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from'./config.js';
//import { DB_DATABASE2, DB_HOST2, DB_PASSWORD2, DB_PORT2, DB_USER2 } from'./config.js';

export const poolDB1 = new pg.Pool({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT,
})

// export const poolDB2 = new pg.Pool({
//     user: DB_USER2,
//     host: DB_HOST2,
//     password: DB_PASSWORD2,
//     database: DB_DATABASE2,
//     port: DB_PORT2,
// })
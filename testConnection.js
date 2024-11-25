import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env.local
dotenv.config({ path: '.env.local' });

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

async function testConnection() {
  try {
    const [rows] = await connection.query('SHOW TABLES;');
    console.log('Conexión exitosa:', rows);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
  }
}

testConnection();

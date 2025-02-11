// import mysql from 'mysql2/promise';
// import * as dotenv from 'dotenv';

// // Carga las variables de entorno desde el archivo .env.local
// dotenv.config({ path: '.env.local' });

// const connection = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// async function testConnection() {
//   try {
//     const [rows] = await connection.query('SHOW TABLES;');
//     console.log('Conexión exitosa:', rows);
//   } catch (error) {
//     console.error('Error al conectar a la base de datos:', error.message);
//   }
// }

// testConnection();


// testConnection.js

// Importa las librerías necesarias
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

// Si usas Node.js 18 o superior, ya dispones de fetch de forma global.
// Si usas una versión anterior, instala node-fetch:
//    npm install node-fetch
// y descomenta la siguiente línea:
// import fetch from 'node-fetch';

// Carga las variables de entorno desde el archivo .env.local
dotenv.config({ path: '.env.local' });

// Configuración de la conexión a la base de datos
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Función para probar la conexión a la base de datos
async function testDatabaseConnection() {
  try {
    const [rows] = await connection.query('SHOW TABLES;');
    console.log('Conexión exitosa a la base de datos. Tablas:', rows);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
  }
}

// Función para probar el endpoint de login
async function testLoginEndpoint() {
  // Define la URL base de la API (asegúrate de que esté bien configurada en tu .env.local)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Usa credenciales de prueba. Asegúrate de que el usuario exista en la base de datos.
      body: JSON.stringify({
        email: 'user1@example.com',
        password: '123456'
      })
    });

    console.log('Código de estado del login:', response.status);

    const data = await response.json();
    console.log('Respuesta del endpoint login:', data);
  } catch (error) {
    console.error('Error al conectar con el endpoint de login:', error.message);
  }
}

// Función principal que ejecuta ambas pruebas
async function testConnection() {
  console.log('Iniciando prueba de conexión a la base de datos...');
  await testDatabaseConnection();

  console.log('\nIniciando prueba del endpoint de login...');
  await testLoginEndpoint();
}

testConnection();

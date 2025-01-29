import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1111",
  database: "laboratorio",
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a la BD: ", err);
  } else {
    console.log("✅ Conectado a la BD");
  }
});

// API para obtener usuarios
app.get("/users", (req, res) => {
  db.query("SELECT id_user, name, email, date, rol, active FROM users", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

app.listen(5000, () => console.log("🚀 Servidor corriendo en http://localhost:5000"));

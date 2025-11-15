require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const conectarDB = require("./db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
conectarDB().catch(err => {
  console.error("Error conectando a MongoDB:", err);
  process.exit(1);
});

// Rutas
const authRoutes = require("./routes/auth");
const salasRoutes = require("./routes/salas");
const avancesRoutes = require("./routes/avances");

app.use("/api/auth", authRoutes);
app.use("/api/salas", salasRoutes);
app.use("/api/avances", avancesRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "Servidor SPOA Virtual funcionando correctamente", version: "1.0.0" });
});

// Ruta para health check (útil para despliegue)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    ok: false,
    msg: "Error interno del servidor",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// Ruta 404
app.use((req, res) => {
  res.status(404).json({ ok: false, msg: "Ruta no encontrada" });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✓ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`✓ Entorno: ${process.env.NODE_ENV || "development"}`);
});

// Manejo de errores no capturados
process.on("unhandledRejection", (reason, promise) => {
  console.error("Promise rechazada no manejada:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Excepción no capturada:", error);
  process.exit(1);
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Conexión Mongo
mongoose.connect("mongodb://127.0.0.1:27017/spoadb")
  .then(() => console.log("MongoDB conectado correctamente"))
  .catch(err => console.error("Error de conexión:", err));

// Importar rutas
const salasRoutes = require("./routes/salas");
app.use("/api/salas", salasRoutes);

// Puerto
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

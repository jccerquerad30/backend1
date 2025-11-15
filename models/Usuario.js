const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  rol: { type: String, required: true, enum: ["juzgado", "demandante", "demandado"] },
  contraseña: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Usuario", usuarioSchema);

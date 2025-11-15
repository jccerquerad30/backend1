const express = require("express");
const Sala = require("../models/Sala");
const Usuario = require("../models/Usuario");

const router = express.Router();

// Wrapper para manejar errores async
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Crear sala
router.post("/", asyncHandler(async (req, res) => {
  const { nombre, participantes } = req.body; // participantes = array de IDs de usuarios
  if (!nombre || !participantes || participantes.length !== 3) {
    return res.status(400).json({ ok: false, msg: "Debe haber 3 participantes" });
  }

  const sala = new Sala({ nombre, participantes });
  await sala.save();
  res.json({ ok: true, sala });
}));

// Listar salas
router.get("/", asyncHandler(async (req, res) => {
  const salas = await Sala.find().populate("participantes", "usuario rol");
  res.json({ ok: true, salas });
}));

module.exports = router;

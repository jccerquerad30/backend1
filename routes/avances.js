const express = require("express");
const Avance = require("../models/Avance");

const router = express.Router();

// Wrapper para manejar errores async
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Registrar avance
router.post("/", asyncHandler(async (req, res) => {
  const { sala, parte, descripcion } = req.body;
  if (!sala || !parte || !descripcion) {
    return res.status(400).json({ ok: false, msg: "Faltan datos" });
  }

  const avance = new Avance({ sala, parte, descripcion });
  await avance.save();
  res.json({ ok: true, avance });
}));

// Listar avances por sala
router.get("/:salaId", asyncHandler(async (req, res) => {
  const avances = await Avance.find({ sala: req.params.salaId });
  res.json({ ok: true, avances });
}));

module.exports = router;

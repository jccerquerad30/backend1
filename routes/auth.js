const express = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

const router = express.Router();

// Wrapper para manejar errores async
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Registro
router.post("/register", asyncHandler(async (req, res) => {
  const { usuario, contraseña, rol } = req.body;

  if (!usuario || !contraseña || !rol) {
    return res.status(400).json({ ok: false, msg: "Faltan datos requeridos" });
  }

  const existe = await Usuario.findOne({ usuario });
  if (existe) {
    return res.status(400).json({ ok: false, msg: "El usuario ya existe" });
  }

  const hash = await bcrypt.hash(contraseña, 10);
  const nuevoUsuario = new Usuario({
    usuario,
    contraseña: hash,
    rol
  });

  await nuevoUsuario.save();
  res.json({
    ok: true,
    msg: "Usuario registrado correctamente",
    usuario: { id: nuevoUsuario._id, usuario: nuevoUsuario.usuario, rol: nuevoUsuario.rol }
  });
}));

// Login
router.post("/login", asyncHandler(async (req, res) => {
  const { usuario, contraseña, rol } = req.body;

  if (!usuario || !contraseña) {
    return res.status(400).json({ ok: false, msg: "Usuario y contraseña requeridos" });
  }

  const usuarioEncontrado = await Usuario.findOne({ usuario });
  if (!usuarioEncontrado) {
    return res.status(400).json({ ok: false, msg: "Usuario no encontrado" });
  }

  const contraseñaValida = await bcrypt.compare(contraseña, usuarioEncontrado.contraseña);
  if (!contraseñaValida) {
    return res.status(400).json({ ok: false, msg: "Contraseña incorrecta" });
  }

  // Validar rol si se proporciona
  if (rol && usuarioEncontrado.rol !== rol) {
    return res.status(400).json({ ok: false, msg: "El rol no coincide con el usuario" });
  }

  res.json({
    ok: true,
    msg: "Login exitoso",
    usuario: {
      id: usuarioEncontrado._id,
      usuario: usuarioEncontrado.usuario,
      rol: usuarioEncontrado.rol
    }
  });
}));

// Obtener usuario actual (opcional)
router.get("/me", asyncHandler(async (req, res) => {
  const usuarioId = req.headers["x-user-id"];
  if (!usuarioId) {
    return res.status(401).json({ ok: false, msg: "No autorizado" });
  }

  const usuario = await Usuario.findById(usuarioId).select("-contraseña");
  res.json({ ok: true, usuario });
}));

module.exports = router;

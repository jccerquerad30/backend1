const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const conectarDB = require("./db");

// Modelos
const Usuario = require("./models/Usuario");
const Sala = require("./models/Sala");

async function seed() {
  try {
    await conectarDB();

    // Limpiar datos previos
    await Usuario.deleteMany({});
    await Sala.deleteMany({});
    console.log("✓ Base de datos limpiada");

    // Crear usuarios de prueba
    const usuariosData = [
      { usuario: "juzgado1", rol: "juzgado", contraseña: "123456" },
      { usuario: "demandante1", rol: "demandante", contraseña: "123456" },
      { usuario: "demandado1", rol: "demandado", contraseña: "123456" },
    ];

    const usuarios = [];
    for (let u of usuariosData) {
      const hashed = await bcrypt.hash(u.contraseña, 10);
      const usuario = new Usuario({
        usuario: u.usuario,
        rol: u.rol,
        contraseña: hashed
      });
      await usuario.save();
      usuarios.push(usuario);
      console.log(`✓ Usuario creado: ${u.usuario} (${u.rol})`);
    }

    // Crear sala con los 3 usuarios
    const sala = new Sala({
      nombre: "Sala General",
      participantes: usuarios.map(u => u._id)
    });
    await sala.save();
    console.log("✓ Sala General creada");

    console.log("\n✓ ¡Seed completado!");
    console.log("\nCredenciales de prueba:");
    console.log("  - Usuario: juzgado1 / Contraseña: 123456 / Rol: juzgado");
    console.log("  - Usuario: demandante1 / Contraseña: 123456 / Rol: demandante");
    console.log("  - Usuario: demandado1 / Contraseña: 123456 / Rol: demandado");

    process.exit(0);
  } catch (err) {
    console.error("Error en seed:", err);
    process.exit(1);
  }
}

seed();


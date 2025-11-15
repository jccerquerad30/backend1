require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Usuario = require("./models/Usuario");

async function seedAtlas() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    console.log("Conectando a MongoDB Atlas...");
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log("✓ Conectado a MongoDB Atlas");

    // Limpiar usuarios previos (opcional)
    console.log("\nLimpiando usuarios previos...");
    await Usuario.deleteMany({});
    console.log("✓ Base de datos limpiada");

    // Crear usuarios
    const usuariosData = [
      { usuario: "juzgado1", rol: "juzgado", contraseña: "123456" },
      { usuario: "demandante1", rol: "demandante", contraseña: "123456" },
      { usuario: "demandado1", rol: "demandado", contraseña: "123456" },
    ];

    console.log("\nCreando usuarios...");
    
    for (let u of usuariosData) {
      const hashed = await bcrypt.hash(u.contraseña, 10);
      const usuario = new Usuario({
        usuario: u.usuario,
        rol: u.rol,
        contraseña: hashed
      });
      await usuario.save();
      console.log(`✓ Usuario creado: ${u.usuario} (${u.rol})`);
    }

    console.log("\n✓ ¡Usuarios listos!");
    console.log("\nCredenciales para ingresar:");
    console.log("  - Usuario: juzgado1 / Contraseña: 123456");
    console.log("  - Usuario: demandante1 / Contraseña: 123456");
    console.log("  - Usuario: demandado1 / Contraseña: 123456");

    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

seedAtlas();

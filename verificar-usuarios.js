require("dotenv").config();
const mongoose = require("mongoose");
const Usuario = require("./models/Usuario");

async function verificarUsuarios() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    console.log("Conectando a MongoDB Atlas...");
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log("✓ Conectado a MongoDB Atlas");

    // Contar usuarios
    const count = await Usuario.countDocuments();
    console.log(`\n📊 Total de usuarios en la BD: ${count}`);

    // Listar todos los usuarios
    const usuarios = await Usuario.find().select("usuario rol -_id");
    
    if (usuarios.length === 0) {
      console.log("⚠️  No hay usuarios en la base de datos");
    } else {
      console.log("\nUsuarios en la BD:");
      usuarios.forEach((u, index) => {
        console.log(`  ${index + 1}. ${u.usuario} (${u.rol})`);
      });
    }

    // Buscar un usuario específico
    const test = await Usuario.findOne({ usuario: "juzgado1" });
    if (test) {
      console.log("\n✓ Usuario 'juzgado1' encontrado en la BD");
    } else {
      console.log("\n✗ Usuario 'juzgado1' NO encontrado");
    }

    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

verificarUsuarios();

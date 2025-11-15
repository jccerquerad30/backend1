// db.js
const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/spoa";
    
    if (!mongoUri) {
      throw new Error("MONGODB_URI no está configurada en variables de entorno");
    }

    console.log("Conectando a MongoDB...");
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("✓ MongoDB conectado correctamente");
    return true;
  } catch (error) {
    console.error("✗ Error al conectar a MongoDB:", error.message);
    console.error("  Verifica que:");
    console.error("  1. MongoDB está corriendo localmente (si usas 127.0.0.1)");
    console.error("  2. O la variable MONGODB_URI está configurada correctamente para MongoDB Atlas");
    process.exit(1);
  }
};

module.exports = conectarDB;

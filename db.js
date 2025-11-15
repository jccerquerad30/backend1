// db.js
const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/spoa";
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✓ MongoDB conectado correctamente");
    return true;
  } catch (error) {
    console.error("✗ Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;

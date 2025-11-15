const mongoose = require("mongoose");

const AvanceSchema = new mongoose.Schema({
  sala: { type: mongoose.Schema.Types.ObjectId, ref: "Sala", required: true },
  parte: { type: String, enum: ["juzgado", "demandante", "demandado"], required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Avance", AvanceSchema);
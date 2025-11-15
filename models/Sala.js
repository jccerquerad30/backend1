const mongoose = require("mongoose");

const SalaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  participantes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true
    }
  ]
});

module.exports = mongoose.model("Sala", SalaSchema);

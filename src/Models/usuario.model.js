var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usuarioSchema = Schema({
    nombre: String,
    apellido: String,
    usuario: String,
    contraseña: String,
    rol: String,
    email: String,
    factura: [{ type: Schema.ObjectId, ref: "factura" }]
})

module.exports = mongoose.model("usuario", usuarioSchema);
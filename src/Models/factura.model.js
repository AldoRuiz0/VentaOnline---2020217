var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var facturaSchema = ({
    nombre: String,
    productos: [{type: Schema.ObjectId, ref:"producto"}]
})

module.exports = mongoose.model("factura",facturaSchema);
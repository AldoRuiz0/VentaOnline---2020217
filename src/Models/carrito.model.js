var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var carritoSchema = ({
    articulo: Boolean,
    propietario: {type: Schema.ObjectId, ref:"usuario"},
    productos: [{type: Schema.ObjectId, ref:"producto"}],
    stock: [Number]
})

module.exports = mongoose.model("carrito",carritoSchema);
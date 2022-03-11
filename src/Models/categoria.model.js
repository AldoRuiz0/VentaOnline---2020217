var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categoriaSchema = ({
    nombre: String,
    productos: [{type: Schema.ObjectId, ref:"producto"}]
})

module.exports = mongoose.model("categoria",categoriaSchema);
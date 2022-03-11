var jwt = require("jwt-simple");
var moment = require("moment");
var claveSecreta = "VentaOnline-2020217";

exports.createToken = (user)=>{
    var payload = {
        sub: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        usuario: user.usuario,
        contraseña: user.contraseña,
        rol: user.rol,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(10,"days").unix()
    }
    return jwt.encode(payload,claveSecreta);
}
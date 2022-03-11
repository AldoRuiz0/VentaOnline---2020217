const jwt_simple = require("jwt-simple");
const moment = require("moment");
var claveSecreta = "VentaOnline-2020217";

exports.Auth = function(req, res, next ){
    if(!req.headers.authorization){
        return res.status(500).send({mensaje: "la peticion no cuenta con la cabecera Authorization"});
    }
    var token = req.headers.authorization.replace(/[' "]+/g, '');

    try{
        var payload = jwt_simple.decode(token, claveSecreta);
        if(payload.exp <= moment.unix){
            return res.status(404).send({mensaje: "El token ha expirado"})
        }
    }catch(error){
        return res.status(500).send({mesaje:"El mensaje NO es valido"})
    }

    req.user = payload;
    next();
}

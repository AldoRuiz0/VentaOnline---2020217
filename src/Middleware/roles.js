exports.ConfirmarAdmin = function (req, res, next) {
    if (req.user.rol !== 'ADMIN') return res.status(403).send({ mensaje: 'Esta accion solo la puede ser ejecutada por un ADMINISTRADOR' })
    next();
}

exports.ConfirmarClient = function (req, res, next) {
    if (req.user.rol !== 'ROL_CLIENTE') return res.status(403).send({ mensaje: 'Esta accion solo la puede ser ejecutada por un CLIENTE' })
    next();
}
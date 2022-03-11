const Usuario = require('../models/usuarios.models');
const Carrito = require('../models/carrito.models');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function Login(req, res) {

    var parametros = req.body;

    Usuario.findOne({ usuario: parametros.usuario }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'Error al obtener usuario' });

        if (usuarioEncontrado) {
            bcrypt.compare(parametros.contraseña, usuarioEncontrado.contraseña, (err,
                verificacioncontraseña) => {

                if (verificacioncontraseña) {

                    if (parametros.obtenerToken === 'true') {
                        return res.status(200).send({ token: jwt.crearToken(usuarioEncontrado) })
                    } else {
                        usuarioEncontrado.contraseña = undefined;
                        return res.status(200).send({ usario: usuarioEncontrado })
                    }


                } else {
                    return res.status(500).send({ mensaje: 'las contraseñas no coinciden' });

                }

            })

        } else {
            return res.status(500).send({ mensaje: 'Error correo no registrado' })
        }
    })
}

function RegistrarAdministrador() {
    var ModeloUsuario = new Usuario();
    ModeloUsuario.nombre = 'ADMIN';
    ModeloUsuario.apellido = 'ADMIN';
    ModeloUsuario.email = 'ADMIN';
    ModeloUsuario.usuario = 'ADMIN';
    ModeloUsuario.contraseña = '123456';
    ModeloUsuario.rol = 'Administrador';

    Usuario.find({ usuario: 'ADMIN' }, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length == 0) {
            bcrypt.hash('123456', null, null, (err, contraseñaEncryptada) => {
                ModeloUsuario.contraseña = contraseñaEncryptada;
                ModeloUsuario.save((err, usuarioGuardado) => {

                    if (err) return console.log('Error en la peticion')
                    if (!usuarioEncontrado) return console.log('Error al agregar admin')
                    return console.log('admin default' + ' ' + usuarioEncontrado);
                });


            })

        } else {
            return console.log('Registrado correctamente');
        }

    })




}

function AgregarUsuario(req, res) {
    const ModeloUsuario = new Usuario();
    var parametros = req.body;

    ModeloUsuario.nombre = parametros.nombre;
    ModeloUsuario.apellido = parametros.apellido;
    ModeloUsuario.usuario = parametros.usuario;
    ModeloUsuario.email = parametros.email;
    ModeloUsuario.rol = 'ROL_CLIENTE';


    Usuario.find({ usuario: parametros.usuario }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if (usuarioEncontrado.length == 0) {

            bcrypt.hash(parametros.contraseña, null, null, (err, contraseñaEncryptada) => {
                ModeloUsuario.contraseña = contraseñaEncryptada;
                ModeloUsuario.save((err, usuarioGuardado) => {
                    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                    if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'Error al agregar Usuario' });
                    return res.status(200).send({ usuario: usuarioGuardado });
                })

            })
        } else {
            return res.status(500).send({ mensaje: 'El nombre ya esta en uso' })
        }
    })
}


function EditarUsuario(req, res) {
    var parametros = req.body;
    var idUs = req.params.idUsario;
    var usuarioToken = req.user.sub;


    Usuario.findOne({ userId: idUs }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (usuarioEncontrado._id !== idUs) {

            return res.status(500).send({ mensaje: 'No cuentas con los permisos necesarios para EDITAR' })
        } else {

            Usuario.findByIdAndUpdate(idUs, parametros, { new: true }, (err, usuarioEditado) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                if (!usuarioEditado) return res.status(500).send({ mensaje: 'Error al EDITAR usario' });

                return res.status(200).send({ usuario: usuarioEditado })
            })
        }
    })
}


module.exports = {
    Login,
    RegistrarAdministrador,
    AgregarUsuario,
    EditarUsuario,
}

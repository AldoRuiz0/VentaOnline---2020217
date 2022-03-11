const mongoose = require('mongoose');
const app = require('./app');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/Venta_Online' , {useNewUrlParser: true, useUnifiedTopology:true}).then(()=>{
    console.log("La base de datos ha sido conectada exitosamente");
    
    app.listen(3000,function(){

        console.log('Servidor corriendo de manera correcta en el puerto 3000');

    })


}).catch(err => console.log(err));
const mongoose = require("mongoose");


require('dotenv').config({path: 'src/variables.env'});



mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(db => console.log('Conexion Exitosa!'))
.catch(err => console.error(err))
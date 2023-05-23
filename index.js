
//Uso de express
const express = require("express");
//Modulo path
const path = require("path");

const methodOverride =  require('method-override');
const session =  require('express-session');
const expug = require('express-handlebars')
//Ayuda a mandar mensajes a los clientes
const message = require('connect-flash');
const passport = require('passport');


//Se almacena funcion de express en una constante
//Inicializaciones
const app = express();
require('./database');
require('./config/passport');

//Confuguraciones

app.set('port',process.env.PORT || 3000) //Setting de app para el puerto
//Se especifica donde esta la carpeta de views
app.set("views",path.join(__dirname,'views'));


//Configuar el motor de las vistas
app.set("view engine","pug");


//Middleware-Funciones que son ejecutadas antes de llegar el servidor
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(message());


//Variables globales 
app.use((req, res, next) => {
    res.locals.mgs_success = req.flash('mgs_success');
    res.locals.mgs_error = req.flash('mgs_error');
    next();
});

///Rutas

app.use(require('./routes/index'))
app.use(require('./routes/users'))
app.use(require('./routes/notes'))






//Archivos staticos

app.use(express.static(path.join(__dirname,'public')));






//Incia el servidor

app.listen(app.get('port'),()=> {
console.log("Servidor en el",app.get('port'))

})

//Se utliza mongoose para diseñar esquemas de datos
const mongoose = require('mongoose');
const { Schema } = mongoose;


//Propiedades que va a tener las notas
const Note_Structure = new Schema({
    title: { type: String, required: true},
    date: {type: String, required: true},
    description: { type: String, required: true},
    Peso: {type: String, required: true},
    user: {type: String }
});


module.exports = mongoose.model('Note', Note_Structure);

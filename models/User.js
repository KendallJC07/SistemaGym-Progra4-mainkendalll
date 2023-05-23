//Se utliza mongoose para diseñar esquemas de datos
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bycrypt = require('bcryptjs')

//Propiedades que va a tener las notas
const Users_Structure = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: {type: String, required: true},
    dia: {type: Date, default: Date.now}
});


Users_Structure.methods.encrypPassword = (password) => {
    return bycrypt.hashSync(password, bycrypt.genSaltSync(10))
}


Users_Structure.methods.matchPassword = async function(password) {
    return await bycrypt.compare(password,this.password)

}



module.exports = mongoose.model('User', Users_Structure);

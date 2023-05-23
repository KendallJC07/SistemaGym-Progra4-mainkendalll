const { text } = require('express');
const express = require('express');
const router = express.Router();

const Note = require('../models/Note');//Este require nos ayuda a decirle
// a models que se requiere agregar o modificar algun dato

const { isAuthenticated } = require('../helpers/auth')


router.get('/notes/addNote',isAuthenticated ,(req, res)=>{
    res.render('./New-note')
});

//Ruta para recibir datos
router.post('/New-note',async(req, res)=>{ 
//Se obtienen los datos que el usuario ingreso
const {title,date,description,Peso}=req.body;
const errors = [];
if(!title){
    errors.push({Text: 'Plese write a title'});
}
if(!description){
    errors.push({Text: 'Please write a description'});
}

if(errors.length > 0){
    res.render('./New-note',{ errors });
//return;   
}else{

    const NewNote = new Note({ title, date, description, Peso});
//await para decirle al sistema que la instruccion va a tomar un tiempo
//Para que siga haciendo las instrucciones que tiene abajo
    NewNote.user = req.user.id
    await NewNote.save();
    req.flash('mgs_success','Nota agregada');
    res.redirect('/notes');
}
});

router.get('/notes',isAuthenticated, async(req, res)=>{
    const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
    res.render('./Notes', { notes });
});


router.get('/notes/edit/:id',async(req, res)=>{
    const note = await Note.findById(req.params.id);
    res.render('./Editar-notes',{note});
});


router.put('/notes/edit-note/:id',async(req, res)=>{
    const {title,description}=req.body;
    await Note.findByIdAndUpdate(req.params.id,{title,description})
    req.flash('mgs_success','Nota actualizada');
    res.redirect('/notes');
});



router.get('/notes/delete-note/:id',async(req, res)=>{
    await Note.findOneAndDelete(req.params.id)
    req.flash('mgs_success','Nota borrada');
    res.redirect('/notes');
});


module.exports = router;

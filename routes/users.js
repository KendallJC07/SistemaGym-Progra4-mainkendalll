const express = require('express');
const router = express.Router();
const User = require('../models/User');//Este require nos ayuda a decirle
const passport = require('passport');

router.get('/users/signin',(req,res,next)=>{
    res.render('./Signin')
});

router.post('/users/signin', passport.authenticate('local-login' , {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    passReqToCallback: true,
}));


router.get('/users/signup',(req,res)=>{
    res.render('./Siginup')
});



router.post('/users/signup',async(req,res)=>{
const {name,email,password} = req.body;
const errors = [];
if(!name){
    errors.push({Text: 'Plese write your name'});
}
if(!email){
    errors.push({Text: 'Plese write your email'});
}
if(!password){
    errors.push({Text: 'Plese write a password'});
}
if(errors.length > 0){
    res.render('./Siginup',{ errors });
}else{
    const emailUser = await User.findOne({email: email})
    if(emailUser){
        req.flash('','El correo ingresado ya existe');
        res.redirect('/users/signup');
    }
    const NewUser = new User({ name, email, password});
    NewUser.password = await NewUser.encrypPassword(password); 
    await NewUser.save();
    req.flash('mgs_success','Usuario agregado');
    res.redirect('/users/signin');
}
});

router.get("/logout", (req,res,next)=>{
    req.logout(function(err) {
        if (err) {
          // handle the error
        } else {
            res.redirect('/users/signin');
        }
    });
});

module.exports = router;

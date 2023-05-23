
const passport = require('passport');
const localStrategy = require('passport-local').Strategy
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user._id)
});
passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id)
    done(null, user)
});


passport.use('local-login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    }, async (req,email,password, done) => {
        const user = await User.findOne({ email })
        console.log(user)
        if(!user){
            return done(null, false, req.flash('mgs_error','Usuario no encontrado'));
        }else{
            const match = await user.matchPassword(password);
            if(match){
                return done(null,user);
            }else{
                return done(null, false,req.flash('mgs_error','Credenciales incorrectas'));
                
            }
        }    
}));





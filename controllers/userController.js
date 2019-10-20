const  formValidation = require('../validation/formValidation');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const passport = require('passport');
require('../authentication/passport/local');
 
module.exports.getUserLogin = (req, res, next) => {
    res.render('pages/login');
};

module.exports.getUserLogout = (req, res, next) => {
    req.logout();
    req.flash('success', 'Successfully Logout');
    res.redirect('/login');
};

module.exports.getUserRegister = (req, res, next) => {
    res.render('pages/register'); 
};

module.exports.postUserLogin = (req, res, next) => {
    // req.flash('error');
    // req.flash('success');
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: true,
    })(req, res, next);
};

module.exports.postUserRegister = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const errors = [];

    // Validation
    const validationErrors = formValidation.registerValidation(username, password);

    if (validationErrors.length > 0) {
        return res.render('pages/register', {
            username,
            password,
            errors: validationErrors,
        });
    }

    // Check duplicate user
    User.findOne({username})
    .then(user => {
        if(user) {
            errors.push({message: 'Username already exist'});
            return res.render('pages/register', {
                username,
                password,
                errors,
            });
        }
    })
    .catch (err => {
        return console.log(err);
    });

    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
            throw err;
        }


        const newUser = new User ({
            username,
            password: hash,
        });

        newUser
        .save()
        .then(() => {
            req.flash('successMessage', 'Successfully Registered');
            res.redirect('/');
        })
        .catch(err => console.log(err));
    }); 
});
};

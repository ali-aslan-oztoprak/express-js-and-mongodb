const  formValidation = require('../validation/formValidation');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
 
module.exports.getUserLogin = (req, res, next) => {
    res.render('pages/login');
};

module.exports.getUserRegister = (req, res, next) => {
    res.render('pages/register'); 
};

module.exports.postUserLogin = (req, res, next) => {
    res.send('Login Attempted');
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

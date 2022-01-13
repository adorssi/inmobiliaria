const bcrypt = require('bcryptjs/dist/bcrypt');
const { validationResult } = require('express-validator' );
const User = require('../models/User');


const userController =  {
    login: (req, res) => {
        res.render('./users/login')
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);
        

        if(errors.isEmpty()) {
            const {email, password} = req.body;
            const user = User.findByField('email', email);

            if(user.length > 0) {
                if(bcrypt.compareSync(password, user[0].password)){ //Si user y password son correctos
                    req.session.userLogueado = user[0]; 
                    res.redirect('/adminDash');
                } else { //Si la password es incorrecta
                    res.render('./users/login', {
                        credentialError: {msg: 'Credenciales inválidas'},
                        old: req.body
                    });
                }
            } else { //Si no se encuentra el usuario que se quiere loguear
                res.render('./users/login', {
                    credentialError: {msg: 'Credenciales inválidas'},
                    old: req.body
                });
            }
        } else { //Si errores no esta vacío
            res.render('./users/login', {
                errors: errors.mapped(),
                old: req.body
            });
        }
        
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
}


module.exports = userController;
const bcrypt = require('bcryptjs/dist/bcrypt');
const { validationResult } = require('express-validator' );
const User = require('../DB/models/User');
const JWTGenerator = require('../helpers/JWTGenerator');

const userController =  {
    login: (req, res) => {
        res.render('./users/login')
    },
    processLogin: async (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()) {
            const {email, password} = req.body;

            try {

                const user = await User.findOne({ email });

                if(!user) { 
                        const error = new Error('Credenciales inválidas')
                        return res.status(404).json({ message: error.message });
                }

                if(!user.isConfirmed) {
                    const error = new Error('La cuenta no ha sido confirmada');
                    res.status(400).json({ message: error.message })
                }

                if(bcrypt.compareSync(password, user.password)){ 

                    res.json({ token: JWTGenerator(user.id)});
                    
                } else {
                    const error = new Error('Credenciales inválidas');
                    res.status(400).json({ message: error.message });
                }
                
            } catch (error) {
                console.log(error);
            }

        } else {
            const error = new Error('Credenciales inválidas');
            res.status(400).json({ message: error.message });
        }
        
    },
    register: (req, res) => {
        res.render('./users/register');
    },
    processRegister: async (req, res) => {

        const { email } = req.body;
        const userExists = await User.findOne({ email });
        if(userExists) {
            const error = new Error('El email ya se encuentra registrado');
            return res.status(400).json({message: error.message});
        }
        
        try {

            const user = new User(req.body);
            const userSaved = await user.save();
            res.json(userSaved);

        } catch (error) {

            console.log(error);
        }

    },
    confirmAccount: async (req, res) => {
        
        const {token} = req.params;
        const userToConfirm = await User.findOne({ token });

        if(!userToConfirm) {
            const error = new Error('Token no válido');
            return res.status(400).json({message: error.message});
        }

        try {

            userToConfirm.token = null;
            userToConfirm.isConfirmed = true;
            await userToConfirm.save();

            res.json({message: 'Cuenta confirmada correctamente'});

        } catch (error) {
            console.log(error);
        }

    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
}


module.exports = userController;
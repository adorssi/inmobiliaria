const mongoose = require('mongoose');
const newId = require('../../helpers/newId');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
        default: newId()
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
});

// Hooks //
userSchema.pre('save', async function(next) { // pre se ejecuta antes de realizar una operacion en la bd, en este caso un save como se lo estamos indicando
    if(!this.isModified('password')) { //Si el password ya fue hasheado, no lo vuelve a hashear
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

const User = mongoose.model('User', userSchema);

module.exports = User;
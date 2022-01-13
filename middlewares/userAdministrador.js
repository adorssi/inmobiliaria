function userAdministrador(req, res, next) {
    if(req.session.userLogueado != undefined && req.session.userLogueado.rol === 1) {
        next();
    } else {
        res.send('No tienes permisos para ingresar a esta página');
    }
}

module.exports =  userAdministrador;
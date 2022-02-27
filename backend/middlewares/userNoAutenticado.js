function userNoAutenticado(req, res, next) {
    if(req.session.userLogueado == undefined) {
        next();
    } else {
        res.redirect('/perfil');
    }
}

module.exports =  userNoAutenticado;
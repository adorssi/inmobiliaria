function userAutenticado(req, res, next) {
    if(req.session.userLogueado != undefined) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports =  userAutenticado;
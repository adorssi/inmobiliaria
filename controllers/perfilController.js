const express=require('express');

const perfilController={
    perfil: (req, res) => {
        res.render('./users/perfil')
    }
}
module.exports=perfilController

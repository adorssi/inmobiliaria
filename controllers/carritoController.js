const express = require('express');

const carritoController = {
    index: (req, res) => {
        res.render('./products/productCart');
    }
}

module.exports = carritoController;
const express = require('express');

const registerController = {
    index: (req, res) => {
        res.render('./users/register');
    }
}

module.exports = registerController;
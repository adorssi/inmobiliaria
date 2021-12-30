const express = require('express');
const router = express.Router();
const adminDashController = require('../controllers/adminDashController');

router.get('/', adminDashController.adminDashboard);

router.get('/settings', adminDashController.settings);

module.exports = router;
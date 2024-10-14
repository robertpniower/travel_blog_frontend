const express = require('express');

const CityController = require('../controllers/cityController')

const router = express.Router();

router.get('/cities/:country_id', CityController.getCities);

module.exports = router;
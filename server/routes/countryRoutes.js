const express = require('express');

const CountryController = require('../controllers/countryController');

const router = express.Router();

router.get('/countries',CountryController.getCountries);

module.exports = router;
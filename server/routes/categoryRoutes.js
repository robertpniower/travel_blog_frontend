const express = require('express');

const CategoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/categories',CategoryController.getCategories);

module.exports = router;
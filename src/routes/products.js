const express = require("express");
const router  = express.Router();
const {list, show, categories, productsByCategory, filterProducts} = require('../controllers/products');

router.get('/', (req, res) => list(req, res));

router.get('/:id', (req, res) => show(req, res));

router.get('/categories', (req, res) => categories(req, res));

router.get('/categories/:category', (req, res) => productsByCategory(req, res));

router.get('/filter', (req, res) => filterProducts(req, res));
 
module.exports = router;
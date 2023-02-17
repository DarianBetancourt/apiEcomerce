const express = require("express");
const router  = express.Router();
const { list, show, update, remove } = require('../controllers/user');

router.get('/', (req, res) => list(req, res));

router.get('/:id', (req, res) => show(req, res));

router.put('/:id', (req, res) => update(req, res));

router.delete('/:id', (req, res) => remove(req, res));

module.exports = router
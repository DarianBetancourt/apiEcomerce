const express   = require("express");
const router    = express.Router();
const authController = require('../controllers/auth');

router.post("/signup", (req, res) => authController.signUp(req, res));

router.get("/login", (req, res) => authController.login(req, res));

module.exports = router
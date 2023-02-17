const express        = require("express");
const router         = express.Router();
const routerUser     = require("./user");
const routerAuth     = require("./auth");
const routerProducts = require("./products");
const routerCarts    = require("./carts");
const routerOrders   = require("./orders");
const middle         = require("../middlewares/authentication") //middleware

router.get('/',(req, res) => {
    res.send(`<h1>Server is on</h1>`)
});

router.use("/auth",routerAuth);

/* protected routes */
router.use("/user", middle.authentication, routerUser);
router.use("/products", middle.authentication, routerProducts);
router.use("/carts", middle.authentication, routerCarts);
router.use("/orders", middle.authentication, routerOrders);

module.exports = router


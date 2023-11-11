const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController");

router.get("/getAllOrder", orderController.allOrder);

module.exports = router;

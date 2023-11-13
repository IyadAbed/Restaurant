const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController");

router.get("/getAllOrder", orderController.allOrder);
router.post("/addOrder", orderController.addNew);

module.exports = router;

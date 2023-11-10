const express = require("express");
const router = express.Router();
const menuController = require("../Controllers/menuController");

router.post("/addItem", menuController.addItem);
router.get("/getAll", menuController.getAll);

module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../Controllers/usersController");

router.post("/register", userController.create);

module.exports = router;

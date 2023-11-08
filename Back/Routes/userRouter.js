const express = require("express");
const router = express.Router();
const userController = require("../Controllers/usersController");

router.post("/register", userController.create);
router.post("/login", userController.login);

module.exports = router;

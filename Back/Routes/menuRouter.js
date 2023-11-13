const express = require("express");
const router = express.Router();
const menuController = require("../Controllers/menuController");
const upload = require("../Middlewares/handleImage");

router.post("/addItem", upload.single("image"), menuController.addItem);
router.get("/getAll", menuController.getAll);
router.delete("/deleteItem/:id", menuController.deleteOne);

module.exports = router;

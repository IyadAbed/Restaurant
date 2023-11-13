const express = require("express");
const router = express.Router();
const maintenanceController = require("../Controllers/maintenanceController");

router.post("/addMaintenance", maintenanceController.addMaintenance);
router.get("/getAllMaintenance", maintenanceController.getAll);
router.get("/getLastMaintenance", maintenanceController.getlast);

module.exports = router;

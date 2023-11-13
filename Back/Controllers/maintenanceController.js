const Maintenance = require("../Models/maintenance");

module.exports = {
  addMaintenance: async (req, res) => {
    try {
      const { impact, price, closeDates, comment } = req.body;
      const newItem = await Maintenance.create({
        impact,
        price,
        closeDates,
        comment: comment ? comment : null,
      });
      res.status(201).json({ success: "maintenance add successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const allMenu = await Maintenance.find();
      res.status(200).json({ success: allMenu });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getlast: async (req, res) => {
    try {
      const allMenu = await Maintenance.find();
      res.status(200).json({ success: allMenu.at(-1) });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

const Menu = require("../Models/menu");

module.exports = {
  addItem: async (req, res) => {
    try {
      const { name, price, discreption } = req.body;
      const imagePath = req.file?.path;
      const imageUrl = `http://localhost:5500/${imagePath}`;
      const itemExist = await Menu.exists({ name });
      if (itemExist)
        return res.status(409).json({ error: "item allready exists" });
      const newItem = await Menu.create({
        name,
        price,
        discreption,
        image: imageUrl,
      });
      res.status(201).json({ success: "item add successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const allMenu = await Menu.find();
      res.status(200).json({ success: allMenu });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

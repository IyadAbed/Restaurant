const Menu = require("../Models/menu");

module.exports = {
  addItem: async (req, res) => {
    try {
      const { name, price, discreption, image } = req.body;
      const itemExist = await Menu.exists({ name });
      console.log(itemExist);
      if (itemExist)
        return res.status(409).json({ error: "item allready exists" });
      const newItem = await Menu.create({
        name,
        price,
        discreption,
        image,
      });
      console.log(newItem);
      res.status(201).json({ success: "item add successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const allMenu = await Menu.find();
      res.status(201).json({ success: allMenu });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

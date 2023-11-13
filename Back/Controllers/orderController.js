const Order = require("../Models/orders");

module.exports = {
  allOrder: async (req, res) => {
    try {
      const allOrders = await Order.find().populate("items.id");
      return res.status(200).json({
        success: allOrders,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },
  addNew: async (req, res) => {
    try {
      const allOrders = await Order.create(req.body);
      return res.status(200).json({
        success: allOrders._id,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },
};

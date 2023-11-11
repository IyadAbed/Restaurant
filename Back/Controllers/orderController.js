const Order = require("../Models/orders");

module.exports = {
  allOrder: async (req, res) => {
    try {
      const allOrders = await Order.find();
      return res.status(200).json({
        success: allOrders
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message
      })
    }
  },
};

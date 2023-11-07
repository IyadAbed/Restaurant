const User = require("../Models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

module.exports = {
  create: async (req, res) => {
    const { name, password, email } = req.body;
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(409).json({
          error: "This email is already exist",
        });
      } else {
        const hashPass = await bcrypt.hash(password, 10);
        const newUser = new User({
          name,
          email,
          password: hashPass,
          role: "user",
        });
        const newOne = await newUser.save();
        if (newOne) {
          return res.json({
            success: newOne,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};

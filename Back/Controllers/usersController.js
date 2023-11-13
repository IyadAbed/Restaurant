const User = require("../Models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

const generateToken = (user) => {
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: 1 },
    process.env.ACCESS_TOKEN_SECRET
  );
  return token;
};

module.exports = {
  create: async (req, res) => {
    const { name, password, email } = req.body;
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(403).json({
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
          const token = generateToken(newOne);
          return res.status(200).json({
            success: {
              user: newOne,
              token,
            },
          });
        }
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
      console.log(error);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    console.log("email", email);
    try {
      const userExist = await User.findOne({ email });
      if (userExist) {
        const passMatch = await bcrypt.compare(password, userExist.password);
        if (passMatch) {
          const token = generateToken(userExist);
          if (userExist.role == "admin") {
            return res.status(200).json({
              success: token,
              role: 1,
            });
          } else {
            return res.status(200).json({
              success: token,
            });
          }
        } else {
          return res.status(403).json({
            message: "Password Missmathch",
          });
        }
      } else {
        return res.status(403).json({
          message: "User Not Found",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "User Not Found",
      });
    }
  },
};

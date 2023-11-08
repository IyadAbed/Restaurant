const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.currentUser = user.id;
    } else {
      return res.status(401).json({ message: "Unauthorized user" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized user" });
  }
};

module.exports = auth;

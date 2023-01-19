const User = require("../service/schemas/userSchema");
const jwt = require("jsonwebtoken");

const userMiddleware = async (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }
  try {
    const { id } = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(id);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: "Not authorized",
    });
  }
};

module.exports = {
  userMiddleware,
};

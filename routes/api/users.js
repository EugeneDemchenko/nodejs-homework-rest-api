const express = require("express");
const { userMiddleware } = require("../../middlewares/user");
const router = express.Router();

const {
  getUsers,
  signup,
  login,
  logout,
  getProfile,
} = require("../../service/controllers/users");

router.get("/", getUsers); // /users/login

router.post("/login", login); // /users/login
router.post("/register", signup); // /users/register
router.post("/logout", userMiddleware, logout); // /users/logout
router.get("/current", userMiddleware, getProfile); // /users/current

module.exports = router;

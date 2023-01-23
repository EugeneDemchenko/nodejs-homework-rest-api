const express = require("express");
const { userMiddleware } = require("../../middlewares/user");
const uploads = require("../../middlewares/uploads");
const router = express.Router();

const {
  getUsers,
  signup,
  login,
  logout,
  getProfile,
  updateImage,
  verifyUser,
  reSendMail,
} = require("../../service/controllers/users");

router.get("/", getUsers);

router.post("/login", login); // /users/login
router.post("/register", signup); // /users/register
router.post("/logout", userMiddleware, logout); // /users/logout
router.get("/current", userMiddleware, getProfile); // /users/current
router.patch("/avatars", userMiddleware, uploads.single("avatar"), updateImage);
router.get("/verify/:verificationToken", verifyUser);
router.post("/verify", reSendMail);

module.exports = router;

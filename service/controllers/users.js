const User = require("../schemas/userSchema");
const { generateToken } = require("../../token");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const getUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const validationResult = registerSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      status: "error",
      message: validationResult.error.details[0].message,
    });
  } else {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: "error",
        message: "Email in use",
      });
    }
    const newUser = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    res.status(201).send(newUser);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const validationResult = loginSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      status: "error",
      message: validationResult.error.details[0].message,
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "Not found. Please, check your email",
    });
  }
  const comparePassword = bcrypt.compare(password, user.password);
  if (!comparePassword) {
    res.status(401).json({
      status: "Unauthorized",
      message: "Wrong password, try again",
    });
  }
  const token = await generateToken({ id: user._id });
  const newUser = await User.findOneAndUpdate(
    { email },
    { $set: { token } },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      token,
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    },
  });
};

const logout = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { $set: { token: null } });
  res.status(204).json({
    status: "success",
    message: "No content",
  });
};

const getProfile = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  res
    .status(200)
    .json({
      status: "success",
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    })
    .end();
};

module.exports = {
  getUsers,
  signup,
  login,
  logout,
  getProfile,
};

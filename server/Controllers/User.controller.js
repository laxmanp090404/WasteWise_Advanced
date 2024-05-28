const UserModel = require("../Models/User.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUser = async (req, res) => {
  try {
    const userId = req.userId; // This is set by the verifyToken middleware
    const user = await UserModel.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Error getting user" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, roles,mobile,location } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(302).json({ existing: true, message: "User already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await UserModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      roles,
      mobile,
      location
    });
    res.status(201).json({ user, created: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server not available at UserController" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ empty: true, message: "Email and password are required" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ notfound: true, message: "User not registered" });
    }
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return res.status(400).json({ invalid: true, message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_TIME });
    const cookieExpiresTime = parseInt(process.env.COOKIE_EXPIRES_TIME, 10);
    if (isNaN(cookieExpiresTime)) {
      throw new Error("Invalid COOKIE_EXPIRES_TIME environment variable");
    }
    res.cookie("token", token, {
      expires: new Date(Date.now() + cookieExpiresTime * 24 * 60 * 60 * 1000),
      httpOnly: true
    });
    res.status(200).json({ message: "Login Successful. Welcome Back", login: true, user });
  } catch (error) {
    console.error("Error at loginUser controller:", error);
    res.status(500).json({ message: "Error at loginUser controller" });
  }
};

exports.logoutUser = async (req, res) => {
  try {

    res.clearCookie("token");
    res.status(200).json({ logout: true, message: "Logout Successful" });

  } catch (error) {
    console.error("Error at logoutUser controller:", error);
    res.status(500).json({ message: "Error at logoutUser controller" });
  }
};

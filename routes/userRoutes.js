//Imports
const express = require("express");

//Import route functions
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

//Routes config
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

module.exports = router;

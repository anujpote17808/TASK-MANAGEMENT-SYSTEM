const express = require("express");

const {
    registerUser,
    loginUser
} = require("../controller/authController");


const router = express.Router();


// Register User
router.post("/register", registerUser);


// Login User
router.post("/login", loginUser);


module.exports = router;
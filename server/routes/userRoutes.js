const express = require("express");
const {signupUser,getAllUsers, signinUser} = require("../controllers/userControllers");
const router = express.Router();

router.route("/signup").post(signupUser)
router.route("/users").get(getAllUsers)
router.route("/signin").post(signinUser)

module.exports = router;
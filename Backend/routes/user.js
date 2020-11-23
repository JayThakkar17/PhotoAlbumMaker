const express = require("express");
const router = express.Router();

const { getUserById, getUser, updateUser} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getCityById } = require("../controllers/city");

router.param("userId", getUserById);
//router.param("cityId", getCityById);

router.get("/user/:userId",isSignedIn, getUser);
//router.get("/ucity/:cityId", getUserByCity);
//router.get("/users", getusers)
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
module.exports = router;

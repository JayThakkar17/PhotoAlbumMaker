var express = require("express")
var router = express.Router();

const { getStateById, createState, getState, getAllState, updateState, removeState } = require("../controllers/state");
const { getUserById} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

//params
router.param("userId", getUserById);
router.param("stateId", getStateById);

//actual routes 

//create
router.post("/state/create/:userId",isSignedIn,isAuthenticated, isAdmin, createState);

//read
router.get("/state/:stateId", getState);
router.get("/states", getAllState);

//update
router.put("/state/:stateId/:userId",isSignedIn,isAuthenticated, isAdmin, updateState);

//delete
router.delete("/state/:stateId/:userId",isSignedIn,isAuthenticated, isAdmin, removeState);

module.exports  = router;

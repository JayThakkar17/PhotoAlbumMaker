var express = require("express")
var router = express.Router();
const { check, validationResult } = require("express-validator");
const {signup, signout, signin} = require("../controllers/auth");
//const {signin} = require("../controllers/auth")


router.get("/signout", signout );

router.post(
    "/signup",
    [
      check("name", "name should be at least 3 char").isLength({ min: 3 }),
      check("email", "email is required").isEmail(),
      check("password", "password should be at least 3 char").isLength({ min: 3 })
    ],
    signup
  );

  router.post(
    "/signin",
    [
      check("email", "email is required").isEmail(),
      check("password", "password should be at least 3 char").isLength({ min: 3 })
    ],
    signin
  );
    /*
  router.get("/testroute", isSignedIn, (req,res)=>{
    res.json(req.auth); 
  });*/
module.exports  = router;
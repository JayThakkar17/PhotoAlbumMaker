var express = require("express")
var router = express.Router();

const { getCityById, createCity, getCity, getAllCity, updateCity, removeCity } = require("../controllers/city");
const { getUserById} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getStateById } = require("../controllers/state");
//params
router.param("userId", getUserById);
router.param("cityId", getCityById);
router.param("stateId", getStateById);

//actual routes 

//create
router.post("/city/create/:userId", isSignedIn,isAuthenticated, isAdmin, createCity);

//read
router.get("/city/:cityId", getCity);
router.get("/cities", getAllCity);
//router.get("/city/:stateId", getCityByState);

/*router.get('/city/:stateId',(req,res)=>{
    city.aggregate([
        {
            $lookup:
            {
                from:"state",
                localField:"name",
                foreignField:"name",
                as:"JOINTABLE"
               }
           }
    ],function(err,city){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(city);
        }
    })  
    
   });*/

//update
router.put("/city/:cityId/:userId",isSignedIn,isAuthenticated, isAdmin, updateCity);

//delete
router.delete("/city/:cityId/:userId",isSignedIn,isAuthenticated, isAdmin, removeCity);

module.exports  = router;

var express = require("express")
var router = express.Router();

const { getAlbumById, createAlbum, getAlbum, getAllAlbum, updateAlbum, removeAlbum } = require("../controllers/album");
const { getUserById} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
//params
router.param("userId", getUserById);
router.param("albumId", getAlbumById)

//actual routes 

//create
router.post("/album/create/:userId", isSignedIn,isAuthenticated, createAlbum);

//read
router.get("/album/:albumId/:userId", isSignedIn,isAuthenticated, getAlbum);
router.get("/albums/:userId", isSignedIn,isAuthenticated, getAllAlbum);
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
router.put("/album/:albumId/:userId",isSignedIn,isAuthenticated, updateAlbum);

//delete
router.delete("/album/:albumId/:userId",isSignedIn,isAuthenticated, removeAlbum);

module.exports  = router;

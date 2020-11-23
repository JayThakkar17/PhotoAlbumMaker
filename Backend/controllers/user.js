const User = require("../models/user");

//const { getUserId } = require("../models/user")

exports.getUserById = (req, res, next, id) => {
  User.findById(id)
  .populate("cname")
  .exec((err, user) => {
    //console.log("user id",uid);
    //console.log("id",_id);
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  //undefined because not to show this information to user in frontend
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};



exports.updateUser = (req,res) => {
      User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        //compulsory parameter when we use update
        {new: true, useFindAndModify: false},
        //----------------------------------------------
        (err, user) => {
          if(err){
          return res.status(400).json({
            error: "You have no permission to update user"
          });
        }
        user.salt = undefined;
        req.profile.encry_password = undefined;
        req.profile.createdAt = undefined;
        req.profile.updatedAt = undefined;
        return res.json(req.profile);
       }
      );
};


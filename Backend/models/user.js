var mongoose = require("mongoose");
//const { ObjectId } = mongoose.Schema;
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    role:{
      type: Number,
      default: 0
    },
    experience: {
      type: Number,
      trim: true
    },
    encry_password: {
      type: String,
      required: true
    },
    salt: String,
    contactno: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      trim: true
    },
    // cname: {
    //     type: ObjectId,
    //     ref: "city",
    //     required: true
    // }
  },
  { timestamps: true }
);
userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    //actual password
    //console.log("password",password);
    this.encry_password = password;
    //console.log("encrypted password",this.securePassword(password));

  })

  .get(function() {
    return this._password;
  });


userSchema.methods = {
  autheticate: function(plainpassword) {
    //plain password which is passed from the db
    //console.log("plain pass",plainpassword)
    return plainpassword === this.encry_password;
    
  }

  /*securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }*/
};



module.exports = mongoose.model("User", userSchema);

// module.exports.getUserId =(uid) => {
//   console.log("user id",uid)
//   console.log("id",_id);
//   return userSchema.findById({
//     _id : uid   
//   }).exec()
// }
  
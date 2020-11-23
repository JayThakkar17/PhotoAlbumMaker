const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const albumSchema = new mongoose.Schema(
  {
    aname: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    // isprivate: {
    //     type: Boolean,
    //     default: true
    // },
    // passcode: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // portfoliovisibility: {
    //     type: Boolean,
    //     required: true,
    //     default: true
    // },
    catname: {
        type: ObjectId,
        ref: "category",
        required: true
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("album", albumSchema);

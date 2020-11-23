const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const photoSchema = new mongoose.Schema(
  {
    pname: {
      type: String,
      required: false,
    },
    aname: {
        type: ObjectId,
        ref: "album"
    },
    avatar: {
        type: String,
        required: true
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("photo", photoSchema);
// photo route left
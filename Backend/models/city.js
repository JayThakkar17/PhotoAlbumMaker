const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const citySchema = new mongoose.Schema(
  {
    cname: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    
    name: {
      type: ObjectId,
      ref: "State",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("city", citySchema);

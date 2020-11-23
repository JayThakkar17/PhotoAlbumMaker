const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    catname: {
      type: String,
      trim: true,
      required: true,
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", categorySchema);

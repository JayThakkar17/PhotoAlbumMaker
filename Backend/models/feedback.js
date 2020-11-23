const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    isprivate: {
        type: Boolean,
        default: true
    },
    lname: {
        type: String,
        required: true,
        maxlength: 32
    },
    review: {
        type: String,
        trim: true,
        required: true,
    } 
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedback", feedbackSchema);

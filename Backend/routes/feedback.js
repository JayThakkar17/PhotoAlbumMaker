var express = require("express")
var router = express.Router();

const { getFeedbackyById, createFeedback, getFeedback, getAllFeedback, updateFeedback, removeFeedback } = require("../controllers/feedback");

//params
router.param("feedbackId", getFeedbackyById);

//actual routes 

//create
router.post("/feedback/create", createFeedback);

//read
router.get("/feedback/:feedbackId", getFeedback);
router.get("/feedbacks", getAllFeedback);

//update
router.put("/feedback/:feedbackId", updateFeedback);

//delete
router.delete("/feedback/:feedbackId", removeFeedback);

module.exports  = router;

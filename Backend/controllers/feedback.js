const Feedback = require("../models/feedback");

exports.getFeedbackyById = (req, res, next, id) => {
  Feedback.findById(id).exec((err, feedback) => {
    if (err) {
      return res.status(400).json({
        error: "Feedback not found in DB"
      });
    }
    req.feedback = feedback;
    next();
  });
};

exports.createFeedback = (req, res) => {
  const feedback = new Feedback(req.body);
  feedback.save((err, feedback) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save feedback in DB"
      });
    }
    res.json({ feedback });
  });
};

exports.getFeedback = (req, res) => {
    return res.json(req.feedback);
  };
  
  exports.getAllFeedback = (req, res) => {
    Feedback.find().exec((err, feedbacks) => {
      if (err) {
        return res.status(400).json({
          error: "NO feedbacks found"
        });
      }
      res.json(feedbacks);
    });
  };
  
  exports.updateFeedback = (req, res) => {
    const feedback = req.feedback;
    feedback.review = req.body.review;
  
    feedback.save((err, updatedFeedback) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update feedback"
        });
      }
      res.json(updatedFeedback);
    });
  };
  
  exports.removeFeedback = (req, res) => {
    const feedback = req.feedback;
  
    feedback.remove((err, feedback) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this feedback"
        });
      }
      res.json({
        message: `${feedback.fname} feedback is ${feedback.review} got deleted successfully`,
      });
    });
  };
  
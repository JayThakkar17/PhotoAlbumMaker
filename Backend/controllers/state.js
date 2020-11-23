const State = require("../models/state");

exports.getStateById = (req, res, next, id) => {
  State.findById(id).exec((err, stat) => {
    if (err) {
      return res.status(400).json({
        error: "State not found in DB"
      });
    }
    req.state = stat;
    next();
  });
};

exports.createState = (req, res) => {
  const state = new State(req.body);
  state.save((err, state) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save state in DB"
      });
    }
    res.json({ state });
  });
};

exports.getState = (req, res) => {
    return res.json(req.state);
  };
  
  exports.getAllState = (req, res) => {
    State.find().exec((err, states) => {
      if (err) {
        return res.status(400).json({
          error: "NO categories found"
        });
      }
      res.json(states);
    });
  };
  
  exports.updateState = (req, res) => {
    const state = req.state;
    state.name = req.body.name;
  
    state.save((err, updatedState) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update state"
        });
      }
      res.json(updatedState);
    });
  };
  
  exports.removeState = (req, res) => {
    const state = req.state;
  
    state.remove((err, state) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this state"
        });
      }
      res.json({
        message: `${state.name} Successfull deleted`,
      });
    });
  };
  
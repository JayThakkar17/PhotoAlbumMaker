const City = require("../models/city");
//const State = require("../models/state");

exports.getCityById = (req, res, next, id) => {
    City.findById(id)
      .populate("name")
      .exec((err, city) => {
        if (err) {
          return res.status(400).json({
            error: "City not found"
          });
        }
        req.city = city;
        next();
      });
  };

exports.createCity = (req, res) => {
  const city = new City(req.body);
  city.save((err, city) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save city in DB"
      });
    }
    res.json({ city });
  });
};

exports.getCity = (req, res) => {
  return res.json(req.city);
};

exports.getAllCity = (req, res) => {
  City.find()
  .populate("name")
  .exec((err, cities) => {
    if (err) {
      return res.status(400).json({
        error: "NO cities found"
      });
    }
    res.json(cities);
  });
};

exports.updateCity = (req, res) => {
  const city = req.city;
  city.cname = req.body.cname;

  city.save((err, updatedCity) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update city"
      });
    }
    res.json(updatedCity);
  });
};

exports.removeCity = (req, res) => {
  const city = req.city;

  city.remove((err, city) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this city"
      });
    }
    res.json({
      message: `${city.cname} Successfull deleted`,
    });
  });
};

/*exports.getCityByState = (req, res) => {
  aggregate.lookup({ from: 'name', localField: 'name', foreignField: 'name', as: 'users' });
}*/

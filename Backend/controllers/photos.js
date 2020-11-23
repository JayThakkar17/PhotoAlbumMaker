'use strict';

const Photo = require('../models/photo');

//show the list
const index = (req, res) => {
    Photo.find()
    .populate("aname")
    .exec((err, photos) => {
      if (err) {
        return res.status(400).json({
          error: "NO photos found"
        });
      }
      res.json(photos);
    });
};
//show by id
// const show = (req, res, next) => {
//     let photoId = req.body.photoId
//     Photo.findById(photoId)
//     .then(response => {
//         res.json({
//             response
//         })
//     })
//     .catch(error => {
//         res.json({
//             message: 'An error occuered'
//         })
//     })
// }

const show = (req, res, next, id) => {
    Photo.findById(id)
    .populate("aname")
    .exec((err, phot) => {
      if (err) {
        return res.status(400).json({
          error: "Photo not found in DB"
        });
      }
      req.photo = phot;
      next();
    });
  };

  const getPhoto = (req, res) => {
    return res.json(req.photo);
  };
//create and store in db
const store = (req, res, next) => {
    let photo = new Photo({
        pname: req.body.pname,
        aname: req.body.aname
    })
    if(req.files){
        let path = ''
        req.files.forEach(function(files, index, arr){
            path = path + files.path + ','
        })
        path = path.substring(0, path.lastIndexOf(","))
        photo.avatar = path
    }
    photo.save()
    .then(response => {
        res.json({
            message: 'Photo added successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured'
        })
    })
}

//update
const update = (req, res) => {
    const photo = req.photo;
    photo.pname = req.body.pname;
  
    photo.save((err, updatedPhoto) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update state"
        });
      }
      res.json(updatedPhoto);
    });
  };

//delete
const destroy = (req, res) => {
    const photo = req.photo;
  
    photo.remove((err, photo) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this Photo"
        });
      }
      res.json({
        message: `${photo.pname} Successfull deleted`,
      });
    });
  };

module.exports = {
    index, show, store, update, destroy, getPhoto
}
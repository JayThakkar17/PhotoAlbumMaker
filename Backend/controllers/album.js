const Album = require("../models/album");

exports.getAlbumById = (req, res, next, id) => {
    Album.findById(id)
      .populate("catname")
      .exec((err, album) => {
        if (err) {
          return res.status(400).json({
            error: "Album not found"
          });
        }
        req.album = album;
        next();
      });
  };

exports.createAlbum = (req, res) => {
  const album = new Album(req.body);
  album.save((err, album) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save album in DB"
      });
    }
    res.json({ album });
  });
};

exports.getAlbum = (req, res) => {
  return res.json(req.album);
};

exports.getAllAlbum = (req, res) => {
  Album.find()
  .populate("catname")
  .exec((err, albums) => {
    if (err) {
      return res.status(400).json({
        error: "NO albums found"
      });
    }
    res.json(albums);
  });
};

exports.updateAlbum = (req, res) => {
  const album = req.album;
  album.aname = req.body.aname;

  album.save((err, updatedAlbum) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update album"
      });
    }
    res.json(updatedAlbum);
  });
};

exports.removeAlbum = (req, res) => {
  const album = req.album;

  album.remove((err, album) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this album"
      });
    }
    res.json({
      message: `${album.aname} Successfull deleted`,
    });
  });
};



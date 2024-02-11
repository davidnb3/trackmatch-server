const { Playlist } = require("../models/schemas");

exports.getAllPlaylists = (req, res, next) => {
  Playlist.find()
    .populate("trackMatches")
    .then((playlists) => {
      res.status(200).json(playlists);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.createPlaylist = (req, res, next) => {
  const playlist = new Playlist({
    name: req.body.name,
    trackMatches: req.body.trackMatches, // assuming this is an array of trackMatch IDs
  });
  playlist
    .save()
    .then(() => {
      res.status(201).json({ message: "Playlist created successfully" });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

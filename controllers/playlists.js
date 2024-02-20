const { Playlist } = require("../models/schemas");

exports.getAllPlaylists = (req, res, next) => {
  Playlist.find()
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
    trackMatches: req.body.trackMatches,
    description: req.body.description,
  });
  playlist
    .save()
    .then(() => {
      res
        .status(201)
        .json({ message: "Playlist created successfully", playlist });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

exports.getPlaylistById = (req, res, next) => {
  Playlist.findById(req.params.id)
    .populate({
      path: "trackMatches",
      populate: {
        path: "tracks",
      },
    })
    .then((playlist) => {
      if (!playlist) {
        return res.status(404).json({ error: "Playlist not found" });
      }
      res.status(200).json(playlist);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.addTrackMatchToPlaylist = (req, res, next) => {
  const { trackMatchId } = req.body;
  Playlist.findByIdAndUpdate(
    req.params.id,
    { $push: { trackMatches: trackMatchId } },
    { new: true }
  )
    .then((playlist) => {
      res.status(200).json(playlist);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.updatePlaylist = (req, res, next) => {
  const { name, description } = req.body;

  Playlist.findByIdAndUpdate(
    req.params.id,
    { name, description },
    { new: true }
  )
    .then((playlist) => {
      res.status(200).json(playlist);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.deletePlaylist = (req, res, next) => {
  Playlist.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Playlist deleted successfully" });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

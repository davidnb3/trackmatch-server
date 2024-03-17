const { Playlist } = require("../models/schemas");
const mongoose = require("mongoose");

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
    trackMatches: req.body.trackMatches.map((trackMatch) => ({
      trackMatch: trackMatch,
    })),
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
      path: "trackMatches.trackMatch",
      populate: {
        path: "tracks",
        model: "Track",
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
  const { trackMatch, confirmed } = req.body;

  Playlist.findById(req.params.id)
    .then((playlist) => {
      if (
        playlist.trackMatches.some(
          (tm) => tm.trackMatch._id.toString() === trackMatch
        ) &&
        !confirmed
      ) {
        res.status(200).json({ message: "TrackMatch already in playlist" });
      } else {
        playlist.trackMatches.push({ trackMatch: trackMatch });
        playlist
          .save()
          .then(() => {
            res
              .status(200)
              .json({ message: "TrackMatch added successfully", trackMatch });
          })
          .catch((error) => {
            res.status(400).json({ error: "error" });
          });
      }
    })
    .catch((error) => {
      res.status(400).json({ error: error, message: "Something went wrong" });
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
      res
        .status(200)
        .json({ message: "Playlist updated successfully", playlist });
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

exports.removeTrackMatchFromPlaylist = (req, res, next) => {
  const { instanceId } = req.body;

  Playlist.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { trackMatches: { _id: mongoose.Types.ObjectId(instanceId) } } },
    { new: true }
  )
    .then(() => {
      res
        .status(200)
        .json({ message: "TrackMatch removed successfully from playlist" });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

const { Track, TrackMatch } = require("../models/schemas");

exports.getAllTracks = (req, res, next) => {
  Track.find()
    .then((tracks) => {
      res.status(200).json(tracks);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.getAllTrackMatches = (req, res, next) => {
  TrackMatch.find()
    .populate("tracks")
    .then((trackMatches) => {
      res.status(200).json(trackMatches);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.createTrackMatch = (req, res, next) => {
  const trackMatch = new TrackMatch({
    tracks: req.body.tracks, // assuming this is an array of track IDs
  });
  trackMatch
    .save()
    .then(() => {
      res.status(201).json({ message: "TrackMatch created successfully" });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

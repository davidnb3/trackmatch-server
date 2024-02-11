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

exports.createTrackMatch = async (req, res, next) => {
  try {
    const trackData = req.body.tracks; // assuming this is an array of track data
    const tracks = await Track.insertMany(trackData);
    const trackIds = tracks.map((track) => track._id);
    const trackMatch = new TrackMatch({ tracks: trackIds });
    await trackMatch.save();
    res.status(201).json({ message: "TrackMatch created successfully" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.addTracksToTrackMatch = (req, res, next) => {
  const { trackMatchId, tracks } = req.body; // tracks is an array of track IDs
  TrackMatch.findByIdAndUpdate(
    trackMatchId,
    { $push: { tracks: { $each: tracks } } },
    { new: true }
  )
    .then((trackMatch) => {
      res
        .status(200)
        .json({ message: "Tracks added successfully", trackMatch });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

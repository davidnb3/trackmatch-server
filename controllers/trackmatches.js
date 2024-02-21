const { Track, TrackMatch } = require("../models/schemas");

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

exports.updateTrackMatch = async (req, res, next) => {
  try {
    const { tracks } = req.body;

    // Create new tracks and get their IDs
    const newTrackIds = await Promise.all(
      tracks.map(async (track) => {
        if (track._id) {
          // If the track has an ID, it's an existing track
          const updatedTrack = await Track.findByIdAndUpdate(track._id, track, {
            new: true,
          });
          return updatedTrack._id.toString();
        } else {
          // If the track doesn't have an ID, it's a new track
          const newTrack = await Track.create(track);
          return newTrack._id.toString();
        }
      })
    );

    // Get the old track IDs
    const oldTrackMatch = await TrackMatch.findById(req.params.id);
    const oldTrackIds = oldTrackMatch.tracks;

    // Find the track IDs that were removed
    const removedTrackIds = oldTrackIds.filter(
      (id) => !newTrackIds.includes(id.toString())
    );

    // Delete the removed tracks
    await Track.deleteMany({ _id: { $in: removedTrackIds } });

    // Update the TrackMatch with the new track IDs
    const updatedTrackMatch = await TrackMatch.findByIdAndUpdate(
      req.params.id,
      { tracks: newTrackIds },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "TrackMatch updated successfully", updatedTrackMatch });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

exports.deleteTrackMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const trackMatch = await TrackMatch.findByIdAndDelete(id);

    if (!trackMatch) {
      return res
        .status(404)
        .json({ message: "No TrackMatch found with this id" });
    }

    res.status(200).json({ message: "TrackMatch deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

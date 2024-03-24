const { Track, TrackMatch, Playlist } = require("../models/schemas");

exports.getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.find();
    res.status(200).json(tracks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAllTrackByName = async (req, res) => {
  try {
    const result = await Track.deleteMany({ name: req.params.name });

    if (result.n === 0) {
      return res
        .status(404)
        .json({ message: "No tracks found with this name" });
    }

    res.status(200).json({ message: "Tracks deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

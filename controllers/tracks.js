const { Track, TrackMatch, Playlist } = require("../models/schemas");

exports.getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.find();
    console.log("TRACKS", tracks);
    res.status(200).json(tracks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const { Track, TrackMatch, Playlist } = require("../models/schemas");

exports.getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.find();
    res.status(200).json(tracks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTrackById = async (req, res) => {
  try {
    const track = await Track.findByIdAndDelete(req.params.id);

    if (!track) {
      return res.status(404).json({ message: "No track found with this id" });
    }

    res.status(200).json({ message: "Track deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

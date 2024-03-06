const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
  name: String,
  artist: String,
  key: String,
  cover: String,
});

const trackMatchSchema = new mongoose.Schema({
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
});

const playlistSchema = new mongoose.Schema({
  name: String,
  trackMatches: [
    {
      trackMatch: { type: mongoose.Schema.Types.ObjectId, ref: "TrackMatch" },
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    },
  ],
  description: String,
});

const Track = mongoose.model("Track", trackSchema);
const TrackMatch = mongoose.model("TrackMatch", trackMatchSchema);
const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = { Track, TrackMatch, Playlist };
